import React from 'react';
import Header from './Header';
import Hero from './Hero';
import CinematicBackground from './CinematicBackground';
import AudiencePaths from './AudiencePaths';
import Journal from './Journal';
import Community from './Community';
import FAQ from './FAQ';
import Footer from './Footer';

export default function LandingPage() {
  return <div id="top" className="landing-page">
    <a className="landing-skip-link" href="#main-content">Skip to content</a>
    <CinematicBackground />
    <Header />
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <AudiencePaths />
      <div className="landing-content"><Journal /><Community /><FAQ /></div>
    </main>
    <Footer />
  </div>;
}
