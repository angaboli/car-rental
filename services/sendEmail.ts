import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// Définition d'un type pour la réponse en cas de succès
interface SuccessResponse {
  success: true;
  message: string;
  info: nodemailer.SentMessageInfo;
}

// Définition d'un type pour la réponse en cas d'échec
interface ErrorResponse {
  success: false;
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  const { email, subject, message } = req.body;

  // Vérification de la presence necessaire des variables d'environnement
  if (!process.env.NEXT_PUBLIC_EMAIL_HOST || !process.env.NEXT_PUBLIC_EMAIL_PORT || !process.env.NEXT_PUBLIC_EMAIL_USER || !process.env.NEXT_PUBLIC_EMAIL_PASS) {
    return res.status(500).json({ success: false, error: 'Les configurations SMTP ne sont pas définies correctement.' });
  }

  let transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_EMAIL_HOST,
    port: parseInt(process.env.NEXT_PUBLIC_EMAIL_PORT, 10),
    secure: false, // true pour le port 465, false pour les autres ports
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER, // utilisateur SMTP
      pass: process.env.NEXT_PUBLIC_EMAIL_PASS, // mot de passe SMTP
    },
  });

  let mailOptions = {
    from: '"COCO GO" <no-reply@cocogo.cloud>', // adresse de l'expéditeur
    to: email, // liste des destinataires
    subject: subject, // Ligne de sujet
    // text: message, // corps de l'email en texte brut
    html: message, // corps de l'email en HTML (optionnel)
  };

  transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    res.status(200).json({ success: true, message: "Email envoyé avec succès", info });
  });
}
