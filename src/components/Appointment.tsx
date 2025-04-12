
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppointmentForm from './appointment/AppointmentForm';
import AppointmentDetails from './appointment/AppointmentDetails';
import ServiceDescriptions from './appointment/ServiceDescriptions';

const Appointment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('developpement');

  return (
    <section id="appointment" className="bg-noir-light py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2">Prendre Rendez-vous</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6">
            Réservez un créneau pour discuter de votre projet en quelques clics. Je vous répondrai dans les plus brefs délais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <Card className="lg:col-span-3 card-service p-6 animate-fade-in">
            <AppointmentForm 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />
          </Card>

          <div className="lg:col-span-2">
            <AppointmentDetails />
            <ServiceDescriptions 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
