import React from "react";
import { Typography, Card, Row, Col } from "antd";
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons"; // Import delle icone
import { motion } from "framer-motion";

const Event = () => {
  const festaData = [
    {
        title: "DragonFestival Piné",
        description: "Festeggia con noi la festa dell'altopiano più attesa dell'anno!",
        date: "12/07/2025 - 13/07/2025",
        location: "Balsega di Piné",
        image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragonsprint.jpg", // Aggiungi immagine appropriata
      },
      {
        title: "DragoLases",
        description: "Festeggia con noi la festa di Lases più attesa dell'anno!",
        date: "21/06/2025",
        location: "Lases",
        image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragonlases.jpg", // Aggiungi immagine appropriata
      },
  ];

  const garaData = [
    {
      title: "Ekon Cup",
      description: "Ekon Cup a S.Cristoforo, gara a circuito lunga circa 650mt",
      date: "14/06/2025",
      location: "S.Cristoforo",
      image: "https://raw.githubusercontent.com/asddragonpine/website/main/ekon.jpg", // Aggiungi immagine appropriata
    },
    {
      title: "DragoNLases",
      description: "Gara a giro di boa, lunga circa 350mt",
      date: "21/06/2025",
      location: "Lases",
      image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragonlases.jpg", // Aggiungi immagine appropriata
    },
    {
        title: "DragonSprint",
        description: "Gara dritta a sprint, lunga circa 300mt",
        date: "12/07/2025",
        location: "Baselga di Piné",
        image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragonsprint.jpg", // Aggiungi immagine appropriata
      },
    {
        title: "Dragononesa",
        description: "Gara a giro di boa, lunga circa 6km",
        date: "27/07/2025",
        location: "SantaGiustina",
        image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragononesa.jpg", // Aggiungi immagine appropriata
      },
      {
        title: "Palio dei Draghi",
        description: "Gara dritta, lunga circa 500mt",
        date: "23/08/2025",
        location: "Caldonazzo",
        image: "https://raw.githubusercontent.com/asddragonpine/website/main/paliodraghi.jpg", // Aggiungi immagine appropriata
      },
      {
        title: "Dragon Flash",
        description: "Gara dritta, lunga circa 180mt",
        date: "13/09/2025",
        location: "Borgo Valsugana",
        image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragonflash.jpg", // Aggiungi immagine appropriata
      },
  ];

  const eventiData = [
    {
        title: "Domeniche aperte a tutti",
        description: "Prova a pagaiare con noi ed immergiti nella natura.",
        date: "13/07/2025 - 14/07/2025",
        location: "Balsega di Piné",
        image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragon-festival.png", // Aggiungi immagine appropriata
      },
  ];
  return (
    <div style={{ padding: "24px", alignContent:"center", marginTop:"50px"}}>
       <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
       <Typography.Title level={3}>Prossimi eventi</Typography.Title>
     

      {/* Sezione Feste */}
      <Typography.Title
        level={4}
        style={{
          backgroundColor: "#47b4d0", // Sfondo azzurro
          color: "white", // Colore del testo bianco
          padding: "15px", // Padding per dare spazio al testo
          borderRadius: "5px", // Rende gli angoli arrotondati
        }}
      >
        Feste
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {festaData.map((festa, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={festa.title}
              bordered={true} // Aggiunge il bordo
              style={{
                borderRadius: "10px", // Rende gli angoli arrotondati
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginBottom: "20px", // Ombra per l'effetto 3D
              }}
              cover={<img alt={festa.title} src={festa.image} style={{ width: "100%", height: "auto", objectFit: "cover" }} />}
               // Aggiungi l'immagine
            >
              <p>{festa.description}</p>
              <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                <CalendarOutlined style={{ marginRight: "5px" }} />
                <span>{festa.date}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                <EnvironmentOutlined style={{ marginRight: "5px" }} />
                <span>{festa.location}</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Sezione Gare */}
      <Typography.Title
        level={4}
        style={{
          backgroundColor: "#f2460c", // Sfondo arancio
          color: "white", // Colore del testo bianco
          padding: "15px", // Padding per dare spazio al testo
          borderRadius: "5px", // Rende gli angoli arrotondati
        }}
      >
        Gare
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {garaData.map((gara, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={gara.title}
              bordered={true} // Aggiunge il bordo
              style={{
                borderRadius: "10px", // Rende gli angoli arrotondati
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Ombra per l'effetto 3D
              }}
              cover={<img alt={gara.title} src={gara.image} />} // Aggiungi l'immagine
            >
              <p>{gara.description}</p>
              <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                <CalendarOutlined style={{ marginRight: "5px" }} />
                <span>{gara.date}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                <EnvironmentOutlined style={{ marginRight: "5px" }} />
                <span>{gara.location}</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Typography.Title
        level={4}
        style={{
          backgroundColor: "#67b538", // Sfondo arancio
          color: "white", // Colore del testo bianco
          padding: "15px", // Padding per dare spazio al testo
          borderRadius: "5px", // Rende gli angoli arrotondati
          marginTop: "15px",
        }}
      >
        Eventi
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {eventiData.map((eventi, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={eventi.title}
              bordered={true} // Aggiunge il bordo
              style={{
                borderRadius: "10px", // Rende gli angoli arrotondati
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginBottom: "20px", // Ombra per l'effetto 3D
              }}
              cover={<img alt={eventi.title} src={eventi.image} style={{ width: "100%", height: "auto", objectFit: "cover" }} />}
               // Aggiungi l'immagine
            >
              <p>{eventi.description}</p>
              <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                <CalendarOutlined style={{ marginRight: "5px" }} />
                <span>{eventi.date}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                <EnvironmentOutlined style={{ marginRight: "5px" }} />
                <span>{eventi.location}</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      </motion.div>
    </div>
  );
};

export default Event;