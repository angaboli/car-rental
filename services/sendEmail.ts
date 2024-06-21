import { FormData } from '@/components/contact';

export async function sendEmail(data: FormData): Promise<string> {
  const apiEndpoint = '/api/email/route';

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    //console.log("response:", result);
    return result.message || 'E-mail envoyé avec succès';
  } catch (err) {
    console.error('Error sending email:', err);
    return 'Failed to send email';
  }
}
