// // DashboardSemplice.jsx - Versione corretta
// import React, { useState, useEffect, useMemo } from 'react';
// import { 
//   Container, 
//   Paper, 
//   Typography, 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableRow, 
//   TextField,
//   Button,
//   Modal,
//   Box,
//   CircularProgress,
//   Alert,
//   Stack,
//   Checkbox,
//   FormControlLabel,
//   IconButton,
//   Menu,
//   MenuItem,
//   Popover,
//   TableContainer,
//   Chip,
//   useMediaQuery,
//   Card,
//   CardContent,
//   Grid,
//   Divider,
//   Tooltip,
//   Switch
// } from '@mui/material';
// import { createClient } from '@supabase/supabase-js';
// import { 
//   FilterList, 
//   GetApp, 
//   ViewColumn, 
//   Close, 
//   Refresh, 
//   Search,
//   MoreVert,
//   KeyboardArrowDown,
//   KeyboardArrowUp,
//   FileDownload,
//   Assignment
// } from '@mui/icons-material';
// import * as XLSX from 'xlsx';

// // Configurazione Supabase
// const supabaseUrl = 'https://guoicoktnwrvzsynrfdf.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1b2ljb2t0bndydnpzeW5yZmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDIzODIsImV4cCI6MjA1OTg3ODM4Mn0.RmaA7PBCuJssRDl1ee0_VT7A1h5YkZMFzf0MqtlB4K4';
// const supabase = createClient(supabaseUrl, supabaseKey);

// // Lista di tutte le colonne possibili
// const ALL_COLUMNS = [
//   { id: 'numero_progressivo', label: 'N° Progressivo', defaultVisible: true },
//   { id: 'nome', label: 'Nome', defaultVisible: true },
//   { id: 'cognome', label: 'Cognome', defaultVisible: true },
//   { id: 'email', label: 'Email', defaultVisible: true },
//   { id: 'cellulare', label: 'Cellulare', defaultVisible: false },
//   { id: 'indirizzo', label: 'Indirizzo', defaultVisible: false },
//   { id: 'comune', label: 'Comune', defaultVisible: false },
//   { id: 'cap', label: 'CAP', defaultVisible: false },
//   { id: 'dataNascita', label: 'Data Nascita', defaultVisible: false },
//   { id: 'altezza', label: 'Altezza', defaultVisible: false },
//   { id: 'peso', label: 'Peso', defaultVisible: false },
//   { id: 'posizioneBarca', label: 'Posizione Barca', defaultVisible: false },
//   { id: 'tagliaShirt', label: 'Taglia T-Shirt', defaultVisible: false },
//   { id: 'tagliaCostume', label: 'Taglia Costume', defaultVisible: false },
//   { id: 'squadra', label: 'Squadra', defaultVisible: true },
//   { id: 'tipoIscrizione', label: 'Tipo Iscrizione', defaultVisible: false },
//   { id: 'dataScadenzaVisita', label: 'Scadenza Visita', defaultVisible: false },
//   { id: 'dataIscrizione', label: 'Data Iscrizione', defaultVisible: true },
// ];

// const DashboardSemplice = () => {
//   const [iscrizioni, setIscrizioni] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedIscrizione, setSelectedIscrizione] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const [columnFilters, setColumnFilters] = useState({});
//   const [anchorElFilter, setAnchorElFilter] = useState(null);
//   const [currentFilterColumn, setCurrentFilterColumn] = useState('');
  
//   // Inizializza le colonne visibili in base ai valori predefiniti
//   const defaultVisibleColumns = ALL_COLUMNS.reduce((acc, column) => {
//     acc[column.id] = column.defaultVisible;
//     return acc;
//   }, {});
  
//   const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
//   const [showAllColumns, setShowAllColumns] = useState(false);
//   const [anchorElColumns, setAnchorElColumns] = useState(null);
  
//   // Check if screen is mobile
//   const isMobile = useMediaQuery('(max-width:600px)');
  
//   useEffect(() => {
//     fetchIscrizioni();
//   }, []);
  
//   // Effetto per aggiornare le colonne visibili quando showAllColumns cambia
//   useEffect(() => {
//     if (showAllColumns) {
//       // Mostra tutte le colonne
//       const allColumnsVisible = ALL_COLUMNS.reduce((acc, column) => {
//         acc[column.id] = true;
//         return acc;
//       }, {});
//       setVisibleColumns(allColumnsVisible);
//     } else {
//       // Mostra solo le colonne predefinite
//       setVisibleColumns(defaultVisibleColumns);
//     }
//   }, [showAllColumns]);
  
//   const fetchIscrizioni = async () => {
//     try {
//       setLoading(true);
      
//       const { data, error } = await supabase
//         .from('iscrizioni')
//         .select('*')
//         .order('dataIscrizione', { ascending: false });
        
//       if (error) throw error;
      
//       setIscrizioni(data || []);
//     } catch (err) {
//       console.error('Errore recupero iscrizioni:', err);
//       setError('Impossibile caricare i dati');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleOpenDetails = (iscrizione) => {
//     setSelectedIscrizione(iscrizione);
//     setOpenModal(true);
//   };
  
//   const handleCloseDetails = () => {
//     setOpenModal(false);
//   };
  
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/D';
//     return new Date(dateString).toLocaleDateString('it-IT');
//   };
  
//   // Gestione dei filtri per colonna
//   const handleOpenFilter = (event, column) => {
//     setAnchorElFilter(event.currentTarget);
//     setCurrentFilterColumn(column);
//   };
  
//   const handleCloseFilter = () => {
//     setAnchorElFilter(null);
//     setCurrentFilterColumn('');
//   };
  
//   const handleApplyFilter = (value) => {
//     if (value) {
//       setColumnFilters(prev => ({
//         ...prev,
//         [currentFilterColumn]: value
//       }));
//     }
//     handleCloseFilter();
//   };
  
//   const handleClearFilter = (column) => {
//     const newFilters = {...columnFilters};
//     delete newFilters[column];
//     setColumnFilters(newFilters);
//   };
  
//   const handleClearAllFilters = () => {
//     setColumnFilters({});
//     setSearchTerm('');
//   };
  
//   // Gestione colonne visibili
//   const handleToggleColumnVisibility = (column) => {
//     setVisibleColumns(prev => ({
//       ...prev,
//       [column]: !prev[column]
//     }));
//   };
  
//   const handleToggleAllColumns = () => {
//     setShowAllColumns(prev => !prev);
//   };
  
//   const handleOpenColumnsMenu = (event) => {
//     setAnchorElColumns(event.currentTarget);
//   };
  
//   const handleCloseColumnsMenu = () => {
//     setAnchorElColumns(null);
//   };
  
//   // Esportazione dati in Excel
//   const exportToExcel = () => {
//     const dataToExport = filteredIscrizioni.map(i => {
//       // Crea l'oggetto base con tutti i dati
//       const exportItem = {
//         'Numero Progressivo': i.numero_progressivo ? String(i.numero_progressivo).padStart(3, '0') : 'N/D',
//         'Nome': i.nome || '',
//         'Cognome': i.cognome || '',
//         'Email': i.email || '',
//         'Cellulare': i.cellulare || '',
//         'Indirizzo': i.indirizzo || '',
//         'Comune': i.comune || '',
//         'CAP': i.cap || '',
//         'Data Nascita': formatDate(i.dataNascita),
//         'Altezza (cm)': i.altezza || '',
//         'Peso (kg)': i.peso || '',
//         'Posizione Barca': Array.isArray(i.posizioneBarca) 
//           ? i.posizioneBarca.map(pos => 
//               pos === 'destro' ? 'Destro/a' :
//               pos === 'sinistro' ? 'Sinistro/a' :
//               pos === 'tamburina' ? 'Tamburina' :
//               pos === 'timoniere' ? 'Timoniere' : pos
//             ).join(', ') 
//           : 'N/D',
//         'Taglia T-Shirt': i.tagliaShirt?.toUpperCase() || 'N/D',
//         'Taglia Costume': i.tagliaCostume?.toUpperCase() || 'N/D',
//         'Squadra': i.squadra === 'dragon_pine' ? 'Dragon Piné' :
//                   i.squadra === 'pine_sharks' ? 'Piné Sharks' :
//                   i.squadra === 'dragon_flames' ? 'Dragon Flames' :
//                   i.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D',
//         'Tipo Iscrizione': i.tipoIscrizione === 'atleta' ? 'Atleta' :
//                           i.tipoIscrizione === 'socio' ? 'Socio' :
//                           i.tipoIscrizione === 'atleta_socio' ? 'Atleta e Socio' : 'N/D',
//         'Scadenza Visita': formatDate(i.dataScadenzaVisita),
//         'Data Iscrizione': formatDate(i.dataIscrizione),
//       };
      
//       // Aggiungi URLs dei documenti
//       exportItem['URL Carta Identità'] = i.cartaIdentitaUrl || '';
//       exportItem['URL Visita Medica'] = i.visitaMedicaUrl || '';
//       exportItem['URL Modulo Tesseramento'] = i.moduloTesseramentoUrl || '';
//       exportItem['URL Ricevuta Pagamento'] = i.ricevutaPagamentoUrl || '';
//       exportItem['URL Foto Personale'] = i.fotoPersonaleUrl || '';
      
//       return exportItem;
//     });
    
//     // Crea il foglio di lavoro
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    
//     // Aggiungi hyperlink alle celle con URL
//     for (let i = 0; i < dataToExport.length; i++) {
//       const rowIndex = i + 1; // +1 perché la riga 0 è l'intestazione
      
//       // Per ogni campo URL
//       ['URL Carta Identità', 'URL Visita Medica', 'URL Modulo Tesseramento', 'URL Ricevuta Pagamento', 'URL Foto Personale'].forEach(field => {
//         if (dataToExport[i][field]) {
//           // Calcola l'indirizzo cella
//           const colIndex = Object.keys(dataToExport[i]).indexOf(field);
//           const cellRef = XLSX.utils.encode_cell({r: rowIndex, c: colIndex});
          
//           // Se non esiste l'oggetto Hyperlink
//           if (!worksheet.Workbook) worksheet.Workbook = {};
//           if (!worksheet.Workbook.Sheets) worksheet.Workbook.Sheets = {};
//           if (!worksheet.Workbook.Sheets[0]) worksheet.Workbook.Sheets[0] = {};
//           if (!worksheet.Workbook.Sheets[0].Hyperlinks) worksheet.Workbook.Sheets[0].Hyperlinks = [];
          
//           // Aggiungi l'hyperlink
//           worksheet.Workbook.Sheets[0].Hyperlinks.push({
//             ref: cellRef,
//             target: dataToExport[i][field],
//             tooltip: `Apri ${field}`
//           });
          
//           // Formatta il testo in blu e sottolineato
//           if (!worksheet.s) worksheet.s = {};
//           worksheet.s[cellRef] = {
//             font: { color: { rgb: "0000FF" }, underline: true }
//           };
//         }
//       });
//     }
    
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Iscrizioni");
    
//     // Genera il file Excel
//     XLSX.writeFile(workbook, "Iscrizioni_Dragon_Pine.xlsx");
//   };
  
//   // Filtraggio dati - Correzione per i filtri
//   const filteredIscrizioni = useMemo(() => {
//     return iscrizioni.filter(iscrizione => {
//       // Filtro di ricerca generale
//       const matchesSearch = searchTerm === '' || 
//         (iscrizione.nome && iscrizione.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (iscrizione.cognome && iscrizione.cognome.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (iscrizione.email && iscrizione.email.toLowerCase().includes(searchTerm.toLowerCase()));
      
//       // Filtri per colonna
//       const matchesColumnFilters = Object.entries(columnFilters).every(([column, filterValue]) => {
//         if (!filterValue) return true;
        
//         // Assicurati che filterValue sia una stringa e converti in lowercase
//         const filterValueLower = String(filterValue).toLowerCase();
        
//         // Gestisci ogni colonna in modo specifico
//         switch(column) {
//           case 'numero_progressivo':
//             return iscrizione.numero_progressivo && 
//                    String(iscrizione.numero_progressivo).includes(filterValue);
          
//           case 'nome':
//             return iscrizione.nome && 
//                    iscrizione.nome.toLowerCase().includes(filterValueLower);
          
//           case 'cognome':
//             return iscrizione.cognome && 
//                    iscrizione.cognome.toLowerCase().includes(filterValueLower);
          
//           case 'email':
//             return iscrizione.email && 
//                    iscrizione.email.toLowerCase().includes(filterValueLower);
          
//           case 'cellulare':
//             return iscrizione.cellulare && 
//                    iscrizione.cellulare.toLowerCase().includes(filterValueLower);
          
//           case 'squadra':
//             // Converti il valore squadra in etichetta leggibile
//             const squadraLabel = iscrizione.squadra === 'dragon_pine' ? 'Dragon Piné' :
//                                iscrizione.squadra === 'pine_sharks' ? 'Piné Sharks' :
//                                iscrizione.squadra === 'dragon_flames' ? 'Dragon Flames' :
//                                iscrizione.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D';
//             return squadraLabel.toLowerCase().includes(filterValueLower);
          
//           case 'dataIscrizione':
//             return formatDate(iscrizione.dataIscrizione).toLowerCase().includes(filterValueLower);
          
//           default:
//             // Per tutte le altre colonne
//             return iscrizione[column] && 
//                    String(iscrizione[column]).toLowerCase().includes(filterValueLower);
//         }
//       });
      
//       return matchesSearch && matchesColumnFilters;
//     });
//   }, [iscrizioni, searchTerm, columnFilters]);
  
//   // Numero di filtri attivi
//   const activeFiltersCount = Object.keys(columnFilters).length + (searchTerm ? 1 : 0);
  
//   // Renderizzazione mobile delle iscrizioni (card layout)
//   // Versione migliorata del MobileView che mostra più informazioni quando showAllColumns è true
// const MobileView = () => (
//     <Box>
//       {filteredIscrizioni.length === 0 ? (
//         <Paper sx={{ p: 4, textAlign: 'center' }}>
//           <Typography>Nessuna iscrizione trovata</Typography>
//         </Paper>
//       ) : (
//         filteredIscrizioni.map((iscrizione) => (
//           <Card key={iscrizione.id} sx={{ mb: 2 }}>
//             <CardContent>
//               <Typography variant="h6">
//                 {iscrizione.numero_progressivo 
//                   ? `#${String(iscrizione.numero_progressivo).padStart(3, '0')} - ` 
//                   : ''}{iscrizione.nome} {iscrizione.cognome}
//               </Typography>
              
//               <Typography variant="body2" color="text.secondary" gutterBottom>
//                 {iscrizione.email}
//               </Typography>
              
//               <Divider sx={{ my: 1 }} />
              
//               <Grid container spacing={1}>
//                 {/* Prima riga di informazioni - sempre visibili */}
//                 {visibleColumns.squadra && (
//                   <Grid item xs={6}>
//                     <Typography variant="caption" color="text.secondary">Squadra</Typography>
//                     <Typography variant="body2">
//                       {iscrizione.squadra === 'dragon_pine' ? 'Dragon Piné' :
//                        iscrizione.squadra === 'pine_sharks' ? 'Piné Sharks' :
//                        iscrizione.squadra === 'dragon_flames' ? 'Dragon Flames' :
//                        iscrizione.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D'}
//                     </Typography>
//                   </Grid>
//                 )}
                
//                 {visibleColumns.dataIscrizione && (
//                   <Grid item xs={6}>
//                     <Typography variant="caption" color="text.secondary">Data Iscrizione</Typography>
//                     <Typography variant="body2">{formatDate(iscrizione.dataIscrizione)}</Typography>
//                   </Grid>
//                 )}
                
//                 {visibleColumns.cellulare && (
//                   <Grid item xs={6}>
//                     <Typography variant="caption" color="text.secondary">Cellulare</Typography>
//                     <Typography variant="body2">{iscrizione.cellulare || 'N/D'}</Typography>
//                   </Grid>
//                 )}
                
//                 {visibleColumns.tipoIscrizione && (
//                   <Grid item xs={6}>
//                     <Typography variant="caption" color="text.secondary">Tipo</Typography>
//                     <Typography variant="body2">
//                       {iscrizione.tipoIscrizione === 'atleta' ? 'Atleta' :
//                        iscrizione.tipoIscrizione === 'socio' ? 'Socio' :
//                        iscrizione.tipoIscrizione === 'atleta_socio' ? 'Atleta e Socio' : 'N/D'}
//                     </Typography>
//                   </Grid>
//                 )}
                
//                 {/* Contenuto espandibile quando "Tutte le colonne" è attivo */}
//                 {showAllColumns && (
//                   <>
//                     <Grid item xs={12}>
//                       <Divider sx={{ my: 1 }} />
//                     </Grid>
                    
//                     {/* Indirizzo completo */}
//                     <Grid item xs={12}>
//                       <Typography variant="caption" color="text.secondary">Indirizzo</Typography>
//                       <Typography variant="body2">
//                         {iscrizione.indirizzo || 'N/D'}{iscrizione.comune ? `, ${iscrizione.comune}` : ''}{iscrizione.cap ? ` (${iscrizione.cap})` : ''}
//                       </Typography>
//                     </Grid>
                    
//                     {/* Data di nascita e dettagli fisici */}
//                     <Grid item xs={6}>
//                       <Typography variant="caption" color="text.secondary">Data Nascita</Typography>
//                       <Typography variant="body2">{formatDate(iscrizione.dataNascita)}</Typography>
//                     </Grid>
                    
//                     <Grid item xs={3}>
//                       <Typography variant="caption" color="text.secondary">Altezza</Typography>
//                       <Typography variant="body2">{iscrizione.altezza || 'N/D'} cm</Typography>
//                     </Grid>
                    
//                     <Grid item xs={3}>
//                       <Typography variant="caption" color="text.secondary">Peso</Typography>
//                       <Typography variant="body2">{iscrizione.peso || 'N/D'} kg</Typography>
//                     </Grid>
                    
//                     {/* Taglie e posizione barca */}
//                     <Grid item xs={6}>
//                       <Typography variant="caption" color="text.secondary">Taglia T-Shirt</Typography>
//                       <Typography variant="body2">{iscrizione.tagliaShirt?.toUpperCase() || 'N/D'}</Typography>
//                     </Grid>
                    
//                     <Grid item xs={6}>
//                       <Typography variant="caption" color="text.secondary">Taglia Costume</Typography>
//                       <Typography variant="body2">{iscrizione.tagliaCostume?.toUpperCase() || 'N/D'}</Typography>
//                     </Grid>
                    
//                     <Grid item xs={12}>
//                       <Typography variant="caption" color="text.secondary">Posizione in barca</Typography>
//                       <Typography variant="body2">
//                         {Array.isArray(iscrizione.posizioneBarca) 
//                           ? iscrizione.posizioneBarca.map(pos => 
//                               pos === 'destro' ? 'Destro/a' :
//                               pos === 'sinistro' ? 'Sinistro/a' :
//                               pos === 'tamburina' ? 'Tamburina' :
//                               pos === 'timoniere' ? 'Timoniere' : pos
//                             ).join(', ') 
//                           : 'N/D'}
//                       </Typography>
//                     </Grid>
                    
//                     <Grid item xs={12}>
//                       <Typography variant="caption" color="text.secondary">Scadenza Visita</Typography>
//                       <Typography variant="body2">{formatDate(iscrizione.dataScadenzaVisita)}</Typography>
//                     </Grid>
//                   </>
//                 )}
//               </Grid>
              
//               <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 {showAllColumns && (
//                   <Typography variant="caption" color="text.secondary">
//                     Visualizzazione completa
//                   </Typography>
//                 )}
//                 <Button 
//                   variant="contained" 
//                   size="small" 
//                   onClick={() => handleOpenDetails(iscrizione)}
//                   sx={{ ml: 'auto' }}
//                 >
//                   Dettagli
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         ))
//       )}
//     </Box>
//   );
  
//   // Funzione per renderizzare una cella di tabella con filtro
//   const renderFilterableColumn = (column, label, renderValue) => {
//     if (!visibleColumns[column]) return null;
    
//     return (
//       <TableCell>
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           {label}
//           <IconButton size="small" onClick={(e) => handleOpenFilter(e, column)}>
//             <FilterList fontSize="small" />
//           </IconButton>
//           {columnFilters[column] && (
//             <Chip 
//               size="small" 
//               label={columnFilters[column]} 
//               onDelete={() => handleClearFilter(column)}
//               sx={{ ml: 1 }}
//             />
//           )}
//         </Box>
//       </TableCell>
//     );
//   };
  
//   // Renderizzazione desktop delle iscrizioni (tabella)
//   const DesktopView = () => (
//     <TableContainer>
//       <Table>
//         <TableHead>
//           <TableRow>
//             {ALL_COLUMNS.map(column => {
//               if (!visibleColumns[column.id]) return null;
              
//               return (
//                 <TableCell key={column.id}>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     {column.label}
//                     <IconButton size="small" onClick={(e) => handleOpenFilter(e, column.id)}>
//                       <FilterList fontSize="small" />
//                     </IconButton>
//                     {columnFilters[column.id] && (
//                       <Chip 
//                         size="small" 
//                         label={columnFilters[column.id]} 
//                         onDelete={() => handleClearFilter(column.id)}
//                         sx={{ ml: 1 }}
//                       />
//                     )}
//                   </Box>
//                 </TableCell>
//               );
//             })}
//             <TableCell>Azioni</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {filteredIscrizioni.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} align="center">
//                 Nessuna iscrizione trovata
//               </TableCell>
//             </TableRow>
//           ) : (
//             filteredIscrizioni.map((iscrizione) => (
//               <TableRow key={iscrizione.id}>
//                 {visibleColumns.numero_progressivo && (
//                   <TableCell>
//                     {iscrizione.numero_progressivo 
//                       ? String(iscrizione.numero_progressivo).padStart(3, '0') 
//                       : 'N/D'}
//                   </TableCell>
//                 )}
                
//                 {visibleColumns.nome && (
//                   <TableCell>{iscrizione.nome}</TableCell>
//                 )}
                
//                 {visibleColumns.cognome && (
//                   <TableCell>{iscrizione.cognome}</TableCell>
//                 )}
                
//                 {visibleColumns.email && (
//                   <TableCell>{iscrizione.email}</TableCell>
//                 )}
                
//                 {visibleColumns.cellulare && (
//                   <TableCell>{iscrizione.cellulare}</TableCell>
//                 )}
                
//                 {visibleColumns.indirizzo && (
//                   <TableCell>{iscrizione.indirizzo}</TableCell>
//                 )}
                
//                 {visibleColumns.comune && (
//                   <TableCell>{iscrizione.comune}</TableCell>
//                 )}
                
//                 {visibleColumns.cap && (
//                   <TableCell>{iscrizione.cap}</TableCell>
//                 )}
                
//                 {visibleColumns.dataNascita && (
//                   <TableCell>{formatDate(iscrizione.dataNascita)}</TableCell>
//                 )}
                
//                 {visibleColumns.altezza && (
//                   <TableCell>{iscrizione.altezza} cm</TableCell>
//                 )}
                
//                 {visibleColumns.peso && (
//                   <TableCell>{iscrizione.peso} kg</TableCell>
//                 )}
                
//                 {visibleColumns.posizioneBarca && (
//                   <TableCell>
//                     {Array.isArray(iscrizione.posizioneBarca) 
//                       ? iscrizione.posizioneBarca.map(pos => 
//                           pos === 'destro' ? 'Destro/a' :
//                           pos === 'sinistro' ? 'Sinistro/a' :
//                           pos === 'tamburina' ? 'Tamburina' :
//                           pos === 'timoniere' ? 'Timoniere' : pos
//                         ).join(', ') 
//                       : 'N/D'}
//                   </TableCell>
//                 )}
                
//                 {visibleColumns.tagliaShirt && (
//                   <TableCell>{iscrizione.tagliaShirt?.toUpperCase() || 'N/D'}</TableCell>
//                 )}
                
//                 {visibleColumns.tagliaCostume && (
//                   <TableCell>{iscrizione.tagliaCostume?.toUpperCase() || 'N/D'}</TableCell>
//                 )}
                
//                 {visibleColumns.squadra && (
//                   <TableCell>
//                     {iscrizione.squadra === 'dragon_pine' ? 'Dragon Piné' :
//                      iscrizione.squadra === 'pine_sharks' ? 'Piné Sharks' :
//                      iscrizione.squadra === 'dragon_flames' ? 'Dragon Flames' :
//                      iscrizione.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D'}
//                   </TableCell>
//                 )}
                
//                 {visibleColumns.tipoIscrizione && (
//                   <TableCell>
//                     {iscrizione.tipoIscrizione === 'atleta' ? 'Atleta' :
//                      iscrizione.tipoIscrizione === 'socio' ? 'Socio' :
//                      iscrizione.tipoIscrizione === 'atleta_socio' ? 'Atleta e Socio' : 'N/D'}
//                   </TableCell>
//                 )}
                
//                 {visibleColumns.dataScadenzaVisita && (
//                   <TableCell>{formatDate(iscrizione.dataScadenzaVisita)}</TableCell>
//                 )}
                
//                 {visibleColumns.dataIscrizione && (
//                   <TableCell>{formatDate(iscrizione.dataIscrizione)}</TableCell>
//                 )}
                
//                 <TableCell>
//                   <Button 
//                     variant="contained" 
//                     size="small" 
//                     onClick={() => handleOpenDetails(iscrizione)}
//                   >
//                     Dettagli
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
  
//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Iscrizioni Dragon Piné
//           <Typography variant="caption" sx={{ ml: 2, color: 'text.secondary' }}>
//             ({filteredIscrizioni.length} su {iscrizioni.length})
//           </Typography>
//         </Typography>
        
//         {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
//         {/* Modifica questo blocco nella barra degli strumenti */}
// <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
//   <TextField
//     label="Cerca"
//     variant="outlined"
//     value={searchTerm}
//     onChange={(e) => setSearchTerm(e.target.value)}
//     fullWidth={isMobile}
//     size={isMobile ? "small" : "medium"}
//     InputProps={{
//       startAdornment: <Search fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
//       endAdornment: searchTerm ? (
//         <IconButton size="small" onClick={() => setSearchTerm('')}>
//           <Close fontSize="small" />
//         </IconButton>
//       ) : null
//     }}
//   />
  
//   <Stack 
//     direction="row" 
//     spacing={1} 
//     sx={{ 
//       width: isMobile ? '100%' : 'auto',
//       justifyContent: isMobile ? 'space-between' : 'flex-start',
//       flexWrap: 'wrap'
//     }}
//   >
//     <Button 
//       variant="outlined" 
//       onClick={fetchIscrizioni} 
//       startIcon={<Refresh />}
//       size="small"
//     >
//       Aggiorna
//     </Button>
    
//     <Button
//       variant="outlined"
//       onClick={exportToExcel}
//       startIcon={<FileDownload />}
//       size="small"
//     >
//       Excel
//     </Button>
    
//     {/* Opzione "Tutte le colonne" più evidente su mobile */}
//     <Button
//       variant={showAllColumns ? "contained" : "outlined"}
//       color={showAllColumns ? "primary" : "default"}
//       onClick={handleToggleAllColumns}
//       startIcon={<ViewColumn />}
//       size="small"
//     >
//       {showAllColumns ? "Vista Completa" : "Mostra Tutto"}
//     </Button>
//   </Stack>
  
//   {activeFiltersCount > 0 && (
//     <Button
//       variant="outlined" 
//       color="error"
//       onClick={handleClearAllFilters}
//       startIcon={<Close />}
//       size="small"
//       fullWidth={isMobile}
//     >
//       Reset filtri ({activeFiltersCount})
//     </Button>
//   )}
// </Stack>
        
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <>
//             {isMobile ? <MobileView /> : <DesktopView />}
//           </>
//         )}
//       </Paper>
      
//       {/* Popover per filtri colonna */}
//       <Popover
//         open={Boolean(anchorElFilter)}
//         anchorEl={anchorElFilter}
//         onClose={handleCloseFilter}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//       >
//         <Box sx={{ p: 2, width: 250 }}>
//           <Typography variant="subtitle2" gutterBottom>
//             Filtra {ALL_COLUMNS.find(col => col.id === currentFilterColumn)?.label || ''}
//           </Typography>
//           <TextField
//             autoFocus
//             placeholder="Filtra..."
//             fullWidth
//             size="small"
//             defaultValue={columnFilters[currentFilterColumn] || ''}
//             onKeyPress={(e) => {
//               if (e.key === 'Enter') {
//                 handleApplyFilter(e.target.value);
//               }
//             }}
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//             <Button size="small" onClick={handleCloseFilter} sx={{ mr: 1 }}>
//               Annulla
//             </Button>
//             <Button 
//               size="small" 
//               variant="contained" 
//               onClick={(e) => {
//                 const inputField = e.target.closest('.MuiPopover-root').querySelector('input');
//                 handleApplyFilter(inputField.value);
//               }}
//             >
//               Applica
//             </Button>
//           </Box>
//         </Box>
//       </Popover>
      
//       {/* Modal dettagli iscrizione */}
//            {/* Modal dettagli iscrizione */}
//            <Modal
//         open={openModal}
//         onClose={handleCloseDetails}
//         aria-labelledby="dettagli-iscrizione"
//       >
//         <Box sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: isMobile ? '95%' : 600,
//           maxHeight: '90vh',
//           overflow: 'auto',
//           bgcolor: 'background.paper',
//           borderRadius: 2,
//           boxShadow: 24,
//           p: isMobile ? 2 : 4,
//         }}>
//           {selectedIscrizione && (
//             <>
//               <Typography variant="h5" gutterBottom>
//                 N° {selectedIscrizione.numero_progressivo 
//                     ? String(selectedIscrizione.numero_progressivo).padStart(3, '0') 
//                     : 'N/D'} - {selectedIscrizione.nome} {selectedIscrizione.cognome}
//               </Typography>
              
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="h6" sx={{ mt: 3, mb: 1, borderBottom: '1px solid #eee', pb: 1 }}>
//                   Dati Personali
//                 </Typography>
//                 <Table size="small">
//                   <TableBody>
//                     <TableRow>
//                       <TableCell component="th" width="40%">Email:</TableCell>
//                       <TableCell>{selectedIscrizione.email}</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Cellulare:</TableCell>
//                       <TableCell>{selectedIscrizione.cellulare}</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Indirizzo:</TableCell>
//                       <TableCell>
//                         {selectedIscrizione.indirizzo}, {selectedIscrizione.comune} ({selectedIscrizione.cap})
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Data di nascita:</TableCell>
//                       <TableCell>{formatDate(selectedIscrizione.dataNascita)}</TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
                
//                 <Typography variant="h6" sx={{ mt: 3, mb: 1, borderBottom: '1px solid #eee', pb: 1 }}>
//                   Dati Sportivi
//                 </Typography>
//                 <Table size="small">
//                   <TableBody>
//                     <TableRow>
//                       <TableCell component="th" width="40%">Altezza:</TableCell>
//                       <TableCell>{selectedIscrizione.altezza} cm</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Peso:</TableCell>
//                       <TableCell>{selectedIscrizione.peso} kg</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Posizione in barca:</TableCell>
//                       <TableCell>
//                         {Array.isArray(selectedIscrizione.posizioneBarca) 
//                           ? selectedIscrizione.posizioneBarca.map(pos => 
//                               pos === 'destro' ? 'Destro/a' :
//                               pos === 'sinistro' ? 'Sinistro/a' :
//                               pos === 'tamburina' ? 'Tamburina' :
//                               pos === 'timoniere' ? 'Timoniere' : pos
//                             ).join(', ') 
//                           : 'N/D'}
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Taglia T-Shirt:</TableCell>
//                       <TableCell>{selectedIscrizione.tagliaShirt?.toUpperCase() || 'N/D'}</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Taglia Costume:</TableCell>
//                       <TableCell>{selectedIscrizione.tagliaCostume?.toUpperCase() || 'N/D'}</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Squadra:</TableCell>
//                       <TableCell>
//                         {selectedIscrizione.squadra === 'dragon_pine' ? 'Dragon Piné' :
//                          selectedIscrizione.squadra === 'pine_sharks' ? 'Piné Sharks' :
//                          selectedIscrizione.squadra === 'dragon_flames' ? 'Dragon Flames' :
//                          selectedIscrizione.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D'}
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Tipo iscrizione:</TableCell>
//                       <TableCell>
//                         {selectedIscrizione.tipoIscrizione === 'atleta' ? 'Atleta' :
//                          selectedIscrizione.tipoIscrizione === 'socio' ? 'Socio' :
//                          selectedIscrizione.tipoIscrizione === 'atleta_socio' ? 'Atleta e Socio' : 'N/D'}
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Scadenza visita:</TableCell>
//                       <TableCell>{formatDate(selectedIscrizione.dataScadenzaVisita)}</TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
                
//                 <Typography variant="h6" sx={{ mt: 3, mb: 1, borderBottom: '1px solid #eee', pb: 1 }}>
//                   Documenti
//                 </Typography>
//                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
//                 {selectedIscrizione.cartaIdentitaFronteUrl && (
//                         <Button 
//                         variant="outlined" 
//                         color="primary"
//                         href={selectedIscrizione.cartaIdentitaFronteUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         startIcon={<FileDownload />}
//                         fullWidth={isMobile}
//                         >
//                         Carta d'identità (fronte)
//                         </Button>
//                     )}
                    
//                     {selectedIscrizione.cartaIdentitaRetroUrl && (
//                         <Button 
//                         variant="outlined" 
//                         color="primary"
//                         href={selectedIscrizione.cartaIdentitaRetroUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         startIcon={<FileDownload />}
//                         fullWidth={isMobile}
//                         >
//                         Carta d'identità (retro)
//                         </Button>
//                     )}
                  
//                   {selectedIscrizione.visitaMedicaUrl && (
//                     <Button 
//                       variant="outlined" 
//                       color="primary"
//                       href={selectedIscrizione.visitaMedicaUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       startIcon={<FileDownload />}
//                       fullWidth={isMobile}
//                     >
//                       Visita medica
//                     </Button>
//                   )}
                  
//                   {selectedIscrizione.moduloTesseramentoUrl && (
//                     <Button 
//                       variant="outlined" 
//                       color="primary"
//                       href={selectedIscrizione.moduloTesseramentoUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       startIcon={<FileDownload />}
//                       fullWidth={isMobile}
//                     >
//                       Modulo tesseramento
//                     </Button>
//                   )}
                  
//                   {selectedIscrizione.ricevutaPagamentoUrl && (
//                     <Button 
//                       variant="outlined" 
//                       color="primary"
//                       href={selectedIscrizione.ricevutaPagamentoUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       startIcon={<FileDownload />}
//                       fullWidth={isMobile}
//                     >
//                       Ricevuta pagamento
//                     </Button>
//                   )}
                  
//                   {selectedIscrizione.fotoPersonaleUrl && (
//                     <Button 
//                       variant="outlined" 
//                       color="primary"
//                       href={selectedIscrizione.fotoPersonaleUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       startIcon={<FileDownload />}
//                       fullWidth={isMobile}
//                     >
//                       Foto personale
//                     </Button>
//                   )}

//                   {/* Mostra anteprima della foto personale */}
//                   {selectedIscrizione.fotoPersonaleUrl && (
//                     <Box sx={{ mt: 2, textAlign: 'center' }}>
//                       <Typography variant="subtitle2" gutterBottom>
//                         Anteprima foto personale
//                       </Typography>
//                       <Box 
//                         component="img" 
//                         src={selectedIscrizione.fotoPersonaleUrl}
//                         alt="Foto personale"
//                         sx={{
//                           maxWidth: '100%',
//                           maxHeight: 200,
//                           objectFit: 'contain',
//                           borderRadius: 1,
//                           border: '1px solid #eee'
//                         }}
//                       />
//                     </Box>
//                   )}
//                 </Box>
//               </Box>
              
//               <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//                 <Button variant="contained" onClick={handleCloseDetails}>Chiudi</Button>
//               </Box>
//             </>
//           )}
//         </Box>
//       </Modal>
//     </Container>
//   );
// };

// export default DashboardSemplice;

// DashboardSemplice.jsx - Versione corretta con fix

// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { 
//   Container, 
//   Paper, 
//   Typography, 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableRow, 
//   TextField,
//   Button,
//   Modal,
//   Box,
//   CircularProgress,
//   Alert,
//   Stack,
//   Checkbox,
//   FormControlLabel,
//   IconButton,
//   Menu,
//   MenuItem,
//   Popover,
//   TableContainer,
//   Chip,
//   useMediaQuery,
//   Card,
//   CardContent,
//   Grid,
//   Divider,
//   Tooltip,
//   Switch,
//   TableSortLabel,
//   Link
// } from '@mui/material';
// import { createClient } from '@supabase/supabase-js';
// import { 
//   FilterList, 
//   GetApp, 
//   ViewColumn, 
//   Close, 
//   Refresh, 
//   Search,
//   MoreVert,
//   KeyboardArrowDown,
//   KeyboardArrowUp,
//   FileDownload,
//   Assignment,
//   PictureAsPdf,
//   Download,
//   Link as LinkIcon,
//   OpenInNew
// } from '@mui/icons-material';
// import * as XLSX from 'xlsx';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import { useTheme } from '@mui/material/styles';

// // Configurazione Supabase
// const supabaseUrl = 'https://guoicoktnwrvzsynrfdf.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1b2ljb2t0bndydnpzeW5yZmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDIzODIsImV4cCI6MjA1OTg3ODM4Mn0.RmaA7PBCuJssRDl1ee0_VT7A1h5YkZMFzf0MqtlB4K4';
// const supabase = createClient(supabaseUrl, supabaseKey);

// // Lista di tutte le colonne possibili
// const ALL_COLUMNS = [
//   { id: 'numero_progressivo', label: 'N° Progressivo', defaultVisible: true },
//   { id: 'nome', label: 'Nome', defaultVisible: true },
//   { id: 'cognome', label: 'Cognome', defaultVisible: true },
//   { id: 'email', label: 'Email', defaultVisible: true },
//   { id: 'cellulare', label: 'Cellulare', defaultVisible: false },
//   { id: 'indirizzo', label: 'Indirizzo', defaultVisible: false },
//   { id: 'comune', label: 'Comune', defaultVisible: false },
//   { id: 'cap', label: 'CAP', defaultVisible: false },
//   { id: 'dataNascita', label: 'Data Nascita', defaultVisible: false },
//   { id: 'altezza', label: 'Altezza', defaultVisible: false },
//   { id: 'peso', label: 'Peso', defaultVisible: false },
//   { id: 'posizioneBarca', label: 'Posizione Barca', defaultVisible: false },
//   { id: 'tagliaShirt', label: 'Taglia T-Shirt', defaultVisible: false },
//   { id: 'tagliaCostume', label: 'Taglia Costume', defaultVisible: false },
//   { id: 'squadra', label: 'Squadra', defaultVisible: true },
//   { id: 'tipoIscrizione', label: 'Tipo Iscrizione', defaultVisible: false },
//   { id: 'dataScadenzaVisita', label: 'Scadenza Visita', defaultVisible: false },
//   { id: 'dataIscrizione', label: 'Data Iscrizione', defaultVisible: true },
//   { id: 'cartaIdentitaFronte', label: 'CI Fronte', defaultVisible: false, sortable: false },
//   { id: 'cartaIdentitaRetro', label: 'CI Retro', defaultVisible: false, sortable: false },
//   { id: 'visitaMedica', label: 'Visita Medica', defaultVisible: false, sortable: false },
//   { id: 'moduloTesseramento', label: 'Modulo', defaultVisible: false, sortable: false },
//   { id: 'ricevutaPagamento', label: 'Ricevuta', defaultVisible: false, sortable: false },
//   { id: 'fotoPersonale', label: 'Foto', defaultVisible: false, sortable: false }
// ];

// const DashboardSemplice = () => {
//   const theme = useTheme();
//   const [iscrizioni, setIscrizioni] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedIscrizione, setSelectedIscrizione] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const [columnFilters, setColumnFilters] = useState({});
//   const [anchorElFilter, setAnchorElFilter] = useState(null);
//   const [currentFilterColumn, setCurrentFilterColumn] = useState('');
//   const filterTextRef = useRef('');
  
//   // Ordinamento
//   const [orderBy, setOrderBy] = useState('dataIscrizione');
//   const [order, setOrder] = useState('desc');
  
//   // Inizializza le colonne visibili in base ai valori predefiniti
//   const defaultVisibleColumns = ALL_COLUMNS.reduce((acc, column) => {
//     acc[column.id] = column.defaultVisible;
//     return acc;
//   }, {});
  
//   const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
//   const [showAllColumns, setShowAllColumns] = useState(false);
//   const [anchorElColumns, setAnchorElColumns] = useState(null);
  
//   // Check if screen is mobile
//   const isMobile = useMediaQuery('(max-width:600px)');
  
//   useEffect(() => {
//     fetchIscrizioni();
//   }, []);
  
//   // Effetto per aggiornare le colonne visibili quando showAllColumns cambia
//   useEffect(() => {
//     if (showAllColumns) {
//       // Mostra tutte le colonne
//       const allColumnsVisible = ALL_COLUMNS.reduce((acc, column) => {
//         acc[column.id] = true;
//         return acc;
//       }, {});
//       setVisibleColumns(allColumnsVisible);
//     } else {
//       // Mostra solo le colonne predefinite
//       setVisibleColumns(defaultVisibleColumns);
//     }
//   }, [showAllColumns]);
  
//   const fetchIscrizioni = async () => {
//     try {
//       setLoading(true);
      
//       const { data, error } = await supabase
//         .from('iscrizioni')
//         .select('*')
//         .order('dataIscrizione', { ascending: false });
        
//       if (error) throw error;
      
//       // Usa il numero_progressivo direttamente dal database
//       setIscrizioni(data || []);
//     } catch (err) {
//       console.error('Errore recupero iscrizioni:', err);
//       setError('Impossibile caricare i dati');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleOpenDetails = (iscrizione) => {
//     setSelectedIscrizione(iscrizione);
//     setOpenModal(true);
//   };
  
//   const handleCloseDetails = () => {
//     setOpenModal(false);
//   };
  
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/D';
//     return new Date(dateString).toLocaleDateString('it-IT');
//   };
  
//   // Gestione ordinamento
//   const handleRequestSort = (property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };
  
//   // Gestione dei filtri per colonna
//   const handleOpenFilter = (event, column) => {
//     setAnchorElFilter(event.currentTarget);
//     setCurrentFilterColumn(column);
    
//     // Prepopola il campo di filtro con il valore attuale
//     setTimeout(() => {
//       if (filterTextRef.current) {
//         filterTextRef.current.value = columnFilters[column] || '';
//       }
//     }, 100);
//   };
  
//   const handleCloseFilter = () => {
//     setAnchorElFilter(null);
//     setCurrentFilterColumn('');
//   };
  
//   const handleApplyFilter = (value) => {
//     if (value) {
//       setColumnFilters(prev => ({
//         ...prev,
//         [currentFilterColumn]: value
//       }));
//     }
//     handleCloseFilter();
//   };
  
//   const handleClearFilter = (column) => {
//     const newFilters = {...columnFilters};
//     delete newFilters[column];
//     setColumnFilters(newFilters);
//   };
  
//   const handleClearAllFilters = () => {
//     setColumnFilters({});
//     setSearchTerm('');
//   };
  
//   // Gestione colonne visibili
//   const handleToggleColumnVisibility = (column) => {
//     setVisibleColumns(prev => ({
//       ...prev,
//       [column]: !prev[column]
//     }));
//   };
  
//   const handleToggleAllColumns = () => {
//     setShowAllColumns(prev => !prev);
//   };
  
//   const handleOpenColumnsMenu = (event) => {
//     setAnchorElColumns(event.currentTarget);
//   };
  
//   const handleCloseColumnsMenu = () => {
//     setAnchorElColumns(null);
//   };

//   // Trasforma i dati per le esportazioni
//   const prepareExportData = (items) => {
//     return items.map(i => ({
//       'Numero Progressivo': i.numero_progressivo ? String(i.numero_progressivo).padStart(3, '0') : 'N/D',
//       'Nome': i.nome || '',
//       'Cognome': i.cognome || '',
//       'Email': i.email || '',
//       'Cellulare': i.cellulare || '',
//       'Indirizzo': i.indirizzo || '',
//       'Comune': i.comune || '',
//       'CAP': i.cap || '',
//       'Data Nascita': formatDate(i.dataNascita),
//       'Altezza (cm)': i.altezza || '',
//       'Peso (kg)': i.peso || '',
//       'Posizione Barca': Array.isArray(i.posizioneBarca) 
//         ? i.posizioneBarca.map(pos => 
//             pos === 'destro' ? 'Destro/a' :
//             pos === 'sinistro' ? 'Sinistro/a' :
//             pos === 'tamburina' ? 'Tamburina' :
//             pos === 'timoniere' ? 'Timoniere' : pos
//           ).join(', ') 
//         : 'N/D',
//       'Taglia T-Shirt': i.tagliaShirt?.toUpperCase() || 'N/D',
//       'Taglia Costume': i.tagliaCostume?.toUpperCase() || 'N/D',
//       'Squadra': i.squadra === 'dragon_pine' ? 'Dragon Piné' :
//                 i.squadra === 'pine_sharks' ? 'Piné Sharks' :
//                 i.squadra === 'dragon_flames' ? 'Dragon Flames' :
//                 i.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D',
//       'Tipo Iscrizione': i.tipoIscrizione === 'atleta' ? 'Atleta' :
//                         i.tipoIscrizione === 'socio' ? 'Socio' :
//                         i.tipoIscrizione === 'atleta_socio' ? 'Atleta e Socio' : 'N/D',
//       'Scadenza Visita': formatDate(i.dataScadenzaVisita),
//       'Data Iscrizione': formatDate(i.dataIscrizione),
//       'Carta d\'identità (fronte)': i.cartaIdentitaFronteUrl || '',
//       'Carta d\'identità (retro)': i.cartaIdentitaRetroUrl || '',
//       'Visita Medica': i.visitaMedicaUrl || '',
//       'Modulo Tesseramento': i.moduloTesseramentoUrl || '',
//       'Ricevuta Pagamento': i.ricevutaPagamentoUrl || '',
//       'Foto Personale': i.fotoPersonaleUrl || ''
//     }));
//   };
  
//   // Esportazione dati in Excel migliorata
//   const exportToExcel = () => {
//     // Preparazione dei dati
//     const dataToExport = prepareExportData(filteredIscrizioni);
    
//     // Crea il foglio di lavoro
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    
//     // Imposta larghezza colonne
//     const columnWidths = [
//       { wch: 15 }, // Numero progressivo
//       { wch: 20 }, // Nome
//       { wch: 20 }, // Cognome
//       { wch: 30 }, // Email
//       { wch: 15 }, // Cellulare
//       { wch: 30 }, // Indirizzo
//       { wch: 20 }, // Comune
//       { wch: 10 }, // CAP
//       { wch: 15 }, // Data Nascita
//       { wch: 12 }, // Altezza
//       { wch: 12 }, // Peso
//       { wch: 20 }, // Posizione Barca
//       { wch: 12 }, // Taglia T-Shirt
//       { wch: 12 }, // Taglia Costume
//       { wch: 15 }, // Squadra
//       { wch: 15 }, // Tipo Iscrizione
//       { wch: 15 }, // Scadenza Visita
//       { wch: 15 }, // Data Iscrizione
//       { wch: 50 }, // Carta identità fronte
//       { wch: 50 }, // Carta identità retro
//       { wch: 50 }, // Visita medica
//       { wch: 50 }, // Modulo tesseramento
//       { wch: 50 }, // Ricevuta pagamento
//       { wch: 50 }  // Foto personale
//     ];
//     worksheet['!cols'] = columnWidths;
    
//     // Imposta stili cella intestazione
//     const range = XLSX.utils.decode_range(worksheet['!ref']);
//     for (let C = range.s.c; C <= range.e.c; ++C) {
//       const address = XLSX.utils.encode_cell({ r: 0, c: C });
//       if (!worksheet[address]) continue;
//       worksheet[address].s = {
//         font: { bold: true, color: { rgb: "FFFFFF" } },
//         fill: { fgColor: { rgb: "4F81BD" } },
//         alignment: { horizontal: "center", vertical: "center" }
//       };
//     }
    
//     // Aggiungi hyperlink alle celle con URL
//     for (let i = 0; i < dataToExport.length; i++) {
//       const rowIndex = i + 1; // +1 perché la riga 0 è l'intestazione
      
//       // Per ogni campo URL
//       ['Carta d\'identità (fronte)', 'Carta d\'identità (retro)', 'Visita Medica', 'Modulo Tesseramento', 'Ricevuta Pagamento', 'Foto Personale'].forEach(field => {
//         if (dataToExport[i][field]) {
//           // Calcola l'indirizzo cella
//           const colIndex = Object.keys(dataToExport[i]).indexOf(field);
//           const cellRef = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
          
//           // Definisci la cella come hyperlink
//           worksheet[cellRef] = {
//             t: 's',
//             v: 'Visualizza documento',
//             l: { Target: dataToExport[i][field], Tooltip: `Apri ${field}` }
//           };
          
//           // Formatta il testo in blu e sottolineato
//           if (!worksheet.s) worksheet.s = {};
//           worksheet.s[cellRef] = {
//             font: { color: { rgb: "0000FF" }, underline: true }
//           };
//         }
//       });
//     }
    
//     const workbook = XLSX.utils.book_new();
//     workbook.Props = {
//       Title: "Iscrizioni Dragon Piné",
//       Subject: "Elenco iscrizioni",
//       Author: "Asd Dragon Piné",
//       CreatedDate: new Date()
//     };
    
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Iscrizioni");
    
//     // Genera il file Excel
//     XLSX.writeFile(workbook, "Iscrizioni_Dragon_Pine.xlsx");
//   };
  
// // Correzione della funzione generateReceipt senza usare autoTable
// const generateReceipt = () => {
//     if (!selectedIscrizione) return;
    
//     try {
//       // Crea un nuovo documento PDF
//       const doc = new jsPDF();
      
//       // Intestazione
//       doc.setFontSize(20);
//       doc.text("ASD DRAGON PINÉ", 105, 20, null, null, 'center');
//       doc.setFontSize(16);
//       doc.text("Ricevuta di Iscrizione", 105, 30, null, null, 'center');
//       doc.setFontSize(10);
//       doc.text("C.F. 96106680224 – Via del Cadrobol 7 – 38042 Baselga di Piné", 105, 40, null, null, 'center');
      
//       // Funzione helper per aggiungere righe di testo
//       const addRow = (label, value, y) => {
//         doc.setFont('helvetica', 'bold');
//         doc.text(label, 20, y);
//         doc.setFont('helvetica', 'normal');
//         doc.text(value || 'N/D', 80, y);
//         return y + 8; // Restituisce la prossima posizione Y
//       };
      
//       // Dati iscrizione
//       doc.setFontSize(14);
//       doc.text("DATI ISCRIZIONE", 20, 55);
//       doc.line(20, 57, 190, 57); // Linea sotto il titolo
      
//       doc.setFontSize(10);
//       let y = 65;
      
//       y = addRow("Numero iscrizione:", selectedIscrizione.numero_progressivo 
//         ? String(selectedIscrizione.numero_progressivo).padStart(3, '0') : 'N/D', y);
        
//       y = addRow("Nominativo:", `${selectedIscrizione.nome} ${selectedIscrizione.cognome}`, y);
//       y = addRow("Email:", selectedIscrizione.email, y);
//       y = addRow("Cellulare:", selectedIscrizione.cellulare, y);
//       y = addRow("Indirizzo:", `${selectedIscrizione.indirizzo}, ${selectedIscrizione.comune} (${selectedIscrizione.cap})`, y);
//       y = addRow("Data di nascita:", formatDate(selectedIscrizione.dataNascita), y);
      
//       const squadraText = selectedIscrizione.squadra === 'dragon_pine' ? 'Dragon Piné' :
//                          selectedIscrizione.squadra === 'pine_sharks' ? 'Piné Sharks' :
//                          selectedIscrizione.squadra === 'dragon_flames' ? 'Dragon Flames' :
//                          selectedIscrizione.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D';
//       y = addRow("Squadra:", squadraText, y);
      
//       const tipoText = selectedIscrizione.tipoIscrizione === 'atleta' ? 'Atleta' :
//                       selectedIscrizione.tipoIscrizione === 'socio' ? 'Socio' :
//                       selectedIscrizione.tipoIscrizione === 'atleta_socio' ? 'Atleta e Socio' : 'N/D';
//       y = addRow("Tipo iscrizione:", tipoText, y);
      
//       y = addRow("Data iscrizione:", formatDate(selectedIscrizione.dataIscrizione), y);
      
//       // Documenti forniti
//       y += 10;
//       doc.setFontSize(14);
//       doc.text("DOCUMENTI FORNITI", 20, y);
//       y += 2;
//       doc.line(20, y, 190, y);
//       y += 8;
      
//       doc.setFontSize(10);
//       y = addRow("Carta d'identità (fronte):", selectedIscrizione.cartaIdentitaFronteUrl ? '✓ Fornita' : '✗ Non fornita', y);
//       y = addRow("Carta d'identità (retro):", selectedIscrizione.cartaIdentitaRetroUrl ? '✓ Fornita' : '✗ Non fornita', y);
//       y = addRow("Visita medica:", selectedIscrizione.visitaMedicaUrl ? '✓ Fornita' : '✗ Non fornita', y);
//       y = addRow("Scadenza visita medica:", formatDate(selectedIscrizione.dataScadenzaVisita), y);
//       y = addRow("Modulo tesseramento:", selectedIscrizione.moduloTesseramentoUrl ? '✓ Fornito' : '✗ Non fornito', y);
//       y = addRow("Ricevuta pagamento:", selectedIscrizione.ricevutaPagamentoUrl ? '✓ Fornita' : '✗ Non fornita', y);
//       y = addRow("Foto personale:", selectedIscrizione.fotoPersonaleUrl ? '✓ Fornita' : '✗ Non fornita', y);
      
//       // Dichiarazione e firme
//       y += 15;
//       doc.setFontSize(10);
//       doc.text("Si dichiara che l'atleta ha fornito tutti i documenti richiesti e ha accettato la privacy policy", 20, y);
//       y += 5;
//       doc.text("dell'ASD Dragon Piné per il trattamento dei dati personali.", 20, y);
      
//       // Firme
//     //   y += 20;
//     //   doc.text("Firma Atleta", 40, y);
//     //   y += 5;
//     //   doc.line(30, y, 80, y);
      
//       doc.text("Firma ASD Dragon Piné", 140, y - 5);
//       doc.line(130, y, 180, y);
      
//       // Data generazione
//       doc.setFontSize(8);
//       doc.text(`Documento generato il ${new Date().toLocaleDateString('it-IT')}`, 105, 280, null, null, 'center');
      
//       // Salva il PDF
//       doc.save(`Ricevuta_${selectedIscrizione.cognome}_${selectedIscrizione.nome}.pdf`);
      
//       console.log('PDF generato con successo');
//     } catch (error) {
//       console.error('Errore nella generazione PDF:', error);
//       alert('Si è verificato un errore nella generazione del PDF. Controlla la console per dettagli.');
//     }
//   };
  
//   // Ottieni valore leggibile per la lista di documenti
//   const getReadableDocuments = (iscrizione) => {
//     const docs = [];
    
//     if (iscrizione.cartaIdentitaFronteUrl) docs.push({ name: 'CI Fronte', url: iscrizione.cartaIdentitaFronteUrl });
//     if (iscrizione.cartaIdentitaRetroUrl) docs.push({ name: 'CI Retro', url: iscrizione.cartaIdentitaRetroUrl });
//     if (iscrizione.visitaMedicaUrl) docs.push({ name: 'Visita Medica', url: iscrizione.visitaMedicaUrl });
//     if (iscrizione.moduloTesseramentoUrl) docs.push({ name: 'Modulo', url: iscrizione.moduloTesseramentoUrl });
//     if (iscrizione.ricevutaPagamentoUrl) docs.push({ name: 'Ricevuta', url: iscrizione.ricevutaPagamentoUrl });
//     if (iscrizione.fotoPersonaleUrl) docs.push({ name: 'Foto', url: iscrizione.fotoPersonaleUrl });
    
//     return docs;
//   };
  
//   // Filtraggio e ordinamento dati
//   const filteredIscrizioni = useMemo(() => {
//     return iscrizioni
//       .filter(iscrizione => {
//         // Filtro di ricerca generale
//         const matchesSearch = searchTerm === '' || 
//           (iscrizione.nome && iscrizione.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (iscrizione.cognome && iscrizione.cognome.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (iscrizione.email && iscrizione.email.toLowerCase().includes(searchTerm.toLowerCase()));
        
//         // Filtri per colonna
//         const matchesColumnFilters = Object.entries(columnFilters).every(([column, filterValue]) => {
//           if (!filterValue) return true;
          
//           // Assicurati che filterValue sia una stringa e converti in lowercase
//           const filterValueLower = String(filterValue).toLowerCase();
          
//           // Gestisci ogni colonna in modo specifico
//           switch(column) {
//             case 'numero_progressivo':
//               return iscrizione.numero_progressivo && 
//                      String(iscrizione.numero_progressivo).includes(filterValue);
            
//             case 'nome':
//               return iscrizione.nome && 
//                      iscrizione.nome.toLowerCase().includes(filterValueLower);
            
//             case 'cognome':
//               return iscrizione.cognome && 
//                      iscrizione.cognome.toLowerCase().includes(filterValueLower);
            
//             case 'email':
//               return iscrizione.email && 
//                      iscrizione.email.toLowerCase().includes(filterValueLower);
            
//             case 'cellulare':
//               return iscrizione.cellulare && 
//                      iscrizione.cellulare.toLowerCase().includes(filterValueLower);
            
//             case 'squadra':
//               // Converti il valore squadra in etichetta leggibile
//               const squadraLabel = iscrizione.squadra === 'dragon_pine' ? 'Dragon Piné' :
//                                  iscrizione.squadra === 'pine_sharks' ? 'Piné Sharks' :
//                                  iscrizione.squadra === 'dragon_flames' ? 'Dragon Flames' :
//                                  iscrizione.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D';
//               return squadraLabel.toLowerCase().includes(filterValueLower);
            
//             case 'dataIscrizione':
//               return formatDate(iscrizione.dataIscrizione).toLowerCase().includes(filterValueLower);
            
//             default:
//               // Per tutte le altre colonne
//               return iscrizione[column] && 
//                      String(iscrizione[column]).toLowerCase().includes(filterValueLower);
//           }
//         });
        
//         return matchesSearch && matchesColumnFilters;
//       })
//       .sort((a, b) => {
//         // Funzione di confronto per ordinamento
//         const isAsc = order === 'asc';
        
//         // Gestione speciale per vari tipi di colonne
//         switch (orderBy) {
//           case 'numero_progressivo':
//             return isAsc 
//               ? (a.numero_progressivo || 0) - (b.numero_progressivo || 0)
//               : (b.numero_progressivo || 0) - (a.numero_progressivo || 0);
          
//           case 'dataIscrizione':
//           case 'dataNascita':
//           case 'dataScadenzaVisita':
//             const dateA = a[orderBy] ? new Date(a[orderBy]) : new Date(0);
//             const dateB = b[orderBy] ? new Date(b[orderBy]) : new Date(0);
//             return isAsc ? dateA - dateB : dateB - dateA;
          
//           case 'squadra':
//             const squadraA = a.squadra || '';
//             const squadraB = b.squadra || '';
//             return isAsc 
//               ? squadraA.localeCompare(squadraB)
//               : squadraB.localeCompare(squadraA);
          
//           default:
//             // Per le colonne di testo
//             const valA = a[orderBy] || '';
//             const valB = b[orderBy] || '';
            
//             if (typeof valA === 'string' && typeof valB === 'string') {
//               return isAsc 
//                 ? valA.localeCompare(valB)
//                 : valB.localeCompare(valA);
//             }
            
//             // Fallback per altri tipi
//             return isAsc
//               ? (valA < valB ? -1 : valA > valB ? 1 : 0)
//               : (valA < valB ? 1 : valA > valB ? -1 : 0);
//         }
//       });
//   }, [iscrizioni, searchTerm, columnFilters, order, orderBy]);
  
//   // Numero di filtri attivi
//   const activeFiltersCount = Object.keys(columnFilters).length + (searchTerm ? 1 : 0);
  
//   // Renderizza un documento come link o icona in base al tipo
//   const renderDocumentLink = (url, label) => {
//     if (!url) return null;
    
//     return (
//       <Button
//         variant="text"
//         size="small"
//         color="primary"
//         href={url}
//         target="_blank"
//         startIcon={<OpenInNew fontSize="small" />}
//         sx={{ minWidth: 'auto', p: 0.5 }}
//       >
//         {label}
//       </Button>
//     );
//   };
  
//   // Renderizzazione mobile delle iscrizioni (card layout)
//   const MobileView = () => (
//     <Box>
//             {filteredIscrizioni.length === 0 ? (
//         <Paper sx={{ p: 4, textAlign: 'center' }}>
//           <Typography>Nessuna iscrizione trovata</Typography>
//         </Paper>
//       ) : (
//         filteredIscrizioni.map((iscrizione) => (
//           <Card key={iscrizione.id} sx={{ mb: 2 }}>
//             <CardContent>
//               <Typography variant="h6">
//                 {iscrizione.numero_progressivo 
//                   ? `#${String(iscrizione.numero_progressivo).padStart(3, '0')} - ` 
//                   : ''}{iscrizione.nome} {iscrizione.cognome}
//               </Typography>
              
//               <Typography variant="body2" color="text.secondary" gutterBottom>
//                 {iscrizione.email}
//               </Typography>
              
//               <Divider sx={{ my: 1 }} />
              
//               {/* Visualizzazione strutturata per mobile */}
//               <Grid container spacing={1}>
//                 {/* Sezione info generali */}
//                 <Grid item xs={12}>
//                   <Box sx={{ bgcolor: 'background.paper', p: 1.5, borderRadius: 1, mb: 1 }}>
//                     <Typography variant="subtitle2" color="primary" gutterBottom>
//                       Informazioni Generali
//                     </Typography>
                    
//                     <Grid container spacing={1}>
//                       {visibleColumns.squadra && (
//                         <Grid item xs={6}>
//                           <Typography variant="caption" color="text.secondary" display="block">Squadra</Typography>
//                           <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                             {iscrizione.squadra === 'dragon_pine' ? 'Dragon Piné' :
//                              iscrizione.squadra === 'pine_sharks' ? 'Piné Sharks' :
//                              iscrizione.squadra === 'dragon_flames' ? 'Dragon Flames' :
//                              iscrizione.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D'}
//                           </Typography>
//                         </Grid>
//                       )}
                      
//                       {visibleColumns.dataIscrizione && (
//                         <Grid item xs={6}>
//                           <Typography variant="caption" color="text.secondary" display="block">Data Iscrizione</Typography>
//                           <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(iscrizione.dataIscrizione)}</Typography>
//                         </Grid>
//                       )}
                      
//                       {visibleColumns.cellulare && (
//                         <Grid item xs={6}>
//                           <Typography variant="caption" color="text.secondary" display="block">Cellulare</Typography>
//                           <Typography variant="body2" sx={{ fontWeight: 500 }}>{iscrizione.cellulare || 'N/D'}</Typography>
//                         </Grid>
//                       )}
                      
//                       {visibleColumns.tipoIscrizione && (
//                         <Grid item xs={6}>
//                           <Typography variant="caption" color="text.secondary" display="block">Tipo</Typography>
//                           <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                             {iscrizione.tipoIscrizione === 'atleta' ? 'Atleta' :
//                              iscrizione.tipoIscrizione === 'socio' ? 'Socio' :
//                              iscrizione.tipoIscrizione === 'atleta_socio' ? 'Atleta e Socio' : 'N/D'}
//                           </Typography>
//                         </Grid>
//                       )}
//                     </Grid>
//                   </Box>
//                 </Grid>
                
//                 {/* Contenuto espandibile quando "Tutte le colonne" è attivo */}
//                 {showAllColumns && (
//                   <>
//                     {/* Sezione dati personali */}
//                     <Grid item xs={12}>
//                       <Box sx={{ bgcolor: 'background.paper', p: 1.5, borderRadius: 1, mb: 1 }}>
//                         <Typography variant="subtitle2" color="primary" gutterBottom>
//                           Dati Personali
//                         </Typography>
                        
//                         {/* Indirizzo completo */}
//                         <Grid container spacing={1}>
//                           {(visibleColumns.indirizzo || visibleColumns.comune || visibleColumns.cap) && (
//                             <Grid item xs={12}>
//                               <Typography variant="caption" color="text.secondary" display="block">Indirizzo</Typography>
//                               <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                                 {iscrizione.indirizzo || 'N/D'}
//                                 {iscrizione.comune ? `, ${iscrizione.comune}` : ''}
//                                 {iscrizione.cap ? ` (${iscrizione.cap})` : ''}
//                               </Typography>
//                             </Grid>
//                           )}
                          
//                           {visibleColumns.dataNascita && (
//                             <Grid item xs={6}>
//                               <Typography variant="caption" color="text.secondary" display="block">Data Nascita</Typography>
//                               <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(iscrizione.dataNascita)}</Typography>
//                             </Grid>
//                           )}
                          
//                           {visibleColumns.dataScadenzaVisita && (
//                             <Grid item xs={6}>
//                               <Typography variant="caption" color="text.secondary" display="block">Scadenza Visita</Typography>
//                               <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(iscrizione.dataScadenzaVisita)}</Typography>
//                             </Grid>
//                           )}
//                         </Grid>
//                       </Box>
//                     </Grid>
                    
//                     {/* Sezione sport */}
//                     <Grid item xs={12}>
//                       <Box sx={{ bgcolor: 'background.paper', p: 1.5, borderRadius: 1, mb: 1 }}>
//                         <Typography variant="subtitle2" color="primary" gutterBottom>
//                           Dati Sportivi
//                         </Typography>
                        
//                         <Grid container spacing={1}>
//                           {visibleColumns.altezza && (
//                             <Grid item xs={3}>
//                               <Typography variant="caption" color="text.secondary" display="block">Altezza</Typography>
//                               <Typography variant="body2" sx={{ fontWeight: 500 }}>{iscrizione.altezza || 'N/D'} cm</Typography>
//                             </Grid>
//                           )}
                          
//                           {visibleColumns.peso && (
//                             <Grid item xs={3}>
//                               <Typography variant="caption" color="text.secondary" display="block">Peso</Typography>
//                               <Typography variant="body2" sx={{ fontWeight: 500 }}>{iscrizione.peso || 'N/D'} kg</Typography>
//                             </Grid>
//                           )}
                          
//                           {visibleColumns.tagliaShirt && (
//                             <Grid item xs={3}>
//                               <Typography variant="caption" color="text.secondary" display="block">T-Shirt</Typography>
//                               <Typography variant="body2" sx={{ fontWeight: 500 }}>{iscrizione.tagliaShirt?.toUpperCase() || 'N/D'}</Typography>
//                             </Grid>
//                           )}
                          
//                           {visibleColumns.tagliaCostume && (
//                             <Grid item xs={3}>
//                               <Typography variant="caption" color="text.secondary" display="block">Costume</Typography>
//                               <Typography variant="body2" sx={{ fontWeight: 500 }}>{iscrizione.tagliaCostume?.toUpperCase() || 'N/D'}</Typography>
//                             </Grid>
//                           )}
                          
//                           {visibleColumns.posizioneBarca && (
//                             <Grid item xs={12}>
//                               <Typography variant="caption" color="text.secondary" display="block">Posizione in barca</Typography>
//                               <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                                 {Array.isArray(iscrizione.posizioneBarca) 
//                                   ? iscrizione.posizioneBarca.map(pos => 
//                                       pos === 'destro' ? 'Destro/a' :
//                                       pos === 'sinistro' ? 'Sinistro/a' :
//                                       pos === 'tamburina' ? 'Tamburina' :
//                                       pos === 'timoniere' ? 'Timoniere' : pos
//                                     ).join(', ') 
//                                   : 'N/D'}
//                               </Typography>
//                             </Grid>
//                           )}
//                         </Grid>
//                       </Box>
//                     </Grid>
                    
//                     {/* Sezione documenti (solo in vista completa) */}
//                     <Grid item xs={12}>
//                       <Box sx={{ bgcolor: 'background.paper', p: 1.5, borderRadius: 1, mb: 1 }}>
//                         <Typography variant="subtitle2" color="primary" gutterBottom>
//                           Documenti
//                         </Typography>
                        
//                         <Grid container spacing={1}>
//                           {visibleColumns.cartaIdentitaFronte && (
//                             <Grid item xs={6}>
//                               <Typography variant="caption" color="text.secondary" display="block">CI Fronte</Typography>
//                               {iscrizione.cartaIdentitaFronteUrl ? (
//                                 <Button 
//                                   variant="text"
//                                   size="small"
//                                   href={iscrizione.cartaIdentitaFronteUrl} 
//                                   target="_blank"
//                                   startIcon={<OpenInNew />}
//                                   sx={{ p: 0 }}
//                                 >
//                                   Visualizza
//                                 </Button>
//                               ) : <Typography variant="body2">Non disponibile</Typography>}
//                             </Grid>
//                           )}
                          
//                           {visibleColumns.cartaIdentitaRetro && (
//                             <Grid item xs={6}>
//                               <Typography variant="caption" color="text.secondary" display="block">CI Retro</Typography>
//                               {iscrizione.cartaIdentitaRetroUrl ? (
//                                 <Button 
//                                   variant="text"
//                                   size="small"
//                                   href={iscrizione.cartaIdentitaRetroUrl} 
//                                   target="_blank"
//                                   startIcon={<OpenInNew />}
//                                   sx={{ p: 0 }}
//                                 >
//                                   Visualizza
//                                 </Button>
//                               ) : <Typography variant="body2">Non disponibile</Typography>}
//                             </Grid>
//                           )}
                          
//                           {visibleColumns.visitaMedica && (
//                             <Grid item xs={6}>
//                               <Typography variant="caption" color="text.secondary" display="block">Visita Medica</Typography>
//                               {iscrizione.visitaMedicaUrl ? (
//                                 <Button 
//                                   variant="text"
//                                   size="small"
//                                   href={iscrizione.visitaMedicaUrl} 
//                                   target="_blank"
//                                   startIcon={<OpenInNew />}
//                                   sx={{ p: 0 }}
//                                 >
//                                   Visualizza
//                                 </Button>
//                               ) : <Typography variant="body2">Non disponibile</Typography>}
//                             </Grid>
//                           )}
                          
//                           {visibleColumns.moduloTesseramento && (
//                             <Grid item xs={6}>
//                               <Typography variant="caption" color="text.secondary" display="block">Modulo Tesseramento</Typography>
//                               {iscrizione.moduloTesseramentoUrl ? (
//                                 <Button 
//                                   variant="text"
//                                   size="small"
//                                   href={iscrizione.moduloTesseramentoUrl} 
//                                   target="_blank"
//                                   startIcon={<OpenInNew />}
//                                   sx={{ p: 0 }}
//                                 >
//                                   Visualizza
//                                 </Button>
//                               ) : <Typography variant="body2">Non disponibile</Typography>}
//                             </Grid>
//                           )}
                          
//                           {visibleColumns.ricevutaPagamento && (
//                             <Grid item xs={6}>
//                               <Typography variant="caption" color="text.secondary" display="block">Ricevuta Pagamento</Typography>
//                               {iscrizione.ricevutaPagamentoUrl ? (
//                                 <Button 
//                                   variant="text"
//                                   size="small"
//                                   href={iscrizione.ricevutaPagamentoUrl} 
//                                   target="_blank"
//                                   startIcon={<OpenInNew />}
//                                   sx={{ p: 0 }}
//                                 >
//                                   Visualizza
//                                 </Button>
//                               ) : <Typography variant="body2">Non disponibile</Typography>}
//                             </Grid>
//                           )}
                          
//                           {visibleColumns.fotoPersonale && (
//                             <Grid item xs={6}>
//                               <Typography variant="caption" color="text.secondary" display="block">Foto Personale</Typography>
//                               {iscrizione.fotoPersonaleUrl ? (
//                                 <Button 
//                                   variant="text"
//                                   size="small"
//                                   href={iscrizione.fotoPersonaleUrl} 
//                                   target="_blank"
//                                   startIcon={<OpenInNew />}
//                                   sx={{ p: 0 }}
//                                 >
//                                   Visualizza
//                                 </Button>
//                               ) : <Typography variant="body2">Non disponibile</Typography>}
//                             </Grid>
//                           )}
//                         </Grid>
//                       </Box>
//                     </Grid>
//                   </>
//                 )}
//               </Grid>
              
//               <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Button
//                   variant="outlined"
//                   size="small"
//                   startIcon={<FilterList />}
//                   onClick={(e) => handleOpenFilter(e, 'nome')}
//                 >
//                   Filtri
//                 </Button>
//                 <Button 
//                   variant="contained" 
//                   size="small" 
//                   onClick={() => handleOpenDetails(iscrizione)}
//                 >
//                   Dettagli
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         ))
//       )}
//     </Box>
//   );
  
//   // Renderizzazione desktop delle iscrizioni (tabella)
//   const DesktopView = () => (
//     <TableContainer>
//       <Table>
//         <TableHead>
//           <TableRow>
//             {ALL_COLUMNS.map(column => {
//               if (!visibleColumns[column.id]) return null;
              
//               return (
//                 <TableCell key={column.id}>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     {column.sortable !== false ? (
//                       <TableSortLabel
//                         active={orderBy === column.id}
//                         direction={orderBy === column.id ? order : 'asc'}
//                         onClick={() => handleRequestSort(column.id)}
//                       >
//                         {column.label}
//                       </TableSortLabel>
//                     ) : (
//                       column.label
//                     )}
//                     <IconButton size="small" onClick={(e) => handleOpenFilter(e, column.id)}>
//                       <FilterList fontSize="small" />
//                     </IconButton>
//                     {columnFilters[column.id] && (
//                       <Chip 
//                         size="small" 
//                         label={columnFilters[column.id]} 
//                         onDelete={() => handleClearFilter(column.id)}
//                         sx={{ ml: 1 }}
//                       />
//                     )}
//                   </Box>
//                 </TableCell>
//               );
//             })}
//             <TableCell>Azioni</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {filteredIscrizioni.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} align="center">
//                 Nessuna iscrizione trovata
//               </TableCell>
//             </TableRow>
//           ) : (
//             filteredIscrizioni.map((iscrizione) => (
//               <TableRow key={iscrizione.id}>
//                 {visibleColumns.numero_progressivo && (
//                   <TableCell>
//                     {iscrizione.numero_progressivo 
//                       ? String(iscrizione.numero_progressivo).padStart(3, '0') 
//                       : 'N/D'}
//                   </TableCell>
//                 )}
                
//                 {visibleColumns.nome && (
//                   <TableCell>{iscrizione.nome}</TableCell>
//                 )}
                
//                 {visibleColumns.cognome && (
//                   <TableCell>{iscrizione.cognome}</TableCell>
//                 )}
                
//                 {visibleColumns.email && (
//                   <TableCell>{iscrizione.email}</TableCell>
//                 )}
                
//                 {visibleColumns.cellulare && (
//                   <TableCell>{iscrizione.cellulare}</TableCell>
//                 )}
                
//                 {visibleColumns.indirizzo && (
//                   <TableCell>{iscrizione.indirizzo}</TableCell>
//                 )}
                
//                 {visibleColumns.comune && (
//                   <TableCell>{iscrizione.comune}</TableCell>
//                 )}
                
//                 {visibleColumns.cap && (
//                   <TableCell>{iscrizione.cap}</TableCell>
//                 )}
                
//                 {visibleColumns.dataNascita && (
//                   <TableCell>{formatDate(iscrizione.dataNascita)}</TableCell>
//                 )}
                
//                 {visibleColumns.altezza && (
//                   <TableCell>{iscrizione.altezza} cm</TableCell>
//                 )}
                
//                 {visibleColumns.peso && (
//                   <TableCell>{iscrizione.peso} kg</TableCell>
//                 )}
                
//                 {visibleColumns.posizioneBarca && (
//                   <TableCell>
//                     {Array.isArray(iscrizione.posizioneBarca) 
//                       ? iscrizione.posizioneBarca.map(pos => 
//                           pos === 'destro' ? 'Destro/a' :
//                           pos === 'sinistro' ? 'Sinistro/a' :
//                           pos === 'tamburina' ? 'Tamburina' :
//                           pos === 'timoniere' ? 'Timoniere' : pos
//                         ).join(', ') 
//                       : 'N/D'}
//                   </TableCell>
//                 )}
                
//                 {visibleColumns.tagliaShirt && (
//                   <TableCell>{iscrizione.tagliaShirt?.toUpperCase() || 'N/D'}</TableCell>
//                 )}
                
//                 {visibleColumns.tagliaCostume && (
//                   <TableCell>{iscrizione.tagliaCostume?.toUpperCase() || 'N/D'}</TableCell>
//                 )}
                
//                 {visibleColumns.squadra && (
//                   <TableCell>
//                     {iscrizione.squadra === 'dragon_pine' ? 'Dragon Piné' :
//                      iscrizione.squadra === 'pine_sharks' ? 'Piné Sharks' :
//                      iscrizione.squadra === 'dragon_flames' ? 'Dragon Flames' :
//                      iscrizione.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D'}
//                   </TableCell>
//                 )}
                
//                 {visibleColumns.tipoIscrizione && (
//                   <TableCell>
//                     {iscrizione.tipoIscrizione === 'atleta' ? 'Atleta' :
//                      iscrizione.tipoIscrizione === 'socio' ? 'Socio' :
//                      iscrizione.tipoIscrizione === 'atleta_socio' ? 'Atleta e Socio' : 'N/D'}
//                   </TableCell>
//                 )}
                
//                 {visibleColumns.dataScadenzaVisita && (
//                   <TableCell>{formatDate(iscrizione.dataScadenzaVisita)}</TableCell>
//                 )}
                
//                 {visibleColumns.dataIscrizione && (
//                   <TableCell>{formatDate(iscrizione.dataIscrizione)}</TableCell>
//                 )}
                
//                 {/* Colonne per documenti singoli */}
//                 {visibleColumns.cartaIdentitaFronte && (
//                   <TableCell>
//                     {renderDocumentLink(iscrizione.cartaIdentitaFronteUrl, 'Visualizza')}
//                   </TableCell>
//                 )}
                
//                 {visibleColumns.cartaIdentitaRetro && (
//                   <TableCell>
//                     {renderDocumentLink(iscrizione.cartaIdentitaRetroUrl, 'Visualizza')}
//                   </TableCell>
//                 )}
                
//                 {visibleColumns.visitaMedica && (
//                   <TableCell>
//                     {renderDocumentLink(iscrizione.visitaMedicaUrl, 'Visualizza')}
//                   </TableCell>
//                 )}
                
//                 {visibleColumns.moduloTesseramento && (
//                   <TableCell>
//                     {renderDocumentLink(iscrizione.moduloTesseramentoUrl, 'Visualizza')}
//                   </TableCell>
//                 )}
                
//                 {visibleColumns.ricevutaPagamento && (
//                   <TableCell>
//                     {renderDocumentLink(iscrizione.ricevutaPagamentoUrl, 'Visualizza')}
//                   </TableCell>
//                 )}
                
//                 {visibleColumns.fotoPersonale && (
//                   <TableCell>
//                     {renderDocumentLink(iscrizione.fotoPersonaleUrl, 'Visualizza')}
//                   </TableCell>
//                 )}
                
//                 <TableCell>
//                   <Button 
//                     variant="contained" 
//                     size="small" 
//                     onClick={() => handleOpenDetails(iscrizione)}
//                   >
//                     Dettagli
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
  
//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Iscrizioni Dragon Piné
//           <Typography variant="caption" sx={{ ml: 2, color: 'text.secondary' }}>
//             ({filteredIscrizioni.length} su {iscrizioni.length})
//           </Typography>
//         </Typography>
        
//         {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
//         {/* Barra degli strumenti */}
//         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
//           <TextField
//             label="Cerca"
//             variant="outlined"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             fullWidth={isMobile}
//             size={isMobile ? "small" : "medium"}
//             InputProps={{
//               startAdornment: <Search fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
//               endAdornment: searchTerm ? (
//                 <IconButton size="small" onClick={() => setSearchTerm('')}>
//                   <Close fontSize="small" />
//                 </IconButton>
//               ) : null
//             }}
//           />
          
//           <Stack 
//             direction="row" 
//             spacing={1} 
//             sx={{ 
//               width: isMobile ? '100%' : 'auto',
//               justifyContent: isMobile ? 'space-between' : 'flex-start',
//               flexWrap: 'wrap'
//             }}
//           >
//             <Button 
//               variant="outlined" 
//               onClick={fetchIscrizioni} 
//               startIcon={<Refresh />}
//               size="small"
//             >
//               Aggiorna
//             </Button>
            
//             <Button
//               variant="outlined"
//               onClick={exportToExcel}
//               startIcon={<FileDownload />}
//               size="small"
//             >
//               Excel
//             </Button>
            
//             {/* Opzione "Tutte le colonne" più evidente su mobile */}
//             <Button
//               variant={showAllColumns ? "contained" : "outlined"}
//               color={showAllColumns ? "primary" : "default"}
//               onClick={handleToggleAllColumns}
//               startIcon={<ViewColumn />}
//               size="small"
//             >
//               {showAllColumns ? "Vista Completa" : "Mostra Tutto"}
//             </Button>
//           </Stack>
          
//           {activeFiltersCount > 0 && (
//             <Button
//               variant="outlined" 
//               color="error"
//               onClick={handleClearAllFilters}
//               startIcon={<Close />}
//               size="small"
//               fullWidth={isMobile}
//             >
//               Reset filtri ({activeFiltersCount})
//             </Button>
//           )}
//         </Stack>
        
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <>
//             {isMobile ? <MobileView /> : <DesktopView />}
//           </>
//         )}
//       </Paper>
      
//       {/* Popover per filtri colonna */}
//       <Popover
//         open={Boolean(anchorElFilter)}
//         anchorEl={anchorElFilter}
//         onClose={handleCloseFilter}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//       >
//         <Box sx={{ p: 2, width: 250 }}>
//           <Typography variant="subtitle2" gutterBottom>
//             Filtra {ALL_COLUMNS.find(col => col.id === currentFilterColumn)?.label || ''}
//           </Typography>
//           <TextField
//             autoFocus
//             placeholder="Filtra..."
//             fullWidth
//             size="small"
//             defaultValue={columnFilters[currentFilterColumn] || ''}
//             inputRef={filterTextRef}
//             onKeyPress={(e) => {
//               if (e.key === 'Enter') {
//                 handleApplyFilter(e.target.value);
//               }
//             }}
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//             <Button size="small" onClick={handleCloseFilter} sx={{ mr: 1 }}>
//               Annulla
//             </Button>
//             <Button 
//               size="small" 
//               variant="contained" 
//               onClick={() => {
//                 if (filterTextRef.current) {
//                   handleApplyFilter(filterTextRef.current.value);
//                 }
//               }}
//             >
//               Applica
//             </Button>
//           </Box>
//         </Box>
//       </Popover>
      
//       {/* Modal dettagli iscrizione */}
//       <Modal
//         open={openModal}
//         onClose={handleCloseDetails}
//         aria-labelledby="dettagli-iscrizione"
//       >
//         <Box sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: isMobile ? '95%' : 600,
//           maxHeight: '90vh',
//           overflow: 'auto',
//           bgcolor: 'background.paper',
//           borderRadius: 2,
//           boxShadow: 24,
//           p: isMobile ? 2 : 4,
//         }}>
//           {selectedIscrizione && (
//             <>
//               <Typography variant="h5" gutterBottom>
//                 N° {selectedIscrizione.numero_progressivo 
//                     ? String(selectedIscrizione.numero_progressivo).padStart(3, '0') 
//                     : 'N/D'} - {selectedIscrizione.nome} {selectedIscrizione.cognome}
//               </Typography>
              
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="h6" sx={{ mt: 3, mb: 1, borderBottom: '1px solid #eee', pb: 1 }}>
//                   Dati Personali
//                 </Typography>
//                 <Table size="small">
//                   <TableBody>
//                     <TableRow>
//                       <TableCell component="th" width="40%">Email:</TableCell>
//                       <TableCell>{selectedIscrizione.email}</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Cellulare:</TableCell>
//                       <TableCell>{selectedIscrizione.cellulare}</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Indirizzo:</TableCell>
//                       <TableCell>
//                         {selectedIscrizione.indirizzo}, {selectedIscrizione.comune} ({selectedIscrizione.cap})
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Data di nascita:</TableCell>
//                       <TableCell>{formatDate(selectedIscrizione.dataNascita)}</TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
                
//                 <Typography variant="h6" sx={{ mt: 3, mb: 1, borderBottom: '1px solid #eee', pb: 1 }}>
//                   Dati Sportivi
//                 </Typography>
//                 <Table size="small">
//                   <TableBody>
//                     <TableRow>
//                       <TableCell component="th" width="40%">Altezza:</TableCell>
//                       <TableCell>{selectedIscrizione.altezza} cm</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Peso:</TableCell>
//                       <TableCell>{selectedIscrizione.peso} kg</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Posizione in barca:</TableCell>
//                       <TableCell>
//                         {Array.isArray(selectedIscrizione.posizioneBarca) 
//                           ? selectedIscrizione.posizioneBarca.map(pos => 
//                               pos === 'destro' ? 'Destro/a' :
//                               pos === 'sinistro' ? 'Sinistro/a' :
//                               pos === 'tamburina' ? 'Tamburina' :
//                               pos === 'timoniere' ? 'Timoniere' : pos
//                             ).join(', ') 
//                           : 'N/D'}
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Taglia T-Shirt:</TableCell>
//                       <TableCell>{selectedIscrizione.tagliaShirt?.toUpperCase() || 'N/D'}</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Taglia Costume:</TableCell>
//                       <TableCell>{selectedIscrizione.tagliaCostume?.toUpperCase() || 'N/D'}</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell component="th">Squadra:</TableCell>
//                       <TableCell>
//                         {selectedIscrizione.squadra === 'dragon_pine' ? 'Dragon Piné' :
//                                                   selectedIscrizione.squadra === 'pine_sharks' ? 'Piné Sharks' :
//                                                   selectedIscrizione.squadra === 'dragon_flames' ? 'Dragon Flames' :
//                                                   selectedIscrizione.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D'}
//                                                </TableCell>
//                                              </TableRow>
//                                              <TableRow>
//                                                <TableCell component="th">Tipo iscrizione:</TableCell>
//                                                <TableCell>
//                                                  {selectedIscrizione.tipoIscrizione === 'atleta' ? 'Atleta' :
//                                                   selectedIscrizione.tipoIscrizione === 'socio' ? 'Socio' :
//                                                   selectedIscrizione.tipoIscrizione === 'atleta_socio' ? 'Atleta e Socio' : 'N/D'}
//                                                </TableCell>
//                                              </TableRow>
//                                              <TableRow>
//                                                <TableCell component="th">Scadenza visita:</TableCell>
//                                                <TableCell>{formatDate(selectedIscrizione.dataScadenzaVisita)}</TableCell>
//                                              </TableRow>
//                                            </TableBody>
//                                          </Table>
                                         
//                                          <Typography variant="h6" sx={{ mt: 3, mb: 1, borderBottom: '1px solid #eee', pb: 1 }}>
//                                            Documenti
//                                          </Typography>
                                         
//                                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
//                                            {selectedIscrizione.cartaIdentitaFronteUrl && (
//                                              <Button 
//                                                variant="outlined" 
//                                                color="primary"
//                                                href={selectedIscrizione.cartaIdentitaFronteUrl}
//                                                target="_blank"
//                                                rel="noopener noreferrer"
//                                                startIcon={<FileDownload />}
//                                                fullWidth={isMobile}
//                                              >
//                                                Carta d'identità (fronte)
//                                              </Button>
//                                            )}
                                           
//                                            {selectedIscrizione.cartaIdentitaRetroUrl && (
//                                              <Button 
//                                                variant="outlined" 
//                                                color="primary"
//                                                href={selectedIscrizione.cartaIdentitaRetroUrl}
//                                                target="_blank"
//                                                rel="noopener noreferrer"
//                                                startIcon={<FileDownload />}
//                                                fullWidth={isMobile}
//                                              >
//                                                Carta d'identità (retro)
//                                              </Button>
//                                            )}
                                           
//                                            {selectedIscrizione.visitaMedicaUrl && (
//                                              <Button 
//                                                variant="outlined" 
//                                                color="primary"
//                                                href={selectedIscrizione.visitaMedicaUrl}
//                                                target="_blank"
//                                                rel="noopener noreferrer"
//                                                startIcon={<FileDownload />}
//                                                fullWidth={isMobile}
//                                              >
//                                                Visita medica
//                                              </Button>
//                                            )}
                                           
//                                            {selectedIscrizione.moduloTesseramentoUrl && (
//                                              <Button 
//                                                variant="outlined" 
//                                                color="primary"
//                                                href={selectedIscrizione.moduloTesseramentoUrl}
//                                                target="_blank"
//                                                rel="noopener noreferrer"
//                                                startIcon={<FileDownload />}
//                                                fullWidth={isMobile}
//                                              >
//                                                Modulo tesseramento
//                                              </Button>
//                                            )}
                                           
//                                            {selectedIscrizione.ricevutaPagamentoUrl && (
//                                              <Button 
//                                                variant="outlined" 
//                                                color="primary"
//                                                href={selectedIscrizione.ricevutaPagamentoUrl}
//                                                target="_blank"
//                                                rel="noopener noreferrer"
//                                                startIcon={<FileDownload />}
//                                                fullWidth={isMobile}
//                                              >
//                                                Ricevuta pagamento
//                                              </Button>
//                                            )}
                                           
//                                            {selectedIscrizione.fotoPersonaleUrl && (
//                                              <Button 
//                                                variant="outlined" 
//                                                color="primary"
//                                                href={selectedIscrizione.fotoPersonaleUrl}
//                                                target="_blank"
//                                                rel="noopener noreferrer"
//                                                startIcon={<FileDownload />}
//                                                fullWidth={isMobile}
//                                              >
//                                                Foto personale
//                                              </Button>
//                                            )}
                         
//                                            {/* Mostra anteprima della foto personale */}
//                                            {selectedIscrizione.fotoPersonaleUrl && (
//                                              <Box sx={{ mt: 2, textAlign: 'center' }}>
//                                                <Typography variant="subtitle2" gutterBottom>
//                                                  Anteprima foto personale
//                                                </Typography>
//                                                <Box 
//                                                  component="img" 
//                                                  src={selectedIscrizione.fotoPersonaleUrl}
//                                                  alt="Foto personale"
//                                                  sx={{
//                                                    maxWidth: '100%',
//                                                    maxHeight: 200,
//                                                    objectFit: 'contain',
//                                                    borderRadius: 1,
//                                                    border: '1px solid #eee'
//                                                  }}
//                                                />
//                                              </Box>
//                                            )}
//                                          </Box>
//                                        </Box>
                                       
//                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//                                          <Button 
//                                            variant="outlined" 
//                                            color="secondary" 
//                                            onClick={generateReceipt}
//                                            startIcon={<PictureAsPdf />}
//                                          >
//                                            Scarica Ricevuta
//                                          </Button>
//                                          <Button variant="contained" onClick={handleCloseDetails}>Chiudi</Button>
//                                        </Box>
//                                      </>
//                                    )}
//                                  </Box>
//                                </Modal>
//                              </Container>
//                            );
//                          };
                         
//                          export default DashboardSemplice;




// DashboardSemplice.jsx - Versione ottimizzata

import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Divider,
  Tooltip,
  Switch,
  TableSortLabel,
  Link
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
  Assignment,
  PictureAsPdf,
  Download,
  Link as LinkIcon,
  OpenInNew
} from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { useTheme } from '@mui/material/styles';

// Configurazione Supabase

const supabaseUrl = 'https://guoicoktnwrvzsynrfdf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1b2ljb2t0bndydnpzeW5yZmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDIzODIsImV4cCI6MjA1OTg3ODM4Mn0.RmaA7PBCuJssRDl1ee0_VT7A1h5YkZMFzf0MqtlB4K4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Lista di tutte le colonne possibili
const ALL_COLUMNS = [
  { id: 'numero_progressivo', label: 'N° Progressivo', defaultVisible: true, pinned: false },
  { id: 'nome', label: 'Nome', defaultVisible: true, pinned: true },
  { id: 'cognome', label: 'Cognome', defaultVisible: true, pinned: true },
  { id: 'email', label: 'Email', defaultVisible: true, pinned: false },
  { id: 'cellulare', label: 'Cellulare', defaultVisible: false, pinned: false },
  { id: 'indirizzo', label: 'Indirizzo', defaultVisible: false, pinned: false },
  { id: 'comune', label: 'Comune', defaultVisible: false, pinned: false },
  { id: 'cap', label: 'CAP', defaultVisible: false, pinned: false },
  { id: 'dataNascita', label: 'Data Nascita', defaultVisible: false, pinned: false },
  { id: 'altezza', label: 'Altezza', defaultVisible: false, pinned: false },
  { id: 'peso', label: 'Peso', defaultVisible: false, pinned: false },
  { id: 'posizioneBarca', label: 'Posizione Barca', defaultVisible: false, pinned: false },
  { id: 'tagliaShirt', label: 'Taglia T-Shirt', defaultVisible: false, pinned: false },
  { id: 'tagliaCostume', label: 'Taglia Costume', defaultVisible: false, pinned: false },
  { id: 'squadra', label: 'Squadra', defaultVisible: true, pinned: false },
  { id: 'tipoIscrizione', label: 'Tipo Iscrizione', defaultVisible: false, pinned: false },
  { id: 'dataScadenzaVisita', label: 'Scadenza Visita', defaultVisible: false, pinned: false },
  { id: 'dataIscrizione', label: 'Data Iscrizione', defaultVisible: true, pinned: false },
  { id: 'cartaIdentitaFronte', label: 'CI Fronte', defaultVisible: false, sortable: false, pinned: false },
  { id: 'cartaIdentitaRetro', label: 'CI Retro', defaultVisible: false, sortable: false, pinned: false },
  { id: 'visitaMedica', label: 'Visita Medica', defaultVisible: false, sortable: false, pinned: false },
  { id: 'moduloTesseramento', label: 'Modulo', defaultVisible: false, sortable: false, pinned: false },
  { id: 'ricevutaPagamento', label: 'Ricevuta', defaultVisible: false, sortable: false, pinned: false },
  { id: 'fotoPersonale', label: 'Foto', defaultVisible: false, sortable: false, pinned: false }
];

const DashboardSemplice = () => {
  const theme = useTheme();
  const [iscrizioni, setIscrizioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIscrizione, setSelectedIscrizione] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [columnFilters, setColumnFilters] = useState({});
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [currentFilterColumn, setCurrentFilterColumn] = useState('');
  const filterTextRef = useRef('');
  const [selectedRow, setSelectedRow] = useState(null);
  
  // Ordinamento
  const [orderBy, setOrderBy] = useState('dataIscrizione');
  const [order, setOrder] = useState('desc');
  
  // Inizializza le colonne visibili in base ai valori predefiniti
  const defaultVisibleColumns = ALL_COLUMNS.reduce((acc, column) => {
    acc[column.id] = column.defaultVisible;
    return acc;
  }, {});
  
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [showAllColumns, setShowAllColumns] = useState(false);
  const [anchorElColumns, setAnchorElColumns] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  // Check if screen is mobile
  const isMobile = useMediaQuery('(max-width:600px)');
  
  useEffect(() => {
    fetchIscrizioni();
  }, []);
  
  // Effetto per aggiornare le colonne visibili quando showAllColumns cambia
  useEffect(() => {
    if (showAllColumns) {
      // Mostra tutte le colonne mantenendo le fisse
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
      
      // Usa il numero_progressivo direttamente dal database
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
  
  // Gestione ordinamento
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  // Gestione dei filtri per colonna
  const handleOpenFilter = (event, column) => {
    event.stopPropagation();
    setAnchorElFilter(event.currentTarget);
    setCurrentFilterColumn(column);
    
    // Prepopola il campo di filtro con il valore attuale
    setTimeout(() => {
      if (filterTextRef.current) {
        filterTextRef.current.value = columnFilters[column] || '';
      }
    }, 100);
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
    // Non permettere di nascondere le colonne fisse
    const isPinned = ALL_COLUMNS.find(col => col.id === column)?.pinned;
    if (isPinned) return;
    
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

  // Gestione riga selezionata
  const handleRowClick = (iscrizione) => {
    if (selectedRow && selectedRow.id === iscrizione.id) {
      setSelectedRow(null);
    } else {
      setSelectedRow(iscrizione);
    }
  };

  // Trasforma i dati per le esportazioni
  const prepareExportData = (items) => {
    return items.map(i => ({
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
      'Carta d\'identità (fronte)': i.cartaIdentitaFronteUrl || '',
      'Carta d\'identità (retro)': i.cartaIdentitaRetroUrl || '',
      'Visita Medica': i.visitaMedicaUrl || '',
      'Modulo Tesseramento': i.moduloTesseramentoUrl || '',
      'Ricevuta Pagamento': i.ricevutaPagamentoUrl || '',
      'Foto Personale': i.fotoPersonaleUrl || ''
    }));
  };
  
  // Esportazione dati in Excel migliorata
  const exportToExcel = () => {
    // Preparazione dei dati
    const dataToExport = prepareExportData(filteredIscrizioni);
    
    // Crea il foglio di lavoro
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    
    // Imposta larghezza colonne
    const columnWidths = [
      { wch: 15 }, // Numero progressivo
      { wch: 20 }, // Nome
      { wch: 20 }, // Cognome
      { wch: 30 }, // Email
      { wch: 15 }, // Cellulare
      { wch: 30 }, // Indirizzo
      { wch: 20 }, // Comune
      { wch: 10 }, // CAP
      { wch: 15 }, // Data Nascita
      { wch: 12 }, // Altezza
      { wch: 12 }, // Peso
      { wch: 20 }, // Posizione Barca
      { wch: 12 }, // Taglia T-Shirt
      { wch: 12 }, // Taglia Costume
      { wch: 15 }, // Squadra
      { wch: 15 }, // Tipo Iscrizione
      { wch: 15 }, // Scadenza Visita
      { wch: 15 }, // Data Iscrizione
      { wch: 50 }, // Carta identità fronte
      { wch: 50 }, // Carta identità retro
      { wch: 50 }, // Visita medica
      { wch: 50 }, // Modulo tesseramento
      { wch: 50 }, // Ricevuta pagamento
      { wch: 50 }  // Foto personale
    ];
    worksheet['!cols'] = columnWidths;
    
    // Imposta stili cella intestazione
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!worksheet[address]) continue;
      worksheet[address].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "4F81BD" } },
        alignment: { horizontal: "center", vertical: "center" }
      };
    }
    
    // Aggiungi hyperlink alle celle con URL
    for (let i = 0; i < dataToExport.length; i++) {
      const rowIndex = i + 1; // +1 perché la riga 0 è l'intestazione
      
      // Per ogni campo URL
      ['Carta d\'identità (fronte)', 'Carta d\'identità (retro)', 'Visita Medica', 'Modulo Tesseramento', 'Ricevuta Pagamento', 'Foto Personale'].forEach(field => {
        if (dataToExport[i][field]) {
          // Calcola l'indirizzo cella
          const colIndex = Object.keys(dataToExport[i]).indexOf(field);
          const cellRef = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
          
          // Definisci la cella come hyperlink
          worksheet[cellRef] = {
            t: 's',
            v: 'Visualizza documento',
            l: { Target: dataToExport[i][field], Tooltip: `Apri ${field}` }
          };
          
          // Formatta il testo in blu e sottolineato
          if (!worksheet.s) worksheet.s = {};
          worksheet.s[cellRef] = {
            font: { color: { rgb: "0000FF" }, underline: true }
          };
        }
      });
    }
    
    const workbook = XLSX.utils.book_new();
    workbook.Props = {
      Title: "Iscrizioni Dragon Piné",
      Subject: "Elenco iscrizioni",
      Author: "Asd Dragon Piné",
      CreatedDate: new Date()
    };
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "Iscrizioni");
    
    // Genera il file Excel
    XLSX.writeFile(workbook, "Iscrizioni_Dragon_Pine.xlsx");
  };
  
  // Funzione aggiornata per generare PDF
  const generateReceipt = () => {
    if (!selectedIscrizione) return;
    
    try {
      // Crea un nuovo documento PDF
      const doc = new jsPDF();
      
      // Intestazione
      doc.setFontSize(20);
      doc.text("ASD DRAGON PINÉ", 105, 20, { align: "center" });
      doc.setFontSize(16);
      doc.text("Ricevuta di Iscrizione", 105, 30, { align: "center" });
      doc.setFontSize(10);
      doc.text("C.F. 96106680224 – Via del Cadrobol 7 – 38042 Baselga di Piné", 105, 40, { align: "center" });
      
      // Funzione helper per aggiungere righe di testo
      const addRow = (label, value, y) => {
        doc.setFont('helvetica', 'bold');
        doc.text(label, 20, y);
        doc.setFont('helvetica', 'normal');
        doc.text(value || 'N/D', 80, y);
        return y + 8; // Restituisce la prossima posizione Y
      };
      
      // Dati iscrizione
      doc.setFontSize(14);
      doc.text("DATI ISCRIZIONE", 20, 55);
      doc.line(20, 57, 190, 57); // Linea sotto il titolo
      
      doc.setFontSize(10);
      let y = 65;
      
      y = addRow("Numero iscrizione:", selectedIscrizione.numero_progressivo 
        ? String(selectedIscrizione.numero_progressivo).padStart(3, '0') : 'N/D', y);
        
      y = addRow("Nominativo:", `${selectedIscrizione.nome} ${selectedIscrizione.cognome}`, y);
      y = addRow("Email:", selectedIscrizione.email, y);
      y = addRow("Cellulare:", selectedIscrizione.cellulare, y);
      y = addRow("Indirizzo:", `${selectedIscrizione.indirizzo}, ${selectedIscrizione.comune} (${selectedIscrizione.cap})`, y);
      y = addRow("Data di nascita:", formatDate(selectedIscrizione.dataNascita), y);
      
      const squadraText = selectedIscrizione.squadra === 'dragon_pine' ? 'Dragon Piné' :
                         selectedIscrizione.squadra === 'pine_sharks' ? 'Piné Sharks' :
                         selectedIscrizione.squadra === 'dragon_flames' ? 'Dragon Flames' :
                         selectedIscrizione.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D';
      y = addRow("Squadra:", squadraText, y);
      
      const tipoText = selectedIscrizione.tipoIscrizione === 'atleta' ? 'Atleta' :
                      selectedIscrizione.tipoIscrizione === 'socio' ? 'Socio' :
                      selectedIscrizione.tipoIscrizione === 'atleta_socio' ? 'Atleta e Socio' : 'N/D';
      y = addRow("Tipo iscrizione:", tipoText, y);
      
      y = addRow("Data iscrizione:", formatDate(selectedIscrizione.dataIscrizione), y);
      
      // Documenti forniti
      y += 10;
      doc.setFontSize(14);
      doc.text("DOCUMENTI FORNITI", 20, y);
      y += 2;
      doc.line(20, y, 190, y);
      y += 8;
      
      doc.setFontSize(10);
      y = addRow("Carta d'identità (fronte):", selectedIscrizione.cartaIdentitaFronteUrl ? '✓ Fornita' : '✗ Non fornita', y);
      y = addRow("Carta d'identità (retro):", selectedIscrizione.cartaIdentitaRetroUrl ? '✓ Fornita' : '✗ Non fornita', y);
      y = addRow("Visita medica:", selectedIscrizione.visitaMedicaUrl ? '✓ Fornita' : '✗ Non fornita', y);
      y = addRow("Scadenza visita medica:", formatDate(selectedIscrizione.dataScadenzaVisita), y);
      y = addRow("Modulo tesseramento:", selectedIscrizione.moduloTesseramentoUrl ? '✓ Fornito' : '✗ Non fornito', y);
      y = addRow("Ricevuta pagamento:", selectedIscrizione.ricevutaPagamentoUrl ? '✓ Fornita' : '✗ Non fornita', y);
      y = addRow("Foto personale:", selectedIscrizione.fotoPersonaleUrl ? '✓ Fornita' : '✗ Non fornita', y);
      
      // Dichiarazione e firme
      y += 15;
      doc.setFontSize(10);
      doc.text("Si dichiara che l'atleta ha fornito tutti i documenti richiesti e ha accettato la privacy policy", 20, y);
      y += 5;
      doc.text("dell'ASD Dragon Piné per il trattamento dei dati personali.", 20, y);
      
      // Firme
      y += 20;
      doc.text("Firma ASD Dragon Piné", 140, y - 5);
      doc.line(130, y, 180, y);
      
      // Data generazione
      doc.setFontSize(8);
      doc.text(`Documento generato il ${new Date().toLocaleDateString('it-IT')}`, 105, 280, { align: "center" });
      
      // Salva il PDF
      doc.save(`Ricevuta_${selectedIscrizione.cognome}_${selectedIscrizione.nome}.pdf`);
      
      console.log('PDF generato con successo');
    } catch (error) {
      console.error('Errore nella generazione PDF:', error);
      alert('Si è verificato un errore nella generazione del PDF. Controlla la console per dettagli.');
    }
  };
  
  // Ottieni valore leggibile per la lista di documenti
  const getReadableDocuments = (iscrizione) => {
    const docs = [];
    
    if (iscrizione.cartaIdentitaFronteUrl) docs.push({ name: 'CI Fronte', url: iscrizione.cartaIdentitaFronteUrl });
    if (iscrizione.cartaIdentitaRetroUrl) docs.push({ name: 'CI Retro', url: iscrizione.cartaIdentitaRetroUrl });
    if (iscrizione.visitaMedicaUrl) docs.push({ name: 'Visita Medica', url: iscrizione.visitaMedicaUrl });
    if (iscrizione.moduloTesseramentoUrl) docs.push({ name: 'Modulo', url: iscrizione.moduloTesseramentoUrl });
    if (iscrizione.ricevutaPagamentoUrl) docs.push({ name: 'Ricevuta', url: iscrizione.ricevutaPagamentoUrl });
    if (iscrizione.fotoPersonaleUrl) docs.push({ name: 'Foto', url: iscrizione.fotoPersonaleUrl });
    
    return docs;
  };
  
  // Filtraggio e ordinamento dati
  const filteredIscrizioni = useMemo(() => {
    return iscrizioni
      .filter(iscrizione => {
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
      })
      .sort((a, b) => {
        // Funzione di confronto per ordinamento
        const isAsc = order === 'asc';
        
        // Gestione speciale per vari tipi di colonne
        switch (orderBy) {
          case 'numero_progressivo':
            return isAsc 
              ? (a.numero_progressivo || 0) - (b.numero_progressivo || 0)
              : (b.numero_progressivo || 0) - (a.numero_progressivo || 0);
          
          case 'dataIscrizione':
          case 'dataNascita':
          case 'dataScadenzaVisita':
            const dateA = a[orderBy] ? new Date(a[orderBy]) : new Date(0);
            const dateB = b[orderBy] ? new Date(b[orderBy]) : new Date(0);
            return isAsc ? dateA - dateB : dateB - dateA;
          
          case 'squadra':
            const squadraA = a.squadra || '';
            const squadraB = b.squadra || '';
            return isAsc 
              ? squadraA.localeCompare(squadraB)
              : squadraB.localeCompare(squadraA);
          
          default:
            // Per le colonne di testo
            const valA = a[orderBy] || '';
            const valB = b[orderBy] || '';
            
            if (typeof valA === 'string' && typeof valB === 'string') {
              return isAsc 
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
            }
            
            // Fallback per altri tipi
            return isAsc
              ? (valA < valB ? -1 : valA > valB ? 1 : 0)
              : (valA < valB ? 1 : valA > valB ? -1 : 0);
        }
      });
  }, [iscrizioni, searchTerm, columnFilters, order, orderBy]);
  
    // Numero di filtri attivi
    const activeFiltersCount = Object.keys(columnFilters).length + (searchTerm ? 1 : 0);
  
    // Renderizza un documento come link o icona in base al tipo
    const renderDocumentLink = (url, label) => {
      if (!url) return null;
      
      return (
        <Button
          variant="text"
          size="small"
          color="primary"
          href={url}
          target="_blank"
          startIcon={<OpenInNew fontSize="small" />}
          sx={{ minWidth: 'auto', p: 0.5 }}
        >
          {label}
        </Button>
      );
    };
    
    // Filtro mobile migliorato
    const MobileFilters = () => (
      <Box sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        zIndex: 10,
        p: 2,
        boxShadow: 3,
        transform: mobileFilterOpen ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s ease-in-out'
      }}>
        <Typography variant="h6" gutterBottom>
          Filtri
          <IconButton 
            size="small" 
            onClick={() => setMobileFilterOpen(false)}
            sx={{ float: 'right' }}
          >
            <Close />
          </IconButton>
        </Typography>
        
        <Stack spacing={2}>
          <TextField
            label="Cerca in tutti i campi"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
          
          {Object.entries(columnFilters).map(([column, value]) => (
            <Box key={column} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" sx={{ minWidth: 100 }}>
                {ALL_COLUMNS.find(col => col.id === column)?.label || column}:
              </Typography>
              <Chip 
                size="small" 
                label={value} 
                onDelete={() => handleClearFilter(column)}
              />
            </Box>
          ))}
          
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setMobileFilterOpen(false);
                // Apri filtro nome come esempio di filtro comune
                setTimeout(() => {
                  handleOpenFilter({ currentTarget: document.body }, 'nome');
                }, 300);
              }}
              startIcon={<FilterList />}
            >
              Aggiungi filtro
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => {
                handleClearAllFilters();
                setMobileFilterOpen(false);
              }}
              startIcon={<Close />}
              disabled={activeFiltersCount === 0}
            >
              Reset filtri
            </Button>
          </Stack>
        </Stack>
      </Box>
    );
    
    // Renderizzazione mobile delle iscrizioni (card layout)
    const MobileView = () => (
      <Box>
        {filteredIscrizioni.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography>Nessuna iscrizione trovata</Typography>
          </Paper>
        ) : (
          filteredIscrizioni.map((iscrizione) => (
            <Card 
              key={iscrizione.id} 
              sx={{ 
                mb: 2,
                border: selectedRow?.id === iscrizione.id ? `2px solid ${theme.palette.primary.main}` : 'none',
              }}
              onClick={() => handleRowClick(iscrizione)}
            >
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
                
                {/* Layout con Box e flexbox invece di Grid */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {/* Sezione info generali */}
                  <Box sx={{ bgcolor: 'background.paper', p: 1.5, borderRadius: 1, mb: 1 }}>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      Informazioni Generali
                    </Typography>
                    
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                      {visibleColumns.squadra && (
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">Squadra</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {iscrizione.squadra === 'dragon_pine' ? 'Dragon Piné' :
                             iscrizione.squadra === 'pine_sharks' ? 'Piné Sharks' :
                             iscrizione.squadra === 'dragon_flames' ? 'Dragon Flames' :
                             iscrizione.squadra === 'dragon_junior' ? 'Dragon Junior' : 'N/D'}
                          </Typography>
                        </Box>
                      )}
                      
                      {visibleColumns.dataIscrizione && (
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">Data Iscrizione</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(iscrizione.dataIscrizione)}</Typography>
                        </Box>
                      )}
                      
                      {visibleColumns.cellulare && (
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">Cellulare</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{iscrizione.cellulare || 'N/D'}</Typography>
                        </Box>
                      )}
                      
                      {visibleColumns.tipoIscrizione && (
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">Tipo</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {iscrizione.tipoIscrizione === 'atleta' ? 'Atleta' :
                             iscrizione.tipoIscrizione === 'socio' ? 'Socio' :
                             iscrizione.tipoIscrizione === 'atleta_socio' ? 'Atleta e Socio' : 'N/D'}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                  
                  {/* Contenuto espandibile quando "Tutte le colonne" è attivo */}
                  {showAllColumns && (
                    <>
                      {/* Sezione dati personali */}
                      <Box sx={{ bgcolor: 'background.paper', p: 1.5, borderRadius: 1, mb: 1 }}>
                        <Typography variant="subtitle2" color="primary" gutterBottom>
                          Dati Personali
                        </Typography>
                        
                        {/* Indirizzo completo */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                          {(visibleColumns.indirizzo || visibleColumns.comune || visibleColumns.cap) && (
                            <Box sx={{ gridColumn: '1 / span 2' }}>
                              <Typography variant="caption" color="text.secondary" display="block">Indirizzo</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {iscrizione.indirizzo || 'N/D'}
                                {iscrizione.comune ? `, ${iscrizione.comune}` : ''}
                                {iscrizione.cap ? ` (${iscrizione.cap})` : ''}
                              </Typography>
                            </Box>
                          )}
                          
                          {visibleColumns.dataNascita && (
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">Data Nascita</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(iscrizione.dataNascita)}</Typography>
                            </Box>
                          )}
                          
                          {visibleColumns.dataScadenzaVisita && (
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">Scadenza Visita</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(iscrizione.dataScadenzaVisita)}</Typography>
                            </Box>
                          )}
                        </Box>
                      </Box>
                      
                      {/* Sezione sport */}
                      <Box sx={{ bgcolor: 'background.paper', p: 1.5, borderRadius: 1, mb: 1 }}>
                        <Typography variant="subtitle2" color="primary" gutterBottom>
                          Dati Sportivi
                        </Typography>
                        
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
                          {visibleColumns.altezza && (
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">Altezza</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>{iscrizione.altezza || 'N/D'} cm</Typography>
                            </Box>
                          )}
                          
                          {visibleColumns.peso && (
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">Peso</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>{iscrizione.peso || 'N/D'} kg</Typography>
                            </Box>
                          )}
                          
                          {visibleColumns.tagliaShirt && (
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">T-Shirt</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>{iscrizione.tagliaShirt?.toUpperCase() || 'N/D'}</Typography>
                            </Box>
                          )}
                          
                          {visibleColumns.tagliaCostume && (
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">Costume</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>{iscrizione.tagliaCostume?.toUpperCase() || 'N/D'}</Typography>
                            </Box>
                          )}
                          
                          {visibleColumns.posizioneBarca && (
                            <Box sx={{ gridColumn: '1 / span 4' }}>
                              <Typography variant="caption" color="text.secondary" display="block">Posizione in barca</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {Array.isArray(iscrizione.posizioneBarca) 
                                  ? iscrizione.posizioneBarca.map(pos => 
                                      pos === 'destro' ? 'Destro/a' :
                                      pos === 'sinistro' ? 'Sinistro/a' :
                                      pos === 'tamburina' ? 'Tamburina' :
                                      pos === 'timoniere' ? 'Timoniere' : pos
                                    ).join(', ') 
                                  : 'N/D'}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Box>
                      
                      {/* Sezione documenti (solo in vista completa) */}
                      <Box sx={{ bgcolor: 'background.paper', p: 1.5, borderRadius: 1, mb: 1 }}>
                        <Typography variant="subtitle2" color="primary" gutterBottom>
                          Documenti
                        </Typography>
                        
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                          {visibleColumns.cartaIdentitaFronte && (
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">CI Fronte</Typography>
                              {iscrizione.cartaIdentitaFronteUrl ? (
                                <Button 
                                  variant="text"
                                  size="small"
                                  href={iscrizione.cartaIdentitaFronteUrl} 
                                  target="_blank"
                                  startIcon={<OpenInNew />}
                                  sx={{ p: 0 }}
                                >
                                  Visualizza
                                </Button>
                              ) : <Typography variant="body2">Non disponibile</Typography>}
                            </Box>
                          )}
                          
                          {visibleColumns.cartaIdentitaRetro && (
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">CI Retro</Typography>
                              {iscrizione.cartaIdentitaRetroUrl ? (
                                <Button 
                                  variant="text"
                                  size="small"
                                  href={iscrizione.cartaIdentitaRetroUrl} 
                                  target="_blank"
                                  startIcon={<OpenInNew />}
                                  sx={{ p: 0 }}
                                >
                                  Visualizza
                                </Button>
                              ) : <Typography variant="body2">Non disponibile</Typography>}
                            </Box>
                          )}
                          
                          {visibleColumns.visitaMedica && (
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">Visita Medica</Typography>
                              {iscrizione.visitaMedicaUrl ? (
                                <Button 
                                  variant="text"
                                  size="small"
                                  href={iscrizione.visitaMedicaUrl} 
                                  target="_blank"
                                  startIcon={<OpenInNew />}
                                  sx={{ p: 0 }}
                                >
                                  Visualizza
                                </Button>
                              ) : <Typography variant="body2">Non disponibile</Typography>}
                            </Box>
                          )}
                          
                          {visibleColumns.moduloTesseramento && (
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">Modulo Tesseramento</Typography>
                              {iscrizione.moduloTesseramentoUrl ? (
                                <Button 
                                  variant="text"
                                  size="small"
                                  href={iscrizione.moduloTesseramentoUrl} 
                                  target="_blank"
                                  startIcon={<OpenInNew />}
                                  sx={{ p: 0 }}
                                >
                                  Visualizza
                                </Button>
                              ) : <Typography variant="body2">Non disponibile</Typography>}
                            </Box>
                          )}
                          
                          {visibleColumns.ricevutaPagamento && (
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">Ricevuta Pagamento</Typography>
                              {iscrizione.ricevutaPagamentoUrl ? (
                                <Button 
                                  variant="text"
                                  size="small"
                                  href={iscrizione.ricevutaPagamentoUrl} 
                                  target="_blank"
                                  startIcon={<OpenInNew />}
                                  sx={{ p: 0 }}
                                >
                                  Visualizza
                                </Button>
                              ) : <Typography variant="body2">Non disponibile</Typography>}
                            </Box>
                          )}
                          
                          {visibleColumns.fotoPersonale && (
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">Foto Personale</Typography>
                              {iscrizione.fotoPersonaleUrl ? (
                                <Button 
                                  variant="text"
                                  size="small"
                                  href={iscrizione.fotoPersonaleUrl} 
                                  target="_blank"
                                  startIcon={<OpenInNew />}
                                  sx={{ p: 0 }}
                                >
                                  Visualizza
                                </Button>
                              ) : <Typography variant="body2">Non disponibile</Typography>}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FilterList />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileFilterOpen(true);
                    }}
                  >
                    Filtri
                  </Button> */}
                  <Button 
                    variant="contained" 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetails(iscrizione);
                    }}
                  >
                    Dettagli
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
        
        <Box sx={{ height: 80 }} /> {/* Spazio per il filtro mobile */}
        <MobileFilters />
      </Box>
    );
    
    // Renderizzazione desktop delle iscrizioni (tabella)
    const DesktopView = () => (
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {ALL_COLUMNS.map(column => {
                if (!visibleColumns[column.id]) return null;
                
                return (
                  <TableCell 
                    key={column.id}
                    sx={column.pinned ? {
                      position: 'sticky',
                      left: column.id === 'nome' ? 0 : 'auto',
                      right: column.id === 'cognome' ? 0 : 'auto',
                      zIndex: 3,
                      backgroundColor: theme.palette.background.paper,
                      boxShadow: column.id === 'nome' ? '2px 0px 3px rgba(0,0,0,0.1)' : 'none'
                    } : {}}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {column.sortable !== false ? (
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : 'asc'}
                          onClick={() => handleRequestSort(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
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
                <TableRow 
                  key={iscrizione.id} 
                  onClick={() => handleRowClick(iscrizione)}
                  sx={{ 
                    cursor: 'pointer',
                    bgcolor: selectedRow?.id === iscrizione.id ? 'action.selected' : 'inherit'
                  }}
                  hover
                >
                  {visibleColumns.numero_progressivo && (
                    <TableCell>
                      {iscrizione.numero_progressivo 
                        ? String(iscrizione.numero_progressivo).padStart(3, '0') 
                        : 'N/D'}
                    </TableCell>
                  )}
                  
                  {/* Celle fisse */}
                  {visibleColumns.nome && (
                    <TableCell 
                      sx={{ 
                        position: 'sticky', 
                        left: 0, 
                        backgroundColor: selectedRow?.id === iscrizione.id 
                          ? 'action.selected' 
                          : theme.palette.background.paper,
                        zIndex: 2
                      }}
                    >
                      {iscrizione.nome}
                    </TableCell>
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
                  
                  {/* Colonne per documenti singoli */}
                  {visibleColumns.cartaIdentitaFronte && (
                    <TableCell>
                      {renderDocumentLink(iscrizione.cartaIdentitaFronteUrl, 'Visualizza')}
                    </TableCell>
                  )}
                  
                  {visibleColumns.cartaIdentitaRetro && (
                    <TableCell>
                      {renderDocumentLink(iscrizione.cartaIdentitaRetroUrl, 'Visualizza')}
                    </TableCell>
                  )}
                  
                  {visibleColumns.visitaMedica && (
                    <TableCell>
                      {renderDocumentLink(iscrizione.visitaMedicaUrl, 'Visualizza')}
                    </TableCell>
                  )}
                  
                  {visibleColumns.moduloTesseramento && (
                    <TableCell>
                      {renderDocumentLink(iscrizione.moduloTesseramentoUrl, 'Visualizza')}
                    </TableCell>
                  )}
                  
                  {visibleColumns.ricevutaPagamento && (
                    <TableCell>
                      {renderDocumentLink(iscrizione.ricevutaPagamentoUrl, 'Visualizza')}
                    </TableCell>
                  )}
                  
                  {visibleColumns.fotoPersonale && (
                    <TableCell>
                      {renderDocumentLink(iscrizione.fotoPersonaleUrl, 'Visualizza')}
                    </TableCell>
                  )}
                  
                  <TableCell onClick={(e) => e.stopPropagation()}>
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
          
          {/* Barra degli strumenti */}
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
              inputRef={filterTextRef}
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
                onClick={() => {
                  if (filterTextRef.current) {
                    handleApplyFilter(filterTextRef.current.value);
                  }
                }}
              >
                Applica
              </Button>
            </Box>
          </Box>
        </Popover>
        
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
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={generateReceipt}
                    startIcon={<PictureAsPdf />}
                  >
                    Scarica Ricevuta
                  </Button>
                  <Button variant="contained" onClick={handleCloseDetails}>
                    Chiudi
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </Container>
    );
  };
  
  export default DashboardSemplice;