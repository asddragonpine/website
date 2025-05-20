// src/utils/fantaUtils.js

/**
 * Calcola il punteggio di un pronostico in base al risultato reale
 * @param {Array} pronostico - Array di ID squadre nell'ordine pronosticato
 * @param {Array} risultatoReale - Array di ID squadre nell'ordine reale della classifica
 * @param {number|null} migliorTempoPronostico - ID della squadra pronosticata con miglior tempo
 * @param {number|null} migliorTempoReale - ID della squadra con il miglior tempo reale
 * @returns {Object} - Oggetto con punteggio_gara, punteggio_bonus e totale
 */
export const calcolaPunteggio = (pronostico, risultatoReale, migliorTempoPronostico, migliorTempoReale) => {
  let punteggioGara = 0;
  
  // Verifica che gli array esistano e abbiano la lunghezza corretta
  if (!pronostico || !risultatoReale || pronostico.length !== risultatoReale.length) {
    console.error("Dati di pronostico o risultato non validi");
    return { punteggio_gara: 0, punteggio_bonus: 0, totale: 0 };
  }
  
  // Calcola il punteggio per ogni posizione
  pronostico.forEach((squadraId, indexPronostico) => {
    const indexReale = risultatoReale.indexOf(squadraId);
    
    // Squadra in posizione esatta: 10 punti
    if (indexPronostico === indexReale) {
      punteggioGara += 10;
    } 
    // Squadra a ±1 posizione: 7 punti
    else if (Math.abs(indexPronostico - indexReale) === 1) {
      punteggioGara += 7;
    } 
    // Squadra a ±2 posizioni: 5 punti
    else if (Math.abs(indexPronostico - indexReale) === 2) {
      punteggioGara += 5;
    } 
    // Squadra a ±3 posizioni: 3 punti
    else if (Math.abs(indexPronostico - indexReale) === 3) {
      punteggioGara += 3;
    }
    // Altrimenti: 0 punti
  });
  
  // Calcola il bonus per il miglior tempo
  const punteggioBonus = (migliorTempoPronostico && migliorTempoReale && 
                          migliorTempoPronostico === migliorTempoReale) ? 10 : 0;
  
  return {
    punteggio_gara: punteggioGara,
    punteggio_bonus: punteggioBonus,
    totale: punteggioGara + punteggioBonus
  };
};

/**
 * Calcola la classifica generale degli utenti
 * @param {Array} punteggi - Array di punteggi di tutti gli utenti e tutte le gare
 * @returns {Array} - Array di oggetti con user_id e punteggio_totale, ordinato per punteggio
 */
export const calcolaClassificaGenerale = (punteggi) => {
  // Raggruppa i punteggi per utente
  const punteggiPerUtente = punteggi.reduce((acc, p) => {
    if (!acc[p.user_id]) {
      acc[p.user_id] = 0;
    }
    acc[p.user_id] += p.totale;
    return acc;
  }, {});
  
  // Trasforma in array e ordina per punteggio decrescente
  return Object.entries(punteggiPerUtente)
    .map(([user_id, punteggio_totale]) => ({ user_id, punteggio_totale }))
    .sort((a, b) => b.punteggio_totale - a.punteggio_totale);
};