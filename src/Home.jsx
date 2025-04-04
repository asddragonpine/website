import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Home from "./Home"; // Il tuo componente per la Home
import Event from "./Event"; // Pagina Eventi
//import Contacts from "./Contacts"; // Pagina Contatti
import Navbar from "./Navbar"; // Se il Menu è separato
import { Container, Overlay, Text, Title, Paper, Divider } from "@mantine/core";
import classes from "./HeroContentLeft.module.css";
import { LinkOutlined } from "@ant-design/icons";
import { InstagramOutlined, CalendarOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { Helmet } from "react-helmet";

import {
  Layout,
  Menu,
  Typography,
  Row,
  Col,
  Card,
  Button,
  Spin,
  Space,
} from "antd";
import "./index.css";

const { Content } = Layout;

const Home = () => {
  const [loading, setLoading] = useState(true);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const driveFolderLink =
    "https://docs.google.com/forms/d/e/1FAIpQLScgdrRaX-IeIYEoklUlq1LydeHWuVRKZkNphmEfp7BrE33-Tw/viewform?usp=sf_link";

  const heroHeight = isMobile ? "40vh" : isTablet ? "70vh" : "100vh";
  const titleFontSize = isMobile ? "20px" : isTablet ? "26px" : "50px";

  const instagramLinks = [
    { link: "https://www.instagram.com/asddragonpine/", label: "Dragon Pine" },
    { link: "https://www.instagram.com/dragon_sharks/", label: "Dragon Shark" },
    {
      link: "https://www.instagram.com/dragonflames1.0/",
      label: "Dragon Flames",
    },
    {
      link: "https://www.instagram.com/dragon.fly_junior/",
      label: "Dragon Junior",
    },
  ];

  useEffect(() => {
    const imgUrls = [
      "https://raw.githubusercontent.com/asddragonpine/website/main/sfondo-squadra.jpeg",
      "https://raw.githubusercontent.com/asddragonpine/website/main/dragon-junior.jpeg",
      "https://raw.githubusercontent.com/asddragonpine/website/main/dragon-shark.png",
      "https://raw.githubusercontent.com/asddragonpine/website/main/dragon-asd.png",
      "https://raw.githubusercontent.com/asddragonpine/website/main/dragon-pine.png",
      "https://raw.githubusercontent.com/asddragonpine/website/main/dragon-flames.png",
    ];

    const loadImages = imgUrls.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
      });
    });

    Promise.all(loadImages).then(() => setLoading(false));
  }, []);

  return loading ? (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <Spin size="large" />
    </div>
  ) : (
    <Layout style={{ minHeight: "100vh" }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <Helmet>
          <title>
            Asd DragonBoat Piné - Dragonboat, Eventi e Sport a Baselga di Piné,
            Trento
          </title>
          <meta
            name="description"
            content="Scopri DragonBoat Piné: eventi sportivi, gare di dragon boat, festival e attività sportive a Baselga di Piné, Trento. Vivi la bellezza del Trentino attraverso sport e natura."
          />
          <meta
            name="keywords"
            content="Dragon Boat Baselga di Piné, Pine, Trento, Trentino, sport, dragonboat, festival, gare dragonboat, eventi sportivi, sport in Trentino, lago di Serraia"
          />
          <meta name="author" content="Dragon Boat Piné" />

          <meta
            name="google-site-verification"
            content="3yxivH0zWGjRM3L-B9mVmPeW7C8oFRxWlubczgycmdQ"
          />

          {/* Meta Tag Open Graph */}
          <meta property="og:title" content="ASD Dragon Piné" />
          <meta
            property="og:description"
            content="Scopri ASD Dragon Piné e partecipa ai nostri eventi sportivi!"
          />
          <meta
            property="og:image"
            content="https://raw.githubusercontent.com/asddragonpine/website/main/dragon-asd.png"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:url" content="https://www.asddragonpine.com" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image:alt"
            content="Logo ufficiale di ASD Dragon Pine"
          />
          {/* Twitter Card (per Twitter/X) */}

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="ASD Dragon Piné" />
          <meta
            name="twitter:description"
            content="Scopri ASD Dragon Piné e partecipa ai nostri eventi sportivi!"
          />
          <meta
            name="twitter:image"
            content="https://raw.githubusercontent.com/asddragonpine/website/main/dragon-asd.png"
          />
          {/* Dati strutturati in formato JSON-LD per il logo (Google) */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsOrganization",
              name: "ASD Dragon Pine",
              url: "https://www.asddragonpine.com",
              logo: "https://raw.githubusercontent.com/asddragonpine/website/main/dragon-asd.png",
              description:
                "ASD Dragon Pine è un'associazione sportiva dedicata alla promozione dello sport del DragonBoat a Baselga di Piné, Trento.",
              foundingDate: "2020",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Baselga di Piné",
                addressRegion: "TN",
                postalCode: "38042",
                addressCountry: "IT",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Servizio clienti",
                email: "asddragonpine@gmail.com",
                availableLanguage: ["Italian"],
              },
            })}
          </script>
        </Helmet>
        {/* 
<MantineProvider >

<div className={classes.hero}>

<Container className={classes.container}>
  <Title className={classes.title}>THE OFFICIAL HOME OF <br /> ASD DRAGON PINÉ</Title>
  

  
</Container>
</div>
</MantineProvider>

*/}

        <div
          style={{
            position: "relative",
            backgroundImage:
              "url(https://raw.githubusercontent.com/asddragonpine/website/main/sfondo-squadra.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: heroHeight,
          }}
        >
          <div
            style={{
              content: "''",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: -1,
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 1) 100%)",
              zIndex: 1,
            }}
          />
          <Container
            style={{
              position: "absolute",
              zIndex: 2,
              padding: "20px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "100%",
              width: "80%",
            }}
          >
            <Title
              style={{
                color: "white",
                fontSize: titleFontSize,
                fontWeight: 900,
                lineHeight: 1.1,
                textAlign: "left",
                position: "absolute",
                bottom: "20px",
                left: "10px",
              }}
            >
              <span
                style={{
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                THE OFFICIAL HOME OF
              </span>{" "}
              <br />
              <span
                style={{
                  color: "#f2460c",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                ASD DRAGON PINÉ
              </span>
            </Title>
          </Container>
        </div>
      </motion.div>

      <Content style={{ padding: "24px", margin: "0 auto", width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Row gutter={16} justify="center">
            <Col
              style={{
                maxHeight: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="https://raw.githubusercontent.com/asddragonpine/website/main/dragon-asd.png"
                alt="Logo 0"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  padding: "5px",
                }}
              />
            </Col>
          </Row>
        </motion.div>

        <Divider
          style={{ borderTop: "3px solid #f2460c", marginBottom: "10px" }}
        />

        {/*
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
        >
          <Typography.Title level={3} style={{ textAlign: "center", fontFamily: "fantasy"}}>
            THE OFFICIAL HOME OF <br /> ASD DRAGON PINÉ
          </Typography.Title>
        </motion.div>
        
        */}

        {/*
 <MantineProvider theme={{ colorScheme: 'light' }}>

        <Container size="md" py="xl">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
    >
      <Paper
        p="md"
        radius="lg"
        shadow="xl"
        style={{
          background: "linear-gradient(135deg, #ffa726, #ff7043)",
          borderRadius: "40px 0 40px 0",
          color: "white",
        }}
      >
        <Title align="center" style={{ fontFamily: "fantasy" }}>
          THE OFFICIAL HOME OF <br /> ASD DRAGON PINÉ
        </Title>
        <Divider my="sm" style={{ backgroundColor: "white" }} />
      </Paper>
    </motion.div>
  </Container>
  </MantineProvider>


*/}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Row gutter={[16, 16]} justify="center">
            {[
              "dragon-junior.jpeg",
              "dragon-shark.png",
              "dragon-pine.png",
              "dragon-flames.png",
            ].map((img, index) => (
              <Col key={index} span={6}>
                <img
                  src={`https://raw.githubusercontent.com/asddragonpine/website/main/${img}`}
                  alt={`Logo ${index + 1}`}
                  style={{
                    width: "100%",
                    Height: "auto",
                    objectFit: "contain",
                  }}
                />
              </Col>
            ))}
          </Row>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, delay: 2 }}
        >
  <Typography.Title
    level={2}
    style={{
      textAlign: "center",
      marginTop: "20px",
      height: "100px",
      fontFamily: "'Raleway', sans-serif",
      fontWeight: "800",
      fontSize: "48px",
      letterSpacing: "2px",
      background: "linear-gradient(to right, #ff4e50, #f9d423)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textTransform: "uppercase",
    }}
  >
    Benvenuto
  </Typography.Title>
        </motion.div>

        {/*
    <motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 2, delay: 1 }}
  style={{
    width: "100%",
    //minHeight: "100vh",
    padding: 0, // Evita padding non necessario
    margin: 0, // Rimuove margini predefiniti    overflow: "hidden", // Evita overflow indesiderato su mobile
  }}
>
  <img
    src="https://raw.githubusercontent.com/asddragonpine/website/main/sfondo-squadra.jpeg"
    alt="Sfondo squadra"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover", // Mantiene l'immagine proporzionata senza distorsioni
      display: "block", // Evita spazi extra sotto l'immagine

    }}
  />
</motion.div>


*/}

        <Row justify="start">
          <Col>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
              style={{
                position: "relative",
                zIndex: 1,
                marginTop: "-30px",
              }}
            >
              <Card
                title={<span style={{ color: "white" }}>About Us</span>}
                bordered={false}
                style={{
                  width: "100%",
                  textAlign: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#121212",
                  color: "white",
                  marginBottom: "50px",
                }}
              >
                <p>
                  Siamo un Team appassionato di DragonBoat, uniti dalla passione
                  e dalla voglia di divertirci
                </p>
              </Card>
            </motion.div>
          </Col>
        </Row>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
        >
          <div className="home-content">
            <Card
              className="home-card"
              bordered={true}
              style={{
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Title level={2} className="home-title">
                MODULO ISCRIZIONE
              </Title>
              <Text
                className="home-text"
                style={{ fontSize: "16px", marginTop: "16px" }}
              >
                Vuoi unirti a noi?
              </Text>
              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Button
                  type="primary"
                  icon={<LinkOutlined />}
                  size="large"
                  href={driveFolderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-button"
                  style={{ borderRadius: "30px" }}
                >
                  Compila il modulo
                </Button>
              </div>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="races-section">
            <Row gutter={[24, 24]} align="middle" justify="center">
              <Col xs={24} md={12} className="races-image-col">
                <Title level={2} className="races-title">
                  RACES SEASON 2025
                </Title>
                {/* Soluzione 1: Tag img standard */}
                <img
                  src="https://raw.githubusercontent.com/asddragonpine/website/main/season2025dragon.jpg"
                  alt="Race Calendar 2025"
                  className="races-image"
                />

                {/* Soluzione 2: Div con background image (decommentare per usare) 
            <div 
              className="races-image-container" 
              style={{ backgroundImage: "url('/images/races-2025.jpg')" }}
              aria-label="Race Calendar 2025"
            ></div>
            */}
              </Col>
              <Col xs={24} md={12} className="races-content-col">
                <Text className="races-description">
                  Scopri il calendario delle competizioni per la stagione 2025.
                  Preparati a vivere un anno ricco di emozioni, sfide e
                  adrenalina sui laghi più belli del Trentino.
                </Text>
              </Col>
            </Row>
          </div>
        </motion.div>

        <div
          style={{
            padding: "70px",
            background: "#f5f5f5",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          <Typography.Title level={3}>Follow Us</Typography.Title>
          <Row gutter={[16, 16]} justify="center">
            {instagramLinks.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={6}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    flexDirection: "column", // Aggiunto per disporre il titolo sopra l'icona
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                    borderRadius: "5px",
                    background: "#fff",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    textDecoration: "none",
                    color: "#000",
                  }}
                >
                  <Typography.Text
                    style={{
                      marginBottom: "10px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.label} {/* Titolo sopra l'icona */}
                  </Typography.Text>
                  <InstagramOutlined style={{ fontSize: "40px" }} />
                </a>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
