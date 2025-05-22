
export type Testimonial = {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  service: 'web' | 'coaching' | 'immobilier';
};

export type TestimonialFilterType = 'all' | 'web' | 'coaching' | 'immobilier';
