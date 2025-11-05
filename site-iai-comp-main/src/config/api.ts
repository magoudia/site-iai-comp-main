// Configuration des endpoints API
// Si le site est hébergé sur un VPS (iaicompetences.com), utiliser l'URL Vercel pour l'API
// Sinon, utiliser le chemin relatif pour Vercel
const isVPSHost = typeof window !== 'undefined' && window.location.hostname === 'iaicompetences.com';
const VERCEL_API_URL = 'https://site-iai-comp-main.vercel.app';

export const API_BASE_URL = isVPSHost ? VERCEL_API_URL : '';

export const API_ENDPOINTS = {
  SEND_EMAIL: `${API_BASE_URL}/api/send-email`,
};
