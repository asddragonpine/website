


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout, Spin } from "antd";
import Navbar from "./Navbar";
import Home from "./Home";
import Event from "./Event";
import Footerbar from "./Footerbar";
import CookieConsent from './CookieConsent';
import AboutUs from "./AboutUs";
import Gallery from "./Gallery";
import FormIscrizioneSemplice from "./FormIscrizioneSemplice"; // Importa il componente form
import DashboardSemplice from "./DashboardSemplice"; // Importa il componente dashboard
import FantaDragonBoat from './pages/FantaDragonBoat';
import { AuthProvider } from './context/AuthContext'; // Importa l'AuthProvider

// Componente per proteggere la dashboard con password
const ProtectedDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Password semplice hardcoded (in produzione usare un sistema più sicuro)
    if (password === "Dragon2025!") {
      setAuthenticated(true);
      sessionStorage.setItem('dashboard_auth', 'true');
    } else {
      setError("Password non valida");
    }
  };
  
  // Verifica se c'è già un'autenticazione in sessione
  useEffect(() => {
    const isAuth = sessionStorage.getItem('dashboard_auth') === 'true';
    if (isAuth) {
      setAuthenticated(true);
    }
  }, []);
  
  // Se autenticato, mostra la dashboard
  if (authenticated) {
    return <DashboardSemplice />;
  }
  
  // Altrimenti mostra il form di login
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh' 
    }}>
      <div style={{ 
        width: '300px', 
        padding: '20px', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
        borderRadius: '8px',
        backgroundColor: 'white'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Accesso Dashboard
        </h2>
        
        {error && (
          <div style={{ 
            color: 'red', 
            backgroundColor: '#ffebee', 
            padding: '10px', 
            borderRadius: '4px',
            marginBottom: '15px' 
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#f2460c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <CookieConsent />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Routes>
          <Route path="/website" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/fantadragonboat" element={
            <ErrorBoundaryWrapper>
              <FantaDragonBoat />
            </ErrorBoundaryWrapper>
          } />
          
          {/* Nuovo percorso per il form di iscrizione */}
          <Route path="/iscrizione" element={<FormIscrizioneSemplice />} />
          
          {/* Percorso nascosto per la dashboard con protezione */}
          <Route path="/admin-dashboard" element={<ProtectedDashboard />} />
          
          {/* Redirect per eventuali URL non validi */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footerbar />
      </motion.div>
    </>
  );
};

// Componente ErrorBoundary semplice
function ErrorBoundaryWrapper({ children }) {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    // Funzione per resettare l'errore
    const handleError = () => {
      console.log("Errore rilevato, reset dell'applicazione");
      setHasError(true);
    };
    
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);
  
  if (hasError) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Si è verificato un errore</h3>
        <p>Qualcosa è andato storto nel caricamento della pagina.</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            background: '#f2460c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '15px'
          }}
        >
          Ricarica la pagina
        </button>
      </div>
    );
  }
  
  return children;
}

export default App;