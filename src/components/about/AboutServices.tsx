
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, UserCheck, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AboutServices = () => {
  const navigate = useNavigate();
  
  const serviceItems = [
    {
      icon: <Globe className="text-mauve" size={32} />,
      title: "Développement web",
      description: "La création de sites web élégants, performants et orientés conversion",
      route: "/developpement-web",
      experience: "/experiences/design-ton-site"
    },
    {
      icon: <UserCheck className="text-mauve" size={32} />,
      title: "Coaching",
      description: "Le coaching & l'accompagnement personnalisé, pour clarifier une vision, structurer une action, atteindre des objectifs pro & perso",
      route: "/coaching",
      experience: "/experiences/debloque-ton-niveau"
    },
    {
      icon: <Home className="text-mauve" size={32} />,
      title: "Conseil immobilier",
      description: "Le conseil immobilier stratégique, pour acheter ou vendre sereinement dans la région du Chablais",
      route: "/immobilier",
      experience: "/experiences/mission-rentabilite"
    }
  ];
  
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
    <section className="py-20 bg-noir-light">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="section-title mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            Ce que je fais aujourd'hui
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 mb-12 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            J'aide des entrepreneurs, indépendants, investisseurs et porteurs de projet à poser des fondations solides et alignées à travers :
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {serviceItems.map((service, index) => (
              <motion.div 
                key={index} 
                className="bg-noir p-8 rounded-lg border border-mauve/20 hover:border-mauve/50 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px -5px rgba(126, 105, 171, 0.15)", 
                  transition: { duration: 0.3 } 
                }}
              >
                <div className="bg-noir-light rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <div className="space-y-3">
                  <Button 
                    variant="link" 
                    className="text-mauve hover:text-mauve-light p-0 w-full justify-start"
                    onClick={() => navigate(service.route)}
                  >
                    En savoir plus →
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-mauve/30 hover:bg-mauve hover:text-white text-sm"
                    onClick={() => navigate(service.experience)}
                  >
                    Essayer l'expérience interactive
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
