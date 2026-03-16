import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'terms' | 'privacy' | 'cancellation';

const TABS: { id: Tab; label: string }[] = [
  { id: 'terms',        label: 'Termos de Uso' },
  { id: 'privacy',      label: 'Política de Privacidade' },
  { id: 'cancellation', label: 'Cancelamento & Reembolso' },
];

export const TermsPage: React.FC = () => {
  const [active, setActive] = useState<Tab>('terms');

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', background: 'var(--blush)' }}>

      {/* Hero */}
      <div style={{ background: 'var(--brown)', padding: '3.5rem 5%', textAlign: 'center' }}>
        <span style={{ fontSize: '.72rem', letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '.8rem' }}>
          Transparência & Segurança
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 300, color: 'var(--blush)', lineHeight: 1.2 }}>
          Termos, Privacidade & <em style={{ color: 'var(--gold)' }}>Políticas</em>
        </h1>
        <p style={{ marginTop: '.8rem', fontSize: '.85rem', color: 'rgba(248,240,245,.6)' }}>
          Última atualização: março de 2025
        </p>
      </div>

      {/* Tabs */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--blush-dark)', position: 'sticky', top: '64px', zIndex: 50 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 5%', display: 'flex', gap: '0' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)} style={{
              padding: '1rem 1.6rem', background: 'transparent', border: 'none',
              borderBottom: active === t.id ? '2px solid var(--gold)' : '2px solid transparent',
              fontSize: '.75rem', letterSpacing: '.15em', textTransform: 'uppercase',
              color: active === t.id ? 'var(--brown)' : 'var(--text-soft)',
              cursor: 'pointer', transition: 'all .25s', fontFamily: 'var(--font-body)',
            }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 5%' }}>
        {active === 'terms'        && <TermsContent />}
        {active === 'privacy'      && <PrivacyContent />}
        {active === 'cancellation' && <CancellationContent />}
      </div>

      {/* Footer CTA */}
      <div style={{ background: 'var(--white)', padding: '2.5rem 5%', textAlign: 'center', borderTop: '1px solid var(--blush-dark)' }}>
        <p style={{ fontSize: '.88rem', color: 'var(--text-soft)', marginBottom: '1.2rem' }}>
          Dúvidas sobre nossas políticas? Entre em contato.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contato" style={{
            padding: '.65rem 1.6rem', border: '1px solid var(--gold)', color: 'var(--brown)',
            fontSize: '.75rem', letterSpacing: '.18em', textTransform: 'uppercase', transition: 'all .25s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--brown)'; }}
          >Falar conosco</Link>
          <Link to="/agendar" style={{
            padding: '.65rem 1.6rem', background: 'var(--gold)', color: 'white',
            fontSize: '.75rem', letterSpacing: '.18em', textTransform: 'uppercase', transition: 'background .25s',
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--gold-dark)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--gold)')}
          >Agendar agora</Link>
        </div>
      </div>
    </div>
  );
};

// ── Section helper ────────────────────────────────────────────────
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: '1rem', paddingBottom: '.5rem', borderBottom: '1px solid var(--blush-dark)' }}>
      {title}
    </h2>
    <div style={{ fontSize: '.9rem', lineHeight: 1.9, color: 'var(--text-soft)' }}>
      {children}
    </div>
  </div>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ marginBottom: '.9rem' }}>{children}</p>
);

const Ul: React.FC<{ items: string[] }> = ({ items }) => (
  <ul style={{ paddingLeft: '1.4rem', marginBottom: '.9rem', display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
    {items.map(i => <li key={i}>{i}</li>)}
  </ul>
);

// ── TERMS OF USE ──────────────────────────────────────────────────
const TermsContent: React.FC = () => (
  <div>
    <p style={{ fontSize: '.88rem', color: 'var(--nude)', marginBottom: '2.5rem', lineHeight: 1.8, borderLeft: '3px solid var(--gold)', paddingLeft: '1rem' }}>
      Ao utilizar o site ou realizar um agendamento no <strong style={{ color: 'var(--brown)' }}>Lumiê Studio</strong>, você concorda com os termos descritos abaixo. Leia com atenção.
    </p>

    <Section title="1. Sobre o Lumiê Studio">
      <P>O Lumiê Studio é um espaço de beleza e estética localizado em Carapicuíba — SP, que oferece serviços de skincare, manicure, design de sobrancelhas, spa e consultoria de beleza.</P>
      <P>Este site e sistema de agendamento são de uso exclusivo para clientes e interessados nos serviços do estúdio.</P>
    </Section>

    <Section title="2. Uso do sistema de agendamento">
      <P>Ao realizar um agendamento online, você declara que:</P>
      <Ul items={[
        'As informações fornecidas (nome, e-mail, telefone) são verdadeiras e atualizadas.',
        'Tem ciência do serviço, profissional e horário selecionados.',
        'Concorda com a política de cancelamento e reembolso vigente.',
        'É maior de 18 anos ou está acompanhado por responsável legal.',
      ]} />
    </Section>

    <Section title="3. Confirmação do agendamento">
      <P>O agendamento é considerado <strong>confirmado</strong> somente após a confirmação do pagamento (PIX ou cartão). Solicitações sem pagamento ficam com status <em>pendente</em> e podem ser canceladas automaticamente em até 2 horas.</P>
    </Section>

    <Section title="4. Responsabilidades do cliente">
      <Ul items={[
        'Comparecer no horário agendado. Atrasos superiores a 15 minutos podem resultar no cancelamento do atendimento sem reembolso.',
        'Informar previamente alergias, condições de saúde ou contraindicações relevantes ao serviço.',
        'Tratar as profissionais com respeito e cordialidade.',
      ]} />
    </Section>

    <Section title="5. Responsabilidades do estúdio">
      <Ul items={[
        'Realizar o serviço com qualidade, higiene e profissionalismo.',
        'Notificar o cliente em caso de cancelamento por parte do estúdio com antecedência mínima de 2 horas.',
        'Garantir confidencialidade dos dados pessoais conforme nossa Política de Privacidade.',
      ]} />
    </Section>

    <Section title="6. Pagamentos">
      <P>Aceitamos pagamentos via PIX e cartão de crédito/débito processados pela plataforma Mercado Pago. O Lumiê Studio não armazena dados de cartão — todo processamento é feito de forma segura pelo gateway de pagamento.</P>
    </Section>

    <Section title="7. Alterações nos termos">
      <P>O Lumiê Studio reserva-se o direito de atualizar estes termos a qualquer momento. A versão mais recente estará sempre disponível nesta página.</P>
    </Section>

    <Section title="8. Contato">
      <P>Para dúvidas sobre estes termos, entre em contato pelo e-mail <strong style={{ color: 'var(--brown)' }}>dani@lumiestudio.com.br</strong> ou pelo WhatsApp <strong style={{ color: 'var(--brown)' }}>(11) 99529-7274</strong>.</P>
    </Section>
  </div>
);

// ── PRIVACY POLICY ────────────────────────────────────────────────
const PrivacyContent: React.FC = () => (
  <div>
    <p style={{ fontSize: '.88rem', color: 'var(--nude)', marginBottom: '2.5rem', lineHeight: 1.8, borderLeft: '3px solid var(--gold)', paddingLeft: '1rem' }}>
      Esta política descreve como o <strong style={{ color: 'var(--brown)' }}>Lumiê Studio</strong> coleta, usa e protege seus dados pessoais, em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>.
    </p>

    <Section title="1. Dados coletados">
      <P>Coletamos apenas os dados necessários para a prestação dos serviços:</P>
      <Ul items={[
        'Nome completo',
        'Endereço de e-mail',
        'Número de telefone / WhatsApp',
        'Dados do agendamento (serviço, data, horário, profissional)',
        'Observações fornecidas voluntariamente pelo cliente',
      ]} />
    </Section>

    <Section title="2. Finalidade do uso dos dados">
      <P>Seus dados são utilizados exclusivamente para:</P>
      <Ul items={[
        'Confirmar e gerenciar agendamentos.',
        'Enviar notificações sobre seu atendimento.',
        'Entrar em contato em caso de cancelamentos ou alterações.',
        'Melhorar nossos serviços e experiência no site.',
      ]} />
    </Section>

    <Section title="3. Compartilhamento de dados">
      <P>Não vendemos, alugamos ou compartilhamos seus dados com terceiros para fins de marketing. Seus dados podem ser compartilhados apenas com:</P>
      <Ul items={[
        'Profissionais do próprio estúdio, para execução do serviço agendado.',
        'Plataforma de pagamento Mercado Pago, para processamento seguro de transações.',
        'Serviços de envio de e-mail (EmailJS), para notificações de agendamento.',
      ]} />
    </Section>

    <Section title="4. Armazenamento e segurança">
      <P>Os dados são armazenados localmente no navegador via <em>localStorage</em> (fase inicial) e protegidos pelos padrões de segurança dos provedores utilizados. Não armazenamos dados de cartão de crédito.</P>
    </Section>

    <Section title="5. Seus direitos (LGPD)">
      <P>Você tem direito a:</P>
      <Ul items={[
        'Acessar seus dados pessoais coletados.',
        'Solicitar a correção de dados incompletos ou incorretos.',
        'Solicitar a exclusão de seus dados.',
        'Revogar o consentimento para uso dos seus dados.',
        'Ser informado sobre com quem seus dados são compartilhados.',
      ]} />
      <P>Para exercer esses direitos, entre em contato pelo e-mail <strong style={{ color: 'var(--brown)' }}>dani@lumiestudio.com.br</strong>.</P>
    </Section>

    <Section title="6. Cookies">
      <P>Este site utiliza apenas cookies funcionais essenciais para o funcionamento do sistema de agendamento. Não utilizamos cookies de rastreamento ou publicidade.</P>
    </Section>

    <Section title="7. Contato do responsável">
      <P>Encarregado de Proteção de Dados (DPO): <strong style={{ color: 'var(--brown)' }}>Lumiê Studio</strong> — dani@lumiestudio.com.br</P>
    </Section>
  </div>
);

// ── CANCELLATION POLICY ───────────────────────────────────────────
const CancellationContent: React.FC = () => (
  <div>
    <p style={{ fontSize: '.88rem', color: 'var(--nude)', marginBottom: '2.5rem', lineHeight: 1.8, borderLeft: '3px solid var(--gold)', paddingLeft: '1rem' }}>
      Sabemos que imprevistos acontecem. Nossa política foi criada para ser justa tanto para as clientes quanto para nossas profissionais.
    </p>

    <Section title="1. Cancelamento pela cliente">
      <Ul items={[
        'Cancelamento com 24h ou mais de antecedência: reembolso integral.',
        'Cancelamento entre 12h e 24h antes: reembolso de 50% do valor pago.',
        'Cancelamento com menos de 12h de antecedência: sem reembolso.',
        'Não comparecimento sem aviso: sem reembolso.',
      ]} />
      <P>Para cancelar, entre em contato pelo WhatsApp <strong style={{ color: 'var(--brown)' }}>(11) 99529-7274</strong> ou e-mail <strong style={{ color: 'var(--brown)' }}>dani@lumiestudio.com.br</strong>.</P>
    </Section>

    <Section title="2. Cancelamento pelo estúdio">
      <P>Caso o Lumiê Studio precise cancelar um agendamento, o cliente será avisado com <strong>no mínimo 2 horas de antecedência</strong> e terá direito a:</P>
      <Ul items={[
        'Reagendamento sem custo adicional na data de sua preferência.',
        'Reembolso integral caso não queira reagendar.',
      ]} />
    </Section>

    <Section title="3. Reagendamento">
      <P>Reagendamentos são permitidos sem custo adicional, desde que solicitados com pelo menos <strong>12 horas de antecedência</strong>. Cada agendamento pode ser reagendado no máximo <strong>2 vezes</strong>.</P>
    </Section>

    <Section title="4. Reembolsos via Mercado Pago">
      <P>Reembolsos aprovados são processados pela plataforma Mercado Pago em até <strong>10 dias úteis</strong>, dependendo da modalidade de pagamento utilizada:</P>
      <Ul items={[
        'PIX: estorno em até 2 dias úteis.',
        'Cartão de crédito: estorno na fatura em até 2 faturas subsequentes.',
        'Cartão de débito: estorno em até 5 dias úteis.',
      ]} />
    </Section>

    <Section title="5. Atrasos">
      <P>Toleramos atrasos de até <strong>15 minutos</strong>. Após esse período, o atendimento pode ser cancelado sem reembolso, a critério da profissional, considerando a agenda do dia.</P>
    </Section>

    <Section title="6. Casos excepcionais">
      <P>Situações de força maior (emergências médicas, desastres naturais, etc.) serão analisadas individualmente. Entre em contato o mais breve possível para que possamos encontrar a melhor solução.</P>
    </Section>
  </div>
);
