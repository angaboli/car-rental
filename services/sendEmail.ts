import { FormData } from '@/components/contact';
import { IFormValues } from '@/types';

async function sendRequest(apiEndpoint: string, data: object): Promise<string> {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result.message || 'E-mail envoyé avec succès';
  } catch (err) {
    console.error('Error sending request:', err);
    return 'Failed to send email';
  }
}

export function sendEmail(data: FormData): Promise<string> {
  return sendRequest('/api/email', data);
}

export function sendBookingEmail(data: IFormValues): Promise<string> {
  return sendRequest('/api/bookingEmail', data);
}