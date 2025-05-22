
import React from 'react';
import { motion } from 'framer-motion';
import HeroTitle from './hero/HeroTitle';
import HeroGreeting from './hero/HeroGreeting';
import HeroButtons from './hero/HeroButtons';
import HeroImage from './hero/HeroImage';
import HeroScrollIndicator from './hero/HeroScrollIndicator';

const Hero: React.FC = () => {
  // Split the title for mobile display
  const titleFirstPart = "Entrepreneur";
  const titleSecondPart = "& Infopreneur";
  
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAppointment = () => {
    document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-noir-dark flex items-center relative overflow-hidden">
      {/* Background particles effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(155,135,245,0.05)_0%,rgba(18,18,18,0)_60%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-0 z-10 w-full">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-20 md:mt-0 w-full text-center md:text-left">
            {/* Animated title */}
            <HeroTitle titleFirstPart={titleFirstPart} titleSecondPart={titleSecondPart} />
            
            <motion.h2 
              className="text-xl md:text-2xl text-mauve font-medium mb-6 overflow-visible"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Développement Web, Coaching & Immobilier
            </motion.h2>
            
            <HeroGreeting />
            
            <HeroButtons 
              onServicesClick={scrollToServices} 
              onAppointmentClick={scrollToAppointment} 
            />
          </div>
          
          <HeroImage />
        </div>
        
        <HeroScrollIndicator />
      </div>
    </section>
  );
};

export default Hero;
