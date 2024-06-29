import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { getCar } from '@/services';
import { render } from '@react-email/render';
import EmailTemplate from '@/components/EmailTemplate';
import { EmailTemplateProps } from '../../../types/index';

export async function POST(request: NextRequest) {
  try {
    const {
      pickUpLocation,
      dropOffLocation,
      pickUpDate,
      dropOffDate,
      dropOffTime,
      pickUpTime,
      firstName,
      lastName,
      emailAdress,
      phoneNumber,
      whatsAppNumber,
      finalPrice,
      age,
      withDriver,
      outCapital,
      carId,
      carDBId
    } = await request.json();


    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    const car = await getCar(carId);
    const carTitle= car.title

    const emailHtml = render(
      EmailTemplate({
        firstName,
        lastName,
        emailAdress,
        pickUpLocation,
        dropOffLocation,
        pickUpDate,
        pickUpTime,
        dropOffDate,
        dropOffTime,
        finalPrice,
        phoneNumber,
        whatsAppNumber,
        withDriver,
        outCapital,
        age,
        carDBId,
        carTitle
      }) as (EmailTemplateProps | any)
    );
    const bodyMessage = `Hello Admin,\n
    You have got a reservation from ${firstName} ${lastName} (${emailAdress}).\n\n
    Reservation details : \n
    Pick up : ${pickUpLocation} on ${pickUpDate} at ${pickUpTime}\n
    Drop off : ${dropOffLocation} on ${dropOffDate} at ${dropOffTime}\n
    Added service : with driver (${withDriver}) - out of Abidjan ${outCapital}\n
    Phone number :  ${phoneNumber} & whatsApp number : ${whatsAppNumber}\n
    Age : ${age} \n
    Final price : ${finalPrice}\n
    Car : ${car.title} (${carDBId})
    `;

    const mailOptions: Mail.Options = {
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: emailAdress,
      bcc: process.env.NEXT_PUBLIC_EMAIL_USER,
      subject: `Information sur la reservation de ${firstName} (${emailAdress})`,
      html: emailHtml,
    };

    const info = await transport.sendMail(mailOptions);
    //console.log('Message sent: %s', info.messageId);
    return NextResponse.json({ message: 'E-mail envoyé avec succès' });
  } catch (err) {
    console.error('Error sending email:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}