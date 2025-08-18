// Fonction Vercel pour l'envoi d'emails avec sauvegarde BDD
import { Resend } from 'resend';
import mongoose from 'mongoose';

// Modèles de données
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['nouveau', 'lu', 'traité'], default: 'nouveau' }
});

const formationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  formation: { type: String, required: true },
  message: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['nouveau', 'confirmé', 'annulé'], default: 'nouveau' }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
const FormationInscription = mongoose.models.FormationInscription || mongoose.model('FormationInscription', formationSchema);

// Connexion MongoDB
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI).then((mongoose) => mongoose);
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  
  return cached.conn;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Vérifier les variables d'environnement
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        error: 'RESEND_API_KEY manquante' 
      });
    }

    if (!process.env.MONGODB_URI) {
      return res.status(500).json({ 
        success: false, 
        error: 'MONGODB_URI manquante' 
      });
    }

    // Connecter à la base de données
    await connectDB();

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Vérifier le body
    if (!req.body) {
      return res.status(400).json({ 
        success: false, 
        error: 'Données manquantes' 
      });
    }

    const { name, email, phone, subject, message, formation } = req.body || {};

    // Déterminer le type de formulaire
    const isFormation = formation && !subject;
    
    if (isFormation) {
      // Validation pour inscription formation
      if (!name || !email || !formation) {
        return res.status(400).json({ 
          success: false, 
          error: 'Nom, email et formation sont obligatoires' 
        });
      }
    } else {
      // Validation pour contact
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          error: 'Tous les champs obligatoires doivent être remplis' 
        });
      }
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Format d\'email invalide' 
      });
    }

    // Sauvegarder en base de données
    let savedRecord;
    if (isFormation) {
      savedRecord = new FormationInscription({
        name,
        email,
        phone,
        formation,
        message
      });
    } else {
      savedRecord = new Contact({
        name,
        email,
        phone,
        subject,
        message
      });
    }

    await savedRecord.save();

    // Préparer le contenu de l'email
    const emailSubject = isFormation ? `[Inscription Formation] ${formation}` : `[Contact Form] ${subject}`;
    const emailHtml = isFormation ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          Nouvelle inscription à une formation
        </h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong style="color: #007bff;">Nom:</strong> ${name}</p>
          <p><strong style="color: #007bff;">Email:</strong> ${email}</p>
          ${phone ? `<p><strong style="color: #007bff;">Téléphone:</strong> ${phone}</p>` : ''}
          <p><strong style="color: #007bff;">Formation:</strong> ${formation}</p>
        </div>
        ${message ? `
        <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        ` : ''}
        <div style="margin-top: 20px; padding: 10px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #666;">
          <p>Cette inscription a été envoyée depuis le site IAI Compétences le ${new Date().toLocaleString('fr-FR')}.</p>
        </div>
      </div>
    ` : `
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
          <p>Ce message a été envoyé depuis le formulaire de contact du site IAI Compétences le ${new Date().toLocaleString('fr-FR')}.</p>
        </div>
      </div>
    `;

    // Envoyer l'email avec Resend
    const data = await resend.emails.send({
      from: 'IAI Compétences <onboarding@resend.dev>',
      to: ['magoudia203@gmail.com'],
      subject: emailSubject,
      html: emailHtml
    });

    console.log('Email envoyé avec succès:', data);
    
    return res.status(200).json({ 
      success: true, 
      message: isFormation ? 'Inscription envoyée avec succès' : 'Email envoyé avec succès',
      data: data,
      recordId: savedRecord._id
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
    
    // S'assurer que la réponse est toujours en JSON
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ 
      success: false, 
      error: 'Erreur interne du serveur',
      details: error?.message || 'Erreur inconnue'
    });
  }
}
