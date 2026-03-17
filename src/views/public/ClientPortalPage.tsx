import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format, isFuture, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faPhone, faEnvelope, faCalendarDays,
  faStar, faRightFromBracket, faPen, faCheck,
  faCalendarCheck, faSpinner, faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useClientAuthStore } from '../../store/clientAuth';
import { supabase } from '../../services/supabase';
import { SERVICES } from '../../services/data';

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pendente', confirmed: 'Confirmado',
  cancelled: 'Cancelado', completed: 'Concluído',
};
const STATUS_COLOR: Record<string, string> = {
  pending: '#d97706', confirmed: '#059669',
  cancelled: '#dc2626', completed: '#7c3aed',
};
const STATUS_BG: Record<string, string> = {
  pending: '#fef3c7', confirmed: '#d1fae5',
  cancelled: '#fee2e2', completed: '#ede9fe',
};

const getServiceName = (id: string) => SERVICES.find(s => s.id === id)?.name ?? id;
const getServiceIcon = (id: string) => SERVICES.find(s => s.id === id)?.icon ?? '✦';

const fmtDate = (d: string) => {
  try { return format(parseISO(d), "d 'de' MMMM 'de' yyyy", { locale: ptBR }); }
  catch { return d; }
};

// ── LOGIN / REGISTER FORM ──────────────────────────────────────────
const AuthForm: React.FC = () => {
  const { login, register, error } = useClientAuthStore();
  const [mode,     setMode]     = useState<'login' | 'register'>('login');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [name,     setName]     = useState('');
  const [phone,    setPhone]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === 'login') {
      await login(email, password);
    } else {
      const err = await register(email, password, name, phone);
      if (!err) setSuccess(true);
    }
    setLoading(false);
  };

  if (success) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🦋</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '.8rem' }}>
        Conta criada!
      </h3>
      <p style={{ fontSize: '.9rem', color: 'var(--text-soft)', lineHeight: 1.8 }}>
        Verifique seu e-mail para confirmar a conta e então faça login. 🌸
      </p>
      <button onClick={() => { setMode('login'); setSuccess(false); }} style={{ marginTop: '1.5rem', padding: '.7rem 1.6rem', background: 'var(--gold)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '.78rem', letterSpacing: '.18em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
        Fazer login
      </button>
    </div>
  );

  return (
    <div style={{ animation: 'fadeUp .5s ease both' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 300, color: 'var(--brown)', marginBottom: '.5rem' }}>
          {mode === 'login' ? 'Entrar na sua conta' : 'Criar conta'}
        </h2>
        <p style={{ fontSize: '.85rem', color: 'var(--text-soft)' }}>
          {mode === 'login' ? 'Acesse seu histórico e agende com facilidade' : 'Cadastre-se para agendar mais rápido'}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {mode === 'register' && (
          <>
            <Field label="Nome completo *" value={name} onChange={setName} placeholder="Seu nome" />
            <Field label="Telefone / WhatsApp *" value={phone} onChange={setPhone} placeholder="(11) 9 9999-9999" />
          </>
        )}
        <Field label="E-mail *" type="email" value={email} onChange={setEmail} placeholder="seu@email.com" />
        <Field label="Senha *" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #fecaca', padding: '.75rem 1rem', fontSize: '.82rem', color: '#dc2626' }}>
            ⚠ {error}
          </div>
        )}

        <button type="submit" disabled={loading} style={{
          marginTop: '.5rem', padding: '.9rem', background: 'var(--gold)', color: 'white',
          border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '.8rem', letterSpacing: '.2em', textTransform: 'uppercase',
          fontFamily: 'var(--font-body)', opacity: loading ? .7 : 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.6rem',
        }}>
          {loading
            ? <><FontAwesomeIcon icon={faSpinner} style={{ animation: 'spin .7s linear infinite' }} /> Aguarde...</>
            : mode === 'login' ? 'Entrar' : 'Criar conta'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '.82rem', color: 'var(--text-soft)' }}>
        {mode === 'login' ? 'Não tem conta? ' : 'Já tem conta? '}
        <button onClick={() => setMode(m => m === 'login' ? 'register' : 'login')}
          style={{ color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '.82rem', textDecoration: 'underline' }}>
          {mode === 'login' ? 'Criar agora' : 'Fazer login'}
        </button>
      </p>
    </div>
  );
};

// ── DASHBOARD ─────────────────────────────────────────────────────
const Dashboard: React.FC = () => {
  const { user, profile, logout, updateProfile } = useClientAuthStore();
  const [bookings,     setBookings]     = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loadingData,  setLoadingData]  = useState(true);
  const [editMode,     setEditMode]     = useState(false);
  const [editForm,     setEditForm]     = useState({ name: profile?.name ?? '', phone: profile?.phone ?? '' });
  const [saving,       setSaving]       = useState(false);
  const [savedOk,      setSavedOk]      = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    const load = async () => {
      setLoadingData(true);
      const [{ data: bData }, { data: tData }] = await Promise.all([
        supabase.from('bookings').select('*, service:services(*), professional:professionals(*)').eq('client_email', user.email).order('date', { ascending: false }),
        supabase.from('testimonials').select('*, service:services(*)').eq('client_id', profile?.id ?? '').order('created_at', { ascending: false }),
      ]);
      setBookings(bData ?? []);
      setTestimonials(tData ?? []);
      setLoadingData(false);
    };
    load();
  }, [user?.email, profile?.id]);

  const nextBooking = bookings.find(b =>
    b.status !== 'cancelled' && isFuture(parseISO(b.date))
  );

  const handleSaveProfile = async () => {
    setSaving(true);
    await updateProfile(editForm);
    setSaving(false);
    setSavedOk(true);
    setEditMode(false);
    setTimeout(() => setSavedOk(false), 3000);
  };

  const fmt = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

  return (
    <div style={{ animation: 'fadeUp .5s ease both' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '.72rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '.3rem' }}>
            Bem-vinda de volta
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--brown)' }}>
            {profile?.name ?? user?.email}
          </h2>
        </div>
        <button onClick={logout} style={{
          display: 'flex', alignItems: 'center', gap: '.5rem',
          fontSize: '.72rem', letterSpacing: '.15em', textTransform: 'uppercase',
          color: 'var(--text-soft)', border: '1px solid var(--blush-dark)',
          padding: '.5rem 1rem', background: 'transparent', cursor: 'pointer',
          fontFamily: 'var(--font-body)', transition: 'all .2s',
        }}
          onMouseEnter={e => { (e.currentTarget.style.borderColor = '#ef4444'); (e.currentTarget.style.color = '#ef4444'); }}
          onMouseLeave={e => { (e.currentTarget.style.borderColor = 'var(--blush-dark)'); (e.currentTarget.style.color = 'var(--text-soft)'); }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} /> Sair
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { icon: faCalendarDays, label: 'Sessões realizadas', value: bookings.filter(b => b.status === 'completed').length, accent: 'var(--brown)' },
          { icon: faStar,         label: 'Manutenções',        value: profile?.manutencao ?? 0,                              accent: 'var(--gold)' },
          { icon: faCalendarCheck,label: 'Próximo agend.',      value: nextBooking ? '✓' : '—',                              accent: '#10b981' },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--white)', padding: '1.2rem', borderTop: `3px solid ${s.accent}`, boxShadow: '0 2px 8px rgba(114,94,58,.06)' }}>
            <FontAwesomeIcon icon={s.icon} style={{ color: s.accent, marginBottom: '.5rem', fontSize: '1.1rem' }} />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: s.accent, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '.65rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--text-soft)', marginTop: '.3rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Next booking highlight */}
      {nextBooking && (
        <div style={{ background: 'linear-gradient(135deg, #725E3A 0%, #3A2E1E 100%)', padding: '1.5rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 150, height: 150, borderRadius: '50%', background: 'rgba(215,166,41,.1)', pointerEvents: 'none' }} />
          <span style={{ fontSize: '.65rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(215,166,41,.8)', display: 'block', marginBottom: '.5rem' }}>
            Próximo agendamento
          </span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--blush)', marginBottom: '.3rem' }}>
                {getServiceIcon(nextBooking.service_id)} {nextBooking.service?.name ?? getServiceName(nextBooking.service_id)}
              </p>
              <p style={{ fontSize: '.85rem', color: 'rgba(248,240,245,.7)' }}>
                {fmtDate(nextBooking.date)} às {nextBooking.time?.slice(0, 5)} · {nextBooking.professional?.name}
              </p>
            </div>
            <span style={{
              padding: '.3rem .9rem', fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase',
              background: STATUS_BG[nextBooking.status], color: STATUS_COLOR[nextBooking.status],
            }}>
              {STATUS_LABEL[nextBooking.status]}
            </span>
          </div>
        </div>
      )}

      {/* CTA agendar */}
      <Link to={`/agendar${profile?.name ? `?name=${encodeURIComponent(profile.name)}&email=${encodeURIComponent(user?.email ?? '')}&phone=${encodeURIComponent(profile?.phone ?? '')}` : ''}`}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.2rem 1.5rem', background: 'var(--gold)', color: 'white',
          marginBottom: '2rem', textDecoration: 'none', transition: 'background .25s',
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--gold-dark)')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--gold)')}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>
          🦋 Agendar novo atendimento
        </span>
        <FontAwesomeIcon icon={faChevronRight} />
      </Link>

      {/* My profile */}
      <div style={{ background: 'var(--white)', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(114,94,58,.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--brown)' }}>
            <FontAwesomeIcon icon={faUser} style={{ color: 'var(--gold)', marginRight: '.6rem', fontSize: '.9rem' }} />
            Meus dados
          </h3>
          {!editMode && (
            <button onClick={() => { setEditForm({ name: profile?.name ?? '', phone: profile?.phone ?? '' }); setEditMode(true); }}
              style={{ fontSize: '.7rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)', background: 'none', border: '1px solid rgba(215,166,41,.3)', padding: '.35rem .8rem', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
              <FontAwesomeIcon icon={faPen} style={{ marginRight: '.4rem' }} /> Editar
            </button>
          )}
        </div>

        {editMode ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Field label="Nome" value={editForm.name} onChange={v => setEditForm(f => ({ ...f, name: v }))} placeholder="Seu nome" />
            <Field label="Telefone" value={editForm.phone} onChange={v => setEditForm(f => ({ ...f, phone: v }))} placeholder="(11) 9 9999-9999" />
            <div style={{ display: 'flex', gap: '.8rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setEditMode(false)} style={{ padding: '.6rem 1.2rem', border: '1px solid var(--blush-dark)', background: 'transparent', cursor: 'pointer', fontSize: '.75rem', letterSpacing: '.15em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', color: 'var(--text-soft)' }}>
                Cancelar
              </button>
              <button onClick={handleSaveProfile} disabled={saving} style={{ padding: '.6rem 1.4rem', background: 'var(--gold)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '.75rem', letterSpacing: '.15em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                {saving ? <FontAwesomeIcon icon={faSpinner} style={{ animation: 'spin .7s linear infinite' }} /> : <FontAwesomeIcon icon={faCheck} />}
                Salvar
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.8rem' }}>
            {[
              { icon: faUser,    label: 'Nome',     value: profile?.name ?? '—' },
              { icon: faPhone,   label: 'Telefone', value: profile?.phone ?? '—' },
              { icon: faEnvelope,label: 'E-mail',   value: user?.email ?? '—' },
              { icon: faStar,    label: 'Manutenções disponíveis', value: `${profile?.manutencao ?? 0}` },
            ].map(item => (
              <div key={item.label} style={{ background: 'var(--blush)', padding: '.8rem 1rem' }}>
                <span style={{ fontSize: '.62rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--nude)', display: 'block', marginBottom: '.2rem' }}>
                  <FontAwesomeIcon icon={item.icon} style={{ marginRight: '.4rem', opacity: .7 }} />{item.label}
                </span>
                <span style={{ fontSize: '.88rem', color: 'var(--text)' }}>{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {savedOk && (
          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '.82rem', color: '#059669' }}>
            ✅ Dados atualizados com sucesso!
          </p>
        )}
      </div>

      {/* Booking history */}
      <div style={{ background: 'var(--white)', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(114,94,58,.06)' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--brown)', marginBottom: '1.2rem' }}>
          <FontAwesomeIcon icon={faCalendarDays} style={{ color: 'var(--gold)', marginRight: '.6rem', fontSize: '.9rem' }} />
          Histórico de agendamentos
        </h3>
        {loadingData ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--nude)' }}>
            <FontAwesomeIcon icon={faSpinner} style={{ animation: 'spin .7s linear infinite', fontSize: '1.5rem' }} />
          </div>
        ) : bookings.length === 0 ? (
          <p style={{ color: 'var(--nude)', fontSize: '.88rem', textAlign: 'center', padding: '1.5rem 0' }}>
            Nenhum agendamento ainda. <Link to="/agendar" style={{ color: 'var(--gold)' }}>Agendar agora →</Link>
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {bookings.map(b => (
              <div key={b.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '.9rem 1.1rem', border: '1px solid var(--blush-dark)',
                borderLeft: `3px solid ${STATUS_COLOR[b.status] ?? 'var(--nude)'}`,
                flexWrap: 'wrap', gap: '.5rem',
              }}>
                <div>
                  <p style={{ fontSize: '.88rem', color: 'var(--brown)', fontWeight: 500 }}>
                    {getServiceIcon(b.service_id)} {b.service?.name ?? getServiceName(b.service_id)}
                  </p>
                  <p style={{ fontSize: '.75rem', color: 'var(--text-soft)', marginTop: '.15rem' }}>
                    {fmtDate(b.date)} às {b.time?.slice(0, 5)} · {b.professional?.name}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
                  {b.payment_amount && (
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--gold)' }}>
                      {fmt(b.payment_amount)}
                    </span>
                  )}
                  <span style={{
                    padding: '.2rem .7rem', fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase',
                    background: STATUS_BG[b.status], color: STATUS_COLOR[b.status],
                  }}>
                    {STATUS_LABEL[b.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My testimonials */}
      {testimonials.length > 0 && (
        <div style={{ background: 'var(--white)', padding: '1.5rem', boxShadow: '0 2px 8px rgba(114,94,58,.06)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--brown)', marginBottom: '1.2rem' }}>
            <FontAwesomeIcon icon={faStar} style={{ color: 'var(--gold)', marginRight: '.6rem', fontSize: '.9rem' }} />
            Meus depoimentos
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
            {testimonials.map(t => (
              <div key={t.id} style={{ padding: '1rem', background: 'var(--blush)', borderLeft: `3px solid ${t.approved ? 'var(--gold)' : 'var(--nude)'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
                  <span style={{ fontSize: '.75rem', color: 'var(--text-soft)' }}>
                    {getServiceIcon(t.service_id)} {t.service?.name ?? getServiceName(t.service_id)}
                  </span>
                  <span style={{
                    fontSize: '.62rem', letterSpacing: '.1em', textTransform: 'uppercase',
                    padding: '.15rem .6rem',
                    background: t.approved ? '#d1fae5' : '#fef3c7',
                    color: t.approved ? '#059669' : '#d97706',
                  }}>
                    {t.approved ? '✓ Publicado' : '⏳ Em análise'}
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '.95rem', color: 'var(--brown)', lineHeight: 1.7 }}>
                  "{t.text}"
                </p>
                <div style={{ marginTop: '.5rem', color: 'var(--gold)', fontSize: '.75rem' }}>
                  {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.2rem' }}>
            <Link to="/depoimentos" style={{ fontSize: '.78rem', color: 'var(--gold)', letterSpacing: '.12em', textTransform: 'uppercase' }}>
              Deixar novo depoimento →
            </Link>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// ── MAIN PAGE ─────────────────────────────────────────────────────
export const ClientPortalPage: React.FC = () => {
  const { user, authLoading, init } = useClientAuthStore();

  useEffect(() => { init(); }, []);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', background: 'var(--blush)', paddingBottom: '5rem' }}>
      {/* Hero */}
      <div style={{ background: 'var(--brown)', padding: '3rem 5%', textAlign: 'center' }}>
        <span style={{ fontSize: '.68rem', letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '.6rem' }}>
          Área exclusiva
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 300, color: 'var(--blush)' }}>
          Meu <em style={{ color: 'var(--gold)' }}>Painel</em>
        </h1>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '3rem 5%' }}>
        {authLoading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--nude)' }}>
            <FontAwesomeIcon icon={faSpinner} style={{ animation: 'spin .7s linear infinite', fontSize: '2rem' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : user ? (
          <Dashboard />
        ) : (
          <div style={{ background: 'var(--white)', padding: '2.5rem', boxShadow: '0 4px 24px rgba(114,94,58,.1)' }}>
            <AuthForm />
          </div>
        )}
      </div>
    </div>
  );
};

// ── Field helper ──────────────────────────────────────────────────
const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }> = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
    <label style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-soft)' }}>{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ padding: '.75rem 1rem', border: '1px solid var(--blush-dark)', background: 'var(--blush)', fontSize: '.9rem', color: 'var(--text)', fontFamily: 'var(--font-body)', outline: 'none', transition: 'border-color .2s' }}
      onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
      onBlur={e => (e.currentTarget.style.borderColor = 'var(--blush-dark)')}
    />
  </div>
);
