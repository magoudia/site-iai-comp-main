// Serverless function for sending emails via Resend
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

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
    // Vérifier que les dépendances sont disponibles
    if (!Resend) {
      console.error('Resend n\'est pas disponible');
      return res.status(500).json({ 
        success: false, 
        error: 'Erreur de configuration: Resend non disponible',
        details: 'Vérifiez que les dépendances sont installées'
      });
    }
    
    // Log initial pour déboguer
    console.log('API send-email appelée:', {
      method: req.method,
      hasBody: !!req.body,
      bodyKeys: req.body ? Object.keys(req.body) : [],
      env: {
        hasResendKey: !!process.env.RESEND_API_KEY,
        mailProvider: process.env.MAIL_PROVIDER || 'resend',
        nodeEnv: process.env.NODE_ENV,
        hasResend: !!Resend,
        hasNodemailer: !!nodemailer
      }
    });
    const provider = (process.env.MAIL_PROVIDER || 'resend').toLowerCase();
    const useResend = provider === 'resend';
    const useGraph = provider === 'graph';
    let resend;
    if (useResend) {
      if (!process.env.RESEND_API_KEY) {
        return res.status(500).json({ success: false, error: 'Missing RESEND_API_KEY' });
      }
      resend = new Resend(process.env.RESEND_API_KEY);
    }

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

    const toFromEnv = (process.env.TO_EMAIL || 'iaicompetences@outlook.fr')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const TO_EMAIL = toFromEnv.length === 1 ? toFromEnv[0] : toFromEnv;
    // IMPORTANT: Pour envoyer à d'autres adresses que votre email de compte Resend,
    // vous devez vérifier le domaine 'iaicompetences.com' dans Resend.
    // Une fois le domaine vérifié, changez MAIL_FROM dans .env ou utilisez:
    // MAIL_FROM='IAI-Compétences <noreply@iaicompetences.com>'
    const RAW_FROM = process.env.MAIL_FROM || 'Website <onboarding@resend.dev>';
    // Remove accidental wrapping quotes from env values like "Website <...>"
    const FROM_EMAIL = RAW_FROM.replace(/^["']|["']$/g, '');

    // Basic validation for `from` to avoid provider errors
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
      provider,
      hasApiKey: useResend ? !!process.env.RESEND_API_KEY : 'SMTP'
    });
    if (useResend) {
      const data = await resend.emails.send({
        from: FROM_EMAIL,
        to: Array.isArray(TO_EMAIL) ? TO_EMAIL : [TO_EMAIL],
        reply_to: email,
        subject: emailSubject,
        html: bodyHtml
      });

      console.log('Réponse Resend complète:', JSON.stringify(data, null, 2));

      if (data.error) {
        console.error('Erreur Resend:', data.error);
        const errorMessage = data.error.message || '';
        if (errorMessage.includes('You can only send testing emails to your own email address') || errorMessage.includes('verify a domain')) {
          return res.status(500).json({ 
            success: false, 
            error: 'Configuration Resend requise', 
            details: 'Vous devez vérifier un domaine dans Resend pour envoyer des emails à d\'autres adresses. Allez sur resend.com/domains pour vérifier votre domaine.',
            resendError: errorMessage
          });
        }
        return res.status(500).json({ success: false, error: 'Erreur lors de l\'envoi de l\'email', details: errorMessage || JSON.stringify(data.error) });
      }

      // Resend peut retourner l'ID directement dans data.id ou dans data.data.id
      const emailId = data.id || data.data?.id;
      
      // Valider que l'ID est un UUID valide si présent
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (emailId && !uuidRegex.test(emailId)) {
        console.warn('ID Resend invalide (pas un UUID):', emailId);
        // On continue quand même car l'email a probablement été envoyé
      }

      console.log('Email envoyé avec succès, ID:', emailId || 'non disponible');
      
      // Retourner le succès même si l'ID n'est pas disponible
      return res.status(200).json({ 
        success: true, 
        message: 'Email envoyé', 
        data: { id: emailId || null } 
      });
    } else if (useGraph) {
      // Microsoft Graph sendMail via client credentials
      const tenantId = process.env.GRAPH_TENANT_ID;
      const clientId = process.env.GRAPH_CLIENT_ID;
      const clientSecret = process.env.GRAPH_CLIENT_SECRET;
      const graphSender = process.env.GRAPH_SENDER || process.env.SMTP_USER; // UPN/email

      if (!tenantId || !clientId || !clientSecret || !graphSender) {
        return res.status(500).json({ success: false, error: 'Missing GRAPH_TENANT_ID/GRAPH_CLIENT_ID/GRAPH_CLIENT_SECRET/GRAPH_SENDER' });
      }

      const { ConfidentialClientApplication } = await import('@azure/msal-node');
      const cca = new ConfidentialClientApplication({
        auth: { clientId, authority: `https://login.microsoftonline.com/${tenantId}`, clientSecret }
      });
      const tokenResponse = await cca.acquireTokenByClientCredential({ scopes: ['https://graph.microsoft.com/.default'] });
      const accessToken = tokenResponse?.accessToken;
      if (!accessToken) {
        return res.status(500).json({ success: false, error: 'Failed to acquire Graph access token' });
      }

      const payload = {
        message: {
          subject: emailSubject,
          body: { contentType: 'HTML', content: bodyHtml },
          toRecipients: (Array.isArray(TO_EMAIL) ? TO_EMAIL : [TO_EMAIL]).map(e => ({ emailAddress: { address: e } })),
          replyTo: email ? [{ emailAddress: { address: email } }] : []
        },
        saveToSentItems: false
      };

      const resp = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(graphSender)}/sendMail`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) {
        const errText = await resp.text();
        return res.status(500).json({ success: false, error: 'Graph sendMail failed', details: errText });
      }

      console.log('Email envoyé via Microsoft Graph');
      return res.status(200).json({ success: true, message: 'Email envoyé', data: { id: null } });
    } else {
      // SMTP Office 365
      const smtpHost = process.env.SMTP_HOST || 'smtp.office365.com';
      const smtpPort = Number(process.env.SMTP_PORT || 587);
      const smtpUser = process.env.SMTP_USER; // ex: contact@iaicompetences.com
      const smtpPass = process.env.SMTP_PASS; // mot de passe ou app password

      if (!smtpUser || !smtpPass) {
        return res.status(500).json({ success: false, error: 'Missing SMTP_USER/SMTP_PASS' });
      }

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass }
      });

      const info = await transporter.sendMail({
        from: FROM_EMAIL,
        to: Array.isArray(TO_EMAIL) ? TO_EMAIL.join(',') : TO_EMAIL,
        replyTo: email,
        subject: emailSubject,
        html: bodyHtml
      });

      console.log('Email envoyé via SMTP:', info?.messageId || info);
      return res.status(200).json({ success: true, message: 'Email envoyé', data: { id: info?.messageId || null } });
    }
  } catch (error) {
    console.error('Erreur envoi email:', {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
      error: error
    });
    
    // Retourner plus de détails pour aider au débogage
    const errorMessage = error?.message || 'Unknown error';
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // Messages d'erreur plus explicites
    let userFriendlyError = 'Erreur lors de l\'envoi de l\'email';
    if (errorMessage.includes('RESEND_API_KEY') || errorMessage.includes('Missing')) {
      userFriendlyError = 'Configuration email manquante. Veuillez contacter l\'administrateur.';
    } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      userFriendlyError = 'Erreur de connexion. Veuillez réessayer plus tard.';
    }
    
    // Toujours retourner le message d'erreur pour aider au débogage
    // Masquer seulement la stack trace en production
    const errorDetails = isDevelopment 
      ? {
          message: errorMessage,
          stack: error?.stack,
          name: error?.name,
          provider: process.env.MAIL_PROVIDER || 'resend'
        }
      : { 
          message: errorMessage,
          // Retourner aussi le provider pour aider au débogage
          provider: process.env.MAIL_PROVIDER || 'resend',
          // Si c'est une erreur de configuration, donner plus de détails
          ...(errorMessage.includes('RESEND_API_KEY') || errorMessage.includes('Missing') 
            ? { hint: 'Vérifiez les variables d\'environnement sur Vercel' }
            : {})
        };
    
    return res.status(500).json({ 
      success: false, 
      error: userFriendlyError, 
      details: errorDetails
    });
  }
}
