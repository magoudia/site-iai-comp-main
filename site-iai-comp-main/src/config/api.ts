// Configuration des endpoints API
const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';

const API_BASE_URL = isProduction 
  ? '' // Utilise l'URL actuelle en production
  : 'http://localhost:3001';

export const API_ENDPOINTS = {
  SEND_EMAIL: `${API_BASE_URL}/api/send-email-simple`,
};

export { API_BASE_URL };
