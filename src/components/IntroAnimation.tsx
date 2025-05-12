
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
    
    // Cycle through text phrases with longer duration
    if (currentText < introPhrases.length - 1) {
      const timer = setTimeout(() => {
        setCurrentText(currentText + 1);
      }, 2500); // Increased from 1500ms to 2500ms
      return () => clearTimeout(timer);
    } else {
      // After last text, wait longer before hiding intro
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 3000); // Increased from 2000ms to 3000ms
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
          transition={{ duration: 1.2 }} // Increased from 0.8s to 1.2s
        >
          <div className="max-w-md mx-auto text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1 }} // Increased from default
                className="text-2xl md:text-3xl text-white font-heading"
              >
                {introPhrases[currentText]}
              </motion.p>
            </AnimatePresence>
            
            {currentText === introPhrases.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 1 }} // Increased delay from 0.5s to 1s
                className="mt-12"
              >
                <div className="w-32 h-32 mx-auto flex items-center justify-center">
                  <motion.img 
                    src="/lovable-uploads/1fe917ce-0c66-4ac1-892b-5695abc25f8a.png"
                    alt="Stephan CANGY Logo"
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }} // Increased delay from 0.7s to 1.5s
                  />
                </div>
              </motion.div>
            )}
          </div>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 5 }} // Increased from 4s to 5s
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
