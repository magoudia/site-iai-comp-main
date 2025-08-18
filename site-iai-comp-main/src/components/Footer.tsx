import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {/* Effet d'éclat derrière le logo */}
                <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-iai-blue/30 to-iai-red/30 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-iai-blue/20 to-iai-red/20 rounded-full blur-lg"></div>
                {/* Logo avec ombre */}
                <img 
                  src={logo} 
                  alt="Logo IAI Compétences" 
                  className="relative w-16 h-16 object-contain drop-shadow-lg filter brightness-110" 
                />
              </div>
              <span className="text-xl font-bold">IAI-Compétences</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Société spécialisée en ingénierie informatique, conseil en systèmes d'information 
              et formation professionnelle au Sénégal et en Afrique.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/a-propos" className="text-gray-300 hover:text-white transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Nos Services
                </Link>
              </li>
              <li>
                <Link to="/formations" className="text-gray-300 hover:text-white transition-colors">
                  Formations
                </Link>
              </li>
              <li>
                <Link to="/equipe" className="text-gray-300 hover:text-white transition-colors">
                  Notre Équipe
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Conseil en SI</li>
              <li className="text-gray-300">Développement Logiciel</li>
              <li className="text-gray-300">Formation IT</li>
              <li className="text-gray-300">Intelligence Artificielle</li>
              <li className="text-gray-300">Big Data</li>
              <li className="text-gray-300">Audit & Coaching</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Liberté 6 extension<br />
                  Lot No16, Dakar<br />
                  Sénégal
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+221 77 639 58 10</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">iai-competences@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 IAI-COMPÉTENCES. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Mentions Légales
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de Confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;