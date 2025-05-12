
import React from 'react';
import { motion } from 'framer-motion';

const AboutMission = () => {
  return (
    <section className="py-20 bg-noir-light">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="section-title !mb-16 mx-auto after:left-1/2 after:-translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            Ma mission
          </motion.h2>
          
          <motion.p 
            className="text-2xl md:text-3xl font-heading text-gray-200 italic max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Voir une idée prendre vie, un objectif se concrétiser, un rêve devenir réalité — <span className="text-mauve">c'est ce qui me fait vibrer</span>.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
