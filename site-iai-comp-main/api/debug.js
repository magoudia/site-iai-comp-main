// Debug endpoint pour identifier l'erreur 500
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    return res.status(200).json({
      success: true,
      message: 'Debug endpoint fonctionne',
      method: req.method,
      headers: req.headers,
      body: req.body,
      env: {
        hasResendKey: !!process.env.RESEND_API_KEY,
        hasMongoUri: !!process.env.MONGODB_URI,
        nodeEnv: process.env.NODE_ENV
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}
