/*
import React from "react";
import { useState, useEffect } from "react";

import { Layout, Menu, Typography, Row, Col, Divider, Card, Button, Spin } from "antd";
import './index.css'
const { Header, Content, Footer } = Layout;

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula il caricamento delle immagini
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
    <Spin size="large" /> {// Icona di caricamento }
  </div>
) : (
    <Layout style={{ minHeight: "100vh" }}>
      {// Header con il menu }
      <Header style={{
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1, // Per garantire che il menu sia sopra altri contenuti
        height: "50px",
        padding: "0 20px" // Aggiunge un po' di spazio ai lati
      }}>        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
          <Menu.Item key="home">HOME</Menu.Item>
          <Menu.Item key="eventi">EVENTI</Menu.Item>
          <Menu.Item key="contatti">CONTATTI</Menu.Item>
        </Menu>
      </Header>

      {/ Contenuto principale /}
      <Content style={{ padding: "24px", margin: "0 auto", width: "100%" }}>
      <Row gutter={16} justify="center">
        <Col style={{maxHeight: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src="https://raw.githubusercontent.com/asddragonpine/website/main/dragon-asd.png" alt="Logo 0" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", padding: "30px" }} />
        </Col>
       </Row>

        <Typography.Title level={2} style={{ textAlign: "center", fontFamily: "fantasy"}}>
          THE OFFICIAL HOME OF <br />ASD DRAGON PINÉ
        </Typography.Title>
                  <Divider
            style={{
              borderTop: "4px solid #f2460c", // Modifica lo spessore e il colore del divider
            }}
          />   
          <Row gutter={[16, 16]} justify="center">
  <Col span={6}>
    <img
      src="https://raw.githubusercontent.com/asddragonpine/website/main/dragon-junior.jpeg"
      alt="Logo 1"
      style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
    />
  </Col>
  <Col span={6}>
    <img
      src="https://raw.githubusercontent.com/asddragonpine/website/main/dragon-shark.png"
      alt="Logo 2"
      style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
    />
  </Col>
  <Col span={6}>
    <img
      src="https://raw.githubusercontent.com/asddragonpine/website/main/dragon-pine.png"
      alt="Logo 3"
      style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
    />
  </Col>
  <Col span={6}>
    <img
      src="https://raw.githubusercontent.com/asddragonpine/website/main/dragon-flames.png"
      alt="Logo 4"
      style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
    />
  </Col>
</Row>
        <Typography.Title level={3}  style={{ textAlign: "center", marginTop: "10px"}}>Benvenuto</Typography.Title>

         {// Sfondo sotto ai loghi *}
         <Row>
          <Col>
          <img 
  src="https://raw.githubusercontent.com/asddragonpine/website/main/sfondo-squadra.jpeg"
  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
/>
          </Col>
        
         </Row>
         
         
  
          {// Eventuali contenuti extra che vuoi mettere sopra lo sfondo }
        

              {// Sezione About Us }
              <Row justify="start">
  <Col 
    xs={{ span: 20, offset: 0 }} 
    sm={{ span: 18, offset: 0 }} 
    md={{ span: 10, offset: 0 }} 
    lg={{ span: 8, offset: 0 }} 
    xl={{ span: 6, offset: 0 }}
  >
    <div
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
        }}
      >      
              <p>
                Siamo un Team appassionato di DragonBoat, uniti dalla passione e dalla voglia di divertirci
              </p>
            </Card>
            </div>
          </Col>
        </Row>
        <row>
          {// Pulsante per il modulo Google }
      <div style={{ textAlign: "center", marginTop: "20px" }}>
      <p>
          Vuoi unirti a noi?
        </p>
        <Button
          type="primary"
          href="https://docs.google.com/forms/d/e/1FAIpQLScgdrRaX-IeIYEoklUlq1LydeHWuVRKZkNphmEfp7BrE33-Tw/viewform?usp=sf_link"
          target="_blank" // Apre il link in una nuova finestra
          size="large"
          style={{
            color: "white", // Cambia il colore del testo
            backgroundColor: "#f2460c", // Cambia il colore di sfondo del pulsante
          }}
        >
          Compila il modulo
        </Button>
      </div>
        </row>
        <Divider
  style={{
    borderTop: "4px solid #f2460c", // Modifica lo spessore e il colore del divider
  }}
/>
      </Content>

      {//Footer /}
      <Footer style={{ textAlign: "center" }}>
        © 2025 ASD Dragon Pine
      </Footer>
    </Layout>
  );
};

export default App;
*/
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout, Menu, Typography, Row, Col, Divider, Card, Button, Spin } from "antd";
import "./index.css";

const { Header, Content, Footer } = Layout;

const App = () => {
  const [loading, setLoading] = useState(true);

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
      <Header
        style={{
          display: "flex",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          height: "50px",
          padding: "0 20px",
        }}
      >
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
          <Menu.Item key="home">HOME</Menu.Item>
          <Menu.Item key="eventi">EVENTI</Menu.Item>
          <Menu.Item key="contatti">CONTATTI</Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: "24px", margin: "0 auto", width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Row gutter={16} justify="center">
            <Col style={{ maxHeight: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                src="https://raw.githubusercontent.com/asddragonpine/website/main/dragon-asd.png"
                alt="Logo 0"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", padding: "30px" }}
              />
            </Col>
          </Row>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
        >
          <Typography.Title level={2} style={{ textAlign: "center" }}>
            THE OFFICIAL HOME OF <br /> ASD DRAGON PINÉ
          </Typography.Title>
          <Divider style={{ borderTop: "4px solid #f2460c" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 2 }}
        >
          <Row gutter={[16, 16]} justify="center">
            {["dragon-junior.jpeg", "dragon-shark.png", "dragon-pine.png", "dragon-flames.png"].map((img, index) => (
              <Col key={index} span={6}>
                <img
                  src={`https://raw.githubusercontent.com/asddragonpine/website/main/${img}`}
                  alt={`Logo ${index + 1}`}
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
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
          <Typography.Title level={3} style={{ textAlign: "center", marginTop: "10px" }}>
            Benvenuto
          </Typography.Title>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, delay: 2 }}
          style={{
            backgroundImage: "url('https://raw.githubusercontent.com/asddragonpine/website/main/sfondo-squadra.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
            width: "100%",
            margin: "20px 0",
          }}
        ></motion.div>

        <Row justify="start">
          <Col xs={{ span: 20 }} sm={{ span: 18 }} md={{ span: 10 }} lg={{ span: 8 }} xl={{ span: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 2 }}
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
                }}
              >
                <p>Siamo un Team appassionato di DragonBoat, uniti dalla passione e dalla voglia di divertirci</p>
              </Card>
            </motion.div>
          </Col>
        </Row>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
        >
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p>Vuoi unirti a noi?</p>
            <Button
              type="primary"
              href="https://docs.google.com/forms/d/e/1FAIpQLScgdrRaX-IeIYEoklUlq1LydeHWuVRKZkNphmEfp7BrE33-Tw/viewform?usp=sf_link"
              target="_blank"
              size="large"
              style={{
                color: "white",
                backgroundColor: "#f2460c",
              }}
            >
              Compila il modulo
            </Button>
          </div>
        </motion.div>

        <Divider style={{ borderTop: "4px solid #f2460c" }} />
      </Content>

      <Footer style={{ textAlign: "center" }}>© 2025 ASD Dragon Pine</Footer>
    </Layout>
  );
};

export default App;
