import React from 'react';

interface EmailTemplateProps {
  firstName: string;
  contactEmail: string;
  contactPhone: string;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  dropOffDate: string;
  dropOffTime: string;
  finalPrice: string;
}

const EmailReservation: React.FC<EmailTemplateProps> = ({
  firstName, contactEmail, contactPhone, pickUpLocation, dropOffLocation, pickUpDate, pickUpTime, dropOffDate, dropOffTime, finalPrice
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <p className="text-lg font-semibold">Confirmation de réception de votre réservation</p>
      <p>Date: {new Date().toLocaleDateString()}</p>
      <h1 className="text-xl mt-4 mb-2">Cher(e) {firstName},</h1>
      <p>Nous tenons à vous remercier pour avoir choisi <strong>COCO GO</strong> pour vos besoins de location. Nous avons bien reçu votre demande de réservation et sommes actuellement en train de traiter votre demande.</p>
      <p>Voici les détails de votre réservation :</p>
      <table>
        <tr>
          <td>Lieu de récuperation :</td>
          <td>{pickUpLocation}</td>
        </tr>
        <tr>
          <td>Lieu de retour :</td>
          <td>{dropOffLocation}</td>
        </tr>
        <tr>
          <td>Date et heure de récuperaiton :</td>
          <td>{pickUpDate} à {pickUpTime}</td>
        </tr>
        <tr>
          <td>Date et heure de retour :</td>
          <td>{dropOffDate} à {dropOffTime}</td>
        </tr>
        <tr>
          <td>Total de la reservation :</td>
          <td>{finalPrice}</td>
        </tr>
      </table>

      <p>Nous vous contacterons dans les plus brefs délais par email ou par SMS pour confirmer la disponibilité de votre réservation ainsi que pour vous fournir tous les détails nécessaires et les étapes suivantes.</p>
      <p>Si vous avez des questions ou si vous avez besoin d'assistance supplémentaire en attendant, n'hésitez pas à nous contacter à {contactEmail} ou par téléphone au {contactPhone}.</p>
      <p>Cordialement,</p>
      <p>L'équipe de COCO GO</p>
    </div>
  );
};

export default EmailReservation;
