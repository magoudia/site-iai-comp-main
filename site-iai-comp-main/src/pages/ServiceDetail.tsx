import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Star, Users, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import devImg from '../assets/dev.jpg';
import formationImg from '../assets/formation.jpg';
import conseilImg from '../assets/conseil.jpg';
import iaImg from '../assets/ia.jpg';

const ServiceDetail = () => {
  const { serviceSlug } = useParams();

  const servicesData = {
    'developpement-logiciel': {
      title: "Développement Logiciel",
      description: "Solutions sur mesure et applications innovantes",
      longDescription: "Nous développons des solutions logicielles personnalisées pour répondre aux besoins spécifiques de votre entreprise. Notre équipe d'experts utilise les technologies les plus récentes pour créer des applications performantes, sécurisées et évolutives.",
      image: devImg,
      features: [
        "Applications web modernes (React, Angular, Vue.js)",
        "Applications mobiles natives et hybrides",
        "Logiciels métier personnalisés",
        "Intégration de systèmes et API",
        "Maintenance et support technique",
        "Déploiement et DevOps"
      ],
      benefits: [
        "Solutions adaptées à vos besoins",
        "Technologies de pointe",
        "Performance et sécurité optimisées",
        "Support et maintenance continue",
        "Évolutivité garantie"
      ],
      technologies: ["React", "Node.js", "Python", "Java", "C#", "Docker", "AWS", "Azure"],
      process: [
        "Analyse des besoins",
        "Conception et architecture",
        "Développement itératif",
        "Tests et validation",
        "Déploiement et formation"
      ]
    },
    'formation-it': {
      title: "Formation IT",
      description: "Programmes de formation certifiants et coaching",
      longDescription: "Nos programmes de formation sont conçus pour développer les compétences techniques et pratiques nécessaires dans le domaine des technologies de l'information. Nous proposons des formations certifiantes reconnues par l'industrie.",
      image: formationImg,
      features: [
        "Formations certifiantes reconnues",
        "Programmes personnalisés",
        "Formateurs experts certifiés",
        "Support pédagogique complet",
        "Projets pratiques",
        "Suivi post-formation"
      ],
      benefits: [
        "Certifications reconnues",
        "Compétences immédiatement applicables",
        "Formateurs expérimentés",
        "Support continu",
        "Réseau professionnel"
      ],
      technologies: ["Java", "Python", "React", "DevOps", "Cybersécurité", "Cloud Computing"],
      process: [
        "Évaluation des besoins",
        "Programme personnalisé",
        "Formation interactive",
        "Projets pratiques",
        "Certification et suivi"
      ]
    },
    'conseil-si': {
      title: "Conseil en SI",
      description: "Expertise en systèmes d'information et transformation digitale",
      longDescription: "Notre expertise en conseil vous accompagne dans votre transformation digitale. Nous analysons vos systèmes existants et vous proposons des solutions stratégiques pour optimiser vos processus et améliorer votre performance.",
      image: conseilImg,
      features: [
        "Audit de systèmes d'information",
        "Stratégie de transformation digitale",
        "Architecture SI",
        "Gestion de projet IT",
        "Accompagnement au changement",
        "Optimisation des processus"
      ],
      benefits: [
        "Vision stratégique claire",
        "Optimisation des coûts",
        "Amélioration de la performance",
        "Réduction des risques",
        "Accompagnement personnalisé"
      ],
      technologies: ["Architecture SI", "Gestion de projet", "Processus métier", "Sécurité", "Cloud"],
      process: [
        "Diagnostic initial",
        "Analyse stratégique",
        "Recommandations",
        "Plan d'action",
        "Accompagnement"
      ]
    },
    'intelligence-artificielle': {
      title: "Intelligence Artificielle",
      description: "Solutions IA et Big Data pour votre entreprise",
      longDescription: "Leverez le potentiel de l'Intelligence Artificielle pour automatiser vos processus, analyser vos données et créer de nouveaux services. Nos solutions IA sont conçues pour générer une valeur immédiate pour votre entreprise.",
      image: iaImg,
      features: [
        "Machine Learning et Deep Learning",
        "Analyse prédictive",
        "Traitement du langage naturel",
        "Vision par ordinateur",
        "Chatbots et assistants virtuels",
        "Tableaux de bord analytiques"
      ],
      benefits: [
        "Automatisation intelligente",
        "Décisions basées sur les données",
        "Nouveaux services innovants",
        "Optimisation des processus",
        "Avantage concurrentiel"
      ],
      technologies: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenAI", "AWS AI"],
      process: [
        "Analyse des données",
        "Conception du modèle",
        "Développement et entraînement",
        "Tests et validation",
        "Déploiement et monitoring"
      ]
    }
  };

  const service = servicesData[serviceSlug as keyof typeof servicesData];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service non trouvé</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-iai-blue to-iai-red text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Retour à l'accueil
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
              <p className="text-xl text-blue-100 mb-8">{service.longDescription}</p>
              <Link
                to="/contact"
                className="bg-white text-iai-blue px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center"
              >
                Demander un devis
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-80 h-80 bg-white rounded-3xl p-8 shadow-2xl">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Features */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Nos Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Benefits */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Avantages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Star className="text-yellow-500 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Process */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Notre Processus</h2>
              <div className="space-y-4">
                {service.process.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-iai-blue to-iai-red rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-iai-blue to-iai-red p-6 rounded-2xl text-white text-center"
            >
              <h3 className="text-xl font-bold mb-4">Prêt à commencer ?</h3>
              <p className="mb-6 text-blue-100">
                Contactez-nous pour discuter de votre projet
              </p>
              <Link
                to="/contact"
                className="bg-white text-iai-blue px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 inline-block"
              >
                Demander un devis
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail; 