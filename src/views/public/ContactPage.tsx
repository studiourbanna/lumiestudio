import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faFacebookF, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot, faPhone, faClock, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const CONTACT_EMAIL = 'dani@lumiestudio.com.br';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const update = (field: keyof FormState, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `Contato de ${form.name}`);
    const body = encodeURIComponent(
      `Nome: ${form.name}\nE-mail: ${form.email}\nTelefone: ${form.phone}\n\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', background: 'var(--blush)' }}>

      {/* ── HERO STRIP ── */}
      <div style={{
        background: 'var(--brown)', padding: '4rem 5%', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(215,166,41,.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <span style={{
          fontSize: '.72rem', letterSpacing: '.35em', textTransform: 'uppercase',
          color: 'var(--gold)', display: 'block', marginBottom: '1rem',
        }}>Fale conosco</span>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)',
          fontWeight: 300, color: 'var(--blush)', lineHeight: 1.2,
        }}>
          Estamos aqui para <em style={{ color: 'var(--gold)' }}>te atender</em>
        </h1>
      </div>

      {/* ── MAIN GRID ── */}
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '5rem 5%',
        display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'start',
      }}>

        {/* ── LEFT: Info ── */}
        <div>
          <span style={{ fontSize: '.72rem', letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '.8rem' }}>
            Informações
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--brown)', marginBottom: '2rem', lineHeight: 1.2 }}>
            Venha nos visitar
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {[
              {
                icon: faLocationDot,
                title: 'Endereço',
                lines: ['R. Areado, 11 — Conj. Hab. Pres. Castelo Branco', 'Carapicuíba — SP, 06327-170'],
                href: 'https://maps.google.com/?q=R.+Areado,+11+Carapicuiba+SP',
              },
              {
                icon: faPhone,
                title: 'Telefone / WhatsApp',
                lines: ['(11) 99529-7274'],
                href: 'https://wa.me/5511995297274',
              },
              {
                icon: faEnvelope,
                title: 'E-mail',
                lines: [CONTACT_EMAIL],
                href: `mailto:${CONTACT_EMAIL}`,
              },
              {
                icon: faClock,
                title: 'Horário de funcionamento',
                lines: ['Segunda a Sábado: 9h — 19h', 'Domingo: fechado'],
                href: null,
              },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(215,166,41,.1)', border: '1px solid rgba(215,166,41,.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--gold)', fontSize: '.95rem',
                }}>
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <div>
                  <span style={{ fontSize: '.68rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--nude)', display: 'block', marginBottom: '.25rem' }}>
                    {item.title}
                  </span>
                  {item.lines.map(line => (
                    item.href
                      ? <a key={line} href={item.href} target="_blank" rel="noreferrer"
                          style={{ display: 'block', fontSize: '.9rem', color: 'var(--brown)', transition: 'color .2s' }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--brown)')}
                        >{line}</a>
                      : <span key={line} style={{ display: 'block', fontSize: '.9rem', color: 'var(--text-soft)' }}>{line}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Social */}
          <div>
            <span style={{ fontSize: '.68rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--nude)', display: 'block', marginBottom: '.9rem' }}>
              Redes sociais
            </span>
            <div style={{ display: 'flex', gap: '.8rem' }}>
              {[
                { icon: faInstagram, href: 'https://instagram.com/lumiestudio', label: 'Instagram' },
                { icon: faTiktok,    href: 'https://tiktok.com/@lumiestudio',   label: 'TikTok' },
                { icon: faFacebookF, href: 'https://facebook.com/lumiestudio',  label: 'Facebook' },
                { icon: faWhatsapp,  href: 'https://wa.me/5511995297274',        label: 'WhatsApp' },
              ].map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  title={label}
                  style={{
                    width: 40, height: 40, border: '1px solid rgba(114,94,58,.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--brown)', fontSize: '1rem', background: 'var(--white)',
                    transition: 'all .25s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; (e.currentTarget as HTMLElement).style.background = 'rgba(215,166,41,.06)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(114,94,58,.2)'; (e.currentTarget as HTMLElement).style.color = 'var(--brown)'; (e.currentTarget as HTMLElement).style.background = 'var(--white)'; }}
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form ── */}
        <div style={{ background: 'var(--white)', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(215,166,41,.1)', border: '2px solid var(--gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem', margin: '0 auto 1.5rem',
              }}>🦋</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '.75rem' }}>
                Mensagem enviada!
              </h3>
              <p style={{ fontSize: '.9rem', color: 'var(--text-soft)', marginBottom: '2rem', lineHeight: 1.8 }}>
                Seu cliente de e-mail foi aberto com a mensagem preenchida. Em breve retornaremos o contato. 🌸
              </p>
              <button onClick={() => setSent(false)} style={{
                padding: '.7rem 1.8rem', border: '1px solid var(--gold)', background: 'transparent',
                color: 'var(--brown)', fontSize: '.75rem', letterSpacing: '.18em',
                textTransform: 'uppercase', cursor: 'pointer', transition: 'all .25s',
              }}
                onMouseEnter={e => { (e.currentTarget.style.background = 'var(--gold)'); (e.currentTarget.style.color = 'white'); }}
                onMouseLeave={e => { (e.currentTarget.style.background = 'transparent'); (e.currentTarget.style.color = 'var(--brown)'); }}
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <>
              <span style={{ fontSize: '.72rem', letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '.6rem' }}>
                Formulário
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 300, color: 'var(--brown)', marginBottom: '1.8rem' }}>
                Envie uma mensagem
              </h3>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Field label="Nome *" value={form.name} onChange={v => update('name', v)} placeholder="Seu nome" required />
                  <Field label="Telefone" value={form.phone} onChange={v => update('phone', v)} placeholder="(11) 9 9999-9999" />
                </div>
                <Field label="E-mail *" type="email" value={form.email} onChange={v => update('email', v)} placeholder="seu@email.com" required />
                <Field label="Assunto" value={form.subject} onChange={v => update('subject', v)} placeholder="Como podemos ajudar?" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                  <label style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-soft)' }}>
                    Mensagem *
                  </label>
                  <textarea
                    required rows={5}
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    placeholder="Escreva sua mensagem aqui..."
                    style={{
                      padding: '.75rem 1rem', border: '1px solid var(--blush-dark)',
                      background: 'var(--blush)', fontSize: '.9rem', color: 'var(--text)',
                      resize: 'vertical', fontFamily: 'var(--font-body)',
                      transition: 'border-color .2s', borderRadius: 2, outline: 'none',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--blush-dark)')}
                  />
                </div>

                <p style={{ fontSize: '.75rem', color: 'var(--nude)', lineHeight: 1.6 }}>
                  Ao enviar, seu cliente de e-mail será aberto com a mensagem endereçada a <strong style={{ color: 'var(--brown)' }}>{CONTACT_EMAIL}</strong>
                </p>

                <button type="submit" style={{
                  marginTop: '.4rem', padding: '.85rem 2rem',
                  background: 'var(--gold)', color: 'white',
                  border: 'none', cursor: 'pointer',
                  fontSize: '.78rem', letterSpacing: '.2em', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.6rem',
                  transition: 'background .25s, transform .2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-dark)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget.style.background = 'var(--gold)'); (e.currentTarget.style.transform = 'translateY(0)'); }}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                  Enviar mensagem
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* ── MAP EMBED ── */}
      <div style={{ width: '100%', height: 320, filter: 'grayscale(30%) contrast(1.05)' }}>
        <iframe
          title="Localização Lumiê Studio"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.4!2d-46.83!3d-23.53!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sR.+Areado%2C+11+-+Carapicuíba%2C+SP!5e0!3m2!1spt-BR!2sbr!4v1"
          width="100%" height="320"
          style={{ border: 0, display: 'block' }}
          allowFullScreen loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* ── CTA ── */}
      <div style={{ background: 'var(--brown-dark)', padding: '3rem 5%', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--blush)', marginBottom: '1.2rem' }}>
          Prefere agendar diretamente?
        </p>
        <Link to="/agendar" style={{
          display: 'inline-block', padding: '.75rem 2rem', background: 'var(--gold)',
          color: 'white', fontSize: '.78rem', letterSpacing: '.2em', textTransform: 'uppercase',
          transition: 'background .25s',
        }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--gold-dark)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--gold)')}
        >
          Agendar online
        </Link>
      </div>

    </div>
  );
};

// ── Mini field component ──────────────────────────────────────────
const Field: React.FC<{
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}> = ({ label, value, onChange, placeholder, type = 'text', required }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
    <label style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-soft)' }}>
      {label}
    </label>
    <input
      type={type} required={required} value={value} placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      style={{
        padding: '.75rem 1rem', border: '1px solid var(--blush-dark)',
        background: 'var(--blush)', fontSize: '.9rem', color: 'var(--text)',
        fontFamily: 'var(--font-body)', borderRadius: 2, outline: 'none',
        transition: 'border-color .2s',
      }}
      onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
      onBlur={e => (e.currentTarget.style.borderColor = 'var(--blush-dark)')}
    />
  </div>
);
