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

    const TO_EMAIL = process.env.CONTACT_EMAIL;
    const RAW_FROM = process.env.MAIL_FROM || 'Website <onboarding@resend.dev>';
    // Remove accidental wrapping quotes from env values like "Website <...>"
    const FROM_EMAIL = RAW_FROM.replace(/^["']|["']$/g, '');

    // Basic validation for `from` to avoid 422 from Resend
    const fromValid = /.+<[^<>\s@]+@[^<>\s@]+\.[^<>\s@]+>$/i.test(FROM_EMAIL) || /^[^<>\s@]+@[^<>\s@]+\.[^<>\s@]+$/i.test(FROM_EMAIL);
    if (!fromValid) {
      return res.status(500).json({ success: false, error: 'Invalid MAIL_FROM format. Use email@example.com or Name <email@example.com>' });
    }

    if (!TO_EMAIL) {
      return res.status(500).json({ success: false, error: 'Missing CONTACT_EMAIL' });
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

    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject: emailSubject,
      html: bodyHtml
    });

    return res.status(200).json({ success: true, message: 'Email envoyé', data });
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return res.status(500).json({ success: false, error: 'Erreur interne', details: error?.message || 'Unknown error' });
  }
}
