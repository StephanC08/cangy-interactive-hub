
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Monitor, Code, UserCheck, BarChart, Home, Key } from 'lucide-react';

const services = [
  {
    icon: <Monitor />,
    title: "Développement Web",
    description: "Des sites web performants, élégants et centrés sur vos objectifs business.",
    features: ["Sites vitrines", "E-commerce", "Applications web", "Refonte et optimisation"],
    route: "/developpement-web",
    experience: "/experiences/design-ton-site",
    experienceText: "Design ton site idéal"
  },
  {
    icon: <UserCheck />,
    title: "Coaching",
    description: "Un accompagnement personnalisé pour révéler votre potentiel et atteindre vos objectifs.",
    features: ["Vision claire", "Stratégie d'action", "Développement personnel", "Suivi et ajustement"],
    route: "/coaching",
    experience: "/experiences/debloque-ton-niveau",
    experienceText: "Débloque ton prochain niveau"
  },
  {
    icon: <Home />,
    title: "Conseil Immobilier",
    description: "Des solutions immobilières adaptées à vos projets dans la région du Chablais.",
    features: ["Achat", "Vente", "Investissement", "Stratégie patrimoniale"],
    route: "/immobilier",
    experience: "/experiences/mission-rentabilite",
    experienceText: "Mission Rentabilité"
  }
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section id="services" className="py-20 bg-noir-light">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            Mes Services
          </motion.h2>
          <motion.p 
            className="text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Des solutions sur mesure pour répondre à vos besoins spécifiques et vous aider à atteindre vos objectifs.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
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
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
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
                  <Button className="w-full bg-mauve hover:bg-mauve/80">
                    En savoir plus
                  </Button>
                </Link>
                <Link to={service.experience} className="w-full">
                  <Button variant="outline" className="w-full border-mauve/30 hover:bg-mauve hover:text-white">
                    {service.experienceText}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
