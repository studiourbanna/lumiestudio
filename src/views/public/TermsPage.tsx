import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'terms' | 'privacy' | 'cancellation';

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'terms',        label: 'Termos de Uso',            emoji: '📋' },
  { id: 'privacy',      label: 'Política de Privacidade',  emoji: '🔒' },
  { id: 'cancellation', label: 'Cancelamento & Reembolso', emoji: '↩️' },
];

export const TermsPage: React.FC = () => {
  const [active, setActive] = useState<Tab>('terms');

  useEffect(() => {
    window.scrollTo(0, 0);
    const hash = window.location.hash.replace('#', '') as Tab;
    if (['terms','privacy','cancellation'].includes(hash)) setActive(hash);
  }, []);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', background: 'var(--blush)', paddingBottom: '80px' }}>
      <div style={{ background: 'var(--brown)', padding: '3.5rem 5%', textAlign: 'center' }}>
        <span style={{ fontSize: '.72rem', letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '.8rem' }}>Transparência & Segurança</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 300, color: 'var(--blush)', lineHeight: 1.2 }}>
          Termos, Privacidade & <em style={{ color: 'var(--gold)' }}>Políticas</em>
        </h1>
        <p style={{ marginTop: '.8rem', fontSize: '.82rem', color: 'rgba(248,240,245,.55)' }}>Última atualização: março de 2025 · Lumiê Beleza & Estética</p>
      </div>

      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--blush-dark)', position: 'sticky', top: '64px', zIndex: 50, overflowX: 'auto' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 5%', display: 'flex' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => { setActive(t.id); window.scrollTo({ top: 0 }); }} style={{
              padding: '1rem 1.4rem', background: 'transparent', border: 'none', cursor: 'pointer',
              borderBottom: active === t.id ? '2px solid var(--gold)' : '2px solid transparent',
              color: active === t.id ? 'var(--brown)' : 'var(--text-soft)',
              fontSize: '.75rem', letterSpacing: '.12em', textTransform: 'uppercase',
              fontFamily: 'var(--font-body)', transition: 'all .2s', whiteSpace: 'nowrap',
              marginBottom: '-1px', fontWeight: active === t.id ? 500 : 400,
            }}>{t.emoji} {t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '4rem 5%' }}>
        {active === 'terms'        && <TermsContent />}
        {active === 'privacy'      && <PrivacyContent />}
        {active === 'cancellation' && <CancellationContent />}
      </div>

      <div style={{ background: 'var(--white)', padding: '2.5rem 5%', textAlign: 'center', borderTop: '1px solid var(--blush-dark)' }}>
        <p style={{ fontSize: '.88rem', color: 'var(--text-soft)', marginBottom: '1.2rem' }}>Dúvidas sobre nossas políticas? Entre em contato.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contato" style={{ padding: '.65rem 1.6rem', border: '1px solid var(--gold)', color: 'var(--brown)', fontSize: '.75rem', letterSpacing: '.18em', textTransform: 'uppercase', transition: 'all .25s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--brown)'; }}>
            Falar conosco
          </Link>
          <Link to="/agendar" style={{ padding: '.65rem 1.6rem', background: 'var(--gold)', color: 'white', fontSize: '.75rem', letterSpacing: '.18em', textTransform: 'uppercase', transition: 'background .25s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#B78D2A')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--gold)')}>
            Agendar agora
          </Link>
        </div>
      </div>
    </div>
  );
};

// ── Helpers ────────────────────────────────────────────────────────
const S: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: '2.8rem' }}>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 400, color: 'var(--brown)', marginBottom: '1rem', paddingBottom: '.6rem', borderBottom: '1px solid var(--blush-dark)' }}>{title}</h2>
    <div style={{ fontSize: '.9rem', lineHeight: 1.95, color: 'var(--text-soft)' }}>{children}</div>
  </div>
);
const P: React.FC<{ children: React.ReactNode }> = ({ children }) => <p style={{ marginBottom: '1rem' }}>{children}</p>;
const Ul: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '.5rem', listStyleType: 'disc' }}>
    {items.map((item, i) => <li key={i}>{item}</li>)}
  </ul>
);
const H: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: 'rgba(215,166,41,.06)', borderLeft: '3px solid #D7A629', padding: '1rem 1.2rem', marginBottom: '1.5rem', borderRadius: '0 4px 4px 0', fontSize: '.88rem', lineHeight: 1.8, color: '#725E3A' }}>{children}</div>
);
const B: React.FC<{ children: React.ReactNode }> = ({ children }) => <strong style={{ color: '#725E3A', fontWeight: 600 }}>{children}</strong>;

// ── TERMS ──────────────────────────────────────────────────────────
const TermsContent: React.FC = () => (
  <div>
    <H>Ao acessar <B>lumiestudio.com.br</B> ou realizar qualquer agendamento no <B>Lumiê Beleza & Estética</B>, você declara ter lido, compreendido e concordado integralmente com os termos abaixo.</H>
    <S title="1. Identificação">
      <P><B>Nome fantasia:</B> Lumiê Studio — Lumiê Beleza & Estética</P>
      <P><B>Endereço:</B> R. Areado, 11 — Conj. Hab. Pres. Castelo Branco, Carapicuíba — SP, CEP 06327-170</P>
      <P><B>Contato:</B> (11) 99529-7274 · dani@lumiestudio.com.br</P>
      <P><B>Atendimento:</B> Segunda a Sábado, das 9h às 19h</P>
    </S>
    <S title="2. Objeto">
      <P>O presente documento regula o uso do site e do sistema de agendamento online, bem como a contratação de serviços de beleza e estética prestados pelo Lumiê Studio, incluindo:</P>
      <Ul items={['Skincare & Facial', 'Manicure & Nail Art', 'Design de Sobrancelhas', 'Spa & Relaxamento', 'Consultoria de Beleza']} />
    </S>
    <S title="3. Cadastro e Agendamento">
      <P>Para realizar um agendamento online, o cliente deve fornecer informações verídicas e completas. Ao concluir o agendamento, o cliente declara que:</P>
      <Ul items={[
        'É maior de 18 anos ou está acompanhado de responsável legal;',
        'As informações de nome, telefone, e-mail e dados de pagamento são verdadeiras;',
        'Compreende o serviço, profissional, data e horário selecionados;',
        'Concorda com a Política de Cancelamento e Reembolso vigente.',
      ]} />
    </S>
    <S title="4. Confirmação e Pagamento">
      <P>O agendamento é considerado <B>confirmado</B> somente após a confirmação do pagamento via PIX ou cartão, processado pela plataforma <B>Mercado Pago</B>. Agendamentos pendentes podem ser cancelados automaticamente após 2 horas sem pagamento.</P>
      <P>O Lumiê Studio não armazena dados de cartão. Todo o processamento é feito com segurança pelo Mercado Pago, em conformidade com as normas PCI-DSS.</P>
    </S>
    <S title="5. Prestação dos Serviços">
      <P>O Lumiê Studio compromete-se a executar os serviços com qualidade, higiene, profissionalismo e produtos certificados. O cliente compromete-se a:</P>
      <Ul items={[
        'Comparecer no horário agendado (tolerância de até 15 minutos);',
        'Informar antecipadamente alergias, condições de saúde ou contraindicações;',
        'Tratar as profissionais com respeito e cordialidade.',
      ]} />
    </S>
    <S title="6. Propriedade Intelectual">
      <P>Todo o conteúdo do site — logotipo, textos, imagens e código — é propriedade exclusiva do Lumiê Studio, protegido pela Lei nº 9.610/1998. É vedada a reprodução ou uso comercial sem autorização prévia.</P>
    </S>
    <S title="7. Limitação de Responsabilidade">
      <P>O Lumiê Studio não se responsabiliza por reações decorrentes de informações omitidas pelo cliente, falhas em sistemas de terceiros ou indisponibilidade temporária do site por razões técnicas.</P>
    </S>
    <S title="8. Legislação e Foro">
      <P>Estes Termos são regidos pela legislação brasileira, especialmente pelo <B>Código de Defesa do Consumidor (Lei nº 8.078/1990)</B> e pelo <B>Marco Civil da Internet (Lei nº 12.965/2014)</B>. Fica eleito o foro da comarca de <B>Carapicuíba — SP</B>.</P>
    </S>
  </div>
);

// ── PRIVACY ────────────────────────────────────────────────────────
const PrivacyContent: React.FC = () => (
  <div>
    <H>Esta Política descreve como o <B>Lumiê Studio</B> coleta, usa, armazena e protege seus dados pessoais, em conformidade com a <B>LGPD — Lei nº 13.709/2018</B>.</H>
    <S title="1. Controladora dos Dados">
      <P><B>Lumiê Beleza & Estética</B><br />R. Areado, 11 — Carapicuíba — SP · CEP 06327-170<br />dani@lumiestudio.com.br · (11) 99529-7274</P>
    </S>
    <S title="2. Dados Coletados">
      <P>Coletamos apenas os dados estritamente necessários:</P>
      <Ul items={[
        <><B>Identificação:</B> nome completo e como prefere ser chamada;</>,
        <><B>Contato:</B> telefone/WhatsApp e e-mail;</>,
        <><B>Agendamento:</B> serviço, profissional, data e horário;</>,
        <><B>Saúde (voluntários):</B> alergias ou contraindicações informadas para segurança;</>,
        <><B>Pagamento:</B> processados pelo Mercado Pago — não armazenamos dados de cartão;</>,
        <><B>Navegação:</B> dados técnicos básicos (IP, navegador) para segurança do site.</>,
      ]} />
    </S>
    <S title="3. Finalidade e Base Legal">
      <P>Seus dados são tratados com base na LGPD:</P>
      <Ul items={[
        <><B>Execução de contrato (Art. 7º, V):</B> para confirmar agendamentos, processar pagamentos e enviar notificações;</>,
        <><B>Legítimo interesse (Art. 7º, IX):</B> para melhorar serviços e prevenir fraudes;</>,
        <><B>Obrigação legal (Art. 7º, II):</B> quando exigido por legislação fiscal;</>,
        <><B>Consentimento (Art. 7º, I):</B> para comunicações de marketing.</>,
      ]} />
    </S>
    <S title="4. Compartilhamento de Dados">
      <P><B>Não vendemos nem comercializamos seus dados.</B> O compartilhamento ocorre apenas com:</P>
      <Ul items={[
        'Profissionais do estúdio, para execução do serviço agendado;',
        'Mercado Pago, para processamento de pagamentos;',
        'EmailJS, para notificações de agendamento;',
        'Autoridades públicas, quando exigido por lei.',
      ]} />
    </S>
    <S title="5. Segurança e Retenção">
      <P>Dados armazenados em banco de dados seguro com criptografia TLS/SSL em trânsito e em repouso. Mantemos os dados pelo período necessário ao cumprimento das finalidades e prazos legais. Após esse período, os dados são anonimizados ou excluídos com segurança.</P>
    </S>
    <S title="6. Cookies">
      <P>Utilizamos apenas <B>cookies funcionais essenciais</B> para o sistema de agendamento. Não utilizamos cookies de rastreamento ou publicidade comportamental.</P>
    </S>
    <S title="7. Seus Direitos (Art. 18 LGPD)">
      <P>Você tem direito a:</P>
      <Ul items={[
        'Confirmação e acesso aos seus dados;',
        'Correção de dados incompletos ou inexatos;',
        'Anonimização, bloqueio ou eliminação de dados desnecessários;',
        'Portabilidade em formato estruturado;',
        'Eliminação de dados tratados com base em consentimento;',
        'Revogação do consentimento a qualquer momento;',
        'Informação sobre compartilhamentos realizados.',
      ]} />
      <P>Para exercer esses direitos, contate <B>dani@lumiestudio.com.br</B>. Respondemos em até 15 dias úteis.</P>
    </S>
    <S title="8. Menores de Idade">
      <P>Não coletamos dados de menores de 18 anos sem consentimento dos responsáveis legais.</P>
    </S>
    <S title="9. Encarregada (DPO)">
      <P><B>Danielle Martins</B> — dani@lumiestudio.com.br · (11) 99529-7274</P>
    </S>
  </div>
);

// ── CANCELLATION ───────────────────────────────────────────────────
const CancellationContent: React.FC = () => (
  <div>
    <H>Nossa política foi elaborada para ser justa e transparente, em conformidade com o <B>Código de Defesa do Consumidor (Lei nº 8.078/1990)</B>.</H>
    <S title="1. Cancelamento pela Cliente">
      <P>Comunique o cancelamento pelo WhatsApp <B>(11) 99529-7274</B> ou e-mail <B>dani@lumiestudio.com.br</B>:</P>
      <div style={{ overflowX: 'auto', marginBottom: '1.2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.88rem' }}>
          <thead>
            <tr style={{ background: 'rgba(215,166,41,.08)' }}>
              {['Antecedência do cancelamento','Reembolso'].map(h => (
                <th key={h} style={{ padding: '.75rem 1rem', textAlign: 'left', borderBottom: '2px solid #D7A629', fontSize: '.72rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#725E3A' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['48 horas ou mais antes','100% do valor pago'],
              ['Entre 24h e 48h antes','75% do valor pago'],
              ['Entre 12h e 24h antes','50% do valor pago'],
              ['Menos de 12 horas antes','Sem reembolso'],
              ['Não comparecimento sem aviso','Sem reembolso'],
            ].map(([prazo, reembolso], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--blush)' }}>
                <td style={{ padding: '.75rem 1rem', borderBottom: '1px solid var(--blush-dark)', color: '#7A6A58' }}>{prazo}</td>
                <td style={{ padding: '.75rem 1rem', borderBottom: '1px solid var(--blush-dark)', color: reembolso === 'Sem reembolso' ? '#ef4444' : '#059669', fontWeight: 500 }}>{reembolso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </S>
    <S title="2. Cancelamento pelo Lumiê Studio">
      <P>Em situações excepcionais, notificaremos com no mínimo <B>2 horas de antecedência</B>. O cliente terá direito a reagendamento prioritário sem custo ou reembolso integral (100%).</P>
    </S>
    <S title="3. Reagendamento">
      <P>Aceito sem custo com no mínimo <B>12 horas de antecedência</B>. Limite de <B>2 reagendamentos</B> por agendamento. A partir do terceiro, pode ser cobrada taxa administrativa de 10%.</P>
    </S>
    <S title="4. Atrasos">
      <P>Toleramos até <B>15 minutos</B> de atraso. Após esse período, o atendimento pode ser cancelado sem reembolso, a critério da profissional.</P>
    </S>
    <S title="5. Prazos de Reembolso (Mercado Pago)">
      <Ul items={[
        <><B>PIX:</B> até 1 dia útil após aprovação;</>,
        <><B>Cartão de débito:</B> até 5 dias úteis;</>,
        <><B>Cartão de crédito:</B> até 2 ciclos de faturamento, conforme a operadora.</>,
      ]} />
    </S>
    <S title="6. Direito de Arrependimento (CDC, Art. 49)">
      <P>Para contratações pela internet, você tem <B>7 dias corridos</B> a partir da contratação para desistir, com reembolso integral, desde que o serviço não tenha sido prestado. Contate <B>dani@lumiestudio.com.br</B> para exercer esse direito.</P>
    </S>
    <S title="7. Insatisfação com o Serviço">
      <P>Caso o serviço não corresponda ao esperado, entre em contato em até <B>48 horas</B> após o atendimento pelo WhatsApp <B>(11) 99529-7274</B>. Analisaremos cada situação individualmente.</P>
    </S>
    <S title="8. Casos Excepcionais">
      <P>Emergências médicas e situações de força maior serão analisadas com humanidade, podendo resultar em reagendamento sem custo ou reembolso integral.</P>
    </S>
    <S title="9. Canais de Atendimento">
      <Ul items={[
        <><B>WhatsApp:</B> (11) 99529-7274 — seg. a sáb., das 9h às 19h;</>,
        <><B>E-mail:</B> dani@lumiestudio.com.br — resposta em até 24h úteis;</>,
        <><B>Presencial:</B> R. Areado, 11 — Carapicuíba — SP.</>,
      ]} />
    </S>
  </div>
);
