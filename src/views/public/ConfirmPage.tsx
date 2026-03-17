import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import logoImg from '../../assets/logo.png';

export const ConfirmPage: React.FC = () => {
  const navigate  = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [name,   setName]   = useState('');

  useEffect(() => {
    const confirm = async () => {
      // Supabase envia token_hash e type na URL após confirmação
      const params = new URLSearchParams(window.location.search);
      const hash   = new URLSearchParams(window.location.hash.slice(1));

      const tokenHash = params.get('token_hash') ?? hash.get('token_hash');
      const type      = (params.get('type') ?? hash.get('type') ?? 'email') as 'email' | 'recovery' | 'invite';
      const accessToken = hash.get('access_token');

      try {
        if (tokenHash) {
          // Verify OTP token from email link
          const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
          if (error) { setStatus('error'); return; }
        } else if (accessToken) {
          // Session already set via fragment
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: hash.get('refresh_token') ?? '',
          });
        }

        // Fetch name from clients table
        const { data: session } = await supabase.auth.getSession();
        const email = session.session?.user?.email;
        if (email) {
          const { data } = await supabase.from('clients').select('name').eq('email', email).single();
          if (data?.name) setName(data.name.split(' ')[0]); // first name only
        }

        setStatus('success');

        // Auto-redirect to portal after 5s
        setTimeout(() => navigate('/minha-conta'), 5000);
      } catch {
        setStatus('error');
      }
    };

    confirm();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--brown)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(215,166,41,.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, left: -60, width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(215,166,41,.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: '10%', width: 150, height: 150, borderRadius: '50%', border: '1px solid rgba(215,166,41,.05)', pointerEvents: 'none' }} />

      <div style={{
        background: 'var(--white)', padding: '3.5rem 3rem',
        width: '100%', maxWidth: 480, textAlign: 'center',
        boxShadow: '0 24px 64px rgba(0,0,0,.2)',
        animation: 'fadeUp .6s ease both', position: 'relative',
      }}>
        <img src={logoImg} alt="Lumiê Studio" style={{ height: 90, objectFit: 'contain', marginBottom: '2rem' }} />

        {status === 'loading' && (
          <>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              border: '3px solid var(--blush-dark)', borderTopColor: 'var(--gold)',
              animation: 'spin .7s linear infinite', margin: '0 auto 1.5rem',
            }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 300, color: 'var(--brown)', marginBottom: '.6rem' }}>
              Confirmando sua conta...
            </h2>
            <p style={{ fontSize: '.88rem', color: 'var(--text-soft)' }}>Só um momento 🌸</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(215,166,41,.1)', border: '2px solid var(--gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', margin: '0 auto 1.5rem',
            }}>🦋</div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--brown)', marginBottom: '.8rem' }}>
              {name ? `Seja bem-vinda, ${name}!` : 'Seja bem-vinda!'}
            </h2>

            <p style={{ fontSize: '.92rem', color: 'var(--text-soft)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Sua conta no <strong style={{ color: 'var(--brown)' }}>Lumiê Studio</strong> foi confirmada com sucesso.
              Estamos felizes em ter você por aqui! 🌸
            </p>

            <div style={{
              background: 'var(--blush)', padding: '1rem 1.5rem',
              marginBottom: '2rem', fontSize: '.85rem', color: 'var(--text-soft)', lineHeight: 1.7,
            }}>
              Você será redirecionada para seu painel em instantes...
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
              <Link to="/minha-conta" style={{
                display: 'block', padding: '.85rem 2rem',
                background: 'var(--gold)', color: 'white',
                fontSize: '.8rem', letterSpacing: '.2em', textTransform: 'uppercase',
                transition: 'background .25s',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--gold-dark)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--gold)')}
              >
                Ir para meu painel →
              </Link>
              <Link to="/agendar" style={{
                display: 'block', padding: '.75rem 2rem',
                border: '1px solid var(--gold)', color: 'var(--brown)',
                fontSize: '.8rem', letterSpacing: '.2em', textTransform: 'uppercase',
                transition: 'all .25s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--brown)'; }}
              >
                Agendar meu primeiro atendimento
              </Link>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: '#fee2e2', border: '2px solid #fecaca',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.8rem', margin: '0 auto 1.5rem',
            }}>⚠️</div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 300, color: 'var(--brown)', marginBottom: '.8rem' }}>
              Link expirado
            </h2>
            <p style={{ fontSize: '.9rem', color: 'var(--text-soft)', lineHeight: 1.8, marginBottom: '2rem' }}>
              O link de confirmação expirou ou já foi utilizado. Faça login normalmente ou entre em contato conosco.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
              <Link to="/minha-conta" style={{
                display: 'block', padding: '.85rem 2rem',
                background: 'var(--gold)', color: 'white',
                fontSize: '.8rem', letterSpacing: '.2em', textTransform: 'uppercase',
              }}>
                Fazer login
              </Link>
              <Link to="/contato" style={{
                display: 'block', padding: '.75rem 2rem',
                border: '1px solid var(--nude)', color: 'var(--text-soft)',
                fontSize: '.8rem', letterSpacing: '.2em', textTransform: 'uppercase',
              }}>
                Falar com a equipe
              </Link>
            </div>
          </>
        )}

        <p style={{ marginTop: '2rem', fontSize: '.75rem', color: 'var(--nude)' }}>
          <Link to="/" style={{ color: 'var(--nude)' }}>← Voltar ao site</Link>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
};
