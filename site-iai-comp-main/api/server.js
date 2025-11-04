// Serveur Express pour le développement local
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sendEmailHandler from './send-email.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Wrapper pour convertir Express req/res vers le format Vercel
const vercelHandler = (handler) => {
  return async (req, res) => {
    // Simuler l'objet req/res de Vercel
    const vercelReq = {
      method: req.method,
      body: req.body,
      headers: req.headers,
      query: req.query,
    };

    const vercelRes = {
      setHeader: (name, value) => res.setHeader(name, value),
      status: (code) => {
        res.statusCode = code;
        return {
          json: (data) => res.json(data),
          end: () => res.end(),
        };
      },
    };

    try {
      await handler(vercelReq, vercelRes);
    } catch (error) {
      console.error('Erreur handler:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  };
};

// Routes API
app.post('/api/send-email', vercelHandler(sendEmailHandler));
app.options('/api/send-email', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur API démarré sur http://localhost:${PORT}`);
  console.log(`📧 Endpoint: http://localhost:${PORT}/api/send-email`);
});

