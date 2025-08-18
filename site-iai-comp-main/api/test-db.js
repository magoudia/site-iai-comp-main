// Test de connexion MongoDB
import mongoose from 'mongoose';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const mongoUri = 'mongodb+srv://magoudia203:XXr64ZaISMJkOfUm@cluster0.mongodb.net/iai-competences?retryWrites=true&w=majority';
    
    await mongoose.connect(mongoUri);
    
    return res.status(200).json({
      success: true,
      message: 'Connexion MongoDB réussie',
      database: 'iai-competences',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erreur de connexion MongoDB',
      details: error.message
    });
  }
}
