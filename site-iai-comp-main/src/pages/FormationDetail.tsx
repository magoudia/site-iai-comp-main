import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Exemple de données détaillées (à remplacer par des données réelles ou une source externe)
const FORMATIONS = [
  {
    slug: 'developpement-web-full-stack',
    title: 'Développement Web Full-Stack',
    description: 'Formation complète en développement web moderne avec React, Node.js et bases de données',
    programme: [
      'HTML5, CSS3, JavaScript ES6+',
      'React.js et écosystème',
      'Node.js et Express',
      'Bases de données (SQL/NoSQL)',
      'Déploiement et DevOps'
    ],
    debouches: [
      'Développeur web',
      'Intégrateur',
      'Consultant IT',
      'Chef de projet technique'
    ],
    prerequis: 'Aucun prérequis technique, motivation et curiosité recommandées.',
    duree: '6 mois',
    niveau: 'Débutant à Avancé',
    certification: 'Certifié',
    brochure: '/brochures/dev-web.pdf'
  },
  {
    slug: 'intelligence-artificielle-machine-learning',
    title: 'Intelligence Artificielle & Machine Learning',
    description: "Maîtrisez les concepts et outils de l'IA pour créer des solutions intelligentes",
    programme: [
      'Fondamentaux de l\'IA',
      'Python pour l\'IA',
      'Machine Learning avec Scikit-learn',
      'Deep Learning avec TensorFlow',
      'Projets pratiques'
    ],
    debouches: [
      'Data Scientist',
      'Ingénieur IA',
      'Consultant Big Data',
      'Développeur IA'
    ],
    prerequis: 'Bases en programmation recommandées.',
    duree: '4 mois',
    niveau: 'Intermédiaire',
    certification: 'Certifié',
    brochure: '/brochures/ia.pdf'
  },
  {
    slug: 'cybersecurite-audit',
    title: 'Cybersécurité et Audit',
    description: 'Formation spécialisée en sécurité informatique et audit de systèmes',
    programme: [
      'Fondamentaux de la sécurité',
      'Tests de pénétration',
      'Audit de sécurité',
      'Gestion des incidents',
      'Conformité et réglementation'
    ],
    debouches: [
      'Consultant cybersécurité',
      'Auditeur IT',
      'Responsable sécurité',
      'Pentester'
    ],
    prerequis: 'Connaissances de base en informatique.',
    duree: '3 mois',
    niveau: 'Intermédiaire à Avancé',
    certification: 'Certifié',
    brochure: '/brochures/cybersecurite.pdf'
  },
  {
    slug: 'administration-systemes-reseaux',
    title: 'Administration Systèmes et Réseaux',
    description: 'Devenez expert en administration de systèmes Linux/Windows et réseaux',
    programme: [
      'Administration Linux/Windows',
      'Configuration réseau',
      'Virtualisation',
      'Monitoring et supervision',
      'Sécurité des infrastructures'
    ],
    debouches: [
      'Administrateur systèmes',
      'Administrateur réseaux',
      'Ingénieur infrastructure',
      'Support IT'
    ],
    prerequis: 'Aisance avec l\'outil informatique.',
    duree: '4 mois',
    niveau: 'Débutant à Intermédiaire',
    certification: 'Certifié',
    brochure: '/brochures/sys-reseaux.pdf'
  },
  {
    slug: 'gestion-projet-it',
    title: 'Gestion de Projet IT',
    description: 'Méthodologies agiles et gestion de projets informatiques',
    programme: [
      'Méthodologies Agile/Scrum',
      'Planification de projet',
      'Gestion d\'équipe',
      'Outils de gestion',
      'Certification PMP/Scrum Master'
    ],
    debouches: [
      'Chef de projet IT',
      'Scrum Master',
      'Product Owner',
      'Consultant gestion de projet'
    ],
    prerequis: 'Aucun prérequis, accessible à tous.',
    duree: '2 mois',
    niveau: 'Tous niveaux',
    certification: 'Certifié',
    brochure: '/brochures/projet-it.pdf'
  },
  {
    slug: 'cloud-computing-aws-azure',
    title: 'Cloud Computing (AWS/Azure)',
    description: 'Maîtrisez les plateformes cloud et l\'architecture cloud native',
    programme: [
      'Fondamentaux du Cloud',
      'Services AWS/Azure',
      'Architecture cloud',
      'DevOps et CI/CD',
      'Sécurité cloud'
    ],
    debouches: [
      'Architecte cloud',
      'DevOps',
      'Consultant cloud',
      'Ingénieur cloud'
    ],
    prerequis: 'Bases en administration systèmes ou développement.',
    duree: '3 mois',
    niveau: 'Intermédiaire',
    certification: 'Certifié',
    brochure: '/brochures/cloud.pdf'
  }
];

const FormationDetail = () => {
  const { slug } = useParams();
  const formation = FORMATIONS.find(f => f.slug === slug);

  if (!formation) {
    return <div className="pt-32 text-center text-red-600 font-bold">Formation introuvable.</div>;
  }

  return (
    <div className="pt-24 max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-iai-blue mb-4">{formation.title}</h1>
      <p className="text-lg text-gray-700 mb-6">{formation.description}</p>
      <div className="mb-6">
        <span className="inline-block bg-iai-blue/10 text-iai-blue px-3 py-1 rounded-full mr-2">{formation.niveau}</span>
        <span className="inline-block bg-iai-red/10 text-iai-red px-3 py-1 rounded-full mr-2">{formation.certification}</span>
        <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full">Durée : {formation.duree}</span>
      </div>
      <h2 className="text-xl font-semibold text-iai-blue mb-2">Programme</h2>
      <ul className="list-disc pl-6 mb-4">
        {formation.programme.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <h2 className="text-xl font-semibold text-iai-blue mb-2">Débouchés</h2>
      <ul className="list-disc pl-6 mb-4">
        {formation.debouches.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <h2 className="text-xl font-semibold text-iai-blue mb-2">Pré-requis</h2>
      <p className="mb-6">{formation.prerequis}</p>
      <div className="flex gap-4 mb-8">
        <a href={formation.brochure} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-iai-blue to-iai-red text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">Télécharger la brochure</a>
        <Link to={`/inscription-formation?formation=${encodeURIComponent(formation.title)}`} className="bg-white border border-iai-blue text-iai-blue px-6 py-3 rounded-full font-semibold hover:bg-iai-blue hover:text-white transition-all duration-300">S'inscrire</Link>
      </div>
      <Link to="/formations" className="text-iai-blue underline">&larr; Retour aux formations</Link>
    </div>
  );
};

export default FormationDetail; 