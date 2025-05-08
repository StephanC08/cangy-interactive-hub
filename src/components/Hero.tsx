
import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAppointment = () => {
    document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-noir-dark flex items-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(155,135,245,0.05)_0%,rgba(18,18,18,0)_60%)]"></div>
      <div className="container mx-auto px-6 py-12 md:py-0 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 animate-fade-in mt-20 md:mt-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-4">
              Entrepreneur <span className="mauve-gradient-text">&</span> Infopreneur
            </h1>
            <h2 className="text-xl md:text-2xl text-mauve font-medium mb-6">
              Développement Web, Coaching & Immobilier
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl">
              Développez votre activité avec un accompagnement sur mesure et des solutions innovantes pour atteindre vos objectifs professionnels et personnels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={scrollToServices} className="btn-primary">
                Découvrir mes services
                <ArrowRight size={16} />
              </Button>
              <Button onClick={scrollToAppointment} variant="outline" className="btn-secondary">
                Prendre rendez-vous
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center animate-fade-in animation-delay-300">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-mauve/10 rounded-full absolute -top-4 -left-4"></div>
              <div className="sticky top-32 z-10">
                <img
                  src="/lovable-uploads/a0bca79c-615a-4b2f-9c67-101f7f821c66.png"
                  alt="Stephan CANGY"
                  className="w-64 h-64 md:w-80 md:h-80 object-cover object-top rounded-full border-4 border-mauve/30"
                  style={{ position: 'sticky', top: '25vh' }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-noir-light border border-mauve px-4 py-2 rounded-full z-20 max-w-xs">
                <span className="text-mauve font-medium text-xs md:text-sm">"On ne construit rien de grand sans exigence. L'excellence est une discipline, pas un hasard."</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <ChevronDown className="text-mauve" size={36} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
