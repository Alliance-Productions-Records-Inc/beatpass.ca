import React from 'react';
import Hero from './Hero';
import ChooseYourPath from './ChooseYourPath';
import WhatYouGet from './WhatYouGet';
import PlatformHighlights from './PlatformHighlights';
import RecentVideos from './RecentVideos';
import PrimaryFeatures from './PrimaryFeatures';
import Discord from './Discord';
import Pricing from './Pricing';
import FromTheBlog from './FromTheBlog';
import FAQ from './FAQ';
import FooterCTA from './FooterCTA';
import Footer from './Footer';
import BackToTop from './BackToTop';

const LandingPage: React.FC = () => (
  <div className="bg-background text-main antialiased overflow-x-hidden">
    <Hero />
    <ChooseYourPath />
    <WhatYouGet />
    <PlatformHighlights />
    <RecentVideos />
    <PrimaryFeatures />
    <Discord />
    <Pricing />
    <FromTheBlog />
    <FAQ />
    <FooterCTA />
    <Footer />
    <BackToTop />
  </div>
);

export default LandingPage;
