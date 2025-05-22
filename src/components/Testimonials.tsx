
import React from 'react';
import TestimonialsCarousel from './testimonials/TestimonialsCarousel';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="bg-noir py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">Ce qu'ils en disent</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6">
            Découvrez les témoignages de clients satisfaits qui m'ont fait confiance pour leurs projets.
          </p>
        </div>
        
        <TestimonialsCarousel />
      </div>
    </section>
  );
};

export default Testimonials;
