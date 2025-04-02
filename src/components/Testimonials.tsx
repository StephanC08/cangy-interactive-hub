
import React, { useState } from 'react';
import { Star, StarHalf, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

type Testimonial = {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  service: 'web' | 'coaching' | 'immobilier';
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marie Dupont',
    position: 'Dirigeante',
    company: 'Boutique en ligne',
    content: "Stephan a complètement transformé notre présence en ligne. Notre nouveau site e-commerce est non seulement magnifique mais aussi très performant. Les ventes ont augmenté de 40% en seulement deux mois !",
    rating: 5,
    image: '/placeholder.svg',
    service: 'web',
  },
  {
    id: 2,
    name: 'Thomas Laurent',
    position: 'Entrepreneur',
    company: 'Start-up Tech',
    content: "Le coaching avec Stephan m'a permis de structurer ma vision et de mettre en place des stratégies efficaces pour développer mon entreprise. Son approche personnalisée et sa disponibilité sont remarquables.",
    rating: 5,
    image: '/placeholder.svg',
    service: 'coaching',
  },
  {
    id: 3,
    name: 'Sophie Martin',
    position: 'Propriétaire',
    company: 'Thonon-les-Bains',
    content: "Grâce aux conseils de Stephan, j'ai pu vendre ma maison dans des conditions optimales et en un temps record. Son expertise du marché local et sa réactivité ont fait toute la différence.",
    rating: 4.5,
    image: '/placeholder.svg',
    service: 'immobilier',
  },
  {
    id: 4,
    name: 'Jean Moreau',
    position: 'Gérant',
    company: 'Restaurant local',
    content: "Notre nouveau site web est exactement ce dont nous avions besoin. Stephan a su comprendre nos besoins et créer une interface qui reflète parfaitement l'ambiance de notre restaurant. Merci !",
    rating: 5,
    image: '/placeholder.svg',
    service: 'web',
  },
  {
    id: 5,
    name: 'Camille Bernard',
    position: 'Coach sportif',
    company: 'Indépendante',
    content: "Le programme de coaching m'a aidé à structurer mon activité et à attirer plus de clients. Les conseils de Stephan sont précieux et très concrets, ce qui est exactement ce dont j'avais besoin.",
    rating: 4.5,
    image: '/placeholder.svg',
    service: 'coaching',
  },
];

const Testimonials: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'coaching' | 'immobilier'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredTestimonials = activeFilter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.service === activeFilter);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === filteredTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredTestimonials.length - 1 : prevIndex - 1
    );
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="text-gold" size={16} fill="#D4AF37" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="text-gold" size={16} fill="#D4AF37" />);
    }
    
    return stars;
  };

  return (
    <section id="testimonials" className="bg-noir py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">Ce qu'ils en disent</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6">
            Découvrez les témoignages de clients satisfaits qui m'ont fait confiance pour leurs projets.
          </p>
        </div>
        
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-noir-light rounded-lg p-1">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeFilter === 'all' ? 'bg-gold text-noir-dark' : 'text-gray-400 hover:text-white'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setActiveFilter('web')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeFilter === 'web' ? 'bg-gold text-noir-dark' : 'text-gray-400 hover:text-white'
                }`}
              >
                Web
              </button>
              <button
                onClick={() => setActiveFilter('coaching')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeFilter === 'coaching' ? 'bg-gold text-noir-dark' : 'text-gray-400 hover:text-white'
                }`}
              >
                Coaching
              </button>
              <button
                onClick={() => setActiveFilter('immobilier')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeFilter === 'immobilier' ? 'bg-gold text-noir-dark' : 'text-gray-400 hover:text-white'
                }`}
              >
                Immobilier
              </button>
            </div>
          </div>
          
          {filteredTestimonials.length > 0 ? (
            <div className="relative">
              <Quote className="absolute top-0 left-0 text-gold/20" size={60} />
              
              <Card className="card-service p-8 pt-12 animate-fade-in">
                <div className="flex flex-col items-center">
                  <p className="text-white text-lg mb-6 text-center relative z-10">
                    "{filteredTestimonials[currentIndex].content}"
                  </p>
                  
                  <div className="flex justify-center mb-2">
                    {renderStars(filteredTestimonials[currentIndex].rating)}
                  </div>
                  
                  <Avatar className="h-16 w-16 border-2 border-gold/30">
                    <AvatarImage src={filteredTestimonials[currentIndex].image} alt={filteredTestimonials[currentIndex].name} />
                    <AvatarFallback className="bg-gold/10 text-gold">
                      {filteredTestimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="mt-4 text-center">
                    <h4 className="text-white font-medium">{filteredTestimonials[currentIndex].name}</h4>
                    <p className="text-gray-400 text-sm">
                      {filteredTestimonials[currentIndex].position} - {filteredTestimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </Card>
              
              {filteredTestimonials.length > 1 && (
                <div className="flex justify-between mt-6">
                  <Button 
                    onClick={prevTestimonial} 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full border-gold/30 text-gold"
                  >
                    <ChevronLeft size={24} />
                  </Button>
                  <div className="flex space-x-2 items-center">
                    {filteredTestimonials.map((_, index) => (
                      <div 
                        key={index}
                        className={`h-2 w-2 rounded-full transition-all ${
                          index === currentIndex ? 'bg-gold' : 'bg-gold/30'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <Button 
                    onClick={nextTestimonial} 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full border-gold/30 text-gold"
                  >
                    <ChevronRight size={24} />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Aucun témoignage disponible pour cette catégorie.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
