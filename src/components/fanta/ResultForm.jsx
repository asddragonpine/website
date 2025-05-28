

// // src/components/fanta/ResultForm.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { 
//   Box, 
//   FormControl, 
//   InputLabel, 
//   Select, 
//   MenuItem, 
//   Button, 
//   Paper, 
//   Typography, 
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Container,
//   Snackbar,
//   Alert,
//   Card,
//   CardContent,
//   Chip,
//   useMediaQuery,
//   useTheme
// } from '@mui/material';
// import {
//   DndContext, 
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from '@dnd-kit/core';
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
//   useSortable,
// } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { 
//   DragIndicator as DragIcon,
//   EmojiEvents as TrophyIcon,
//   Delete as DeleteIcon
// } from '@mui/icons-material';
// import { getGare, getSquadre, getRisultato, inserisciRisultato as insertRisultato } from '/src/services/fantaService';
// import { supabase } from '../../supabaseClient';

// // Funzione per verificare se una gara è un campionato
// const isGaraCampionato = (gara) => {
//   if (!gara || !gara.nome) return false;
  
//   // Verifica se il nome della gara contiene la parola "campionato" (case insensitive)
//   return gara.nome.toLowerCase().includes('campionato') || 
//          gara.nome.toLowerCase().includes('classifica finale');
// };

// // Funzione per formattare una data in italiano
// const formatDate = (date) => {
//   if (!date) return 'N/D';
//   const d = new Date(date);
//   return d.toLocaleDateString('it-IT');
// };

// // Componente riutilizzabile di caricamento con retry
// const LoadingWithRetry = ({ loading, onRetry, message = "Caricamento..." }) => {
//   if (!loading) return null;
  
//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
//       <CircularProgress sx={{ mb: 2 }} />
//       <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//         {message}
//       </Typography>
//       <Button 
//         variant="outlined" 
//         size="small"
//         onClick={onRetry}
//       >
//         Riprova
//       </Button>
//     </Box>
//   );
// };

// // Componente per un elemento ordinabile migliorato per mobile
// const SortableItem = ({ id, squadra, index }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({ id });

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     backgroundColor: 'white',
//     padding: '10px',
//     marginBottom: '8px',
//     borderRadius: '4px',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//     display: 'flex',
//     alignItems: 'center',
//     userSelect: 'none', // Previene la selezione del testo
//     WebkitUserSelect: 'none', // Per Safari/Chrome
//     MozUserSelect: 'none', // Per Firefox
//     msUserSelect: 'none', // Per IE/Edge
//     touchAction: 'none', // Migliora il drag su mobile
//   };

//   return (
//     <div 
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//     >
//       {/* Icona di drag visibile solo su mobile */}
//       {isMobile && (
//         <DragIcon 
//           sx={{ 
//             mr: 1, 
//             color: 'action.active',
//             cursor: 'grab' 
//           }} 
//         />
//       )}
      
//       <Typography 
//         variant="body1" 
//         sx={{ 
//           mr: 2, 
//           fontWeight: 500,
//           color: 'text.primary'
//         }}
//       >
//         {index + 1}°
//       </Typography>
      
//       <Typography 
//         variant="body1"
//         sx={{ 
//           flexGrow: 1,
//           pointerEvents: 'none' // Impedisce interazioni col testo durante il drag
//         }}
//       >
//         {squadra?.nome || `Squadra ID ${id}`}
//       </Typography>
//     </div>
//   );
// };

// const ResultForm = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
//   const [gare, setGare] = useState([]);
//   const [squadre, setSquadre] = useState([]);
//   const [selectedGaraId, setSelectedGaraId] = useState('');
//   const [selectedGara, setSelectedGara] = useState(null);
//   const [ordineSquadre, setOrdineSquadre] = useState([]);
//   const [migliorTempoId, setMigliorTempoId] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [risultatoEsistente, setRisultatoEsistente] = useState(null);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'info'
//   });

//   // Configurazione sensori per drag and drop - ottimizzato per mobile
//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       // Riduce la distanza minima per iniziare il drag
//       activationConstraint: {
//         distance: 5, // Attiva drag dopo solo 5px di movimento
//         delay: 100, // Riduce il ritardo di attivazione
//         tolerance: 5, // Aumenta la tolleranza
//       }
//     }),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   // Funzione migliorata per il caricamento dei dati
//   const fetchData = useCallback(async () => {
//     // Se i dati sono già caricati, non ricaricare
//     if (gare.length > 0 && squadre.length > 0) {
//       console.log('Dati già caricati, non ricarico');
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const [gareData, squadreData] = await Promise.all([
//         getGare(false), // Recupera tutte le gare
//         getSquadre()
//       ]);
      
//       setGare(gareData);
//       setSquadre(squadreData);
      
//       // Se non c'è una gara selezionata, seleziona la prima
//       if (gareData.length > 0 && !selectedGaraId) {
//         setSelectedGaraId(gareData[0].id.toString());
//         setSelectedGara(gareData[0]);
//       }
//     } catch (error) {
//       console.error('Errore caricamento dati:', error);
//       setSnackbar({
//         open: true,
//         message: 'Impossibile caricare i dati',
//         severity: 'error'
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, [gare.length, squadre.length, selectedGaraId]);
  
//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   useEffect(() => {
//     if (squadre.length > 0 && !ordineSquadre.length) {
//       // Inizializza l'ordine con tutte le squadre
//       setOrdineSquadre([...squadre].map(s => s.id));
//     }
//   }, [squadre]);

//   useEffect(() => {
//     const fetchRisultato = async () => {
//       if (!selectedGaraId) return;
      
//       setLoading(true);
//       try {
//         // Trova la gara selezionata
//         const garaSelezionata = gare.find(g => g.id.toString() === selectedGaraId);
//         setSelectedGara(garaSelezionata);
        
//         // Controlla se esiste già un risultato per questa gara
//         const risultato = await getRisultato(parseInt(selectedGaraId));
        
//         if (risultato) {
//           // Se esiste un risultato, usa il suo ordine
//           setRisultatoEsistente(risultato);
//           setOrdineSquadre(risultato.classifica || []);
//           setMigliorTempoId(risultato.miglior_tempo_id ? risultato.miglior_tempo_id.toString() : '');
//         } else {
//           // Altrimenti inizializza con l'ordine predefinito
//           setRisultatoEsistente(null);
//           setOrdineSquadre([...squadre].map(s => s.id));
//           setMigliorTempoId('');
//         }
//       } catch (error) {
//         console.error('Errore caricamento risultato:', error);
//         setSnackbar({
//           open: true,
//           message: 'Impossibile caricare il risultato',
//           severity: 'error'
//         });
//         // Reset in caso di errore
//         setRisultatoEsistente(null);
//         setOrdineSquadre([...squadre].map(s => s.id));
//         setMigliorTempoId('');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRisultato();
//   }, [selectedGaraId, squadre, gare]);

//   const handleGaraChange = (event) => {
//     setSelectedGaraId(event.target.value);
//   };

//   const handleMigliorTempoChange = (event) => {
//     setMigliorTempoId(event.target.value);
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
    
//     if (!over || active.id === over.id) return;

//     setOrdineSquadre(items => {
//       const oldIndex = items.indexOf(active.id);
//       const newIndex = items.indexOf(over.id);
//       return arrayMove(items, oldIndex, newIndex);
//     });
//   };

//   const handleSubmit = async () => {
//     if (!selectedGaraId || ordineSquadre.length === 0) {
//       setSnackbar({
//         open: true,
//         message: 'Seleziona una gara e ordina le squadre',
//         severity: 'warning'
//       });
//       return;
//     }

//     setSubmitting(true);
//     try {
//       // Salva il risultato
//       await insertRisultato(
//         parseInt(selectedGaraId),
//         ordineSquadre,
//         migliorTempoId ? parseInt(migliorTempoId) : null
//       );
      
//       setSnackbar({
//         open: true,
//         message: 'Risultato salvato con successo',
//         severity: 'success'
//       });
      
//       // Aggiorna lo stato del risultato
//       setRisultatoEsistente({
//         gara_id: parseInt(selectedGaraId),
//         classifica: ordineSquadre,
//         miglior_tempo_id: migliorTempoId ? parseInt(migliorTempoId) : null
//       });
//     } catch (error) {
//       console.error('Errore salvataggio risultato:', error);
//       setSnackbar({
//         open: true,
//         message: error.message || 'Impossibile salvare il risultato',
//         severity: 'error'
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!selectedGaraId) return;
    
//     if (!window.confirm('Sei sicuro di voler cancellare questo risultato? Questa azione non può essere annullata.')) {
//       return;
//     }
    
//     setSubmitting(true);
//     try {
//       // Elimina il risultato dal database
//       const { error } = await supabase
//         .from('risultati')
//         .delete()
//         .eq('gara_id', parseInt(selectedGaraId));
        
//       if (error) throw error;
      
//       setSnackbar({
//         open: true,
//         message: 'Risultato eliminato con successo',
//         severity: 'success'
//       });
      
//       // Reset dello stato
//       setRisultatoEsistente(null);
//       setOrdineSquadre([...squadre].map(s => s.id));
//       setMigliorTempoId('');
//     } catch (error) {
//       console.error('Errore eliminazione risultato:', error);
//       setSnackbar({
//         open: true,
//         message: 'Impossibile eliminare il risultato',
//         severity: 'error'
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };
  
//   // Funzione per renderizzare il label delle gare nel menu a tendina in modo responsivo
//   const renderGaraLabel = (gara) => {
//     const isCampionato = isGaraCampionato(gara);
    
//     return (
//       <Box sx={{ 
//         display: 'flex', 
//         flexDirection: isMobile ? 'column' : 'row',
//         alignItems: isMobile ? 'flex-start' : 'center',
//         justifyContent: 'space-between',
//         width: '100%'
//       }}>
//         <Box sx={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           overflow: 'hidden',
//           textOverflow: 'ellipsis',
//           whiteSpace: 'nowrap',
//           maxWidth: isMobile ? '100%' : '60%'
//         }}>
//           {isCampionato && (
//             <TrophyIcon 
//               sx={{ 
//                 mr: 1, 
//                 color: 'warning.main',
//                 fontSize: '1.2rem'
//               }} 
//             />
//           )}
//           <Typography 
//             variant="body1" 
//             noWrap
//             sx={{ 
//               fontWeight: isCampionato ? 'bold' : 'normal'
//             }}
//           >
//             {gara.nome} ({formatDate(gara.data)})
//           </Typography>
//         </Box>
        
//         {risultatoEsistente && risultatoEsistente.gara_id === gara.id && (
//           <Chip 
//             size="small" 
//             label="Risultato inserito" 
//             color="success" 
//             variant="outlined"
//             sx={{ ml: 1 }}
//           />
//         )}
//       </Box>
//     );
//   };

//   if (loading && !gare.length && !squadre.length) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   const isSelectedGaraCampionato = selectedGara ? isGaraCampionato(selectedGara) : false;

//   return (
//     <Container maxWidth="md">
//       {/* Mostra pulsante retry quando necessario */}
//       <LoadingWithRetry 
//         loading={loading} 
//         onRetry={fetchData} 
//         message="Caricamento dati in corso..."
//       />
      
//       {!loading && (
//       <Paper sx={{ p: 3, mt: 3, mb: 3 }}>
//         <Typography variant="h5" component="h2" gutterBottom>
//           Inserimento Risultati Ufficiali
//         </Typography>
        
//         {gare.length === 0 ? (
//           <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
//             Non ci sono gare disponibili per inserire risultati.
//           </Alert>
//         ) : (
//           <>
//             <Box sx={{ mb: 3 }}>
//               <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel id="gara-select-label">Seleziona Gara</InputLabel>
//                 <Select
//                   labelId="gara-select-label"
//                   id="gara-select"
//                   value={selectedGaraId}
//                   label="Seleziona Gara"
//                   onChange={handleGaraChange}
//                   MenuProps={{
//                     PaperProps: {
//                       style: {
//                         maxHeight: 300
//                       }
//                     }
//                   }}
//                 >
//                   {gare.map(gara => (
//                     <MenuItem 
//                       key={gara.id} 
//                       value={gara.id.toString()}
//                       sx={{ 
//                         py: isMobile ? 1.5 : 1,
//                         borderLeft: isGaraCampionato(gara) ? `4px solid ${theme.palette.warning.main}` : 'none'
//                       }}
//                     >
//                       {renderGaraLabel(gara)}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Box>
            
//             {selectedGaraId && (
//               <>
//                 {/* Banner speciale per il risultato del campionato */}
//                 {isSelectedGaraCampionato && (
//                   <Alert 
//                     severity="info" 
//                     icon={<TrophyIcon />}
//                     sx={{ mb: 3 }}
//                   >
//                     <Typography variant="subtitle2">
//                       Risultato del Campionato
//                     </Typography>
//                     <Typography variant="body2">
//                       Stai inserendo il risultato finale per la classifica del Campionato Trentino.
//                     </Typography>
//                   </Alert>
//                 )}
                
//                 {risultatoEsistente && (
//                   <Alert 
//                     severity="info" 
//                     sx={{ mb: 3 }}
//                   >
//                     <Typography variant="subtitle2">
//                       Risultato già inserito
//                     </Typography>
//                     <Typography variant="body2">
//                       Stai modificando un risultato già esistente. Puoi riordinare le squadre e salvare nuovamente il risultato.
//                     </Typography>
//                   </Alert>
//                 )}
              
//                 <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
//                   Ordine Ufficiale delle Squadre
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" gutterBottom>
//                   {isMobile ? (
//                     <>Trascina <DragIcon sx={{ verticalAlign: 'middle' }}/> le squadre per ordinarle dal 1° al {squadre.length}° posto</>
//                   ) : (
//                     <>Trascina le squadre per ordinarle dal 1° al {squadre.length}° posto</>
//                   )}
//                 </Typography>
                
//                 <Box sx={{ 
//                   bgcolor: '#f5f5f5', 
//                   borderRadius: 1, 
//                   p: 2, 
//                   mb: 3
//                 }}>
//                   <DndContext 
//                     sensors={sensors}
//                     collisionDetection={closestCenter}
//                     onDragEnd={handleDragEnd}
//                   >
//                     <SortableContext 
//                       items={ordineSquadre} 
//                       strategy={verticalListSortingStrategy}
//                     >
//                       {ordineSquadre.map((squadraId, index) => (
//                         <SortableItem 
//                           key={squadraId} 
//                           id={squadraId} 
//                           squadra={squadre.find(s => s.id === squadraId)} 
//                           index={index} 
//                         />
//                       ))}
//                     </SortableContext>
//                   </DndContext>
//                 </Box>
                
//                 <Box sx={{ mb: 3 }}>
//                   <FormControl fullWidth>
//                     <InputLabel id="miglior-tempo-label">Squadra Miglior Tempo</InputLabel>
//                     <Select
//                       labelId="miglior-tempo-label"
//                       id="miglior-tempo-select"
//                       value={migliorTempoId}
//                       label="Squadra con il Miglior Tempo"
//                       onChange={handleMigliorTempoChange}
//                       displayEmpty
//                       disabled={isSelectedGaraCampionato}
//                       renderValue={(selected) => {
//                         if (!selected) return <em></em>;
//                         const squadra = squadre.find(s => s.id.toString() === selected);
//                         return squadra?.nome || `Squadra ID ${selected}`;
//                       }}
//                     >
//                       <MenuItem value="">
//                         <em>Nessuna selezione</em>
//                       </MenuItem>
//                       {squadre.map(squadra => (
//                         <MenuItem key={squadra.id} value={squadra.id.toString()}>
//                           {squadra.nome}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
                  
//                   {isSelectedGaraCampionato && (
//                     <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                       Il miglior tempo non è applicabile per la classifica del campionato.
//                     </Typography>
//                   )}
//                 </Box>
                
//                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//                   {risultatoEsistente && (
//                     <Button 
//                       variant="outlined" 
//                       color="error" 
//                       onClick={handleDelete}
//                       disabled={submitting}
//                       startIcon={<DeleteIcon />}
//                     >
//                       Elimina
//                     </Button>
//                   )}
//                   <Button 
//                     variant="contained" 
//                     onClick={handleSubmit} 
//                     disabled={!selectedGaraId || ordineSquadre.length === 0 || submitting}
//                   >
//                     {submitting ? <CircularProgress size={24} /> : risultatoEsistente ? 'Aggiorna Risultato' : 'Salva Risultato'}
//                   </Button>
//                 </Box>
//               </>
//             )}
//           </>
//         )}
//       </Paper>
//       )}
//       <Snackbar 
//         open={snackbar.open} 
//         autoHideDuration={6000} 
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity={snackbar.severity} 
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default ResultForm;


// src/components/fanta/ResultForm.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Paper, 
  Typography, 
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Chip,
  useMediaQuery,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Avatar
} from '@mui/material';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  DragIndicator as DragIcon,
  EmojiEvents as TrophyIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Search as SearchIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { getGare, getSquadre, getRisultato, inserisciRisultato as insertRisultato } from '/src/services/fantaService';
import { supabase } from '../../supabaseClient';

// Pannello TabPanel per le tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`resultform-tabpanel-${index}`}
      aria-labelledby={`resultform-tab-${index}`}
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

// Componente riutilizzabile di caricamento con retry
const LoadingWithRetry = ({ loading, onRetry, message = "Caricamento..." }) => {
  if (!loading) return null;
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {message}
      </Typography>
      <Button 
        variant="outlined" 
        size="small"
        onClick={onRetry}
      >
        Riprova
      </Button>
    </Box>
  );
};

// Componente per un elemento ordinabile migliorato per mobile
const SortableItem = ({ id, squadra, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: 'white',
    padding: '10px',
    marginBottom: '8px',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none', // Previene la selezione del testo
    WebkitUserSelect: 'none', // Per Safari/Chrome
    MozUserSelect: 'none', // Per Firefox
    msUserSelect: 'none', // Per IE/Edge
    touchAction: 'none', // Migliora il drag su mobile
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {/* Icona di drag visibile solo su mobile */}
      {isMobile && (
        <DragIcon 
          sx={{ 
            mr: 1, 
            color: 'action.active',
            cursor: 'grab' 
          }} 
        />
      )}
      
      <Typography 
        variant="body1" 
        sx={{ 
          mr: 2, 
          fontWeight: 500,
          color: 'text.primary'
        }}
      >
        {index + 1}°
      </Typography>
      
      <Typography 
        variant="body1"
        sx={{ 
          flexGrow: 1,
          pointerEvents: 'none' // Impedisce interazioni col testo durante il drag
        }}
      >
        {squadra?.nome || `Squadra ID ${id}`}
      </Typography>
    </div>
  );
};

const ResultForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [tabValue, setTabValue] = useState(0);
  const [gare, setGare] = useState([]);
  const [squadre, setSquadre] = useState([]);
  const [selectedGaraId, setSelectedGaraId] = useState('');
  const [selectedGara, setSelectedGara] = useState(null);
  const [ordineSquadre, setOrdineSquadre] = useState([]);
  const [migliorTempoId, setMigliorTempoId] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [risultatoEsistente, setRisultatoEsistente] = useState(null);
  
  // Dati per la sezione utenti
  const [utenti, setUtenti] = useState([]);
  const [utentiLoading, setUtentiLoading] = useState(false);
  const [pronosticiPerUtente, setPronosticiPerUtente] = useState({});
  const [searchTermUtenti, setSearchTermUtenti] = useState('');
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  // Configurazione sensori per drag and drop - ottimizzato per mobile
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Riduce la distanza minima per iniziare il drag
      activationConstraint: {
        distance: 5, // Attiva drag dopo solo 5px di movimento
        delay: 100, // Riduce il ritardo di attivazione
        tolerance: 5, // Aumenta la tolleranza
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    
    // Se stiamo passando alla tab degli utenti, carica i dati degli utenti
    if (newValue === 1 && utenti.length === 0) {
      fetchUtenti();
    }
  };

  // Funzione migliorata per il caricamento dei dati
  const fetchData = useCallback(async () => {
    // Se i dati sono già caricati, non ricaricare
    if (gare.length > 0 && squadre.length > 0) {
      console.log('Dati già caricati, non ricarico');
      return;
    }
    
    setLoading(true);
    try {
      const [gareData, squadreData] = await Promise.all([
        getGare(false), // Recupera tutte le gare
        getSquadre()
      ]);
      
      setGare(gareData);
      setSquadre(squadreData);
      
      // Se non c'è una gara selezionata, seleziona la prima
      if (gareData.length > 0 && !selectedGaraId) {
        setSelectedGaraId(gareData[0].id.toString());
        setSelectedGara(gareData[0]);
      }
    } catch (error) {
      console.error('Errore caricamento dati:', error);
      setSnackbar({
        open: true,
        message: 'Impossibile caricare i dati',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  }, [gare.length, squadre.length, selectedGaraId]);
  
  // Carica la lista degli utenti
  const fetchUtenti = async () => {
    setUtentiLoading(true);
    try {
      // Carica tutti gli utenti
      const { data: utentiData, error: utentiError } = await supabase
        .from('utenti')
        .select('*')
        .order('username');
        
      if (utentiError) throw utentiError;
      
      setUtenti(utentiData);
      
      // Carica tutti i pronostici per creare una mappa
      const { data: pronosticiData, error: pronosticiError } = await supabase
        .from('pronostici')
        .select('user_id, gara_id');
        
      if (pronosticiError) throw pronosticiError;
      
      // Crea una mappa di pronostici per utente
      const pronosticiMap = {};
      
      pronosticiData.forEach(p => {
        if (!pronosticiMap[p.user_id]) {
          pronosticiMap[p.user_id] = [];
        }
        pronosticiMap[p.user_id].push(p.gara_id);
      });
      
      setPronosticiPerUtente(pronosticiMap);
      
    } catch (error) {
      console.error('Errore caricamento utenti:', error);
      setSnackbar({
        open: true,
        message: 'Impossibile caricare gli utenti',
        severity: 'error'
      });
    } finally {
      setUtentiLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (squadre.length > 0 && !ordineSquadre.length) {
      // Inizializza l'ordine con tutte le squadre
      setOrdineSquadre([...squadre].map(s => s.id));
    }
  }, [squadre]);

  useEffect(() => {
    const fetchRisultato = async () => {
      if (!selectedGaraId) return;
      
      setLoading(true);
      try {
        // Trova la gara selezionata
        const garaSelezionata = gare.find(g => g.id.toString() === selectedGaraId);
        setSelectedGara(garaSelezionata);
        
        // Controlla se esiste già un risultato per questa gara
        const risultato = await getRisultato(parseInt(selectedGaraId));
        
        if (risultato) {
          // Se esiste un risultato, usa il suo ordine
          setRisultatoEsistente(risultato);
          setOrdineSquadre(risultato.classifica || []);
          setMigliorTempoId(risultato.miglior_tempo_id ? risultato.miglior_tempo_id.toString() : '');
        } else {
          // Altrimenti inizializza con l'ordine predefinito
          setRisultatoEsistente(null);
          setOrdineSquadre([...squadre].map(s => s.id));
          setMigliorTempoId('');
        }
      } catch (error) {
        console.error('Errore caricamento risultato:', error);
        setSnackbar({
          open: true,
          message: 'Impossibile caricare il risultato',
          severity: 'error'
        });
        // Reset in caso di errore
        setRisultatoEsistente(null);
        setOrdineSquadre([...squadre].map(s => s.id));
        setMigliorTempoId('');
      } finally {
        setLoading(false);
      }
    };

    fetchRisultato();
  }, [selectedGaraId, squadre, gare]);

  const handleGaraChange = (event) => {
    setSelectedGaraId(event.target.value);
  };

  const handleMigliorTempoChange = (event) => {
    setMigliorTempoId(event.target.value);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    setOrdineSquadre(items => {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleSubmit = async () => {
    if (!selectedGaraId || ordineSquadre.length === 0) {
      setSnackbar({
        open: true,
        message: 'Seleziona una gara e ordina le squadre',
        severity: 'warning'
      });
      return;
    }

    setSubmitting(true);
    try {
      // Salva il risultato
      await insertRisultato(
        parseInt(selectedGaraId),
        ordineSquadre,
        migliorTempoId ? parseInt(migliorTempoId) : null
      );
      
      setSnackbar({
        open: true,
        message: 'Risultato salvato con successo',
        severity: 'success'
      });
      
      // Aggiorna lo stato del risultato
      setRisultatoEsistente({
        gara_id: parseInt(selectedGaraId),
        classifica: ordineSquadre,
        miglior_tempo_id: migliorTempoId ? parseInt(migliorTempoId) : null
      });
    } catch (error) {
      console.error('Errore salvataggio risultato:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Impossibile salvare il risultato',
        severity: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedGaraId) return;
    
    if (!window.confirm('Sei sicuro di voler cancellare questo risultato? Questa azione non può essere annullata.')) {
      return;
    }
    
    setSubmitting(true);
    try {
      // Elimina il risultato dal database
      const { error } = await supabase
        .from('risultati')
        .delete()
        .eq('gara_id', parseInt(selectedGaraId));
        
      if (error) throw error;
      
      setSnackbar({
        open: true,
        message: 'Risultato eliminato con successo',
        severity: 'success'
      });
      
      // Reset dello stato
      setRisultatoEsistente(null);
      setOrdineSquadre([...squadre].map(s => s.id));
      setMigliorTempoId('');
    } catch (error) {
      console.error('Errore eliminazione risultato:', error);
      setSnackbar({
        open: true,
        message: 'Impossibile eliminare il risultato',
        severity: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  // Filtra gli utenti in base al termine di ricerca
  const filteredUtenti = utenti.filter(utente => {
    const searchTerm = searchTermUtenti.toLowerCase();
    return !searchTerm || 
           (utente.username && utente.username.toLowerCase().includes(searchTerm)) ||
           (utente.nome && utente.nome.toLowerCase().includes(searchTerm)) ||
           (utente.cognome && utente.cognome.toLowerCase().includes(searchTerm)) ||
           (utente.email && utente.email.toLowerCase().includes(searchTerm));
  });
  
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
        
        {risultatoEsistente && risultatoEsistente.gara_id === gara.id && (
          <Chip 
            size="small" 
            label="Risultato inserito" 
            color="success" 
            variant="outlined"
            sx={{ ml: 1 }}
          />
        )}
      </Box>
    );
  };

  if (loading && !gare.length && !squadre.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const isSelectedGaraCampionato = selectedGara ? isGaraCampionato(selectedGara) : false;

  return (
    <Container maxWidth="lg">
      {/* Mostra pulsante retry quando necessario */}
      <LoadingWithRetry 
        loading={loading} 
        onRetry={fetchData} 
        message="Caricamento dati in corso..."
      />
      
      {!loading && (
      <Paper sx={{ p: 3, mt: 3, mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
          Pannello di Amministrazione
        </Typography>
        
        {/* Tabs di navigazione */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="admin tabs"
            centered
            variant={isMobile ? "fullWidth" : "standard"}
          >
            <Tab 
              icon={<EditIcon />} 
              label={isMobile ? "Risultati" : "Inserisci Risultati"} 
              sx={{ fontSize: isMobile ? '0.75rem' : 'inherit' }} 
            />
            <Tab 
              icon={<PersonIcon />} 
              label={isMobile ? "Utenti" : "Gestione Utenti"} 
              sx={{ fontSize: isMobile ? '0.75rem' : 'inherit' }} 
            />
          </Tabs>
        </Box>
        
        {/* Tab Inserimento Risultati */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Inserimento Risultati Ufficiali
          </Typography>
          
          {gare.length === 0 ? (
            <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
              Non ci sono gare disponibili per inserire risultati.
            </Alert>
          ) : (
            <>
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
              </Box>
              
              {selectedGaraId && (
                <>
                  {/* Banner speciale per il risultato del campionato */}
                  {isSelectedGaraCampionato && (
                    <Alert 
                      severity="info" 
                      icon={<TrophyIcon />}
                      sx={{ mb: 3 }}
                    >
                      <Typography variant="subtitle2">
                        Risultato del Campionato
                      </Typography>
                      <Typography variant="body2">
                        Stai inserendo il risultato finale per la classifica del Campionato Trentino.
                      </Typography>
                    </Alert>
                  )}
                  
                  {risultatoEsistente && (
                    <Alert 
                      severity="info" 
                      sx={{ mb: 3 }}
                    >
                      <Typography variant="subtitle2">
                        Risultato già inserito
                      </Typography>
                      <Typography variant="body2">
                        Stai modificando un risultato già esistente. Puoi riordinare le squadre e salvare nuovamente il risultato.
                      </Typography>
                    </Alert>
                  )}
                
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                    Ordine Ufficiale delle Squadre
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {isMobile ? (
                      <>Trascina <DragIcon sx={{ verticalAlign: 'middle' }}/> le squadre per ordinarle dal 1° al {squadre.length}° posto</>
                    ) : (
                      <>Trascina le squadre per ordinarle dal 1° al {squadre.length}° posto</>
                    )}
                  </Typography>
                  
                  <Box sx={{ 
                    bgcolor: '#f5f5f5', 
                    borderRadius: 1, 
                    p: 2, 
                    mb: 3
                  }}>
                    <DndContext 
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext 
                        items={ordineSquadre} 
                        strategy={verticalListSortingStrategy}
                      >
                        {ordineSquadre.map((squadraId, index) => (
                          <SortableItem 
                            key={squadraId} 
                            id={squadraId} 
                            squadra={squadre.find(s => s.id === squadraId)} 
                            index={index} 
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <FormControl fullWidth>
                      <InputLabel id="miglior-tempo-label">Squadra Miglior Tempo</InputLabel>
                      <Select
                        labelId="miglior-tempo-label"
                        id="miglior-tempo-select"
                        value={migliorTempoId}
                        label="Squadra con il Miglior Tempo"
                        onChange={handleMigliorTempoChange}
                        displayEmpty
                        disabled={isSelectedGaraCampionato}
                        renderValue={(selected) => {
                          if (!selected) return <em></em>;
                          const squadra = squadre.find(s => s.id.toString() === selected);
                          return squadra?.nome || `Squadra ID ${selected}`;
                        }}
                      >
                        <MenuItem value="">
                          <em>Nessuna selezione</em>
                        </MenuItem>
                        {squadre.map(squadra => (
                          <MenuItem key={squadra.id} value={squadra.id.toString()}>
                            {squadra.nome}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    
                    {isSelectedGaraCampionato && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Il miglior tempo non è applicabile per la classifica del campionato.
                      </Typography>
                    )}
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    {risultatoEsistente && (
                      <Button 
                        variant="outlined" 
                        color="error" 
                        onClick={handleDelete}
                        disabled={submitting}
                        startIcon={<DeleteIcon />}
                      >
                        Elimina
                      </Button>
                    )}
                    <Button 
                      variant="contained" 
                      onClick={handleSubmit} 
                      disabled={!selectedGaraId || ordineSquadre.length === 0 || submitting}
                    >
                      {submitting ? <CircularProgress size={24} /> : risultatoEsistente ? 'Aggiorna Risultato' : 'Salva Risultato'}
                    </Button>
                  </Box>
                </>
              )}
            </>
          )}
        </TabPanel>
        
        {/* Tab Gestione Utenti */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Utenti Registrati
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Visualizza tutti gli utenti registrati e i loro pronostici
            </Typography>
            
            {/* Campo ricerca utenti */}
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Cerca utente"
              value={searchTermUtenti}
              onChange={(e) => setSearchTermUtenti(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          {utentiLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {filteredUtenti.length === 0 ? (
                <Alert severity="info">
                  {searchTermUtenti ? 'Nessun utente trovato con i criteri di ricerca.' : 'Nessun utente registrato.'}
                </Alert>
              ) : (
                <TableContainer component={Paper}>
                  <Table size={isMobile ? "small" : "medium"}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Utente</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell align="center">Admin</TableCell>
                        <TableCell>Pronostici</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUtenti.map((utente) => (
                        <TableRow key={utente.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar 
                                sx={{ 
                                  width: 32, 
                                  height: 32, 
                                  mr: 1,
                                  bgcolor: utente.is_admin ? 'error.main' : 'primary.main' 
                                }}
                              >
                                {utente.username?.charAt(0).toUpperCase() || '?'}
                              </Avatar>
                              <Box>
                                <Typography variant="body1">{utente.username}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {utente.nome} {utente.cognome}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>{utente.email}</TableCell>
                          <TableCell align="center">
                            {utente.is_admin ? (
                              <Chip 
                                label="Admin" 
                                color="error" 
                                size="small"
                                variant="outlined" 
                              />
                            ) : (
                              <Typography variant="body2" color="text.secondary">No</Typography>
                            )}
                          </TableCell>
                                                    <TableCell>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {gare.map(gara => {
                                const hasPronostico = pronosticiPerUtente[utente.id]?.includes(gara.id);
                                return (
                                  <Chip 
                                    key={gara.id}
                                    size="small"
                                    label={gara.nome.replace('Gara ', '')}
                                    icon={hasPronostico ? <CheckCircleIcon /> : <CancelIcon />}
                                    color={hasPronostico ? "success" : "default"}
                                    variant={hasPronostico ? "filled" : "outlined"}
                                    sx={{ 
                                      fontSize: '0.7rem',
                                      height: 24,
                                      borderLeft: isGaraCampionato(gara) ? `2px solid ${theme.palette.warning.main}` : 'none'
                                    }}
                                  />
                                );
                              })}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}
        </TabPanel>
      </Paper>
      )}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ResultForm;