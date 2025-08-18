import { useState } from 'react';
import { sendEmail } from '../lib/resend';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await sendEmail(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      console.error('Erreur:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Sujet"
        value={formData.subject}
        onChange={(e) => setFormData({...formData, subject: e.target.value})}
      />
      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        required
      />
      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Envoi...' : 'Envoyer'}
      </button>
      
      {status === 'success' && <p>Message envoyé avec succès !</p>}
      {status === 'error' && <p>Erreur lors de l'envoi.</p>}
    </form>
  );
}