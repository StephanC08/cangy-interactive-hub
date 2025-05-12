
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Home, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { InvestmentDetails, LocationDetail, PropertyTypeDetail } from './types';

interface PropertySelectionProps {
  investmentDetails: InvestmentDetails;
  updateDetails: (details: Partial<InvestmentDetails>) => void;
  onNextStep: () => void;
}

// Available property locations
const locations: LocationDetail[] = [
  { value: "thonon", label: "Thonon-les-Bains", yield: 4.5, growth: 3.2, risk: 2 },
  { value: "evian", label: "Évian-les-Bains", yield: 4.2, growth: 3.8, risk: 2 },
  { value: "annemasse", label: "Annemasse", yield: 5.1, growth: 3.5, risk: 3 },
  { value: "annecy", label: "Annecy", yield: 3.8, growth: 4.2, risk: 1 },
  { value: "geneva", label: "Genève (Suisse)", yield: 3.5, growth: 4.5, risk: 1 },
];

// Available property types
const propertyTypes: PropertyTypeDetail[] = [
  { value: "apartment", label: "Appartement", yield: 4.5, risk: 2 },
  { value: "house", label: "Maison", yield: 4.0, risk: 2 },
  { value: "commercial", label: "Local commercial", yield: 6.0, risk: 3 },
  { value: "land", label: "Terrain à bâtir", yield: 3.0, risk: 4 },
];

export const PropertySelection: React.FC<PropertySelectionProps> = ({ 
  investmentDetails, 
  updateDetails, 
  onNextStep 
}) => {
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
