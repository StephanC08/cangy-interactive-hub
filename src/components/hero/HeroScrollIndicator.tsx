
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroScrollIndicator: React.FC = () => {
  return (
    <motion.div 
      className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <ChevronDown className="text-mauve" size={36} />
    </motion.div>
  );
};

export default HeroScrollIndicator;
