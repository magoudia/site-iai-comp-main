import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { name, email, phone, subject, message } = req.body;

    const data = await resend.emails.send({
      from: 'Stop Sida <onboarding@resend.dev>', // tu peux mettre ton domaine validé
      to: ['magoudia203@gmail.com'],
      subject: `[Contact Form] ${subject}`,
      html: `
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Erreur Resend:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
