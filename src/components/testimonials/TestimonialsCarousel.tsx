
import React, { useState } from 'react';
import { TestimonialFilterType } from './types';
import { testimonials } from './data';
import TestimonialsFilter from './TestimonialsFilter';
import TestimonialCard from './TestimonialCard';
import TestimonialControls from './TestimonialControls';

const TestimonialsCarousel: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<TestimonialFilterType>('all');
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

  const handleFilterChange = (filter: TestimonialFilterType) => {
    setActiveFilter(filter);
    setCurrentIndex(0); // Reset index when changing filter
  };
  
  return (
    <div className="mx-auto max-w-3xl">
      <TestimonialsFilter 
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      
      {filteredTestimonials.length > 0 ? (
        <>
          <TestimonialCard testimonial={filteredTestimonials[currentIndex]} />
          
          {filteredTestimonials.length > 1 && (
            <TestimonialControls 
              testimonials={filteredTestimonials}
              currentIndex={currentIndex}
              onPrev={prevTestimonial}
              onNext={nextTestimonial}
            />
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">Aucun témoignage disponible pour cette catégorie.</p>
        </div>
      )}
    </div>
  );
};

export default TestimonialsCarousel;
