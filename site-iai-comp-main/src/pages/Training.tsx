import React, { useState } from 'react';
import { BookOpen, Award, Users, Clock, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Training = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const programs = [
    {
      slug: 'developpement-web-full-stack',
      title: "Développement Web Full-Stack",
      duration: "6 mois",
      level: "Débutant à Avancé",
      certification: "Certifié",
      description: "Formation complète en développement web moderne avec React, Node.js et bases de données",
      modules: [
        "HTML5, CSS3, JavaScript ES6+",
        "React.js et écosystème",
        "Node.js et Express",
        "Bases de données (SQL/NoSQL)",
        "Déploiement et DevOps"
      ],
      price: "750 000 FCFA"
    },
    {
      slug: 'intelligence-artificielle-machine-learning',
      title: "Intelligence Artificielle & Machine Learning",
      duration: "4 mois",
      level: "Intermédiaire",
      certification: "Certifié",
      description: "Maîtrisez les concepts et outils de l'IA pour créer des solutions intelligentes",
      modules: [
        "Fondamentaux de l'IA",
        "Python pour l'IA",
        "Machine Learning avec Scikit-learn",
        "Deep Learning avec TensorFlow",
        "Projets pratiques"
      ],
      price: "650 000 FCFA"
    },
    {
      slug: 'cybersecurite-audit',
      title: "Cybersécurité et Audit",
      duration: "3 mois",
      level: "Intermédiaire à Avancé",
      certification: "Certifié",
      description: "Formation spécialisée en sécurité informatique et audit de systèmes",
      modules: [
        "Fondamentaux de la sécurité",
        "Tests de pénétration",
        "Audit de sécurité",
        "Gestion des incidents",
        "Conformité et réglementation"
      ],
      price: "550 000 FCFA"
    },
    {
      slug: 'administration-systemes-reseaux',
      title: "Administration Systèmes et Réseaux",
      duration: "4 mois",
      level: "Débutant à Intermédiaire",
      certification: "Certifié",
      description: "Devenez expert en administration de systèmes Linux/Windows et réseaux",
      modules: [
        "Administration Linux/Windows",
        "Configuration réseau",
        "Virtualisation",
        "Monitoring et supervision",
        "Sécurité des infrastructures"
      ],
      price: "600 000 FCFA"
    },
    {
      slug: 'gestion-projet-it',
      title: "Gestion de Projet IT",
      duration: "2 mois",
      level: "Tous niveaux",
      certification: "Certifié",
      description: "Méthodologies agiles et gestion de projets informatiques",
      modules: [
        "Méthodologies Agile/Scrum",
        "Planification de projet",
        "Gestion d'équipe",
        "Outils de gestion",
        "Certification PMP/Scrum Master"
      ],
      price: "400 000 FCFA"
    },
    {
      slug: 'cloud-computing-aws-azure',
      title: "Cloud Computing (AWS/Azure)",
      duration: "3 mois",
      level: "Intermédiaire",
      certification: "Certifié",
      description: "Maîtrisez les plateformes cloud et l'architecture cloud native",
      modules: [
        "Fondamentaux du Cloud",
        "Services AWS/Azure",
        "Architecture cloud",
        "DevOps et CI/CD",
        "Sécurité cloud"
      ],
      price: "700 000 FCFA"
    }
  ];

  const advantages = [
    {
      icon: Award,
      title: "Certifications Reconnues",
      description: "Obtenez des certifications valorisées sur le marché du travail"
    },
    {
      icon: Users,
      title: "Formateurs Experts",
      description: "Apprenez avec des professionnels expérimentés et certifiés"
    },
    {
      icon: BookOpen,
      title: "Approche Pratique",
      description: "70% de pratique avec des projets réels et des cas d'usage concrets"
    },
    {
      icon: Clock,
      title: "Flexibilité",
      description: "Formations en présentiel, distanciel ou format hybride"
    }
  ];

  const faqs = [
    {
      question: "Comment s'inscrire à une formation ?",
      answer: "Cliquez sur le bouton \"S'inscrire\" de la formation souhaitée et remplissez le formulaire dédié. Vous recevrez une confirmation par email."
    },
    {
      question: "Peut-on financer sa formation ?",
      answer: "Oui, plusieurs solutions de financement sont possibles. Contactez-nous pour étudier votre situation et les options disponibles."
    },
    {
      question: "Les formations sont-elles certifiantes ?",
      answer: "Toutes nos formations délivrent une attestation ou un certificat reconnu dans le secteur IT."
    },
    {
      question: "Les formations sont-elles accessibles à distance ?",
      answer: "La plupart de nos programmes sont disponibles en présentiel, à distance ou en format hybride."
    },
    {
      question: "Quels sont les prérequis ?",
      answer: "Les prérequis varient selon la formation. Consultez la fiche détaillée de chaque programme pour plus d'informations."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <motion.section 
        className="py-20 relative overflow-hidden bg-gradient-to-br from-iai-blue to-iai-red text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        data-aos="fade-up"
      >
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
              Formations IT
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Développez vos compétences informatiques avec nos programmes de formation 
              certifiants dispensés par des experts du domaine
            </p>
          </div>
        </div>
      </motion.section>

      {/* Advantages */}
      <section className="py-20 bg-white" data-aos="fade-up" data-aos-delay="200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              Pourquoi Choisir Nos Formations ?
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche pédagogique innovante pour une montée en compétences efficace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
                whileHover={{ scale: 1.07, boxShadow: "0 8px 32px rgba(34,80,122,0.15)" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-aos="zoom-in-up"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-iai-blue to-iai-red rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <advantage.icon className="text-white" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{advantage.title}</h3>
                <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Programmes de Formation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez parmi notre catalogue de formations adaptées aux besoins du marché
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {program.certification}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">{program.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="mr-2 text-blue-600" size={16} />
                    Niveau: {program.level}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Modules inclus:</h4>
                  <ul className="space-y-2">
                    {program.modules.map((module, moduleIndex) => (
                      <li key={moduleIndex} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="mr-2 text-green-600 flex-shrink-0 mt-0.5" size={14} />
                        {module}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-col gap-2 items-center">
                  <Link
                    to={`/inscription-formation?formation=${encodeURIComponent(program.title)}`}
                    className="inline-block bg-gradient-to-r from-iai-blue to-iai-red text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    S'inscrire
                  </Link>
                  <Link
                    to={`/formation/${program.slug}`}
                    className="inline-block border border-iai-blue text-iai-blue px-6 py-3 rounded-full font-semibold hover:bg-iai-blue hover:text-white transition-all duration-300"
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-iai-blue to-iai-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à booster votre carrière ?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Rejoignez nos formations et développez les compétences les plus demandées 
            sur le marché du travail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-iai-blue px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Demander des informations
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-iai-blue transition-all duration-300"
            >
              Télécharger le catalogue
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section avec Accordion */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-3xl font-bold text-iai-blue mb-8 text-center">
            FAQ - Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="font-semibold text-lg text-iai-blue pr-4">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-iai-blue flex-shrink-0 transition-transform duration-300 ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 pt-0 text-gray-700 bg-gray-50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;