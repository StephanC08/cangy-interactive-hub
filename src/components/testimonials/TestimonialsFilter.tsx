
import React from 'react';
import { TestimonialFilterType } from './types';

interface TestimonialsFilterProps {
  activeFilter: TestimonialFilterType;
  onFilterChange: (filter: TestimonialFilterType) => void;
}

const TestimonialsFilter: React.FC<TestimonialsFilterProps> = ({
  activeFilter,
  onFilterChange
}) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-noir-light rounded-lg p-1">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeFilter === 'all' ? 'bg-gold text-noir-dark' : 'text-gray-400 hover:text-white'
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => onFilterChange('web')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeFilter === 'web' ? 'bg-gold text-noir-dark' : 'text-gray-400 hover:text-white'
          }`}
        >
          Web
        </button>
        <button
          onClick={() => onFilterChange('coaching')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeFilter === 'coaching' ? 'bg-gold text-noir-dark' : 'text-gray-400 hover:text-white'
          }`}
        >
          Coaching
        </button>
        <button
          onClick={() => onFilterChange('immobilier')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeFilter === 'immobilier' ? 'bg-gold text-noir-dark' : 'text-gray-400 hover:text-white'
          }`}
        >
          Immobilier
        </button>
      </div>
    </div>
  );
};

export default TestimonialsFilter;
