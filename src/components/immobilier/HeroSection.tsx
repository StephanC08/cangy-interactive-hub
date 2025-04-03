
import React from 'react';
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-noir-dark py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Conseil <span className="mauve-gradient-text">Immobilier</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Découvrez les meilleures opportunités immobilières à Thonon-les-Bains et dans un rayon de 50 km. 
              Que vous recherchiez une résidence principale, un investissement locatif ou un bien à rénover, 
              je vous accompagne dans toutes les étapes de votre projet.
            </p>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="text-mauve" />
              <span>Thonon-les-Bains et environs (50 km)</span>
            </div>
            <Button className="btn-primary">
              Prendre rendez-vous
            </Button>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative">
              <div className="w-full h-64 md:h-80 bg-mauve/10 rounded-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/7d76f0ad-485f-4326-9db9-260d6e80cde9.png" 
                  alt="Immobilier Thonon-les-Bains" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-noir-light border border-mauve px-4 py-2 rounded-md z-20">
                <span className="text-mauve font-medium">Service personnalisé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
