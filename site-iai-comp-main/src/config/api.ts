// Configuration des endpoints API
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-app.vercel.app' 
  : 'http://localhost:3001';

export const API_ENDPOINTS = {
  SEND_EMAIL: `${API_BASE_URL}/api/send-email-simple`,
};

export { API_BASE_URL };
