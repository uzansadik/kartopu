'use server';

import React from 'react';
import { Resend } from 'resend';
import { WelcomeEmail } from '@/components/email/welcome';

const resend = new Resend(process.env.RESEND_API_KEY!);
export async function sendWelcomeEmail(userName: string, userEmail: string) {
  await resend.emails.send({
    from: 'Kartopu.Net Ekibi <welcome@kartopu.net>',
    to: userEmail,
    subject: 'Hoş Geldiniz!',
    react: WelcomeEmail({ userFirstname: userName }),
  });
}
