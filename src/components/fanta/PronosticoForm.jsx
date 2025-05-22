// // src/components/fanta/PronosticoForm.jsx
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
//   Chip
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
// import { Warning as WarningIcon } from '@mui/icons-material';
// import { getGare, getSquadre, getPronostico, insertPronostico } from '/src/services/fantaService';

// // Funzione per verificare se una gara è ancora aperta per i pronostici
// const isGaraOpen = (gara) => {
//   if (!gara || !gara.data) return false;
  
//   const dataGara = new Date(gara.data);
//   dataGara.setHours(0, 0, 0, 0);
  
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
  
//   // Un giorno prima della gara
//   const scadenzaPronostici = new Date(dataGara);
//   scadenzaPronostici.setDate(dataGara.getDate() - 1);
  
//   return today <= scadenzaPronostici;
// };

// // Funzione per formattare una data in italiano
// const formatDate = (date) => {
//   if (!date) return 'N/D';
//   const d = new Date(date);
//   return d.toLocaleDateString('it-IT');
// };

// // Funzione per calcolare la data di scadenza del pronostico
// const getScadenzaPronostico = (data) => {
//   if (!data) return 'N/D';
//   const dataGara = new Date(data);
//   const scadenza = new Date(dataGara);
//   scadenza.setDate(dataGara.getDate() - 1);
//   return formatDate(scadenza);
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

// // Componente per un elemento ordinabile
// const SortableItem = ({ id, squadra, index }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({ id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     backgroundColor: 'white',
//     padding: '10px',
//     marginBottom: '8px',
//     borderRadius: '4px',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//     cursor: 'grab',
//     display: 'flex',
//     alignItems: 'center'
//   };

//   return (
//     <div 
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//     >
//       <Typography variant="body1" sx={{ mr: 2, fontWeight: 500 }}>
//         {index + 1}°
//       </Typography>
//       <Typography variant="body1">
//         {squadra?.nome || `Squadra ID ${id}`}
//       </Typography>
//     </div>
//   );
// };

// const PronosticoForm = ({ userId }) => {
//   const [gare, setGare] = useState([]);
//   const [gareFiltered, setGareFiltered] = useState([]); // Gare filtrate (solo quelle aperte)
//   const [squadre, setSquadre] = useState([]);
//   const [selectedGaraId, setSelectedGaraId] = useState('');
//   const [selectedGara, setSelectedGara] = useState(null);
//   const [ordineSquadre, setOrdineSquadre] = useState([]);
//   const [migliorTempoId, setMigliorTempoId] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [pronosticoEsistente, setPronosticoEsistente] = useState(null);
//   const [showClosedGare, setShowClosedGare] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'info'
//   });

//   // Configurazione sensori per drag and drop
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const [gareData, squadreData] = await Promise.all([
//         getGare(false), // Recupera tutte le gare, non solo quelle future
//         getSquadre()
//       ]);
      
//       setGare(gareData);
      
//       // Filtra le gare per mostrare solo quelle aperte per i pronostici
//       const gareAperte = gareData.filter(gara => isGaraOpen(gara));
//       setGareFiltered(gareAperte);
      
//       setSquadre(squadreData);
      
//       // Se non ci sono gare aperte, non selezionare niente
//       if (gareAperte.length > 0 && !selectedGaraId) {
//         setSelectedGaraId(gareAperte[0].id.toString());
//         setSelectedGara(gareAperte[0]);
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
//   }, [selectedGaraId]);
  
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
//     const fetchPronostico = async () => {
//       if (!selectedGaraId || !userId) return;
      
//       setLoading(true);
//       try {
//         // Trova la gara selezionata
//         const garaSelezionata = gare.find(g => g.id.toString() === selectedGaraId);
//         setSelectedGara(garaSelezionata);
        
//         const pronostico = await getPronostico(userId, parseInt(selectedGaraId));
        
//         // pronostico sarà null se non esiste
//         if (pronostico) {
//           setPronosticoEsistente(pronostico);
//           setOrdineSquadre(pronostico.ordine_squadre);
//           setMigliorTempoId(pronostico.miglior_tempo_id ? pronostico.miglior_tempo_id.toString() : '');
//         } else {
//           setPronosticoEsistente(null);
//           // Resetta l'ordine a quello predefinito se non c'è un pronostico
//           setOrdineSquadre([...squadre].map(s => s.id));
//           setMigliorTempoId('');
//         }
//       } catch (error) {
//         console.error('Errore caricamento pronostico:', error);
//         setSnackbar({
//           open: true,
//           message: 'Impossibile caricare il pronostico',
//           severity: 'error'
//         });
//         // Resetta in caso di errore
//         setPronosticoEsistente(null);
//         setOrdineSquadre([...squadre].map(s => s.id));
//         setMigliorTempoId('');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPronostico();
//   }, [selectedGaraId, userId, squadre, gare]);

//   const handleGaraChange = (event) => {
//     setSelectedGaraId(event.target.value);
//   };

//   const handleMigliorTempoChange = (event) => {
//     setMigliorTempoId(event.target.value);
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
    
//     if (pronosticoEsistente) return;
//     if (!over || active.id === over.id) return;

//     setOrdineSquadre(items => {
//       const oldIndex = items.indexOf(active.id);
//       const newIndex = items.indexOf(over.id);
//       return arrayMove(items, oldIndex, newIndex);
//     });
//   };

//   const handleSubmit = async () => {
//     if (!selectedGaraId || !userId || ordineSquadre.length === 0) {
//       setSnackbar({
//         open: true,
//         message: 'Seleziona una gara e ordina le squadre',
//         severity: 'warning'
//       });
//       return;
//     }
    
//     // Controlla se la gara è ancora aperta
//     const garaSelezionata = gare.find(g => g.id.toString() === selectedGaraId);
//     if (!isGaraOpen(garaSelezionata)) {
//       setSnackbar({
//         open: true,
//         message: 'Non è più possibile inserire pronostici per questa gara',
//         severity: 'error'
//       });
//       return;
//     }

//     setSubmitting(true);
//     try {
//       await insertPronostico(
//         userId, 
//         parseInt(selectedGaraId), 
//         ordineSquadre, 
//         migliorTempoId ? parseInt(migliorTempoId) : null
//       );
      
//       setSnackbar({
//         open: true,
//         message: 'Pronostico salvato con successo',
//         severity: 'success'
//       });
      
//       // Aggiorna lo stato del pronostico esistente
//       setPronosticoEsistente({
//         user_id: userId,
//         gara_id: parseInt(selectedGaraId),
//         ordine_squadre: ordineSquadre,
//         miglior_tempo_id: migliorTempoId ? parseInt(migliorTempoId) : null
//       });
//     } catch (error) {
//       console.error('Errore salvataggio pronostico:', error);
//       setSnackbar({
//         open: true,
//         message: error.message || 'Impossibile salvare il pronostico',
//         severity: 'error'
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };
  
//   const handleToggleClosedGare = () => {
//     setShowClosedGare(prev => !prev);
    
//     // Se stiamo attivando la visualizzazione di tutte le gare e il menu è vuoto
//     if (!showClosedGare && !selectedGaraId && gare.length > 0) {
//       setSelectedGaraId(gare[0].id.toString());
//       setSelectedGara(gare[0]);
//     }
//     // Se stiamo disattivando la visualizzazione di tutte le gare
//     else if (showClosedGare) {
//       // Se la gara selezionata non è aperta, resetta la selezione
//       const garaSelezionata = gare.find(g => g.id.toString() === selectedGaraId);
//       if (garaSelezionata && !isGaraOpen(garaSelezionata) && gareFiltered.length > 0) {
//         setSelectedGaraId(gareFiltered[0].id.toString());
//         setSelectedGara(gareFiltered[0]);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // Gare da mostrare nel dropdown
//   const gareToShow = showClosedGare ? gare : gareFiltered;
  
//   // Controlla se la gara selezionata è aperta o chiusa
//   const isSelectedGaraOpen = selectedGara ? isGaraOpen(selectedGara) : false;

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
//           Il Tuo Pronostico
//         </Typography>
        
//         {gare.length === 0 ? (
//           <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
//             Non ci sono gare disponibili per inserire pronostici.
//           </Alert>
//         ) : gareFiltered.length === 0 && !showClosedGare ? (
//           <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>
//             Non ci sono gare aperte per i pronostici. 
//             <Button 
//               size="small" 
//               color="inherit" 
//               sx={{ ml: 1 }}
//               onClick={handleToggleClosedGare}
//             >
//               Mostra tutte le gare
//             </Button>
//           </Alert>
//         ) : (
//           <>
//             <Box sx={{ mb: 3 }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
//                 <Typography variant="subtitle2" color="text.secondary">
//                   {showClosedGare ? 
//                     'Mostrando anche gare chiuse (solo visualizzazione)' : 
//                     'Mostrando solo gare aperte per pronostici'}
//                 </Typography>
//                 <Button 
//                   size="small" 
//                   variant="text" 
//                   onClick={handleToggleClosedGare}
//                 >
//                   {showClosedGare ? 'Mostra solo gare aperte' : 'Mostra tutte le gare'}
//                 </Button>
//               </Box>
              
//               <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel id="gara-select-label">Seleziona Gara</InputLabel>
//                 <Select
//                   labelId="gara-select-label"
//                   id="gara-select"
//                   value={selectedGaraId}
//                   label="Seleziona Gara"
//                   onChange={handleGaraChange}
//                 >
//                   {gareToShow.map(gara => {
//                     const isOpen = isGaraOpen(gara);
//                     const scadenza = getScadenzaPronostico(gara.data);
                    
//                     return (
//                       <MenuItem 
//                         key={gara.id} 
//                         value={gara.id.toString()}
//                         sx={{ 
//                           display: 'flex', 
//                           justifyContent: 'space-between',
//                           color: isOpen ? 'text.primary' : 'text.disabled'
//                         }}
//                       >
//                         <span>{gara.nome} ({formatDate(gara.data)})</span>
//                         <Box component="span" sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
//                           {isOpen ? (
//                             <Chip 
//                               size="small" 
//                               label={`Scadenza: ${scadenza}`} 
//                               color="primary" 
//                               variant="outlined"
//                               sx={{ ml: 1 }}
//                             />
//                           ) : (
//                             <Chip 
//                               size="small" 
//                               label="Chiusa" 
//                               color="error" 
//                               variant="outlined"
//                               sx={{ ml: 1 }}
//                             />
//                           )}
//                         </Box>
//                       </MenuItem>
//                     );
//                   })}
//                 </Select>
//               </FormControl>
//             </Box>
            
//             {selectedGaraId && (
//               <>
//                 {/* Banner di avviso per gare chiuse */}
//                 {!isSelectedGaraOpen && (
//                   <Alert 
//                     severity="warning" 
//                     icon={<WarningIcon />}
//                     sx={{ mb: 3 }}
//                   >
//                     <Typography variant="subtitle2">
//                       I pronostici per questa gara sono chiusi
//                     </Typography>
//                     <Typography variant="body2">
//                       La scadenza per l'inserimento dei pronostici era il {getScadenzaPronostico(selectedGara?.data)}.
//                     </Typography>
//                   </Alert>
//                 )}
              
//                 {pronosticoEsistente ? (
//                   <Card sx={{ mb: 3, bgcolor: '#f0f8ff' }}>
//                     <CardContent>
//                       <Typography variant="h6" gutterBottom>
//                         Pronostico Inserito
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" gutterBottom>
//                         Hai già inserito il tuo pronostico per questa gara:
//                       </Typography>
                      
//                       <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
//                         {pronosticoEsistente.ordine_squadre.map((squadraId, index) => {
//                           const squadra = squadre.find(s => s.id === squadraId);
//                           return (
//                             <React.Fragment key={squadraId}>
//                               <ListItem>
//                                 <ListItemText 
//                                   primary={`${index + 1}° ${squadra?.nome || `Squadra ID ${squadraId}`}`}
//                                 />
//                               </ListItem>
//                               {index < pronosticoEsistente.ordine_squadre.length - 1 && <Divider />}
//                             </React.Fragment>
//                           );
//                         })}
//                       </List>
                      
//                       {pronosticoEsistente.miglior_tempo_id && (
//                         <Box sx={{ mt: 2 }}>
//                           <Typography variant="body2">
//                             <strong>Miglior tempo:</strong> {
//                               squadre.find(s => s.id === pronosticoEsistente.miglior_tempo_id)?.nome || 
//                               `Squadra ID ${pronosticoEsistente.miglior_tempo_id}`
//                             }
//                           </Typography>
//                         </Box>
//                       )}
                      
//                       <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
//                         Non è possibile modificare un pronostico dopo averlo inserito.
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 ) : (
//                   <>
//                     <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
//                       Ordina le Squadre
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" gutterBottom>
//                       Trascina le squadre per ordinarle dal 1° al 10° posto
//                     </Typography>
                    
//                     <Box sx={{ 
//                       bgcolor: '#f5f5f5', 
//                       borderRadius: 1, 
//                       p: 2, 
//                       mb: 3,
//                       opacity: isSelectedGaraOpen ? 1 : 0.6
//                     }}>
//                       <DndContext 
//                         sensors={sensors}
//                         collisionDetection={closestCenter}
//                         onDragEnd={handleDragEnd}
//                       >
//                         <SortableContext 
//                           items={ordineSquadre} 
//                           strategy={verticalListSortingStrategy}
//                         >
//                           {ordineSquadre.map((squadraId, index) => (
//                             <SortableItem 
//                               key={squadraId} 
//                               id={squadraId} 
//                               squadra={squadre.find(s => s.id === squadraId)} 
//                               index={index} 
//                             />
//                           ))}
//                         </SortableContext>
//                       </DndContext>
//                     </Box>
                    
//                     <Box sx={{ mb: 3 }}>
//                       <FormControl fullWidth>
//                         <InputLabel id="miglior-tempo-label">Squadra Miglior Tempo (bonus)</InputLabel>
//                         <Select
//                           labelId="miglior-tempo-label"
//                           id="miglior-tempo-select"
//                           value={migliorTempoId}
//                           label="Squadra con il Miglior Tempo (bonus)"
//                           onChange={handleMigliorTempoChange}
//                           displayEmpty
//                           disabled={!isSelectedGaraOpen}
//                         >
//                           <MenuItem value="">
//                             <em></em>
//                           </MenuItem>
//                           {squadre.map(squadra => (
//                             <MenuItem key={squadra.id} value={squadra.id.toString()}>
//                               {squadra.nome}
//                             </MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     </Box>
                    
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//                       <Button 
//                         variant="outlined" 
//                         color="error" 
//                         onClick={() => setSelectedGaraId('')}
//                         disabled={submitting}
//                       >
//                         Annulla
//                       </Button>
//                       <Button 
//                         variant="contained" 
//                         onClick={handleSubmit} 
//                         disabled={!selectedGaraId || ordineSquadre.length === 0 || submitting || !isSelectedGaraOpen}
//                       >
//                         {submitting ? <CircularProgress size={24} /> : 'Salva Pronostico'}
//                       </Button>
//                     </Box>
//                   </>
//                 )}
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

// export default PronosticoForm;


// src/components/fanta/PronosticoForm.jsx
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
  useTheme
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
  Warning as WarningIcon,
  EmojiEvents as TrophyIcon,
  DragIndicator as DragIcon
} from '@mui/icons-material';
import { getGare, getSquadre, getPronostico, insertPronostico } from '/src/services/fantaService';

// Funzione per verificare se una gara è un campionato
const isGaraCampionato = (gara) => {
  if (!gara || !gara.nome) return false;
  
  // Verifica se il nome della gara contiene la parola "campionato" (case insensitive)
  return gara.nome.toLowerCase().includes('campionato');
};


// Funzione per verificare se una gara è ancora aperta per i pronostici
const isGaraOpen = (gara) => {
  if (!gara || !gara.data) return false;
  
  const dataGara = new Date(gara.data);
  dataGara.setHours(0, 0, 0, 0);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Un giorno prima della gara
  const scadenzaPronostici = new Date(dataGara);
  scadenzaPronostici.setDate(dataGara.getDate() - 1);
  
  return today <= scadenzaPronostici;
};

// Funzione per formattare una data in italiano
const formatDate = (date) => {
  if (!date) return 'N/D';
  const d = new Date(date);
  return d.toLocaleDateString('it-IT');
};

// Funzione per calcolare la data di scadenza del pronostico
const getScadenzaPronostico = (data) => {
  if (!data) return 'N/D';
  const dataGara = new Date(data);
  const scadenza = new Date(dataGara);
  scadenza.setDate(dataGara.getDate() - 1);
  return formatDate(scadenza);
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

const PronosticoForm = ({ userId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [gare, setGare] = useState([]);
  const [squadre, setSquadre] = useState([]);
  const [selectedGaraId, setSelectedGaraId] = useState('');
  const [selectedGara, setSelectedGara] = useState(null);
  const [ordineSquadre, setOrdineSquadre] = useState([]);
  const [migliorTempoId, setMigliorTempoId] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pronosticoEsistente, setPronosticoEsistente] = useState(null);
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
        // Seleziona la prima gara aperta, se disponibile
        const garaAperta = gareData.find(g => isGaraOpen(g));
        if (garaAperta) {
          setSelectedGaraId(garaAperta.id.toString());
          setSelectedGara(garaAperta);
        } else {
          // Altrimenti seleziona la prima gara
          setSelectedGaraId(gareData[0].id.toString());
          setSelectedGara(gareData[0]);
        }
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
    const fetchPronostico = async () => {
      if (!selectedGaraId || !userId) return;
      
      setLoading(true);
      try {
        // Trova la gara selezionata
        const garaSelezionata = gare.find(g => g.id.toString() === selectedGaraId);
        setSelectedGara(garaSelezionata);
        
        const pronostico = await getPronostico(userId, parseInt(selectedGaraId));
        
        // pronostico sarà null se non esiste
        if (pronostico) {
          setPronosticoEsistente(pronostico);
          setOrdineSquadre(pronostico.ordine_squadre);
          setMigliorTempoId(pronostico.miglior_tempo_id ? pronostico.miglior_tempo_id.toString() : '');
        } else {
          setPronosticoEsistente(null);
          // Resetta l'ordine a quello predefinito se non c'è un pronostico
          setOrdineSquadre([...squadre].map(s => s.id));
          setMigliorTempoId('');
        }
      } catch (error) {
        console.error('Errore caricamento pronostico:', error);
        setSnackbar({
          open: true,
          message: 'Impossibile caricare il pronostico',
          severity: 'error'
        });
        // Resetta in caso di errore
        setPronosticoEsistente(null);
        setOrdineSquadre([...squadre].map(s => s.id));
        setMigliorTempoId('');
      } finally {
        setLoading(false);
      }
    };

    fetchPronostico();
  }, [selectedGaraId, userId, squadre, gare]);

  const handleGaraChange = (event) => {
    setSelectedGaraId(event.target.value);
  };

  const handleMigliorTempoChange = (event) => {
    setMigliorTempoId(event.target.value);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (pronosticoEsistente) return;
    if (!over || active.id === over.id) return;

    setOrdineSquadre(items => {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleSubmit = async () => {
    if (!selectedGaraId || !userId || ordineSquadre.length === 0) {
      setSnackbar({
        open: true,
        message: 'Seleziona una gara e ordina le squadre',
        severity: 'warning'
      });
      return;
    }
    
    // Controlla se la gara è ancora aperta
    const garaSelezionata = gare.find(g => g.id.toString() === selectedGaraId);
    if (!isGaraOpen(garaSelezionata)) {
      setSnackbar({
        open: true,
        message: 'Non è più possibile inserire pronostici per questa gara',
        severity: 'error'
      });
      return;
    }

    setSubmitting(true);
    try {
      await insertPronostico(
        userId, 
        parseInt(selectedGaraId), 
        ordineSquadre, 
        migliorTempoId ? parseInt(migliorTempoId) : null
      );
      
      setSnackbar({
        open: true,
        message: 'Pronostico salvato con successo',
        severity: 'success'
      });
      
      // Aggiorna lo stato del pronostico esistente
      setPronosticoEsistente({
        user_id: userId,
        gara_id: parseInt(selectedGaraId),
        ordine_squadre: ordineSquadre,
        miglior_tempo_id: migliorTempoId ? parseInt(migliorTempoId) : null
      });
    } catch (error) {
      console.error('Errore salvataggio pronostico:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Impossibile salvare il pronostico',
        severity: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  // Funzione per renderizzare il label delle gare nel menu a tendina in modo responsivo
  const renderGaraLabel = (gara) => {
    const isOpen = isGaraOpen(gara);
  const isCampionato = isGaraCampionato(gara);
    const scadenza = getScadenzaPronostico(gara.data);
    
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
              color: isOpen ? 'text.primary' : 'text.disabled',
              fontWeight: isCampionato ? 'bold' : 'normal'
            }}
          >
            {gara.nome} ({formatDate(gara.data)})
          </Typography>
        </Box>
        
        <Box sx={{ mt: isMobile ? 0.5 : 0 }}>
          {isOpen ? (
            <Chip 
              size="small" 
              label={isMobile ? `Scad: ${scadenza}` : `Scadenza: ${scadenza}`}
              color="primary" 
              variant="outlined"
            />
          ) : (
            <Chip 
              size="small" 
              label="Chiusa" 
              color="error" 
              variant="outlined"
            />
          )}
        </Box>
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

  // Controlla se la gara selezionata è aperta o chiusa
  const isSelectedGaraOpen = selectedGara ? isGaraOpen(selectedGara) : false;
const isSelectedGaraCampionato = selectedGara ? isGaraCampionato(selectedGara) : false;

  return (
    <Container maxWidth="md">
      {/* Mostra pulsante retry quando necessario */}
      <LoadingWithRetry 
        loading={loading} 
        onRetry={fetchData} 
        message="Caricamento dati in corso..."
      />
      
      {!loading && (
      <Paper sx={{ p: 3, mt: 3, mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Il Tuo Pronostico
        </Typography>
        
        {gare.length === 0 ? (
          <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
            Non ci sono gare disponibili per inserire pronostici.
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
                {/* Banner di avviso per gare chiuse */}
                {!isSelectedGaraOpen && (
                  <Alert 
                    severity="warning" 
                    icon={<WarningIcon />}
                    sx={{ mb: 3 }}
                  >
                    <Typography variant="subtitle2">
                      I pronostici per questa gara sono chiusi
                    </Typography>
                    <Typography variant="body2">
                      La scadenza per l'inserimento dei pronostici era il {getScadenzaPronostico(selectedGara?.data)}.
                    </Typography>
                  </Alert>
                )}
                
                {/* Banner speciale per il pronostico del campionato */}
                {isSelectedGaraCampionato && (
                  <Alert 
                    severity="info" 
                    icon={<TrophyIcon />}
                    sx={{ mb: 3 }}
                  >
                    <Typography variant="subtitle2">
                      Pronostico Campionato
                    </Typography>
                    <Typography variant="body2">
                      Inserisci il tuo pronostico per la classifica finale del Campionato Trentino!
                    </Typography>
                  </Alert>
                )}

              
                {pronosticoEsistente ? (
                  <Card sx={{ mb: 3, bgcolor: '#f0f8ff' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Pronostico Inserito
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Hai già inserito il tuo pronostico per questa gara:
                      </Typography>
                      
                      <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
                        {pronosticoEsistente.ordine_squadre.map((squadraId, index) => {
                          const squadra = squadre.find(s => s.id === squadraId);
                          return (
                            <React.Fragment key={squadraId}>
                              <ListItem>
                                <ListItemText 
                                  primary={`${index + 1}° ${squadra?.nome || `Squadra ID ${squadraId}`}`}
                                />
                              </ListItem>
                              {index < pronosticoEsistente.ordine_squadre.length - 1 && <Divider />}
                            </React.Fragment>
                          );
                        })}
                      </List>
                      
                      {pronosticoEsistente.miglior_tempo_id && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2">
                            <strong>Miglior tempo:</strong> {
                              squadre.find(s => s.id === pronosticoEsistente.miglior_tempo_id)?.nome || 
                              `Squadra ID ${pronosticoEsistente.miglior_tempo_id}`
                            }
                          </Typography>
                        </Box>
                      )}
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Non è possibile modificare un pronostico dopo averlo inserito.
                      </Typography>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                      Ordina le Squadre
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
                      mb: 3,
                      opacity: isSelectedGaraOpen ? 1 : 0.6
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
                        <InputLabel id="miglior-tempo-label">Squadra Miglior Tempo (bonus)</InputLabel>
                        <Select
                          labelId="miglior-tempo-label"
                          id="miglior-tempo-select"
                          value={migliorTempoId}
                          label="Squadra con il Miglior Tempo (bonus)"
                          onChange={handleMigliorTempoChange}
                          displayEmpty
                          disabled={!isSelectedGaraOpen || isSelectedGaraCampionato}
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
                          Il bonus per il miglior tempo non è disponibile per il pronostico del campionato.
                        </Typography>
                      )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                      <Button 
                        variant="outlined" 
                        color="error" 
                        onClick={() => setSelectedGaraId('')}
                        disabled={submitting}
                      >
                        Annulla
                      </Button>
                      <Button 
                        variant="contained" 
                        onClick={handleSubmit} 
                        disabled={!selectedGaraId || ordineSquadre.length === 0 || submitting || !isSelectedGaraOpen}
                      >
                        {submitting ? <CircularProgress size={24} /> : 'Salva Pronostico'}
                      </Button>
                      
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                          Attenzione: puoi inserire una sola volta il pronostico poi non è più modificabile, pensaci bene! 
                      </Typography>
                    </Box>
                  </>
                )}
              </>
            )}
          </>
        )}
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

export default PronosticoForm;