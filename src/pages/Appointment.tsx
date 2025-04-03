
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentBooking from '@/components/AppointmentBooking';
import ChatBot from '@/components/ChatBot';
import { Calendar, Users, Monitor, Home } from "lucide-react";

const AppointmentPage = () => {
  useEffect(() => {
    document.title = 'Prise de rendez-vous | Stephan CANGY';
  }, []);

  // Fonction appelée après la prise de RDV réussie
  const handleAppointmentSuccess = () => {
    // Scroll jusqu'en haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-noir text-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-noir-dark py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                  Planifiez une <span className="mauve-gradient-text">rencontre</span>
                </h1>
                <p className="text-gray-300 text-lg mb-8">
                  Choisissez une date et un créneau horaire qui vous conviennent pour discuter de vos projets et besoins. Que ce soit pour un projet web, un coaching ou des conseils immobiliers, je suis à votre écoute.
                </p>
              </div>
              <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                <div className="text-center">
                  <Calendar className="h-24 w-24 text-mauve mx-auto mb-4" />
                  <p className="text-gray-400">
                    Disponibilités du lundi au vendredi, de 9h à 18h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Booking Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="section-title mb-12">Réservez votre créneau</h2>
            <AppointmentBooking onSuccess={handleAppointmentSuccess} />
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 bg-noir-light">
          <div className="container mx-auto px-6">
            <h2 className="section-title mb-12">Nos services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-service">
                <Monitor className="text-mauve h-10 w-10 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Développement Web</h3>
                <p className="text-gray-400 mb-4">
                  Sites web professionnels et applications sur mesure pour votre entreprise.
                </p>
              </div>
              
              <div className="card-service">
                <Users className="text-mauve h-10 w-10 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Coaching & Accompagnement</h3>
                <p className="text-gray-400 mb-4">
                  Stratégies et suivi personnalisé pour développer votre activité.
                </p>
              </div>
              
              <div className="card-service">
                <Home className="text-mauve h-10 w-10 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Conseil Immobilier</h3>
                <p className="text-gray-400 mb-4">
                  Solutions adaptées pour vos projets immobiliers à Thonon-les-Bains et environs.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <ChatBot />
      </main>
      
      <Footer />
    </div>
  );
};

export default AppointmentPage;
