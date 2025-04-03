
import React from 'react';
import { Monitor, Users, Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const serviceData = [
  {
    icon: <Monitor className="h-12 w-12 text-mauve" />,
    title: "Développement Web",
    description: "Création de sites web performants et sur mesure pour développer votre présence en ligne et attirer de nouveaux clients.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Sites vitrines professionnels", "E-commerce performants", "Applications web sur mesure", "Audits et optimisation SEO"],
    buttonText: "En savoir plus",
  },
  {
    icon: <Users className="h-12 w-12 text-mauve" />,
    title: "Coaching & Accompagnement",
    description: "Suivi personnalisé pour vous aider à atteindre vos objectifs professionnels et personnels avec des stratégies efficaces.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Développement personnel", "Stratégie d'entreprise", "Productivité et organisation", "Transition professionnelle"],
    buttonText: "Découvrir",
  },
  {
    icon: <Home className="h-12 w-12 text-mauve" />,
    title: "Conseil Immobilier",
    description: "Stratégies et solutions adaptées pour vendeurs et acquéreurs dans la région de Thonon-les-Bains et ses environs.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    features: ["Estimations précises", "Conseils personnalisés", "Accompagnement complet", "Stratégie d'investissement"],
    buttonText: "Consulter",
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="bg-noir py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">Mes Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6">
            Des prestations sur mesure pour vous accompagner dans vos projets et vous aider à atteindre vos objectifs avec des solutions adaptées à vos besoins.
          </p>
        </div>
        
        <div className="space-y-16">
          {serviceData.map((service, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center animate-fade-in`} 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="md:w-1/2">
                <div className="relative group overflow-hidden rounded-lg">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-dark to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="mb-3">{service.icon}</div>
                    <h3 className="text-2xl text-white font-bold mb-2">{service.title}</h3>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <h3 className="text-2xl text-white font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="btn-primary">
                  {service.buttonText}
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="section-subtitle mx-auto after:left-1/2 after:-translate-x-1/2">Des besoins spécifiques ?</h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Chaque projet est unique. Discutons ensemble de vos besoins pour trouver la solution qui vous convient parfaitement.
          </p>
          <Button className="btn-primary">
            Demander un devis personnalisé
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
