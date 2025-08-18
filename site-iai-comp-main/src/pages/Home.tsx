import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Users, Award, Globe, ChevronRight, Star } from 'lucide-react';
import devImg from '../assets/dev.jpg';
import formationImg from '../assets/formation.jpg';
import conseilImg from '../assets/conseil.jpg';
import iaImg from '../assets/ia.jpg';
import { motion } from 'framer-motion';
import HeroSlider from '../components/HeroSlider';

const Home = () => {
  const services = [
    {
      image: devImg,
      title: "Développement Logiciel",
      description: "Solutions sur mesure et applications innovantes",
      slug: "developpement-logiciel"
    },
    {
      image: formationImg,
      title: "Formation IT",
      description: "Programmes de formation certifiants et coaching",
      slug: "formation-it"
    },
    {
      image: conseilImg,
      title: "Conseil en SI",
      description: "Expertise en systèmes d'information et transformation digitale",
      slug: "conseil-si"
    },
    {
      image: iaImg,
      title: "Intelligence Artificielle",
      description: "Solutions IA et Big Data pour votre entreprise",
      slug: "intelligence-artificielle"
    }
  ];

  const stats = [
    { number: "2025", label: "Année de création" },
    { number: "19M", label: "Capital FCFA" },
    { number: "100%", label: "Experts certifiés" },
    { number: "15+", label: "Pays d'intervention" }
  ];

  return (
    <div className="overflow-hidden">
      <HeroSlider />
      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-white via-blue-50 to-white animate-fade-in-up" data-aos="fade-up" data-aos-delay="200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative bg-gradient-to-br from-blue-50 via-white to-red-50 animate-fade-in-up" data-aos="fade-up" data-aos-delay="400">
        {/* SVG vague décorative en haut */}
        <svg className="absolute -top-16 left-0 w-full h-24 z-0" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="#22507A" fillOpacity="0.08" d="M0,64L60,101.3C120,139,240,213,360,229.3C480,245,600,203,720,170.7C840,139,960,117,1080,133.3C1200,149,1320,203,1380,229.3L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        </svg>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Domaines d'Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions innovantes et sur mesure pour accompagner votre transformation digitale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {services.map((service, index) => (
              <Link
                key={index}
                to={`/service/${service.slug}`}
                className="block"
              >
                <motion.div
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer h-full flex flex-col"
                  whileHover={{ scale: 1.07, boxShadow: "0 8px 32px rgba(34,80,122,0.15)" }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  data-aos="zoom-in-up"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-iai-blue to-iai-red rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden hover:zoom-effect animate-fade-in-up flex-shrink-0">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors flex-grow">{service.description}</p>
                  <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <span className="text-sm font-semibold">En savoir plus</span>
                    <ChevronRight className="ml-1" size={16} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-gradient-to-b from-white via-red-50 to-white animate-fade-in-up" data-aos="fade-up" data-aos-delay="600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Qui sommes-nous ?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                IAI-COMPÉTENCES est une SAS créée en janvier 2025 par des informaticiens 
                formés à l'Institut Africain d'Informatique de Libreville. Nous nous 
                positionnons sur le marché sénégalais et sous-régional pour proposer 
                des services de formation, d'accompagnement et de développement de solutions informatiques.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Notre particularité réside dans l'expérience et la compétence de nos 
                actionnaires et intervenants, tous certifiés dans les domaines techniques 
                les plus importants.
              </p>
              <Link
                to="/a-propos"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
              >
                En savoir plus
                <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-iai-blue to-iai-red rounded-3xl p-8 text-white">
                <div className="h-full flex flex-col justify-center">
                  <div className="text-4xl font-bold mb-4">19M FCFA</div>
                  <div className="text-xl mb-6">Capital social</div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Star className="mr-2" size={20} />
                      <span>Experts certifiés</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="mr-2" size={20} />
                      <span>Solutions innovantes</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="mr-2" size={20} />
                      <span>Accompagnement personnalisé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-iai-blue to-iai-red animate-fade-in-up" data-aos="fade-up" data-aos-delay="800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de vos projets et découvrir 
            comment nous pouvons vous accompagner dans votre transformation digitale.
          </p>
          <Link
            to="/contact"
            className="bg-white text-iai-blue px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center group"
          >
            Démarrer un projet
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;