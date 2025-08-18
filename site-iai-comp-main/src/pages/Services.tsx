import React from 'react';
import { Code, Users, Brain, Shield, Database, Smartphone, Cloud, Settings } from 'lucide-react';
import devImg from '../assets/dev.jpg';
import iaImg from '../assets/ia.jpg';
import conseilImg from '../assets/conseil.jpg';
import securiteImg from '../assets/securite.jpeg';
import dataImg from '../assets/data.jpeg';
import cloudImg from '../assets/cloud.jpeg';
import digitalImg from '../assets/digital.jpeg';
import supportImg from '../assets/support.jpeg';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      image: devImg,
      title: "Développement de Solutions Informatiques",
      description: "Conception et développement d'applications web, mobiles et logicielles sur mesure",
      features: [
        "Applications web modernes",
        "Applications mobiles natives et hybrides",
        "Logiciels métier personnalisés",
        "Intégration de systèmes",
        "API et services web"
      ]
    },
    {
      image: iaImg,
      title: "Intelligence Artificielle & Big Data",
      description: "Solutions IA avancées et analyse de données pour optimiser vos processus",
      features: [
        "Machine Learning et Deep Learning",
        "Analyse prédictive",
        "Traitement du langage naturel",
        "Vision par ordinateur",
        "Tableaux de bord analytiques"
      ]
    },
    {
      image: conseilImg,
      title: "Conseil en Systèmes d'Information",
      description: "Expertise et accompagnement pour votre transformation digitale",
      features: [
        "Audit de systèmes existants",
        "Architecture SI",
        "Stratégie digitale",
        "Gestion de projet IT",
        "Accompagnement au changement"
      ]
    },
    {
      image: securiteImg,
      title: "Audit & Sécurité",
      description: "Évaluation et sécurisation de vos infrastructures informatiques",
      features: [
        "Audit de sécurité",
        "Tests de pénétration",
        "Mise en conformité RGPD",
        "Plan de reprise d'activité",
        "Formation sécurité"
      ]
    },
    {
      image: dataImg,
      title: "Gestion de Données",
      description: "Optimisation et gestion de vos bases de données et entrepôts de données",
      features: [
        "Conception de bases de données",
        "Data Warehouse",
        "Migration de données",
        "Optimisation des performances",
        "Sauvegarde et archivage"
      ]
    },
    {
      image: cloudImg,
      title: "Solutions Cloud",
      description: "Migration et optimisation de vos infrastructures vers le cloud",
      features: [
        "Migration vers le cloud",
        "Architecture cloud native",
        "DevOps et CI/CD",
        "Monitoring et supervision",
        "Optimisation des coûts"
      ]
    },
    {
      image: digitalImg,
      title: "Transformation Digitale",
      description: "Accompagnement complet dans votre transition numérique",
      features: [
        "Digitalisation des processus",
        "Automatisation",
        "Outils collaboratifs",
        "Formation utilisateurs",
        "Conduite du changement"
      ]
    },
    {
      image: supportImg,
      title: "Maintenance & Support",
      description: "Support technique et maintenance de vos systèmes informatiques",
      features: [
        "Maintenance préventive",
        "Support technique 24/7",
        "Mise à jour et évolutions",
        "Monitoring proactif",
        "Assistance utilisateurs"
      ]
    }
  ];

  const sectors = [
    "Secteur Public",
    "Banques & Finance",
    "Télécommunications",
    "Éducation",
    "Santé",
    "Commerce & Distribution",
    "Industrie",
    "ONG & Organisations Internationales"
  ];

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
              Nos Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Des solutions complètes et innovantes pour accompagner votre transformation digitale 
              et développer vos compétences informatiques
            </p>
          </div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50" data-aos="fade-up" data-aos-delay="200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              Notre Expertise
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre gamme complète de services informatiques adaptés à vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                whileHover={{ scale: 1.07, boxShadow: "0 8px 32px rgba(34,80,122,0.15)" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-aos="zoom-in-up"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-iai-blue to-iai-red rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden hover:zoom-effect animate-fade-in-up">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                      <div className="w-2 h-2 bg-iai-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 bg-white" data-aos="fade-up" data-aos-delay="400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Secteurs d'Intervention
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous intervenons dans de nombreux secteurs d'activité au Sénégal et en Afrique
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sectors.map((sector, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-lg font-semibold text-gray-900">{sector}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Approche
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une méthodologie éprouvée pour garantir le succès de vos projets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Analyse",
                description: "Étude approfondie de vos besoins et contraintes"
              },
              {
                step: "02",
                title: "Conception",
                description: "Élaboration de solutions adaptées et innovantes"
              },
              {
                step: "03",
                title: "Développement",
                description: "Réalisation avec les meilleures pratiques"
              },
              {
                step: "04",
                title: "Accompagnement",
                description: "Formation et support pour une adoption réussie"
              }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-iai-blue to-iai-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-lg">{phase.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{phase.title}</h3>
                <p className="text-gray-600 leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-iai-blue to-iai-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Discutons de votre projet
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour une consultation gratuite et découvrez comment nous pouvons 
            vous accompagner dans votre transformation digitale.
          </p>
          <a
            href="/contact"
            className="bg-white text-iai-blue px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-block"
          >
            Demander un devis
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;