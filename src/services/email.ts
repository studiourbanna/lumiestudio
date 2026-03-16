import emailjs from '@emailjs/browser';
import type { Booking } from '../models';
import { SERVICES, PROFESSIONALS } from './data';

// ── EmailJS config — preencha no .env ou direto aqui para testes ──
// Crie sua conta em https://emailjs.com e configure:
//   1. Email Service (Gmail / SMTP)
//   2. Dois templates (ver abaixo)
//   3. Copie Service ID, Template IDs e Public Key
const EJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  ?? 'YOUR_SERVICE_ID';
const EJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  ?? 'YOUR_PUBLIC_KEY';

// Template para profissional — variáveis esperadas no template:
//   {{to_email}} {{prof_name}} {{client_name}} {{client_phone}}
//   {{client_email}} {{service_name}} {{date}} {{time}} {{notes}} {{booking_id}}
const TPL_PROFESSIONAL = import.meta.env.VITE_EMAILJS_TPL_PROF ?? 'template_professional';

// Template para cliente — variáveis esperadas:
//   {{to_email}} {{client_name}} {{service_name}} {{prof_name}}
//   {{date}} {{time}} {{booking_id}} {{studio_phone}}
const TPL_CLIENT = import.meta.env.VITE_EMAILJS_TPL_CLIENT ?? 'template_client';

// Template de confirmação de pagamento — variáveis:
//   {{to_email}} {{client_name}} {{service_name}} {{date}} {{time}} {{amount}} {{booking_id}}
const TPL_PAYMENT_CONFIRMED = import.meta.env.VITE_EMAILJS_TPL_PAYMENT ?? 'template_payment';

// E-mails das profissionais por ID
const PROF_EMAILS: Record<string, string> = {
  'prof-1': import.meta.env.VITE_EMAIL_SIMONE ?? 'simone@lumiestudio.com.br',
  'prof-2': import.meta.env.VITE_EMAIL_RAFAELA ?? 'rafaela@lumiestudio.com.br',
  'prof-3': import.meta.env.VITE_EMAIL_DANI ?? 'dani@lumiestudio.com.br',
};

emailjs.init(EJS_PUBLIC_KEY);

function getServiceName(id: string) {
  return SERVICES.find(s => s.id === id)?.name ?? id;
}
function getProfName(id: string) {
  return PROFESSIONALS.find(p => p.id === id)?.name ?? id;
}
function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    .format(new Date(y, m - 1, d));
}

// ── 1. Notifica profissional — novo agendamento pendente ──────────
export async function notifyProfessional(booking: Booking): Promise<void> {
  const profEmail = PROF_EMAILS[booking.professionalId];
  if (!profEmail) return;

  await emailjs.send(EJS_SERVICE_ID, TPL_PROFESSIONAL, {
    to_email:     profEmail,
    prof_name:    getProfName(booking.professionalId),
    client_name:  booking.clientName,
    client_phone: booking.clientPhone,
    client_email: booking.clientEmail,
    service_name: getServiceName(booking.serviceId),
    date:         formatDate(booking.date),
    time:         booking.time,
    notes:        booking.notes || 'Nenhuma observação',
    booking_id:   `#${booking.id.slice(-6).toUpperCase()}`,
    status:       'Aguardando pagamento',
  });
}

// ── 2. Confirma pagamento — envia para cliente + profissional ─────
export async function notifyPaymentConfirmed(booking: Booking, amount: number): Promise<void> {
  const profEmail = PROF_EMAILS[booking.professionalId];
  const amountFmt = `R$ ${amount.toFixed(2).replace('.', ',')}`;

  // Para o cliente
  await emailjs.send(EJS_SERVICE_ID, TPL_PAYMENT_CONFIRMED, {
    to_email:     booking.clientEmail,
    client_name:  booking.clientName,
    service_name: getServiceName(booking.serviceId),
    prof_name:    getProfName(booking.professionalId),
    date:         formatDate(booking.date),
    time:         booking.time,
    booking_id:   `#${booking.id.slice(-6).toUpperCase()}`,
    amount:       amountFmt,
    studio_phone: '(11) 99529-7274',
  });

  // Para a profissional (atualiza status)
  if (profEmail) {
    await emailjs.send(EJS_SERVICE_ID, TPL_PROFESSIONAL, {
      to_email:     profEmail,
      prof_name:    getProfName(booking.professionalId),
      client_name:  booking.clientName,
      client_phone: booking.clientPhone,
      client_email: booking.clientEmail,
      service_name: getServiceName(booking.serviceId),
      date:         formatDate(booking.date),
      time:         booking.time,
      notes:        booking.notes || 'Nenhuma observação',
      booking_id:   `#${booking.id.slice(-6).toUpperCase()}`,
      status:       `✅ PAGAMENTO CONFIRMADO — ${amountFmt}`,
    });
  }
}

// ── 3. Notifica cliente — agendamento recebido ────────────────────
export async function notifyClient(booking: Booking): Promise<void> {
  await emailjs.send(EJS_SERVICE_ID, TPL_CLIENT, {
    to_email:     booking.clientEmail,
    client_name:  booking.clientName,
    service_name: getServiceName(booking.serviceId),
    prof_name:    getProfName(booking.professionalId),
    date:         formatDate(booking.date),
    time:         booking.time,
    booking_id:   `#${booking.id.slice(-6).toUpperCase()}`,
    studio_phone: '(11) 99529-7274',
  });
}
