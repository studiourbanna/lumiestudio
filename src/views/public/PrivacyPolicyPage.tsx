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

const InfoBox: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div style={{ background: 'var(--blush)', padding: '1rem 1.2rem', borderRadius: 4, display: 'flex', gap: '.9rem' }}>
    <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{icon}</span>
    <div>
      <p style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--brown)', marginBottom: '.3rem' }}>{title}</p>
      <div style={{ fontSize: '.85rem', color: 'var(--text-soft)' }}>{children}</div>
    </div>
  </div>
);

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', background: 'var(--blush)', paddingBottom: '6rem' }}>
      <div style={{ background: 'var(--brown)', padding: '3rem 5%' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <span style={{ fontSize: '.68rem', letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '.6rem' }}>Lumiê Studio</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 300, color: 'var(--blush)' }}>Política de Privacidade</h1>
          <p style={{ fontSize: '.8rem', color: 'rgba(248,240,245,.45)', marginTop: '.5rem' }}>Última atualização: março de 2025 · Em conformidade com a LGPD (Lei nº 13.709/2018)</p>
        </div>
      </div>
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--blush-dark)', position: 'sticky', top: 64, zIndex: 50 }}>
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 5%', display: 'flex', overflowX: 'auto' }}>
          {TAB_NAV.map(t => (
            <Link key={t.to} to={t.to} style={{ padding: '.85rem 1.3rem', fontSize: '.72rem', letterSpacing: '.15em', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none', borderBottom: t.to === '/termos/privacidade' ? '2px solid var(--gold)' : '2px solid transparent', color: t.to === '/termos/privacidade' ? 'var(--brown)' : 'var(--text-soft)' }}>{t.label}</Link>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '3rem 5%' }}>
        <div style={{ background: 'var(--white)', border: '1px solid rgba(215,166,41,.25)', padding: '1.2rem 1.5rem', marginBottom: '3rem', display: 'flex', gap: '1rem' }}>
          <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>🔒</span>
          <div>
            <p style={{ fontSize: '.88rem', fontWeight: 600, color: 'var(--brown)', marginBottom: '.3rem' }}>Comprometidos com a sua privacidade</p>
            <p style={{ fontSize: '.85rem', color: 'var(--text-soft)', lineHeight: 1.7 }}>Esta política descreve como coletamos, usamos e protegemos seus dados pessoais em conformidade com a <strong>LGPD (Lei nº 13.709/2018)</strong>.</p>
          </div>
        </div>
        <Section num="01" title="Controlador dos dados">
          <p><strong style={{ color: 'var(--brown)' }}>Lumiê Studio — Beleza &amp; Estética</strong></p>
          <p><strong style={{ color: 'var(--brown)' }}>DPO (Encarregada):</strong> Dani Martins — dani@lumiestudio.com.br</p>
          <p>R. Areado, 11 — Carapicuíba/SP, CEP 06327-170 · (11) 99529-7274</p>
        </Section>
        <Section num="02" title="Dados que coletamos">
          <p>Coletamos apenas o necessário para prestar nossos serviços:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <InfoBox icon="📋" title="Identificação (obrigatório)"><p>Nome completo, telefone/WhatsApp e e-mail</p></InfoBox>
            <InfoBox icon="📅" title="Agendamento (obrigatório)"><p>Serviço, profissional, data e horário selecionados</p></InfoBox>
            <InfoBox icon="💚" title="Saúde (voluntário)"><p>Alergias e contraindicações informadas pelo cliente</p></InfoBox>
            <InfoBox icon="🍪" title="Uso do site (automático)"><p>Cookies funcionais essenciais para o agendamento</p></InfoBox>
          </div>
        </Section>
        <Section num="03" title="Para que usamos seus dados">
          <Ul items={[
            'Confirmar, gerenciar e lembrar seus agendamentos',
            'Enviar notificações de confirmação, lembrete e pós-atendimento',
            'Processar pagamentos de forma segura via Mercado Pago',
            'Entrar em contato em caso de cancelamentos ou alterações',
            'Melhorar nossos serviços e experiência no site',
            'Cumprir obrigações legais e regulatórias',
          ]} />
          <p>Não utilizamos seus dados para publicidade não solicitada.</p>
        </Section>
        <Section num="04" title="Base legal (LGPD)">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.8rem' }}>
            {[
              { base: 'Execução de contrato', desc: 'Para realizar o agendamento e prestação dos serviços' },
              { base: 'Consentimento', desc: 'Para dados de saúde e preferências voluntários' },
              { base: 'Legítimo interesse', desc: 'Para comunicações relacionadas ao atendimento' },
              { base: 'Obrigação legal', desc: 'Para cumprimento de obrigações fiscais' },
            ].map(b => (
              <div key={b.base} style={{ background: 'var(--white)', padding: '.8rem 1rem', border: '1px solid var(--blush-dark)', borderLeft: '2px solid var(--gold)' }}>
                <p style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--brown)', marginBottom: '.2rem' }}>{b.base}</p>
                <p style={{ fontSize: '.78rem' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section num="05" title="Compartilhamento de dados">
          <p>Não vendemos nem compartilhamos seus dados com terceiros para fins comerciais. Compartilhamento ocorre apenas com:</p>
          <Ul items={[
            'Profissionais do Lumiê Studio — para execução do serviço agendado',
            'Mercado Pago — para processamento seguro das transações',
            'EmailJS — para envio de notificações de agendamento',
            'Autoridades competentes — quando exigido por lei ou ordem judicial',
          ]} />
        </Section>
        <Section num="06" title="Armazenamento e segurança">
          <p>Dados armazenados na plataforma <strong>Supabase</strong> (AWS Americas) com criptografia TLS 1.2+ em trânsito, AES-256 em repouso e controle de acesso por Row Level Security. Não armazenamos dados de cartão — processados pelo Mercado Pago (PCI DSS Nível 1).</p>
        </Section>
        <Section num="07" title="Seus direitos (LGPD)">
          <p>Você pode, a qualquer momento, solicitar:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.7rem' }}>
            {[
              { r: 'Acesso', d: 'Confirmar se tratamos seus dados e obter cópia' },
              { r: 'Correção', d: 'Corrigir dados incompletos ou incorretos' },
              { r: 'Exclusão', d: 'Solicitar a eliminação dos seus dados' },
              { r: 'Portabilidade', d: 'Receber seus dados em formato estruturado' },
              { r: 'Revogação', d: 'Revogar o consentimento a qualquer momento' },
              { r: 'Informação', d: 'Saber com quem seus dados são compartilhados' },
            ].map(r => (
              <div key={r.r} style={{ background: 'var(--white)', padding: '.7rem .9rem', border: '1px solid var(--blush-dark)' }}>
                <p style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--brown)', marginBottom: '.15rem' }}><span style={{ color: 'var(--gold)', marginRight: '.4rem' }}>✦</span>{r.r}</p>
                <p style={{ fontSize: '.76rem' }}>{r.d}</p>
              </div>
            ))}
          </div>
          <p>Envie seu pedido para <strong style={{ color: 'var(--brown)' }}>dani@lumiestudio.com.br</strong>. Responderemos em até 15 dias úteis.</p>
        </Section>
        <Section num="08" title="Cookies">
          <p>Utilizamos apenas cookies funcionais essenciais para o sistema de agendamento. Nenhum cookie de rastreamento ou publicidade é utilizado.</p>
        </Section>
        <Section num="09" title="Contato">
          <p>Dúvidas ou solicitações: <strong style={{ color: 'var(--brown)' }}>dani@lumiestudio.com.br</strong> · (11) 99529-7274</p>
          <p>Você também pode recorrer à ANPD: <strong>gov.br/anpd</strong></p>
        </Section>
      </div>
      <div style={{ background: 'var(--white)', padding: '2rem 5%', borderTop: '1px solid var(--blush-dark)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/termos/uso" style={{ fontSize: '.78rem', color: 'var(--gold)' }}>← Termos de Uso</Link>
            <Link to="/termos/cancelamento" style={{ fontSize: '.78rem', color: 'var(--gold)' }}>Política de Cancelamento →</Link>
          </div>
          <Link to="/" style={{ fontSize: '.75rem', color: 'var(--text-soft)' }}>← Voltar ao site</Link>
        </div>
      </div>
    </div>
  );
};
