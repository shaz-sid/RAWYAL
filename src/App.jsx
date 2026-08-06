import { useState, lazy, Suspense } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import AboutStory from './components/AboutStory.jsx';
import Services from './components/Services.jsx';
import FAQ from './components/FAQ.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Antigravity from './components/Antigravity.jsx';
import StarfieldBackground from './components/StarfieldBackground.jsx';

// ── Lazy-loaded below-the-fold / heavy sections (PERF-01) ──
const WhatWeDo = lazy(() => import('./components/WhatWeDo.jsx'));
const Infrastructure = lazy(() => import('./components/Infrastructure.jsx'));
const Aurora = lazy(() => import('./components/Aurora.jsx'));
const PoliciesView = lazy(() => import('./components/PoliciesView.jsx'));

/** Minimal loading placeholder matching site palette */
const SectionFallback = () => (
  <div className="flex items-center justify-center py-32">
    <div className="w-8 h-8 border-2 border-champagne-gold/30 border-t-champagne-gold rounded-full animate-spin" />
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <>
      {/* Global Ambient Background & Starfield */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 bg-deep-navy" />
        <StarfieldBackground className="absolute inset-0 w-full h-full opacity-80" />
        <div
          className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(216,185,121,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(20,40,85,0.25) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Sparkly interactive Antigravity cursor stars */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <Antigravity
          count={200}
          magnetRadius={8}
          ringRadius={4.5}
          waveSpeed={0.5}
          waveAmplitude={0.8}
          particleSize={0.35}
          lerpSpeed={0.04}
          color="#d4b87a"
          autoAnimate={true}
          particleVariance={0.9}
          particleShape="sphere"
        />
      </div>

      <ScrollProgress />
      <Header onViewChange={setCurrentView} />
      <main className="relative" style={{ zIndex: 2 }}>
        <Suspense fallback={<SectionFallback />}>
          {currentView === 'home' ? (
            <>
              <Hero />
              <AboutStory />
              <Services />
              <WhatWeDo />
              <Infrastructure />
              <Aurora />
              <FAQ />
              <Contact />
            </>
          ) : (
            <PoliciesView onViewChange={setCurrentView} />
          )}
        </Suspense>
      </main>
      <Footer onViewChange={setCurrentView} />
    </>
  );
}
