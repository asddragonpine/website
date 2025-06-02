// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { supabase } from '../supabaseClient';

// export default function ResetPassword() {
//   const location = useLocation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [status, setStatus] = useState('');
//   const [mode, setMode] = useState('request'); // 'request' | 'reset'

//   useEffect(() => {
//     const hashParams = new URLSearchParams(location.hash.substring(1)); // rimuove il "#"
//     const type = hashParams.get('type');
//     const access_token = hashParams.get('access_token');
//     const refresh_token = hashParams.get('refresh_token');

//     if (type === 'recovery' && access_token && refresh_token) {
//       supabase.auth.setSession({ access_token, refresh_token }).then(({ error }) => {
//         if (error) {
//           setStatus('Errore: link non valido o scaduto.');
//         } else {
//           setStatus('Autenticazione completata. Inserisci la nuova password.');
//           setMode('reset');
//         }
//       });
//     }
//   }, [location]);

//   const handleSendResetEmail = async () => {
//     const { error } = await supabase.auth.resetPasswordForEmail(email, {
//       redirectTo: 'http://localhost:5173/#/reset-password',
//     });

//     if (error) {
//       setStatus('Errore invio email: ' + error.message);
//     } else {
//       setStatus('Controlla la tua email per il link di reset.');
//     }
//   };

//   const handleUpdatePassword = async () => {
//     const { error } = await supabase.auth.updateUser({ password });

//     if (error) {
//       setStatus('Errore aggiornamento password: ' + error.message);
//     } else {
//       setStatus('Password aggiornata con successo! Ora puoi effettuare il login.');
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <p>{status}</p>

//       {mode === 'request' ? (
//         <>
//           <input
//             type="email"
//             placeholder="Inserisci la tua email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button onClick={handleSendResetEmail}>Invia link di reset</button>
//         </>
//       ) : (
//         <>
//           <input
//             type="password"
//             placeholder="Nuova password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={handleUpdatePassword}>Aggiorna password</button>
//         </>
//       )}
//     </div>
//   );
// }

// src/pages/ResetPassword.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  LockReset as LockResetIcon,
  Email as EmailIcon,
  Password as PasswordIcon,
  Check as CheckIcon
} from '@mui/icons-material';

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ message: '', severity: 'info' });
  const [mode, setMode] = useState('request'); // 'request' | 'reset'
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const hashParams = new URLSearchParams(location.hash.substring(1)); // rimuove il "#"
    const type = hashParams.get('type');
    const access_token = hashParams.get('access_token');
    const refresh_token = hashParams.get('refresh_token');

    if (type === 'recovery' && access_token && refresh_token) {
      setLoading(true);
      supabase.auth.setSession({ access_token, refresh_token }).then(({ error }) => {
        if (error) {
          setStatus({ 
            message: 'Errore: link non valido o scaduto. Richiedi un nuovo link di reset.', 
            severity: 'error' 
          });
          setMode('request');
        } else {
          setStatus({ 
            message: 'Autenticazione completata. Inserisci la tua nuova password.', 
            severity: 'success' 
          });
          setMode('reset');
        }
        setLoading(false);
      });
    }
  }, [location]);

  const handleSendResetEmail = async () => {
    if (!email) {
      setStatus({ message: 'Inserisci un indirizzo email valido', severity: 'error' });
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);


    if (error) {
      setStatus({ 
        message: 'Errore invio email: ' + error.message, 
        severity: 'error' 
      });
    } else {
      setStatus({ 
        message: 'Controlla la tua email per il link di reset. Se non lo vedi, controlla anche nella cartella spam.', 
        severity: 'success' 
      });
      setSuccess(true);
    }
    setLoading(false);
  };

  const handleUpdatePassword = async () => {
    if (!password) {
      setStatus({ message: 'Inserisci una password valida', severity: 'error' });
      return;
    }
    
    if (password.length < 6) {
      setStatus({ message: 'La password deve contenere almeno 6 caratteri', severity: 'error' });
      return;
    }
    
    if (password !== confirmPassword) {
      setStatus({ message: 'Le password non corrispondono', severity: 'error' });
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus({ 
        message: 'Errore aggiornamento password: ' + error.message, 
        severity: 'error' 
      });
    } else {
      setStatus({ 
        message: 'Password aggiornata con successo! Ora puoi effettuare il login.', 
        severity: 'success' 
      });
      setSuccess(true);
      
      // Reindirizza alla pagina principale dopo 3 secondi
      setTimeout(() => {
        navigate('/fantadragonboat');
      }, 3000);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setStatus({ message: '', severity: 'info' });
    setSuccess(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: { xs: 8, sm: 10 }, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <LockResetIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Reset Password
          </Typography>
          <Divider sx={{ my: 2 }} />
        </Box>
        
        {status.message && (
          <Alert 
            severity={status.severity} 
            sx={{ mb: 3 }}
            action={
              status.severity === 'success' && !success ? (
                <Button color="inherit" size="small" onClick={resetForm}>
                  Reset
                </Button>
              ) : null
            }
          >
            {status.message}
          </Alert>
        )}
        
        {mode === 'request' && !success ? (
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Richiedi un link per reimpostare la password
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                Inserisci l'indirizzo email associato al tuo account. Ti invieremo un link per reimpostare la tua password.
              </Typography>
              
              <TextField
                required
                fullWidth
                type="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Inserisci la tua email"
                margin="normal"
                InputProps={{
                  startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
              
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSendResetEmail}
                disabled={loading || !email}
                sx={{ mt: 3 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Invia link di reset'}
              </Button>
            </CardContent>
          </Card>
        ) : mode === 'reset' && !success ? (
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Imposta la nuova password
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                Crea una nuova password sicura per il tuo account. La password deve essere di almeno 6 caratteri.
              </Typography>
              
              <TextField
                required
                fullWidth
                type="password"
                label="Nuova password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Inserisci la nuova password"
                margin="normal"
                InputProps={{
                  startAdornment: <PasswordIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
              
              <TextField
                required
                fullWidth
                type="password"
                label="Conferma password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Conferma la nuova password"
                margin="normal"
                error={password !== confirmPassword && confirmPassword !== ''}
                helperText={password !== confirmPassword && confirmPassword !== '' ? 'Le password non corrispondono' : ''}
                InputProps={{
                  startAdornment: <PasswordIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
              
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleUpdatePassword}
                disabled={loading || !password || password !== confirmPassword}
                sx={{ mt: 3 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Aggiorna password'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <CheckIcon color="success" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {mode === 'request' ? 'Email inviata!' : 'Password aggiornata!'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {mode === 'request' 
                ? 'Controlla la tua casella email per il link di reset.' 
                : 'La tua password è stata aggiornata. Verrai reindirizzato alla pagina di login...'}
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => navigate('/fantadragonboat')}
              sx={{ mt: 1 }}
            >
              Vai al login
            </Button>
          </Box>
        )}
        
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Ricordi la tua password? 
            <Button 
              variant="text" 
              color="primary" 
              onClick={() => navigate('/fantadragonboat')}
              sx={{ ml: 1 }}
            >
              Accedi
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}