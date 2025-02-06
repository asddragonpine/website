import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Controlla se l'utente ha già accettato o rifiutato i cookie
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (cookiesAccepted === null) {
      setVisible(true); // Mostra il banner solo se non è stato accettato o rifiutato
    }
  }, []);

  const handleAccept = () => {
    // Imposta che i cookie sono stati accettati
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false); // Nascondi il banner
  };

  const handleReject = () => {
    // Imposta che i cookie sono stati rifiutati
    localStorage.setItem("cookiesAccepted", "false");
    setVisible(false); // Nascondi il banner
  };

  return (
    visible && (
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#2B373B",
          color: "#fff",
          padding: "10px",
          textAlign: "center",
          zIndex: 90,
          height: "100px",
        }}
      >
        <p style={{ margin: "0" }}>
          Utilizziamo i cookie per migliorare la tua esperienza.{" "}
          <button
            onClick={handleAccept}
            style={{
              backgroundColor: "#f2460c",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Accetta
          </button>
          <button
            onClick={handleReject}
            style={{
              backgroundColor: "#ccc",
              color: "#333",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
              marginLeft: "10px",
            }}
          >
            Rifiuta
          </button>
        </p>
      </div>
    )
  );
};

export default CookieConsent;
