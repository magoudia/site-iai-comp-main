// Serverless function for sending emails via Resend
import { Resend } from 'resend';

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
    // Log initial pour déboguer
    console.log('API send-email appelée:', {
      method: req.method,
      hasBody: !!req.body,
      env: {
        hasResendKey: !!process.env.RESEND_API_KEY,
        nodeEnv: process.env.NODE_ENV
      }
    });
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ success: false, error: 'Missing RESEND_API_KEY' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!req.body) {
      return res.status(400).json({ success: false, error: 'Missing body' });
    }

    const { name, email, phone, subject, message, formation } = req.body;

    const isFormation = formation && !subject;

    // Basic validation
    if (isFormation) {
      if (!name || !email || !formation) {
        return res.status(400).json({ success: false, error: 'Name, email and formation are required' });
      }
    } else {
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, error: 'All required fields must be filled' });
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    const TO_EMAIL = 'magoudia203@gmail.com';
    // IMPORTANT: Pour envoyer à d'autres adresses que votre email de compte Resend,
    // vous devez vérifier le domaine 'iaicompetences.com' dans Resend.
    // Une fois le domaine vérifié, changez MAIL_FROM dans .env ou utilisez:
    // MAIL_FROM='IAI-Compétences <noreply@iaicompetences.com>'
    const RAW_FROM = process.env.MAIL_FROM || 'Website <onboarding@resend.dev>';
    // Remove accidental wrapping quotes from env values like "Website <...>"
    const FROM_EMAIL = RAW_FROM.replace(/^["']|["']$/g, '');

    // Basic validation for `from` to avoid 422 from Resend
    const fromValid = /.+<[^<>\s@]+@[^<>\s@]+\.[^<>\s@]+>$/i.test(FROM_EMAIL) || /^[^<>\s@]+@[^<>\s@]+\.[^<>\s@]+$/i.test(FROM_EMAIL);
    if (!fromValid) {
      return res.status(500).json({ success: false, error: 'Invalid MAIL_FROM format. Use email@example.com or Name <email@example.com>' });
    }


    const emailSubject = isFormation ? `[Inscription Formation] ${formation}` : `[Formulaire de contact] ${subject}`;
    const bodyHtml = isFormation ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">Nouvelle inscription à une formation</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong style="color: #007bff;">Nom:</strong> ${name}</p>
          <p><strong style="color: #007bff;">Email:</strong> ${email}</p>
          ${phone ? `<p><strong style="color: #007bff;">Téléphone:</strong> ${phone}</p>` : ''}
          <p><strong style="color: #007bff;">Formation:</strong> ${formation}</p>
        </div>
        ${message ? `
        <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; color: #555;">${String(message).replace(/\n/g, '<br>')}</p>
        </div>` : ''}
        <div style="margin-top: 20px; padding: 10px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #666;">
          <p>Envoyé depuis le site le ${new Date().toLocaleString('fr-FR')}.</p>
        </div>
      </div>
    ` : `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">Nouveau message du formulaire de contact</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong style="color: #007bff;">Nom:</strong> ${name}</p>
          <p><strong style="color: #007bff;">Email:</strong> ${email}</p>
          ${phone ? `<p><strong style="color: #007bff;">Téléphone:</strong> ${phone}</p>` : ''}
          <p><strong style="color: #007bff;">Sujet:</strong> ${subject}</p>
        </div>
        <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; color: #555;">${String(message || '').replace(/\n/g, '<br>')}</p>
        </div>
        <div style="margin-top: 20px; padding: 10px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #666;">
          <p>Envoyé depuis le site le ${new Date().toLocaleString('fr-FR')}.</p>
        </div>
      </div>
    `;

    console.log('Tentative d\'envoi email:', {
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: emailSubject,
      hasApiKey: !!process.env.RESEND_API_KEY
    });

    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject: emailSubject,
      html: bodyHtml
    });

    console.log('Réponse Resend:', data);

    // Vérifier si Resend a retourné une erreur
    // La réponse de Resend a la structure: {data: {...}, error: ...}
    if (data.error) {
      console.error('Erreur Resend:', data.error);
      
      // Détecter l'erreur de domaine non vérifié
      const errorMessage = data.error.message || '';
      if (errorMessage.includes('You can only send testing emails to your own email address') || 
          errorMessage.includes('verify a domain')) {
        return res.status(500).json({ 
          success: false, 
          error: 'Configuration Resend requise', 
          details: 'Vous devez vérifier un domaine dans Resend pour envoyer des emails à d\'autres adresses. Allez sur resend.com/domains pour vérifier votre domaine.',
          resendError: errorMessage
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        error: 'Erreur lors de l\'envoi de l\'email', 
        details: errorMessage || JSON.stringify(data.error)
      });
    }

    // La réponse de Resend a la structure: {data: {id: "...", ...}, error: null}
    // Donc l'ID est dans data.data.id, pas data.id
    const emailId = data.data?.id;
    if (!emailId) {
      console.error('Pas d\'ID retourné par Resend:', data);
      return res.status(500).json({ 
        success: false, 
        error: 'Erreur: aucun ID retourné par Resend', 
        details: JSON.stringify(data)
      });
    }

    console.log('Email envoyé avec succès, ID:', emailId);
    return res.status(200).json({ success: true, message: 'Email envoyé', data: { id: emailId } });
  } catch (error) {
    console.error('Erreur envoi email:', {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
      error: error
    });
    
    // Retourner plus de détails en développement
    const errorDetails = process.env.NODE_ENV === 'development' 
      ? {
          message: error?.message,
          stack: error?.stack,
          name: error?.name
        }
      : { message: error?.message || 'Unknown error' };
    
    return res.status(500).json({ 
      success: false, 
      error: 'Erreur interne', 
      details: errorDetails
    });
  }
}
