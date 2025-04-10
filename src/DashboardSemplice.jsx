// DashboardSemplice.jsx - Versione corretta
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  TextField,
  Button,
  Modal,
  Box,
  CircularProgress,
  Alert,
  Stack,
  Checkbox,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  TableContainer,
  Chip,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Divider,
  Tooltip,
  Switch
} from '@mui/material';
import { createClient } from '@supabase/supabase-js';
import { 
  FilterList, 
  GetApp, 
  ViewColumn, 
  Close, 
  Refresh, 
  Search,
  MoreVert,
  KeyboardArrowDown,
  KeyboardArrowUp,
  FileDownload,
  Assignment
} from '@mui/icons-material';
import * as XLSX from 'xlsx';

// Configurazione Supabase
const supabaseUrl = 'https://guoicoktnwrvzsynrfdf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1b2ljb2t0bndydnpzeW5yZmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDIzODIsImV4cCI6MjA1OTg3ODM4Mn0.RmaA7PBCuJssRDl1ee0_VT7A1h5YkZMFzf0MqtlB4K4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Lista di tutte le colonne possibili
const ALL_COLUMNS = [
  { id: 'numero_progressivo', label: 'N° Progressivo', defaultVisible: true },
  { id: 'nome', label: 'Nome', defaultVisible: true },
  { id: 'cognome', label: 'Cognome', defaultVisible: true },
  { id: 'email', label: 'Email', defaultVisible: true },
  { id: 'cellulare', label: 'Cellulare', defaultVisible: false },
  { id: 'indirizzo', label: 'Indirizzo', defaultVisible: false },
  { id: 'comune', label: 'Comune', defaultVisible: false },
  { id: 'cap', label: 'CAP', defaultVisible: false },
  { id: 'dataNascita', label: 'Data Nascita', defaultVisible: false },
  { id: 'altezza', label: 'Altezza', defaultVisible: false },
  { id: 'peso', label: 'Peso', defaultVisible: false },
  { id: 'posizioneBarca', label: 'Posizione Barca', defaultVisible: false },
  { id: 'tagliaShirt', label: 'Taglia T-Shirt', defaultVisible: false },
  { id: 'tagliaCostume', label: 'Taglia Costume', defaultVisible: false },
  { id: 'squadra', label: 'Squadra', defaultVisible: true },
  { id: 'tipoIscrizione', label: 'Tipo Iscrizione', defaultVisible: false },
  { id: 'dataScadenzaVisita', label: 'Scadenza Visita', defaultVisible: false },
  { id: 'dataIscrizione', label: 'Data Iscrizione', defaultVisible: true },
];

const DashboardSemplice = () => {
  const [iscrizioni, setIscrizioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIscrizione, setSelectedIscrizione] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [columnFilters, setColumnFilters] = useState({});
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [currentFilterColumn, setCurrentFilterColumn] = useState('');
  
  // Inizializza le colonne visibili in base ai valori predefiniti
  const defaultVisibleColumns = ALL_COLUMNS.reduce((acc, column) => {
    acc[column.id] = column.defaultVisible;
    return acc;
  }, {});
  
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [showAllColumns, setShowAllColumns] = useState(false);
  const [anchorElColumns, setAnchorElColumns] = useState(null);
  
  // Check if screen is mobile
  const isMobile = useMediaQuery('(max-width:600px)');
  
  useEffect(() => {
    fetchIscrizioni();
  }, []);
  
  // Effetto per aggiornare le colonne visibili quando showAllColumns cambia
  useEffect(() => {
    if (showAllColumns) {
      // Mostra tutte le colonne
      const allColumnsVisible = ALL_COLUMNS.reduce((acc, column) => {
        acc[column.id] = true;
        return acc;
      }, {});
      setVisibleColumns(allColumnsVisible);
    } else {
      // Mostra solo le colonne predefinite
      setVisibleColumns(defaultVisibleColumns);
    }
  }, [showAllColumns]);
  
  const fetchIscrizioni = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('iscrizioni')
        .select('*')
        .order('dataIscrizione', { ascending: false });
        
      if (error) throw error;
      
      setIscrizioni(data || []);
    } catch (err) {
      console.error('Errore recupero iscrizioni:', err);
      setError('Impossibile caricare i dati');
    } finally {
      setLoading(false);
    }
  };
  
  const handleOpenDetails = (iscrizione) => {
    setSelectedIscrizione(iscrizione);
    setOpenModal(true);
  };
  
  const handleCloseDetails = () => {
    setOpenModal(false);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/D';
    return new Date(dateString).toLocaleDateString('it-IT');
  };
  
  // Gestione dei filtri per colonna
  const handleOpenFilter = (event, column) => {
    setAnchorElFilter(event.currentTarget);
    setCurrentFilterColumn(column);
  };
  
  const handleCloseFilter = () => {
    setAnchorElFilter(null);
    setCurrentFilterColumn('');
  };
  
  const handleApplyFilter = (value) => {
    if (value) {
      setColumnFilters(prev => ({
        ...prev,
        [currentFilterColumn]: value
      }));
    }
    handleCloseFilter();
  };
  
  const handleClearFilter = (column) => {
    const newFilters = {...columnFilters};
    delete newFilters[column];
    setColumnFilters(newFilters);
  };
  
  const handleClearAllFilters = () => {
    setColumnFilters({});
    setSearchTerm('');
  };
  
  // Gestione colonne visibili
  const handleToggleColumnVisibility = (column) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };
  
  const handleToggleAllColumns = () => {
    setShowAllColumns(prev => !prev);
  };
  
  const handleOpenColumnsMenu = (event) => {
    setAnchorElColumns(event.currentTarget);
  };
  
  const handleCloseColumnsMenu = () => {
    setAnchorElColumns(null);
  };
  
  // Esportazione dati in Excel
  const exportToExcel = () => {
    const dataToExport = filteredIscrizioni.map(i => {
      // Crea l'oggetto base con tutti i dati
      const exportItem = {
        'Numero Progressivo': i.numero_progressivo ? String(i.numero_progressivo).padStart(3, '0') : 'N/D',
        'Nome': i.nome || '',
        'Cognome': i.cognome || '',
        'Email': i.email || '',
        'Cellulare': i.cellulare || '',
        'Indirizzo': i.indirizzo || '',
        'Comune': i.comune || '',
        'CAP': i.cap || '',
        'Data Nascita': formatDate(i.dataNascita),
        'Altezza (cm)': i.altezza || '',
        'Peso (kg)': i.peso || '',
        'Posizione Barca': Array.isArray(i.posizioneBarca) 
          ? i.posizioneBarca.map(pos => 
              pos === 'destro' ? 'Destro/a' :
              pos === 'sinistro' ? 'Sinistro/a' :
              pos === 'tamburina' ? 'Tamburina' :
              pos === 'timoniere' ? 'Timoniere' : pos
            ).join(', ') 
          : 'N/D',
        'Taglia T-Shirt': i.tagliaShirt?.toUpperCase() || 'N/D',
        'Taglia Costume': i.tagliaCostume?.toUpperCase() || 'N/D',
        'Squadra': i.squadra === 'dragon_pine' ? 'Dragon Piné' :
                  i.squadra === 'pine_sharks' ? 'Piné Sharks' :
                  i.squadra === 'dragon_flames' ? 'Dragon Flames' :
                  i.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D',
        'Tipo Iscrizione': i.tipoIscrizione === 'atleta' ? 'Atleta' :
                          i.tipoIscrizione === 'socio' ? 'Socio' :
                          i.tipoIscrizione === 'atleta_socio' ? 'Atleta e Socio' : 'N/D',
        'Scadenza Visita': formatDate(i.dataScadenzaVisita),
        'Data Iscrizione': formatDate(i.dataIscrizione),
      };
      
      // Aggiungi URLs dei documenti
      exportItem['URL Carta Identità'] = i.cartaIdentitaUrl || '';
      exportItem['URL Visita Medica'] = i.visitaMedicaUrl || '';
      exportItem['URL Modulo Tesseramento'] = i.moduloTesseramentoUrl || '';
      exportItem['URL Ricevuta Pagamento'] = i.ricevutaPagamentoUrl || '';
      exportItem['URL Foto Personale'] = i.fotoPersonaleUrl || '';
      
      return exportItem;
    });
    
    // Crea il foglio di lavoro
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    
    // Aggiungi hyperlink alle celle con URL
    for (let i = 0; i < dataToExport.length; i++) {
      const rowIndex = i + 1; // +1 perché la riga 0 è l'intestazione
      
      // Per ogni campo URL
      ['URL Carta Identità', 'URL Visita Medica', 'URL Modulo Tesseramento', 'URL Ricevuta Pagamento', 'URL Foto Personale'].forEach(field => {
        if (dataToExport[i][field]) {
          // Calcola l'indirizzo cella
          const colIndex = Object.keys(dataToExport[i]).indexOf(field);
          const cellRef = XLSX.utils.encode_cell({r: rowIndex, c: colIndex});
          
          // Se non esiste l'oggetto Hyperlink
          if (!worksheet.Workbook) worksheet.Workbook = {};
          if (!worksheet.Workbook.Sheets) worksheet.Workbook.Sheets = {};
          if (!worksheet.Workbook.Sheets[0]) worksheet.Workbook.Sheets[0] = {};
          if (!worksheet.Workbook.Sheets[0].Hyperlinks) worksheet.Workbook.Sheets[0].Hyperlinks = [];
          
          // Aggiungi l'hyperlink
          worksheet.Workbook.Sheets[0].Hyperlinks.push({
            ref: cellRef,
            target: dataToExport[i][field],
            tooltip: `Apri ${field}`
          });
          
          // Formatta il testo in blu e sottolineato
          if (!worksheet.s) worksheet.s = {};
          worksheet.s[cellRef] = {
            font: { color: { rgb: "0000FF" }, underline: true }
          };
        }
      });
    }
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Iscrizioni");
    
    // Genera il file Excel
    XLSX.writeFile(workbook, "Iscrizioni_Dragon_Pine.xlsx");
  };
  
  // Filtraggio dati - Correzione per i filtri
  const filteredIscrizioni = useMemo(() => {
    return iscrizioni.filter(iscrizione => {
      // Filtro di ricerca generale
      const matchesSearch = searchTerm === '' || 
        (iscrizione.nome && iscrizione.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (iscrizione.cognome && iscrizione.cognome.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (iscrizione.email && iscrizione.email.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filtri per colonna
      const matchesColumnFilters = Object.entries(columnFilters).every(([column, filterValue]) => {
        if (!filterValue) return true;
        
        // Assicurati che filterValue sia una stringa e converti in lowercase
        const filterValueLower = String(filterValue).toLowerCase();
        
        // Gestisci ogni colonna in modo specifico
        switch(column) {
          case 'numero_progressivo':
            return iscrizione.numero_progressivo && 
                   String(iscrizione.numero_progressivo).includes(filterValue);
          
          case 'nome':
            return iscrizione.nome && 
                   iscrizione.nome.toLowerCase().includes(filterValueLower);
          
          case 'cognome':
            return iscrizione.cognome && 
                   iscrizione.cognome.toLowerCase().includes(filterValueLower);
          
          case 'email':
            return iscrizione.email && 
                   iscrizione.email.toLowerCase().includes(filterValueLower);
          
          case 'cellulare':
            return iscrizione.cellulare && 
                   iscrizione.cellulare.toLowerCase().includes(filterValueLower);
          
          case 'squadra':
            // Converti il valore squadra in etichetta leggibile
            const squadraLabel = iscrizione.squadra === 'dragon_pine' ? 'Dragon Piné' :
                               iscrizione.squadra === 'pine_sharks' ? 'Piné Sharks' :
                               iscrizione.squadra === 'dragon_flames' ? 'Dragon Flames' :
                               iscrizione.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D';
            return squadraLabel.toLowerCase().includes(filterValueLower);
          
          case 'dataIscrizione':
            return formatDate(iscrizione.dataIscrizione).toLowerCase().includes(filterValueLower);
          
          default:
            // Per tutte le altre colonne
            return iscrizione[column] && 
                   String(iscrizione[column]).toLowerCase().includes(filterValueLower);
        }
      });
      
      return matchesSearch && matchesColumnFilters;
    });
  }, [iscrizioni, searchTerm, columnFilters]);
  
  // Numero di filtri attivi
  const activeFiltersCount = Object.keys(columnFilters).length + (searchTerm ? 1 : 0);
  
  // Renderizzazione mobile delle iscrizioni (card layout)
  // Versione migliorata del MobileView che mostra più informazioni quando showAllColumns è true
const MobileView = () => (
    <Box>
      {filteredIscrizioni.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography>Nessuna iscrizione trovata</Typography>
        </Paper>
      ) : (
        filteredIscrizioni.map((iscrizione) => (
          <Card key={iscrizione.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {iscrizione.numero_progressivo 
                  ? `#${String(iscrizione.numero_progressivo).padStart(3, '0')} - ` 
                  : ''}{iscrizione.nome} {iscrizione.cognome}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {iscrizione.email}
              </Typography>
              
              <Divider sx={{ my: 1 }} />
              
              <Grid container spacing={1}>
                {/* Prima riga di informazioni - sempre visibili */}
                {visibleColumns.squadra && (
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Squadra</Typography>
                    <Typography variant="body2">
                      {iscrizione.squadra === 'dragon_pine' ? 'Dragon Piné' :
                       iscrizione.squadra === 'pine_sharks' ? 'Piné Sharks' :
                       iscrizione.squadra === 'dragon_flames' ? 'Dragon Flames' :
                       iscrizione.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D'}
                    </Typography>
                  </Grid>
                )}
                
                {visibleColumns.dataIscrizione && (
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Data Iscrizione</Typography>
                    <Typography variant="body2">{formatDate(iscrizione.dataIscrizione)}</Typography>
                  </Grid>
                )}
                
                {visibleColumns.cellulare && (
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Cellulare</Typography>
                    <Typography variant="body2">{iscrizione.cellulare || 'N/D'}</Typography>
                  </Grid>
                )}
                
                {visibleColumns.tipoIscrizione && (
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Tipo</Typography>
                    <Typography variant="body2">
                      {iscrizione.tipoIscrizione === 'atleta' ? 'Atleta' :
                       iscrizione.tipoIscrizione === 'socio' ? 'Socio' :
                       iscrizione.tipoIscrizione === 'atleta_socio' ? 'Atleta e Socio' : 'N/D'}
                    </Typography>
                  </Grid>
                )}
                
                {/* Contenuto espandibile quando "Tutte le colonne" è attivo */}
                {showAllColumns && (
                  <>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                    </Grid>
                    
                    {/* Indirizzo completo */}
                    <Grid item xs={12}>
                      <Typography variant="caption" color="text.secondary">Indirizzo</Typography>
                      <Typography variant="body2">
                        {iscrizione.indirizzo || 'N/D'}{iscrizione.comune ? `, ${iscrizione.comune}` : ''}{iscrizione.cap ? ` (${iscrizione.cap})` : ''}
                      </Typography>
                    </Grid>
                    
                    {/* Data di nascita e dettagli fisici */}
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">Data Nascita</Typography>
                      <Typography variant="body2">{formatDate(iscrizione.dataNascita)}</Typography>
                    </Grid>
                    
                    <Grid item xs={3}>
                      <Typography variant="caption" color="text.secondary">Altezza</Typography>
                      <Typography variant="body2">{iscrizione.altezza || 'N/D'} cm</Typography>
                    </Grid>
                    
                    <Grid item xs={3}>
                      <Typography variant="caption" color="text.secondary">Peso</Typography>
                      <Typography variant="body2">{iscrizione.peso || 'N/D'} kg</Typography>
                    </Grid>
                    
                    {/* Taglie e posizione barca */}
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">Taglia T-Shirt</Typography>
                      <Typography variant="body2">{iscrizione.tagliaShirt?.toUpperCase() || 'N/D'}</Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">Taglia Costume</Typography>
                      <Typography variant="body2">{iscrizione.tagliaCostume?.toUpperCase() || 'N/D'}</Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="caption" color="text.secondary">Posizione in barca</Typography>
                      <Typography variant="body2">
                        {Array.isArray(iscrizione.posizioneBarca) 
                          ? iscrizione.posizioneBarca.map(pos => 
                              pos === 'destro' ? 'Destro/a' :
                              pos === 'sinistro' ? 'Sinistro/a' :
                              pos === 'tamburina' ? 'Tamburina' :
                              pos === 'timoniere' ? 'Timoniere' : pos
                            ).join(', ') 
                          : 'N/D'}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="caption" color="text.secondary">Scadenza Visita</Typography>
                      <Typography variant="body2">{formatDate(iscrizione.dataScadenzaVisita)}</Typography>
                    </Grid>
                  </>
                )}
              </Grid>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {showAllColumns && (
                  <Typography variant="caption" color="text.secondary">
                    Visualizzazione completa
                  </Typography>
                )}
                <Button 
                  variant="contained" 
                  size="small" 
                  onClick={() => handleOpenDetails(iscrizione)}
                  sx={{ ml: 'auto' }}
                >
                  Dettagli
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
  
  // Funzione per renderizzare una cella di tabella con filtro
  const renderFilterableColumn = (column, label, renderValue) => {
    if (!visibleColumns[column]) return null;
    
    return (
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {label}
          <IconButton size="small" onClick={(e) => handleOpenFilter(e, column)}>
            <FilterList fontSize="small" />
          </IconButton>
          {columnFilters[column] && (
            <Chip 
              size="small" 
              label={columnFilters[column]} 
              onDelete={() => handleClearFilter(column)}
              sx={{ ml: 1 }}
            />
          )}
        </Box>
      </TableCell>
    );
  };
  
  // Renderizzazione desktop delle iscrizioni (tabella)
  const DesktopView = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {ALL_COLUMNS.map(column => {
              if (!visibleColumns[column.id]) return null;
              
              return (
                <TableCell key={column.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {column.label}
                    <IconButton size="small" onClick={(e) => handleOpenFilter(e, column.id)}>
                      <FilterList fontSize="small" />
                    </IconButton>
                    {columnFilters[column.id] && (
                      <Chip 
                        size="small" 
                        label={columnFilters[column.id]} 
                        onDelete={() => handleClearFilter(column.id)}
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>
                </TableCell>
              );
            })}
            <TableCell>Azioni</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredIscrizioni.length === 0 ? (
            <TableRow>
              <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} align="center">
                Nessuna iscrizione trovata
              </TableCell>
            </TableRow>
          ) : (
            filteredIscrizioni.map((iscrizione) => (
              <TableRow key={iscrizione.id}>
                {visibleColumns.numero_progressivo && (
                  <TableCell>
                    {iscrizione.numero_progressivo 
                      ? String(iscrizione.numero_progressivo).padStart(3, '0') 
                      : 'N/D'}
                  </TableCell>
                )}
                
                {visibleColumns.nome && (
                  <TableCell>{iscrizione.nome}</TableCell>
                )}
                
                {visibleColumns.cognome && (
                  <TableCell>{iscrizione.cognome}</TableCell>
                )}
                
                {visibleColumns.email && (
                  <TableCell>{iscrizione.email}</TableCell>
                )}
                
                {visibleColumns.cellulare && (
                  <TableCell>{iscrizione.cellulare}</TableCell>
                )}
                
                {visibleColumns.indirizzo && (
                  <TableCell>{iscrizione.indirizzo}</TableCell>
                )}
                
                {visibleColumns.comune && (
                  <TableCell>{iscrizione.comune}</TableCell>
                )}
                
                {visibleColumns.cap && (
                  <TableCell>{iscrizione.cap}</TableCell>
                )}
                
                {visibleColumns.dataNascita && (
                  <TableCell>{formatDate(iscrizione.dataNascita)}</TableCell>
                )}
                
                {visibleColumns.altezza && (
                  <TableCell>{iscrizione.altezza} cm</TableCell>
                )}
                
                {visibleColumns.peso && (
                  <TableCell>{iscrizione.peso} kg</TableCell>
                )}
                
                {visibleColumns.posizioneBarca && (
                  <TableCell>
                    {Array.isArray(iscrizione.posizioneBarca) 
                      ? iscrizione.posizioneBarca.map(pos => 
                          pos === 'destro' ? 'Destro/a' :
                          pos === 'sinistro' ? 'Sinistro/a' :
                          pos === 'tamburina' ? 'Tamburina' :
                          pos === 'timoniere' ? 'Timoniere' : pos
                        ).join(', ') 
                      : 'N/D'}
                  </TableCell>
                )}
                
                {visibleColumns.tagliaShirt && (
                  <TableCell>{iscrizione.tagliaShirt?.toUpperCase() || 'N/D'}</TableCell>
                )}
                
                {visibleColumns.tagliaCostume && (
                  <TableCell>{iscrizione.tagliaCostume?.toUpperCase() || 'N/D'}</TableCell>
                )}
                
                {visibleColumns.squadra && (
                  <TableCell>
                    {iscrizione.squadra === 'dragon_pine' ? 'Dragon Piné' :
                     iscrizione.squadra === 'pine_sharks' ? 'Piné Sharks' :
                     iscrizione.squadra === 'dragon_flames' ? 'Dragon Flames' :
                     iscrizione.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D'}
                  </TableCell>
                )}
                
                {visibleColumns.tipoIscrizione && (
                  <TableCell>
                    {iscrizione.tipoIscrizione === 'atleta' ? 'Atleta' :
                     iscrizione.tipoIscrizione === 'socio' ? 'Socio' :
                     iscrizione.tipoIscrizione === 'atleta_socio' ? 'Atleta e Socio' : 'N/D'}
                  </TableCell>
                )}
                
                {visibleColumns.dataScadenzaVisita && (
                  <TableCell>{formatDate(iscrizione.dataScadenzaVisita)}</TableCell>
                )}
                
                {visibleColumns.dataIscrizione && (
                  <TableCell>{formatDate(iscrizione.dataIscrizione)}</TableCell>
                )}
                
                <TableCell>
                  <Button 
                    variant="contained" 
                    size="small" 
                    onClick={() => handleOpenDetails(iscrizione)}
                  >
                    Dettagli
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Iscrizioni Dragon Piné
          <Typography variant="caption" sx={{ ml: 2, color: 'text.secondary' }}>
            ({filteredIscrizioni.length} su {iscrizioni.length})
          </Typography>
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        {/* Modifica questo blocco nella barra degli strumenti */}
<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
  <TextField
    label="Cerca"
    variant="outlined"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    fullWidth={isMobile}
    size={isMobile ? "small" : "medium"}
    InputProps={{
      startAdornment: <Search fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
      endAdornment: searchTerm ? (
        <IconButton size="small" onClick={() => setSearchTerm('')}>
          <Close fontSize="small" />
        </IconButton>
      ) : null
    }}
  />
  
  <Stack 
    direction="row" 
    spacing={1} 
    sx={{ 
      width: isMobile ? '100%' : 'auto',
      justifyContent: isMobile ? 'space-between' : 'flex-start',
      flexWrap: 'wrap'
    }}
  >
    <Button 
      variant="outlined" 
      onClick={fetchIscrizioni} 
      startIcon={<Refresh />}
      size="small"
    >
      Aggiorna
    </Button>
    
    <Button
      variant="outlined"
      onClick={exportToExcel}
      startIcon={<FileDownload />}
      size="small"
    >
      Excel
    </Button>
    
    {/* Opzione "Tutte le colonne" più evidente su mobile */}
    <Button
      variant={showAllColumns ? "contained" : "outlined"}
      color={showAllColumns ? "primary" : "default"}
      onClick={handleToggleAllColumns}
      startIcon={<ViewColumn />}
      size="small"
    >
      {showAllColumns ? "Vista Completa" : "Mostra Tutto"}
    </Button>
  </Stack>
  
  {activeFiltersCount > 0 && (
    <Button
      variant="outlined" 
      color="error"
      onClick={handleClearAllFilters}
      startIcon={<Close />}
      size="small"
      fullWidth={isMobile}
    >
      Reset filtri ({activeFiltersCount})
    </Button>
  )}
</Stack>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {isMobile ? <MobileView /> : <DesktopView />}
          </>
        )}
      </Paper>
      
      {/* Popover per filtri colonna */}
      <Popover
        open={Boolean(anchorElFilter)}
        anchorEl={anchorElFilter}
        onClose={handleCloseFilter}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, width: 250 }}>
          <Typography variant="subtitle2" gutterBottom>
            Filtra {ALL_COLUMNS.find(col => col.id === currentFilterColumn)?.label || ''}
          </Typography>
          <TextField
            autoFocus
            placeholder="Filtra..."
            fullWidth
            size="small"
            defaultValue={columnFilters[currentFilterColumn] || ''}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleApplyFilter(e.target.value);
              }
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button size="small" onClick={handleCloseFilter} sx={{ mr: 1 }}>
              Annulla
            </Button>
            <Button 
              size="small" 
              variant="contained" 
              onClick={(e) => {
                const inputField = e.target.closest('.MuiPopover-root').querySelector('input');
                handleApplyFilter(inputField.value);
              }}
            >
              Applica
            </Button>
          </Box>
        </Box>
      </Popover>
      
      {/* Modal dettagli iscrizione */}
           {/* Modal dettagli iscrizione */}
           <Modal
        open={openModal}
        onClose={handleCloseDetails}
        aria-labelledby="dettagli-iscrizione"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '95%' : 600,
          maxHeight: '90vh',
          overflow: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: isMobile ? 2 : 4,
        }}>
          {selectedIscrizione && (
            <>
              <Typography variant="h5" gutterBottom>
                N° {selectedIscrizione.numero_progressivo 
                    ? String(selectedIscrizione.numero_progressivo).padStart(3, '0') 
                    : 'N/D'} - {selectedIscrizione.nome} {selectedIscrizione.cognome}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mt: 3, mb: 1, borderBottom: '1px solid #eee', pb: 1 }}>
                  Dati Personali
                </Typography>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" width="40%">Email:</TableCell>
                      <TableCell>{selectedIscrizione.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Cellulare:</TableCell>
                      <TableCell>{selectedIscrizione.cellulare}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Indirizzo:</TableCell>
                      <TableCell>
                        {selectedIscrizione.indirizzo}, {selectedIscrizione.comune} ({selectedIscrizione.cap})
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Data di nascita:</TableCell>
                      <TableCell>{formatDate(selectedIscrizione.dataNascita)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <Typography variant="h6" sx={{ mt: 3, mb: 1, borderBottom: '1px solid #eee', pb: 1 }}>
                  Dati Sportivi
                </Typography>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" width="40%">Altezza:</TableCell>
                      <TableCell>{selectedIscrizione.altezza} cm</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Peso:</TableCell>
                      <TableCell>{selectedIscrizione.peso} kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Posizione in barca:</TableCell>
                      <TableCell>
                        {Array.isArray(selectedIscrizione.posizioneBarca) 
                          ? selectedIscrizione.posizioneBarca.map(pos => 
                              pos === 'destro' ? 'Destro/a' :
                              pos === 'sinistro' ? 'Sinistro/a' :
                              pos === 'tamburina' ? 'Tamburina' :
                              pos === 'timoniere' ? 'Timoniere' : pos
                            ).join(', ') 
                          : 'N/D'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Taglia T-Shirt:</TableCell>
                      <TableCell>{selectedIscrizione.tagliaShirt?.toUpperCase() || 'N/D'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Taglia Costume:</TableCell>
                      <TableCell>{selectedIscrizione.tagliaCostume?.toUpperCase() || 'N/D'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Squadra:</TableCell>
                      <TableCell>
                        {selectedIscrizione.squadra === 'dragon_pine' ? 'Dragon Piné' :
                         selectedIscrizione.squadra === 'pine_sharks' ? 'Piné Sharks' :
                         selectedIscrizione.squadra === 'dragon_flames' ? 'Dragon Flames' :
                         selectedIscrizione.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Tipo iscrizione:</TableCell>
                      <TableCell>
                        {selectedIscrizione.tipoIscrizione === 'atleta' ? 'Atleta' :
                         selectedIscrizione.tipoIscrizione === 'socio' ? 'Socio' :
                         selectedIscrizione.tipoIscrizione === 'atleta_socio' ? 'Atleta e Socio' : 'N/D'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Scadenza visita:</TableCell>
                      <TableCell>{formatDate(selectedIscrizione.dataScadenzaVisita)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <Typography variant="h6" sx={{ mt: 3, mb: 1, borderBottom: '1px solid #eee', pb: 1 }}>
                  Documenti
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                {selectedIscrizione.cartaIdentitaFronteUrl && (
                        <Button 
                        variant="outlined" 
                        color="primary"
                        href={selectedIscrizione.cartaIdentitaFronteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<FileDownload />}
                        fullWidth={isMobile}
                        >
                        Carta d'identità (fronte)
                        </Button>
                    )}
                    
                    {selectedIscrizione.cartaIdentitaRetroUrl && (
                        <Button 
                        variant="outlined" 
                        color="primary"
                        href={selectedIscrizione.cartaIdentitaRetroUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<FileDownload />}
                        fullWidth={isMobile}
                        >
                        Carta d'identità (retro)
                        </Button>
                    )}
                  
                  {selectedIscrizione.visitaMedicaUrl && (
                    <Button 
                      variant="outlined" 
                      color="primary"
                      href={selectedIscrizione.visitaMedicaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<FileDownload />}
                      fullWidth={isMobile}
                    >
                      Visita medica
                    </Button>
                  )}
                  
                  {selectedIscrizione.moduloTesseramentoUrl && (
                    <Button 
                      variant="outlined" 
                      color="primary"
                      href={selectedIscrizione.moduloTesseramentoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<FileDownload />}
                      fullWidth={isMobile}
                    >
                      Modulo tesseramento
                    </Button>
                  )}
                  
                  {selectedIscrizione.ricevutaPagamentoUrl && (
                    <Button 
                      variant="outlined" 
                      color="primary"
                      href={selectedIscrizione.ricevutaPagamentoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<FileDownload />}
                      fullWidth={isMobile}
                    >
                      Ricevuta pagamento
                    </Button>
                  )}
                  
                  {selectedIscrizione.fotoPersonaleUrl && (
                    <Button 
                      variant="outlined" 
                      color="primary"
                      href={selectedIscrizione.fotoPersonaleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<FileDownload />}
                      fullWidth={isMobile}
                    >
                      Foto personale
                    </Button>
                  )}

                  {/* Mostra anteprima della foto personale */}
                  {selectedIscrizione.fotoPersonaleUrl && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Anteprima foto personale
                      </Typography>
                      <Box 
                        component="img" 
                        src={selectedIscrizione.fotoPersonaleUrl}
                        alt="Foto personale"
                        sx={{
                          maxWidth: '100%',
                          maxHeight: 200,
                          objectFit: 'contain',
                          borderRadius: 1,
                          border: '1px solid #eee'
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" onClick={handleCloseDetails}>Chiudi</Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default DashboardSemplice;