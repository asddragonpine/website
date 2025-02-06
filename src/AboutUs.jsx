import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const AboutUs = () => {
  const [showContent, setShowContent] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    // Mostra il contenuto "Chi Siamo" dopo 3 secondi
    const contentTimer = setTimeout(() => setShowContent(true), 3000);
    const arrowTimer = setTimeout(() => setShowArrow(true), 3000);
    
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(arrowTimer);
    };
  }, []);

  // Rileva se lo schermo è mobile o desktop
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', position: 'relative' }}>
      {/* Video responsive */}
      <div style={{ position: 'relative', height: '100vh' }}>
        <video
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          autoPlay
          muted
          loop
        >
          <source
            src={isMobile ? '/video-dragon-verticale.mp4' : '/video-dragon-orizzontale.mp4'}
            type='video/mp4'
          />
          Il tuo browser non supporta il video.
        </video>

        {/* Freccia verso il basso */}
        {showArrow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'black',
              textAlign: 'center',
            }}
          >
            <ArrowDown size={50} color="black" />
          </motion.div>
        )}
      </div>

      {/* Contenuto "Chi Siamo" dopo il video */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ padding: '20px', textAlign: 'center' }}
        >
          <h2><br />Chi siamo</h2>
          <p>
            Questo è il nostro team, la nostra missione e i nostri valori.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default AboutUs;
