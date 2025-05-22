
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface HeroButtonsProps {
  onServicesClick: () => void;
  onAppointmentClick: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ onServicesClick, onAppointmentClick }) => {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.8 }}
    >
      <Button 
        onClick={onServicesClick} 
        className="btn-primary relative overflow-hidden group text-white"
      >
        <span className="relative z-10 flex items-center">
          <span className="mr-1">Découvrir mes services</span>
          <ArrowRight size={16} className="ml-1" />
        </span>
        <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
      </Button>
      
      <Button 
        onClick={onAppointmentClick} 
        variant="outline" 
        className="btn-secondary relative overflow-hidden group text-white"
      >
        <span className="relative z-10">Prendre rendez-vous</span>
        <span className="absolute inset-0 bg-mauve/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
      </Button>
    </motion.div>
  );
};

export default HeroButtons;
