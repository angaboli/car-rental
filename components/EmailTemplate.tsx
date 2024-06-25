import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import logo from '@/public/logo.svg';


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
  finalPrice: number;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName, contactEmail, contactPhone, pickUpLocation, dropOffLocation, pickUpDate, pickUpTime, dropOffDate, dropOffTime, finalPrice
}) => {
  return (
    <Html>
      <Head />
      <Preview>Confirmation de réception de votre réservation</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img src={`${logo}`} />
          </Section>
          <Section style={content}>
            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Text style={paragraph}>
                  Date: {new Date().toLocaleDateString()}
                </Text>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Cher(e) {firstName},
                </Heading>

                <Text style={paragraph}>
                  Nous tenons à vous remercier pour avoir choisi <strong>COCOGO</strong> pour vos besoins de location. Nous avons bien reçu votre demande de réservation et sommes actuellement en train de traiter votre demande.
                </Text>
                <Text style={paragraph}>
                  Voici les détails de votre réservation :
                </Text>

                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Lieu de récuperation :</b>
                  {pickUpLocation}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Lieu de retour : </b>
                  {dropOffLocation}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Date et heure de récuperaiton : </b>
                  {pickUpDate} à {pickUpTime}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Date et heure de retour : </b>
                  {dropOffDate} à {dropOffTime}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Total de la reservation : </b>
                  {finalPrice}
                </Text>


                <Text style={{ ...paragraph, marginTop: -5 }}>Nous vous contacterons dans les plus brefs délais par email ou par SMS pour confirmer la disponibilité
                    de votre réservation ainsi que pour vous fournir tous les détails nécessaires et les étapes suivantes.
                  </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>Si vous avez des questions ou si vous avez besoin d'assistance supplémentaire en attendant,
                  n'hésitez pas à nous contacter à {contactEmail} ou par téléphone au {contactPhone}.
                </Text>

                <Text style={{ ...paragraph, marginTop: -5 }}>Cordialement,</Text>


                <Text style={{ ...paragraph, marginTop: -5 }}>
                  If this wasn't you or if you have additional questions, please
                  see our support page.
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Button style={button}>Learn More</Button>
              </Column>
            </Row>
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "rgb(0,0,0, 0.7)",
              }}
            >
              © 2024 | COCOGO, Riviera CIAD, Abidjan, Côte d'ivoire | www.cocogo.cloud
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>

  );
};

export default EmailTemplate;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};