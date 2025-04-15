
import React from 'react';
import { Calendar, Clock, Check, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AppointmentDetailsProps {
  activeTab?: string;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ activeTab = 'developpement' }) => {
  // Content based on the active tab
  const getDetails = () => {
    switch (activeTab) {
      case 'developpement':
        return {
          title: 'Consultation Web',
          description: 'Discutons de votre projet digital et identifions ensemble les meilleures solutions pour votre présence en ligne.',
          duration: '45 min',
        };
      case 'coaching':
        return {
          title: 'Consultation Coaching',
          description: 'Un échange pour comprendre vos objectifs, identifier vos défis et établir un plan d\'accompagnement sur mesure.',
          duration: '60 min',
        };
      case 'immobilier':
        return {
          title: 'Conseil Immobilier',
          description: 'Une analyse de votre situation et de vos besoins pour vous orienter dans votre projet d\'achat, vente ou investissement.',
          duration: '45 min',
        };
      default:
        return {
          title: 'Consultation Web',
          description: 'Discutons de votre projet digital et identifions ensemble les meilleures solutions pour votre présence en ligne.',
          duration: '45 min',
        };
    }
  };

  const details = getDetails();

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
      
      <div className="flex items-start mb-4">
        <Phone className="text-mauve mr-4" size={24} />
        <div>
          <h3 className="text-white font-medium text-lg">{details.title}</h3>
          <p className="text-gray-400 text-sm">{details.description}</p>
        </div>
      </div>
      <Separator className="bg-mauve/10 mb-4" />
      
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center text-gray-300 text-sm">
          <Clock size={16} className="mr-2 text-mauve" />
          <span>Durée: {details.duration}</span>
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
