import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin, Phone } from "lucide-react";
import { Typography, Row, Col, Card, Button, Divider } from "antd";
import "./AboutUs.css";
import { InstagramOutlined } from "@ant-design/icons";





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
        staggerChildren: 0.3,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

    // Dati delle squadre
    const teams = [
      {
        name: "Dragon Piné",
        description: "La nostra squadra di punta, ambiziosa e competitiva, con un palmarès che parla da sé: titoli territoriali, successi nazionali e partecipazioni internazionali. Ogni gara è una nuova sfida, ogni stagione un'occasione per migliorare e rappresentare l'Altopiano con orgoglio e determinazione.",
        color: "#ff6b6b", // rosso tenue
        logo: "https://raw.githubusercontent.com/asddragonpine/website/main/dragon-pine.png" 
      },
      {
        name: "Piné Sharks",
        description: "Un team giovane, esplosivo, pieno di energia. Gli Sharks mettono il divertimento al centro, senza rinunciare all'impegno. La loro forza? Il sorriso, la complicità e la voglia di crescere passo dopo passo, sempre insieme.",
        color: "#74b9ff", // blu tenue
        logo: "https://raw.githubusercontent.com/asddragonpine/website/main/dragon-shark.png"
      },
      {
        name: "Dragon Flames",
        description: "La nostra squadra femminile: grinta, eleganza e spirito di gruppo. Le Flames portano in acqua tutta la forza delle donne del dragonboat, dimostrando che determinazione e passione possono davvero fare la differenza.",
        color: "#e877ed", // rosa tenue
        logo: "https://raw.githubusercontent.com/asddragonpine/website/main/dragon-flames.png"
      },
      {
        name: "Dragon Fly",
        description: "La nostra squadra junior U16, composta da giovani atleti seri, concentrati e pronti a dare il massimo. Nonostante la giovane età, affrontano allenamenti e gare con grande maturità. Il futuro del dragonboat italiano... parte da qui.",
        color: "#b2bec3", // grigio tenue
        logo: "https://raw.githubusercontent.com/asddragonpine/website/main/dragon-junior.jpeg"
      }
    ];

  return (
    <div className="about-us">
      {/* Sezione video */}
      <div className="video-section">
        <div className="video-container">
          <video className="background-video" autoPlay muted loop playsInline>
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
                  behavior: "smooth",
                });
              }}
            >
              <ArrowDown size={75} color="#ff4e50" />
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
          <div
            style={{
              content: "''",
              position: "absolute",
              top: -500,
              left: 0,
              right: 0,
              bottom: "90%",
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)",
              zIndex: 1,
            }}
          />
          <motion.h2 variants={fadeInUp} className="main-title">
            Chi siamo
          </motion.h2>

          <div className="about-section">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Title level={2} className="section-title">
                La Storia di ASD Dragon Pine
              </Title>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
            >
              {" "}
              <Paragraph className="about-paragraph">
              Siamo l’A.S.D. Dragon Piné: un’associazione sportiva nata dalla voglia di unire le persone
              attraverso la forza dello sport, immersi in uno dei luoghi più suggestivi del Trentino, l’Altopiano di
              Piné.
              Il nostro cuore batte al ritmo delle pagaiate, sulle acque cristalline del Lago della Serraia, dove
              natura, passione e spirito di squadra si incontrano per creare qualcosa di unico.
              </Paragraph>
            </motion.div>
          </div>

          <div className="about-section">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
            >
              {" "}
              <Title level={2} className="section-title">
                La Nostra Missione
              </Title>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Paragraph className="about-paragraph">
              Promuoviamo il dragonboat, uno sport di squadra spettacolare, accessibile e coinvolgente, capace
              di far crescere legami veri, dentro e fuori dalla barca. Siamo partiti in pochi, ma oggi siamo una
              grande famiglia di atleti, allenatori, volontari e sostenitori che credono in un progetto sportivo che
              mette le persone al centro.
              </Paragraph>
            </motion.div>
          </div>

          <div className="about-section">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Title level={2} className="section-title">
                I Nostri Valori
              </Title>
            </motion.div>
            <Row gutter={[24, 24]} style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Col xs={24} md={8} style={{ display: 'flex' }}>
            <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1 }}
                >
      <Card className="value-card" style={{ height: '100%' }}>
      <Title level={4}>Inclusività</Title>
                    <Paragraph>
                    Il dragonboat è per tutti. Giovani, adulti, donne, uomini, principianti e atleti esperti: nella
                    nostra associazione c’è spazio per chiunque voglia mettersi in gioco.
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
              <Col xs={24} md={8} style={{ display: 'flex' }}>
              <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1 }}
                >
      <Card className="value-card" style={{ height: '100%' }}>
      <Title level={4}>Spirito di Squadra</Title>
                    <Paragraph>
                    In ogni momento, sia durante gli allenamenti che nella vita di tutti i giorni, lo spirito di
                    squadra è ciò che ci rende più forti. Collaborazione, sostegno reciproco, rispetto e unione
                    sono la nostra forza: è insieme che superiamo le difficoltà, ci motiviamo a vicenda e
                    cresciano come gruppo.
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
              <Col xs={24} md={8} style={{ display: 'flex' }}>
              <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1 }}
                >
      <Card className="value-card" style={{ height: '100%' }}>
      <Title level={4}>Passione</Title>
                    <Paragraph>
                    Mettiamo il cuore in ogni cosa che facciamo: che sia una competizione internazionale o una
                    giornata di allenamento sul lago, lo viviamo con entusiasmo e dedizione.
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
              <Col xs={24} md={8} style={{ display: 'flex' }}>
              <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1 }}
                >
      <Card className="value-card" style={{ height: '100%' }}>
      <Title level={4}>Territorio e natura</Title>
                    <Paragraph>
                    Viviamo in un posto meraviglioso, e vogliamo valorizzarlo. Il nostro legame con il lago, i
                    boschi e le montagne dell’Altopiano di Piné è fortissimo. Rispettiamo la natura e ci
                    impegniamo a far conoscere il territorio attraverso lo sport.
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
              <Col xs={24} md={8} style={{ display: 'flex' }}>
              <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1 }}
                >
      <Card className="value-card" style={{ height: '100%' }}>
      <Title level={4}>Crescita personale e collettiva</Title>
                    <Paragraph>
                    Ogni pagaiata è un passo avanti, non solo per il team, ma anche per la persona. Vogliamo
                    che ogni atleta cresca come sportivo e come individuo, imparando a superare i propri limiti
                    insieme agli altri.
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </div>

          <div className="about-section">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Title level={2} className="section-title">
              La nostra realtà
              </Title>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Paragraph className="about-paragraph">
              La nostra offerta è pensata per coinvolgere atleti di ogni età e livello, con programmi adatti a chi
              vuole gareggiare ad alti livelli ma anche a chi desidera semplicemente vivere un’esperienza nuova,
              attiva e divertente.
              </Paragraph>
            
            <motion.ul variants={fadeInUp} className="activities-list">
              <li>
                <strong>Allenamenti regolari</strong> per tutte le categorie
              </li>
              <li>
                <strong>
                Partecipazione a gare regionali, nazionali e internazionali
                </strong>{" "}
              </li>
              <li>
                <strong>Eventi di promozione e open day aperti a tutti</strong>
              </li>
              <li>
                <strong>Attività di avvicinamento </strong>, per scuole e gruppi
              </li>
              <li>
                <strong>Esperienze di team building per aziende e associazioni</strong>, un'esperienza unica
                per rafforzare lo spirito di gruppo
              </li>
              <li>
                <strong>Eventi sul territorio</strong>, come il Dragonfestival e la Dragolases
              </li>
            </motion.ul>
            </motion.div>
          </div>

          <div className="about-section">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Title level={2} className="section-title">
              Le Nostre Squadre
              </Title>
            </motion.div>
            <Row gutter={[24, 24]} style={{ display: 'flex', flexWrap: 'wrap' }}>
            {teams.map((team, index) => (
              <Col xs={24} md={12} key={index} style={{ display: 'flex' }}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 * index }}
                  style={{ width: '100%' }}
                >
                  <Card 
                    className="team-card"
                    style={{ 
                      backgroundColor: 'white',
                      borderColor: team.color,
                      boxShadow: `0 10px 10px rgba(0,0,0,0.1)`,
                      borderWidth: '5px',
                      height: '100%'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ flexShrink: 0, marginRight: '16px' }}>
                        <img 
                          src={team.logo} 
                          alt={`Logo ${team.name}`} 
                          style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                        />
                      </div>
                      <Title level={3} style={{ margin: 0, color: team.color }}>
                        {team.name}
                      </Title>
                    </div>
                    <Paragraph style={{ fontSize: '16px', flex: '1 1 auto' }}>
                      {team.description}
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
          </div>

          <div className="about-section">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Title level={2} className="section-title">
                Unisciti a Noi
              </Title>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Paragraph className="about-paragraph">
              Che tu sia un atleta, uno studente, o semplicemente una persona curiosa, all’A.S.D. Dragon Piné c’è
              un posto per te.<br/>
              <strong>Vieni a scoprire la magia del Dragonboat</strong>, a vivere lo sport come non l’hai mai fatto: nella natura,
              tra persone vere, al ritmo di un cuore che batte forte...
              </Paragraph>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
            >
             
            </motion.div>
            

{/* Modifica nella card dei contatti in AboutUs.jsx */}
            <motion.div 
 
     
                variants={fadeInUp} 
                initial="hidden" 
                animate="visible"
                className="contact-card-container"
              >
                <Card className="contact-card">
                  <div className="contact-card-header">
                    <Title level={3}>Contattaci</Title>
                    <div className="contact-divider"></div>
                  </div>
                  <div className="contact-cta">
                    <Button 
                      type="primary" 
                      size="large"
                      icon={<Mail size={18} />}
                      className="join-button"
                      href="mailto:asddragonpine@gmail.com"
                    >
                      Scrivici ora
                    </Button>
                  </div>
                  <div className="contact-methods">
                    <div className="contact-method">
                      <div className="contact-icon">
                        <Mail size={24} />
                      </div>
                      <div className="contact-info">
                        <Title level={5}>Email</Title>
                        <a href="mailto:asddragonpine@gmail.com" className="contact-link">
                          asddragonpine@gmail.com
                        </a>
                        <div className="contact-secondary">
                          <a href="mailto:associazione@pec.dragonpine.it" className="contact-link">
                            associazione@pec.dragonpine.it (PEC)
                          </a>
                        </div>
                      </div>
                    </div>
                    
                   
                    
                    <div className="contact-method">
                      <div className="contact-icon">
                        <Phone size={24} />
                      </div>
                      <div className="contact-info">
                        <Title level={5}>Telefono</Title>
                        <a href="tel:+393311540763" className="contact-link">
                          +39 331 154 0763 (Daniel Casagranda)
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Aggiungi le informazioni legali */}
                  <div className="legal-info">
                    <Title level={5} className="legal-title">Informazioni Legali</Title>
                    <Divider style={{ margin: '12px 0' }} />
                    <div className="legal-details">
                      <p><strong>Denominazione:</strong> DRAGON PINÈ ASSOCIAZIONE SPORTIVA DILETTANTISTICA</p>
                      <p><strong>P.Iva:</strong> 02420980225</p>
                      <p><strong>Cod Fiscale:</strong> 02420980225</p>
                      <p><strong>Indirizzo:</strong> Via C. Battisti 50, 38042 Baselga di Pinè (TN), IT</p>
                    </div>
                  </div>
                  
                 
                </Card>
              </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AboutUs;
