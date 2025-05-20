// src/components/fanta/ResultForm.jsx
import React, { useState, useEffect } from 'react';
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
  Divider,
  Container,
  Snackbar,
  Alert
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
import { getGare, getSquadre, inserisciRisultato } from '/src/services/fantaService';

// Componente per un elemento ordinabile
const SortableItem = ({ id, squadra, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: 'white',
    padding: '10px 16px',
    marginBottom: '4px',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    cursor: 'grab',
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Typography variant="body1" sx={{ mr: 2, fontWeight: 500 }}>
        {index + 1}°
      </Typography>
      <Typography variant="body1">
        {squadra?.nome || `Squadra ID ${id}`}
      </Typography>
    </div>
  );
};

const ResultForm = () => {
  const [gare, setGare] = useState([]);
  const [squadre, setSquadre] = useState([]);
  const [selectedGaraId, setSelectedGaraId] = useState('');
  const [classifica, setClassifica] = useState([]);
  const [migliorTempoId, setMigliorTempoId] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  // Configurazione sensori per drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [gareData, squadreData] = await Promise.all([
          getGare(),
          getSquadre()
        ]);
        setGare(gareData);
        setSquadre(squadreData);
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
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (squadre.length > 0 && !classifica.length) {
      // Inizializza la classifica con tutte le squadre in ordine casuale
      setClassifica([...squadre].map(s => s.id));
    }
  }, [squadre]);

  const handleGaraChange = (event) => {
    setSelectedGaraId(event.target.value);
  };

  const handleMigliorTempoChange = (event) => {
    setMigliorTempoId(event.target.value);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    setClassifica(items => {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleSubmit = async () => {
    if (!selectedGaraId || classifica.length === 0) {
      setSnackbar({
        open: true,
        message: 'Seleziona una gara e ordina la classifica',
        severity: 'warning'
      });
      return;
    }

    setSubmitting(true);
    try {
      await inserisciRisultato(parseInt(selectedGaraId), classifica, migliorTempoId ? parseInt(migliorTempoId) : null);
      setSnackbar({
        open: true,
        message: 'Risultati salvati e punteggi calcolati',
        severity: 'success'
      });
      // Reset form
      setSelectedGaraId('');
      setMigliorTempoId('');
    } catch (error) {
      console.error('Errore salvataggio risultati:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Impossibile salvare i risultati',
        severity: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 3, mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Inserisci Risultati Ufficiali
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="gara-select-label">Seleziona Gara</InputLabel>
            <Select
              labelId="gara-select-label"
              id="gara-select"
              value={selectedGaraId}
              label="Seleziona Gara"
              onChange={handleGaraChange}
            >
              {gare.map(gara => (
                <MenuItem key={gara.id} value={gara.id}>
                  {gara.nome} ({new Date(gara.data).toLocaleDateString()})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Classifica Finale
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Trascina le squadre per ordinarle dal 1° al 9° posto
        </Typography>
        
        <Box 
          sx={{ 
            bgcolor: '#f5f5f5', 
            borderRadius: 1, 
            p: 2, 
            mb: 3 
          }}
        >
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={classifica} 
              strategy={verticalListSortingStrategy}
            >
              {classifica.map((squadraId, index) => (
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
            <InputLabel id="miglior-tempo-label">Squadra con il Miglior Tempo</InputLabel>
            <Select
              labelId="miglior-tempo-label"
              id="miglior-tempo-select"
              value={migliorTempoId}
              label="Squadra con il Miglior Tempo"
              onChange={handleMigliorTempoChange}
              displayEmpty
            >
              <MenuItem value="">
                <em></em>
              </MenuItem>
              {squadre.map(squadra => (
                <MenuItem key={squadra.id} value={squadra.id}>
                  {squadra.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            disabled={!selectedGaraId || classifica.length === 0 || submitting}
          >
            {submitting ? <CircularProgress size={24} /> : 'Salva Risultati e Calcola Punteggi'}
          </Button>
        </Box>
      </Paper>
      
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