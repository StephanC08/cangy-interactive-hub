
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Service } from './types';

interface ServiceCardProps {
  service: Service;
  index: number;
  itemVariants: any;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, itemVariants }) => {
  return (
    <motion.div 
      key={index} 
      className="bg-noir border border-mauve/20 rounded-lg p-8 h-full flex flex-col"
      variants={itemVariants}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 25px -5px rgba(126, 105, 171, 0.15)", 
        transition: { duration: 0.3 } 
      }}
    >
      <div className="bg-mauve/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
        <span className="text-mauve">{service.icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-4 text-white">{service.title}</h3>
      <p className="text-gray-400 mb-6">{service.description}</p>
      <ul className="mb-8">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-center mb-2">
            <span className="h-1.5 w-1.5 bg-mauve rounded-full mr-2"></span>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto space-y-3">
        <Link to={service.route} className="w-full">
          <Button className="w-full bg-mauve hover:bg-mauve/80 text-white">
            En savoir plus
          </Button>
        </Link>
        <Link to={service.experience} className="w-full">
          <Button variant="outline" className="w-full border-mauve/30 hover:bg-mauve hover:text-white text-white">
            {service.experienceText}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
