
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Testimonial } from './types';

interface TestimonialControlsProps {
  testimonials: Testimonial[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

const TestimonialControls: React.FC<TestimonialControlsProps> = ({
  testimonials,
  currentIndex,
  onPrev,
  onNext
}) => {
  return (
    <div className="flex justify-between mt-6">
      <Button 
        onClick={onPrev} 
        variant="outline" 
        size="icon" 
        className="rounded-full border-gold/30 text-gold"
      >
        <ChevronLeft size={24} />
      </Button>
      <div className="flex space-x-2 items-center">
        {testimonials.map((_, index) => (
          <div 
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-gold' : 'bg-gold/30'
            }`}
          ></div>
        ))}
      </div>
      <Button 
        onClick={onNext} 
        variant="outline" 
        size="icon" 
        className="rounded-full border-gold/30 text-gold"
      >
        <ChevronRight size={24} />
      </Button>
    </div>
  );
};

export default TestimonialControls;
