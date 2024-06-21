import React from 'react'
import type { NextApiRequest, NextApiResponse } from 'next';
import { renderToString } from 'react-dom/server';
import EmailTemplate from '@/components/EmailTemplate'; // Assurez-vous que ce chemin est correct
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {

  const emailElement = React.createElement(EmailTemplate, {
    firstName: '',
    contactEmail: '',
    contactPhone: '',
    pickUpLocation: 'Riviéra CIAD, Abidjan',
    dropOffLocation: 'Riviéra CIAD, Abidjan',
    pickUpDate: '',
    pickUpTime: '',
    dropOffDate: '',
    dropOffTime: '',
    finalPrice: 0
  });

  const emailHtml = renderToString(emailElement);


  const { data, error } = await resend.emails.send({
    from: 'COCOGO <no-reply@cocogo.cloud>',
    to: ['on@d3cod.com'],
    subject: 'Confirmation de la réception de votre réservation',
    html: emailHtml,  // Utilisez le HTML généré
  });

  if (error) {
    return res.status(400).json({ message: "Erreur lors de l'envoi de l'email", error });
  }

  res.status(200).json({ message: 'Email envoyé avec succès', data });
}
