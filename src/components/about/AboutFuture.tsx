import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutFuture = () => {
  const scrollToAppointment = () => {
    // Scroll to appointment section if it exists on current page,
    // otherwise navigate to home page and then scroll
    const appointmentSection = document.getElementById('appointment');
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#appointment';
    }
  };

  return (
    <section className="py-20 bg-noir">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="section-title mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            Et demain ?
          </motion.h2>
          
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl text-gray-200">
              Mon ambition est simple :
              <br />
              <span className="text-mauve font-semibold">Aider le plus grand nombre à atteindre la leur.</span>
            </p>
            
            <p className="text-gray-300">
              Je veux continuer à bâtir des outils, des espaces, des expériences qui connectent l'humain à son plein potentiel.
            </p>
          </motion.div>
          
          <motion.div
            className="mt-16 bg-gradient-to-r from-noir-light to-noir p-10 rounded-lg border-l-4 border-mauve text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-8">Et si on avançait ensemble ?</h3>
            
            <Button 
              onClick={scrollToAppointment}
              className="btn-primary text-lg px-8 py-6"
            >
              <span>Prendre rendez-vous</span>
              <ArrowRight size={20} />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutFuture;
