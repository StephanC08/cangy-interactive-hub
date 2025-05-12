
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Hammer, AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { InvestmentDetails } from './types';

interface StrategyOptionsProps {
  investmentDetails: InvestmentDetails;
  updateDetails: (details: Partial<InvestmentDetails>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export const StrategyOptions: React.FC<StrategyOptionsProps> = ({ 
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
        <h3 className="text-2xl font-semibold mb-6">Travaux & Stratégie</h3>
        <p className="text-gray-300 mb-8">
          La stratégie locative et les travaux éventuels peuvent considérablement influencer la rentabilité de votre investissement.
          Définissez votre approche.
        </p>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <Label htmlFor="strategy">Stratégie locative</Label>
            <Select 
              value={investmentDetails.strategy} 
              onValueChange={(value) => updateDetails({ strategy: value })}
            >
              <SelectTrigger className="bg-noir-dark border-mauve/20">
                <SelectValue placeholder="Choisir une stratégie" />
              </SelectTrigger>
              <SelectContent className="bg-noir-dark border-mauve/20">
                <SelectItem value="unfurnished">Location nue (longue durée)</SelectItem>
                <SelectItem value="furnished">Location meublée (moyenne durée)</SelectItem>
                <SelectItem value="seasonal">Location saisonnière (courte durée)</SelectItem>
                <SelectItem value="coliving">Colocation</SelectItem>
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
            disabled={!investmentDetails.strategy}
          >
            Continuer
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <Card className="bg-noir-dark border-mauve/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-medium text-lg">Impact sur la rentabilité</h4>
              <div className="flex items-center">
                <Hammer className="h-5 w-5 text-mauve mr-2" />
                <span className="text-mauve font-medium">
                  {investmentDetails.strategy === "unfurnished" ? "Stratégie sécurisée" : 
                   investmentDetails.strategy === "furnished" ? "Équilibre rentabilité/risque" : 
                   investmentDetails.strategy === "seasonal" ? "Haute rentabilité" : 
                   "Optimisation par m²"}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Rendement locatif</span>
                  <span className="font-medium">
                    {investmentDetails.strategy === "unfurnished" ? "3-4%" : 
                     investmentDetails.strategy === "furnished" ? "4-6%" : 
                     investmentDetails.strategy === "seasonal" ? "6-10%" : 
                     "5-7%"}
                  </span>
                </div>
                <Progress 
                  value={
                    investmentDetails.strategy === "unfurnished" ? 35 : 
                    investmentDetails.strategy === "furnished" ? 50 : 
                    investmentDetails.strategy === "seasonal" ? 80 : 
                    60
                  } 
                  className="h-2" 
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Risque locatif</span>
                  <span className="font-medium">
                    {investmentDetails.strategy === "unfurnished" ? "Faible" : 
                     investmentDetails.strategy === "furnished" ? "Modéré" : 
                     investmentDetails.strategy === "seasonal" ? "Élevé" : 
                     "Modéré"}
                  </span>
                </div>
                <Progress 
                  value={
                    investmentDetails.strategy === "unfurnished" ? 30 : 
                    investmentDetails.strategy === "furnished" ? 50 : 
                    investmentDetails.strategy === "seasonal" ? 80 : 
                    60
                  }
                  className={`h-2 ${
                    investmentDetails.strategy === "unfurnished" ? "bg-green-500" : 
                    investmentDetails.strategy === "furnished" ? "bg-yellow-500" : 
                    investmentDetails.strategy === "seasonal" ? "bg-red-500" : 
                    "bg-yellow-500"
                  }`}
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Charges de gestion</span>
                  <span className="font-medium">
                    {investmentDetails.strategy === "unfurnished" ? "Basses" : 
                     investmentDetails.strategy === "furnished" ? "Moyennes" : 
                     investmentDetails.strategy === "seasonal" ? "Hautes" : 
                     "Moyennes"}
                  </span>
                </div>
                <Progress 
                  value={
                    investmentDetails.strategy === "unfurnished" ? 30 : 
                    investmentDetails.strategy === "furnished" ? 50 : 
                    investmentDetails.strategy === "seasonal" ? 85 : 
                    60
                  }
                  className={`h-2 ${
                    investmentDetails.strategy === "unfurnished" ? "bg-green-500" : 
                    investmentDetails.strategy === "furnished" ? "bg-yellow-500" : 
                    investmentDetails.strategy === "seasonal" ? "bg-red-500" : 
                    "bg-yellow-500"
                  }`} 
                />
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-noir rounded-lg border border-mauve/10">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-mauve mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">
                  {investmentDetails.strategy === "unfurnished" 
                    ? "La location nue offre plus de sécurité mais une rentabilité moindre et moins d'avantages fiscaux." 
                    : investmentDetails.strategy === "furnished" 
                      ? "Le statut LMNP (Loueur Meublé Non Professionnel) vous permet d'optimiser votre fiscalité."
                      : investmentDetails.strategy === "seasonal"
                        ? "Attention aux réglementations locales sur la location saisonnière, variables selon les communes."
                        : "La colocation nécessite un aménagement spécifique mais optimise les revenus au m²."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-gradient-to-br from-noir to-[#2D243B] p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Home className="h-6 w-6 text-mauve mr-3" />
            <h4 className="font-medium">Simulation des revenus locatifs</h4>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Loyer mensuel potentiel</span>
              <span className="font-medium">
                {investmentDetails.strategy === "unfurnished" ? "900 €" : 
                 investmentDetails.strategy === "furnished" ? "1 100 €" : 
                 investmentDetails.strategy === "seasonal" ? "2 100 €*" : 
                 "1 500 €"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Charges non récupérables</span>
              <span className="font-medium">
                {investmentDetails.strategy === "unfurnished" ? "100 €" : 
                 investmentDetails.strategy === "furnished" ? "150 €" : 
                 investmentDetails.strategy === "seasonal" ? "350 €" : 
                 "200 €"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Taux d'occupation estimé</span>
              <span className="font-medium">
                {investmentDetails.strategy === "unfurnished" ? "95%" : 
                 investmentDetails.strategy === "furnished" ? "90%" : 
                 investmentDetails.strategy === "seasonal" ? "65%" : 
                 "90%"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Revenu net annuel estimé</span>
              <span className="font-medium">
                {investmentDetails.strategy === "unfurnished" ? "9 120 €" : 
                 investmentDetails.strategy === "furnished" ? "10 260 €" : 
                 investmentDetails.strategy === "seasonal" ? "13 650 €" : 
                 "14 040 €"}
              </span>
            </div>
          </div>
          
          {investmentDetails.strategy === "seasonal" && (
            <p className="text-xs text-gray-400 mt-4">* Équivalent mensuel basé sur des tarifs saisonniers variables</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
