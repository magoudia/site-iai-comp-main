// Test ultra-simple pour Vercel
export default function handler(req, res) {
  res.status(200).json({ 
    success: true, 
    message: 'Hello from Vercel!',
    timestamp: new Date().toISOString()
  });
}
