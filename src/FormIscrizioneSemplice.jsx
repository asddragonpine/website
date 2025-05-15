// import React, { useState, useEffect, useCallback } from "react";
// import { debounce } from 'lodash';
// import { createClient } from '@supabase/supabase-js';
// import imageCompression from 'browser-image-compression';
// import dayjs from 'dayjs';
// import 'dayjs/locale/it';
// import { motion } from "framer-motion";
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormControlLabel,
//   Checkbox,
//   Alert,
//   Box,
//   LinearProgress,
//   Divider,
//   CircularProgress,
//   FormHelperText,
//   Stack,
//   FormGroup,
//   Autocomplete,
//   Chip
// } from '@mui/material';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import {
//   Email,
//   Person,
//   Phone,
//   Home,
//   CalendarMonth,
//   StraightenOutlined,
//   MonitorWeight,
//   Rowing,
//   CheckroomOutlined,
//   Pool,
//   Badge,
//   UploadFile,
//   ReceiptLong,
//   CameraAlt,
//   Send,
//   Description,
//   CheckCircle as CheckCircleOutline
// } from '@mui/icons-material';

// import './FormIscrizione.css';

// // Configurazione Supabase
// const supabaseUrl = 'https://guoicoktnwrvzsynrfdf.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1b2ljb2t0bndydnpzeW5yZmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDIzODIsImV4cCI6MjA1OTg3ODM4Mn0.RmaA7PBCuJssRDl1ee0_VT7A1h5YkZMFzf0MqtlB4K4';
// const supabase = createClient(supabaseUrl, supabaseKey);


// const FormIscrizioneSemplice = () => {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');
//   const [progress, setProgress] = useState(0);
//   const [emailExists, setEmailExists] = useState(false);
//   const [checking, setChecking] = useState(false);

//   // Stato per i file
//   const [files, setFiles] = useState({
//     cartaIdentitaFronte: null,  
//   cartaIdentitaRetro: null,
//     visitaMedica: null,
//     moduloTesseramento: null,
//     ricevutaPagamento: null,
//     fotoPersonale: null
//   });

//   // Stato per gli errori dei file
//   const [fileErrors, setFileErrors] = useState({
//     cartaIdentitaFronte: false,  // Modificato
//     cartaIdentitaRetro: false, 
//     visitaMedica: false,
//     moduloTesseramento: false,
//     ricevutaPagamento: false,
//     fotoPersonale: false
//   });

//   // Stato per il form
//   const [formData, setFormData] = useState({
//     email: '',
//     nome: '',
//     cognome: '',
//     cellulare: '',
//     indirizzo: '',
//     comune: '',
//     cap: '',
//     dataNascita: null,
//     altezza: 170,
//     peso: 70,
//     posizioneBarca: [],
//     tagliaShirt: '',
//     tagliaCostume: '',
//     squadra: '',
//     tipoIscrizione: '',
//     dataScadenzaVisita: null,
//     accettoPrivacy: false
//   });

//   // Stato per gli errori nel form
//   const [formErrors, setFormErrors] = useState({
//     email: '',
//     nome: '',
//     cognome: '',
//     cellulare: '',
//     indirizzo: '',
//     comune: '',
//     cap: '',
//     dataNascita: '',
//     posizioneBarca: '',
//     tagliaShirt: '',
//     tagliaCostume: '',
//     squadra: '',
//     tipoIscrizione: '',
//     dataScadenzaVisita: '',
//     accettoPrivacy: ''
//   });

//   // Funzione per verificare l'email
//   const checkEmail = useCallback(
//     debounce(async (email) => {
//       if (!email || !email.includes('@')) return;
      
//       setChecking(true);
//       try {
//         const { data } = await supabase
//           .from('iscrizioni')
//           .select('email')
//           .eq('email', email.toLowerCase())
//           .limit(1);
        
//         setEmailExists(data && data.length > 0);
//         if (data && data.length > 0) {
//           setFormErrors(prev => ({...prev, email: 'Email già registrata nel sistema'}));
//         }
//       } catch (error) {
//         console.error('Errore verifica email:', error);
//       } finally {
//         setChecking(false);
//       }
//     }, 500),
//     []
//   );

//   // Verifica l'email quando cambia
//   useEffect(() => {
//     if (formData.email) {
//       checkEmail(formData.email);
//     }
//   }, [formData.email, checkEmail]);

//   // Gestione dei campi del form
//   const handleChange = (e) => {
//     const { name, value, checked, type } = e.target;
//     let newValue;
  
//     if (type === 'checkbox') {
//         newValue = checked;
//       } else if (name === 'posizioneBarca') {
//         // Gestisci esplicitamente il campo posizioneBarca come array
//         newValue = Array.isArray(value) ? value : [value];
//         console.log('Posizioni selezionate:', newValue); // Debug
//       } else {
//         newValue = value;
//       }

//     setFormData(prev => ({
//       ...prev,
//       [name]: newValue
//     }));
    
//     // Reset dell'errore per il campo modificato
//     setFormErrors(prev => ({
//       ...prev,
//       [name]: ''
//     }));
//   };

//   // Gestione speciale per campi speciali come MultiSelect e DatePicker
//   const handleSpecialChange = (name, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     setFormErrors(prev => ({
//       ...prev,
//       [name]: ''
//     }));
//   };

//   // Gestione dei file
//   const handleFileChange = (e, fieldName) => {
//     const file = e.target.files[0];
    
//     if (file) {
//       if (file.size > 10 * 1024 * 1024) {
//         // Se il file è maggiore di 10MB
//         setFileErrors(prev => ({
//           ...prev,
//           [fieldName]: 'Il file non deve superare i 10MB'
//         }));
//         return;
//       }
      
//       setFiles(prev => ({
//         ...prev,
//         [fieldName]: file
//       }));
      
//       setFileErrors(prev => ({
//         ...prev,
//         [fieldName]: false
//       }));
//     }
//   };

//   // Gestione dell'upload dei file personalizzato
//   const triggerFileInput = (fieldName) => {
//     const fileInput = document.getElementById(`file-${fieldName}`);
//     if (fileInput) {
//       fileInput.click();
//     }
//   };

//   // Compressione immagini
//   const compressImage = async (file) => {
//     if (!file || !file.type.startsWith('image/')) {
//       return file;
//     }
    
//     try {
//       const options = {
//         maxSizeMB: 0.5, // Massimo 0.5MB
//         maxWidthOrHeight: 1600,
//         useWebWorker: true,
//         initialQuality: 0.7,
//       };
      
//       // Per foto personale, usa qualità migliore
//       if (file.name.includes('fotoPersonale')) {
//         options.maxSizeMB = 0.5;
//         options.initialQuality = 0.85;
//         options.maxWidthOrHeight = 800; // Risoluzione sufficiente per un volto

//       }
      
//       const compressedFile = await imageCompression(file, options);
//       console.log(`Compressione: ${file.size/1024}KB -> ${compressedFile.size/1024}KB`);
      
//       return compressedFile;
//     } catch (error) {
//       console.error('Errore compressione:', error);
//       return file;
//     }
//   };

//   // Validazione del form
//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {
//       email: '',
//       nome: '',
//       cognome: '',
//       cellulare: '',
//       indirizzo: '',
//       comune: '',
//       cap: '',
//       dataNascita: '',
//       posizioneBarca: '',
//       tagliaShirt: '',
//       tagliaCostume: '',
//       squadra: '',
//       tipoIscrizione: '',
//       dataScadenzaVisita: '',
//       accettoPrivacy: ''
//     };
    
//     // Validazione campi di testo
//     if (!formData.email) {
//       newErrors.email = 'Email obbligatoria';
//       valid = false;
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = 'Email non valida';
//       valid = false;
//     } else if (emailExists) {
//       newErrors.email = 'Email già registrata nel sistema';
//       valid = false;
//     }
    
//     if (!formData.nome) {
//       newErrors.nome = 'Nome obbligatorio';
//       valid = false;
//     }
    
//     if (!formData.cognome) {
//       newErrors.cognome = 'Cognome obbligatorio';
//       valid = false;
//     }
    
//     if (!formData.cellulare) {
//       newErrors.cellulare = 'Cellulare obbligatorio';
//       valid = false;
//     }
    
//     if (!formData.indirizzo) {
//       newErrors.indirizzo = 'Indirizzo obbligatorio';
//       valid = false;
//     }
    
//     if (!formData.comune) {
//       newErrors.comune = 'Comune obbligatorio';
//       valid = false;
//     }
    
//     if (!formData.cap) {
//       newErrors.cap = 'CAP obbligatorio';
//       valid = false;
//     }
    
//     if (!formData.dataNascita) {
//       newErrors.dataNascita = 'Data di nascita obbligatoria';
//       valid = false;
//     }
    
//     // Validazione dati sportivi
//     if (formData.posizioneBarca.length === 0) {
//       newErrors.posizioneBarca = 'Seleziona almeno una posizione';
//       valid = false;
//     }
    
//     if (!formData.tagliaShirt) {
//       newErrors.tagliaShirt = 'Seleziona la taglia della T-Shirt';
//       valid = false;
//     }
    
//     if (!formData.tagliaCostume) {
//       newErrors.tagliaCostume = 'Seleziona la taglia del costume';
//       valid = false;
//     }
    
//     if (!formData.squadra) {
//       newErrors.squadra = 'Seleziona la squadra';
//       valid = false;
//     }
    
//     if (!formData.tipoIscrizione) {
//       newErrors.tipoIscrizione = 'Seleziona il tipo di iscrizione';
//       valid = false;
//     }
    
//     // Validazione documenti
//     const newFileErrors = {...fileErrors};
    
//     if (!files.cartaIdentitaFronte) {
//         newFileErrors.cartaIdentitaFronte = 'Carica il fronte della carta d\'identità';
//         valid = false;
//       }
      
//       if (!files.cartaIdentitaRetro) {
//         newFileErrors.cartaIdentitaRetro = 'Carica il retro della carta d\'identità';
//         valid = false;
//       }
    
//     if (!files.visitaMedica) {
//       newFileErrors.visitaMedica = 'Carica la visita medica';
//       valid = false;
//     }
    
//     if (!formData.dataScadenzaVisita) {
//       newErrors.dataScadenzaVisita = 'Inserisci la data di scadenza della visita medica';
//       valid = false;
//     }
    
//     if (!files.moduloTesseramento) {
//       newFileErrors.moduloTesseramento = 'Carica il modulo di tesseramento';
//       valid = false;
//     }
    
//     if (!files.ricevutaPagamento) {
//       newFileErrors.ricevutaPagamento = 'Carica la ricevuta di pagamento';
//       valid = false;
//     }
    
//     if (!files.fotoPersonale) {
//       newFileErrors.fotoPersonale = 'Carica la foto personale';
//       valid = false;
//     }
    
//     if (!formData.accettoPrivacy) {
//       newErrors.accettoPrivacy = 'Devi accettare la privacy policy';
//       valid = false;
//     }
    
//     setFormErrors(newErrors);
//     setFileErrors(newFileErrors);
    
//     return valid;
//   };

//   // Invio del form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validazione
//     if (!validateForm()) {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//       return;
//     }
    
//     setLoading(true);
//     setProgress(0);
//     setError('');
    
//    // Modifica nella funzione handleSubmit
// try {
//     // Upload dei file
//     const urls = {};
//     const totalFiles = Object.keys(files).length;
//     let completedFiles = 0;
    
//     // Crea un nome cartella basato su nome e cognome
//     const folderName = `${formData.nome.trim()}_${formData.cognome.trim()}`
//       .toLowerCase()                // Converti in minuscolo
//       .replace(/\s+/g, '_')         // Sostituisci spazi con underscore
//       .replace(/[^a-z0-9_]/g, '');  // Rimuovi caratteri speciali
    
//     for (const [key, file] of Object.entries(files)) {
//       // Comprimi il file se è un'immagine
//       const fileToUpload = await compressImage(file);
      
//       // Costruisci percorso del file
//       const timestamp = Date.now();
//       const fileName = `${timestamp}_${key}`;
//       const fileExtension = fileToUpload.name.split('.').pop();
//       const filePath = `${folderName}/${fileName}.${fileExtension}`;
      
//       console.log(`Tentativo di upload a: ${filePath}`);
      
//       // Upload a Supabase
//       const { data, error } = await supabase.storage
//         .from('documents') // Assicurati che il bucket sia corretto
//         .upload(filePath, fileToUpload, {
//           cacheControl: '3600',
//           upsert: false
//         });
        
//       if (error) {
//         console.error(`Errore upload ${key}:`, error);
//         throw error;
//       }
      
//       console.log(`File ${key} caricato con successo:`, data);
      
//       // Ottieni URL pubblico
//       const { data: publicUrlData } = supabase.storage
//         .from('documents')
//         .getPublicUrl(filePath);
      
//       urls[`${key}Url`] = publicUrlData.publicUrl;
      
//       // Aggiorna progresso
//       completedFiles++;
//       setProgress(Math.round((completedFiles / totalFiles) * 100));
//     }
    
//     // Resto del codice per salvare nel database...
      
//       // Salva dati nel database
//       const { error: dbError } = await supabase
//         .from('iscrizioni')
//         .insert([{
//           ...formData,
//           email: formData.email.toLowerCase(),
//           dataNascita: formData.dataNascita ? dayjs(formData.dataNascita).format('YYYY-MM-DD') : null,
//           dataScadenzaVisita: formData.dataScadenzaVisita ? dayjs(formData.dataScadenzaVisita).format('YYYY-MM-DD') : null,
//           dataIscrizione: new Date().toISOString(),
//           ...urls
//         }]);
        
//       if (dbError) throw dbError;
      
//       // Mostra successo
//       setSuccess(true);
      
//       // Reset form
//       setFormData({
//         email: '',
//         nome: '',
//         cognome: '',
//         cellulare: '',
//         indirizzo: '',
//         comune: '',
//         cap: '',
//         dataNascita: null,
//         altezza: 170,
//         peso: 70,
//         posizioneBarca: [],
//         tagliaShirt: '',
//         tagliaCostume: '',
//         squadra: '',
//         tipoIscrizione: '',
//         dataScadenzaVisita: null,
//         accettoPrivacy: false
//       });
      
//       setFiles({
//         cartaIdentita: null,
//         visitaMedica: null,
//         moduloTesseramento: null,
//         ricevutaPagamento: null,
//         fotoPersonale: null
//       });
      
//     } catch (error) {
//       console.error('Errore invio form:', error);
//       setError(error.message || 'Si è verificato un errore durante l\'invio');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Content container style
//   const contentContainerStyle = {
//     maxWidth: '500px',
//     margin: '0 auto',
//     width: '100%'
//   };

//   // Pagina di conferma dopo l'invio
//   if (success) {
//     return (
//       <Container maxWidth="md" className="form-container">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Paper elevation={3} className="success-paper" sx={{ maxWidth: '500px', margin: '0 auto' }}>
//             <Box className="success-content">
//               <Box className="success-icon">
//                 <CheckCircleOutline color="success" fontSize="large" />
//               </Box>
              
//               <Typography variant="h4" className="success-title">
//                 Iscrizione Completata!
//               </Typography>
              
//               <Typography variant="body1" className="success-message">
//                 Grazie per la tua iscrizione a Dragon Piné.<br />
//               </Typography>
              
//               <Button
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 onClick={() => window.location.href = '#/'}
//                 className="success-button"
//               >
//                 Torna alla Home
//               </Button>
//             </Box>
//           </Paper>
//         </motion.div>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="md" className="form-container">
//       <Paper elevation={3} className="form-paper" sx={{ maxWidth: '500px', margin: '0 auto' }}>
//         <Typography variant="h4" component="h1" className="form-title">
//           Iscrizione Asd Dragon Piné
//         </Typography>
        
//         <Box sx={{ mb: 4 }}>
//         <Typography variant="body1" sx={{ mb: 2 }}>
//           Benvenuto nel modulo d'iscrizione per l'anno 2025.
//         </Typography>
//         <Typography variant="body1" sx={{ mb: 1 }}>
//           Per compilare il modulo saranno obbligatori:
//         </Typography>
//         <ul style={{ paddingLeft: '20px', marginBottom: '16px', textAlign: 'left' }}>
//           <li>carta d'identità</li>
//           <li>foto personale (stile fototessera)</li>
//           <li>visita medica</li>
//           <li>modulo richiesta tesseramento compilato e firmato</li>
//           <li>ricevuta del pagamento</li>
//         </ul>
//         <Typography variant="body1" sx={{ mb: 1 }}>
//         Prima di continuare, scarica entrambi i file, compila e firma il modulo richiesta tesseramento:
//         </Typography>
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
//           <Button 
//             variant="text" 
//             color="primary" 
//             href="https://drive.google.com/file/d/1C6X5x6OA40f1Hfrq-p2eQdJOxttQxmce/view" 
//             target="_blank"
//             startIcon={<Description size={16} />}
//             sx={{ justifyContent: 'flex-start' }}
//           >
//             Indicazioni di tesseramento
//           </Button>
          
//           <Button 
//             variant="text" 
//             color="primary" 
//             href="https://drive.google.com/file/d/1ptKNw1BxfI-y1NlprD2wVfxrVdJD8_2j/view" 
//             target="_blank"
//             startIcon={<Description size={16} />}
//             sx={{ justifyContent: 'flex-start' }}
//           >
//             Modulo tesseramento
//           </Button>
//         </Box>
//       </Box>
      
//       <Divider sx={{ my: 3 }} />

//         {error && (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {error}
//           </Alert>
//         )}
        
//         {loading && (
//           <Box sx={{ mb: 3 }}>
//             <LinearProgress variant="determinate" value={progress} />
//             <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
//               Caricamento documenti: {progress}%
//             </Typography>
//           </Box>
//         )}
        
//         <form onSubmit={handleSubmit}>
//           {/* Dati Personali */}
//           <Box className="form-section">
//             <Typography variant="h5" component="h2" className="section-title">
//               Dati Personali
//             </Typography>
            
//             <Stack spacing={2} sx={{ maxWidth: '500px', margin: '0 auto' }}>
//               <TextField
//                 label="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 type="email"
//                 error={!!formErrors.email || emailExists}
//                 helperText={formErrors.email || (emailExists ? "Email già registrata" : "")}
//                 InputProps={{
//                   startAdornment: <Email color="action" sx={{ mr: 1 }} />,
//                   endAdornment: checking ? <CircularProgress size={20} /> : null
//                 }}
//               />
              
//               <TextField
//                 label="Nome"
//                 name="nome"
//                 value={formData.nome}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 error={!!formErrors.nome}
//                 helperText={formErrors.nome}
//                 InputProps={{
//                   startAdornment: <Person color="action" sx={{ mr: 1 }} />
//                 }}
//               />
              
//               <TextField
//                 label="Cognome"
//                 name="cognome"
//                 value={formData.cognome}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 error={!!formErrors.cognome}
//                 helperText={formErrors.cognome}
//                 InputProps={{
//                   startAdornment: <Person color="action" sx={{ mr: 1 }} />
//                 }}
//               />
              
//               <TextField
//                 label="Cellulare"
//                 name="cellulare"
//                 value={formData.cellulare}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 error={!!formErrors.cellulare}
//                 helperText={formErrors.cellulare}
//                 InputProps={{
//                   startAdornment: <Phone color="action" sx={{ mr: 1 }} />
//                 }}
//               />
              
//               <TextField
//                 label="Indirizzo di residenza"
//                 name="indirizzo"
//                 value={formData.indirizzo}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 error={!!formErrors.indirizzo}
//                 helperText={formErrors.indirizzo}
//                 InputProps={{
//                   startAdornment: <Home color="action" sx={{ mr: 1 }} />
//                 }}
//               />
              
//               <TextField
//                 label="Comune"
//                 name="comune"
//                 value={formData.comune}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 error={!!formErrors.comune}
//                 helperText={formErrors.comune}
//               />
              
//               <TextField
//                 label="CAP"
//                 name="cap"
//                 value={formData.cap}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 error={!!formErrors.cap}
//                 helperText={formErrors.cap}
//               />
              
//               <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
//                 <DatePicker
//                   label="Data di nascita"
//                   value={formData.dataNascita}
//                   onChange={(date) => handleSpecialChange('dataNascita', date)}
//                   slotProps={{
//                     textField: {
//                       fullWidth: true,
//                       required: true,
//                       error: !!formErrors.dataNascita,
//                       helperText: formErrors.dataNascita,
//                       InputProps: {
//                         startAdornment: <CalendarMonth color="action" sx={{ mr: 1 }} />
//                       }
//                     }
//                   }}
//                   maxDate={dayjs().subtract(10, 'year')}
//                 />
//               </LocalizationProvider>
//             </Stack>
//           </Box>
          
//           <Divider sx={{ my: 4 }} />
          
//           {/* Dati Sportivi */}
//           <Box className="form-section">
//             <Typography variant="h5" component="h2" className="section-title">
//               Dati Sportivi
//             </Typography>
            
//             <Stack spacing={2} sx={{ maxWidth: '500px', margin: '0 auto' }}>
//               <TextField
//                 label="Altezza (cm)"
//                 name="altezza"
//                 value={formData.altezza}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 type="number"
//                 inputProps={{ min: 100, max: 220 }}
//                 InputProps={{
//                   startAdornment: <StraightenOutlined color="action" sx={{ mr: 1 }} />
//                 }}
//               />
              
//               <TextField
//                 label="Peso (kg)"
//                 name="peso"
//                 value={formData.peso}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 type="number"
//                 inputProps={{ min: 30, max: 150 }}
//                 InputProps={{
//                   startAdornment: <MonitorWeight color="action" sx={{ mr: 1 }} />
//                 }}
//               />
              
//               <FormControl fullWidth required error={!!formErrors.posizioneBarca}>
//   <InputLabel id="posizioneBarca-label">Posizione in barca</InputLabel>
//   <Select
//     labelId="posizioneBarca-label"
//     id="posizioneBarca"
//     name="posizioneBarca"
//     multiple
//     value={formData.posizioneBarca}
//     onChange={handleChange}
//     startAdornment={<Rowing color="action" sx={{ mr: 1 }} />}
//     renderValue={(selected) => (
//       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//         {selected.map((value) => {
//           let label = value;
//           if (value === 'destro') label = 'Destro/a';
//           if (value === 'sinistro') label = 'Sinistro/a';
//           if (value === 'tamburina') label = 'Tamburina';
//           if (value === 'timoniere') label = 'Timoniere';
          
//           return <Chip key={value} label={label} size="small" />;
//         })}
//       </Box>
//     )}
//   >
//     <MenuItem value="destro">Destro/a</MenuItem>
//     <MenuItem value="sinistro">Sinistro/a</MenuItem>
//     <MenuItem value="tamburina">Tamburina</MenuItem>
//     <MenuItem value="timoniere">Timoniere</MenuItem>
//   </Select>
//   <FormHelperText>{formErrors.posizioneBarca}</FormHelperText>
// </FormControl>
              
//               <FormControl fullWidth required error={!!formErrors.tagliaShirt}>
//                 <InputLabel id="tagliaShirt-label">Taglia T-Shirt</InputLabel>
//                 <Select
//                   labelId="tagliaShirt-label"
//                   id="tagliaShirt"
//                   name="tagliaShirt"
//                   value={formData.tagliaShirt}
//                   onChange={handleChange}
//                   startAdornment={<CheckroomOutlined color="action" sx={{ mr: 1 }} />}
//                 >
//                   <MenuItem value="xs">XS</MenuItem>
//                   <MenuItem value="s">S</MenuItem>
//                   <MenuItem value="m">M</MenuItem>
//                   <MenuItem value="l">L</MenuItem>
//                   <MenuItem value="xl">XL</MenuItem>
//                   <MenuItem value="xxl">XXL</MenuItem>
//                 </Select>
//                 <FormHelperText>{formErrors.tagliaShirt}</FormHelperText>
//               </FormControl>
              
//               <FormControl fullWidth required error={!!formErrors.tagliaCostume}>
//                 <InputLabel id="tagliaCostume-label">Taglia Costume</InputLabel>
//                 <Select
//                   labelId="tagliaCostume-label"
//                   id="tagliaCostume"
//                   name="tagliaCostume"
//                   value={formData.tagliaCostume}
//                   onChange={handleChange}
//                   startAdornment={<CheckroomOutlined color="action" sx={{ mr: 1 }} />}
//                 >
//                   <MenuItem value="xs">XS</MenuItem>
//                   <MenuItem value="s">S</MenuItem>
//                   <MenuItem value="m">M</MenuItem>
//                   <MenuItem value="l">L</MenuItem>
//                   <MenuItem value="xl">XL</MenuItem>
//                   <MenuItem value="xxl">XXL</MenuItem>
//                 </Select>
//                 <FormHelperText>{formErrors.tagliaCostume}</FormHelperText>
//               </FormControl>
              
//               <FormControl fullWidth required error={!!formErrors.squadra}>
//                 <InputLabel id="squadra-label">Squadra iscrizione</InputLabel>
//                 <Select
//                   labelId="squadra-label"
//                   id="squadra"
//                   name="squadra"
//                   value={formData.squadra}
//                   onChange={handleChange}
//                   startAdornment={<Pool color="action" sx={{ mr: 1 }} />}
//                 >
//                   <MenuItem value="dragon_pine">Dragon Piné</MenuItem>
//                   <MenuItem value="pine_sharks">Piné Sharks</MenuItem>
//                   <MenuItem value="dragon_flames">Dragon Flames</MenuItem>
//                   <MenuItem value="dragon_junior">Dragon Junior</MenuItem>
//                 </Select>
//                 <FormHelperText>{formErrors.squadra}</FormHelperText>
//               </FormControl>
              
//               <FormControl fullWidth required error={!!formErrors.tipoIscrizione}>
//                 <InputLabel id="tipoIscrizione-label">Tipo iscrizione</InputLabel>
//                 <Select
//                   labelId="tipoIscrizione-label"
//                   id="tipoIscrizione"
//                   name="tipoIscrizione"
//                   value={formData.tipoIscrizione}
//                   onChange={handleChange}
//                   startAdornment={<Badge color="action" sx={{ mr: 1 }} />}
//                 >
//                   <MenuItem value="atleta">Atleta</MenuItem>
//                   <MenuItem value="socio">Socio</MenuItem>
//                   <MenuItem value="atleta_socio">Atleta e Socio</MenuItem>
//                 </Select>
//                 <FormHelperText>{formErrors.tipoIscrizione}</FormHelperText>
//               </FormControl>
//             </Stack>
//           </Box>
          
//           <Divider sx={{ my: 4 }} />
          
//         {/* Documenti */}
// <Box className="form-section">
//   <Typography variant="h5" component="h2" className="section-title">
//     Documenti
//   </Typography>
  
//   <Alert severity="info" sx={{ mb: 3, maxWidth: '500px', margin: '0 auto' }}>
//     Carica tutti i documenti richiesti in formato JPG, PNG o PDF. Dimensione massima 10MB per file.
//   </Alert>
  
//   <Stack spacing={3} sx={{ maxWidth: '500px', margin: '0 auto' }}>
//     {/* Carta d'identità FRONTE */}
//     <Box>
//       <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
//         Carta d'identità - FRONTE
//       </Typography>
//       <input
//         id="file-cartaIdentitaFronte"
//         type="file"
//         accept="image/png,image/jpeg,image/jpg,application/pdf"
//         style={{ display: 'none' }}
//         onChange={(e) => handleFileChange(e, 'cartaIdentitaFronte')}
//       />
//       <Button
//         variant="outlined"
//         component="label"
//         fullWidth
//         color={fileErrors.cartaIdentitaFronte ? "error" : files.cartaIdentitaFronte ? "success" : "primary"}
//         onClick={() => triggerFileInput('cartaIdentitaFronte')}
//         startIcon={<UploadFile />}
//         sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
//       >
//         {files.cartaIdentitaFronte ? `Caricato: ${files.cartaIdentitaFronte.name}` : 'Carica fronte carta d\'identità'}
//       </Button>
//       {fileErrors.cartaIdentitaFronte && (
//         <FormHelperText error>{fileErrors.cartaIdentitaFronte}</FormHelperText>
//       )}
//     </Box>
    
//     {/* Carta d'identità RETRO */}
//     <Box>
//       <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
//         Carta d'identità - RETRO
//       </Typography>
//       <input
//         id="file-cartaIdentitaRetro"
//         type="file"
//         accept="image/png,image/jpeg,image/jpg,application/pdf"
//         style={{ display: 'none' }}
//         onChange={(e) => handleFileChange(e, 'cartaIdentitaRetro')}
//       />
//       <Button
//         variant="outlined"
//         component="label"
//         fullWidth
//         color={fileErrors.cartaIdentitaRetro ? "error" : files.cartaIdentitaRetro ? "success" : "primary"}
//         onClick={() => triggerFileInput('cartaIdentitaRetro')}
//         startIcon={<UploadFile />}
//         sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
//       >
//         {files.cartaIdentitaRetro ? `Caricato: ${files.cartaIdentitaRetro.name}` : 'Carica retro carta d\'identità'}
//       </Button>
//       {fileErrors.cartaIdentitaRetro && (
//         <FormHelperText error>{fileErrors.cartaIdentitaRetro}</FormHelperText>
//       )}
//     </Box>
    
//     <Box>
//       <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
//         Visita medica
//       </Typography>
//       <input
//         id="file-visitaMedica"
//         type="file"
//         accept="image/png,image/jpeg,image/jpg,application/pdf"
//         style={{ display: 'none' }}
//         onChange={(e) => handleFileChange(e, 'visitaMedica')}
//       />
//       <Button
//         variant="outlined"
//         component="label"
//         fullWidth
//         color={fileErrors.visitaMedica ? "error" : files.visitaMedica ? "success" : "primary"}
//         onClick={() => triggerFileInput('visitaMedica')}
//         startIcon={<UploadFile />}
//         sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
//       >
//         {files.visitaMedica ? `Caricato: ${files.visitaMedica.name}` : 'Carica visita medica'}
//       </Button>
//       {fileErrors.visitaMedica && (
//         <FormHelperText error>{fileErrors.visitaMedica}</FormHelperText>
//       )}
//     </Box>
    
//     <Box>
    
//       <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
//         <DatePicker
//           label="Data scadenza visita medica"
//           value={formData.dataScadenzaVisita}
//           onChange={(date) => handleSpecialChange('dataScadenzaVisita', date)}
//           slotProps={{
//             textField: {
//               fullWidth: true,
//               required: true,
//               error: !!formErrors.dataScadenzaVisita,
//               helperText: formErrors.dataScadenzaVisita || "Inserisci la data di scadenza riportata sul documento",
//               InputProps: {
//                 startAdornment: <CalendarMonth color="action" sx={{ mr: 1 }} />
//               }
//             }
//           }}
//           minDate={dayjs()}
//         />
//       </LocalizationProvider>
//     </Box>
    
//     <Box>
//       <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
//         Modulo richiesta tesseramento (compilato e firmato)
//       </Typography>
//       <input
//         id="file-moduloTesseramento"
//         type="file"
//         accept="image/png,image/jpeg,image/jpg,application/pdf"
//         style={{ display: 'none' }}
//         onChange={(e) => handleFileChange(e, 'moduloTesseramento')}
//       />
//       <Button
//         variant="outlined"
//         component="label"
//         fullWidth
//         color={fileErrors.moduloTesseramento ? "error" : files.moduloTesseramento ? "success" : "primary"}
//         onClick={() => triggerFileInput('moduloTesseramento')}
//         startIcon={<UploadFile />}
//         sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
//       >
//         {files.moduloTesseramento ? `Caricato: ${files.moduloTesseramento.name}` : 'Carica modulo tesseramento'}
//       </Button>
//       {fileErrors.moduloTesseramento && (
//         <FormHelperText error>{fileErrors.moduloTesseramento}</FormHelperText>
//       )}
//     </Box>
    
//     <Box>
//       <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
//         Ricevuta pagamento
//       </Typography>
//       <input
//         id="file-ricevutaPagamento"
//         type="file"
//         accept="image/png,image/jpeg,image/jpg,application/pdf"
//         style={{ display: 'none' }}
//         onChange={(e) => handleFileChange(e, 'ricevutaPagamento')}
//       />
//       <Button
//         variant="outlined"
//         component="label"
//         fullWidth
//         color={fileErrors.ricevutaPagamento ? "error" : files.ricevutaPagamento ? "success" : "primary"}
//         onClick={() => triggerFileInput('ricevutaPagamento')}
//         startIcon={<ReceiptLong />}
//         sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
//       >
//         {files.ricevutaPagamento ? `Caricato: ${files.ricevutaPagamento.name}` : 'Carica ricevuta pagamento'}
//       </Button>
//       {fileErrors.ricevutaPagamento && (
//         <FormHelperText error>{fileErrors.ricevutaPagamento}</FormHelperText>
//       )}
//     </Box>
    
//     <Box>
//       <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
//         Foto personale (stile fototessera)
//       </Typography>
//       <input
//         id="file-fotoPersonale"
//         type="file"
//         accept="image/png,image/jpeg,image/jpg"
//         style={{ display: 'none' }}
//         onChange={(e) => handleFileChange(e, 'fotoPersonale')}
//       />
//       <Button
//         variant="outlined"
//         component="label"
//         fullWidth
//         color={fileErrors.fotoPersonale ? "error" : files.fotoPersonale ? "success" : "primary"}
//         onClick={() => triggerFileInput('fotoPersonale')}
//         startIcon={<CameraAlt />}
//         sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
//       >
//         {files.fotoPersonale ? `Caricato: ${files.fotoPersonale.name}` : 'Carica foto personale'}
//       </Button>
//       {fileErrors.fotoPersonale && (
//         <FormHelperText error>{fileErrors.fotoPersonale}</FormHelperText>
//       )}
//     </Box>
    
//     <FormGroup>
//       <FormControlLabel
//         control={
//           <Checkbox
//             name="accettoPrivacy"
//             checked={formData.accettoPrivacy}
//             onChange={handleChange}
//             color="primary"
//           />
//         }
//         label="Accetto la privacy policy e il trattamento dei dati personali"
//       />
//       {formErrors.accettoPrivacy && (
//         <FormHelperText error>{formErrors.accettoPrivacy}</FormHelperText>
//       )}
//     </FormGroup>
//   </Stack>
// </Box>
          
//           <Divider sx={{ my: 4 }} />
          
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               size="large"
//               startIcon={<Send />}
//               disabled={loading}
//               className="submit-button"
//               sx={{ maxWidth: '500px', width: '100%' }}
//             >
//               {loading ? 'Invio in corso...' : 'Invia Iscrizione'}
//             </Button>
//           </Box>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default FormIscrizioneSemplice;

// import React, { useState, useEffect, useCallback } from "react";
// import { debounce } from 'lodash';
// import { createClient } from '@supabase/supabase-js';
// import imageCompression from 'browser-image-compression';
// import dayjs from 'dayjs';
// import 'dayjs/locale/it';
// import { motion } from "framer-motion";
// import heic2any from 'heic2any';
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormControlLabel,
//   Checkbox,
//   Alert,
//   Box,
//   LinearProgress,
//   Divider,
//   CircularProgress,
//   FormHelperText,
//   Stack,
//   FormGroup,
//   Chip
// } from '@mui/material';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import {
//   Email,
//   Person,
//   Phone,
//   Home,
//   CalendarMonth,
//   StraightenOutlined,
//   MonitorWeight,
//   Rowing,
//   CheckroomOutlined,
//   Pool,
//   Badge,
//   UploadFile,
//   ReceiptLong,
//   CameraAlt,
//   Send,
//   Description,
//   CheckCircle as CheckCircleOutline,
//   ErrorOutline
// } from '@mui/icons-material';

// import './FormIscrizione.css';

// // Configurazione Supabase
// const supabaseUrl = 'https://guoicoktnwrvzsynrfdf.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1b2ljb2t0bndydnpzeW5yZmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDIzODIsImV4cCI6MjA1OTg3ODM4Mn0.RmaA7PBCuJssRDl1ee0_VT7A1h5YkZMFzf0MqtlB4K4';
// const supabase = createClient(supabaseUrl, supabaseKey);

// // Tipi di file accettati
// const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
// const ACCEPTED_DOCUMENT_TYPES = [...ACCEPTED_IMAGE_TYPES, 'application/pdf'];
// const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// const FormIscrizioneSemplice = () => {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');
//   const [progress, setProgress] = useState(0);
//   const [emailExists, setEmailExists] = useState(false);
//   const [checking, setChecking] = useState(false);

//   // Stato per i file
//   const [files, setFiles] = useState({
//     cartaIdentitaFronte: null,
//     cartaIdentitaRetro: null,
//     visitaMedica: null,
//     moduloTesseramento: null,
//     ricevutaPagamento: null,
//     fotoPersonale: null
//   });

//   // Stato per gli errori dei file
//   const [fileErrors, setFileErrors] = useState({
//     cartaIdentitaFronte: false,
//     cartaIdentitaRetro: false,
//     visitaMedica: false,
//     moduloTesseramento: false,
//     ricevutaPagamento: false,
//     fotoPersonale: false
//   });

//   // Stato per il form
//   const [formData, setFormData] = useState({
//     email: '',
//     nome: '',
//     cognome: '',
//     cellulare: '',
//     indirizzo: '',
//     comune: '',
//     cap: '',
//     dataNascita: null,
//     altezza: 170,
//     peso: 70,
//     posizioneBarca: [],
//     tagliaShirt: '',
//     tagliaCostume: '',
//     squadra: '',
//     tipoIscrizione: '',
//     dataScadenzaVisita: null,
//     accettoPrivacy: false
//   });

//   // Stato per gli errori nel form
//   const [formErrors, setFormErrors] = useState({
//     email: '',
//     nome: '',
//     cognome: '',
//     cellulare: '',
//     indirizzo: '',
//     comune: '',
//     cap: '',
//     dataNascita: '',
//     posizioneBarca: '',
//     tagliaShirt: '',
//     tagliaCostume: '',
//     squadra: '',
//     tipoIscrizione: '',
//     dataScadenzaVisita: '',
//     accettoPrivacy: ''
//   });

//   // Funzione per verificare l'email
//   const checkEmail = useCallback(
//     debounce(async (email) => {
//       if (!email || !email.includes('@')) return;
      
//       setChecking(true);
//       try {
//         const { data } = await supabase
//           .from('iscrizioni')
//           .select('email')
//           .eq('email', email.toLowerCase())
//           .limit(1);
        
//         setEmailExists(data && data.length > 0);
//         if (data && data.length > 0) {
//           setFormErrors(prev => ({...prev, email: 'Email già registrata nel sistema'}));
//         }
//       } catch (error) {
//         console.error('Errore verifica email:', error);
//       } finally {
//         setChecking(false);
//       }
//     }, 500),
//     []
//   );

//   // Verifica l'email quando cambia
//   useEffect(() => {
//     if (formData.email) {
//       checkEmail(formData.email);
//     }
//   }, [formData.email, checkEmail]);

//   // Gestione dei campi del form
//   const handleChange = (e) => {
//     const { name, value, checked, type } = e.target;
//     let newValue;
  
//     if (type === 'checkbox') {
//       newValue = checked;
//     } else if (name === 'posizioneBarca') {
//       // Gestisci esplicitamente il campo posizioneBarca come array
//       newValue = Array.isArray(value) ? value : [value];
//     } else {
//       newValue = value;
//     }

//     setFormData(prev => ({
//       ...prev,
//       [name]: newValue
//     }));
    
//     // Reset dell'errore per il campo modificato
//     setFormErrors(prev => ({
//       ...prev,
//       [name]: ''
//     }));
//   };

//   // Gestione speciale per campi come MultiSelect e DatePicker
//   const handleSpecialChange = (name, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     setFormErrors(prev => ({
//       ...prev,
//       [name]: ''
//     }));
//   };

//   // Verifica se un file è un'immagine
//   const isImage = (file) => {
//     return ACCEPTED_IMAGE_TYPES.includes(file.type);
//   };

//   // Verifica se un file è un PDF
//   const isPDF = (file) => {
//     return file.type === 'application/pdf';
//   };

//   // Verifica le dimensioni del file
//   const isValidFileSize = (file) => {
//     return file.size <= MAX_FILE_SIZE;
//   };

//   // Gestione dei file
//   const handleFileChange = async (e, fieldName) => {
//     const file = e.target.files?.[0];
    
//     if (!file) return;

//     // Verifica tipo di file
//     if (!ACCEPTED_DOCUMENT_TYPES.includes(file.type) && fieldName !== 'fotoPersonale') {
//       setFileErrors(prev => ({
//         ...prev,
//         [fieldName]: 'Formato non supportato. Usa JPG, PNG o PDF'
//       }));
//       return;
//     }

//     // Per foto personale, accetta solo immagini
//     if (fieldName === 'fotoPersonale' && !isImage(file)) {
//       setFileErrors(prev => ({
//         ...prev,
//         [fieldName]: 'La foto deve essere in formato immagine (JPG, PNG)'
//       }));
//       return;
//     }
    
//     // Verifica dimensione
//     if (!isValidFileSize(file)) {
//       setFileErrors(prev => ({
//         ...prev,
//         [fieldName]: 'Il file non deve superare i 10MB'
//       }));
//       return;
//     }
    
//     setFiles(prev => ({
//       ...prev,
//       [fieldName]: file
//     }));
    
//     setFileErrors(prev => ({
//       ...prev,
//       [fieldName]: false
//     }));
//   };

//   // Trigger per input file nascosto
//   const triggerFileInput = (fieldName) => {
//     const fileInput = document.getElementById(`file-${fieldName}`);
//     if (fileInput) {
//       fileInput.click();
//     }
//   };

//   // Genera nome univoco per la cartella utente
//   const generateUniqueFolderName = () => {
//     const timestamp = Date.now();
//     const usernamePart = `${formData.nome.trim()}_${formData.cognome.trim()}`
//       .toLowerCase()
//       .replace(/\s+/g, '_')
//       .replace(/[^a-z0-9_]/g, '');
    
//     // Aggiungi data nascita se disponibile
//     const datePart = formData.dataNascita 
//       ? `_${formData.dataNascita.format('YYYYMMDD')}`
//       : '';
    
//     return `${usernamePart}${datePart}_${timestamp}`;
//   };

//   // Estrai l'estensione dal file
//   const getFileExtension = (file) => {
//     // Per i file HEIC/HEIF, converte in JPG
//     if (file.type.includes('heic') || file.type.includes('heif')) {
//       return 'jpg';
//     }
    
//     // Per le immagini che non sono PDF, standardizza su JPG
//     if (isImage(file) && !isPDF(file)) {
//       return 'jpg';
//     }
    
//     // Per i PDF, mantiene l'estensione
//     if (isPDF(file)) {
//       return 'pdf';
//     }
    
//     // Fallback sull'estensione originale
//     return file.name.split('.').pop()?.toLowerCase() || 'jpg';
//   };

//   // Compressione immagini
//   const compressAndConvertImage = async (file, fieldName) => {
//     // Se è un PDF, restituisci il file originale
//     if (isPDF(file)) {
//       return file;
//     }
    
//     // Gestione speciale per HEIC/HEIF
//     if (file.type.includes('heic') || file.type.includes('heif')) {
//       try {
//         console.log('Conversione formato HEIC/HEIF a JPEG...');
//         const blob = await heic2any({
//           blob: file,
//           toType: 'image/jpeg',
//           quality: 0.8
//         });
        
//         // Converti il blob in File
//         const newFileName = `${file.name.split('.')[0]}.jpg`;
//         const convertedFile = new File([blob], newFileName, { type: 'image/jpeg' });
//         console.log(`File convertito da ${file.type} a image/jpeg`);
        
//         // Prosegui con la compressione del file convertito
//         return await compressImage(convertedFile, fieldName); 
//       } catch (error) {
//         console.error('Errore conversione HEIC:', error);
//         // In caso di errore, proviamo a procedere normalmente
//         console.log('Tentativo di elaborazione standard...');
//       }
//     }
    
//     // Se non è un'immagine supportata, restituisci il file originale
//     if (!isImage(file)) {
//       return file;
//     }
    
//     return await compressImage(file, fieldName);
//   };
  
//   // Funzione separata per la compressione (estratta dalla funzione originale)
//   const compressImage = async (file, fieldName) => {
//     try {
//       // Opzioni di compressione
//       const options = {
//         maxSizeMB: 0.5, // Massimo 0.5MB
//         maxWidthOrHeight: 1600,
//         useWebWorker: true,
//         initialQuality: 0.7,
//         fileType: 'image/jpeg' // Converti tutto in JPG
//       };
      
//       // Personalizza opzioni per campo specifico
//       if (fieldName === 'fotoPersonale') {
//         options.maxSizeMB = 0.3;
//         options.initialQuality = 0.85;
//         options.maxWidthOrHeight = 800; // Risoluzione sufficiente per un volto
//       }
      
//       const compressedFile = await imageCompression(file, options);
//       console.log(`Compressione ${fieldName}: ${file.size/1024}KB -> ${compressedFile.size/1024}KB`);
      
//       // Crea un nuovo File con estensione .jpg
//       const newFileName = `${file.name.split('.')[0]}.jpg`;
//       return new File([compressedFile], newFileName, { type: 'image/jpeg' });
      
//     } catch (error) {
//       console.error('Errore compressione:', error);
//       return file;
//     }
//   };

//   // Validazione del form
//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {
//       email: '',
//       nome: '',
//       cognome: '',
//       cellulare: '',
//       indirizzo: '',
//       comune: '',
//       cap: '',
//       dataNascita: '',
//       posizioneBarca: '',
//       tagliaShirt: '',
//       tagliaCostume: '',
//       squadra: '',
//       tipoIscrizione: '',
//       dataScadenzaVisita: '',
//       accettoPrivacy: ''
//     };
    
//     // Validazione campi di testo
//     if (!formData.email) {
//       newErrors.email = 'Email obbligatoria';
//       valid = false;
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = 'Email non valida';
//       valid = false;
//     } else if (emailExists) {
//       newErrors.email = 'Email già registrata nel sistema';
//       valid = false;
//     }
    
//     if (!formData.nome) {
//       newErrors.nome = 'Nome obbligatorio';
//       valid = false;
//     }
    
//     if (!formData.cognome) {
//       newErrors.cognome = 'Cognome obbligatorio';
//       valid = false;
//     }
    
//     if (!formData.cellulare) {
//       newErrors.cellulare = 'Cellulare obbligatorio';
//       valid = false;
//     }
    
//     if (!formData.indirizzo) {
//       newErrors.indirizzo = 'Indirizzo obbligatorio';
//       valid = false;
//     }
    
//     if (!formData.comune) {
//       newErrors.comune = 'Comune obbligatorio';
//       valid = false;
//     }
    
//     if (!formData.cap) {
//       newErrors.cap = 'CAP obbligatorio';
//       valid = false;
//     }
    
//     if (!formData.dataNascita) {
//       newErrors.dataNascita = 'Data di nascita obbligatoria';
//       valid = false;
//     }
    
//     // Validazione dati sportivi
//     if (formData.posizioneBarca.length === 0) {
//       newErrors.posizioneBarca = 'Seleziona almeno una posizione';
//       valid = false;
//     }
    
//     if (!formData.tagliaShirt) {
//       newErrors.tagliaShirt = 'Seleziona la taglia della T-Shirt';
//       valid = false;
//     }
    
//     if (!formData.tagliaCostume) {
//       newErrors.tagliaCostume = 'Seleziona la taglia del costume';
//       valid = false;
//     }
    
//     if (!formData.squadra) {
//       newErrors.squadra = 'Seleziona la squadra';
//       valid = false;
//     }
    
//     if (!formData.tipoIscrizione) {
//       newErrors.tipoIscrizione = 'Seleziona il tipo di iscrizione';
//       valid = false;
//     }
    
//     // Validazione documenti
//     const newFileErrors = {
//       cartaIdentitaFronte: false,
//       cartaIdentitaRetro: false,
//       visitaMedica: false,
//       moduloTesseramento: false,
//       ricevutaPagamento: false,
//       fotoPersonale: false
//     };
    
//     if (!files.cartaIdentitaFronte) {
//       newFileErrors.cartaIdentitaFronte = 'Carica il fronte della carta d\'identità';
//       valid = false;
//     }
      
//     if (!files.cartaIdentitaRetro) {
//       newFileErrors.cartaIdentitaRetro = 'Carica il retro della carta d\'identità';
//       valid = false;
//     }
    
//     if (!files.visitaMedica) {
//       newFileErrors.visitaMedica = 'Carica la visita medica';
//       valid = false;
//     }
    
//     if (!formData.dataScadenzaVisita) {
//       newErrors.dataScadenzaVisita = 'Inserisci la data di scadenza della visita medica';
//       valid = false;
//     }
    
//     if (!files.moduloTesseramento) {
//       newFileErrors.moduloTesseramento = 'Carica il modulo di tesseramento';
//       valid = false;
//     }
    
//     if (!files.ricevutaPagamento) {
//       newFileErrors.ricevutaPagamento = 'Carica la ricevuta di pagamento';
//       valid = false;
//     }
    
//     if (!files.fotoPersonale) {
//       newFileErrors.fotoPersonale = 'Carica la foto personale';
//       valid = false;
//     }
    
//     if (!formData.accettoPrivacy) {
//       newErrors.accettoPrivacy = 'Devi accettare la privacy policy';
//       valid = false;
//     }
    
//     setFormErrors(newErrors);
//     setFileErrors(newFileErrors);
    
//     return valid;
//   };

//   // Invio del form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validazione
//     if (!validateForm()) {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//       setError('Correggi gli errori prima di inviare');
//       return;
//     }
    
//     setLoading(true);
//     setProgress(0);
//     setError('');
    
//     try {
//       // Genera nome cartella univoco
//       const folderName = generateUniqueFolderName();
      
//       // URL dei file caricati
//       const urls = {};
//       const totalFiles = Object.keys(files).filter(key => files[key] !== null).length;
//       let completedFiles = 0;
      
//       // Upload di ciascun file
//       for (const [key, file] of Object.entries(files)) {
//         if (!file) continue;
        
//         try {
//           // Comprimi e converti il file se necessario
//           const processedFile = await compressAndConvertImage(file, key);
          
//           // Genera nome file con timestamp e giusta estensione
//           const timestamp = Date.now();
//           const fileExtension = getFileExtension(processedFile);
//           const fileName = `${timestamp}_${key}.${fileExtension}`;
//           const filePath = `${folderName}/${fileName}`;
          
//           console.log(`Uploading: ${filePath} (${processedFile.size/1024} KB)`);
          
//           // Upload a Supabase
//           const { data, error: uploadError } = await supabase.storage
//             .from('documents')
//             .upload(filePath, processedFile, {
//               cacheControl: '3600',
//               upsert: false
//             });
            
//           if (uploadError) {
//             throw uploadError;
//           }
          
//           // Ottieni URL pubblico
//           const { data: publicUrlData } = supabase.storage
//             .from('documents')
//             .getPublicUrl(filePath);
          
//           urls[`${key}Url`] = publicUrlData.publicUrl;
          
//           // Aggiorna progresso
//           completedFiles++;
//           setProgress(Math.round((completedFiles / totalFiles) * 100));
          
//         } catch (error) {
//           console.error(`Errore nel processare il file ${key}:`, error);
//           throw new Error(`Errore nel caricamento del file ${key}: ${error.message}`);
//         }
//       }
      
//       // Converti date per il database
//       const formattedFormData = {
//         ...formData,
//         email: formData.email.toLowerCase(),
//         dataNascita: formData.dataNascita ? formData.dataNascita.format('YYYY-MM-DD') : null,
//         dataScadenzaVisita: formData.dataScadenzaVisita ? formData.dataScadenzaVisita.format('YYYY-MM-DD') : null,
//         dataIscrizione: new Date().toISOString(),
//       };
      
//       // Salva nel database
//       const { error: dbError } = await supabase
//         .from('iscrizioni')
//         .insert([{ ...formattedFormData, ...urls }]);
        
//       if (dbError) throw dbError;
      
//       // Mostra successo
//       setSuccess(true);
      
//       // Reset form
//       setFormData({
//         email: '',
//         nome: '',
//         cognome: '',
//         cellulare: '',
//         indirizzo: '',
//         comune: '',
//         cap: '',
//         dataNascita: null,
//         altezza: 170,
//         peso: 70,
//         posizioneBarca: [],
//         tagliaShirt: '',
//         tagliaCostume: '',
//         squadra: '',
//         tipoIscrizione: '',
//         dataScadenzaVisita: null,
//         accettoPrivacy: false
//       });
      
//       setFiles({
//         cartaIdentitaFronte: null,
//         cartaIdentitaRetro: null,
//         visitaMedica: null,
//         moduloTesseramento: null,
//         ricevutaPagamento: null,
//         fotoPersonale: null
//       });
      
//     } catch (error) {
//       console.error('Errore invio form:', error);
//       setError(error.message || 'Si è verificato un errore durante l\'invio');
//       setProgress(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Content container style
//   const contentContainerStyle = {
//     maxWidth: '500px',
//     margin: '0 auto',
//     width: '100%'
//   };

//   // Pagina di conferma dopo l'invio
//   if (success) {
//     return (
//       <Container maxWidth="md" className="form-container">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Paper elevation={3} className="success-paper" sx={{ maxWidth: '500px', margin: '0 auto' }}>
//             <Box className="success-content">
//               <Box className="success-icon">
//                 <CheckCircleOutline color="success" fontSize="large" />
//               </Box>
              
//               <Typography variant="h4" className="success-title">
//                 Iscrizione Completata!
//               </Typography>
              
//               <Typography variant="body1" className="success-message">
//                 Grazie per la tua iscrizione a Dragon Piné.<br />
//               </Typography>
              
//               <Button
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 onClick={() => window.location.href = '#/'}
//                 className="success-button"
//               >
//                 Torna alla Home
//               </Button>
//             </Box>
//           </Paper>
//         </motion.div>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="md" className="form-container">
//       <Paper elevation={3} className="form-paper" sx={{ maxWidth: '500px', margin: '0 auto' }}>
//         <Typography variant="h4" component="h1" className="form-title">
//           Iscrizione Asd Dragon Piné
//         </Typography>
        
//         <Box sx={{ mb: 4 }}>
//           <Typography variant="body1" sx={{ mb: 2 }}>
//             Benvenuto nel modulo d'iscrizione per l'anno 2025.
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 1 }}>
//             Per compilare il modulo saranno obbligatori:
//           </Typography>
//           <ul style={{ paddingLeft: '20px', marginBottom: '16px', textAlign: 'left' }}>
//             <li>carta d'identità (fronte e retro)</li>
//             <li>foto personale (stile fototessera)</li>
//             <li>visita medica</li>
//             <li>modulo richiesta tesseramento compilato e firmato</li>
//             <li>ricevuta del pagamento</li>
//           </ul>
//           <Typography variant="body1" sx={{ mb: 1 }}>
//             Prima di continuare, scarica entrambi i file, compila e firma il modulo richiesta tesseramento:
//           </Typography>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
//             <Button 
//               variant="text" 
//               color="primary" 
//               href="https://drive.google.com/file/d/1C6X5x6OA40f1Hfrq-p2eQdJOxttQxmce/view" 
//               target="_blank"
//               startIcon={<Description size={16} />}
//               sx={{ justifyContent: 'flex-start' }}
//             >
//               Indicazioni di tesseramento
//             </Button>
            
//             <Button 
//               variant="text" 
//               color="primary" 
//               href="https://drive.google.com/file/d/1ptKNw1BxfI-y1NlprD2wVfxrVdJD8_2j/view" 
//               target="_blank"
//               startIcon={<Description size={16} />}
//               sx={{ justifyContent: 'flex-start' }}
//             >
//               Modulo tesseramento
//             </Button>
//           </Box>
//         </Box>
        
//         <Divider sx={{ my: 3 }} />

//         {error && (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {error}
//           </Alert>
//         )}
        
//         {loading && (
//           <Box sx={{ mb: 3 }}>
//             <LinearProgress variant="determinate" value={progress} />
//             <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
//               Caricamento documenti: {progress}%
//             </Typography>
//           </Box>
//         )}
        
//         <form onSubmit={handleSubmit}>
//           {/* Dati Personali */}
//           <Box className="form-section">
//             <Typography variant="h5" component="h2" className="section-title">
//               Dati Personali
//             </Typography>
            
//             <Stack spacing={2} sx={{ maxWidth: '500px', margin: '0 auto' }}>
//               <TextField
//                 label="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 type="email"
//                 error={!!formErrors.email || emailExists}
//                 helperText={formErrors.email || (emailExists ? "Email già registrata" : "")}
//                 InputProps={{
//                   startAdornment: <Email color="action" sx={{ mr: 1 }} />,
//                   endAdornment: checking ? <CircularProgress size={20} /> : null
//                 }}
//               />
              
//               <TextField
//                 label="Nome"
//                 name="nome"
//                 value={formData.nome}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 error={!!formErrors.nome}
//                 helperText={formErrors.nome}
//                 InputProps={{
//                   startAdornment: <Person color="action" sx={{ mr: 1 }} />
//                 }}
//               />
              
//               <TextField
//                 label="Cognome"
//                 name="cognome"
//                 value={formData.cognome}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 error={!!formErrors.cognome}
//                 helperText={formErrors.cognome}
//                 InputProps={{
//                   startAdornment: <Person color="action" sx={{ mr: 1 }} />
//                 }}
//               />
              
//               <TextField
//                 label="Cellulare"
//                 name="cellulare"
//                 value={formData.cellulare}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 error={!!formErrors.cellulare}
//                 helperText={formErrors.cellulare}
//                 InputProps={{
//                   startAdornment: <Phone color="action" sx={{ mr: 1 }} />
//                 }}
//               />
              
//               <TextField
//                 label="Indirizzo di residenza"
//                 name="indirizzo"
//                 value={formData.indirizzo}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 error={!!formErrors.indirizzo}
//                 helperText={formErrors.indirizzo}
//                 InputProps={{
//                   startAdornment: <Home color="action" sx={{ mr: 1 }} />
//                 }}
//               />
              
//               <TextField
//                 label="Comune"
//                 name="comune"
//                 value={formData.comune}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 error={!!formErrors.comune}
//                 helperText={formErrors.comune}
//               />
              
//               <TextField
//                 label="CAP"
//                 name="cap"
//                 value={formData.cap}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 error={!!formErrors.cap}
//                 helperText={formErrors.cap}
//               />
              
//               <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
//                 <DatePicker
//                   label="Data di nascita"
//                   value={formData.dataNascita}
//                   onChange={(date) => handleSpecialChange('dataNascita', date)}
//                   slotProps={{
//                     textField: {
//                       fullWidth: true,
//                       required: true,
//                       error: !!formErrors.dataNascita,
//                       helperText: formErrors.dataNascita,
//                       InputProps: {
//                         startAdornment: <CalendarMonth color="action" sx={{ mr: 1 }} />
//                       }
//                     }
//                   }}
//                   maxDate={dayjs().subtract(10, 'year')}
//                 />
//               </LocalizationProvider>
//             </Stack>
//           </Box>
          
//           <Divider sx={{ my: 4 }} />
          
//           {/* Resto del form - identico alla versione completa */}
//           {/* ... */}
          
//           {/* Dati Sportivi */}
//           <Box className="form-section">
//             <Typography variant="h5" component="h2" className="section-title">
//               Dati Sportivi
//             </Typography>
            
//             <Stack spacing={2} sx={{ maxWidth: '500px', margin: '0 auto' }}>
//               <TextField
//                 label="Altezza (cm)"
//                 name="altezza"
//                 value={formData.altezza}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 type="number"
//                 inputProps={{ min: 100, max: 220 }}
//                 InputProps={{
//                     startAdornment: <StraightenOutlined color="action" sx={{ mr: 1 }} />
//                   }}
//                 />
                
//                 <TextField
//                   label="Peso (kg)"
//                   name="peso"
//                   value={formData.peso}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                   type="number"
//                   inputProps={{ min: 30, max: 150 }}
//                   InputProps={{
//                     startAdornment: <MonitorWeight color="action" sx={{ mr: 1 }} />
//                   }}
//                 />
                
//                 <FormControl fullWidth required error={!!formErrors.posizioneBarca}>
//                   <InputLabel id="posizioneBarca-label">Posizione in barca</InputLabel>
//                   <Select
//                     labelId="posizioneBarca-label"
//                     id="posizioneBarca"
//                     name="posizioneBarca"
//                     multiple
//                     value={formData.posizioneBarca}
//                     onChange={handleChange}
//                     startAdornment={<Rowing color="action" sx={{ mr: 1 }} />}
//                     renderValue={(selected) => (
//                       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                         {selected.map((value) => {
//                           let label = value;
//                           if (value === 'destro') label = 'Destro/a';
//                           if (value === 'sinistro') label = 'Sinistro/a';
//                           if (value === 'tamburina') label = 'Tamburina';
//                           if (value === 'timoniere') label = 'Timoniere';
                          
//                           return <Chip key={value} label={label} size="small" />;
//                         })}
//                       </Box>
//                     )}
//                   >
//                     <MenuItem value="destro">Destro/a</MenuItem>
//                     <MenuItem value="sinistro">Sinistro/a</MenuItem>
//                     <MenuItem value="tamburina">Tamburina</MenuItem>
//                     <MenuItem value="timoniere">Timoniere</MenuItem>
//                   </Select>
//                   <FormHelperText>{formErrors.posizioneBarca}</FormHelperText>
//                 </FormControl>
                
//                 <FormControl fullWidth required error={!!formErrors.tagliaShirt}>
//                   <InputLabel id="tagliaShirt-label">Taglia T-Shirt</InputLabel>
//                   <Select
//                     labelId="tagliaShirt-label"
//                     id="tagliaShirt"
//                     name="tagliaShirt"
//                     value={formData.tagliaShirt}
//                     onChange={handleChange}
//                     startAdornment={<CheckroomOutlined color="action" sx={{ mr: 1 }} />}
//                   >
//                     <MenuItem value="xs">XS</MenuItem>
//                     <MenuItem value="s">S</MenuItem>
//                     <MenuItem value="m">M</MenuItem>
//                     <MenuItem value="l">L</MenuItem>
//                     <MenuItem value="xl">XL</MenuItem>
//                     <MenuItem value="xxl">XXL</MenuItem>
//                   </Select>
//                   <FormHelperText>{formErrors.tagliaShirt}</FormHelperText>
//                 </FormControl>
                
//                 <FormControl fullWidth required error={!!formErrors.tagliaCostume}>
//                   <InputLabel id="tagliaCostume-label">Taglia Costume</InputLabel>
//                   <Select
//                     labelId="tagliaCostume-label"
//                     id="tagliaCostume"
//                     name="tagliaCostume"
//                     value={formData.tagliaCostume}
//                     onChange={handleChange}
//                     startAdornment={<CheckroomOutlined color="action" sx={{ mr: 1 }} />}
//                   >
//                     <MenuItem value="xs">XS</MenuItem>
//                     <MenuItem value="s">S</MenuItem>
//                     <MenuItem value="m">M</MenuItem>
//                     <MenuItem value="l">L</MenuItem>
//                     <MenuItem value="xl">XL</MenuItem>
//                     <MenuItem value="xxl">XXL</MenuItem>
//                   </Select>
//                   <FormHelperText>{formErrors.tagliaCostume}</FormHelperText>
//                 </FormControl>
                
//                 <FormControl fullWidth required error={!!formErrors.squadra}>
//                   <InputLabel id="squadra-label">Squadra iscrizione</InputLabel>
//                   <Select
//                     labelId="squadra-label"
//                     id="squadra"
//                     name="squadra"
//                     value={formData.squadra}
//                     onChange={handleChange}
//                     startAdornment={<Pool color="action" sx={{ mr: 1 }} />}
//                   >
//                     <MenuItem value="dragon_pine">Dragon Piné</MenuItem>
//                     <MenuItem value="pine_sharks">Piné Sharks</MenuItem>
//                     <MenuItem value="dragon_flames">Dragon Flames</MenuItem>
//                     <MenuItem value="dragon_junior">Dragon Junior</MenuItem>
//                   </Select>
//                   <FormHelperText>{formErrors.squadra}</FormHelperText>
//                 </FormControl>
                
//                 <FormControl fullWidth required error={!!formErrors.tipoIscrizione}>
//                   <InputLabel id="tipoIscrizione-label">Tipo iscrizione</InputLabel>
//                   <Select
//                     labelId="tipoIscrizione-label"
//                     id="tipoIscrizione"
//                     name="tipoIscrizione"
//                     value={formData.tipoIscrizione}
//                     onChange={handleChange}
//                     startAdornment={<Badge color="action" sx={{ mr: 1 }} />}
//                   >
//                     <MenuItem value="atleta">Atleta</MenuItem>
//                     <MenuItem value="socio">Socio</MenuItem>
//                     <MenuItem value="atleta_socio">Atleta e Socio</MenuItem>
//                   </Select>
//                   <FormHelperText>{formErrors.tipoIscrizione}</FormHelperText>
//                 </FormControl>
//               </Stack>
//             </Box>
            
//             <Divider sx={{ my: 4 }} />
            
//             {/* Documenti */}
//             <Box className="form-section">
//               <Typography variant="h5" component="h2" className="section-title">
//                 Documenti
//               </Typography>
              
//               <Alert 
//                 severity="info" 
//                 sx={{ mb: 3, maxWidth: '500px', margin: '0 auto' }}
//                 icon={<ErrorOutline />}
//               >
//                 Carica i documenti in formato JPG, PNG o PDF. Le immagini verranno automaticamente ottimizzate.
//                 Dimensione massima 10MB per file.
//               </Alert>
              
//               <Stack spacing={3} sx={{ maxWidth: '500px', margin: '0 auto' }}>
//                 {/* Carta d'identità FRONTE */}
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
//                     Carta d'identità - FRONTE
//                   </Typography>
//                   <input
//                     id="file-cartaIdentitaFronte"
//                     type="file"
//                     accept="image/png,image/jpeg,image/jpg,image/webp,image/heic,image/heif,application/pdf"
//                     style={{ display: 'none' }}
//                     onChange={(e) => handleFileChange(e, 'cartaIdentitaFronte')}
//                   />
//                   <Button
//                     variant="outlined"
//                     component="label"
//                     fullWidth
//                     color={fileErrors.cartaIdentitaFronte ? "error" : files.cartaIdentitaFronte ? "success" : "primary"}
//                     onClick={() => triggerFileInput('cartaIdentitaFronte')}
//                     startIcon={<UploadFile />}
//                     sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
//                   >
//                     {files.cartaIdentitaFronte ? `Caricato: ${files.cartaIdentitaFronte.name}` : 'Carica fronte carta d\'identità'}
//                   </Button>
//                   {fileErrors.cartaIdentitaFronte && (
//                     <FormHelperText error>{fileErrors.cartaIdentitaFronte}</FormHelperText>
//                   )}
//                 </Box>
                
//                 {/* Carta d'identità RETRO */}
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
//                     Carta d'identità - RETRO
//                   </Typography>
//                   <input
//                     id="file-cartaIdentitaRetro"
//                     type="file"
//                     accept="image/png,image/jpeg,image/jpg,image/webp,image/heic,image/heif,application/pdf"
//                     style={{ display: 'none' }}
//                     onChange={(e) => handleFileChange(e, 'cartaIdentitaRetro')}
//                   />
//                   <Button
//                     variant="outlined"
//                     component="label"
//                     fullWidth
//                     color={fileErrors.cartaIdentitaRetro ? "error" : files.cartaIdentitaRetro ? "success" : "primary"}
//                     onClick={() => triggerFileInput('cartaIdentitaRetro')}
//                     startIcon={<UploadFile />}
//                     sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
//                   >
//                     {files.cartaIdentitaRetro ? `Caricato: ${files.cartaIdentitaRetro.name}` : 'Carica retro carta d\'identità'}
//                   </Button>
//                   {fileErrors.cartaIdentitaRetro && (
//                     <FormHelperText error>{fileErrors.cartaIdentitaRetro}</FormHelperText>
//                   )}
//                 </Box>
                
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
//                     Visita medica
//                   </Typography>
//                   <input
//                     id="file-visitaMedica"
//                     type="file"
//                     accept="image/png,image/jpeg,image/jpg,image/webp,image/heic,image/heif,application/pdf"
//                     style={{ display: 'none' }}
//                     onChange={(e) => handleFileChange(e, 'visitaMedica')}
//                   />
//                   <Button
//                     variant="outlined"
//                     component="label"
//                     fullWidth
//                     color={fileErrors.visitaMedica ? "error" : files.visitaMedica ? "success" : "primary"}
//                     onClick={() => triggerFileInput('visitaMedica')}
//                     startIcon={<UploadFile />}
//                     sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
//                   >
//                     {files.visitaMedica ? `Caricato: ${files.visitaMedica.name}` : 'Carica visita medica'}
//                   </Button>
//                   {fileErrors.visitaMedica && (
//                     <FormHelperText error>{fileErrors.visitaMedica}</FormHelperText>
//                   )}
//                 </Box>
                
//                 <Box>
//                   <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
//                     <DatePicker
//                       label="Data scadenza visita medica"
//                       value={formData.dataScadenzaVisita}
//                       onChange={(date) => handleSpecialChange('dataScadenzaVisita', date)}
//                       slotProps={{
//                         textField: {
//                           fullWidth: true,
//                           required: true,
//                           error: !!formErrors.dataScadenzaVisita,
//                           helperText: formErrors.dataScadenzaVisita || "Inserisci la data di scadenza riportata sul documento",
//                           InputProps: {
//                             startAdornment: <CalendarMonth color="action" sx={{ mr: 1 }} />
//                           }
//                         }
//                       }}
//                       minDate={dayjs()}
//                     />
//                   </LocalizationProvider>
//                 </Box>
                
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
//                     Modulo richiesta tesseramento (compilato e firmato)
//                   </Typography>
//                   <input
//                     id="file-moduloTesseramento"
//                     type="file"
//                     accept="image/png,image/jpeg,image/jpg,image/webp,image/heic,image/heif,application/pdf"
//                     style={{ display: 'none' }}
//                     onChange={(e) => handleFileChange(e, 'moduloTesseramento')}
//                   />
//                   <Button
//                     variant="outlined"
//                     component="label"
//                     fullWidth
//                     color={fileErrors.moduloTesseramento ? "error" : files.moduloTesseramento ? "success" : "primary"}
//                     onClick={() => triggerFileInput('moduloTesseramento')}
//                     startIcon={<UploadFile />}
//                     sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
//                   >
//                     {files.moduloTesseramento ? `Caricato: ${files.moduloTesseramento.name}` : 'Carica modulo tesseramento'}
//                   </Button>
//                   {fileErrors.moduloTesseramento && (
//                     <FormHelperText error>{fileErrors.moduloTesseramento}</FormHelperText>
//                   )}
//                 </Box>
                
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
//                     Ricevuta pagamento
//                   </Typography>
//                   <input
//                     id="file-ricevutaPagamento"
//                     type="file"
//                     accept="image/png,image/jpeg,image/jpg,image/webp,image/heic,image/heif,application/pdf"
//                     style={{ display: 'none' }}
//                     onChange={(e) => handleFileChange(e, 'ricevutaPagamento')}
//                   />
//                   <Button
//                     variant="outlined"
//                     component="label"
//                     fullWidth
//                     color={fileErrors.ricevutaPagamento ? "error" : files.ricevutaPagamento ? "success" : "primary"}
//                     onClick={() => triggerFileInput('ricevutaPagamento')}
//                     startIcon={<ReceiptLong />}
//                     sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
//                   >
//                     {files.ricevutaPagamento ? `Caricato: ${files.ricevutaPagamento.name}` : 'Carica ricevuta pagamento'}
//                   </Button>
//                   {fileErrors.ricevutaPagamento && (
//                     <FormHelperText error>{fileErrors.ricevutaPagamento}</FormHelperText>
//                   )}
//                 </Box>
                
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
//                     Foto personale (stile fototessera)
//                   </Typography>
//                   <input
//                     id="file-fotoPersonale"
//                     type="file"
//                     accept="image/png,image/jpeg,image/jpg,image/webp,image/heic,image/heif"
//                     style={{ display: 'none' }}
//                     onChange={(e) => handleFileChange(e, 'fotoPersonale')}
//                   />
//                   <Button
//                     variant="outlined"
//                     component="label"
//                     fullWidth
//                     color={fileErrors.fotoPersonale ? "error" : files.fotoPersonale ? "success" : "primary"}
//                     onClick={() => triggerFileInput('fotoPersonale')}
//                     startIcon={<CameraAlt />}
//                     sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
//                   >
//                     {files.fotoPersonale ? `Caricato: ${files.fotoPersonale.name}` : 'Carica foto personale'}
//                   </Button>
//                   {fileErrors.fotoPersonale && (
//                     <FormHelperText error>{fileErrors.fotoPersonale}</FormHelperText>
//                   )}
//                 </Box>
                
//                 <FormGroup>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         name="accettoPrivacy"
//                         checked={formData.accettoPrivacy}
//                         onChange={handleChange}
//                         color="primary"
//                       />
//                     }
//                     label="Accetto la privacy policy e il trattamento dei dati personali"
//                   />
//                   {formErrors.accettoPrivacy && (
//                     <FormHelperText error>{formErrors.accettoPrivacy}</FormHelperText>
//                   )}
//                 </FormGroup>
//               </Stack>
//             </Box>
            
//             <Divider sx={{ my: 4 }} />
            
//             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 startIcon={<Send />}
//                 disabled={loading}
//                 className="submit-button"
//                 sx={{ maxWidth: '500px', width: '100%' }}
//               >
//                 {loading ? 'Invio in corso...' : 'Invia Iscrizione'}
//               </Button>
//             </Box>
//           </form>
//         </Paper>
//       </Container>
//     );
//   };
  
//   export default FormIscrizioneSemplice;



import React, { useState, useEffect, useCallback } from "react";
import { debounce } from 'lodash';
import { createClient } from '@supabase/supabase-js';
import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { motion } from "framer-motion";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
  Box,
  LinearProgress,
  Divider,
  CircularProgress,
  FormHelperText,
  Stack,
  FormGroup,
  Chip
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Email,
  Person,
  Phone,
  Home,
  CalendarMonth,
  StraightenOutlined,
  MonitorWeight,
  Rowing,
  CheckroomOutlined,
  Pool,
  Badge,
  UploadFile,
  ReceiptLong,
  CameraAlt,
  Send,
  Description,
  CheckCircle as CheckCircleOutline,
  ErrorOutline
} from '@mui/icons-material';

import './FormIscrizione.css';

// Configurazione Supabase
const supabaseUrl = 'https://guoicoktnwrvzsynrfdf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1b2ljb2t0bndydnpzeW5yZmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDIzODIsImV4cCI6MjA1OTg3ODM4Mn0.RmaA7PBCuJssRDl1ee0_VT7A1h5YkZMFzf0MqtlB4K4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Tipi di file accettati
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
const ACCEPTED_DOCUMENT_TYPES = [...ACCEPTED_IMAGE_TYPES, 'application/pdf'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Sistema di logging avanzato
const logFileOperation = (operation, details) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    operation,
    ...details
  };
  
  console.log(`[${timestamp}] ${operation}:`, details);
  
  // Salva i log in localStorage
  const logs = JSON.parse(localStorage.getItem('file_operation_logs') || '[]');
  logs.push(logEntry);
  localStorage.setItem('file_operation_logs', JSON.stringify(logs.slice(-50))); // Mantieni ultimi 50 log
};

const FormIscrizioneSemplice = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [emailExists, setEmailExists] = useState(false);
  const [checking, setChecking] = useState(false);

  // Stato per i file
  const [files, setFiles] = useState({
    cartaIdentitaFronte: null,
    cartaIdentitaRetro: null,
    visitaMedica: null,
    moduloTesseramento: null,
    ricevutaPagamento: null,
    fotoPersonale: null
  });

  // Stato per gli errori dei file
  const [fileErrors, setFileErrors] = useState({
    cartaIdentitaFronte: false,
    cartaIdentitaRetro: false,
    visitaMedica: false,
    moduloTesseramento: false,
    ricevutaPagamento: false,
    fotoPersonale: false
  });

  // Stato per il form
  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    cognome: '',
    cellulare: '',
    indirizzo: '',
    comune: '',
    cap: '',
    dataNascita: null,
    altezza: 170,
    peso: 70,
    posizioneBarca: [],
    tagliaShirt: '',
    tagliaCostume: '',
    squadra: '',
    tipoIscrizione: '',
    dataScadenzaVisita: null,
    accettoPrivacy: false,
    mondiali: false
  });

  // Stato per gli errori nel form
  const [formErrors, setFormErrors] = useState({
    email: '',
    nome: '',
    cognome: '',
    cellulare: '',
    indirizzo: '',
    comune: '',
    cap: '',
    dataNascita: '',
    posizioneBarca: '',
    tagliaShirt: '',
    tagliaCostume: '',
    squadra: '',
    tipoIscrizione: '',
    dataScadenzaVisita: '',
    accettoPrivacy: ''
  });

  // Controlla se c'era un upload interrotto
  useEffect(() => {
    const uploadInProgress = localStorage.getItem('form_upload_in_progress');
    
    if (uploadInProgress === 'true') {
      const lastFolder = localStorage.getItem('form_last_folder');
      const completedFiles = JSON.parse(localStorage.getItem('form_completed_files') || '[]');
      
      console.warn('Rilevato upload interrotto:', {
        folder: lastFolder,
        completedFiles
      });
      
      // Pulizia dati upload interrotto
      localStorage.removeItem('form_upload_in_progress');
      localStorage.removeItem('form_last_folder');
      localStorage.removeItem('form_completed_files');
      
      setError('È stato rilevato un upload precedente interrotto. Ricompila il form e riprova.');
    }
  }, []);

  // Funzione per verificare l'email
  const checkEmail = useCallback(
    debounce(async (email) => {
      if (!email || !email.includes('@')) return;
      
      setChecking(true);
      try {
        const { data } = await supabase
          .from('iscrizioni')
          .select('email')
          .eq('email', email.toLowerCase())
          .limit(1);
        
        setEmailExists(data && data.length > 0);
        if (data && data.length > 0) {
          setFormErrors(prev => ({...prev, email: 'Email già registrata nel sistema'}));
        }
      } catch (error) {
        console.error('Errore verifica email:', error);
      } finally {
        setChecking(false);
      }
    }, 500),
    []
  );

  // Verifica l'email quando cambia
  useEffect(() => {
    if (formData.email) {
      checkEmail(formData.email);
    }
  }, [formData.email, checkEmail]);

  // Gestione dei campi del form
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newValue;
  
    if (type === 'checkbox') {
      newValue = checked;
    } else if (name === 'posizioneBarca') {
      // Gestisci esplicitamente il campo posizioneBarca come array
      newValue = Array.isArray(value) ? value : [value];
    } else {
      newValue = value;
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Reset dell'errore per il campo modificato
    setFormErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  // Gestione speciale per campi come MultiSelect e DatePicker
  const handleSpecialChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    setFormErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  // Verifica se un file è un'immagine
  const isImage = (file) => {
    return ACCEPTED_IMAGE_TYPES.includes(file.type);
  };

  // Verifica se un file è un PDF
  const isPDF = (file) => {
    return file.type === 'application/pdf';
  };

  // Verifica le dimensioni del file
  const isValidFileSize = (file) => {
    return file.size <= MAX_FILE_SIZE;
  };

  // Converti HEIC/HEIF in JPEG
  const convertHeicToJpeg = async (file) => {
    logFileOperation('heic_conversion_start', { 
      fileName: file.name, 
      fileSize: file.size, 
      fileType: file.type 
    });
    
    try {
      const blob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.8
      });
      
      // Converti il blob in File
      const newFileName = `${file.name.split('.')[0]}.jpg`;
      const convertedFile = new File([blob], newFileName, { type: 'image/jpeg' });
      
      logFileOperation('heic_conversion_complete', { 
        fileName: newFileName, 
        originalSize: file.size, 
        convertedSize: convertedFile.size
      });
      
      return convertedFile;
    } catch (error) {
      logFileOperation('heic_conversion_error', { 
        fileName: file.name, 
        error: error.message 
      });
      
      throw new Error(`Impossibile convertire il formato immagine ${file.type}. ${error.message}`);
    }
  };

  // Compressione immagini
  const compressImage = async (file, fieldName) => {
    logFileOperation('compression_start', { 
      fileName: file.name, 
      fileSize: file.size, 
      fileType: file.type,
      field: fieldName
    });
    
    try {
      // Opzioni di compressione
      const options = {
        maxSizeMB: 0.5, // Massimo 0.5MB
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        initialQuality: 0.8,
        fileType: 'image/jpeg' // Converti tutto in JPG
      };
      
      // Personalizza opzioni per campo specifico
      if (fieldName === 'fotoPersonale') {
        options.maxSizeMB = 0.3;
        options.initialQuality = 0.85;
        options.maxWidthOrHeight = 800; // Risoluzione sufficiente per un volto
      }
      
      const compressedFile = await imageCompression(file, options);
      
      logFileOperation('compression_complete', { 
        fileName: file.name, 
        originalSize: file.size, 
        compressedSize: compressedFile.size,
        compressionRatio: compressedFile.size / file.size
      });
      
      // Crea un nuovo File con estensione .jpg
      const newFileName = `${file.name.split('.')[0]}.jpg`;
      return new File([compressedFile], newFileName, { type: 'image/jpeg' });
      
    } catch (error) {
      logFileOperation('compression_error', { 
        fileName: file.name, 
        error: error.message 
      });
      
      console.error('Errore compressione:', error);
      return file; // Ritorna il file originale in caso di errore
    }
  };

  // Funzione di conversione e compressione combinata
  const processFile = async (file, fieldName) => {
    logFileOperation('process_file_start', { 
      fileName: file.name, 
      fileSize: file.size, 
      fileType: file.type,
      field: fieldName
    });
    
    // Se è un PDF, restituisci il file originale
    if (isPDF(file)) {
      return file;
    }
    
    // Gestione speciale per HEIC/HEIF
    if (file.type.includes('heic') || file.type.includes('heif')) {
      try {
        const jpegFile = await convertHeicToJpeg(file);
        return await compressImage(jpegFile, fieldName);
      } catch (error) {
        console.error(error);
        throw new Error(`Il formato ${file.type} non può essere elaborato. Usa JPG, PNG o PDF.`);
      }
    }
    
    // Se non è un'immagine supportata, restituisci il file originale
    if (!isImage(file)) {
      return file;
    }
    
    // Comprimi l'immagine
    return await compressImage(file, fieldName);
  };

  // Gestione dei file
  const handleFileChange = async (e, fieldName) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    logFileOperation('file_selected', { 
      fileName: file.name, 
      fileSize: file.size, 
      fileType: file.type,
      field: fieldName
    });

    // Verifica tipo di file
    if (!ACCEPTED_DOCUMENT_TYPES.includes(file.type) && fieldName !== 'fotoPersonale') {
      setFileErrors(prev => ({
        ...prev,
        [fieldName]: 'Formato non supportato. Usa JPG, PNG o PDF'
      }));
      
      logFileOperation('file_rejected_format', { 
        fileName: file.name, 
        fileType: file.type,
        field: fieldName
      });
      
      return;
    }

    // Per foto personale, accetta solo immagini
    if (fieldName === 'fotoPersonale' && !isImage(file)) {
      setFileErrors(prev => ({
        ...prev,
        [fieldName]: 'La foto deve essere in formato immagine (JPG, PNG, HEIC)'
      }));
      
      logFileOperation('file_rejected_photo_format', { 
        fileName: file.name, 
        fileType: file.type
      });
      
      return;
    }
    
    // Verifica dimensione
    if (!isValidFileSize(file)) {
      setFileErrors(prev => ({
        ...prev,
        [fieldName]: 'Il file non deve superare i 10MB'
      }));
      
      logFileOperation('file_rejected_size', { 
        fileName: file.name, 
        fileSize: file.size,
        maxSize: MAX_FILE_SIZE
      });
      
      return;
    }
    
    setFiles(prev => ({
      ...prev,
      [fieldName]: file
    }));
    
    setFileErrors(prev => ({
      ...prev,
      [fieldName]: false
    }));
    
    logFileOperation('file_accepted', { 
      fileName: file.name, 
      fileSize: file.size, 
      fileType: file.type,
      field: fieldName
    });
  };

  // Trigger per input file nascosto
  const triggerFileInput = (fieldName) => {
    const fileInput = document.getElementById(`file-${fieldName}`);
    if (fileInput) {
      fileInput.click();
    }
  };

  // Genera nome univoco per la cartella utente
  const generateUniqueFolderName = () => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 10);
    
    const usernamePart = `${formData.nome.trim()}_${formData.cognome.trim()}`
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
    
    // Aggiungi data nascita se disponibile
    const datePart = formData.dataNascita 
      ? `_${formData.dataNascita.format('YYYYMMDD')}`
      : '';
    
    // Aggiungi l'email (hash)
    const emailHash = formData.email
      ? `_${btoa(formData.email).replace(/[^a-zA-Z0-9]/g, '').substring(0, 8)}`
      : '';
    
    const folderName = `${usernamePart}${datePart}${emailHash}_${timestamp}_${randomStr}`;
    
    logFileOperation('folder_name_generated', { folderName });
    
    return folderName;
  };

  // Estrai l'estensione dal file
  const getFileExtension = (file) => {
    // Per i file HEIC/HEIF, converte in JPG
    if (file.type.includes('heic') || file.type.includes('heif')) {
      return 'jpg';
    }
    
    // Per le immagini che non sono PDF, standardizza su JPG
    if (isImage(file) && !isPDF(file)) {
      return 'jpg';
    }
    
    // Per i PDF, mantiene l'estensione
    if (isPDF(file)) {
      return 'pdf';
    }
    
    // Fallback sull'estensione originale
    return file.name.split('.').pop()?.toLowerCase() || 'jpg';
  };

  // Upload file con retry
  const uploadFileWithRetry = async (file, path, maxRetries = 3) => {
    let attempt = 0;
    
    logFileOperation('upload_with_retry_start', { 
      fileName: file.name, 
      path,
      maxRetries 
    });
    
    while (attempt < maxRetries) {
      try {
        logFileOperation('upload_attempt', { 
          fileName: file.name, 
          path,
          attempt: attempt + 1
        });
        
        const { data, error } = await supabase.storage
          .from('documents')
          .upload(path, file, {
            cacheControl: '3600',
            upsert: false
          });
          
        if (error) {
          if (error.statusCode === 409) {
            // Conflitto, genera un nuovo nome file
            logFileOperation('upload_conflict', { 
              fileName: file.name, 
              path
            });
            
            const timestamp = Date.now() + Math.floor(Math.random() * 1000);
            path = path.replace(/^(.+)\/([^\/]+)$/, `$1/${timestamp}_$2`);
            
            logFileOperation('upload_new_path', { 
              fileName: file.name, 
              newPath: path
            });
            
            attempt++; // Non considera questo come un vero tentativo fallito
            continue;
          }
          
          throw error;
        }
        
        // Ottieni URL pubblico
        const { data: publicUrlData } = supabase.storage
          .from('documents')
          .getPublicUrl(path);
        
        // Verifica che il file sia accessibile
        try {
          const response = await fetch(publicUrlData.publicUrl, { method: 'HEAD' });
          if (!response.ok) {
            throw new Error(`File non accessibile (status ${response.status})`);
          }
        } catch (verifyError) {
          logFileOperation('verify_access_error', { 
            fileName: file.name, 
            path,
            error: verifyError.message
          });
          
          throw new Error(`Il file è stato caricato ma non è accessibile: ${verifyError.message}`);
        }
        
        logFileOperation('upload_success', { 
          fileName: file.name, 
          path,
          url: publicUrlData.publicUrl
        });
        
        return { url: publicUrlData.publicUrl, path };
      } catch (error) {
        logFileOperation('upload_attempt_failed', { 
          fileName: file.name, 
          attempt: attempt + 1,
          error: error.message
        });
        
        attempt++;
        
        if (attempt >= maxRetries) {
          logFileOperation('upload_max_retries', { 
            fileName: file.name
          });
          
          throw new Error(`Impossibile caricare il file dopo ${maxRetries} tentativi: ${error.message}`);
        }
        
        // Attendi un po' prima del prossimo tentativo (backoff esponenziale)
        const backoffTime = 1000 * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, backoffTime));
      }
    }
  };

  // Validazione del form
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: '',
      nome: '',
      cognome: '',
      cellulare: '',
      indirizzo: '',
      comune: '',
      cap: '',
      dataNascita: '',
      posizioneBarca: '',
      tagliaShirt: '',
      tagliaCostume: '',
      squadra: '',
      tipoIscrizione: '',
      dataScadenzaVisita: '',
      accettoPrivacy: ''
    };
    
    // Validazione campi di testo
    if (!formData.email) {
      newErrors.email = 'Email obbligatoria';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email non valida';
      valid = false;
    } else if (emailExists) {
      newErrors.email = 'Email già registrata nel sistema';
      valid = false;
    }
    
    if (!formData.nome) {
      newErrors.nome = 'Nome obbligatorio';
      valid = false;
    }
    
    if (!formData.cognome) {
      newErrors.cognome = 'Cognome obbligatorio';
      valid = false;
    }
    
    if (!formData.cellulare) {
      newErrors.cellulare = 'Cellulare obbligatorio';
      valid = false;
    }
    
    if (!formData.indirizzo) {
      newErrors.indirizzo = 'Indirizzo obbligatorio';
      valid = false;
    }
    
    if (!formData.comune) {
      newErrors.comune = 'Comune obbligatorio';
      valid = false;
    }
    
    if (!formData.cap) {
      newErrors.cap = 'CAP obbligatorio';
      valid = false;
    }
    
    if (!formData.dataNascita) {
      newErrors.dataNascita = 'Data di nascita obbligatoria';
      valid = false;
    }
    
    // Validazione dati sportivi
    if (formData.posizioneBarca.length === 0) {
      newErrors.posizioneBarca = 'Seleziona almeno una posizione';
      valid = false;
    }
    
    if (!formData.tagliaShirt) {
      newErrors.tagliaShirt = 'Seleziona la taglia della T-Shirt';
      valid = false;
    }
    
    if (!formData.tagliaCostume) {
      newErrors.tagliaCostume = 'Seleziona la taglia del costume';
      valid = false;
    }
    
    if (!formData.squadra) {
      newErrors.squadra = 'Seleziona la squadra';
      valid = false;
    }
    
    if (!formData.tipoIscrizione) {
      newErrors.tipoIscrizione = 'Seleziona il tipo di iscrizione';
      valid = false;
    }
    
    // Validazione documenti
    const newFileErrors = {
      cartaIdentitaFronte: false,
      cartaIdentitaRetro: false,
      visitaMedica: false,
      moduloTesseramento: false,
      ricevutaPagamento: false,
      fotoPersonale: false
    };
    
    if (!files.cartaIdentitaFronte) {
      newFileErrors.cartaIdentitaFronte = 'Carica il fronte della carta d\'identità';
      valid = false;
    }
      
    if (!files.cartaIdentitaRetro) {
      newFileErrors.cartaIdentitaRetro = 'Carica il retro della carta d\'identità';
      valid = false;
    }
    
    if (!files.visitaMedica) {
      newFileErrors.visitaMedica = 'Carica la visita medica';
      valid = false;
    }
    
    if (!formData.dataScadenzaVisita) {
      newErrors.dataScadenzaVisita = 'Inserisci la data di scadenza della visita medica';
      valid = false;
    }
    
    if (!files.moduloTesseramento) {
      newFileErrors.moduloTesseramento = 'Carica il modulo di tesseramento';
      valid = false;
    }
    
    if (!files.ricevutaPagamento) {
      newFileErrors.ricevutaPagamento = 'Carica la ricevuta di pagamento';
      valid = false;
    }
    
    if (!files.fotoPersonale) {
      newFileErrors.fotoPersonale = 'Carica la foto personale';
      valid = false;
    }
    
    if (!formData.accettoPrivacy) {
      newErrors.accettoPrivacy = 'Devi accettare la privacy policy';
      valid = false;
    }
    
    setFormErrors(newErrors);
    setFileErrors(newFileErrors);
    
    logFileOperation('form_validation', { valid, errors: !valid ? { ...newErrors, ...newFileErrors } : 'none' });
    
    return valid;
  };

  // Invio del form - Approccio Transazionale
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validazione
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setError('Correggi gli errori prima di inviare');
      return;
    }
    
    setLoading(true);
    setProgress(0);
    setError('');
    
    // Genera nome cartella univoco
    const folderName = generateUniqueFolderName();
    
    logFileOperation('form_submission_start', { folderName });
    
    // Array per tenere traccia dei file caricati (per pulizia in caso di errore)
    const uploadedFilePaths = [];
    
    try {
      // FASE 1: Processa tutti i file (conversione/compressione)
      const processedFiles = {};
      const fileExtensions = {};
      const totalFiles = Object.keys(files).filter(key => files[key] !== null).length;
      let processedCount = 0;
      
      for (const [key, file] of Object.entries(files)) {
        if (!file) continue;
        
        try {
          logFileOperation('processing_file', { key, fileName: file.name });
          
          // Processa il file (converte/comprime)
          processedFiles[key] = await processFile(file, key);
          fileExtensions[key] = getFileExtension(processedFiles[key]);
          
          processedCount++;
          setProgress(Math.round((processedCount / totalFiles) * 40)); // Prima fase: 40%
        } catch (error) {
          logFileOperation('file_processing_error', { key, error: error.message });
          throw new Error(`Errore nel processare il file ${key}: ${error.message}`);
        }
      }
      
      // FASE 2: Carica tutti i file
      const urls = {};
      let uploadedCount = 0;
      
      for (const [key, processedFile] of Object.entries(processedFiles)) {
        try {
          const timestamp = Date.now();
          const fileName = `${timestamp}_${key}.${fileExtensions[key]}`;
          const filePath = `${folderName}/${fileName}`;
          
          logFileOperation('uploading_file', { 
            key, 
            fileName: processedFile.name, 
            size: processedFile.size, 
            path: filePath 
          });
          
          // Upload con retry a Supabase
          const result = await uploadFileWithRetry(processedFile, filePath);
          urls[`${key}Url`] = result.url;
          uploadedFilePaths.push(result.path);
          
          uploadedCount++;
          setProgress(40 + Math.round((uploadedCount / totalFiles) * 40)); // Seconda fase: 40-80%
        } catch (error) {
          logFileOperation('file_upload_error', { key, error: error.message });
          throw new Error(`Errore nel caricare il file ${key}: ${error.message}`);
        }
      }
      
      logFileOperation('files_upload_complete', { urls });
      
      // FASE 3: Inserisci nel database
      try {
        // Converti date per il database
        const formattedFormData = {
          ...formData,
          email: formData.email.toLowerCase(),
          dataNascita: formData.dataNascita ? formData.dataNascita.format('YYYY-MM-DD') : null,
          dataScadenzaVisita: formData.dataScadenzaVisita ? formData.dataScadenzaVisita.format('YYYY-MM-DD') : null,
          dataIscrizione: new Date().toISOString(),
        };
        
        logFileOperation('saving_to_database', { data: { ...formattedFormData, urls } });
        
        // Salva nel database
        const { error: dbError } = await supabase
          .from('iscrizioni')
          .insert([{ ...formattedFormData, ...urls }]);
          
        if (dbError) {
          logFileOperation('database_error', { error: dbError });
          throw dbError;
        }
        
        setProgress(100);
        logFileOperation('form_submission_success', { email: formData.email });
        
        // Mostra successo
        setSuccess(true);
        
        // Reset form
        setFormData({
          email: '',
          nome: '',
          cognome: '',
          cellulare: '',
          indirizzo: '',
          comune: '',
          cap: '',
          dataNascita: null,
          altezza: 170,
          peso: 70,
          posizioneBarca: [],
          tagliaShirt: '',
          tagliaCostume: '',
          squadra: '',
          tipoIscrizione: '',
          dataScadenzaVisita: null,
          accettoPrivacy: false,
          mondiali: false
        });
        
        setFiles({
          cartaIdentitaFronte: null,
          cartaIdentitaRetro: null,
          visitaMedica: null,
          moduloTesseramento: null,
          ricevutaPagamento: null,
          fotoPersonale: null
        });
      } catch (error) {
        // In caso di errore nel database, elimina tutti i file caricati
        logFileOperation('database_error_cleanup', { 
          error: error.message, 
          uploadedFiles: uploadedFilePaths 
        });
        
        // Elimina tutti i file caricati
        if (uploadedFilePaths.length > 0) {
          try {
            await supabase.storage.from('documents').remove(uploadedFilePaths);
            logFileOperation('cleanup_successful', { 
              filesRemoved: uploadedFilePaths 
            });
          } catch (cleanupError) {
            logFileOperation('cleanup_failed', { 
              error: cleanupError.message, 
              filesNotRemoved: uploadedFilePaths 
            });
          }
        }
        
        throw error;
      }
    } catch (error) {
      console.error('Errore invio form:', error);
      logFileOperation('form_submission_error', { error: error.message });
      
      setError(error.message || 'Si è verificato un errore durante l\'invio');
      setProgress(0);
      
      // In caso di errore in qualsiasi fase, elimina tutti i file caricati
      if (uploadedFilePaths.length > 0) {
        try {
          await supabase.storage.from('documents').remove(uploadedFilePaths);
          logFileOperation('error_cleanup_successful', { 
            filesRemoved: uploadedFilePaths 
          });
        } catch (cleanupError) {
          logFileOperation('error_cleanup_failed', { 
            error: cleanupError.message, 
            filesNotRemoved: uploadedFilePaths 
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Content container style
  const contentContainerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    width: '100%'
  };

  // Pagina di conferma dopo l'invio
  if (success) {
    return (
      <Container maxWidth="md" className="form-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} className="success-paper" sx={{ maxWidth: '500px', margin: '0 auto' }}>
            <Box className="success-content">
              <Box className="success-icon">
                <CheckCircleOutline color="success" fontSize="large" />
              </Box>
              
              <Typography variant="h4" className="success-title">
                Iscrizione Completata!
              </Typography>
              
              <Typography variant="body1" className="success-message">
                Grazie per la tua iscrizione a Dragon Piné.<br />
              </Typography>
              
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => window.location.href = '#/'}
                className="success-button"
              >
                Torna alla Home
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="form-container">
      <Paper elevation={3} className="form-paper" sx={{ maxWidth: '500px', margin: '0 auto' }}>
        <Typography variant="h4" component="h1" className="form-title">
          Iscrizione Asd Dragon Piné
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Benvenuto nel modulo d'iscrizione per l'anno 2025.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Per compilare il modulo saranno obbligatori:
          </Typography>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px', textAlign: 'left' }}>
            <li>carta d'identità (fronte e retro)</li>
            <li>foto personale (stile fototessera)</li>
            <li>visita medica</li>
            <li>modulo richiesta tesseramento compilato e firmato</li>
            <li>ricevuta del pagamento</li>
          </ul>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Prima di continuare, scarica entrambi i file, compila e firma il modulo richiesta tesseramento:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
            <Button 
              variant="text" 
              color="primary" 
              href="https://drive.google.com/file/d/1C6X5x6OA40f1Hfrq-p2eQdJOxttQxmce/view" 
              target="_blank"
              startIcon={<Description size={16} />}
              sx={{ justifyContent: 'flex-start' }}
            >
              Indicazioni di tesseramento
            </Button>
            
            <Button 
              variant="text" 
              color="primary" 
              href="https://drive.google.com/file/d/1ptKNw1BxfI-y1NlprD2wVfxrVdJD8_2j/view" 
              target="_blank"
              startIcon={<Description size={16} />}
              sx={{ justifyContent: 'flex-start' }}
            >
              Modulo tesseramento
            </Button>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {loading && (
          <Box sx={{ mb: 3 }}>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              {progress < 40 ? 'Elaborazione documenti: ' : 
               progress < 80 ? 'Caricamento documenti: ' : 
               'Salvataggio dati: '}{progress}%
            </Typography>
          </Box>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Dati Personali */}
          <Box className="form-section">
            <Typography variant="h5" component="h2" className="section-title">
              Dati Personali
            </Typography>
            
            <Stack spacing={2} sx={{ maxWidth: '500px', margin: '0 auto' }}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                type="email"
                error={!!formErrors.email || emailExists}
                helperText={formErrors.email || (emailExists ? "Email già registrata" : "")}
                InputProps={{
                  startAdornment: <Email color="action" sx={{ mr: 1 }} />,
                  endAdornment: checking ? <CircularProgress size={20} /> : null
                }}
              />
              
              <TextField
                label="Nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                fullWidth
                required
                error={!!formErrors.nome}
                helperText={formErrors.nome}
                InputProps={{
                  startAdornment: <Person color="action" sx={{ mr: 1 }} />
                }}
              />
              
              <TextField
                label="Cognome"
                name="cognome"
                value={formData.cognome}
                onChange={handleChange}
                fullWidth
                required
                error={!!formErrors.cognome}
                helperText={formErrors.cognome}
                InputProps={{
                  startAdornment: <Person color="action" sx={{ mr: 1 }} />
                }}
              />
              
              <TextField
                label="Cellulare"
                name="cellulare"
                value={formData.cellulare}
                onChange={handleChange}
                fullWidth
                required
                error={!!formErrors.cellulare}
                helperText={formErrors.cellulare}
                InputProps={{
                  startAdornment: <Phone color="action" sx={{ mr: 1 }} />
                }}
              />
              
              <TextField
                label="Indirizzo di residenza"
                name="indirizzo"
                value={formData.indirizzo}
                onChange={handleChange}
                fullWidth
                required
                error={!!formErrors.indirizzo}
                helperText={formErrors.indirizzo}
                InputProps={{
                  startAdornment: <Home color="action" sx={{ mr: 1 }} />
                }}
              />
              
              <TextField
                label="Comune"
                name="comune"
                value={formData.comune}
                onChange={handleChange}
                fullWidth
                required
                error={!!formErrors.comune}
                helperText={formErrors.comune}
              />
              
              <TextField
                label="CAP"
                name="cap"
                value={formData.cap}
                onChange={handleChange}
                fullWidth
                required
                error={!!formErrors.cap}
                helperText={formErrors.cap}
              />
              
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
                <DatePicker
                  label="Data di nascita"
                  value={formData.dataNascita}
                  onChange={(date) => handleSpecialChange('dataNascita', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      error: !!formErrors.dataNascita,
                      helperText: formErrors.dataNascita,
                      InputProps: {
                        startAdornment: <CalendarMonth color="action" sx={{ mr: 1 }} />
                      }
                    }
                  }}
                  maxDate={dayjs().subtract(10, 'year')}
                />
              </LocalizationProvider>
            </Stack>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          {/* Dati Sportivi */}
          <Box className="form-section">
            <Typography variant="h5" component="h2" className="section-title">
              Dati Sportivi
            </Typography>
            
            <Stack spacing={2} sx={{ maxWidth: '500px', margin: '0 auto' }}>
              <TextField
                label="Altezza (cm)"
                name="altezza"
                value={formData.altezza}
                onChange={handleChange}
                fullWidth
                required
                type="number"
                inputProps={{ min: 100, max: 220 }}
                InputProps={{
                  startAdornment: <StraightenOutlined color="action" sx={{ mr: 1 }} />
                }}
              />
              
              <TextField
                label="Peso (kg)"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                fullWidth
                required
                type="number"
                inputProps={{ min: 30, max: 150 }}
                InputProps={{
                  startAdornment: <MonitorWeight color="action" sx={{ mr: 1 }} />
                }}
              />
              
              <FormControl fullWidth required error={!!formErrors.posizioneBarca}>
                <InputLabel id="posizioneBarca-label">Posizione in barca</InputLabel>
                <Select
                  labelId="posizioneBarca-label"
                  id="posizioneBarca"
                  name="posizioneBarca"
                  multiple
                  value={formData.posizioneBarca}
                  onChange={handleChange}
                  startAdornment={<Rowing color="action" sx={{ mr: 1 }} />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        let label = value;
                        if (value === 'destro') label = 'Destro/a';
                        if (value === 'sinistro') label = 'Sinistro/a';
                        if (value === 'tamburina') label = 'Tamburina';
                        if (value === 'timoniere') label = 'Timoniere';
                        
                        return <Chip key={value} label={label} size="small" />;
                      })}
                    </Box>
                  )}
                >
                  <MenuItem value="destro">Destro/a</MenuItem>
                  <MenuItem value="sinistro">Sinistro/a</MenuItem>
                  <MenuItem value="tamburina">Tamburina</MenuItem>
                  <MenuItem value="timoniere">Timoniere</MenuItem>
                </Select>
                <FormHelperText>{formErrors.posizioneBarca}</FormHelperText>
              </FormControl>
              
              <FormControl fullWidth required error={!!formErrors.tagliaShirt}>
                <InputLabel id="tagliaShirt-label">Taglia T-Shirt</InputLabel>
                <Select
                  labelId="tagliaShirt-label"
                  id="tagliaShirt"
                  name="tagliaShirt"
                  value={formData.tagliaShirt}
                  onChange={handleChange}
                  startAdornment={<CheckroomOutlined color="action" sx={{ mr: 1 }} />}
                >
                  <MenuItem value="xs">XS</MenuItem>
                  <MenuItem value="s">S</MenuItem>
                  <MenuItem value="m">M</MenuItem>
                  <MenuItem value="l">L</MenuItem>
                  <MenuItem value="xl">XL</MenuItem>
                  <MenuItem value="xxl">XXL</MenuItem>
                </Select>
                <FormHelperText>{formErrors.tagliaShirt}</FormHelperText>
              </FormControl>
              
              <FormControl fullWidth required error={!!formErrors.tagliaCostume}>
                <InputLabel id="tagliaCostume-label">Taglia Costume</InputLabel>
                <Select
                  labelId="tagliaCostume-label"
                  id="tagliaCostume"
                  name="tagliaCostume"
                  value={formData.tagliaCostume}
                  onChange={handleChange}
                  startAdornment={<CheckroomOutlined color="action" sx={{ mr: 1 }} />}
                >
                  <MenuItem value="xs">XS</MenuItem>
                  <MenuItem value="s">S</MenuItem>
                  <MenuItem value="m">M</MenuItem>
                  <MenuItem value="l">L</MenuItem>
                  <MenuItem value="xl">XL</MenuItem>
                  <MenuItem value="xxl">XXL</MenuItem>
                </Select>
                <FormHelperText>{formErrors.tagliaCostume}</FormHelperText>
              </FormControl>
              
              <FormControl fullWidth required error={!!formErrors.squadra}>
                <InputLabel id="squadra-label">Squadra iscrizione</InputLabel>
                <Select
                  labelId="squadra-label"
                  id="squadra"
                  name="squadra"
                  value={formData.squadra}
                  onChange={handleChange}
                  startAdornment={<Pool color="action" sx={{ mr: 1 }} />}
                >
                  <MenuItem value="dragon_pine">Dragon Piné</MenuItem>
                  <MenuItem value="pine_sharks">Piné Sharks</MenuItem>
                  <MenuItem value="dragon_flames">Dragon Flames</MenuItem>
                  <MenuItem value="dragon_junior">Dragon Junior</MenuItem>
                </Select>
                <FormHelperText>{formErrors.squadra}</FormHelperText>
              </FormControl>
              
              <FormControl fullWidth required error={!!formErrors.tipoIscrizione}>
                <InputLabel id="tipoIscrizione-label">Tipo iscrizione</InputLabel>
                <Select
                  labelId="tipoIscrizione-label"
                  id="tipoIscrizione"
                  name="tipoIscrizione"
                  value={formData.tipoIscrizione}
                  onChange={handleChange}
                  startAdornment={<Badge color="action" sx={{ mr: 1 }} />}
                >
                  <MenuItem value="atleta">Atleta</MenuItem>
                  <MenuItem value="socio">Socio</MenuItem>
                  <MenuItem value="atleta_socio">Atleta e Socio</MenuItem>
                </Select>
                <FormHelperText>{formErrors.tipoIscrizione}</FormHelperText>
              </FormControl>
            </Stack>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          {/* Documenti */}
          <Box className="form-section">
            <Typography variant="h5" component="h2" className="section-title">
              Documenti
            </Typography>
            
            <Alert 
              severity="info" 
              sx={{ mb: 3, maxWidth: '500px', margin: '0 auto' }}
              icon={<ErrorOutline />}
            >
              Carica i documenti in formato JPG, PNG o PDF. Le immagini verranno automaticamente ottimizzate.
              Dimensione massima 10MB per file.
            </Alert>
            
            <Stack spacing={3} sx={{ maxWidth: '500px', margin: '0 auto' }}>
              {/* Carta d'identità FRONTE */}
              <Box>
                <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
                  Carta d'identità - FRONTE
                </Typography>
                <input
                  id="file-cartaIdentitaFronte"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/heic,image/heif,application/pdf"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, 'cartaIdentitaFronte')}
                />
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  color={fileErrors.cartaIdentitaFronte ? "error" : files.cartaIdentitaFronte ? "success" : "primary"}
                  onClick={() => triggerFileInput('cartaIdentitaFronte')}
                  startIcon={<UploadFile />}
                  sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
                >
                  {files.cartaIdentitaFronte ? `Caricato: ${files.cartaIdentitaFronte.name}` : 'Carica fronte carta d\'identità'}
                </Button>
                {fileErrors.cartaIdentitaFronte && (
                  <FormHelperText error>{fileErrors.cartaIdentitaFronte}</FormHelperText>
                )}
              </Box>
              
              {/* Carta d'identità RETRO */}
              <Box>
                <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
                  Carta d'identità - RETRO
                </Typography>
                <input
                  id="file-cartaIdentitaRetro"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/heic,image/heif,application/pdf"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, 'cartaIdentitaRetro')}
                />
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  color={fileErrors.cartaIdentitaRetro ? "error" : files.cartaIdentitaRetro ? "success" : "primary"}
                  onClick={() => triggerFileInput('cartaIdentitaRetro')}
                  startIcon={<UploadFile />}
                  sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
                >
                  {files.cartaIdentitaRetro ? `Caricato: ${files.cartaIdentitaRetro.name}` : 'Carica retro carta d\'identità'}
                </Button>
                {fileErrors.cartaIdentitaRetro && (
                  <FormHelperText error>{fileErrors.cartaIdentitaRetro}</FormHelperText>
                )}
              </Box>
              
              <Box>
                <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
                  Visita medica
                </Typography>
                <input
                  id="file-visitaMedica"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/heic,image/heif,application/pdf"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, 'visitaMedica')}
                />
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  color={fileErrors.visitaMedica ? "error" : files.visitaMedica ? "success" : "primary"}
                  onClick={() => triggerFileInput('visitaMedica')}
                  startIcon={<UploadFile />}
                  sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
                >
                  {files.visitaMedica ? `Caricato: ${files.visitaMedica.name}` : 'Carica visita medica'}
                </Button>
                {fileErrors.visitaMedica && (
                  <FormHelperText error>{fileErrors.visitaMedica}</FormHelperText>
                )}
              </Box>
              
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
                  <DatePicker
                    label="Data scadenza visita medica"
                    value={formData.dataScadenzaVisita}
                    onChange={(date) => handleSpecialChange('dataScadenzaVisita', date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error: !!formErrors.dataScadenzaVisita,
                        helperText: formErrors.dataScadenzaVisita || "Inserisci la data di scadenza riportata sul documento",
                        InputProps: {
                          startAdornment: <CalendarMonth color="action" sx={{ mr: 1 }} />
                        }
                      }
                    }}
                    minDate={dayjs()}
                  />
                </LocalizationProvider>
              </Box>
              
              <Box>
                <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
                  Modulo richiesta tesseramento (compilato e firmato)
                </Typography>
                <input
                  id="file-moduloTesseramento"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/heic,image/heif,application/pdf"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, 'moduloTesseramento')}
                />
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  color={fileErrors.moduloTesseramento ? "error" : files.moduloTesseramento ? "success" : "primary"}
                  onClick={() => triggerFileInput('moduloTesseramento')}
                  startIcon={<UploadFile />}
                  sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
                >
                  {files.moduloTesseramento ? `Caricato: ${files.moduloTesseramento.name}` : 'Carica modulo tesseramento'}
                </Button>
                {fileErrors.moduloTesseramento && (
                  <FormHelperText error>{fileErrors.moduloTesseramento}</FormHelperText>
                )}
              </Box>
              
              <Box>
                <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
                  Ricevuta pagamento
                </Typography>
                <input
                  id="file-ricevutaPagamento"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/heic,image/heif,application/pdf"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, 'ricevutaPagamento')}
                />
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  color={fileErrors.ricevutaPagamento ? "error" : files.ricevutaPagamento ? "success" : "primary"}
                  onClick={() => triggerFileInput('ricevutaPagamento')}
                  startIcon={<ReceiptLong />}
                  sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
                >
                  {files.ricevutaPagamento ? `Caricato: ${files.ricevutaPagamento.name}` : 'Carica ricevuta pagamento'}
                </Button>
                {fileErrors.ricevutaPagamento && (
                  <FormHelperText error>{fileErrors.ricevutaPagamento}</FormHelperText>
                )}
              </Box>
              
              <Box>
                <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 1 }}>
                  Foto personale (stile fototessera)
                </Typography>
                <input
                  id="file-fotoPersonale"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/heic,image/heif"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, 'fotoPersonale')}
                />
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  color={fileErrors.fotoPersonale ? "error" : files.fotoPersonale ? "success" : "primary"}
                  onClick={() => triggerFileInput('fotoPersonale')}
                  startIcon={<CameraAlt />}
                  sx={{ justifyContent: 'flex-start', py: 1.5, mb: 0.5 }}
                >
                  {files.fotoPersonale ? `Caricato: ${files.fotoPersonale.name}` : 'Carica foto personale'}
                </Button>
                {fileErrors.fotoPersonale && (
                  <FormHelperText error>{fileErrors.fotoPersonale}</FormHelperText>
                )}
              </Box>
              
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="accettoPrivacy"
                      checked={formData.accettoPrivacy}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Accetto la privacy policy e il trattamento dei dati personali"
                />
                {formErrors.accettoPrivacy && (
                  <FormHelperText error>{formErrors.accettoPrivacy}</FormHelperText>
                )}
              </FormGroup>

              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="mondiali"
                      checked={formData.mondiali}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Desidero iscrivermi alla squadra per Europei/Mondiali"
                />
               
              </FormGroup>  

            </Stack>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<Send />}
              disabled={loading}
              className="submit-button"
              sx={{ maxWidth: '500px', width: '100%' }}
            >
              {loading ? 'Invio in corso...' : 'Invia Iscrizione'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default FormIscrizioneSemplice;
          