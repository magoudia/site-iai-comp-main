import React from 'react';
import { Calendar, MapPin, Users, Target, Award, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const milestones = [
    {
      year: "2025",
      title: "Création d'IAI-COMPÉTENCES",
      description: "Fondation de la société par des experts formés à l'Institut Africain d'Informatique"
    },
    {
      year: "2025",
      title: "Lancement des activités",
      description: "Début des prestations de conseil, formation et développement"
    }
  ];

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque projet et formation que nous proposons"
    },
    {
      icon: Users,
      title: "Expertise",
      description: "Notre équipe est composée d'experts certifiés et expérimentés"
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "Nous adoptons les dernières technologies et méthodologies"
    },
    {
      icon: Target,
      title: "Accompagnement",
      description: "Nous accompagnons nos clients dans leur transformation digitale"
    }
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
              À Propos d'IAI-COMPÉTENCES
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
              Une société innovante spécialisée dans l'ingénierie informatique, 
              le conseil en systèmes d'information et la formation professionnelle
            </p>
          </div>
        </div>
      </motion.section>

      {/* Company Info */}
      <section className="py-20 bg-white" data-aos="fade-up" data-aos-delay="200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                IAI-COMPÉTENCES est une SAS (Société à Actions Simplifiée) au capital de 
                dix-neuf millions cent trente mille FCFA, dont le siège est situé à Dakar, 
                au quartier Liberté 6 extension, Lot No16.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Créée en janvier 2025 par des informaticiens formés à l'Institut Africain 
                d'Informatique de Libreville, notre société tire son nom du radical "IAI" 
                qui reflète nos origines et notre excellence académique.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nous nous positionnons sur le marché sénégalais et sous-régional pour 
                proposer des services de formation, d'accompagnement et de développement 
                de solutions informatiques innovantes.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-iai-blue/10 p-6 rounded-2xl text-center">
                <Calendar className="mx-auto mb-4 text-iai-blue" size={40} />
                <div className="text-2xl font-bold text-gray-900">2025</div>
                <div className="text-gray-600">Année de création</div>
              </div>
              <div className="bg-iai-red/10 p-6 rounded-2xl text-center">
                <MapPin className="mx-auto mb-4 text-iai-red" size={40} />
                <div className="text-2xl font-bold text-gray-900">Dakar</div>
                <div className="text-gray-600">Siège social</div>
              </div>
              <div className="bg-green-50 p-6 rounded-2xl text-center">
                <Users className="mx-auto mb-4 text-green-600" size={40} />
                <div className="text-2xl font-bold text-gray-900">SAS</div>
                <div className="text-gray-600">Forme juridique</div>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl text-center">
                <Target className="mx-auto mb-4 text-orange-600" size={40} />
                <div className="text-2xl font-bold text-gray-900">19M</div>
                <div className="text-gray-600">Capital FCFA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50" data-aos="fade-up" data-aos-delay="400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Mission & Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Notre Mission</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Offrir à nos clients - individus, entreprises, gouvernements et organisations - 
                des services de conseil, d'études, de formation, d'audit, de coaching et de 
                développement de solutions informatiques de haute qualité.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-iai-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Accompagner la transformation digitale des entreprises
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-iai-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Former et certifier les professionnels IT
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-iai-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Développer des solutions innovantes et sur mesure
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Notre Vision</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Devenir le partenaire de référence en Afrique pour l'accompagnement 
                des organisations dans leur transformation digitale et le développement 
                des compétences IT.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-iai-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Leadership sur le marché sénégalais et sous-régional
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-iai-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Excellence reconnue dans nos domaines d'expertise
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-iai-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Impact positif sur le développement numérique africain
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white" data-aos="fade-up" data-aos-delay="600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              Nos Valeurs
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident notre action et définissent notre identité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
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
                  <value.icon className="text-white" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Parcours
            </h2>
            <p className="text-xl text-gray-600">
              Les étapes clés de notre développement
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-24 text-right mr-8">
                  <div className="text-2xl font-bold text-iai-blue">{milestone.year}</div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-iai-blue rounded-full mt-2 mr-8"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;