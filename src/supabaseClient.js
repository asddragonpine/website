// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Queste variabili devono essere accessibili al client
const supabaseUrl = 'https://ldejupwmkzwjpbnuvzwy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZWp1cHdta3p3anBibnV2end5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2ODYwNjQsImV4cCI6MjA2MzI2MjA2NH0.azl_zs51cq-VAYCh4Fm0dZO_vIutNqmcKsJP1JkMQ5w'; // Deve essere una chiave valida

export const supabase = createClient(supabaseUrl, supabaseAnonKey);