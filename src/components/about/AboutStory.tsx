
import React from 'react';
import { motion } from 'framer-motion';

const AboutStory = () => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="py-20 bg-noir">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="section-title mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUpVariants}
            custom={0}
          >
            Qui suis-je ?
          </motion.h2>
          
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.p 
                className="text-gray-300 mb-6"
                variants={fadeInUpVariants}
                custom={1}
              >
                Je m'appelle <span className="text-mauve font-semibold">Stephan Cangy</span>.
              </motion.p>
              
              <motion.p 
                className="text-gray-300 mb-6"
                variants={fadeInUpVariants}
                custom={2}
              >
                J'ai grandi et étudié à Monaco, où j'ai vécu pendant 20 ans.
              </motion.p>
              
              <motion.p 
                className="text-gray-300 mb-6"
                variants={fadeInUpVariants}
                custom={3}
              >
                C'est là, à seulement 12 ans, qu'un ordinateur est venu bouleverser mon quotidien. À une époque où Internet balbutiait encore, je me découvre une véritable passion pour l'informatique. En autodidacte, j'apprends à coder, à comprendre les systèmes, à explorer les possibilités du web... jusqu'à m'initier au hacking éthique — non pas pour nuire, mais pour comprendre, repousser les limites, apprendre plus vite que les autres.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.p 
                className="text-gray-300 mb-6"
                variants={fadeInUpVariants}
                custom={4}
              >
                En 2015, cette fibre geek devient moteur entrepreneurial : je me lance comme infopreneur.
              </motion.p>
              
              <motion.p 
                className="text-gray-300 mb-6"
                variants={fadeInUpVariants}
                custom={5}
              >
                Affiliation, e-commerce, vente d'ebooks, formations, missions freelance… Un vrai laboratoire d'expériences digitales, d'où émergent mes premiers projets.
              </motion.p>
              
              <motion.p 
                className="text-gray-300 mb-6"
                variants={fadeInUpVariants}
                custom={6}
              >
                En 2022, je m'installe dans le Chablais, à Thonon-les-Bains. Je me reconnecte à ce qui m'anime profondément : l'humain.
              </motion.p>
              
              <motion.p 
                className="text-gray-300 font-medium text-lg"
                variants={fadeInUpVariants}
                custom={7}
              >
                Aujourd'hui, j'accompagne des porteurs de projets ambitieux, car aider les autres me rend profondément heureux.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
