// src/pages/FantaDragonBoat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Tab, 
  Tabs, 
  Divider,
  Card, 
  CardContent,
  Alert,
  Button,
  Grid,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  AddCircleOutline as AddIcon,
  FormatListNumbered as ListIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import PronosticoForm from '/src/components/fanta/PronosticoForm';
import ResultForm from '/src/components/fanta/ResultForm';
import Classifiche from '/src/components/fanta/Classifiche';
import LoginRegisterForm from '/src/components/fanta/LoginRegisterForm';
import { useAuth } from '/src/context/AuthContext';
import { supabase } from '/src/supabaseClient';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`fanta-tabpanel-${index}`}
      aria-labelledby={`fanta-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const FantaDragonBoat = () => {
  const [tabValue, setTabValue] = useState(0);
  const { user, loading: authLoading, logout } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Riferimento all'ID utente per cui abbiamo già caricato il profilo
  const loadedUserIdRef = useRef(null);

  // Funzione per ricarica pagina
  const handleRefresh = () => {
    window.location.reload();
  };

  // Se l'autenticazione ci mette troppo, mostra un errore
  useEffect(() => {
    let timeoutId;
    
    if (authLoading) {
      timeoutId = setTimeout(() => {
        if (authLoading) {
          setError("Il caricamento dell'autenticazione sta impiegando troppo tempo. Potrebbe esserci un problema.");
        }
      }, 10000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [authLoading]);

  // Carica il profilo utente quando l'utente è autenticato
  useEffect(() => {
    console.log("FantaDragonBoat - Verifica profilo utente", { user });
    
    const loadUserProfile = async () => {
      if (!user) {
        setUserProfile(null);
        setIsAdmin(false);
        setLoading(false);
        loadedUserIdRef.current = null;
        return;
      }
      
      // Se abbiamo già caricato il profilo per questo utente, non ricaricarlo
      if (loadedUserIdRef.current === user.id) {
        console.log("Profilo utente già caricato, skippo la chiamata API");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const { data: profile, error: profileError } = await supabase
          .from('utenti')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profileError) {
          console.error("Errore caricamento profilo:", profileError);
          setError("Errore nel caricamento del tuo profilo");
        } else {
          console.log("Profilo utente caricato:", profile);
          setUserProfile(profile);
          setIsAdmin(profile?.is_admin === true);
          // Salva l'ID dell'utente per cui abbiamo caricato il profilo
          loadedUserIdRef.current = user.id;
        }
      } catch (err) {
        console.error("Eccezione durante caricamento profilo:", err);
        setError("Si è verificato un errore imprevisto");
      } finally {
        setLoading(false);
      }
    };
    
    loadUserProfile();
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Reset dello stato di errore quando si cambia tab
    setError(null);
  };
  
  // Funzione per gestire logout con migliore feedback e reset del cache
  const handleLogout = async () => {
    try {
      const { success, error: logoutError } = await logout();
      if (!success && logoutError) {
        throw new Error(logoutError || "Errore sconosciuto durante il logout");
      }
      // Reset del riferimento al logout
      loadedUserIdRef.current = null;
    } catch (err) {
      console.error("Errore durante il logout:", err);
      setError("Errore durante il logout. Riprova o ricarica la pagina.");
    }
  };

  // Mostra un loader mentre l'Auth è in caricamento
  if (authLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh', mt: 8 }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary">Verifica autenticazione...</Typography>
        
        <Button
          variant="outlined"
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          size="small"
          sx={{ mt: 3 }}
        >
          Ricarica se bloccato
        </Button>
      </Box>
    );
  }
  
  // Mostra un loader mentre il profilo è in caricamento (se l'utente è autenticato)
  if (user && loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh', mt: 8 }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary">Caricamento profilo...</Typography>
        
        <Button
          variant="outlined"
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          size="small"
          sx={{ mt: 3 }}
        >
          Ricarica se bloccato
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 8, sm: 10 }, mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2,
        flexWrap: 'wrap'
      }}>
        <Box 
        component="img"
        src="https://raw.githubusercontent.com/asddragonpine/website/main/fantadragonboat.png" // Assicurati che il percorso sia corretto
        alt="FantaDragonBoat Logo"
        sx={{ 
          height: { xs: '130px', sm: '190px', md: '250px' }, // Altezza responsiva
          width: 'auto', // Mantiene l'aspect ratio
          maxWidth: { xs: '400px', sm: '500px', md: '600px' }, // Larghezza massima responsiva
          mr: 2, // Margine a destra
          objectFit: 'contain' // Assicura che l'immagine si adatti bene
          
        }}
      />
        
        <Button
          variant="outlined"
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          size={isMobile ? "small" : "medium"}
          sx={{ 
            fontSize: isMobile ? '0.75rem' : 'inherit',
            px: isMobile ? 1 : 2
          }}
        >
          {isMobile ? 'Ricarica' : 'Ricarica pagina'}
        </Button>
      </Box>

      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
          <Button 
            size="small" 
            onClick={handleRefresh} 
            sx={{ ml: 2 }}
          >
            Ricarica ora
          </Button>
        </Alert>
      )}
      
      <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
        Partecipa al gioco e indovina i risultati delle gare di Dragon Boat!
      </Typography>
      
      {/* Regole nascoste in un accordion */}
      <Accordion sx={{ mt: 3, mb: 3 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="regole-content"
          id="regole-header"
        >
          <Typography variant="h6">Come Funziona il FantaDragonBoat</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    1. Inserisci i Pronostici
                  </Typography>
                  <Box component="div" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                    Per ogni gara, ordina le squadre in base alla posizione in cui pensi che arriveranno ENTRO IL GIORNO PRIMA DELLA GARA!<br /><br />
                    Puoi anche indicare la squadra che farà il miglior tempo per un bonus extra!<br /><br />
                    Inoltre puoi inserire il pronostico finale della classifica del Campionato Trentino, entro il 31/07!
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid size={12}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    2. Ottieni Punti
                  </Typography>
                  <Box component="div" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                    • 10 punti per ogni squadra in posizione esatta<br />
                    • 7 punti se una squadra è a ±1 posizione<br />
                    • 5 punti se una squadra è a ±2 posizioni<br />
                    • 3 punti se una squadra è a ±3 posizioni<br />
                    • 0 punti per altre posizioni<br />
                    • +10 punti BONUS se indovini il miglior tempo
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid size={12}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    3. Vinci la Classifica
                  </Typography>
                  <Box component="div" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                    Alla fine del campionato, l'utente con il maggior numero di punti vince il FantaDragonBoat!
                    Ogni pronostico corretto ti avvicina alla vittoria.
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      
      {/* Sezione utente o login/registrazione */}
      {!user ? (
        // Mostra form di login/registrazione se l'utente non è autenticato
        <LoginRegisterForm />
      ) : (
        // Mostra l'interfaccia utente se autenticato
        <Box sx={{ width: '100%' }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2,
            flexWrap: 'wrap',
            gap: 1
          }}>
            <Typography variant="h6" sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>
              Benvenuto, {userProfile?.username || userProfile?.nome || 'Utente'}!
            </Typography>
            
            <Button 
              variant="outlined" 
              color="secondary"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              size={isMobile ? "small" : "medium"}
            >
              Logout
            </Button>
          </Box>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="fanta tabs"
              centered
              variant={isMobile ? "fullWidth" : "standard"}
            >
              <Tab 
                icon={<AddIcon />} 
                label="Inserisci Pronostico"
                sx={{ fontSize: isMobile ? '0.75rem' : 'inherit' }} 
              />
              <Tab 
                icon={<ListIcon />} 
                label="Classifiche"
                sx={{ fontSize: isMobile ? '0.75rem' : 'inherit' }} 
              />
              {isAdmin && (
                <Tab 
                  icon={<AdminIcon />} 
                  label="Admin"
                  sx={{ fontSize: isMobile ? '0.75rem' : 'inherit' }} 
                />
              )}
            </Tabs>
          </Box>
          
          <TabPanel value={tabValue} index={0}>
            <PronosticoForm userId={user.id} />
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <Classifiche />
          </TabPanel>
          
          {isAdmin && (
            <TabPanel value={tabValue} index={2}>
              <ResultForm />
            </TabPanel>
          )}
        </Box>
      )}
    </Container>
  );
};

export default FantaDragonBoat;