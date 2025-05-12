
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Home, BankNote, Hammer, Settings, DollarSign, Percent, TrendingUp, AlertTriangle } from "lucide-react";
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Types for the investment simulation
interface InvestmentDetails {
  propertyType: string;
  location: string;
  financingMethod: string;
  loanYears: number;
  downPayment: number;
  strategy: string;
  management: string;
}

// Step 1 component for property type and location selection
const PropertySelection: React.FC<{ 
  investmentDetails: InvestmentDetails; 
  updateDetails: (details: Partial<InvestmentDetails>) => void;
  onNextStep: () => void;
}> = ({ investmentDetails, updateDetails, onNextStep }) => {
  const locations = [
    { value: "thonon", label: "Thonon-les-Bains", yield: 4.5, growth: 3.2, risk: 2 },
    { value: "evian", label: "Évian-les-Bains", yield: 4.2, growth: 3.8, risk: 2 },
    { value: "annemasse", label: "Annemasse", yield: 5.1, growth: 3.5, risk: 3 },
    { value: "annecy", label: "Annecy", yield: 3.8, growth: 4.2, risk: 1 },
    { value: "geneva", label: "Genève (Suisse)", yield: 3.5, growth: 4.5, risk: 1 },
  ];
  
  const propertyTypes = [
    { value: "apartment", label: "Appartement", yield: 4.5, risk: 2 },
    { value: "house", label: "Maison", yield: 4.0, risk: 2 },
    { value: "commercial", label: "Local commercial", yield: 6.0, risk: 3 },
    { value: "land", label: "Terrain à bâtir", yield: 3.0, risk: 4 },
  ];
  
  const getLocationDetails = () => {
    return locations.find(loc => loc.value === investmentDetails.location) || locations[0];
  };
  
  const getPropertyDetails = () => {
    return propertyTypes.find(prop => prop.value === investmentDetails.propertyType) || propertyTypes[0];
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <div>
        <h3 className="text-2xl font-semibold mb-6">Type de bien & Localisation</h3>
        <p className="text-gray-300 mb-8">
          Le choix du bien et de sa localisation est fondamental pour la réussite de votre investissement. 
          Sélectionnez les options qui correspondent à votre projet.
        </p>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <Label htmlFor="propertyType">Type de bien</Label>
            <Select 
              value={investmentDetails.propertyType} 
              onValueChange={(value) => updateDetails({ propertyType: value })}
            >
              <SelectTrigger className="bg-noir-dark border-mauve/20">
                <SelectValue placeholder="Choisir un type de bien" />
              </SelectTrigger>
              <SelectContent className="bg-noir-dark border-mauve/20">
                {propertyTypes.map(property => (
                  <SelectItem key={property.value} value={property.value}>
                    {property.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="location">Localisation</Label>
            <Select 
              value={investmentDetails.location} 
              onValueChange={(value) => updateDetails({ location: value })}
            >
              <SelectTrigger className="bg-noir-dark border-mauve/20">
                <SelectValue placeholder="Choisir une localisation" />
              </SelectTrigger>
              <SelectContent className="bg-noir-dark border-mauve/20">
                {locations.map(location => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-12">
          <Button 
            className="bg-mauve hover:bg-mauve/80 text-white px-8"
            onClick={onNextStep}
            disabled={!investmentDetails.propertyType || !investmentDetails.location}
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
              <h4 className="font-medium text-lg">Potentiel d'investissement</h4>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-mauve mr-2" />
                <span className="text-mauve font-medium">
                  {getLocationDetails().yield + getPropertyDetails().yield / 2}% ROI
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Rendement locatif</span>
                  <span className="font-medium">{getPropertyDetails().yield}%</span>
                </div>
                <Progress value={getPropertyDetails().yield * 100 / 8} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Croissance immobilière</span>
                  <span className="font-medium">{getLocationDetails().growth}%/an</span>
                </div>
                <Progress value={getLocationDetails().growth * 100 / 5} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Niveau de risque</span>
                  <span className="font-medium">{(getPropertyDetails().risk + getLocationDetails().risk) / 2}/5</span>
                </div>
                <Progress 
                  value={(getPropertyDetails().risk + getLocationDetails().risk) / 2 * 100 / 5} 
                  className={`h-2 ${(getPropertyDetails().risk + getLocationDetails().risk) / 2 > 3 ? 'bg-red-500' : 'bg-green-500'}`} 
                />
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-noir rounded-lg border border-mauve/10">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-mauve mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-300 text-sm">
                  {investmentDetails.location === "geneva" 
                    ? "L'investissement en Suisse est soumis à des règles particulières pour les non-résidents. Une consultation juridique sera nécessaire." 
                    : investmentDetails.propertyType === "commercial" 
                      ? "Les locaux commerciaux offrent des rendements plus élevés mais comportent aussi plus de risques de vacance locative."
                      : "Pour maximiser votre rentabilité dans cette zone, envisagez une stratégie locative saisonnière ou moyenne durée."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-gradient-to-br from-noir to-[#2D243B] p-6 rounded-lg">
          <div className="flex items-center">
            <Home className="h-6 w-6 text-mauve mr-3" />
            <h4 className="font-medium">Carte du marché immobilier</h4>
          </div>
          
          {investmentDetails.location && (
            <div className="mt-4 aspect-video bg-noir-dark rounded-lg border border-mauve/20 relative overflow-hidden">
              <div className="absolute inset-0 opacity-70 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Thonon-les-Bains,France&zoom=10&size=600x300&maptype=roadmap&key=NO_API_KEY')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-noir to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <Badge className="bg-mauve mb-2">
                  {getLocationDetails().label}
                </Badge>
                <div className="text-white text-sm flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Prix moyen: 
                  {investmentDetails.location === "evian" 
                    ? " 4 800 €/m²" 
                    : investmentDetails.location === "thonon" 
                      ? " 3 950 €/m²" 
                      : investmentDetails.location === "annemasse"
                        ? " 3 600 €/m²"
                        : investmentDetails.location === "annecy"
                          ? " 5 200 €/m²"
                          : " 11 500 €/m²"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Step 2 component for financing options
const FinancingOptions: React.FC<{ 
  investmentDetails: InvestmentDetails; 
  updateDetails: (details: Partial<InvestmentDetails>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}> = ({ investmentDetails, updateDetails, onNextStep, onPrevStep }) => {
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
                <BankNote className="h-5 w-5 text-mauve mr-2" />
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

// Step 3 component for property strategy
const StrategyOptions: React.FC<{ 
  investmentDetails: InvestmentDetails; 
  updateDetails: (details: Partial<InvestmentDetails>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}> = ({ investmentDetails, updateDetails, onNextStep, onPrevStep }) => {
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

// Step 4 component for property management
const ManagementOptions: React.FC<{ 
  investmentDetails: InvestmentDetails; 
  updateDetails: (details: Partial<InvestmentDetails>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}> = ({ investmentDetails, updateDetails, onNextStep, onPrevStep }) => {
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
            Voir les résultats
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <Card className="bg-noir-dark border-mauve/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-medium text-lg">Impact sur la gestion</h4>
              <div className="flex items-center">
                <Settings className="h-5 w-5 text-mauve mr-2" />
                <span className="text-mauve font-medium">
                  {investmentDetails.management === "self" ? "Maximisation des revenus" : 
                   investmentDetails.management === "agent" ? "Sécurité et tranquillité" : 
                   "Service premium"}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Coût de gestion</span>
                  <span className="font-medium">
                    {investmentDetails.management === "self" ? "0%" : 
                     investmentDetails.management === "agent" ? "7-8%" : 
                     "15-25%"}
                  </span>
                </div>
                <Progress 
                  value={
                    investmentDetails.management === "self" ? 0 : 
                    investmentDetails.management === "agent" ? 35 : 
                    75
                  } 
                  className="h-2" 
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Temps nécessaire</span>
                  <span className="font-medium">
                    {investmentDetails.management === "self" ? "Élevé" : 
                     investmentDetails.management === "agent" ? "Modéré" : 
                     "Minimal"}
                  </span>
                </div>
                <Progress 
                  value={
                    investmentDetails.management === "self" ? 85 : 
                    investmentDetails.management === "agent" ? 40 : 
                    15
                  }
                  className={`h-2 ${
                    investmentDetails.management === "self" ? "bg-red-500" : 
                    investmentDetails.management === "agent" ? "bg-yellow-500" : 
                    "bg-green-500"
                  }`}
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Niveau de service</span>
                  <span className="font-medium">
                    {investmentDetails.management === "self" ? "Variable" : 
                     investmentDetails.management === "agent" ? "Standard" : 
                     "Premium"}
                  </span>
                </div>
                <Progress 
                  value={
                    investmentDetails.management === "self" ? 50 : 
                    investmentDetails.management === "agent" ? 75 : 
                    95
                  }
                  className="h-2"
                />
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-noir rounded-lg border border-mauve/10">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-mauve mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">
                  {investmentDetails.management === "self" 
                    ? "La gestion personnelle demande du temps et des compétences, mais optimise votre rentabilité." 
                    : investmentDetails.management === "agent" 
                      ? "L'agence s'occupe du quotidien mais prélève une commission sur les loyers perçus."
                      : "La conciergerie offre un service complet idéal pour la location saisonnière, malgré un coût plus élevé."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-gradient-to-br from-noir to-[#2D243B] p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <DollarSign className="h-6 w-6 text-mauve mr-3" />
            <h4 className="font-medium">Impact financier annuel</h4>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Revenu locatif brut</span>
              <span className="font-medium">
                {investmentDetails.strategy === "unfurnished" ? "10 800 €" : 
                 investmentDetails.strategy === "furnished" ? "13 200 €" : 
                 investmentDetails.strategy === "seasonal" ? "16 380 €" : 
                 "18 000 €"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Frais de gestion</span>
              <span className="font-medium">
                {investmentDetails.management === "self" ? "0 €" : 
                 investmentDetails.management === "agent" 
                  ? (investmentDetails.strategy === "unfurnished" ? "810 €" : 
                     investmentDetails.strategy === "furnished" ? "990 €" : 
                     investmentDetails.strategy === "seasonal" ? "1 230 €" : 
                     "1 350 €")
                  : (investmentDetails.strategy === "unfurnished" ? "1 620 €" : 
                     investmentDetails.strategy === "furnished" ? "1 980 €" : 
                     investmentDetails.strategy === "seasonal" ? "3 276 €" : 
                     "2 700 €")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Temps nécessaire (heures/mois)</span>
              <span className="font-medium">
                {investmentDetails.management === "self" 
                  ? (investmentDetails.strategy === "unfurnished" ? "5-8h" : 
                     investmentDetails.strategy === "furnished" ? "8-12h" : 
                     investmentDetails.strategy === "seasonal" ? "15-25h" : 
                     "10-15h")
                  : investmentDetails.management === "agent" 
                    ? "1-2h" 
                    : "< 1h"}
              </span>
            </div>
            <div className="border-t border-mauve/20 my-2 pt-2"></div>
            <div className="flex justify-between font-medium">
              <span>Rentabilité nette estimée</span>
              <span className="text-mauve">
                {((investmentDetails.strategy === "unfurnished" 
                    ? 9120 
                    : investmentDetails.strategy === "furnished" 
                      ? 10260 
                      : investmentDetails.strategy === "seasonal" 
                        ? 13650 
                        : 14040) -
                  (investmentDetails.management === "self" 
                    ? 0 
                    : investmentDetails.management === "agent" 
                      ? (investmentDetails.strategy === "unfurnished" ? 810 : 
                         investmentDetails.strategy === "furnished" ? 990 : 
                         investmentDetails.strategy === "seasonal" ? 1230 : 
                         1350)
                      : (investmentDetails.strategy === "unfurnished" ? 1620 : 
                         investmentDetails.strategy === "furnished" ? 1980 : 
                         investmentDetails.strategy === "seasonal" ? 3276 : 
                         2700))) / 300000 * 100}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Results component
const InvestmentResults: React.FC<{ 
  investmentDetails: InvestmentDetails;
  onRestart: () => void;
}> = ({ investmentDetails, onRestart }) => {
  // Calculate investment score based on various factors
  const calculateScore = () => {
    let score = 65; // Base score
    
    // Property location
    if (investmentDetails.location === "thonon") score += 5;
    else if (investmentDetails.location === "evian") score += 8;
    else if (investmentDetails.location === "annemasse") score += 7;
    else if (investmentDetails.location === "annecy") score += 10;
    else if (investmentDetails.location === "geneva") score += 12;
    
    // Property type
    if (investmentDetails.propertyType === "apartment") score += 7;
    else if (investmentDetails.propertyType === "house") score += 5;
    else if (investmentDetails.propertyType === "commercial") score += 3;
    else if (investmentDetails.propertyType === "land") score -= 5;
    
    // Financing
    if (investmentDetails.financingMethod === "mortgage") {
      if (investmentDetails.downPayment <= 15) score -= 3;
      else if (investmentDetails.downPayment >= 30) score += 5;
      
      if (investmentDetails.loanYears <= 15) score += 3;
      else if (investmentDetails.loanYears >= 25) score -= 2;
    } else {
      score -= 8; // Cash purchase reduces leverage effect
    }
    
    // Strategy
    if (investmentDetails.strategy === "unfurnished") score += 2;
    else if (investmentDetails.strategy === "furnished") score += 5;
    else if (investmentDetails.strategy === "seasonal") score += 8;
    else if (investmentDetails.strategy === "coliving") score += 10;
    
    // Management
    if (investmentDetails.management === "self") score += 5;
    else if (investmentDetails.management === "agent") score += 2;
    else score -= 2;
    
    // Ensure score stays within 0-100 range
    return Math.min(100, Math.max(0, score));
  };

  const score = calculateScore();
  
  const getInvestorProfile = () => {
    if (score >= 85) return "Investisseur Stratégique";
    else if (score >= 75) return "Optimisateur Immobilier";
    else if (score >= 65) return "Bâtisseur de Patrimoine";
    else return "Investisseur Prudent";
  };
  
  const getScoreColor = () => {
    if (score >= 85) return "text-green-500";
    else if (score >= 70) return "text-yellow-500";
    else return "text-orange-500";
  };
  
  const getStrengths = () => {
    const strengths = [];
    
    if (investmentDetails.location === "annecy" || investmentDetails.location === "evian" || investmentDetails.location === "geneva") {
      strengths.push("Localisation premium à fort potentiel");
    }
    
    if (investmentDetails.financingMethod === "mortgage" && investmentDetails.downPayment <= 20) {
      strengths.push("Bon effet de levier financier");
    }
    
    if (investmentDetails.strategy === "seasonal" || investmentDetails.strategy === "coliving") {
      strengths.push("Stratégie locative à forte rentabilité");
    }
    
    if (investmentDetails.management === "self" && (investmentDetails.strategy === "unfurnished" || investmentDetails.strategy === "furnished")) {
      strengths.push("Coûts de gestion optimisés");
    }
    
    if (strengths.length === 0) {
      strengths.push("Approche équilibrée et diversifiée");
    }
    
    return strengths;
  };
  
  const getWeaknesses = () => {
    const weaknesses = [];
    
    if (investmentDetails.propertyType === "commercial" || investmentDetails.propertyType === "land") {
      weaknesses.push("Investissement plus risqué que le résidentiel");
    }
    
    if (investmentDetails.financingMethod === "cash") {
      weaknesses.push("Absence d'effet de levier financier");
    }
    
    if (investmentDetails.strategy === "seasonal" && investmentDetails.management !== "concierge") {
      weaknesses.push("Location saisonnière exigeante en gestion");
    }
    
    if (investmentDetails.management === "concierge") {
      weaknesses.push("Coûts de gestion élevés réduisant la rentabilité");
    }
    
    if (weaknesses.length === 0) {
      weaknesses.push("Aucune faiblesse majeure identifiée");
    }
    
    return weaknesses;
  };
  
  const getRecommendations = () => {
    const recommendations = [];
    
    if (investmentDetails.propertyType === "land") {
      recommendations.push("Étude préalable des règles d'urbanisme et du potentiel constructible");
    }
    
    if (investmentDetails.financingMethod === "mortgage" && investmentDetails.downPayment < 20) {
      recommendations.push("Négocier les meilleures conditions de prêt avec plusieurs établissements");
    }
    
    if (investmentDetails.strategy === "seasonal" || investmentDetails.strategy === "coliving") {
      recommendations.push("Vérifier les réglementations locales spécifiques à ce type de location");
    }
    
    if (investmentDetails.management === "self" && investmentDetails.strategy !== "unfurnished") {
      recommendations.push("Se former aux spécificités de gestion de ce type de location");
    }
    
    recommendations.push("Consultation avec un expert pour affiner votre stratégie d'investissement");
    
    return recommendations;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-noir-dark border border-mauve/30 rounded-lg overflow-hidden mb-12">
        <div className="bg-gradient-to-r from-mauve/20 to-noir-dark p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Votre Mission Rentabilité</h3>
              <p className="text-gray-300">Profil et analyse de votre stratégie d'investissement</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="h-20 w-20 rounded-full bg-noir flex items-center justify-center border-4 border-mauve relative">
                <span className={`text-2xl font-bold ${getScoreColor()}`}>{score}</span>
                <span className="text-xs absolute -bottom-1">score</span>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-mauve/20 rounded-full p-2 mr-3">
                <Home className="h-5 w-5 text-mauve" />
              </div>
              <h4 className="text-xl font-medium">Profil investisseur : {getInvestorProfile()}</h4>
            </div>
            <p className="text-gray-300">
              {score >= 85 
                ? "Vous avez élaboré une stratégie d'investissement très prometteuse avec un excellent équilibre entre rentabilité et risque."
                : score >= 75 
                  ? "Votre approche montre une bonne compréhension des mécanismes d'optimisation de la rentabilité immobilière."
                  : score >= 65 
                    ? "Vous avez construit une stratégie solide qui pourrait être optimisée sur certains aspects pour maximiser sa performance."
                    : "Votre approche privilégie la sécurité, ce qui est respectable, mais pourrait limiter votre potentiel de rentabilité."}
            </p>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-medium mb-4 flex items-center">
                <div className="bg-green-500/10 rounded-full p-1 mr-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                Points forts de votre stratégie
              </h4>
              <ul className="space-y-3">
                {getStrengths().map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-green-500/10 rounded-full p-1 mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-gray-300">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 flex items-center">
                <div className="bg-orange-500/10 rounded-full p-1 mr-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </div>
                Points d'attention
              </h4>
              <ul className="space-y-3">
                {getWeaknesses().map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-orange-500/10 rounded-full p-1 mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                    </div>
                    <span className="text-gray-300">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-noir rounded-lg p-6 border border-mauve/10 mb-8">
            <h4 className="font-medium mb-4 flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-mauve" /> 
              Recommandations personnalisées
            </h4>
            <ul className="space-y-3">
              {getRecommendations().map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-mauve/10 rounded-full p-1 mr-3 mt-1">
                    <ArrowRight className="h-3 w-3 text-mauve" />
                  </div>
                  <span className="text-gray-300">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-noir to-[#2D243B] p-6 rounded-lg">
            <h4 className="font-medium mb-4">Analyse financière</h4>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Rentabilité brute estimée</span>
                <span className="font-medium">{score >= 80 ? "6-9%" : score >= 70 ? "5-7%" : "3-5%"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Potentiel de valorisation</span>
                <span className="font-medium">{investmentDetails.location === "annecy" || investmentDetails.location === "geneva" ? "Élevé" : "Modéré"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Équilibre risque/rendement</span>
                <span className="font-medium">{score >= 80 ? "Optimal" : score >= 70 ? "Bon" : "Prudent"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <Button 
          onClick={onRestart}
          variant="outline"
          className="border-mauve text-mauve hover:bg-mauve hover:text-white"
        >
          Recommencer la simulation
        </Button>
        
        <Button 
          className="bg-mauve hover:bg-mauve/80 text-white"
          asChild
        >
          <Link to="/immobilier" className="flex items-center">
            Réserver votre audit immobilier <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

const MissionRentabilite = () => {
  const { toast } = useToast();
  const [investmentDetails, setInvestmentDetails] = useState<InvestmentDetails>({
    propertyType: "apartment",
    location: "thonon",
    financingMethod: "mortgage",
    loanYears: 20,
    downPayment: 20,
    strategy: "furnished",
    management: "agent",
  });
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Mission Rentabilité | Stephan CANGY';
  }, [step]);

  const updateDetails = (details: Partial<InvestmentDetails>) => {
    setInvestmentDetails({ ...investmentDetails, ...details });
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setCompleted(true);
      toast({
        title: "Analyse d'investissement complétée !",
        description: "Découvrez votre profil d'investisseur et nos recommandations.",
      });
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleRestart = () => {
    setInvestmentDetails({
      propertyType: "apartment",
      location: "thonon",
      financingMethod: "mortgage",
      loanYears: 20,
      downPayment: 20,
      strategy: "furnished",
      management: "agent",
    });
    setStep(0);
    setCompleted(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-noir text-white">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Mission Rentabilité</h1>
            <p className="text-xl text-gray-300">
              Construisez et optimisez votre stratégie d'investissement immobilier
            </p>
          </motion.div>
          
          {/* Progress steps */}
          {!completed && (
            <div className="max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-between mb-2">
                <div 
                  className={`flex items-center ${step >= 0 ? "text-mauve" : "text-gray-500"}`}
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${step >= 0 ? "border-mauve bg-mauve/10" : "border-gray-500"} mr-3`}>
                    <Home className="h-5 w-5" />
                  </div>
                  <span className="hidden md:block">Bien immobilier</span>
                </div>
                <div className={`flex-1 h-0.5 mx-2 ${step >= 1 ? "bg-mauve" : "bg-gray-700"}`}></div>
                <div 
                  className={`flex items-center ${step >= 1 ? "text-mauve" : "text-gray-500"}`}
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-mauve bg-mauve/10" : "border-gray-500"} mr-3`}>
                    <BankNote className="h-5 w-5" />
                  </div>
                  <span className="hidden md:block">Financement</span>
                </div>
                <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? "bg-mauve" : "bg-gray-700"}`}></div>
                <div 
                  className={`flex items-center ${step >= 2 ? "text-mauve" : "text-gray-500"}`}
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-mauve bg-mauve/10" : "border-gray-500"} mr-3`}>
                    <Hammer className="h-5 w-5" />
                  </div>
                  <span className="hidden md:block">Stratégie</span>
                </div>
                <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? "bg-mauve" : "bg-gray-700"}`}></div>
                <div 
                  className={`flex items-center ${step >= 3 ? "text-mauve" : "text-gray-500"}`}
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? "border-mauve bg-mauve/10" : "border-gray-500"} mr-3`}>
                    <Settings className="h-5 w-5" />
                  </div>
                  <span className="hidden md:block">Gestion</span>
                </div>
              </div>
            </div>
          )}

          {/* Main content area */}
          <div className="px-0 md:px-6 mb-16">
            <AnimatePresence mode="wait">
              {!completed ? (
                <>
                  {step === 0 && (
                    <PropertySelection 
                      key="step-1"
                      investmentDetails={investmentDetails}
                      updateDetails={updateDetails}
                      onNextStep={handleNextStep}
                    />
                  )}
                  
                  {step === 1 && (
                    <FinancingOptions 
                      key="step-2"
                      investmentDetails={investmentDetails}
                      updateDetails={updateDetails}
                      onNextStep={handleNextStep}
                      onPrevStep={handlePrevStep}
                    />
                  )}
                  
                  {step === 2 && (
                    <StrategyOptions 
                      key="step-3"
                      investmentDetails={investmentDetails}
                      updateDetails={updateDetails}
                      onNextStep={handleNextStep}
                      onPrevStep={handlePrevStep}
                    />
                  )}
                  
                  {step === 3 && (
                    <ManagementOptions 
                      key="step-4"
                      investmentDetails={investmentDetails}
                      updateDetails={updateDetails}
                      onNextStep={handleNextStep}
                      onPrevStep={handlePrevStep}
                    />
                  )}
                </>
              ) : (
                <InvestmentResults 
                  key="results"
                  investmentDetails={investmentDetails}
                  onRestart={handleRestart}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MissionRentabilite;
