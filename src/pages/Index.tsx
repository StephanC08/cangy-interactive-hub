
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Appointment from '@/components/Appointment';
import Testimonials from '@/components/Testimonials';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    document.title = 'Stephan CANGY | Entrepreneur & Infopreneur';
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-noir text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Appointment />
        <Testimonials />
        <ChatBot />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
