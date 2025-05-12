
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutMission from '@/components/about/AboutMission';
import AboutApproach from '@/components/about/AboutApproach';
import AboutServices from '@/components/about/AboutServices';
import AboutFuture from '@/components/about/AboutFuture';
import SignatureFooter from '@/components/about/SignatureFooter';

const About = () => {
  useEffect(() => {
    document.title = 'À propos | Stephan CANGY';
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-noir text-white">
      <Navbar />
      <main className="flex-grow">
        <AboutHero />
        <AboutStory />
        <AboutMission />
        <AboutApproach />
        <AboutServices />
        <AboutFuture />
        <SignatureFooter />
      </main>
      <Footer />
    </div>
  );
};

export default About;
