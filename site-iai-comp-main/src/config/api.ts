// Configuration des endpoints API
// Utilise toujours le chemin relatif pour fonctionner sur tous les domaines (Vercel et domaine personnalisé)
// Cela garantit que l'API fonctionne sur iaicompetences.com et site-iai-comp-main.vercel.app
export const API_BASE_URL = '';

export const API_ENDPOINTS = {
  SEND_EMAIL: `${API_BASE_URL}/api/send-email`,
};
