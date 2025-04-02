import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, MapPin } from 'lucide-react';
import { Typography, Row, Col, Card, Button } from "antd";
import './AboutUs.css';

const { Title, Paragraph } = Typography;

const AboutUs = () => {
  const [showContent, setShowContent] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  // Rileva se lo schermo è mobile o desktop
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    // Mostra il contenuto "Chi Siamo" e la freccia dopo 3 secondi
    const contentTimer = setTimeout(() => setShowContent(true), 3000);
    const arrowTimer = setTimeout(() => setShowArrow(true), 3000);
    
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(arrowTimer);
    };
  }, []);

  // Configurazione per le animazioni staggered (sequenziali)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="about-us">
      {/* Sezione video */}
      <div className="video-section">
        <div className="video-container">
          <video
            className="background-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src={
                isMobile
                  ? "https://raw.githubusercontent.com/asddragonpine/website/main/video-dragon-verticale.mp4"
                  : "https://raw.githubusercontent.com/asddragonpine/website/main/video-dragon-orizzontale.mp4"
              }
              type="video/mp4"
            />
            Il tuo browser non supporta il video.
          </video>

          {/* Freccia verso il basso */}
          {showArrow && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="scroll-arrow"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth'
                });
              }}
            >
              <ArrowDown size={50} color="#ff4e50" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Contenuto "Chi Siamo" dopo il video */}
      {showContent && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="about-us-container"
        >
          <motion.h2 
            variants={fadeInUp}
            className="main-title"
          >
            Chi siamo
          </motion.h2>
          
          <div className="about-section">
            <motion.div variants={fadeInLeft}>
              <Title level={2} className="section-title">La Storia di ASD Dragon Pine</Title>
            </motion.div>
           
            <motion.div variants={fadeInUp}>
              <Paragraph className="about-paragraph">
                Il Dragon Boat è molto più di uno sport: è un'arte millenaria che affonda le sue radici nella cultura cinese, dove le gare con barche a forma di dragone si svolgono da oltre 2000 anni. Ogni imbarcazione ospita fino a 22 persone - 20 pagaiatori, un timoniere e un tamburino che detta il ritmo - uniti in perfetta sincronia.
              </Paragraph>
            </motion.div>
          </div>

          <div className="about-section">
            <motion.div variants={fadeInRight}>
              <Title level={2} className="section-title">La Nostra Missione</Title>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Paragraph className="about-paragraph">
                A Dragon Pine crediamo che il Dragon Boat rappresenti l'essenza stessa del lavoro di squadra. La nostra missione è promuovere uno sport che insegna valori fondamentali: coordinazione, ritmo, resistenza e soprattutto spirito di squadra. Quando 20 persone pagaiano insieme, è la perfetta sincronia a fare la differenza, non la forza individuale.
              </Paragraph>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Paragraph className="about-paragraph">
                Ci impegniamo a diffondere questa disciplina sia come attività sportiva che come esperienza formativa. Accogliamo atleti di ogni età e livello, dalle famiglie ai gruppi aziendali, dai giovani agli adulti, offrendo a tutti l'opportunità di scoprire la magia di muoversi all'unisono sull'acqua.
              </Paragraph>
            </motion.div>
          </div>

          <div className="about-section">
            <motion.div variants={fadeInLeft}>
              <Title level={2} className="section-title">I Nostri Valori</Title>
            </motion.div>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <motion.div variants={fadeInUp}>
                  <Card className="value-card">
                    <Title level={4}>Inclusività</Title>
                    <Paragraph>
                      Il nostro team è aperto a tutti, indipendentemente dall'età, dall'esperienza o dalla condizione fisica. Crediamo che il Dragon Boat sia uno sport universale che può essere praticato e apprezzato da chiunque.
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
              <Col xs={24} md={8}>
                <motion.div variants={fadeInUp}>
                  <Card className="value-card">
                    <Title level={4}>Spirito di Squadra</Title>
                    <Paragraph>
                      Nel Dragon Boat, o si vince insieme o si perde insieme. Ogni membro dell'equipaggio è essenziale e contribuisce al successo collettivo. La sincronia perfetta è il nostro obiettivo in ogni pagaiata.
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
              <Col xs={24} md={8}>
                <motion.div variants={fadeInUp}>
                  <Card className="value-card">
                    <Title level={4}>Connessione con la Natura</Title>
                    <Paragraph>
                      Pratichiamo il nostro sport immersi nella bellezza naturale del lago di Piné. Questo ci permette di sviluppare un profondo rispetto per l'ambiente e di promuovere pratiche sostenibili in tutte le nostre attività.
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </div>

          <div className="about-section">
            <motion.div variants={fadeInRight}>
              <Title level={2} className="section-title">Attività e Programmi</Title>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Paragraph className="about-paragraph">
                Il nostro calendario è ricco di attività per ogni livello e interesse:
              </Paragraph>
            </motion.div>
            <motion.ul variants={fadeInUp} className="activities-list">
              <li><strong>Allenamenti regolari</strong> per atleti di ogni livello</li>
              <li><strong>Competizioni regionali, nazionali, europee e mondiali</strong> dove mettiamo alla prova le nostre abilità</li>
              <li><strong>Team building aziendale</strong>, un'esperienza unica per rafforzare lo spirito di gruppo</li>
              <li><strong>Corsi per bambini e ragazzi</strong>, per avvicinare le nuove generazioni a questo sport</li>
              <li><strong>Festival estivi e dimostrazioni</strong> per promuovere il Dragon Boat nella comunità</li>
            </motion.ul>
          </div>

          <div className="about-section">
            <motion.div variants={fadeInLeft}>
              <Title level={2} className="section-title">Il Nostro Team</Title>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Paragraph className="about-paragraph">
                ASD Dragon Pine è composta da un gruppo eterogeneo di appassionati, uniti dall'amore per questo sport. Dai nostri coach esperti ai nuovi membri, ognuno porta energia, entusiasmo e un contributo unico alla nostra comunità.
              </Paragraph>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Paragraph className="about-paragraph">
                La nostra squadra agonistica partecipa regolarmente a competizioni in tutta Italia e occasionalmente all'estero, rappresentando con orgoglio il Trentino e la nostra tradizione sportiva.
              </Paragraph>
            </motion.div>
          </div>

          <div className="about-section">
            <motion.div variants={fadeInRight}>
              <Title level={2} className="section-title">Unisciti a Noi</Title>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Paragraph className="about-paragraph">
                Se sei curioso di provare il Dragon Boat, o semplicemente desideri saperne di più, ti invitiamo a contattarci. Offriamo lezioni di prova gratuite e accogliamo con entusiasmo nuovi membri nella nostra famiglia Dragon Pine.
              </Paragraph>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Paragraph className="about-paragraph">
                Non è necessaria alcuna esperienza precedente - solo la voglia di mettersi in gioco e scoprire la gioia di pagaiare insieme!
              </Paragraph>
            </motion.div>
            <motion.div variants={fadeInUp} className="button-container">
                  <Button 
        type="primary" 
        icon={<Mail size={18} />} 
        size="large" 
        className="join-button"
        href="mailto:asddragonpine@gmail.com"
      >
        Contattaci
      </Button>

                </motion.div>

                <Paragraph > </Paragraph>
                
                <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      <Card className="value-card" >
        <Title level={4}>Contatti</Title>
        
        <Paragraph >
          <Mail size={18} /> 
          <a href="mailto:asddragonpine@gmail.com"> asddragonpine@gmail.com</a>
        </Paragraph>

        <Paragraph>
          <MapPin size={18} />
           Baselga di Piné
        </Paragraph>
      </Card>
    </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AboutUs;