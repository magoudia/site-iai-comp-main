import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import emailjs from 'emailjs-com';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default icon issue for Leaflet in React
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs.send(
      'service_gjy4jmr',
      'template_alyjjrm',
      {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        subject: formData.subject,
        message: formData.message,
      },
      '-59ZpLNiQF9ncW5M8'
    )
    .then(() => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    })
    .catch(() => {
      alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      details: [
        "Liberté 6 extension",
        "Lot No16, Dakar",
        "Sénégal"
      ]
    },
    {
      icon: Phone,
      title: "Téléphone",
      details: ["+221 77 639 58 10"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["iai-competences@gmail.com"]
    },
    {
      icon: Clock,
      title: "Horaires",
      details: [
        "Lun - Ven: 8h00 - 18h00",
        "Sam: 9h00 - 13h00"
      ]
    }
  ];

  const services = [
    "Conseil en Systèmes d'Information",
    "Développement Logiciel",
    "Formation IT",
    "Intelligence Artificielle",
    "Cybersécurité",
    "Cloud Computing",
    "Audit IT",
    "Autre"
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-iai-blue to-iai-red text-white">
        {/* Fond animé SVG particules */}
        <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <circle cx="200" cy="100" r="60" fill="#ffffff22">
            <animate attributeName="cy" values="100;180;100" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle cx="800" cy="220" r="40" fill="#ffffff33">
            <animate attributeName="cy" values="220;120;220" dur="8s" repeatCount="indefinite" />
          </circle>
          <circle cx="1200" cy="80" r="30" fill="#ffffff22">
            <animate attributeName="cy" values="80;160;80" dur="7s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="250" r="20" fill="#ffffff33">
            <animate attributeName="cy" values="250;180;250" dur="5s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contactez-Nous
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Discutons de votre projet et découvrons ensemble comment nous pouvons 
              vous accompagner dans votre transformation digitale
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envoyez-nous un message
              </h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto mb-4 text-green-600" size={64} />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                  <p className="text-gray-600">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iai-blue focus:border-transparent transition-all"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iai-blue focus:border-transparent transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iai-blue focus:border-transparent transition-all"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Service d'intérêt *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iai-blue focus:border-transparent transition-all"
                    >
                      <option value="">Sélectionnez un service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iai-blue focus:border-transparent transition-all resize-none"
                      placeholder="Décrivez votre projet ou vos besoins..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-iai-blue to-iai-red text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                  >
                    <Send className="mr-2 group-hover:translate-x-1 transition-transform" size={20} />
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>

            {/* Carte interactive */}
            <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre Localisation</h2>
              <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
                <MapContainer center={[14.7368, -17.454]} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[14.7368, -17.454]}>
                    <Popup>
                      Liberté 6 extension, Lot No16, Dakar, Sénégal
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Quels sont vos délais de réponse ?",
                answer: "Nous nous engageons à répondre à toute demande dans les 24 heures ouvrées."
              },
              {
                question: "Proposez-vous des devis gratuits ?",
                answer: "Oui, nous proposons des consultations et devis gratuits pour tous nos services."
              },
              {
                question: "Intervenez-vous en dehors du Sénégal ?",
                answer: "Oui, nous intervenons dans toute l'Afrique de l'Ouest et pouvons nous déplacer selon les besoins du projet."
              },
              {
                question: "Quelles sont vos modalités de paiement ?",
                answer: "Nous acceptons les virements bancaires, les chèques et proposons des facilités de paiement selon les projets."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;