import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    const { email, name, message } = await request.json();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });
    const bodyMessage = `Hello Admin, \nYou have got a message from ${name} (${email}). \n\n<strong>Message</strong> : \n${message}`;

    const mailOptions: Mail.Options = {
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: process.env.NEXT_PUBLIC_EMAIL_USER,
      subject: `Message from ${name} (${email})`,
      text: bodyMessage,
    };

    const info = await transport.sendMail(mailOptions);
    //console.log('Message sent: %s', info.messageId);
    return NextResponse.json({ message: 'E-mail envoyé avec succès' });
  } catch (err) {
    console.error('Error sending email:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}