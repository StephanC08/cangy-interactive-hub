
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Banknote, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { InvestmentDetails } from './types';

interface FinancingOptionsProps {
  investmentDetails: InvestmentDetails;
  updateDetails: (details: Partial<InvestmentDetails>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export const FinancingOptions: React.FC<FinancingOptionsProps> = ({ 
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
        <h3 className="text-2xl font-semibold mb-6">Montage Financier</h3>
        <p className="text-gray-300 mb-8">
          L'optimisation de votre financement est essentielle pour maximiser le rendement de votre investissement.
          Définissez votre stratégie financière.
        </p>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <Label htmlFor="financingMethod">Méthode de financement</Label>
            <Tabs
              defaultValue={investmentDetails.financingMethod}
              onValueChange={(value) => updateDetails({ financingMethod: value })}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-full bg-noir">
                <TabsTrigger 
                  value="mortgage"
                  className="data-[state=active]:bg-mauve data-[state=active]:text-white"
                >
                  Crédit immobilier
                </TabsTrigger>
                <TabsTrigger 
                  value="cash"
                  className="data-[state=active]:bg-mauve data-[state=active]:text-white"
                >
                  Achat comptant
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {investmentDetails.financingMethod === "mortgage" && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="loanYears">Durée du crédit: {investmentDetails.loanYears} ans</Label>
                  <span className="text-mauve">
                    {investmentDetails.loanYears <= 15 ? "Court" : investmentDetails.loanYears <= 20 ? "Moyen" : "Long"}
                  </span>
                </div>
                <Slider
                  id="loanYears"
                  value={[investmentDetails.loanYears]}
                  min={5}
                  max={30}
                  step={1}
                  onValueChange={(value) => updateDetails({ loanYears: value[0] })}
                  className="py-4"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="downPayment">Apport: {investmentDetails.downPayment}%</Label>
                  <span className="text-mauve">
                    {investmentDetails.downPayment <= 15 ? "Minimum" : investmentDetails.downPayment <= 30 ? "Recommandé" : "Élevé"}
                  </span>
                </div>
                <Slider
                  id="downPayment"
                  value={[investmentDetails.downPayment]}
                  min={10}
                  max={50}
                  step={5}
                  onValueChange={(value) => updateDetails({ downPayment: value[0] })}
                  className="py-4"
                />
              </div>
            </>
          )}
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
            disabled={!investmentDetails.financingMethod}
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
              <h4 className="font-medium text-lg">Impact financier</h4>
              <div className="flex items-center">
                <Banknote className="h-5 w-5 text-mauve mr-2" />
                <span className="text-mauve font-medium">
                  {investmentDetails.financingMethod === "mortgage" 
                    ? `Effet de levier × ${Math.round(100 / investmentDetails.downPayment * 10) / 10}`
                    : "Pas d'effet de levier"}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Taux d'intérêt estimé</span>
                  <span className="font-medium">
                    {investmentDetails.financingMethod === "mortgage" 
                      ? investmentDetails.loanYears <= 15 
                        ? "2.8%" 
                        : investmentDetails.loanYears <= 25 
                          ? "3.1%" 
                          : "3.4%"
                      : "N/A"}
                  </span>
                </div>
                {investmentDetails.financingMethod === "mortgage" && (
                  <Progress 
                    value={
                      investmentDetails.loanYears <= 15 
                        ? 55 
                        : investmentDetails.loanYears <= 25 
                          ? 65 
                          : 75
                    } 
                    className="h-2" 
                  />
                )}
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Capacité d'endettement</span>
                  <span className="font-medium">
                    {investmentDetails.financingMethod === "mortgage" 
                      ? investmentDetails.downPayment >= 30 
                        ? "Excellente" 
                        : investmentDetails.downPayment >= 20 
                          ? "Bonne" 
                          : "Limitée"
                      : "Maximale"}
                  </span>
                </div>
                <Progress 
                  value={
                    investmentDetails.financingMethod === "mortgage" 
                      ? investmentDetails.downPayment >= 30 
                        ? 90 
                        : investmentDetails.downPayment >= 20 
                          ? 70 
                          : 50
                      : 100
                  } 
                  className="h-2" 
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Rentabilité nette</span>
                  <span className="font-medium">
                    {investmentDetails.financingMethod === "mortgage" 
                      ? investmentDetails.downPayment <= 20 
                        ? "8-12%" 
                        : "5-8%"
                      : "3-5%"}
                  </span>
                </div>
                <Progress 
                  value={
                    investmentDetails.financingMethod === "mortgage" 
                      ? investmentDetails.downPayment <= 20 
                        ? 85 
                        : 60
                      : 40
                  } 
                  className="h-2" 
                />
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-noir rounded-lg border border-mauve/10">
              <div className="flex items-start">
                <Percent className="h-5 w-5 text-mauve mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">
                  {investmentDetails.financingMethod === "mortgage" 
                    ? investmentDetails.downPayment < 20
                      ? "Attention: un apport inférieur à 20% peut entraîner des frais supplémentaires et des conditions moins favorables."
                      : investmentDetails.loanYears > 25
                        ? "Une durée de crédit longue augmente le coût total mais améliore votre cashflow mensuel."
                        : "Votre montage est bien équilibré entre durée et apport personnel."
                    : "L'achat comptant élimine les frais financiers mais limite votre pouvoir d'achat et l'effet de levier."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-gradient-to-br from-noir to-[#2D243B] p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <DollarSign className="h-6 w-6 text-mauve mr-3" />
            <h4 className="font-medium">Simulation financière</h4>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Valeur du bien estimée</span>
              <span className="font-medium">300 000 €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Apport personnel</span>
              <span className="font-medium">
                {investmentDetails.financingMethod === "mortgage" 
                  ? `${(300000 * investmentDetails.downPayment / 100).toLocaleString()} €` 
                  : "300 000 €"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Montant du crédit</span>
              <span className="font-medium">
                {investmentDetails.financingMethod === "mortgage" 
                  ? `${(300000 * (1 - investmentDetails.downPayment / 100)).toLocaleString()} €` 
                  : "0 €"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Mensualité estimée</span>
              <span className="font-medium">
                {investmentDetails.financingMethod === "mortgage" 
                  ? `${Math.round((300000 * (1 - investmentDetails.downPayment / 100)) * (investmentDetails.loanYears <= 15 ? 0.003 : investmentDetails.loanYears <= 25 ? 0.0033 : 0.0036)).toLocaleString()} €` 
                  : "0 €"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Add DollarSign to the import list
import { DollarSign } from "lucide-react";
