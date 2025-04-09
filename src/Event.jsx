// import React from "react";
// import { Typography, Card, Row, Col } from "antd";
// import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons"; // Import delle icone
// import { motion } from "framer-motion";

// const Event = () => {
//   const festaData = [
//     {
//         title: "DragonFestival Piné",
//         description: "Festeggia con noi la festa dell'altopiano più attesa dell'anno!",
//         date: "12/07/2025 - 13/07/2025",
//         location: "Balsega di Piné",
//         image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragonfestival.png", // Aggiungi immagine appropriata
//       },
//       {
//         title: "DragoLases",
//         description: "Festeggia con noi la festa di Lases più attesa dell'anno!",
//         date: "21/06/2025",
//         location: "Lases",
//         image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragolases.png", // Aggiungi immagine appropriata
//       },
//   ];

//   const garaData = [
//     {
//       title: "Ekon Cup",
//       description: "Ekon Cup a S.Cristoforo, gara a circuito lunga circa 650mt",
//       date: "14/06/2025",
//       location: "S.Cristoforo",
//       image: "https://raw.githubusercontent.com/asddragonpine/website/main/ekon.jpg", // Aggiungi immagine appropriata
//     },
//     {
//       title: "DragoNLases",
//       description: "Gara a giro di boa, lunga circa 350mt",
//       date: "21/06/2025",
//       location: "Lases",
//       image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragonlases.jpg", // Aggiungi immagine appropriata
//     },
//     {
//         title: "DragonSprint",
//         description: "Gara dritta a sprint, lunga circa 300mt",
//         date: "12/07/2025",
//         location: "Baselga di Piné",
//         image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragonsprint.jpg", // Aggiungi immagine appropriata
//       },
//     {
//         title: "Dragononesa",
//         description: "Gara a giro di boa, lunga circa 6km",
//         date: "27/07/2025",
//         location: "SantaGiustina",
//         image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragononesa.jpg", // Aggiungi immagine appropriata
//       },
//       {
//         title: "Palio dei Draghi",
//         description: "Gara dritta, lunga circa 500mt",
//         date: "23/08/2025",
//         location: "Caldonazzo",
//         image: "https://raw.githubusercontent.com/asddragonpine/website/main/paliodraghi.jpg", // Aggiungi immagine appropriata
//       },
//       {
//         title: "Dragon Flash",
//         description: "Gara dritta, lunga circa 180mt",
//         date: "13/09/2025",
//         location: "Borgo Valsugana",
//         image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragonflash.jpg", // Aggiungi immagine appropriata
//       },
//   ];

//   const eventiData = [
//     {
//         title: "Domeniche aperte a tutti",
//         description: "Prova a pagaiare con noi ed immergiti nella natura.",
//         date: "Domeniche programmate",
//         location: "Balsega di Piné",
//         image: "https://raw.githubusercontent.com/asddragonpine/website/main/opensunday.png", // Aggiungi immagine appropriata
//       },
//   ];
//   return (
//     <div style={{ padding: "24px", alignContent:"center", marginTop:"50px"}}>
//        <motion.div
//              initial={{ opacity: 0, y: 50 }}
//              animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 1 }}
//         >
//        <Typography.Title level={3}>Prossimi eventi</Typography.Title>
     

//       {/* Sezione Feste */}
//       <Typography.Title
//         level={4}
//         style={{
//           backgroundColor: "#990099", // Sfondo azzurro
//           color: "white", // Colore del testo bianco
//           padding: "15px", // Padding per dare spazio al testo
//           borderRadius: "20px", // Rende gli angoli arrotondati
//         }}
//       >
//         Feste
//       </Typography.Title>
//       <Row gutter={[16, 16]}>
//         {festaData.map((festa, index) => (
//           <Col key={index} xs={24} sm={12} md={8} lg={6}>
//             <Card
//               title={festa.title}
//               bordered={true} // Aggiunge il bordo
//               style={{
//                 borderRadius: "20px", // Rende gli angoli arrotondati
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                 marginBottom: "20px", // Ombra per l'effetto 3D
//               }}
//               cover={<img alt={festa.title} src={festa.image} style={{ width: "100%", height: "auto", objectFit: "cover" }} />}
//                // Aggiungi l'immagine
//             >
//               <p>{festa.description}</p>
//               <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
//                 <CalendarOutlined style={{ marginRight: "5px" }} />
//                 <span>{festa.date}</span>
//               </div>
//               <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
//                 <EnvironmentOutlined style={{ marginRight: "5px" }} />
//                 <span>{festa.location}</span>
//               </div>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Sezione Gare */}
//       <Typography.Title
//         level={4}
//         style={{
//           backgroundColor: "#f2460c", // Sfondo arancio
//           color: "white", // Colore del testo bianco
//           padding: "15px", // Padding per dare spazio al testo
//           borderRadius: "20px", // Rende gli angoli arrotondati
//         }}
//       >
//         Gare
//       </Typography.Title>
//       <Row gutter={[16, 16]}>
//         {garaData.map((gara, index) => (
//           <Col key={index} xs={24} sm={12} md={8} lg={6}>
//             <Card
//               title={gara.title}
//               bordered={true} // Aggiunge il bordo
//               style={{
//                 borderRadius: "20px", // Rende gli angoli arrotondati
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Ombra per l'effetto 3D
//               }}
//               cover={<img alt={gara.title} src={gara.image} />} // Aggiungi l'immagine
//             >
//               <p>{gara.description}</p>
//               <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
//                 <CalendarOutlined style={{ marginRight: "5px" }} />
//                 <span>{gara.date}</span>
//               </div>
//               <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
//                 <EnvironmentOutlined style={{ marginRight: "5px" }} />
//                 <span>{gara.location}</span>
//               </div>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       <Typography.Title
//         level={4}
//         style={{
//           backgroundColor: "#67b538", // Sfondo arancio
//           color: "white", // Colore del testo bianco
//           padding: "15px", // Padding per dare spazio al testo
//           borderRadius: "20px", // Rende gli angoli arrotondati
//           marginTop: "15px",
//         }}
//       >
//         Eventi
//       </Typography.Title>
//       <Row gutter={[16, 16]}>
//         {eventiData.map((eventi, index) => (
//           <Col key={index} xs={24} sm={12} md={8} lg={6}>
//             <Card
//               title={eventi.title}
//               bordered={true} // Aggiunge il bordo
//               style={{
//                 borderRadius: "20px", // Rende gli angoli arrotondati
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                 marginBottom: "20px", // Ombra per l'effetto 3D
//               }}
//               cover={<img alt={eventi.title} src={eventi.image} style={{ width: "100%", height: "auto", objectFit: "cover" }} />}
//                // Aggiungi l'immagine
//             >
//               <p>{eventi.description}</p>
//               <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
//                 <CalendarOutlined style={{ marginRight: "5px" }} />
//                 <span>{eventi.date}</span>
//               </div>
//               <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
//                 <EnvironmentOutlined style={{ marginRight: "5px" }} />
//                 <span>{eventi.location}</span>
//               </div>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//       </motion.div>
//     </div>
//   );
// };

// export default Event;
import React, { useState } from "react";
import { Typography, Card, Row, Col, Tabs, Badge, Button } from "antd";
import { CalendarOutlined, EnvironmentOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { ArrowDown, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import "./Event.css"; // Importa i nuovi stili CSS

const Event = () => {
  const [activeTab, setActiveTab] = useState("1");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Dati degli eventi
  const festaData = [
    {
      title: "DragonFestival Piné",
      description: "Festeggia con noi la festa dell'altopiano più attesa dell'anno! Due giorni di competizioni, musica, cibo e divertimento per tutta la famiglia.",
      date: "12/07/2025 - 13/07/2025",
      location: "Baselga di Piné",
      image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragonfestival.png",
      highlights: ["Gare campionato e amichevoli", "Stand gastronomici", "DJ e Musica dal vivo"],
      featured: true
    },
    {
      title: "DragoLases",
      description: "Festeggia con noi la festa di Lases più attesa dell'anno! Un'intera giornata dedicata al dragonboat e al divertimento.",
      date: "21/06/2025",
      location: "Lases",
      image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragolases.png",
      highlights: ["DJ e Musica dal vivo", "Area food & drink", "Attività per bambini"],
      featured: true
    },
  ];

  const garaData = [
    {
      title: "Ekon Cup",
      description: "Ekon Cup a S.Cristoforo, gara a circuito lunga circa 650mt. Una competizione emozionante con squadre da tutto il Trentino.",
      date: "14/06/2025",
      location: "S.Cristoforo",
      image: "https://raw.githubusercontent.com/asddragonpine/website/main/ekon.jpg",
      categoria: "Regionale",
      distance: "650m"
    },
    {
      title: "DragoNLases",
      description: "Gara a giro di boa, lunga circa 350mt. Una competizione veloce e adrenalinica sul lago di Lases.",
      date: "21/06/2025",
      location: "Lases",
      image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragonlases.jpg",
      categoria: "Regionale",
      distance: "350m"
    },
    {
      title: "DragonSprint",
      description: "Gara dritta a sprint, lunga circa 300mt. Velocità pura sul lago della Serraia.",
      date: "12/07/2025",
      location: "Baselga di Piné",
      image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragonsprint.jpg",
      categoria: "Regionale",
      distance: "300m"
    },
    {
      title: "Dragononesa",
      description: "Gara a giro di boa, lunga circa 6km. Una sfida di resistenza e strategia.",
      date: "27/07/2025",
      location: "Santa Giustina",
      image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragononesa.jpg",
      categoria: "Regionale",
      distance: "6km",
    },
    {
      title: "Palio dei Draghi",
      description: "Gara dritta, lunga circa 500mt. La tradizionale competizione sul lago di Caldonazzo.",
      date: "23/08/2025",
      location: "Caldonazzo",
      image: "https://raw.githubusercontent.com/asddragonpine/website/main/paliodraghi.jpg",
      categoria: "Regionale",
      distance: "500m"
    },
    {
      title: "Dragon Flash",
      description: "Gara dritta, lunga circa 180mt. La competizione più veloce della stagione.",
      date: "13/09/2025",
      location: "Borgo Valsugana",
      image: "https://raw.githubusercontent.com/asddragonpine/website/main/dragonflash.jpg",
      categoria: "Regionale",
      distance: "180m"
    },
  ];

  const eventiData = [
    {
      title: "Domeniche aperte a tutti",
      description: "Prova a pagaiare con noi ed immergiti nella natura. Un'occasione unica per scoprire il dragonboat e il bellissimo lago della Serraia.",
      date: "Domeniche programmate",
      location: "Baselga di Piné",
      image: "https://raw.githubusercontent.com/asddragonpine/website/main/opensunday.png",
      highlights: ["Esperienza gratuita", "Istruttori qualificati", "Adatto a tutti"]
    },
  ];

  // Trova gli eventi in evidenza
  const featuredEvents = [...festaData, ...garaData, ...eventiData].filter(event => event.featured);

  // Configura le tabs usando il formato items (nuovo standard di Ant Design)
  const tabItems = [
    {
      key: "1",
      label: (
        <span className="custom-tab">
          <span className="tab-icon" style={{ backgroundColor: '#f2460c' }}>🏆</span>
          Gare
        </span>
      ),
      children: (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <Row gutter={[24, 24]} className="events-grid">
            {garaData.map((gara, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <motion.div variants={fadeIn}>
                  <Card className="event-card">
                    <div className="event-img-wrapper">
                      <img src={gara.image} alt={gara.title} className="event-img" />
                      <div className="event-date-badge">
                        <span>{gara.date.split('/')[0]}</span>
                        <span>{['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC'][parseInt(gara.date.split('/')[1]) - 1]}</span>
                      </div>
                    </div>
                    <div className="event-content">
                      <div className="event-tags">
                        <span className="event-tag">{gara.categoria}</span>
                        <span className="event-tag">{gara.distance}</span>
                      </div>
                      <h3 className="event-title">{gara.title}</h3>
                      <p className="event-desc">{gara.description}</p>
                      <div className="event-footer">
                        <span className="event-location">
                          <EnvironmentOutlined /> {gara.location}
                        </span>
                      
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      ),
    },
    {
      key: "2",
      label: (
        <span className="custom-tab">
          <span className="tab-icon" style={{ backgroundColor: '#990099' }}>🎉</span>
          Feste
        </span>
      ),
      children: (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <Row gutter={[24, 24]} className="events-grid">
            {festaData.map((festa, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <motion.div variants={fadeIn}>
                  <Card className="event-card">
                    <div className="event-img-wrapper">
                      <img src={festa.image} alt={festa.title} className="event-img" />
                      <div className="event-date-badge">
                        <span>{festa.date.split('/')[0]}</span>
                        <span>{['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC'][parseInt(festa.date.split('/')[1]) - 1]}</span>
                      </div>
                    </div>
                    <div className="event-content">
                      <div className="event-tags">
                        <span className="event-tag">Festa</span>
                      </div>
                      <h3 className="event-title">{festa.title}</h3>
                      <p className="event-desc">{festa.description}</p>
                      <div className="event-footer">
                        <span className="event-location">
                          <EnvironmentOutlined /> {festa.location}
                        </span>
                    
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      ),
    },
    {
      key: "3",
      label: (
        <span className="custom-tab">
          <span className="tab-icon" style={{ backgroundColor: '#67b538' }}>🌊</span>
          Eventi
        </span>
      ),
      children: (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <Row gutter={[24, 24]} className="events-grid">
            {eventiData.map((evento, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <motion.div variants={fadeIn}>
                  <Card className="event-card">
                    <div className="event-img-wrapper">
                      <img src={evento.image} alt={evento.title} className="event-img" />
                      <div className="event-date-badge special">
                        <span>2025</span>
                        <span>Eventi</span>
                      </div>
                    </div>
                    <div className="event-content">
                      <div className="event-tags">
                        <span className="event-tag">Esperienza</span>
                      </div>
                      <h3 className="event-title">{evento.title}</h3>
                      <p className="event-desc">{evento.description}</p>
                      <div className="event-footer">
                        <span className="event-location">
                          <EnvironmentOutlined /> {evento.location}
                        </span>
                        
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      ),
    },
  ];

  return (
    <div className="events-page">
      <div className="events-hero">
        <motion.div 
          className="events-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Eventi e Competizioni</h1>
          <p>Scopri tutte le attività organizzate da ASD Dragon Piné e del campionato Trentino</p>
        </motion.div>
      </div>
      
      <div className="events-container">
        {/* Sezione eventi in evidenza */}
        {featuredEvents.length > 0 && (
          <motion.section 
            className="featured-events-section"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h2 className="section-heading">
              <span className="text-highlight">Eventi in evidenza</span>
            </h2>
            
            <Row gutter={[24, 24]}>
              {featuredEvents.map((event, index) => (
                <Col xs={24} md={12} key={index}>
                  <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="featured-event-card">
                      <div className="featured-img-container">
                        <img src={event.image} alt={event.title} />
                        <div className="featured-overlay">
                          <Badge.Ribbon text="In evidenza" color="#f50057" />
                        </div>
                      </div>
                      <div className="featured-content">
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <div className="event-meta">
                          <div className="event-meta-item">
                            <CalendarOutlined /> {event.date}
                          </div>
                          <div className="event-meta-item">
                            <EnvironmentOutlined /> {event.location}
                          </div>
                        </div>
                        {event.highlights && (
                          <div className="event-highlights">
                            {event.highlights.map((highlight, idx) => (
                              <span key={idx} className="highlight-tag">{highlight}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.section>
        )}
        
        {/* Tabs per categorie di eventi - Usando la prop items invece di TabPane */}
        <motion.section 
          className="events-tabs-section"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            className="custom-tabs"
            centered
            items={tabItems}
          />
        </motion.section>
        
        {/* CTA Section */}
        <motion.section 
          className="events-cta-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="cta-content">
            <h2>Vuoi partecipare ai nostri eventi?</h2>
            <p>Contattaci per maggiori informazioni su tutti gli eventi e le competizioni!</p>
            <Button  type="primary" 
                      size="large"
                      icon={<Mail size={18} />}
                      className="cta-button"
                      href="mailto:asddragonpine@gmail.com"
                    >
                Contattaci                    
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Event;