import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TAB_NAV = [
  { label: 'Termos de Uso',   to: '/termos/uso' },
  { label: 'Privacidade',     to: '/termos/privacidade' },
  { label: 'Cancelamento',    to: '/termos/cancelamento' },
];

const Section: React.FC<{ num: string; title: string; children: React.ReactNode }> = ({ num, title, children }) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem', paddingBottom: '.75rem', borderBottom: '1px solid var(--blush-dark)' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'rgba(215,166,41,.25)', lineHeight: 1, flexShrink: 0 }}>{num}</span>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--brown)' }}>{title}</h2>
    </div>
    <div style={{ fontSize: '.9rem', lineHeight: 1.9, color: 'var(--text-soft)', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>{children}</div>
  </div>
);

const Ul: React.FC<{ items: string[] }> = ({ items }) => (
  <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
    {items.map((item, i) => <li key={i}><span style={{ color: 'var(--gold)', marginRight: '.5rem' }}>✦</span>{item}</li>)}
  </ul>
);

export const CancellationPolicyPage: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const rules = [
    { time: '+24h de antecedência', refund: '100%', color: '#10b981', bg: '#d1fae5' },
    { time: '12h a 24h antes',      refund: '50%',  color: '#d97706', bg: '#fef3c7' },
    { time: 'Menos de 12h',         refund: '0%',   color: '#dc2626', bg: '#fee2e2' },
    { time: 'Não comparecimento',   refund: '0%',   color: '#dc2626', bg: '#fee2e2' },
  ];

  const refundMethods = [
    { method: 'PIX',              prazo: 'até 2 dias úteis' },
    { method: 'Cartão de crédito',prazo: 'até 2 faturas subsequentes' },
    { method: 'Cartão de débito', prazo: 'até 5 dias úteis' },
  ];

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', background: 'var(--blush)', paddingBottom: '6rem' }}>
      <div style={{ background: 'var(--brown)', padding: '3rem 5%' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <span style={{ fontSize: '.68rem', letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '.6rem' }}>Lumiê Studio</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 300, color: 'var(--blush)' }}>Política de Cancelamento &amp; Reembolso</h1>
          <p style={{ fontSize: '.8rem', color: 'rgba(248,240,245,.45)', marginTop: '.5rem' }}>Última atualização: março de 2025 · Versão 1.0</p>
        </div>
      </div>
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--blush-dark)', position: 'sticky', top: 64, zIndex: 50 }}>
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 5%', display: 'flex', overflowX: 'auto' }}>
          {TAB_NAV.map(t => (
            <Link key={t.to} to={t.to} style={{ padding: '.85rem 1.3rem', fontSize: '.72rem', letterSpacing: '.15em', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none', borderBottom: t.to === '/termos/cancelamento' ? '2px solid var(--gold)' : '2px solid transparent', color: t.to === '/termos/cancelamento' ? 'var(--brown)' : 'var(--text-soft)' }}>{t.label}</Link>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '3rem 5%' }}>
        <div style={{ background: 'var(--white)', borderLeft: '3px solid var(--gold)', padding: '1.2rem 1.5rem', marginBottom: '3rem', fontSize: '.88rem', color: 'var(--text-soft)', lineHeight: 1.8 }}>
          Sabemos que imprevistos acontecem. Esta política foi criada para ser <strong style={{ color: 'var(--brown)' }}>justa para todas as partes</strong> — respeitando seu tempo e o das nossas profissionais.
        </div>

        {/* Visual refund table */}
        <div style={{ background: 'var(--white)', padding: '1.5rem', marginBottom: '3rem', boxShadow: '0 2px 12px rgba(114,94,58,.08)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--brown)', marginBottom: '1.2rem' }}>Resumo — Cancelamento pela cliente</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {rules.map(r => (
              <div key={r.time} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.8rem 1.1rem', background: 'var(--blush)', borderLeft: `3px solid ${r.color}`, flexWrap: 'wrap', gap: '.5rem' }}>
                <span style={{ fontSize: '.88rem', color: 'var(--text)' }}>{r.time}</span>
                <span style={{ padding: '.25rem .8rem', background: r.bg, color: r.color, fontSize: '.78rem', fontWeight: 600, letterSpacing: '.1em' }}>
                  Reembolso: {r.refund}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Section num="01" title="Cancelamento pela cliente">
          <p>Para cancelar, entre em contato pelo WhatsApp <strong style={{ color: 'var(--brown)' }}>(11) 99529-7274</strong> ou e-mail <strong style={{ color: 'var(--brown)' }}>dani@lumiestudio.com.br</strong>.</p>
          <Ul items={[
            'Com 24h ou mais de antecedência: reembolso integral (100%)',
            'Entre 12h e 24h antes do horário: reembolso de 50% do valor pago',
            'Com menos de 12h de antecedência: sem reembolso',
            'Não comparecimento sem aviso prévio: sem reembolso',
          ]} />
        </Section>

        <Section num="02" title="Cancelamento pelo Lumiê Studio">
          <p>Caso precisemos cancelar, avisaremos com <strong>mínimo de 2 horas de antecedência</strong>. A cliente terá direito a:</p>
          <Ul items={[
            'Reagendamento sem custo adicional na data de sua preferência',
            'Reembolso integral caso não queira reagendar',
          ]} />
          <p>Em casos de emergência ou força maior (eventos imprevisíveis), entraremos em contato o mais brevemente possível para encontrar a melhor solução.</p>
        </Section>

        <Section num="03" title="Reagendamento">
          <Ul items={[
            'Permitido sem custo com pelo menos 12 horas de antecedência',
            'Cada agendamento pode ser reagendado no máximo 2 vezes',
            'Reagendamentos solicitados com menos de 12h seguem as regras de cancelamento acima',
          ]} />
        </Section>

        <Section num="04" title="Atrasos">
          <p>Toleramos atrasos de até <strong>15 minutos</strong>. Após esse prazo, o atendimento poderá ser cancelado sem reembolso, a critério da profissional e conforme a agenda do dia.</p>
          <p>Em caso de atraso do estúdio, o tempo será compensado integralmente ou ofereceremos desconto na próxima sessão.</p>
        </Section>

        <Section num="05" title="Reembolsos via Mercado Pago">
          <p>Reembolsos aprovados são processados pela plataforma Mercado Pago nos seguintes prazos:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {refundMethods.map(m => (
              <div key={m.method} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.75rem 1rem', background: 'var(--blush)', flexWrap: 'wrap', gap: '.5rem' }}>
                <span style={{ fontSize: '.88rem', color: 'var(--text)', fontWeight: 500 }}>{m.method}</span>
                <span style={{ fontSize: '.82rem', color: 'var(--text-soft)' }}>Prazo: <strong style={{ color: 'var(--brown)' }}>{m.prazo}</strong></span>
              </div>
            ))}
          </div>
          <p>O prazo começa a contar a partir da aprovação do reembolso pelo Lumiê Studio.</p>
        </Section>

        <Section num="06" title="Casos excepcionais">
          <p>Situações de força maior — emergências médicas comprovadas, desastres naturais, luto — serão analisadas individualmente com sensibilidade e empatia. Entre em contato o mais breve possível.</p>
        </Section>

        <Section num="07" title="Doenças contagiosas">
          <p>Se a cliente estiver com gripe, resfriado, conjuntivite ou qualquer doença contagiosa, solicitamos que não compareça. Nesse caso, o reagendamento é <strong>gratuito</strong> e sem restrições de prazo, mediante comunicação prévia.</p>
        </Section>

        <Section num="08" title="Contato para cancelamentos">
          <Ul items={[
            'WhatsApp: (11) 99529-7274 — resposta mais rápida',
            'E-mail: dani@lumiestudio.com.br',
            'Horário de atendimento: Segunda a Sábado, 9h às 19h',
          ]} />
        </Section>
      </div>
      <div style={{ background: 'var(--white)', padding: '2rem 5%', borderTop: '1px solid var(--blush-dark)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/termos/uso" style={{ fontSize: '.78rem', color: 'var(--gold)' }}>← Termos de Uso</Link>
            <Link to="/termos/privacidade" style={{ fontSize: '.78rem', color: 'var(--gold)' }}>← Privacidade</Link>
          </div>
          <Link to="/" style={{ fontSize: '.75rem', color: 'var(--text-soft)' }}>← Voltar ao site</Link>
        </div>
      </div>
    </div>
  );
};
