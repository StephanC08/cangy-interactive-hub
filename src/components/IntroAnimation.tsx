
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroAnimation: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentText, setCurrentText] = useState(0);
  
  const introPhrases = [
    "Derrière chaque réussite,",
    "il y a une stratégie.",
    "Et derrière chaque stratégie,",
    "un homme…"
  ];
  
  useEffect(() => {
    // Force intro to be shown when the component mounts
    setShowIntro(true);
    
    // Cycle through text phrases
    if (currentText < introPhrases.length - 1) {
      const timer = setTimeout(() => {
        setCurrentText(currentText + 1);
      }, 3000); // Even longer duration for better reading time
      return () => clearTimeout(timer);
    } else {
      // Show the logo for longer before hiding intro
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentText]);
  
  if (!showIntro) return null;
  
  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="fixed inset-0 bg-noir-dark z-50 flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <div className="max-w-md mx-auto text-center relative h-32">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1.2 }}
                className="text-2xl md:text-3xl text-white font-heading absolute left-0 right-0"
              >
                {introPhrases[currentText]}
              </motion.p>
            </AnimatePresence>
          </div>
          
          {currentText === introPhrases.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
              className="mt-20"
            >
              <div className="w-32 h-32 mx-auto flex items-center justify-center">
                <motion.img 
                  src="/lovable-uploads/1fe917ce-0c66-4ac1-892b-5695abc25f8a.png"
                  alt="Stephan CANGY Logo"
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1.5 }}
                />
              </div>
            </motion.div>
          )}
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 6 }}
            onClick={() => setShowIntro(false)}
            className="absolute bottom-8 text-white/50 hover:text-white text-sm"
          >
            Passer l'introduction
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
