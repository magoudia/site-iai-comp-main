// Configuration des endpoints API
const VERCEL_API_BASE = (import.meta as any).env?.VITE_API_BASE_URL as string | undefined;
// Option A: si VITE_API_BASE_URL est défini (ex: https://votre-projet.vercel.app), on l'utilise.
// Sinon, fallback sur la même origine ('') pour un front déployé sur Vercel avec API sur le même domaine.
export const API_BASE_URL = VERCEL_API_BASE || '';

export const API_ENDPOINTS = {
  SEND_EMAIL: `${API_BASE_URL}/api/send-email`,
};
