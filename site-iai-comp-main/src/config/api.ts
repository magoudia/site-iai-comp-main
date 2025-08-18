// Configuration des URLs d'API
const API_BASE_URL = import.meta.env.PROD 
  ? '' // Utilise le même domaine que le frontend sur Vercel
  : 'http://localhost:3001';

export const API_ENDPOINTS = {
  SEND_EMAIL: `${API_BASE_URL}/api`,
};

export { API_BASE_URL };
