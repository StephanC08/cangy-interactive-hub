
import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <section className="bg-noir-dark py-20 min-h-[50vh] flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(155,135,245,0.05)_0%,rgba(18,18,18,0)_60%)]"></div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center w-full"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 w-full">
            <span className="mauve-gradient-text">À propos</span> de moi
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Découvrez mon parcours, ma mission et ma vision.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
