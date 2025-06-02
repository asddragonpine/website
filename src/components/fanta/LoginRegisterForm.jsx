// src/components/fanta/LoginRegisterForm.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Container, 
  Alert, 
  CircularProgress,
  Tabs,
  Tab,
  Grid
} from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import { supabase } from '../../supabaseClient';
import { debounce } from 'lodash'; // Assicurati di installare lodash: npm install lodash
import { Link as RouterLink } from 'react-router-dom';

const LoginRegisterForm = ({ onSuccess }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Form registrazione
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [usernameChecking, setUsernameChecking] = useState(false);
  
  // Form validation errors
  const [emailError, setEmailError] = useState('');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
    setSuccess('');
  };

  // Verifica username disponibile con debounce
  const checkUsername = async (usernameToCheck) => {
    if (!usernameToCheck) {
      setUsernameError('');
      return true;
    }
    
    setUsernameChecking(true);
    
    try {
      // Usa una chiamata pubblica invece di autenticata per verificare l'username
      const { data, error } = await supabase
        .from('utenti')
        .select('username')
        .ilike('username', usernameToCheck)
        .maybeSingle();

      if (error) {
        console.error('Errore verifica username:', error);
        setUsernameError('Errore nella verifica dell\'username');
        return false;
      }
      
      if (data) {
        setUsernameError('Username già in uso');
        return false;
      } else {
        setUsernameError('');
        return true;
      }
    } catch (error) {
      console.error('Errore verifica username:', error);
      setUsernameError('Errore nella verifica');
      return false;
    } finally {
      setUsernameChecking(false);
    }
  };

  // Crea una versione con debounce della funzione checkUsername
  const debouncedCheckUsername = useCallback(
    debounce((username) => checkUsername(username), 800),
    []
  );

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    
    if (value) {
      setUsernameChecking(true);
      debouncedCheckUsername(value);
    } else {
      setUsernameError('');
    }
  };
  
  // Verifica email esistente con debounce
  const checkEmail = async (emailToCheck) => {
    if (!emailToCheck) {
      setEmailError('');
      return true;
    }
    
    // Verifica formato email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailToCheck)) {
      setEmailError('Formato email non valido');
      return false;
    }
    
    // Non dobbiamo verificare se l'email esiste già nel database
    // perché Supabase lo farà al momento della registrazione
    setEmailError('');
    return true;
  };
  
  // Crea una versione con debounce della funzione checkEmail
  const debouncedCheckEmail = useCallback(
    debounce((email) => checkEmail(email), 800),
    []
  );
  
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setRegisterEmail(value);
    
    if (value) {
      debouncedCheckEmail(value);
    } else {
      setEmailError('');
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) throw error;
      
      setSuccess('Login effettuato con successo!');
      
      // Callback per il componente parent dopo login riuscito
      if (onSuccess) onSuccess();
    } catch (error) {
      setError(error.message || 'Errore durante il login');
    } finally {
      setLoading(false);
    }
  };

  // Versione semplificata e più robusta
const handleRegister = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');
  
  // Validazione base
  if (registerPassword !== confirmPassword) {
    setError('Le password non corrispondono');
    return;
  }
  
  if (registerPassword.length < 6) {
    setError('La password deve contenere almeno 6 caratteri');
    return;
  }
  
  // Verifica username
  const isUsernameValid = await checkUsername(username);
  if (!isUsernameValid) {
    return;
  }
  
  // Verifica formato email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(registerEmail)) {
    setEmailError('Formato email non valido');
    return;
  }
  
  setLoading(true);

  try {
    // Registra direttamente l'utente - Supabase gestirà l'errore se l'email esiste già
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: registerEmail,
      password: registerPassword,
      options: {
        data: {
          nome: nome,
          cognome: cognome,
          username: username
        }
      }
    });

    if (authError) {
      // Verifica se l'errore è relativo a utente già esistente
      if (authError.message.includes('User already registered') || 
          authError.message.includes('Email already registered')) {
        throw new Error('Email già registrata. Usa un\'altra email o accedi con quella esistente.');
      }
      throw authError;
    }
    
    setSuccess('Registrazione completata! Ora puoi effettuare il login.');
    
    // Passa automaticamente alla scheda login dopo la registrazione
    setTimeout(() => {
      setActiveTab(0);
      setLoginEmail(registerEmail);
    }, 2000);
  } catch (error) {
    console.error("Errore durante la registrazione:", error);
    setError(error.message || 'Errore durante la registrazione');
  } finally {
    setLoading(false);
  }
};

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 3, mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="Accedi" id="login-tab" />
            <Tab label="Registrati" id="register-tab" />
          </Tabs>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        
        {/* Tab di Login */}
        <Box role="tabpanel" hidden={activeTab !== 0}>
          {activeTab === 0 && (
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="login-email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="login-password"
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Accedi'}
              </Button>
              
              <Box textAlign="center">
                <Typography variant="body2">
                  Non hai un account?{' '}
                  <Button 
                    variant="text" 
                    onClick={() => setActiveTab(1)}
                    sx={{ p: 0, minWidth: 'auto', verticalAlign: 'baseline' }}
                  >
                    Registrati
                  </Button>
                </Typography>
              </Box>
              <Box textAlign="center" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Password dimenticata?{' '}
                  <MuiLink 
                    component={RouterLink} 
                    to="/reset-password"
                    underline="hover"
                    sx={{ cursor: 'pointer' }}
                  >
                    Reimposta password
                  </MuiLink>
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        
        {/* Tab di Registrazione */}
        <Box role="tabpanel" hidden={activeTab !== 1}>
          {activeTab === 1 && (
            <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <TextField
                    required
                    fullWidth
                    id="register-email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={registerEmail}
                    onChange={handleEmailChange}
                    error={!!emailError}
                    helperText={emailError}
                  />
                </Grid>
                
                <Grid size={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                    error={!!usernameError}
                    helperText={usernameChecking ? 'Verifica in corso...' : usernameError}
                    InputProps={{
                      endAdornment: usernameChecking ? <CircularProgress size={20} /> : null
                    }}
                  />
                </Grid>
                
                <Grid size={12}>
                  <TextField
                    required
                    fullWidth
                    id="nome"
                    label="Nome"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </Grid>
                
                <Grid size={12}>
                  <TextField
                    required
                    fullWidth
                    id="cognome"
                    label="Cognome"
                    name="cognome"
                    value={cognome}
                    onChange={(e) => setCognome(e.target.value)}
                  />
                </Grid>
                
                <Grid size={12}>
                  <TextField
                    required
                    fullWidth
                    name="register-password"
                    label="Password"
                    type="password"
                    id="register-password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                </Grid>
                
                <Grid size={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Conferma Password"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={registerPassword !== confirmPassword && confirmPassword !== ''}
                    helperText={registerPassword !== confirmPassword && confirmPassword !== '' ? 'Le password non corrispondono' : ''}
                  />
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading || !!usernameError || !!emailError || usernameChecking}
              >
                {loading ? <CircularProgress size={24} /> : 'Registrati'}
              </Button>
              
              <Box textAlign="center">
                <Typography variant="body2">
                  Hai già un account?{' '}
                  <Button 
                    variant="text"
                    onClick={() => setActiveTab(0)}
                    sx={{ p: 0, minWidth: 'auto', verticalAlign: 'baseline' }}
                  >
                    Accedi
                  </Button>
                </Typography>
              </Box>
               <Box textAlign="center" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Password dimenticata?{' '}
                  <MuiLink 
                    component={RouterLink} 
                    to="/reset-password"
                    underline="hover"
                    sx={{ cursor: 'pointer' }}
                  >
                    Reimposta password
                  </MuiLink>
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginRegisterForm;