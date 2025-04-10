import React, { useState, useEffect, useCallback } from "react";
import { debounce } from 'lodash';
import { createClient } from '@supabase/supabase-js';
import imageCompression from 'browser-image-compression';
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
  Autocomplete,
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
  CheckCircle as CheckCircleOutline
} from '@mui/icons-material';

import './FormIscrizione.css';

// Configurazione Supabase
const supabaseUrl = 'https://guoicoktnwrvzsynrfdf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1b2ljb2t0bndydnpzeW5yZmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDIzODIsImV4cCI6MjA1OTg3ODM4Mn0.RmaA7PBCuJssRDl1ee0_VT7A1h5YkZMFzf0MqtlB4K4';
const supabase = createClient(supabaseUrl, supabaseKey);


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
    cartaIdentitaFronte: false,  // Modificato
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
    accettoPrivacy: false
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
        console.log('Posizioni selezionate:', newValue); // Debug
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

  // Gestione speciale per campi speciali come MultiSelect e DatePicker
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

  // Gestione dei file
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // Se il file è maggiore di 10MB
        setFileErrors(prev => ({
          ...prev,
          [fieldName]: 'Il file non deve superare i 10MB'
        }));
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
    }
  };

  // Gestione dell'upload dei file personalizzato
  const triggerFileInput = (fieldName) => {
    const fileInput = document.getElementById(`file-${fieldName}`);
    if (fileInput) {
      fileInput.click();
    }
  };

  // Compressione immagini
  const compressImage = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      return file;
    }
    
    try {
      const options = {
        maxSizeMB: 0.5, // Massimo 0.5MB
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        initialQuality: 0.7,
      };
      
      // Per foto personale, usa qualità migliore
      if (file.name.includes('fotoPersonale')) {
        options.maxSizeMB = 0.5;
        options.initialQuality = 0.85;
        options.maxWidthOrHeight = 800; // Risoluzione sufficiente per un volto

      }
      
      const compressedFile = await imageCompression(file, options);
      console.log(`Compressione: ${file.size/1024}KB -> ${compressedFile.size/1024}KB`);
      
      return compressedFile;
    } catch (error) {
      console.error('Errore compressione:', error);
      return file;
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
    const newFileErrors = {...fileErrors};
    
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
    
    return valid;
  };

  // Invio del form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validazione
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setLoading(true);
    setProgress(0);
    setError('');
    
   // Modifica nella funzione handleSubmit
try {
    // Upload dei file
    const urls = {};
    const totalFiles = Object.keys(files).length;
    let completedFiles = 0;
    
    // Crea un nome cartella basato su nome e cognome
    const folderName = `${formData.nome.trim()}_${formData.cognome.trim()}`
      .toLowerCase()                // Converti in minuscolo
      .replace(/\s+/g, '_')         // Sostituisci spazi con underscore
      .replace(/[^a-z0-9_]/g, '');  // Rimuovi caratteri speciali
    
    for (const [key, file] of Object.entries(files)) {
      // Comprimi il file se è un'immagine
      const fileToUpload = await compressImage(file);
      
      // Costruisci percorso del file
      const timestamp = Date.now();
      const fileName = `${timestamp}_${key}`;
      const fileExtension = fileToUpload.name.split('.').pop();
      const filePath = `${folderName}/${fileName}.${fileExtension}`;
      
      console.log(`Tentativo di upload a: ${filePath}`);
      
      // Upload a Supabase
      const { data, error } = await supabase.storage
        .from('documents') // Assicurati che il bucket sia corretto
        .upload(filePath, fileToUpload, {
          cacheControl: '3600',
          upsert: false
        });
        
      if (error) {
        console.error(`Errore upload ${key}:`, error);
        throw error;
      }
      
      console.log(`File ${key} caricato con successo:`, data);
      
      // Ottieni URL pubblico
      const { data: publicUrlData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);
      
      urls[`${key}Url`] = publicUrlData.publicUrl;
      
      // Aggiorna progresso
      completedFiles++;
      setProgress(Math.round((completedFiles / totalFiles) * 100));
    }
    
    // Resto del codice per salvare nel database...
      
      // Salva dati nel database
      const { error: dbError } = await supabase
        .from('iscrizioni')
        .insert([{
          ...formData,
          email: formData.email.toLowerCase(),
          dataNascita: formData.dataNascita ? dayjs(formData.dataNascita).format('YYYY-MM-DD') : null,
          dataScadenzaVisita: formData.dataScadenzaVisita ? dayjs(formData.dataScadenzaVisita).format('YYYY-MM-DD') : null,
          dataIscrizione: new Date().toISOString(),
          ...urls
        }]);
        
      if (dbError) throw dbError;
      
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
        accettoPrivacy: false
      });
      
      setFiles({
        cartaIdentita: null,
        visitaMedica: null,
        moduloTesseramento: null,
        ricevutaPagamento: null,
        fotoPersonale: null
      });
      
    } catch (error) {
      console.error('Errore invio form:', error);
      setError(error.message || 'Si è verificato un errore durante l\'invio');
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
          <li>carta d'identità</li>
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
              Caricamento documenti: {progress}%
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
  
  <Alert severity="info" sx={{ mb: 3, maxWidth: '500px', margin: '0 auto' }}>
    Carica tutti i documenti richiesti in formato JPG, PNG o PDF. Dimensione massima 10MB per file.
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
        accept="image/png,image/jpeg,image/jpg,application/pdf"
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
        accept="image/png,image/jpeg,image/jpg,application/pdf"
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
        accept="image/png,image/jpeg,image/jpg,application/pdf"
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
        accept="image/png,image/jpeg,image/jpg,application/pdf"
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
        accept="image/png,image/jpeg,image/jpg,application/pdf"
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
        accept="image/png,image/jpeg,image/jpg"
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