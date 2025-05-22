
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroGreeting: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  
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
  
  return (
    <motion.p 
      className="text-gray-300 text-lg mb-8 max-w-xl mx-auto md:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.8 }}
    >
      {greeting}
    </motion.p>
  );
};

export default HeroGreeting;
