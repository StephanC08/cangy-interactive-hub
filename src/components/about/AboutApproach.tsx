
import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutApproach = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const values = [
    "Une écoute active et empathique",
    "Une relation de confiance, durable et transparente",
    "Une présence authentique, dans les hauts comme dans les bas"
  ];

  return (
    <section className="py-20 bg-noir">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="section-title mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            Ma façon d'accompagner
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 mb-10 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Je crois en une approche humaine, sincère et engagée.
            <br />Mon accompagnement repose sur :
          </motion.p>
          
          <motion.ul 
            className="space-y-4 mb-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {values.map((value, index) => (
              <motion.li 
                key={index} 
                className="flex items-start gap-3"
                variants={item}
              >
                <span className="bg-mauve rounded-full p-1 mt-1 flex-shrink-0">
                  <Check size={16} className="text-white" />
                </span>
                <span className="text-gray-200">{value}</span>
              </motion.li>
            ))}
          </motion.ul>
          
          <motion.div
            className="bg-noir-light p-8 rounded-lg border-l-4 border-mauve"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4">Ce que mes clients me disent souvent :</h3>
            <p className="text-gray-300 italic">
              Ce qu'ils apprécient, c'est mon <span className="text-mauve-light">calme</span>, mon <span className="text-mauve-light">empathie</span>, et ma capacité à les aider à avancer avec <span className="text-mauve-light">clarté</span>, <span className="text-mauve-light">structure</span>, et <span className="text-mauve-light">sérénité</span>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutApproach;
