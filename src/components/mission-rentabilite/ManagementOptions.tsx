
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Settings, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { InvestmentDetails } from './types';

interface ManagementOptionsProps {
  investmentDetails: InvestmentDetails;
  updateDetails: (details: Partial<InvestmentDetails>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export const ManagementOptions: React.FC<ManagementOptionsProps> = ({ 
  investmentDetails, 
  updateDetails, 
  onNextStep, 
  onPrevStep 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <div>
        <h3 className="text-2xl font-semibold mb-6">Gestion Locative</h3>
        <p className="text-gray-300 mb-8">
          Le choix du mode de gestion est la dernière étape clé pour optimiser votre investissement.
          Définissez comment vous souhaitez gérer votre bien.
        </p>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <Label htmlFor="management">Mode de gestion</Label>
            <Select 
              value={investmentDetails.management} 
              onValueChange={(value) => updateDetails({ management: value })}
            >
              <SelectTrigger className="bg-noir-dark border-mauve/20">
                <SelectValue placeholder="Choisir un mode de gestion" />
              </SelectTrigger>
              <SelectContent className="bg-noir-dark border-mauve/20">
                <SelectItem value="self">Gestion personnelle</SelectItem>
                <SelectItem value="agent">Agence immobilière</SelectItem>
                <SelectItem value="concierge">Service de conciergerie</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-12 flex space-x-4">
          <Button 
            variant="outline" 
            className="border-mauve text-mauve hover:bg-mauve hover:text-white"
            onClick={onPrevStep}
          >
            Retour
          </Button>
          
          <Button 
            className="bg-mauve hover:bg-mauve/80 text-white px-8"
            onClick={onNextStep}
            disabled={!investmentDetails.management}
          >
            Finaliser
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <Card className="bg-noir-dark border-mauve/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-medium text-lg">Impact du mode de gestion</h4>
              <div className="flex items-center">
                <Settings className="h-5 w-5 text-mauve mr-2" />
                <span className="text-mauve font-medium">
                  {investmentDetails.management === "self" 
                    ? "Contrôle maximal" 
                    : investmentDetails.management === "agent" 
                      ? "Gestion déléguée" 
                      : "Service premium"}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Coût de gestion</span>
                  <span className="font-medium">
                    {investmentDetails.management === "self" 
                      ? "0%" 
                      : investmentDetails.management === "agent" 
                        ? "5-8%" 
                        : "8-15%"}
                  </span>
                </div>
                <Progress 
                  value={
                    investmentDetails.management === "self" 
                      ? 0 
                      : investmentDetails.management === "agent" 
                        ? 40 
                        : 70
                  } 
                  className="h-2" 
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Temps personnel requis</span>
                  <span className="font-medium">
                    {investmentDetails.management === "self" 
                      ? "Élevé" 
                      : investmentDetails.management === "agent" 
                        ? "Modéré" 
                        : "Minimal"}
                  </span>
                </div>
                <Progress 
                  value={
                    investmentDetails.management === "self" 
                      ? 80 
                      : investmentDetails.management === "agent" 
                        ? 40 
                        : 20
                  }
                  className={`h-2 ${
                    investmentDetails.management === "self" 
                      ? "bg-red-500" 
                      : investmentDetails.management === "agent" 
                        ? "bg-yellow-500" 
                        : "bg-green-500"
                  }`}
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Qualité du service</span>
                  <span className="font-medium">
                    {investmentDetails.management === "self" 
                      ? "Variable" 
                      : investmentDetails.management === "agent" 
                        ? "Standard" 
                        : "Premium"}
                  </span>
                </div>
                <Progress 
                  value={
                    investmentDetails.management === "self" 
                      ? 50 
                      : investmentDetails.management === "agent" 
                        ? 65 
                        : 90
                  }
                  className="h-2"
                />
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-noir rounded-lg border border-mauve/10">
              <div className="flex items-start">
                <Lightbulb className="h-5 w-5 text-mauve mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">
                  {investmentDetails.management === "self" 
                    ? "La gestion personnelle maximise votre rentabilité mais demande du temps et des compétences spécifiques." 
                    : investmentDetails.management === "agent" 
                      ? "Une agence immobilière offre un bon équilibre entre coût et tranquillité d'esprit."
                      : "Un service de conciergerie est idéal pour la location saisonnière ou si vous êtes éloigné géographiquement."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-gradient-to-br from-noir to-[#2D243B] p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Settings className="h-6 w-6 text-mauve mr-3" />
            <h4 className="font-medium">Impact sur votre rentabilité</h4>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Revenus annuels bruts estimés</span>
              <span className="font-medium">13 200 €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Coûts de gestion</span>
              <span className="font-medium">
                {investmentDetails.management === "self" 
                  ? "0 €" 
                  : investmentDetails.management === "agent" 
                    ? "- 790 €" 
                    : "- 1 450 €"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Revenus nets après gestion</span>
              <span className="font-medium">
                {investmentDetails.management === "self" 
                  ? "13 200 €" 
                  : investmentDetails.management === "agent" 
                    ? "12 410 €" 
                    : "11 750 €"}
              </span>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-mauve/10">
            <div className="flex items-center">
              <Badge className={
                investmentDetails.management === "self" 
                  ? "bg-green-500" 
                  : investmentDetails.management === "agent" 
                    ? "bg-mauve" 
                    : "bg-mauve"
              }>
                {investmentDetails.management === "self" 
                  ? "Recommandation" 
                  : "Bon choix"}
              </Badge>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              {investmentDetails.management === "self" 
                ? "Idéal si vous habitez près du bien et avez du temps disponible." 
                : investmentDetails.management === "agent" 
                  ? "Solution optimale pour la majorité des investisseurs." 
                  : "Parfait pour la location saisonnière ou les propriétaires à distance."}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
