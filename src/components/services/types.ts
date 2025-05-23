
import { ReactNode } from 'react';

export interface Service {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  route: string;
  experience: string;
  experienceText: string;
}
