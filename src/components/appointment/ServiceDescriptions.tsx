
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';

type ServiceDescriptionsProps = {
  activeTab: string;
  onTabChange: (value: string) => void;
};

const ServiceDescriptions: React.FC<ServiceDescriptionsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsContent value="developpement" className="animate-fade-in">
        <Card className="card-service p-6">
          <h3 className="text-mauve font-medium text-lg mb-2">Consultation Web</h3>
          <p className="text-gray-400 text-sm mb-4">
            Discutons de votre projet web et des solutions adaptées à vos besoins et objectifs.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
              <span className="text-gray-300 text-sm">Analyse de vos besoins</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
              <span className="text-gray-300 text-sm">Conseils sur les technologies</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
              <span className="text-gray-300 text-sm">Estimation budgétaire</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
              <span className="text-gray-300 text-sm">Planification du projet</span>
            </li>
          </ul>
        </Card>
      </TabsContent>

      <TabsContent value="coaching" className="animate-fade-in">
        <Card className="card-service p-6">
          <h3 className="text-mauve font-medium text-lg mb-2">Session de Coaching</h3>
          <p className="text-gray-400 text-sm mb-4">
            Définissons ensemble vos objectifs et élaborons un plan d'action personnalisé.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
              <span className="text-gray-300 text-sm">Évaluation de la situation actuelle</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
              <span className="text-gray-300 text-sm">Identification des objectifs</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
              <span className="text-gray-300 text-sm">Stratégies de développement</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
              <span className="text-gray-300 text-sm">Suivi et accompagnement</span>
            </li>
          </ul>
        </Card>
      </TabsContent>

      <TabsContent value="immobilier" className="animate-fade-in">
        <Card className="card-service p-6">
          <h3 className="text-mauve font-medium text-lg mb-2">Conseil Immobilier</h3>
          <p className="text-gray-400 text-sm mb-4">
            Explorons ensemble vos projets immobiliers à Thonon-les-Bains et dans la région.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
              <span className="text-gray-300 text-sm">Estimation de bien</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
              <span className="text-gray-300 text-sm">Recherche personnalisée</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
              <span className="text-gray-300 text-sm">Conseils d'investissement</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-mauve flex-shrink-0"></div>
              <span className="text-gray-300 text-sm">Accompagnement transaction</span>
            </li>
          </ul>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ServiceDescriptions;
