
import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Set dynamic greeting based on time of day
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Ce matin, le changement commence par une décision : Ne plus se contenter de l'essentiel uniquement... L'excellence n'attend pas. Elle se choisit, se cultive, s'impose !");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Cet après-midi, transformez vos ambitions en actions. L'excellence n'attend pas. Elle se choisit, se cultive, s'impose !");
    } else {
      setGreeting("Le succès ne dort jamais. Et vous ? On ne construit rien de grand sans exigence !");
    }
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAppointment = () => {
    document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation variants for text
  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };
  
  const titleChar = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  // Split the title for mobile display
  const titleFirstPart = "Entrepreneur";
  const titleSecondPart = "& Infopreneur";
  
  return (
    <section className="min-h-screen bg-noir-dark flex items-center relative overflow-hidden">
      {/* Background particles effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(155,135,245,0.05)_0%,rgba(18,18,18,0)_60%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-0 z-10 w-full">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-20 md:mt-0 w-full text-center md:text-left">
            {/* Animated title with mobile-responsive layout */}
            {isMobile ? (
              <motion.div
                className="overflow-visible px-1 mb-4"
                variants={titleContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.h1 
                  className="text-4xl font-heading font-bold text-white leading-tight"
                  style={{ wordBreak: "keep-all", hyphens: "none" }}
                >
                  {titleFirstPart.split('').map((char, index) => (
                    <motion.span
                      key={`first-${index}`}
                      variants={titleChar}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.h1>
                <motion.h1 
                  className="text-4xl font-heading font-bold leading-tight"
                  style={{ wordBreak: "keep-all", hyphens: "none" }}
                >
                  {titleSecondPart.split('').map((char, index) => (
                    <motion.span
                      key={`second-${index}`}
                      variants={titleChar}
                      className={char === '&' ? "mauve-gradient-text" : "text-white"}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.h1>
              </motion.div>
            ) : (
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-4 w-full overflow-visible px-1"
                variants={titleContainer}
                initial="hidden"
                animate="visible"
                style={{ wordBreak: "keep-all", hyphens: "none" }}
              >
                {(titleFirstPart + " " + titleSecondPart).split('').map((char, index) => (
                  <motion.span
                    key={index}
                    variants={titleChar}
                    className={char === '&' ? "mauve-gradient-text" : ""}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>
            )}
            
            <motion.h2 
              className="text-xl md:text-2xl text-mauve font-medium mb-6 overflow-visible"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Développement Web, Coaching & Immobilier
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 text-lg mb-8 max-w-xl mx-auto md:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              {greeting}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <Button 
                onClick={scrollToServices} 
                className="btn-primary relative overflow-hidden group text-white"
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-1">Découvrir mes services</span>
                  <ArrowRight size={16} className="ml-1" />
                </span>
                <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
              
              <Button 
                onClick={scrollToAppointment} 
                variant="outline" 
                className="btn-secondary relative overflow-hidden group text-white"
              >
                <span className="relative z-10">Prendre rendez-vous</span>
                <span className="absolute inset-0 bg-mauve/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="relative">
              <motion.div 
                className="w-64 h-64 md:w-80 md:h-80 bg-mauve/10 rounded-full absolute -top-4 -left-4"
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              ></motion.div>
              
              <div className="sticky top-32 z-10">
                <motion.div
                  whileHover={{ 
                    boxShadow: "0 0 25px rgba(155, 135, 245, 0.5)",
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <img
                    src="/lovable-uploads/a0bca79c-615a-4b2f-9c67-101f7f821c66.png"
                    alt="Stephan CANGY"
                    className="w-64 h-64 md:w-80 md:h-80 object-cover object-top rounded-full border-4 border-mauve/30"
                    style={{ position: 'sticky', top: '25vh' }}
                  />
                </motion.div>
              </div>
              
              <div className="absolute -bottom-2 -right-2 bg-noir-light border border-mauve px-4 py-2 rounded-full z-20 max-w-xs">
                <span className="text-mauve font-medium text-xs md:text-sm italic">
                  "On ne <span className="text-mauve-light font-semibold">c</span>on<span className="text-mauve-light font-semibold">s</span>truit rien de grand 
                  <span className="text-mauve-light font-semibold"> s</span>an<span className="text-mauve-light font-semibold">s</span> exigen<span className="text-mauve-light font-semibold">c</span>e. 
                  L'ex<span className="text-mauve-light font-semibold">c</span>ellen<span className="text-mauve-light font-semibold">c</span>e e<span className="text-mauve-light font-semibold">s</span>t une di<span className="text-mauve-light font-semibold">s</span><span className="text-mauve-light font-semibold">c</span>ipline, pa<span className="text-mauve-light font-semibold">s</span> un ha<span className="text-mauve-light font-semibold">s</span>ard."
                </span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="text-mauve" size={36} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
