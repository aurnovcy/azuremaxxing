import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Deadlines } from './pages/Deadlines';
import { PlaybookDetail } from './pages/PlaybookDetail';
import { TipsLibrary } from './pages/TipsLibrary';
import { TipDetail } from './pages/TipDetail';
import { DomainLanding } from './pages/DomainLanding';
import { ServiceLanding } from './pages/ServiceLanding';
import { AudienceLanding } from './pages/AudienceLanding';
import { ResourceGraphQueries } from './pages/ResourceGraphQueries';
import { DashboardsGallery } from './pages/DashboardsGallery';
import { DashboardDetail } from './pages/DashboardDetail';
import { CalculatorsIndex } from './pages/CalculatorsIndex';
import { CalculatorDetail } from './pages/CalculatorDetail';
import { KpisGlossary } from './pages/KpisGlossary';
import { WhatsNew } from './pages/WhatsNew';
import { MaturityModel } from './pages/MaturityModel';
import { AzureExplained } from './pages/AzureExplained';
import { AskAI } from './pages/AskAI';
import { Sources } from './pages/Sources';
import { About } from './pages/About';
import { Disclaimer } from './pages/Disclaimer';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-[#ededed] flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deadlines" element={<Deadlines />} />
            
            {/* Playbooks */}
            <Route path="/playbooks/:slug" element={<PlaybookDetail />} />
            <Route path="/playbooks" element={<PlaybookDetail />} />
            
            {/* Tips Library & Details */}
            <Route path="/tips" element={<TipsLibrary />} />
            <Route path="/tips/:id" element={<TipDetail />} />
            <Route path="/tips/domain/:domain" element={<DomainLanding />} />
            <Route path="/tips/service/:service" element={<ServiceLanding />} />
            
            {/* Audience Landing Pages */}
            <Route path="/for/:audience" element={<AudienceLanding />} />
            
            {/* Queries & Dashboards */}
            <Route path="/resource-graph-queries" element={<ResourceGraphQueries />} />
            <Route path="/dashboards" element={<DashboardsGallery />} />
            <Route path="/dashboards/:id" element={<DashboardDetail />} />
            
            {/* Calculators */}
            <Route path="/calculators" element={<CalculatorsIndex />} />
            <Route path="/calculators/:slug" element={<CalculatorDetail />} />
            
            {/* Reference & Governance */}
            <Route path="/kpis" element={<KpisGlossary />} />
            <Route path="/whats-new" element={<WhatsNew />} />
            <Route path="/maturity-model" element={<MaturityModel />} />
            <Route path="/azure-explained" element={<AzureExplained />} />
            
            {/* AI Assistant */}
            <Route path="/ask" element={<AskAI />} />
            
            {/* Meta & Legal */}
            <Route path="/sources" element={<Sources />} />
            <Route path="/about" element={<About />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            
            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
