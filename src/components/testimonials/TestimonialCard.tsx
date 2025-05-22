
import React from 'react';
import { Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Testimonial } from './types';
import TestimonialRating from './TestimonialRating';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="relative">
      <Quote className="absolute top-0 left-0 text-gold/20" size={60} />
      
      <Card className="card-service p-8 pt-12 animate-fade-in">
        <div className="flex flex-col items-center">
          <p className="text-white text-lg mb-6 text-center relative z-10">
            "{testimonial.content}"
          </p>
          
          <TestimonialRating rating={testimonial.rating} />
          
          <Avatar className="h-16 w-16 border-2 border-gold/30">
            <AvatarImage src={testimonial.image} alt={testimonial.name} />
            <AvatarFallback className="bg-gold/10 text-gold">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="mt-4 text-center">
            <h4 className="text-white font-medium">{testimonial.name}</h4>
            <p className="text-gray-400 text-sm">
              {testimonial.position} - {testimonial.company}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TestimonialCard;
