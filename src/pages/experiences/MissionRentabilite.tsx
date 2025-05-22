
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from 'react-router-dom';
import { InvestmentDetails } from '@/components/mission-rentabilite/types';
import { PropertySelection } from '@/components/mission-rentabilite/PropertySelection';
import { FinancingOptions } from '@/components/mission-rentabilite/FinancingOptions';
import { StrategyOptions } from '@/components/mission-rentabilite/StrategyOptions';
import { ManagementOptions } from '@/components/mission-rentabilite/ManagementOptions';
import { ResultSummary } from '@/components/mission-rentabilite/ResultSummary';

const MissionRentabilite: React.FC = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [investmentDetails, setInvestmentDetails] = useState<InvestmentDetails>({
    propertyType: "apartment",
    location: "thonon",
    financingMethod: "mortgage",
    loanYears: 20,
    downPayment: 20,
    strategy: "furnished",
    management: "agent"
  });

  const totalSteps = 5;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Mission Rentabilité | Stephan CANGY";
  }, [step]);

  const updateInvestmentDetails = (details: Partial<InvestmentDetails>) => {
    setInvestmentDetails(prev => ({ ...prev, ...details }));
  };

  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      
      // Show toast when progressing through steps
      if (step === 1) {
        toast({
          title: "Excellent choix!",
          description: "La localisation est un facteur clé de réussite.",
        });
      } else if (step === 3) {
        toast({
          title: "Stratégie bien pensée!",
          description: "Vous maximisez votre potentiel locatif.",
        });
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const restartSimulation = () => {
    setStep(1);
    setInvestmentDetails({
      propertyType: "apartment",
      location: "thonon",
      financingMethod: "mortgage",
      loanYears: 20,
      downPayment: 20,
      strategy: "furnished",
      management: "agent"
    });
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-noir min-h-screen text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Mission Rentabilité</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez les mécanismes de l'investissement immobilier rentable et simulez votre projet pas à pas.
          </p>
          
          {step < totalSteps && (
            <div className="mt-8 flex flex-col items-center">
              <div className="flex items-center justify-between w-full max-w-md mb-2">
                <span className="text-xs text-gray-400">Choix du bien</span>
                <span className="text-xs text-gray-400">Résultats</span>
              </div>
              <div className="w-full max-w-md h-2 bg-noir-dark rounded-full overflow-hidden">
                <div 
                  className="h-full bg-mauve transition-all duration-500 ease-out"
                  style={{ width: `${(step / (totalSteps - 1)) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between w-full max-w-md mt-2">
                <span className="text-sm">Étape {step}/{totalSteps-1}</span>
                <span className="text-sm text-mauve">{(step / (totalSteps - 1) * 100).toFixed(0)}%</span>
              </div>
            </div>
          )}
        </div>
        
        <AnimatePresence mode="wait">
          {step === 1 && (
            <PropertySelection 
              key="step1"
              investmentDetails={investmentDetails}
              updateDetails={updateInvestmentDetails}
              onNextStep={handleNextStep}
            />
          )}
          
          {step === 2 && (
            <FinancingOptions
              key="step2"
              investmentDetails={investmentDetails}
              updateDetails={updateInvestmentDetails}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
            />
          )}
          
          {step === 3 && (
            <StrategyOptions
              key="step3"
              investmentDetails={investmentDetails}
              updateDetails={updateInvestmentDetails}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
            />
          )}
          
          {step === 4 && (
            <ManagementOptions
              key="step4"
              investmentDetails={investmentDetails}
              updateDetails={updateInvestmentDetails}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
            />
          )}
          
          {step === 5 && (
            <ResultSummary
              key="step5"
              investmentDetails={investmentDetails}
              onRestart={restartSimulation}
            />
          )}
        </AnimatePresence>
      </div>
      
      <Footer />
    </div>
  );
};

export default MissionRentabilite;
