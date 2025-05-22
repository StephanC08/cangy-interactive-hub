
import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface TestimonialRatingProps {
  rating: number;
}

const TestimonialRating: React.FC<TestimonialRatingProps> = ({ rating }) => {
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
    <div className="flex justify-center mb-2">
      {renderStars(rating)}
    </div>
  );
};

export default TestimonialRating;
