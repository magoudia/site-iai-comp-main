export default async function handler(req, res) {
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Méthode non autorisée' 
    });
  }

  try {
    return res.status(410).json({ success: false, message: 'Email feature disabled' });
  } catch (error) {
    return res.status(410).json({ success: false, message: 'Email feature disabled' });
  }
}