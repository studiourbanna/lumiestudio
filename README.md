<div align="center">

<img src="src/assets/logo.png" alt="Lumiê Studio" height="120" />

# lumiestudio — Site & Sistema de Agendamento

**Site institucional com sistema completo de agendamento online, painel do cliente e integração com banco de dados em tempo real.**

[![Deploy](https://github.com/lumiestudiocare/lumiestudiocare.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/lumiestudiocare/lumiestudiocare.github.io/actions/workflows/deploy.yml)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Realtime-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![License](https://img.shields.io/badge/license-MIT-gold)](LICENSE)

🌐 **[lumiestudio.com.br](https://lumiestudio.com.br)** · 🔐 **[admin.lumiestudio.com.br](https://admin.lumiestudio.com.br)**

</div>

---

## Sobre o projeto

O **Lumiê Studio** é um studio de beleza e estética localizado em Carapicuíba/SP. Este repositório contém o site institucional público com sistema de agendamento online integrado ao Supabase, painel do cliente autenticado e CI/CD via GitHub Actions.

O projeto foi desenvolvido com arquitetura **MVVM**, separando claramente responsabilidades entre modelos de domínio, lógica de negócio e camada de apresentação.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Estado global | Zustand 5 (persist) |
| Roteamento | React Router v7 |
| Banco de dados | Supabase (PostgreSQL + Realtime + Auth) |
| E-mails | EmailJS (2 templates) |
| Pagamentos | Mercado Pago (Checkout Pro — em integração) |
| Ícones | Font Awesome 6 |
| Fontes | Cormorant Garamond + Jost (Google Fonts) |
| Deploy | GitHub Pages via GitHub Actions |

---

## Arquitetura — MVVM

```
src/
├── models/            → Tipos e interfaces de domínio
│   └── index.ts          Booking, Service, Professional, BookingStatus
│
├── services/          → Acesso a dados e integrações externas
│   ├── data.ts           Dados estáticos: serviços, profissionais, horários
│   ├── supabase.ts       Cliente Supabase configurado
│   ├── email.ts          Serviço EmailJS (notificações)
│   └── payment.ts        Serviço Mercado Pago (checkout)
│
├── store/             → Estado global (Zustand)
│   ├── index.ts          BookingStore + AuthStore (localStorage)
│   └── clientAuth.ts     ClientAuthStore (Supabase Auth)
│
├── viewmodels/        → Lógica de negócio desacoplada das views
│   └── index.ts          useBookingViewModel + useAdminViewModel
│
├── hooks/             → Hooks reutilizáveis
│   └── useReveal.ts      IntersectionObserver para scroll reveal
│
├── router/            → Definição de rotas
│   └── index.tsx         Rotas públicas, protegidas e standalone
│
├── components/ui/     → Componentes base reutilizáveis
│   ├── Navbar.tsx        Navegação responsiva com menu hambúrguer
│   ├── FixedFooter.tsx   Rodapé fixo com WhatsApp flutuante
│   └── index.tsx         Button, Input, Textarea, Modal, StatusBadge, Card
│
└── views/
    ├── public/           Páginas públicas
    │   ├── HomePage.tsx
    │   ├── BookingPage.tsx      Wizard 5 etapas com pré-preenchimento
    │   ├── ContactPage.tsx
    │   ├── TestimonialsPage.tsx Depoimentos + formulário pós-atendimento
    │   ├── ClientPortalPage.tsx Painel da cliente autenticada
    │   ├── ConfirmPage.tsx      Confirmação de e-mail (Supabase Auth)
    │   ├── TermsOfUsePage.tsx
    │   ├── PrivacyPolicyPage.tsx
    │   └── CancellationPolicyPage.tsx
    └── admin/            Painel administrativo legado
        ├── AdminLoginPage.tsx
        └── AdminDashboardPage.tsx
```

---

## Funcionalidades

### Site público
- Landing page com Hero, Serviços, Sobre, Depoimentos, CTA e Footer
- Serviços clicáveis que pré-selecionam profissional no agendamento
- Rodapé fixo com WhatsApp flutuante (aparece ao rolar)
- Menu hambúrguer responsivo (mobile-first, drawer pela esquerda)

### Agendamento online — 5 etapas
```
1. Serviço + Profissional
2. Data (calendário 35 dias) + Horário (slots em tempo real)
3. Dados do cliente + aceite de Termos (obrigatório)
   └── Checkbox "usar meus dados" para clientes logadas
4. Pagamento (Mercado Pago — PIX / Crédito / Débito)
5. Confirmação com código e status
```

### Painel da cliente (`/minha-conta`)
- Login e cadastro via Supabase Auth
- Dashboard com próximo agendamento em destaque
- Histórico completo de sessões com valores e status
- Saldo de manutenções
- Edição de dados pessoais
- Depoimentos enviados (com status de aprovação)

### Depoimentos (`/depoimentos`)
- Grid com nota média e avaliações aprovadas
- Formulário pós-atendimento com estrelas interativas
- Moderação no painel admin antes da publicação

### Páginas legais
- `/termos/uso` — Termos de Uso
- `/termos/privacidade` — Política de Privacidade (LGPD)
- `/termos/cancelamento` — Política de Cancelamento e Reembolso

---

## Banco de dados — Supabase

### Tabelas

```sql
clients          → Clientes cadastrados (vinculados ao Auth)
bookings         → Agendamentos (FK → clients, services, professionals)
services         → Catálogo de serviços
professionals    → Equipe do estúdio
professional_services → Relacionamento M:N profissional ↔ serviço
testimonials     → Depoimentos (FK → clients, services)
notifications    → Notificações do sistema
chat_messages    → Chat em tempo real (FK → bookings)
```

### Trigger de sincronização Auth → clients

```sql
-- Cria automaticamente registro em clients ao cadastrar via Auth
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### Row Level Security (RLS)

| Tabela | Público | Cliente autenticada | Admin |
|--------|---------|---------------------|-------|
| `services` | SELECT | — | ALL |
| `professionals` | SELECT | — | ALL |
| `bookings` | INSERT, SELECT próprios | SELECT próprios | ALL |
| `clients` | — | SELECT/UPDATE próprio | ALL |
| `testimonials` | SELECT (aprovados) + INSERT | SELECT próprios | ALL |

---

## CI/CD — GitHub Actions

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build → npm ci → npm run build (com secrets como VITE_*)
  deploy → actions/deploy-pages@v4
```

### Secrets necessários

| Secret | Descrição |
|--------|-----------|
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_ANON` | Chave anon pública |
| `VITE_EMAILJS_SERVICE_ID` | ID do serviço EmailJS |
| `VITE_EMAILJS_PUBLIC_KEY` | Chave pública EmailJS |
| `VITE_EMAILJS_TPL_PROF` | Template para profissionais |
| `VITE_EMAILJS_TPL_CLIENT` | Template para clientes |
| `VITE_EMAIL_SIMONE` | E-mail da profissional |
| `VITE_EMAIL_RAFAELA` | E-mail da profissional |
| `VITE_EMAIL_DANI` | E-mail da profissional |
| `VITE_MP_PUBLIC_KEY` | Chave pública Mercado Pago |

---

## Setup local

```bash
# 1. Clonar o repositório
git clone https://github.com/lumiestudiocare/lumiestudiocare.github.io.git
cd lumiestudiocare.github.io

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# edite .env.local com suas credenciais

# 4. Rodar em desenvolvimento
npm run dev

# 5. Build de produção
npm run build
```

**Node.js 20+** é obrigatório.

---

## DNS — Domínio customizado

O site utiliza domínio apex (sem `www`) via registros `A` no Registro.br:

```
A  lumiestudio.com.br  185.199.108.153
A  lumiestudio.com.br  185.199.109.153
A  lumiestudio.com.br  185.199.110.153
A  lumiestudio.com.br  185.199.111.153
```

O arquivo `public/CNAME` contém `lumiestudio.com.br` e é copiado para `dist/` no build.

### SPA Routing no GitHub Pages

Como o GitHub Pages não suporta rotas SPA nativamente, o projeto usa o padrão `sessionStorage`:

```html
<!-- 404.html: salva a URL original -->
<script>sessionStorage.setItem('redirect', location.href);</script>
<meta http-equiv="refresh" content="0;url=/">

<!-- index.html: restaura antes do React montar -->
<script>
  var r = sessionStorage.getItem('redirect');
  if (r) { sessionStorage.removeItem('redirect'); history.replaceState(null, '', new URL(r).pathname); }
</script>
```

---

## Repositórios relacionados

| Repositório | Descrição |
|-------------|-----------|
| [`lumiestudiocare/lumiestudio-admin`](https://github.com/lumiestudiocare/lumiestudio-admin) | Painel administrativo (React + Supabase Realtime) |

---

## Licença

MIT © [Lumiê Studio](https://lumiestudio.com.br)

---

<div align="center">
  <sub>Desenvolvido com ✦ para o Lumiê Studio — Beleza & Estética · Carapicuíba/SP</sub>
</div>
