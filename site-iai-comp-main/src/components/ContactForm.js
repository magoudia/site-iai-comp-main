import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    // Vérification des variables d'environnement
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY manquante');
      return res.status(500).json({
        success: false,
        message: 'Configuration serveur incomplète'
      });
    }

    const { name, email, subject, message } = req.body;

    // Validation basique
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false,
        message: 'Tous les champs sont requis' 
      });
    }

    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@votredomaine.com',
      to: [process.env.TO_EMAIL || 'contact@votredomaine.com'],
      subject: subject || `Nouveau message de ${name}`,
      html: `
        <h2>Nouveau message depuis votre site</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    });

    return res.status(200).json({ 
      success: true,
      message: 'Email envoyé avec succès',
      id: data.id 
    });

  } catch (error) {
    console.error('Erreur envoi email:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Erreur lors de l\'envoi de l\'email',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}