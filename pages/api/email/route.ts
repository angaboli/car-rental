import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export default async function handler(request: NextApiRequest, res: NextApiResponse) {

  if (request.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, name, message } = request.body;

  const transport = nodemailer.createTransport({
    service: 'gmail',
    /*
        setting service as 'gmail' is same as providing these setings:

        host: "smtp.gmail.com",
        port: 465,
        secure: true

        If you want to use a different email provider other than gmail, you need to provide these manually.
        Or you can go use these well known services and their settings at
        https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
    */

    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.NEXT_PUBLIC_EMAIL_USER,
    to: process.env.NEXT_PUBLIC_EMAIL_USER,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Message from ${name} (${email})`,
    text: message,
  };

  try {
    const info = await transport.sendMail(mailOptions);
    //console.log('Message sent: %s', info.accepted);
    res.status(200).json({ message: 'E-mail envoyé avec succès' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}