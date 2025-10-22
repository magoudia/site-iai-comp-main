import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Training from './pages/Training';
import Contact from './pages/Contact';
import InscriptionFormation from './pages/InscriptionFormation';
import FormationDetail from './pages/FormationDetail';
import ServiceDetail from './pages/ServiceDetail';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/formations" element={<Training />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/inscription-formation" element={<InscriptionFormation />} />
            <Route path="/formation/:slug" element={<FormationDetail />} />
            <Route path="/service/:serviceSlug" element={<ServiceDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;