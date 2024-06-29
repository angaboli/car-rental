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
  Link
} from "@react-email/components";
import * as React from "react";
import logo from '../public/logo.svg';
import { EmailTemplateProps } from "@/types";


const EmailTemplate: React.FC<EmailTemplateProps | any> = ({
  firstName, lastName, phoneNumber, whatsAppNumber, pickUpLocation, dropOffLocation, pickUpDate, pickUpTime, dropOffDate, dropOffTime, finalPrice, age, carTitle, carDBId, outCapital, withDriver
}) => {
  console.log("logo email: ", logo)
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
                  Cher(e) {firstName} {lastName},
                </Heading>

                <Text style={paragraph}>
                  Nous tenons à vous remercier pour avoir choisi <strong>COCOGO</strong> pour vos besoins de location. Nous avons bien reçu votre demande de réservation et sommes actuellement en train de traiter votre demande.
                </Text>
                <Text style={paragraph}>
                  Voici les détails de votre réservation :
                </Text>

                <Text style={{ ...paragraph, marginTop: -5 }}>
                  Récuperation au <b>{pickUpLocation}</b> le <b>{pickUpDate}</b> à <b>{pickUpTime}</b>
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  Retour au : <b>{dropOffLocation}</b> le <b>{dropOffDate}</b> à <b>{dropOffTime}</b>
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  Votre numéro de tél : <b>{phoneNumber}</b>{ whatsAppNumber && ` et numéro whatssApp <b>${whatsAppNumber}</b>`}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  Age : <b>{age}</b>
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  Service ajouté : <b>Avec chaffeur ({withDriver})</b> - <b>Hors Capital ({outCapital})</b>
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  Voiture reservé : <b>{carTitle} ({carDBId})</b>
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  Le total de la reservation : <b>{finalPrice}</b>
                </Text>


                <Text style={{ ...paragraph, marginTop: -5 }}>Nous vous contacterons dans les plus brefs délais par email ou par SMS pour confirmer la disponibilité
                    de votre réservation ainsi que pour vous fournir tous les détails nécessaires et les étapes suivantes.
                  </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>Si vous avez des questions ou si vous avez besoin d'assistance supplémentaire en attendant,
                  n'hésitez pas à nous contacter à contact@cocogo.cloud.
                </Text>

                <Text style={{ ...paragraph, marginTop: -5 }}>Cordialement,</Text>

              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <link href="https://cocogo.cloud" style={button}>En savoir plus</link>
              </Column>
            </Row>
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "rgb(0,0,0, 0.7)",
              }}
            >
              © {new Date().getFullYear()} | COCOGO, Riviera CIAD, Abidjan, Côte d'ivoire | www.cocogo.cloud
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
  backgroundColor: "#C4842C",
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