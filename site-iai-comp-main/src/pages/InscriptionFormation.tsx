import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const InscriptionFormation = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const formation = params.get('formation') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    formation,
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('http://localhost:3001/api/send-formation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', formation: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 4000);
      } else {
        alert('Erreur: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Erreur réseau');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-iai-blue">Inscription à une formation</h1>
        {isSubmitted ? (
          <div className="text-center text-green-600 font-semibold py-8">Votre demande a bien été envoyée !</div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nom complet *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iai-blue focus:border-transparent transition-all" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iai-blue focus:border-transparent transition-all" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Téléphone *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iai-blue focus:border-transparent transition-all" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Formation *</label>
              <input type="text" name="formation" value={formData.formation} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iai-blue focus:border-transparent transition-all" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iai-blue focus:border-transparent transition-all resize-none" />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-iai-blue to-iai-red text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? "Envoi..." : "S'inscrire"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default InscriptionFormation; 