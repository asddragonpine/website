// // src/components/fanta/Classifiche.jsx
// import React, { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Tab, 
//   Tabs, 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer, 
//   TableHead, 
//   TableRow, 
//   Paper, 
//   Typography, 
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Container,
//   Chip,
//   Divider,
//   Card,
//   CardContent,
//   Grid,
//   Avatar,
//   useMediaQuery,
//   useTheme,
//   Alert,
//   TextField,
//   InputAdornment
// } from '@mui/material';
// import { 
//   EmojiEvents as TrophyIcon,
//   Timeline as ChartIcon,
//   List as ListIcon,
//   FormatListNumbered as NumberedListIcon,
//   Refresh as RefreshIcon,
//   Search as SearchIcon,
//   Person as PersonIcon
// } from '@mui/icons-material';
// import { getGare, getSquadre, getClassificaGara, getClassificaGenerale, getRisultato, getPronostici } from '../../services/fantaService';
// import { useAuth } from '../../context/AuthContext';

// // Pannello TabPanel per le tab
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`classifiche-tabpanel-${index}`}
//       aria-labelledby={`classifiche-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: { xs: 1, sm: 3 } }}>
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }

// const Classifiche = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const { user } = useAuth();
  
//   const [tabValue, setTabValue] = useState(0);
//   const [gare, setGare] = useState([]);
//   const [squadre, setSquadre] = useState([]);
//   const [selectedGaraId, setSelectedGaraId] = useState('');
//   const [classificaGara, setClassificaGara] = useState([]);
//   const [classificaGenerale, setClassificaGenerale] = useState([]);
//   const [risultatoGara, setRisultatoGara] = useState(null);
//   const [pronosticiGara, setPronosticiGara] = useState([]);
//   const [pronosticoUtente, setPronosticoUtente] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   // Aggiunta dei campi di ricerca per ogni tab
//   const [searchTermGenerale, setSearchTermGenerale] = useState('');
//   const [searchTermGara, setSearchTermGara] = useState('');
//   const [searchTermPronostici, setSearchTermPronostici] = useState('');

//   // Carica gare e squadre all'inizializzazione
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [gareData, squadreData, classificaData] = await Promise.all([
//           getGare(),
//           getSquadre(),
//           getClassificaGenerale()
//         ]);
//         setGare(gareData);
//         setSquadre(squadreData);
//         setClassificaGenerale(classificaData);
        
//         // Imposta di default la prima gara se disponibile
//         if (gareData.length > 0) {
//           setSelectedGaraId(gareData[0].id.toString());
//         }
//       } catch (error) {
//         console.error('Errore caricamento dati:', error);
//         setError('Impossibile caricare i dati. Riprova più tardi.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Carica dati specifici della gara quando viene selezionata
//   useEffect(() => {
//     if (!selectedGaraId) return;
    
//     const fetchGaraData = async () => {
//       setLoading(true);
//       try {
//         // Carica in parallelo tutti i dati necessari
//         const [classificaData, risultatoData, pronosticiData] = await Promise.all([
//           getClassificaGara(parseInt(selectedGaraId)),
//           getRisultato(parseInt(selectedGaraId)),
//           getPronostici(parseInt(selectedGaraId))
//         ]);
        
//         setClassificaGara(classificaData || []);
//         setRisultatoGara(risultatoData);
//         setPronosticiGara(pronosticiData || []);
        
//         // Trova il pronostico dell'utente corrente
//         if (user && pronosticiData) {
//           const mioPron = pronosticiData.find(p => p.user_id === user.id);
//           setPronosticoUtente(mioPron || null);
//         }
//       } catch (error) {
//         console.error('Errore caricamento dati gara:', error);
//         setError('Impossibile caricare i dati della gara.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGaraData();
//   }, [selectedGaraId, user]);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleGaraChange = (event) => {
//     setSelectedGaraId(event.target.value);
//   };
  
//   // Funzioni di filtraggio per le ricerche
//   const filteredClassificaGenerale = classificaGenerale.filter(utente => {
//     const searchTerm = searchTermGenerale.toLowerCase();
//     return !searchTerm || 
//            (utente.utente?.username && utente.utente.username.toLowerCase().includes(searchTerm)) ||
//            (utente.utente?.nome && utente.utente.nome.toLowerCase().includes(searchTerm)) ||
//            (utente.utente?.cognome && utente.utente.cognome.toLowerCase().includes(searchTerm));
//   });
  
//   const filteredClassificaGara = classificaGara.filter(utente => {
//     const searchTerm = searchTermGara.toLowerCase();
//     return !searchTerm || 
//            (utente.utenti?.username && utente.utenti.username.toLowerCase().includes(searchTerm)) ||
//            (utente.utenti?.nome && utente.utenti.nome.toLowerCase().includes(searchTerm)) ||
//            (utente.utenti?.cognome && utente.utenti.cognome.toLowerCase().includes(searchTerm));
//   });
  
//   const filteredPronostici = pronosticiGara.filter(pronostico => {
//     if (!user || pronostico.user_id === user.id) return false; // Escludi sempre il pronostico dell'utente corrente
    
//     const searchTerm = searchTermPronostici.toLowerCase();
//     return !searchTerm || 
//            (pronostico.utente?.username && pronostico.utente.username.toLowerCase().includes(searchTerm)) ||
//            (pronostico.utente?.nome && pronostico.utente.nome.toLowerCase().includes(searchTerm)) ||
//            (pronostico.utente?.cognome && pronostico.utente.cognome.toLowerCase().includes(searchTerm));
//   });
  
//   // Funzione per calcolare i punti per ogni squadra
//   const calcolaPuntiSquadra = (posizionePronostico, posizioneReale) => {
//     if (posizionePronostico === posizioneReale) return 10; // Posizione esatta: 10 punti
//     if (Math.abs(posizionePronostico - posizioneReale) === 1) return 7; // ±1 posizione: 7 punti
//     if (Math.abs(posizionePronostico - posizioneReale) === 2) return 5; // ±2 posizioni: 5 punti
//     if (Math.abs(posizionePronostico - posizioneReale) === 3) return 3; // ±3 posizioni: 3 punti
//     return 0; // Altrimenti: 0 punti
//   };
  
//   // Calcolo dettagliato dei punteggi
//   const calcolaPunteggiDettagliati = (pronostico, risultato) => {
//     if (!pronostico || !risultato || !pronostico.ordine_squadre || !risultato.classifica) {
//       return {
//         punteggiSquadre: [],
//         punteggioGara: 0,
//         punteggioBonus: 0,
//         totale: 0
//       };
//     }
    
//     // Calcola punti per ogni posizione
//     const punteggiSquadre = pronostico.ordine_squadre.map((squadraId, indexPronostico) => {
//       const indexReale = risultato.classifica.indexOf(squadraId);
//       const posizioneReale = indexReale !== -1 ? indexReale + 1 : null;
//       const punti = calcolaPuntiSquadra(indexPronostico + 1, posizioneReale);
      
//       return {
//         squadraId,
//         posizionePronostico: indexPronostico + 1,
//         posizioneReale,
//         punti
//       };
//     });
    
//     // Calcola punteggio totale delle squadre
//     const punteggioGara = punteggiSquadre.reduce((sum, item) => sum + item.punti, 0);
    
//     // Calcola bonus per miglior tempo
//     const punteggioBonus = (pronostico.miglior_tempo_id && 
//                            risultato.miglior_tempo_id &&
//                            pronostico.miglior_tempo_id === risultato.miglior_tempo_id) ? 10 : 0;
    
//     return {
//       punteggiSquadre,
//       punteggioGara,
//       punteggioBonus,
//       totale: punteggioGara + punteggioBonus
//     };
//   };

//   // Funzione per formattare la classifica di squadre
//   const renderSquadreClassifica = (classificaArray) => {
//     if (!classificaArray || !Array.isArray(classificaArray) || !squadre.length) {
//       return <Typography color="text.secondary">Nessun risultato disponibile</Typography>;
//     }

//     return (
//       <TableContainer component={Paper} sx={{ mt: 2 }}>
//         <Table size={isMobile ? "small" : "medium"}>
//           <TableHead>
//             <TableRow>
//               <TableCell>Posizione</TableCell>
//               <TableCell>Squadra</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {classificaArray.map((squadraId, index) => {
//               const squadra = squadre.find(s => s.id === squadraId);
//               return (
//                 <TableRow key={squadraId}>
//                   <TableCell>{index + 1}°</TableCell>
//                   <TableCell>{squadra?.nome || `Squadra ID ${squadraId}`}</TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   };

//   // Visualizzazione pronostico singolo migliorata
//   const renderPronostico = (pronostico, showUser = true) => {
//     if (!pronostico || !pronostico.ordine_squadre) {
//       return <Typography color="text.secondary">Nessun pronostico disponibile</Typography>;
//     }

//     const migliorTempoSquadra = squadre.find(s => s.id === pronostico.miglior_tempo_id);
    
//     // Calcolo dettagliato punti se risultato disponibile
//     const dettagliPunteggio = risultatoGara ? 
//       calcolaPunteggiDettagliati(pronostico, risultatoGara) : 
//       null;

//     return (
//       <Box sx={{ mt: 2 }}>
//         {showUser && pronostico.utente && (
//           <Box sx={{ mb: 2 }}>
//             <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
//               <Avatar 
//                 sx={{ 
//                   width: 32, 
//                   height: 32, 
//                   mr: 1,
//                   bgcolor: 'primary.main'
//                 }}
//               >
//                 {pronostico.utente?.username?.charAt(0).toUpperCase() || <PersonIcon />}
//               </Avatar>
//               {pronostico.utente.username || "Utente"}
//             </Typography>
//             {(pronostico.utente.nome || pronostico.utente.cognome) && (
//               <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
//                 {pronostico.utente.nome} {pronostico.utente.cognome}
//               </Typography>
//             )}
//           </Box>
//         )}
        
//         <TableContainer component={Paper}>
//           <Table size={isMobile ? "small" : "medium"}>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Posizione</TableCell>
//                 <TableCell>Squadra</TableCell>
//                 {dettagliPunteggio && (
//                   <>
//                     <TableCell>Posizione Reale</TableCell>
//                     <TableCell align="right">Punti</TableCell>
//                   </>
//                 )}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {pronostico.ordine_squadre.map((squadraId, index) => {
//                 const squadra = squadre.find(s => s.id === squadraId);
                
//                 // Ottieni dettagli punti se disponibili
//                 const dettaglioSquadra = dettagliPunteggio ? 
//                   dettagliPunteggio.punteggiSquadre.find(p => p.squadraId === squadraId) :
//                   null;
                  
//                 return (
//                   <TableRow key={squadraId} sx={{
//                     bgcolor: dettaglioSquadra?.punti === 10 ? 'rgba(76, 175, 80, 0.1)' : // Verde chiaro per 10 punti
//                             dettaglioSquadra?.punti >= 5 ? 'rgba(255, 235, 59, 0.1)' : // Giallo chiaro per 5-7 punti
//                             dettaglioSquadra?.punti > 0 ? 'rgba(255, 152, 0, 0.1)' : // Arancione chiaro per 3 punti
//                             'inherit' // Default per 0 punti
//                   }}>
//                     <TableCell>{index + 1}°</TableCell>
//                     <TableCell>{squadra?.nome || `Squadra ID ${squadraId}`}</TableCell>
//                     {dettagliPunteggio && (
//                       <>
//                         <TableCell>
//                           {dettaglioSquadra?.posizioneReale ? `${dettaglioSquadra.posizioneReale}°` : 'N/D'}
//                           {dettaglioSquadra?.posizioneReale && (
//                             <Typography component="span" color="text.secondary" fontSize="0.8rem" ml={1}>
//                               ({index + 1 === dettaglioSquadra.posizioneReale ? 'esatta' : 
//                                 Math.abs(index + 1 - dettaglioSquadra.posizioneReale) === 1 ? '±1' :
//                                 Math.abs(index + 1 - dettaglioSquadra.posizioneReale) === 2 ? '±2' :
//                                 Math.abs(index + 1 - dettaglioSquadra.posizioneReale) === 3 ? '±3' : 'altro'})
//                             </Typography>
//                           )}
//                         </TableCell>
//                         <TableCell align="right">
//                           {dettaglioSquadra?.punti > 0 ? (
//                             <Chip 
//                               label={dettaglioSquadra.punti} 
//                               size="small"
//                               color={
//                                 dettaglioSquadra.punti === 10 ? "success" :
//                                 dettaglioSquadra.punti >= 5 ? "warning" :
//                                 "default"
//                               }
//                             />
//                           ) : '0'}
//                         </TableCell>
//                       </>
//                     )}
//                   </TableRow>
//                 );
//               })}
//               {/* Riga riepilogo punti */}
//               {dettagliPunteggio && (
//                 <TableRow sx={{ 
//                   bgcolor: 'rgba(33, 150, 243, 0.05)',
//                   fontWeight: 'bold'
//                 }}>
//                   <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
//                     Totale
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>
//                     {dettagliPunteggio.punteggioBonus > 0 ? 'Bonus: +10' : 'Nessun bonus'}
//                   </TableCell>
//                   <TableCell align="right" sx={{ fontWeight: 'bold' }}>
//                     <Chip 
//                       label={`${dettagliPunteggio.punteggioGara} + ${dettagliPunteggio.punteggioBonus} = ${dettagliPunteggio.totale}`}
//                       color="primary"
//                     />
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
        
//         {migliorTempoSquadra && (
//           <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//             <Typography variant="body2">
//               <strong>Miglior tempo:</strong> {migliorTempoSquadra.nome}
//             </Typography>
            
//             {risultatoGara && risultatoGara.miglior_tempo_id && (
//               <Box>
//                 {pronostico.miglior_tempo_id === risultatoGara.miglior_tempo_id ? (
//                   <Chip 
//                     label="+10 punti" 
//                     size="small" 
//                     color="success" 
//                     variant="outlined"
//                   />
//                 ) : (
//                   <Typography variant="body2" color="text.secondary">
//                     0 punti (miglior tempo errato)
//                   </Typography>
//                 )}
//               </Box>
//             )}
//           </Box>
//         )}
//       </Box>
//     );
//   };

//   if (loading && !gare.length) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ width: '100%' }}>
//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
//       )}
      
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs 
//           value={tabValue} 
//           onChange={handleTabChange} 
//           aria-label="classifiche tabs"
//           centered
//           variant={isMobile ? "fullWidth" : "standard"}
//           scrollButtons={isMobile ? "auto" : false}
//         >
//           <Tab 
//             icon={isMobile ? <TrophyIcon /> : null} 
//             label={isMobile ? "Generale" : "Classifica Generale"} 
//             sx={{ fontSize: isMobile ? '0.7rem' : 'inherit', minWidth: isMobile ? 0 : 'auto' }}
//           />
//           <Tab 
//             icon={isMobile ? <ChartIcon /> : null} 
//             label={isMobile ? "Gara" : "Classifica Gara"} 
//             sx={{ fontSize: isMobile ? '0.7rem' : 'inherit', minWidth: isMobile ? 0 : 'auto' }}
//           />
//           <Tab 
//             icon={isMobile ? <ListIcon /> : null} 
//             label={isMobile ? "Pronostici" : "Pronostici"} 
//             sx={{ fontSize: isMobile ? '0.7rem' : 'inherit', minWidth: isMobile ? 0 : 'auto' }}
//           />
//         </Tabs>
//       </Box>
      
//       {/* Tab Classifica Generale */}
//       <TabPanel value={tabValue} index={0}>
//         <Typography variant="h6" gutterBottom>
//           Classifica Generale FantaDragonBoat
//         </Typography>
        
//         {/* Campo ricerca utenti */}
//         <TextField
//           fullWidth
//           size="small"
//           variant="outlined"
//           label="Cerca utente"
//           value={searchTermGenerale}
//           onChange={(e) => setSearchTermGenerale(e.target.value)}
//           sx={{ mb: 2 }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
        
//         {classificaGenerale.length === 0 ? (
//           <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
//             Nessun punteggio disponibile. I punteggi verranno calcolati dopo l'inserimento dei risultati ufficiali.
//           </Typography>
//         ) : (
//           <TableContainer component={Paper} sx={{ mt: 2 }}>
//             <Table size={isMobile ? "small" : "medium"}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Posizione</TableCell>
//                   <TableCell>Utente</TableCell>
//                   <TableCell align="right">Punteggio Totale</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredClassificaGenerale.map((utente, index) => {
//                   const originalIndex = classificaGenerale.findIndex(u => u.id === utente.id);
//                   return (
//                     <TableRow 
//                       key={utente.id}
//                       sx={{ 
//                         '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
//                         bgcolor: originalIndex === 0 ? '#fff9c4' : // 1° posto oro
//                                 originalIndex === 1 ? '#f5f5f5' : // 2° posto argento
//                                 originalIndex === 2 ? '#ffe0b2' : // 3° posto bronzo
//                                 'inherit'
//                       }}
//                     >
//                       <TableCell component="th" scope="row">
//                         {originalIndex + 1}°
//                         {originalIndex < 3 && (
//                           <Chip 
//                             size="small" 
//                             label={originalIndex === 0 ? "1°" : originalIndex === 1 ? "2°" : "3°"} 
//                             color={originalIndex === 0 ? "warning" : originalIndex === 1 ? "default" : "secondary"}
//                             sx={{ ml: 1 }}
//                           />
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <Avatar 
//                               sx={{ 
//                                 width: 32, 
//                                 height: 32, 
//                                 mr: 1,
//                                 bgcolor: originalIndex === 0 ? 'warning.main' : 
//                                         originalIndex === 1 ? 'grey.400' : 
//                                         originalIndex === 2 ? 'secondary.light' : 'primary.main'
//                               }}
//                             >
//                               {utente.utente?.username?.charAt(0).toUpperCase() || '?'}
//                             </Avatar>
//                             <Typography>{utente.utente?.username || `Utente ID ${utente.id}`}</Typography>
//                           </Box>
//                           {(utente.utente?.nome || utente.utente?.cognome) && (
//                             <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
//                               {utente.utente.nome} {utente.utente.cognome}
//                             </Typography>
//                           )}
//                         </Box>
//                       </TableCell>
//                       <TableCell align="right">
//                         <Typography variant="body1" fontWeight="bold">
//                           {utente.totale}
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//                 {filteredClassificaGenerale.length === 0 && (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">
//                       Nessun utente trovato con i criteri di ricerca
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </TabPanel>
      
//       {/* Tab Classifica Gara */}
//       <TabPanel value={tabValue} index={1}>
//         <Box sx={{ mb: 3 }}>
//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel id="gara-select-label">Seleziona Gara</InputLabel>
//             <Select
//               labelId="gara-select-label"
//               id="gara-select"
//               value={selectedGaraId}
//               label="Seleziona Gara"
//               onChange={handleGaraChange}
//             >
//               {gare.map(gara => (
//                 <MenuItem key={gara.id} value={gara.id.toString()}>
//                   {gara.nome} ({new Date(gara.data).toLocaleDateString()})
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
          
//           {/* Campo ricerca utenti */}
//           <TextField
//             fullWidth
//             size="small"
//             variant="outlined"
//             label="Cerca utente"
//             value={searchTermGara}
//             onChange={(e) => setSearchTermGara(e.target.value)}
//             sx={{ mt: 1 }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
        
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <Box>
//             {/* Risultato ufficiale */}
//             <Paper sx={{ p: 2, mb: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Risultato Ufficiale
//               </Typography>
              
//               {risultatoGara && risultatoGara.classifica ? (
//                 <>
//                   {renderSquadreClassifica(risultatoGara.classifica)}
                  
//                   {risultatoGara.miglior_tempo_id && (
//                     <Typography variant="body2" sx={{ mt: 2 }}>
//                       <strong>Miglior tempo:</strong> {
//                         squadre.find(s => s.id === risultatoGara.miglior_tempo_id)?.nome || 
//                         `Squadra ID ${risultatoGara.miglior_tempo_id}`
//                       }
//                     </Typography>
//                   )}
//                 </>
//               ) : (
//                 <Typography color="text.secondary">
//                   Risultati non ancora disponibili per questa gara
//                 </Typography>
//               )}
//             </Paper>
            
//             {/* Classifica punteggi */}
//             <Paper sx={{ p: 2, mb: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Classifica Punteggi
//               </Typography>
              
//               {classificaGara.length === 0 ? (
//                 <Typography variant="body1" color="text.secondary">
//                   Nessun punteggio disponibile per questa gara. I punteggi verranno calcolati dopo l'inserimento dei risultati ufficiali.
//                 </Typography>
//               ) : (
//                 <TableContainer component={Paper} sx={{ mt: 2 }}>
//                   <Table size={isMobile ? "small" : "medium"}>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Posizione</TableCell>
//                         <TableCell>Utente</TableCell>
//                         <TableCell align="right">Punti</TableCell>
//                         <TableCell align="right">Bonus</TableCell>
//                         <TableCell align="right">Totale</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {filteredClassificaGara.map((utente, index) => {
//                         const originalIndex = classificaGara.findIndex(u => u.id === utente.id);
//                         return (
//                           <TableRow 
//                             key={utente.id}
//                             sx={{ 
//                               '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
//                               bgcolor: originalIndex === 0 ? '#fff9c4' : // 1° posto oro
//                                       originalIndex === 1 ? '#f5f5f5' : // 2° posto argento
//                                       originalIndex === 2 ? '#ffe0b2' : // 3° posto bronzo
//                                       'inherit'
//                             }}
//                           >
//                             <TableCell component="th" scope="row">
//                               {originalIndex + 1}°
//                               {originalIndex < 3 && (
//                                 <Chip 
//                                   size="small" 
//                                   label={originalIndex === 0 ? "1°" : originalIndex === 1 ? "2°" : "3°"} 
//                                   color={originalIndex === 0 ? "warning" : originalIndex === 1 ? "default" : "secondary"}
//                                   sx={{ ml: 1 }}
//                                 />
//                               )}
//                             </TableCell>
//                             <TableCell>
//                               <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                   <Avatar 
//                                     sx={{ 
//                                       width: 32, 
//                                       height: 32, 
//                                       mr: 1,
//                                       bgcolor: originalIndex === 0 ? 'warning.main' : 
//                                               originalIndex === 1 ? 'grey.400' : 
//                                               originalIndex === 2 ? 'secondary.light' : 'primary.main'
//                                     }}
//                                   >
//                                     {utente.utenti?.username?.charAt(0).toUpperCase() || '?'}
//                                   </Avatar>
//                                   <Typography>{utente.utenti?.username || `Utente ID ${utente.user_id}`}</Typography>
//                                 </Box>
//                                 {(utente.utenti?.nome || utente.utenti?.cognome) && (
//                                   <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
//                                     {utente.utenti.nome} {utente.utenti.cognome}
//                                   </Typography>
//                                 )}
//                               </Box>
//                             </TableCell>
//                             <TableCell align="right">{utente.punteggio_gara}</TableCell>
//                             <TableCell align="right">
//                               {utente.punteggio_bonus > 0 ? (
//                                 <Chip 
//                                   size="small" 
//                                   label={`+${utente.punteggio_bonus}`} 
//                                   color="success"
//                                 />
//                               ) : '0'}
//                             </TableCell>
//                             <TableCell align="right">
//                               <Typography variant="body1" fontWeight="bold">
//                                 {utente.totale}
//                               </Typography>
//                             </TableCell>
//                           </TableRow>
//                         );
//                       })}
//                       {filteredClassificaGara.length === 0 && (
//                         <TableRow>
//                           <TableCell colSpan={5} align="center">
//                             Nessun utente trovato con i criteri di ricerca
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}
//             </Paper>
//           </Box>
//         )}
//       </TabPanel>
      
//       {/* Tab Visualizzazione Pronostici */}
//       <TabPanel value={tabValue} index={2}>
//         <Box sx={{ mb: 3 }}>
//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel id="gara-select-pronostici-label">Seleziona Gara</InputLabel>
//             <Select
//               labelId="gara-select-pronostici-label"
//               id="gara-select-pronostici"
//               value={selectedGaraId}
//               label="Seleziona Gara"
//               onChange={handleGaraChange}
//             >
//               {gare.map(gara => (
//                 <MenuItem key={gara.id} value={gara.id.toString()}>
//                   {gara.nome} ({new Date(gara.data).toLocaleDateString()})
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
          
//           {/* Campo ricerca utenti per i pronostici */}
//           {risultatoGara?.classifica && (
//             <TextField
//               fullWidth
//               size="small"
//               variant="outlined"
//               label="Cerca utente"
//               value={searchTermPronostici}
//               onChange={(e) => setSearchTermPronostici(e.target.value)}
//               sx={{ mt: 1, mb: 2 }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           )}
//         </Box>
        
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <Box>
//             {/* Il tuo pronostico */}
//             {user && (
//               <Paper sx={{ p: 2, mb: 3 }}>
//                 <Typography variant="h6" gutterBottom>
//                   Il Tuo Pronostico
//                 </Typography>
                
//                 {pronosticoUtente ? (
//                   renderPronostico(pronosticoUtente, false)
//                 ) : (
//                   <Typography color="text.secondary">
//                     Non hai ancora inserito un pronostico per questa gara
//                   </Typography>
//                 )}
//               </Paper>
//             )}
            
//             {/* Risultato ufficiale se disponibile */}
//             {risultatoGara && risultatoGara.classifica && (
//               <Paper sx={{ p: 2, mb: 3 }}>
//                 <Typography variant="h6" gutterBottom>
//                   Risultato Ufficiale
//                 </Typography>
                
//                 {renderSquadreClassifica(risultatoGara.classifica)}
                
//                 {risultatoGara.miglior_tempo_id && (
//                   <Typography variant="body2" sx={{ mt: 2 }}>
//                     <strong>Miglior tempo:</strong> {
//                       squadre.find(s => s.id === risultatoGara.miglior_tempo_id)?.nome || 
//                       `Squadra ID ${risultatoGara.miglior_tempo_id}`
//                     }
//                   </Typography>
//                 )}
//               </Paper>
//             )}
            
//             {/* Pronostici altri utenti */}
//             <Typography variant="h6" gutterBottom>
//               Pronostici degli Altri Utenti
//             </Typography>
            
//             {pronosticiGara.length === 0 ? (
//               <Typography color="text.secondary">
//                 Nessun pronostico disponibile per questa gara
//               </Typography>
//             ) : (
//               // Nascondi i pronostici se non ci sono ancora risultati
//               !risultatoGara?.classifica ? (
//                 <Alert severity="info">
//                   I pronostici degli altri utenti saranno visibili dopo la pubblicazione dei risultati ufficiali
//                 </Alert>
//               ) : (
//                 filteredPronostici.length === 0 ? (
//                   searchTermPronostici ? (
//                     <Typography color="text.secondary">
//                       Nessun utente trovato con i criteri di ricerca
//                     </Typography>
//                   ) : (
//                     <Typography color="text.secondary">
//                       Nessun altro utente ha inserito pronostici per questa gara
//                     </Typography>
//                   )
//                 ) : (
//                   <Grid container spacing={3}>
//                     {filteredPronostici.map(pronostico => (
//                       <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }} key={pronostico.id}>
//                         <Paper sx={{ p: 2 }}>
//                           {renderPronostico(pronostico, true)}
//                         </Paper>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )
//               )
//             )}
//           </Box>
//         )}
//       </TabPanel>
//     </Box>
//   );
// };

// export default Classifiche;

// src/components/fanta/Classifiche.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Tab, 
  Tabs, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Chip,
  Divider,
  Card,
  CardContent,
  Grid,
  Avatar,
  useMediaQuery,
  useTheme,
  Alert,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  EmojiEvents as TrophyIcon,
  Timeline as ChartIcon,
  List as ListIcon,
  FormatListNumbered as NumberedListIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Looks as LooksIcon
} from '@mui/icons-material';
import { getGare, getSquadre, getClassificaGara, getClassificaGenerale, getRisultato, getPronostici } from '../../services/fantaService';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../supabaseClient';

// Pannello TabPanel per le tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`classifiche-tabpanel-${index}`}
      aria-labelledby={`classifiche-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Funzione per verificare se una gara è un campionato
const isGaraCampionato = (gara) => {
  if (!gara || !gara.nome) return false;
  
  // Verifica se il nome della gara contiene la parola "campionato" (case insensitive)
  return gara.nome.toLowerCase().includes('campionato') || 
         gara.nome.toLowerCase().includes('classifica finale');
};

// Funzione per formattare una data in italiano
const formatDate = (date) => {
  if (!date) return 'N/D';
  const d = new Date(date);
  return d.toLocaleDateString('it-IT');
};

const Classifiche = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [tabValue, setTabValue] = useState(0);
  const [gare, setGare] = useState([]);
  const [squadre, setSquadre] = useState([]);
  const [selectedGaraId, setSelectedGaraId] = useState('');
  const [selectedGara, setSelectedGara] = useState(null);
  const [classificaGara, setClassificaGara] = useState([]);
  const [classificaGenerale, setClassificaGenerale] = useState([]);
  const [risultatoGara, setRisultatoGara] = useState(null);
  const [pronosticiGara, setPronosticiGara] = useState([]);
  const [pronosticoUtente, setPronosticoUtente] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Aggiunta dei campi di ricerca per ogni tab
  const [searchTermGenerale, setSearchTermGenerale] = useState('');
  const [searchTermGara, setSearchTermGara] = useState('');
  const [searchTermPronostici, setSearchTermPronostici] = useState('');

  // Verifica se l'utente è admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }
      
      try {
        const { data: userProfile } = await supabase
          .from('utenti')
          .select('is_admin')
          .eq('id', user.id)
          .single();
          
        setIsAdmin(userProfile?.is_admin === true);
      } catch (error) {
        console.error('Errore verifica admin:', error);
        setIsAdmin(false);
      }
    };
    
    checkAdmin();
  }, [user]);

  // Carica gare e squadre all'inizializzazione
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [gareData, squadreData, classificaData] = await Promise.all([
          getGare(),
          getSquadre(),
          getClassificaGenerale()
        ]);
        setGare(gareData);
        setSquadre(squadreData);
        setClassificaGenerale(classificaData);
        
        // Imposta di default la prima gara se disponibile
        if (gareData.length > 0) {
          setSelectedGaraId(gareData[0].id.toString());
          setSelectedGara(gareData[0]);
        }
      } catch (error) {
        console.error('Errore caricamento dati:', error);
        setError('Impossibile caricare i dati. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Carica dati specifici della gara quando viene selezionata
  useEffect(() => {
    if (!selectedGaraId) return;
    
    const fetchGaraData = async () => {
      setLoading(true);
      try {
        // Trova la gara selezionata
        const garaSelezionata = gare.find(g => g.id.toString() === selectedGaraId);
        setSelectedGara(garaSelezionata);
        
        // Carica in parallelo tutti i dati necessari
        const [classificaData, risultatoData, pronosticiData] = await Promise.all([
          getClassificaGara(parseInt(selectedGaraId)),
          getRisultato(parseInt(selectedGaraId)),
          getPronostici(parseInt(selectedGaraId))
        ]);
        
        setClassificaGara(classificaData || []);
        setRisultatoGara(risultatoData);
        setPronosticiGara(pronosticiData || []);
        
        // Trova il pronostico dell'utente corrente
        if (user && pronosticiData) {
          const mioPron = pronosticiData.find(p => p.user_id === user.id);
          setPronosticoUtente(mioPron || null);
        }
      } catch (error) {
        console.error('Errore caricamento dati gara:', error);
        setError('Impossibile caricare i dati della gara.');
      } finally {
        setLoading(false);
      }
    };

    fetchGaraData();
  }, [selectedGaraId, user, gare]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleGaraChange = (event) => {
    setSelectedGaraId(event.target.value);
  };
  
  // Funzioni di filtraggio per le ricerche
  const filteredClassificaGenerale = classificaGenerale.filter(utente => {
    const searchTerm = searchTermGenerale.toLowerCase();
    return !searchTerm || 
           (utente.utente?.username && utente.utente.username.toLowerCase().includes(searchTerm)) ||
           (utente.utente?.nome && utente.utente.nome.toLowerCase().includes(searchTerm)) ||
           (utente.utente?.cognome && utente.utente.cognome.toLowerCase().includes(searchTerm));
  });
  
  const filteredClassificaGara = classificaGara.filter(utente => {
    const searchTerm = searchTermGara.toLowerCase();
    return !searchTerm || 
           (utente.utenti?.username && utente.utenti.username.toLowerCase().includes(searchTerm)) ||
           (utente.utenti?.nome && utente.utenti.nome.toLowerCase().includes(searchTerm)) ||
           (utente.utenti?.cognome && utente.utenti.cognome.toLowerCase().includes(searchTerm));
  });
  
  const filteredPronostici = pronosticiGara.filter(pronostico => {
    // Se sei admin, vedi tutti i pronostici, altrimenti solo quelli degli altri
    if (!isAdmin && (!user || pronostico.user_id === user.id)) return false;
    
    const searchTerm = searchTermPronostici.toLowerCase();
    return !searchTerm || 
           (pronostico.utente?.username && pronostico.utente.username.toLowerCase().includes(searchTerm)) ||
           (pronostico.utente?.nome && pronostico.utente.nome.toLowerCase().includes(searchTerm)) ||
           (pronostico.utente?.cognome && pronostico.utente.cognome.toLowerCase().includes(searchTerm));
  });
  
  // Funzione per calcolare i punti per ogni squadra
  const calcolaPuntiSquadra = (posizionePronostico, posizioneReale) => {
    if (posizionePronostico === posizioneReale) return 10; // Posizione esatta: 10 punti
    if (Math.abs(posizionePronostico - posizioneReale) === 1) return 7; // ±1 posizione: 7 punti
    if (Math.abs(posizionePronostico - posizioneReale) === 2) return 5; // ±2 posizioni: 5 punti
    if (Math.abs(posizionePronostico - posizioneReale) === 3) return 3; // ±3 posizioni: 3 punti
    return 0; // Altrimenti: 0 punti
  };
  
  // Calcolo dettagliato dei punteggi
  const calcolaPunteggiDettagliati = (pronostico, risultato) => {
    if (!pronostico || !risultato || !pronostico.ordine_squadre || !risultato.classifica) {
      return {
        punteggiSquadre: [],
        punteggioGara: 0,
        punteggioBonus: 0,
        totale: 0
      };
    }
    
    // Calcola punti per ogni posizione
    const punteggiSquadre = pronostico.ordine_squadre.map((squadraId, indexPronostico) => {
      const indexReale = risultato.classifica.indexOf(squadraId);
      const posizioneReale = indexReale !== -1 ? indexReale + 1 : null;
      const punti = calcolaPuntiSquadra(indexPronostico + 1, posizioneReale);
      
      return {
        squadraId,
        posizionePronostico: indexPronostico + 1,
        posizioneReale,
        punti
      };
    });
    
    // Calcola punteggio totale delle squadre
    const punteggioGara = punteggiSquadre.reduce((sum, item) => sum + item.punti, 0);
    
    // Calcola bonus per miglior tempo
    const punteggioBonus = (pronostico.miglior_tempo_id && 
                           risultato.miglior_tempo_id &&
                           pronostico.miglior_tempo_id === risultato.miglior_tempo_id) ? 10 : 0;
    
    return {
      punteggiSquadre,
      punteggioGara,
      punteggioBonus,
      totale: punteggioGara + punteggioBonus
    };
  };

  // Funzione per formattare la classifica di squadre
  const renderSquadreClassifica = (classificaArray) => {
    if (!classificaArray || !Array.isArray(classificaArray) || !squadre.length) {
      return <Typography color="text.secondary">Nessun risultato disponibile</Typography>;
    }

    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size={isMobile ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              <TableCell>Posizione</TableCell>
              <TableCell>Squadra</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classificaArray.map((squadraId, index) => {
              const squadra = squadre.find(s => s.id === squadraId);
              return (
                <TableRow key={squadraId}>
                  <TableCell>{index + 1}°</TableCell>
                  <TableCell>{squadra?.nome || `Squadra ID ${squadraId}`}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // Funzione per renderizzare il label delle gare nel menu a tendina in modo responsivo
  const renderGaraLabel = (gara) => {
    const isCampionato = isGaraCampionato(gara);
    
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: isMobile ? '100%' : '60%'
        }}>
          {isCampionato && (
            <TrophyIcon 
              sx={{ 
                mr: 1, 
                color: 'warning.main',
                fontSize: '1.2rem'
              }} 
            />
          )}
          <Typography 
            variant="body1" 
            noWrap
            sx={{ 
              fontWeight: isCampionato ? 'bold' : 'normal'
            }}
          >
            {gara.nome} ({formatDate(gara.data)})
          </Typography>
        </Box>
      </Box>
    );
  };

  // Visualizzazione pronostico singolo migliorata
  const renderPronostico = (pronostico, showUser = true) => {
    if (!pronostico || !pronostico.ordine_squadre) {
      return <Typography color="text.secondary">Nessun pronostico disponibile</Typography>;
    }

    const migliorTempoSquadra = squadre.find(s => s.id === pronostico.miglior_tempo_id);
    
    // Calcolo dettagliato punti se risultato disponibile
    const dettagliPunteggio = risultatoGara ? 
      calcolaPunteggiDettagliati(pronostico, risultatoGara) : 
      null;

    return (
      <Box sx={{ mt: 2 }}>
        {showUser && pronostico.utente && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32, 
                  mr: 1,
                  bgcolor: 'primary.main'
                }}
              >
                {pronostico.utente?.username?.charAt(0).toUpperCase() || <PersonIcon />}
              </Avatar>
              {pronostico.utente.username || "Utente"}
            </Typography>
            {(pronostico.utente.nome || pronostico.utente.cognome) && (
              <Typography variant="body2" color="text.secondary" sx={{ ml: 5 }}>
                {pronostico.utente.nome} {pronostico.utente.cognome}
              </Typography>
            )}
          </Box>
        )}
        
        <TableContainer component={Paper}>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell>Posizione</TableCell>
                <TableCell>Squadra</TableCell>
                {dettagliPunteggio && (
                  <>
                    <TableCell>Posizione Reale</TableCell>
                    <TableCell align="right">Punti</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {pronostico.ordine_squadre.map((squadraId, index) => {
                const squadra = squadre.find(s => s.id === squadraId);
                
                // Ottieni dettagli punti se disponibili
                const dettaglioSquadra = dettagliPunteggio ? 
                  dettagliPunteggio.punteggiSquadre.find(p => p.squadraId === squadraId) :
                  null;
                  
                return (
                  <TableRow key={squadraId} sx={{
                    bgcolor: dettaglioSquadra?.punti === 10 ? 'rgba(76, 175, 80, 0.1)' : // Verde chiaro per 10 punti
                            dettaglioSquadra?.punti >= 5 ? 'rgba(255, 235, 59, 0.1)' : // Giallo chiaro per 5-7 punti
                            dettaglioSquadra?.punti > 0 ? 'rgba(255, 152, 0, 0.1)' : // Arancione chiaro per 3 punti
                            'inherit' // Default per 0 punti
                  }}>
                    <TableCell>{index + 1}°</TableCell>
                    <TableCell>{squadra?.nome || `Squadra ID ${squadraId}`}</TableCell>
                    {dettagliPunteggio && (
                      <>
                        <TableCell>
                          {dettaglioSquadra?.posizioneReale ? `${dettaglioSquadra.posizioneReale}°` : 'N/D'}
                          {dettaglioSquadra?.posizioneReale && (
                            <Typography component="span" color="text.secondary" fontSize="0.8rem" ml={1}>
                              ({index + 1 === dettaglioSquadra.posizioneReale ? 'esatta' : 
                                Math.abs(index + 1 - dettaglioSquadra.posizioneReale) === 1 ? '±1' :
                                Math.abs(index + 1 - dettaglioSquadra.posizioneReale) === 2 ? '±2' :
                                Math.abs(index + 1 - dettaglioSquadra.posizioneReale) === 3 ? '±3' : 'altro'})
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {dettaglioSquadra?.punti > 0 ? (
                            <Chip 
                              label={dettaglioSquadra.punti} 
                              size="small"
                              color={
                                dettaglioSquadra.punti === 10 ? "success" :
                                dettaglioSquadra.punti >= 5 ? "warning" :
                                "default"
                              }
                            />
                          ) : '0'}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
              {/* Riga riepilogo punti */}
              {dettagliPunteggio && (
                <TableRow sx={{ 
                  bgcolor: 'rgba(33, 150, 243, 0.05)',
                  fontWeight: 'bold'
                }}>
                  <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                    Totale
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {dettagliPunteggio.punteggioBonus > 0 ? 'Bonus: +10' : 'Nessun bonus'}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    <Chip 
                      label={`${dettagliPunteggio.punteggioGara} + ${dettagliPunteggio.punteggioBonus} = ${dettagliPunteggio.totale}`}
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {migliorTempoSquadra && (
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2">
              <strong>Miglior tempo:</strong> {migliorTempoSquadra.nome}
            </Typography>
            
            {risultatoGara && risultatoGara.miglior_tempo_id && (
              <Box>
                {pronostico.miglior_tempo_id === risultatoGara.miglior_tempo_id ? (
                  <Chip 
                    label="+10 punti" 
                    size="small" 
                    color="success" 
                    variant="outlined"
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    0 punti (miglior tempo errato)
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
    );
  };

  // Funzione per renderizzare l'icona della medaglia in base alla posizione
const renderMedaglia = (posizione) => {
  switch(posizione) {
    case 1:
      return <TrophyIcon sx={{ color: '#FFD700', fontSize: 24 }} />; // Oro
    case 2:
      return <TrophyIcon sx={{ color: '#C0C0C0', fontSize: 24 }} />; // Argento
    case 3:
      return <TrophyIcon sx={{ color: '#CD7F32', fontSize: 24 }} />; // Bronzo
    default:
      return null;
  }
};


  if (loading && !gare.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="classifiche tabs"
          centered
          variant={isMobile ? "fullWidth" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
        >
          <Tab 
            icon={isMobile ? <TrophyIcon /> : null} 
            label={isMobile ? "Generale" : "Classifica Generale"} 
            sx={{ fontSize: isMobile ? '0.7rem' : 'inherit', minWidth: isMobile ? 0 : 'auto' }}
          />
          <Tab 
            icon={isMobile ? <ChartIcon /> : null} 
            label={isMobile ? "Gara" : "Classifica Gara"} 
            sx={{ fontSize: isMobile ? '0.7rem' : 'inherit', minWidth: isMobile ? 0 : 'auto' }}
          />
          <Tab 
            icon={isMobile ? <ListIcon /> : null} 
            label={isMobile ? "Pronostici" : "Pronostici"} 
            sx={{ fontSize: isMobile ? '0.7rem' : 'inherit', minWidth: isMobile ? 0 : 'auto' }}
          />
        </Tabs>
      </Box>
      
      {/* Tab Classifica Generale */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6" gutterBottom>
          Classifica Generale FantaDragonBoat
        </Typography>
        
        {/* Campo ricerca utenti */}
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          label="Cerca utente"
          value={searchTermGenerale}
          onChange={(e) => setSearchTermGenerale(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        {classificaGenerale.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Nessun punteggio disponibile. I punteggi verranno calcolati dopo l'inserimento dei risultati ufficiali.
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2, overflowX: 'auto' }}>
            <Table size={isMobile ? "small" : "medium"} sx={{ minWidth: isMobile ? 280 : 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: isMobile ? '60px' : '100px' }}>Pos.</TableCell>
                  <TableCell>Utente</TableCell>
                  {!isMobile && <TableCell align="right">Punti</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredClassificaGenerale.map((utente, index) => {
                  const originalIndex = classificaGenerale.findIndex(u => u.id === utente.id);
                  const posizione = originalIndex + 1;
                  return (
                    <TableRow 
                      key={utente.id}
                      sx={{ 
                        '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                        bgcolor: posizione === 1 ? 'rgba(255, 215, 0, 0.1)' : // Oro
                                posizione === 2 ? 'rgba(192, 192, 192, 0.1)' : // Argento
                                posizione === 3 ? 'rgba(205, 127, 50, 0.1)' : // Bronzo
                                'inherit'
                      }}
                    >
                        <TableCell 
                          component="th" 
                          scope="row"
                          sx={{ 
                            pl: posizione <= 3 ? 1 : 2,
                            height: '60px', // Altezza fissa per tutte le celle
                            verticalAlign: 'middle'
                          }}
                        >
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            height: '100%'
                          }}>
                            {renderMedaglia(posizione)}
                            <Typography 
                              sx={{ 
                                ml: posizione <= 3 ? 1 : 0,
                                fontWeight: posizione <= 3 ? 'bold' : 'normal'
                              }}
                            >
                              {posizione}°
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: 'column',
                          minWidth: 0 // Per il corretto funzionamento del text overflow
                        }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            minWidth: 0 
                          }}>
                            <Avatar 
                              sx={{ 
                                width: 32, 
                                height: 32, 
                                mr: 1,
                                bgcolor: posizione === 1 ? 'warning.main' : 
                                        posizione === 2 ? 'grey.400' : 
                                        posizione === 3 ? 'secondary.light' : 'primary.main',
                                flexShrink: 0
                              }}
                            >
                              {utente.utente?.username?.charAt(0).toUpperCase() || '?'}
                            </Avatar>
                            <Box sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              minWidth: 0
                            }}>
                              <Typography 
                                noWrap 
                                sx={{ 
                                  fontWeight: 'medium',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}
                              >
                                {utente.utente?.username || `Utente ID ${utente.id}`}
                              </Typography>
                              {(utente.utente?.nome || utente.utente?.cognome) && (
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary"
                                  noWrap
                                  sx={{ 
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                  }}
                                >
                                  {utente.utente.nome} {utente.utente.cognome}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </Box>
                        {isMobile && (
                          <Typography 
                            variant="body1" 
                            fontWeight="bold" 
                            sx={{ mt: 1 }}
                          >
                            {utente.totale} punti
                          </Typography>
                        )}
                      </TableCell>
                      {!isMobile && (
                        <TableCell align="right">
                          <Typography variant="body1" fontWeight="bold">
                            {utente.totale}
                          </Typography>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
                {filteredClassificaGenerale.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={isMobile ? 2 : 3} align="center">
                      Nessun utente trovato con i criteri di ricerca
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </TabPanel>
      
      {/* Tab Classifica Gara */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="gara-select-label">Seleziona Gara</InputLabel>
            <Select
              labelId="gara-select-label"
                            id="gara-select"
              value={selectedGaraId}
              label="Seleziona Gara"
              onChange={handleGaraChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300
                  }
                }
              }}
            >
              {gare.map(gara => (
                <MenuItem 
                  key={gara.id} 
                  value={gara.id.toString()}
                  sx={{ 
                    py: isMobile ? 1.5 : 1,
                    borderLeft: isGaraCampionato(gara) ? `4px solid ${theme.palette.warning.main}` : 'none'
                  }}
                >
                  {renderGaraLabel(gara)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* Campo ricerca utenti */}
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Cerca utente"
            value={searchTermGara}
            onChange={(e) => setSearchTermGara(e.target.value)}
            sx={{ mt: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {/* Banner speciale per il pronostico del campionato */}
            {selectedGara && isGaraCampionato(selectedGara) && (
              <Alert 
                severity="info" 
                icon={<TrophyIcon />}
                sx={{ mb: 3 }}
              >
                <Typography variant="subtitle2">
                  Classifica del Campionato
                </Typography>
                <Typography variant="body2">
                  Visualizzi i risultati e i pronostici per la classifica finale del Campionato Trentino.
                </Typography>
              </Alert>
            )}
            
            {/* Risultato ufficiale */}
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Risultato Ufficiale
              </Typography>
              
              {risultatoGara && risultatoGara.classifica ? (
                <>
                  {renderSquadreClassifica(risultatoGara.classifica)}
                  
                  {risultatoGara.miglior_tempo_id && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      <strong>Miglior tempo:</strong> {
                        squadre.find(s => s.id === risultatoGara.miglior_tempo_id)?.nome || 
                        `Squadra ID ${risultatoGara.miglior_tempo_id}`
                      }
                    </Typography>
                  )}
                </>
              ) : (
                <Typography color="text.secondary">
                  Risultati non ancora disponibili per questa gara
                </Typography>
              )}
            </Paper>
            
            {/* Classifica punteggi */}
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Classifica Punteggi
              </Typography>
              
              {classificaGara.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  Nessun punteggio disponibile per questa gara. I punteggi verranno calcolati dopo l'inserimento dei risultati ufficiali.
                </Typography>
              ) : (
                <TableContainer component={Paper} sx={{ mt: 2, overflowX: 'auto' }}>
                  <Table size={isMobile ? "small" : "medium"} sx={{ minWidth: isMobile ? 280 : 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ width: isMobile ? '60px' : '100px' }}>Pos.</TableCell>
                        <TableCell>Utente</TableCell>
                        {!isMobile && (
                          <>
                            <TableCell align="right">Punti</TableCell>
                            <TableCell align="right">Bonus</TableCell>
                            <TableCell align="right"> Totale</TableCell>
                          </>
                        )}
                        {/* <TableCell align="right">Totale</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredClassificaGara.map((utente, index) => {
                        const originalIndex = classificaGara.findIndex(u => u.id === utente.id);
                        const posizione = originalIndex + 1;
                        return (
                          <TableRow 
                            key={utente.id}
                            sx={{ 
                              '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                              bgcolor: posizione === 1 ? 'rgba(255, 215, 0, 0.1)' : // Oro
                                      posizione === 2 ? 'rgba(192, 192, 192, 0.1)' : // Argento
                                      posizione === 3 ? 'rgba(205, 127, 50, 0.1)' : // Bronzo
                                      'inherit'
                            }}
                          >
                            <TableCell 
                              component="th" 
                              scope="row"
                              sx={{ 
                                pl: posizione <= 3 ? 1 : 2,
                                height: '60px', // Altezza fissa per tutte le celle
                                verticalAlign: 'middle'
                              }}
                            >
                              <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                height: '100%'
                              }}>
                                {renderMedaglia(posizione)}
                                <Typography 
                                  sx={{ 
                                    ml: posizione <= 3 ? 1 : 0,
                                    fontWeight: posizione <= 3 ? 'bold' : 'normal'
                                  }}
                                >
                                  {posizione}°
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ 
                                display: 'flex', 
                                flexDirection: 'column',
                                minWidth: 0 // Per il corretto funzionamento del text overflow
                              }}>
                                <Box sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center',
                                  minWidth: 0 
                                }}>
                                  <Avatar 
                                    sx={{ 
                                      width: 32, 
                                      height: 32, 
                                      mr: 1,
                                      bgcolor: posizione === 1 ? 'warning.main' : 
                                              posizione === 2 ? 'grey.400' : 
                                              posizione === 3 ? 'secondary.light' : 'primary.main',
                                      flexShrink: 0
                                    }}
                                  >
                                    {utente.utenti?.username?.charAt(0).toUpperCase() || '?'}
                                  </Avatar>
                                  <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    minWidth: 0
                                  }}>
                                    <Typography 
                                      noWrap 
                                      sx={{ 
                                        fontWeight: 'medium',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                      }}
                                    >
                                      {utente.utenti?.username || `Utente ID ${utente.user_id}`}
                                    </Typography>
                                    {(utente.utenti?.nome || utente.utenti?.cognome) && (
                                      <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                        noWrap
                                        sx={{ 
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis'
                                        }}
                                      >
                                        {utente.utenti.nome} {utente.utenti.cognome}
                                      </Typography>
                                    )}
                                  </Box>
                                </Box>
                                {isMobile && (
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    {/* <Typography variant="body2" color="text.secondary">
                                      Punti: {utente.punteggio_gara}
                                      {utente.punteggio_bonus > 0 && ` + ${utente.punteggio_bonus}`}
                                    </Typography> */}
                                    <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
                                      Totale {utente.totale}
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                            </TableCell>
                            {!isMobile && (
                              <>
                                <TableCell align="right">{utente.punteggio_gara}</TableCell>
                                <TableCell align="right">
                                  {utente.punteggio_bonus > 0 ? (
                                    <Chip 
                                      size="small" 
                                      label={`+${utente.punteggio_bonus}`} 
                                      color="success"
                                    />
                                  ) : '0'}
                                </TableCell>
                                <TableCell align="right">
                                  <Typography variant="body1" fontWeight="bold">
                                    {utente.totale}
                                  </Typography>
                                </TableCell>

                              </>
                            )}
                          </TableRow>
                        );
                      })}
                      {filteredClassificaGara.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={isMobile ? 3 : 5} align="center">
                            Nessun utente trovato con i criteri di ricerca
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Box>
        )}
      </TabPanel>
      
      {/* Tab Visualizzazione Pronostici */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="gara-select-pronostici-label">Seleziona Gara</InputLabel>
            <Select
              labelId="gara-select-pronostici-label"
              id="gara-select-pronostici"
              value={selectedGaraId}
              label="Seleziona Gara"
              onChange={handleGaraChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300
                  }
                }
              }}
            >
              {gare.map(gara => (
                <MenuItem 
                  key={gara.id} 
                  value={gara.id.toString()}
                  sx={{ 
                    py: isMobile ? 1.5 : 1,
                    borderLeft: isGaraCampionato(gara) ? `4px solid ${theme.palette.warning.main}` : 'none'
                  }}
                >
                  {renderGaraLabel(gara)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* Campo ricerca utenti per i pronostici */}
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Cerca utente"
            value={searchTermPronostici}
            onChange={(e) => setSearchTermPronostici(e.target.value)}
            sx={{ mt: 1, mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {/* Banner speciale per il pronostico del campionato */}
            {selectedGara && isGaraCampionato(selectedGara) && (
              <Alert 
                severity="info" 
                icon={<TrophyIcon />}
                sx={{ mb: 3 }}
              >
                <Typography variant="subtitle2">
                  Pronostici del Campionato
                </Typography>
                <Typography variant="body2">
                  Visualizzi i pronostici per la classifica finale del Campionato Trentino.
                </Typography>
              </Alert>
            )}
            
            {/* Il tuo pronostico */}
            {user && (
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Il Tuo Pronostico
                </Typography>
                
                {pronosticoUtente ? (
                  renderPronostico(pronosticoUtente, false)
                ) : (
                  <Typography color="text.secondary">
                    Non hai ancora inserito un pronostico per questa gara
                  </Typography>
                )}
              </Paper>
            )}
            
            {/* Risultato ufficiale se disponibile */}
            {risultatoGara && risultatoGara.classifica && (
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Risultato Ufficiale
                </Typography>
                
                {renderSquadreClassifica(risultatoGara.classifica)}
                
                {risultatoGara.miglior_tempo_id && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    <strong>Miglior tempo:</strong> {
                      squadre.find(s => s.id === risultatoGara.miglior_tempo_id)?.nome || 
                      `Squadra ID ${risultatoGara.miglior_tempo_id}`
                    }
                  </Typography>
                )}
              </Paper>
            )}
            
            {/* Pronostici altri utenti */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {isAdmin ? "Pronostici degli Utenti" : "Pronostici degli Altri Utenti"}
              </Typography>
              
              {isAdmin && !risultatoGara?.classifica && (
                <Chip 
                  color="primary" 
                  label="Modalità Admin" 
                  size="small"
                  icon={<LooksIcon />}
                  variant="outlined"
                />
              )}
            </Box>
            
            {pronosticiGara.length === 0 ? (
              <Typography color="text.secondary">
                Nessun pronostico disponibile per questa gara
              </Typography>
            ) : (
              // Nascondi i pronostici agli utenti normali se non ci sono ancora risultati
              !risultatoGara?.classifica && !isAdmin ? (
                <Alert severity="info">
                  I pronostici degli altri utenti saranno visibili dopo la pubblicazione dei risultati ufficiali
                </Alert>
              ) : (
                filteredPronostici.length === 0 ? (
                  searchTermPronostici ? (
                    <Typography color="text.secondary">
                      Nessun utente trovato con i criteri di ricerca
                    </Typography>
                  ) : (
                    <Typography color="text.secondary">
                      Nessun {isAdmin ? "" : "altro"} utente ha inserito pronostici per questa gara
                    </Typography>
                  )
                ) : (
                  <Grid container spacing={3}>
                    {filteredPronostici.map(pronostico => (
                      <Grid xs={12} md={6} key={pronostico.id}>
                        <Paper sx={{ p: 2 }}>
                          {renderPronostico(pronostico, true)}
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                )
              )
            )}
          </Box>
        )}
      </TabPanel>
    </Box>
  );
};

export default Classifiche;
              