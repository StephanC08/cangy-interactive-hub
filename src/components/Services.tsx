
import React from 'react';
import { Monitor, Users, Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const serviceData = [
  {
    icon: <Monitor className="h-12 w-12 text-gold" />,
    title: "Développement Web",
    description: "Création de sites web performants et sur mesure pour développer votre présence en ligne et attirer de nouveaux clients.",
    features: ["Sites vitrines professionnels", "E-commerce performants", "Applications web sur mesure", "Audits et optimisation SEO"],
    buttonText: "En savoir plus",
  },
  {
    icon: <Users className="h-12 w-12 text-gold" />,
    title: "Coaching & Accompagnement",
    description: "Suivi personnalisé pour vous aider à atteindre vos objectifs professionnels et personnels avec des stratégies efficaces.",
    features: ["Développement personnel", "Stratégie d'entreprise", "Productivité et organisation", "Transition professionnelle"],
    buttonText: "Découvrir",
  },
  {
    icon: <Home className="h-12 w-12 text-gold" />,
    title: "Conseil Immobilier",
    description: "Stratégies et solutions adaptées pour vendeurs et acquéreurs dans la région de Thonon-les-Bains et ses environs.",
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceData.map((service, index) => (
            <Card key={index} className="card-service animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="btn-secondary w-full">
                  {service.buttonText}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
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
