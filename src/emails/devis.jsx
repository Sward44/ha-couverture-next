import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.NEXT_PUBLIC_HOST || "http://localhost:3001";

export const Devis = ({ metadata }) => {
  const [theme, setTheme] = React.useState("light");

  // Styles pour le thème 'light'
  const lightTheme = {
    main: {
      backgroundColor: "#ffffff",
      color: "#000000",
      margin: "0 10px",
      fontFamily: '"Mulish", Verdana, Tahoma, Helvetica, Arial, sans-serif',
    },
    header: {
      backgroundColor: "#f0f0f0",
      textAlign: "center",
      margin: "0 auto",
    },
    imageSrc: `https://drive.google.com/uc?export=view&id=10_1KCnTiP6-4LSWrVzBADwg8NG3tyoUk`, // Exemple d'image pour le thème 'light'
    colorLink: {
      color: "#000000",
    },
    paragraph: {
      fontSize: "14px",
      lineHeight: "22px",
      color: "#3c4043",
      marginBottom: "2px",
    },
  };

  // Styles pour le thème 'dark'
  const darkTheme = {
    main: {
      backgroundColor: "#1a1a1a",
      color: "#ffffff",
      margin: "0 10px",
      fontFamily: '"Mulish", Verdana, Tahoma, Helvetica, Arial, sans-serif',
    },
    header: {
      backgroundColor: "#333333",
      textAlign: "center",
      margin: "0 auto",
    },
    imageSrc: `https://drive.google.com/uc?export=view&id=10WtckB23YkK-ykhoCGknXBsnwAGZuElC`, // Exemple d'image pour le thème 'dark'
    colorLink: {
      color: "#ffffff",
    },
    paragraph: {
      fontSize: "14px",
      lineHeight: "22px",
      color: "#3c4043",
      marginBottom: "2px",
    },
  };

  // Sélection des styles en fonction du thème
  const currentTheme = theme === "light" ? lightTheme : darkTheme;
  return (
    <Html lang="fr">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Preview>Devis</Preview>
      <Body style={currentTheme.main}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src={currentTheme.imageSrc}
              alt="Logo de l'entreprise"
              style={centeredImage}
            />
          </Section>

          <Section style={paragraphContent}>
            <Hr style={hr} />
            <Text style={heading}>Message de David Launay</Text>
            {/* {metadata.ownerSurname} {metadata.ownerName}
          </Text> */}
            <Hr style={hr} />
            <Text style={currentTheme.paragraph}>
              Vous pouvez me joindre a ce numéro :
            </Text>
            <Link style={currentTheme.colorLink} href="telto:+33636946970">
              <Text style={heading}>06 36 94 69 70</Text>
            </Link>
            <Text style={currentTheme.paragraph}>
              Par e-mail, voici l&#39;adresse de reponse :
            </Text>
            <Link
              style={currentTheme.colorLink}
              href="mailto:davidlaunay567@gmail.com"
            >
              <Text style={heading}>davidlaunay567@gmail.com</Text>
            </Link>
            <Text style={currentTheme.paragraph}>
              Adresse du demandeur pour ce devis :
            </Text>
            <Text style={heading}>2 impasse de la tonnelle</Text>
            <Text style={heading}>44640 Le Pellerin</Text>
            <Hr style={hr} />
            <Text style={currentTheme.paragraph}>Le message de David :</Text>
            <Text style={heading}>!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!</Text>
          </Section>
          <Section style={paragraphContent}>
            <Text style={currentTheme.paragraph}>
              Le pièces jointes{" "}
              <Link
                style={currentTheme.colorLink}
                href="https://drive.google.com/drive/folders/1TVfckPb8ltv27yhiHBmY-TCUgXJxtGee"
              >
                David_Launay_24_sept_2024
              </Link>
            </Text>
            <Img
              src="https://drive.google.com/uc?export=3Dview&id=1t9-PI75rBnKUfREO4M_so0FJnMk38OUS"
              style="width:600px; max-width:100%;heigt:280px; objectif-fit:cover; objectif-fit:center;"
            ></Img>
          </Section>

          <Section style={{ ...paragraphContent, paddingBottom: 30 }}>
            <Column>
              <Row>
                <Link>
                  <Img src="" alt="" style="padding:0 10px" />
                </Link>
                <Link>
                  <Img src="" alt="" style="padding:0 10px" />
                </Link>
              </Row>
            </Column>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default Devis;

const header = {
  margin: "0 auto",
  textAlign: "center", // Ajouté pour centrer les éléments à l'intérieur
};

const centeredImage = {
  display: "block",
  width: "336px",
  margin: "0 auto",
  maxWidth: "100%", // Ajoute l'auto-margin pour centrer l'image
};

const container = {
  margin: "30px auto",
  borderRadius: 5,
  overflow: "hidden",
};

const containerContact = {
  backgroundColor: "#f0fcff",
  width: "90%",
  borderRadius: "5px",
  overflow: "hidden",
  paddingLeft: "20px",
};

const heading = {
  fontSize: "14px",
  lineHeight: "26px",
  fontWeight: "700",
  margin: "2px 0 2px 20px",
};

const paragraphContent = {
  padding: "0 15px",
};

const paragraphList = {
  paddingLeft: 40,
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#3c4043",
};

const link = {
  ...paragraph,
  color: "#004dcf",
};

const hr = {
  borderColor: "#e8eaed",
  margin: "20px 0",
};

const footer = {
  maxWidth: "100%",
};
