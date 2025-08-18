import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import logo from '../assets/niaxtu-logo-black.png';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const heroBg = "relative min-h-[400px] md:min-h-[600px] flex items-center justify-center animate-fade-in-up bg-gradient-to-br from-iai-blue/90 to-iai-red/80";
const heroOverlayEntreprise = [
  <svg key="svg" className="absolute bottom-0 left-0 w-full h-32 z-0" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path fill="#fff" fillOpacity="0.8" d="M0,224L60,202.7C120,181,240,139,360,144C480,149,600,203,720,197.3C840,192,960,128,1080,117.3C1200,107,1320,149,1380,170.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
  </svg>,
  <div key="bg" className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg')] bg-cover bg-center"></div>,
  <div key="overlay" className="absolute inset-0 bg-gray-400/80"></div>,
  <div key="float1" className="absolute top-20 left-10 w-20 h-20 bg-iai-blue/20 rounded-full animate-float"></div>,
  <div key="float2" className="absolute bottom-20 right-10 w-16 h-16 bg-iai-red/20 rounded-full animate-float-delayed"></div>,
  <div key="float3" className="absolute top-1/2 right-20 w-12 h-12 bg-iai-blue/20 rounded-full animate-float"></div>
];

const heroOverlayNiaxtu = [
  <div key="overlay" className="absolute inset-0 bg-gray-900/10"></div>,
  <div key="float1" className="absolute top-20 left-10 w-20 h-20 bg-iai-blue/20 rounded-full animate-float"></div>,
  <div key="float2" className="absolute bottom-20 right-10 w-16 h-16 bg-iai-red/20 rounded-full animate-float-delayed"></div>,
  <div key="float3" className="absolute top-1/2 right-20 w-12 h-12 bg-iai-blue/20 rounded-full animate-float"></div>
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="w-full h-[400px] md:h-[600px] relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-full"
        onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
      >
        {/* Slide 1: Hero Entreprise */}
        <SwiperSlide>
          <section className={heroBg + ' ' + (activeIndex === 0 ? 'animate-fade-in' : '')}>
            {heroOverlayEntreprise}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-iai-blue to-iai-red bg-clip-text text-transparent">
                  IAI Compétences
                </span>
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl">
                  Votre Partenaire Digital
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                Expertise en ingénierie informatique, conseil en systèmes d'information 
                et formation professionnelle au Sénégal et en Afrique
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/services"
                  className="bg-gradient-to-r from-iai-blue to-iai-red text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                >
                  Découvrir nos services
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-iai-blue hover:text-white hover:shadow-xl hover:scale-110 transition-all duration-300"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </section>
        </SwiperSlide>
        {/* Slide 2: Niaxtu Web */}
        <SwiperSlide>
          <section className={heroBg + ' ' + (activeIndex === 1 ? 'animate-slide-in-right' : '')}>
            <video
              className="absolute inset-0 w-full h-full object-cover z-0"
              src="/niaxtu-bg.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            {heroOverlayNiaxtu}
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-black text-center">
              <img src={logo} alt="Niaxtu Logo" className="w-80 h-64 mb-6 mx-auto object-contain" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Niaxtu Web</h2>
              <p className="text-lg md:text-2xl max-w-2xl mx-auto">
                Sur la version web, explorez les plaintes marquantes, suivez leur résolution, consultez les statistiques et partagez les histoires qui font bouger les choses. Niaxtu Web, c'est la transparence et l'impact à portée de clic.
              </p>
            </div>
          </section>
        </SwiperSlide>
        {/* Slide 3: Niaxtu Mobile */}
        <SwiperSlide>
          <section className={heroBg + ' ' + (activeIndex === 2 ? 'animate-slide-in-top' : '')}>
            <video
              className="absolute inset-0 w-full h-full object-cover z-0"
              src="/niaxtu-bg.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            {heroOverlayNiaxtu}
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-black text-center">
              <img src={logo} alt="Niaxtu Logo" className="w-80 h-64 mb-6 mx-auto object-contain" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Niaxtu Mobile</h2>
              <p className="text-lg md:text-2xl max-w-2xl mx-auto">
                Avec Niaxtu Mobile, déposez instantanément vos plaintes, suivez leur évolution et recevez des notifications en temps réel. C'est l'espace dédié pour faire entendre votre voix, partout et à tout moment.
              </p>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </div>
  );
} 