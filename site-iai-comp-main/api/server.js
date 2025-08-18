import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialiser Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Route de test
app.get('/', (req, res) => {
  res.json({ 
    message: 'Serveur de mail Stop Sida opérationnel',
    timestamp: new Date().toISOString()
  });
});

// Route de vérification de santé
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    service: 'Mail Server',
    timestamp: new Date().toISOString()
  });
});

// Route principale pour envoyer les emails
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation des champs requis
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Tous les champs obligatoires doivent être remplis (nom, email, sujet, message)' 
      });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Format d\'email invalide' 
      });
    }

    // Envoyer l'email avec Resend
    const data = await resend.emails.send({
      from: 'Stop Sida <onboarding@resend.dev>', // Changez pour votre domaine validé
      to: ['magoudia203@gmail.com'],
      subject: `[Contact Form] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Nouveau message du formulaire de contact
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong style="color: #007bff;">Nom:</strong> ${name}</p>
            <p><strong style="color: #007bff;">Email:</strong> ${email}</p>
            ${phone ? `<p><strong style="color: #007bff;">Téléphone:</strong> ${phone}</p>` : ''}
            <p><strong style="color: #007bff;">Sujet:</strong> ${subject}</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <div style="margin-top: 20px; padding: 10px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #666;">
            <p>Ce message a été envoyé depuis le formulaire de contact du site Stop Sida le ${new Date().toLocaleString('fr-FR')}.</p>
          </div>
        </div>
      `
    });

    console.log('Email envoyé avec succès:', data);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Email envoyé avec succès',
      data: data 
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    
    return res.status(500).json({ 
      success: false, 
      error: 'Erreur interne du serveur lors de l\'envoi de l\'email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Gestion des routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route non trouvée' 
  });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur globale:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Erreur interne du serveur' 
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📧 Service de mail Stop Sida opérationnel`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  
  // Vérifier que la clé API Resend est présente
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️  ATTENTION: RESEND_API_KEY non définie dans les variables d\'environnement');
  }
});

// Gestion propre de l'arrêt du serveur
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt du serveur...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Arrêt du serveur...');
  process.exit(0);
});