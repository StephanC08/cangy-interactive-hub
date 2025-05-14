
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Appointment from '@/components/Appointment';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import IntroAnimation from '@/components/IntroAnimation';
import { ensureMobileViewport } from '@/lib/utils';

const Index = () => {
  useEffect(() => {
    document.title = 'Stephan CANGY | Entrepreneur & Infopreneur';
    
    // Clear any stored intro animation state to ensure it shows every time
    sessionStorage.removeItem('hasSeenIntro');
    
    // Ensure proper mobile viewport settings
    ensureMobileViewport();

    // Force update the viewport meta tag for mobile devices
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-noir text-white overflow-x-hidden">
      <IntroAnimation />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Appointment />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
