// Version basique sans imports externes
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Test sans Resend d'abord
    const { name, email, subject, message, formation } = req.body || {};
    
    // Simulation d'envoi d'email
    return res.status(200).json({
      success: true,
      message: 'Email simulé envoyé avec succès',
      data: {
        name,
        email,
        subject: subject || formation,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erreur serveur',
      details: error.message
    });
  }
}
