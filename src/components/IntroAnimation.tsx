
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
    // Cycle through text phrases
    if (currentText < introPhrases.length - 1) {
      const timer = setTimeout(() => {
        setCurrentText(currentText + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // After last text, wait and then hide intro
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentText]);

  // Save intro seen state in session storage
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
    } else {
      sessionStorage.setItem('hasSeenIntro', 'true');
    }
  }, []);
  
  if (!showIntro) return null;
  
  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="fixed inset-0 bg-noir-dark z-50 flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-md mx-auto text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-2xl md:text-3xl text-white font-heading"
              >
                {introPhrases[currentText]}
              </motion.p>
            </AnimatePresence>
            
            {currentText === introPhrases.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-12"
              >
                <div className="w-24 h-24 mx-auto flex items-center justify-center rounded-full border-2 border-mauve">
                  <span className="text-mauve text-2xl font-bold">SC</span>
                </div>
              </motion.div>
            )}
          </div>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 4 }}
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
