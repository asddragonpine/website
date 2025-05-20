// src/services/fantaService.js
import { supabase } from '/src/supabaseClient';
import { calcolaPunteggio } from '/src/utils/fantaUtils';

/**
 * Ottiene tutte le squadre
 */
export const getSquadre = async () => {
  const { data, error } = await supabase
    .from('squadre')
    .select('*')
    .order('nome');
    
  if (error) throw error;
  return data;
};

/**
 * Ottiene tutte le gare
 * @param {boolean} soloFuture - Se true, ottiene solo le gare future
 */
export const getGare = async (soloFuture = false) => {
  let query = supabase
    .from('gare')
    .select('*')
    .order('data');
    
  if (soloFuture) {
    // Filtra solo le gare con data futura
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    query = query.gte('data', today.toISOString());
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

/**
 * Ottiene il pronostico di un utente per una gara
 */
export const getPronostico = async (userId, garaId) => {
     if (!userId || !garaId) {
    console.log('getPronostico: parametri mancanti', { userId, garaId });
    return null;
  }
  try {
    const { data, error } = await supabase
      .from('pronostici')
      .select('*')
      .eq('user_id', userId)
      .eq('gara_id', garaId)
      .maybeSingle();
      
    if (error && error.code !== 'PGRST116') {
      console.error('Errore getPronostico:', error);
      throw error;
    }
    
    return data; // Sarà null se non trova righe
  } catch (error) {
    console.error('Errore nel recupero del pronostico:', error);
    throw error;
  }
};

/**
 * Inserisce un nuovo pronostico (solo se non esiste già)
 */
export const insertPronostico = async (userId, garaId, ordineSquadre, migliorTempoId = null) => {
  // Verifica che la gara sia ancora aperta ai pronostici
  const { data: gara, error: garaError } = await supabase
    .from('gare')
    .select('data')
    .eq('id', garaId)
    .single();
    
  if (garaError) throw garaError;
  
  const dataGara = new Date(gara.data);
  dataGara.setHours(0, 0, 0, 0);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (dataGara <= today) {
    throw new Error('Non è più possibile inserire pronostici per questa gara');
  }
  
  // Verifica che non esista già un pronostico per questo utente e questa gara
  const { data: pronosticoEsistente, error: pronosticoError } = await supabase
    .from('pronostici')
    .select('id')
    .eq('user_id', userId)
    .eq('gara_id', garaId)
    .single();
    
  if (pronosticoError && pronosticoError.code !== 'PGRST116') throw pronosticoError;
  
  if (pronosticoEsistente) {
    throw new Error('Hai già inserito un pronostico per questa gara');
  }
  
  // Inserisci il nuovo pronostico
  const { data, error } = await supabase
    .from('pronostici')
    .insert({
      user_id: userId,
      gara_id: garaId,
      ordine_squadre: ordineSquadre,
      miglior_tempo_id: migliorTempoId,
      created_at: new Date().toISOString()
    });
    
  if (error) throw error;
  return data;
};

/**
 * Inserisce il risultato ufficiale di una gara e calcola i punteggi
 */
export const inserisciRisultato = async (garaId, classifica, migliorTempoId = null) => {
  // Inserisci il risultato
  const { error: risultatoError } = await supabase
    .from('risultati')
    .upsert({
      gara_id: garaId,
      classifica: classifica,
      miglior_tempo_id: migliorTempoId
    }, { onConflict: 'gara_id' });
    
  if (risultatoError) throw risultatoError;
  
  // Ottieni tutti i pronostici per questa gara
  const { data: pronostici, error: pronosticiError } = await supabase
    .from('pronostici')
    .select('*')
    .eq('gara_id', garaId);
    
  if (pronosticiError) throw pronosticiError;
  
  // Calcola e salva i punteggi per ciascun pronostico
  const punteggiPromises = pronostici.map(async (pronostico) => {
    const punteggio = calcolaPunteggio(
      pronostico.ordine_squadre,
      classifica,
      pronostico.miglior_tempo_id,
      migliorTempoId
    );
    
    const { error: punteggioError } = await supabase
      .from('punteggi')
      .upsert({
        user_id: pronostico.user_id,
        gara_id: garaId,
        punteggio_gara: punteggio.punteggio_gara,
        punteggio_bonus: punteggio.punteggio_bonus,
        totale: punteggio.totale
      }, { onConflict: 'user_id,gara_id' });
      
    if (punteggioError) throw punteggioError;
    return punteggio;
  });
  
  await Promise.all(punteggiPromises);
  return true;
};

/**
 * Ottiene la classifica degli utenti per una gara specifica
 */
export const getClassificaGara = async (garaId) => {
  const { data, error } = await supabase
    .from('punteggi')
    .select(`
      id, 
      punteggio_gara, 
      punteggio_bonus, 
      totale,
      utenti:user_id (id, nome, cognome, username)
    `)
    .eq('gara_id', garaId)
    .order('totale', { ascending: false });
    
  if (error) throw error;
  return data;
};

/**
 * Ottiene la classifica generale degli utenti
 */
export const getClassificaGenerale = async () => {
  const { data: punteggi, error } = await supabase
    .from('punteggi')
    .select(`
      id, 
      user_id,
      totale,
      utenti:user_id (id, nome, cognome, username)
    `);
    
  if (error) throw error;
  
  // Raggruppa i punteggi per utente
  const punteggiPerUtente = punteggi.reduce((acc, p) => {
    if (!acc[p.user_id]) {
      acc[p.user_id] = {
        id: p.user_id,
        totale: 0,
        utente: p.utenti
      };
    }
    acc[p.user_id].totale += p.totale;
    return acc;
  }, {});
  
  // Trasforma in array e ordina
  return Object.values(punteggiPerUtente)
    .sort((a, b) => b.totale - a.totale);
};

// Ottiene il risultato di una gara specifica
export const getRisultato = async (garaId) => {
  try {
    const { data, error } = await supabase
      .from('risultati')
      .select('*')
      .eq('gara_id', garaId)
      .single();
      
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } catch (error) {
    console.error('Errore recupero risultato:', error);
    return null;
  }
};

// Ottiene tutti i pronostici per una gara
export const getPronostici = async (garaId) => {
  try {
    const { data, error } = await supabase
      .from('pronostici')
      .select(`
        *,
        utente:user_id (id, nome, cognome, username)
      `)
      .eq('gara_id', garaId);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Errore recupero pronostici:', error);
    return [];
  }
};