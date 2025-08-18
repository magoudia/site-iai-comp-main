import React from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const News = () => {
  const articles = [
    {
      id: 1,
      title: "L'Intelligence Artificielle au service des entreprises sénégalaises",
      excerpt: "Découvrez comment l'IA transforme le paysage économique du Sénégal et les opportunités qu'elle offre aux entreprises locales.",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
      date: "15 Janvier 2025",
      author: "Adama Aly DIAO",
      category: "Intelligence Artificielle",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Cybersécurité : Les enjeux pour les PME africaines",
      excerpt: "Les cybermenaces évoluent rapidement. Comment les PME africaines peuvent-elles se protéger efficacement ?",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
      date: "12 Janvier 2025",
      author: "Fatou NDIAYE",
      category: "Cybersécurité",
      readTime: "7 min"
    },
    {
      id: 3,
      title: "Formation IT : Les compétences les plus demandées en 2025",
      excerpt: "Analyse des tendances du marché de l'emploi IT et des compétences à développer pour rester compétitif.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      date: "10 Janvier 2025",
      author: "Ibrahima Kane GUISSE",
      category: "Formation",
      readTime: "6 min"
    },
    {
      id: 4,
      title: "Cloud Computing : Accélérer la transformation digitale en Afrique",
      excerpt: "Comment le cloud computing révolutionne les infrastructures IT africaines et démocratise l'accès aux technologies avancées.",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      date: "8 Janvier 2025",
      author: "Addou DIAW",
      category: "Cloud Computing",
      readTime: "8 min"
    },
    {
      id: 5,
      title: "Développement durable et numérique : L'engagement d'IAI-COMPÉTENCES",
      excerpt: "Notre vision pour un développement numérique responsable et durable en Afrique.",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
      date: "5 Janvier 2025",
      author: "Alphonse Diombo THIAKANE",
      category: "Développement Durable",
      readTime: "4 min"
    },
    {
      id: 6,
      title: "Big Data : Exploiter la donnée pour créer de la valeur",
      excerpt: "Les stratégies pour transformer vos données en avantage concurrentiel grâce aux technologies Big Data.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      date: "3 Janvier 2025",
      author: "Aïssatou BA",
      category: "Big Data",
      readTime: "9 min"
    }
  ];

  const categories = [
    "Tous",
    "Intelligence Artificielle",
    "Cybersécurité",
    "Formation",
    "Cloud Computing",
    "Big Data",
    "Développement Durable"
  ];

  const [selectedCategory, setSelectedCategory] = React.useState("Tous");

  const filteredArticles = selectedCategory === "Tous" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

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
              Actualités & Insights
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
              Restez informé des dernières tendances technologiques et découvrez 
              nos analyses sur l'évolution du secteur IT en Afrique
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-iai-blue to-iai-red text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {filteredArticles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={filteredArticles[0].image}
                    alt={filteredArticles[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-iai-blue to-iai-red text-white px-3 py-1 rounded-full text-sm font-medium">
                      Article vedette
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <Calendar className="mr-1" size={16} />
                      {filteredArticles[0].date}
                    </span>
                    <span className="flex items-center">
                      <User className="mr-1" size={16} />
                      {filteredArticles[0].author}
                    </span>
                    <span className="bg-iai-blue/10 text-iai-blue px-2 py-1 rounded-full text-xs">
                      {filteredArticles[0].readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {filteredArticles[0].title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {filteredArticles[0].excerpt}
                  </p>
                  <button className="inline-flex items-center text-iai-blue font-semibold hover:text-iai-red transition-colors group">
                    Lire l'article
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.slice(1).map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center">
                      <Calendar className="mr-1" size={14} />
                      {article.date}
                    </span>
                    <span className="bg-iai-blue/10 text-iai-blue px-2 py-1 rounded-full text-xs">
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center">
                      <User className="mr-1" size={14} />
                      {article.author}
                    </span>
                    <button className="text-iai-blue font-semibold text-sm hover:text-iai-red transition-colors flex items-center group">
                      Lire plus
                      <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-gradient-to-r from-iai-blue to-iai-red">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Restez informé
          </h2>
          <p className="text-xl text-iai-blue mb-8">
            Abonnez-vous à notre newsletter pour recevoir nos derniers articles 
            et analyses directement dans votre boîte mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-6 py-3 rounded-full border-0 focus:ring-2 focus:ring-white/50 focus:outline-none"
            />
            <button className="bg-white text-iai-blue px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
              S'abonner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;