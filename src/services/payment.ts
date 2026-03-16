// ── Mercado Pago — Checkout Bricks (client-side) ──────────────────
// Documentação: https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks
//
// SETUP:
//   1. Crie conta em mercadopago.com.br
//   2. Acesse: Seu negócio > Credenciais
//   3. Copie sua PUBLIC KEY (começa com APP_USR- ou TEST-)
//   4. Adicione no .env: VITE_MP_PUBLIC_KEY=sua_chave_aqui
//
// IMPORTANTE: Para processar pagamentos reais você precisará de um
// backend (ex: Vercel Edge Function, Supabase Function ou Node.js)
// para criar a preferência de pagamento via API server-side.
// Esta implementação usa Checkout Pro (redirect) que não precisa de backend.

export interface PaymentItem {
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: 'BRL';
}

export interface MPPreference {
  bookingId: string;
  items: PaymentItem[];
  payer: {
    name: string;
    email: string;
    phone: string;
  };
  back_urls: {
    success: string;
    failure: string;
    pending: string;
  };
  auto_return: 'approved' | 'all';
  external_reference: string;
  notification_url?: string;
}

const MP_PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY ?? 'TEST-your-public-key';

// ── Cria URL de checkout via API do MP ────────────────────────────
// Nota: Em produção, mova isso para um endpoint backend seguro.
// A SECRET_KEY nunca deve ficar exposta no client.
export async function createMPCheckout(pref: MPPreference): Promise<string> {
  // Simulação client-side: redireciona para o Checkout Pro via SDK
  // Em produção substitua pela chamada ao seu backend:
  // const res = await fetch('/api/create-preference', { method: 'POST', body: JSON.stringify(pref) });
  // const { init_point } = await res.json();
  // return init_point;

  // Por ora retornamos a URL de sandbox para demonstração
  const params = new URLSearchParams({
    preference_id: `DEMO_${pref.bookingId}`,
    public_key: MP_PUBLIC_KEY,
    external_reference: pref.external_reference,
  });
  return `https://www.mercadopago.com.br/checkout/v1/redirect?${params.toString()}`;
}

// ── Extrai status do pagamento da URL (retorno do MP) ─────────────
export type MPStatus = 'approved' | 'pending' | 'failure' | null;

export function getMPStatusFromURL(): { status: MPStatus; bookingId: string | null } {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('status') as MPStatus;
  const ref    = params.get('external_reference');
  return { status, bookingId: ref };
}

// ── Formata preço para exibição ───────────────────────────────────
export function formatPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}
