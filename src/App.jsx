import React from "react";
import { Layout, Menu, Typography, Row, Col, Divider, Card, Button, Image } from "antd";
import './index.css'
const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header con il menu */}
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

      {/* Contenuto principale */}
      <Content style={{ padding: "24px", margin: "0 auto", width: "100%" }}>
      <Row gutter={16} justify="center">
        <Col style={{maxHeight: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src="/dragon-website/dragon asd.png" alt="Logo 0" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", padding: "30px" }} />
        </Col>
       </Row>

        <Typography.Title level={2} style={{ textAlign: "center" }}>
          THE OFFICIAL HOME OF <br />ASD DRAGON PINÉ
        </Typography.Title>
                  <Divider
            style={{
              borderTop: "4px solid #f2460c", // Modifica lo spessore e il colore del divider
            }}
          />   
          <Row gutter={16} justify="center">
          <Col xs={6} sm={4} md={3} lg={2} xl={1}>
            <img src="/website/dragon-junior.jpeg" alt="Logo 1" style={{ width: "100%" }} />
          </Col>
          <Col xs={6} sm={4} md={3} lg={2} xl={1}>
            <img src="https://raw.githubusercontent.com/asddragonpine/website/main/dragon-shark.png" alt="Logo 2" style={{ width: "100%" }} />
          </Col>
          <Col xs={6} sm={4} md={3} lg={2} xl={1}>
            <img src="/website/dragon-pine.png" alt="Logo 3" style={{ width: "100%" }} />
          </Col>
          <Col xs={6} sm={4} md={3} lg={2} xl={1}>
            <img src="/website/dragon-flames.png" alt="Logo 4" style={{ width: "100%" }} />
          </Col>
        </Row>
        <Typography.Title level={3}  style={{ textAlign: "center", marginTop: "10px"}}>Benvenuto</Typography.Title>

         {/* Sfondo sotto ai loghi */}
         <Image 
         src="/website/sfondo-squadra.jpeg"
         />
         
  
          {/* Eventuali contenuti extra che vuoi mettere sopra lo sfondo */}
        

              {/* Sezione About Us */}
          <Row justify="left">
            <Col xs={18} sm={12} md={8} lg={5} xl={3}>
            <div
      style={{
        position: "relative", // Posiziona la card relativamente al suo contenitore
        zIndex: 1, // Assicurati che la card sia sopra l'immagine
        marginTop: "-30px", // Sovrappone la card all'immagine (puoi regolare questo valore)
      }}
    >

              <Card
              title={<span style={{ color: "white" }}>About Us</span>} // Imposta il colore del titolo a bianco
              bordered={false}
              style={{
                width: "100%",
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#121212", // Colore di sfondo della card
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
          {/* Pulsante per il modulo Google */}
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

      {/* Footer */}
      <Footer style={{ textAlign: "center" }}>
        © 2025 ASD Dragon Pine
      </Footer>
    </Layout>
  );
};

export default App;
