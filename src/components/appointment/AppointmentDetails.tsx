
import React from 'react';
import { Calendar, Clock, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const AppointmentDetails: React.FC = () => {
  return (
    <Card className="card-service p-6 animate-fade-in animation-delay-200 mb-6">
      <div className="flex items-start mb-4">
        <Calendar className="text-mauve mr-4" size={24} />
        <div>
          <h3 className="text-white font-medium text-lg">Disponibilités</h3>
          <p className="text-gray-400 text-sm">
            Consultations disponibles du lundi au vendredi, de 9h à 18h.
          </p>
        </div>
      </div>
      <Separator className="bg-mauve/10 mb-4" />
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center text-gray-300 text-sm">
          <Clock size={16} className="mr-2 text-mauve" />
          <span>Durée: 45 min</span>
        </div>
        <div className="flex items-center text-gray-300 text-sm">
          <Check size={16} className="mr-2 text-mauve" />
          <span>Confirmation par email</span>
        </div>
      </div>
    </Card>
  );
};

export default AppointmentDetails;
