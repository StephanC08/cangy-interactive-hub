
import React from 'react';
import { motion } from 'framer-motion';
import { Home, TrendingUp, Banknote, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { InvestmentDetails } from './types';
import { Link } from 'react-router-dom';

interface ResultSummaryProps {
  investmentDetails: InvestmentDetails;
  onRestart: () => void;
}

export const ResultSummary: React.FC<ResultSummaryProps> = ({ 
  investmentDetails, 
  onRestart 
}) => {
  // Calculate investment score
  const calculateScore = (): number => {
    let score = 70;
    
    // Property type and location impact
    if (investmentDetails.propertyType === "commercial") score += 5;
    if (investmentDetails.location === "annecy" || investmentDetails.location === "geneva") score += 5;
    
    // Financing impact
    if (investmentDetails.financingMethod === "mortgage" && investmentDetails.downPayment >= 20) score += 8;
    if (investmentDetails.financingMethod === "mortgage" && investmentDetails.loanYears <= 20) score += 5;
    
    // Strategy impact
    if (investmentDetails.strategy === "furnished" || investmentDetails.strategy === "coliving") score += 7;
    if (investmentDetails.strategy === "seasonal") score += 10;
    
    // Management impact
    if (investmentDetails.management === "agent") score += 5;
    
    return Math.min(score, 100);
  };
  
  const score = calculateScore();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h3 className="text-3xl font-semibold mb-3">Votre Profil Investisseur</h3>
        <p className="text-gray-300 max-w-2xl mx-auto">
          En fonction des choix que vous avez faits, voici une analyse de votre stratégie d'investissement
          et de son potentiel de rentabilité.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="bg-noir-dark border-mauve/20 overflow-hidden">
            <div className="bg-gradient-to-r from-mauve to-[#7E69AB] p-6 text-white">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-xl">Score de rentabilité</h4>
                <Badge className="bg-white text-mauve">{score}/100</Badge>
              </div>
              <Progress value={score} className="h-2 mt-4 bg-white/20" />
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="inline-block p-2 bg-noir-light rounded-full mr-4">
                    <Home className="h-5 w-5 text-mauve" />
                  </span>
                  <div>
                    <h5 className="font-medium mb-1">Bien & Localisation</h5>
                    <p className="text-gray-300 text-sm">
                      {investmentDetails.propertyType === "apartment" 
                        ? "Appartement" 
                        : investmentDetails.propertyType === "house" 
                          ? "Maison" 
                          : investmentDetails.propertyType === "commercial" 
                            ? "Local commercial" 
                            : "Terrain"} à {
                      investmentDetails.location === "thonon" 
                        ? "Thonon-les-Bains" 
                        : investmentDetails.location === "evian" 
                          ? "Évian-les-Bains" 
                          : investmentDetails.location === "annemasse" 
                            ? "Annemasse" 
                            : investmentDetails.location === "annecy" 
                              ? "Annecy" 
                              : "Genève"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="inline-block p-2 bg-noir-light rounded-full mr-4">
                    <Banknote className="h-5 w-5 text-mauve" />
                  </span>
                  <div>
                    <h5 className="font-medium mb-1">Montage Financier</h5>
                    <p className="text-gray-300 text-sm">
                      {investmentDetails.financingMethod === "mortgage" 
                        ? `Crédit sur ${investmentDetails.loanYears} ans avec ${investmentDetails.downPayment}% d'apport` 
                        : "Achat au comptant"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="inline-block p-2 bg-noir-light rounded-full mr-4">
                    <TrendingUp className="h-5 w-5 text-mauve" />
                  </span>
                  <div>
                    <h5 className="font-medium mb-1">Stratégie Locative</h5>
                    <p className="text-gray-300 text-sm">
                      {investmentDetails.strategy === "unfurnished" 
                        ? "Location nue (longue durée)" 
                        : investmentDetails.strategy === "furnished" 
                          ? "Location meublée (moyenne durée)" 
                          : investmentDetails.strategy === "seasonal" 
                            ? "Location saisonnière (courte durée)" 
                            : "Colocation"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="inline-block p-2 bg-noir-light rounded-full mr-4">
                    <Settings className="h-5 w-5 text-mauve" />
                  </span>
                  <div>
                    <h5 className="font-medium mb-1">Gestion</h5>
                    <p className="text-gray-300 text-sm">
                      {investmentDetails.management === "self" 
                        ? "Gestion personnelle" 
                        : investmentDetails.management === "agent" 
                          ? "Agence immobilière" 
                          : "Service de conciergerie"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-noir-dark border-mauve/20">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Lightbulb className="h-5 w-5 text-mauve mr-2" />
                <h4 className="font-medium text-lg">Conseils personnalisés</h4>
              </div>
              
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-mauve mt-2 mr-2"></span>
                  {investmentDetails.financingMethod === "mortgage" && investmentDetails.downPayment < 20 
                    ? "Augmentez votre apport à 20% pour obtenir de meilleures conditions de crédit."
                    : "Votre apport personnel est bien dimensionné par rapport au projet."}
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-mauve mt-2 mr-2"></span>
                  {investmentDetails.strategy === "unfurnished" 
                    ? "Envisagez la location meublée pour améliorer votre rendement et votre fiscalité."
                    : investmentDetails.strategy === "seasonal" && investmentDetails.management !== "concierge"
                      ? "La gestion par conciergerie est fortement recommandée pour la location saisonnière."
                      : "Votre stratégie locative est bien adaptée à ce type de bien."}
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-mauve mt-2 mr-2"></span>
                  {investmentDetails.location === "geneva" 
                    ? "Consultez un expert en fiscalité internationale pour optimiser votre investissement en Suisse."
                    : "Cette zone géographique offre un bon équilibre entre sécurité et potentiel de valorisation."}
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-noir to-[#2D243B] border-mauve/20">
            <CardContent className="p-6">
              <h4 className="font-semibold text-xl mb-6">Performance Financière Estimée</h4>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Rendement locatif brut</span>
                    <span className="font-medium">
                      {investmentDetails.strategy === "unfurnished" 
                        ? "3.6%" 
                        : investmentDetails.strategy === "furnished" 
                          ? "4.5%" 
                          : investmentDetails.strategy === "seasonal" 
                            ? "5.8%" 
                            : "5.0%"}
                    </span>
                  </div>
                  <Progress 
                    value={
                      investmentDetails.strategy === "unfurnished" 
                        ? 36 
                        : investmentDetails.strategy === "furnished" 
                          ? 45 
                          : investmentDetails.strategy === "seasonal" 
                            ? 58 
                            : 50
                    } 
                    className="h-2" 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Rentabilité nette</span>
                    <span className="font-medium">
                      {investmentDetails.financingMethod === "mortgage" && investmentDetails.downPayment <= 25
                        ? investmentDetails.strategy === "seasonal" 
                          ? "8.7%" 
                          : "6.2%"
                        : investmentDetails.strategy === "seasonal" 
                          ? "4.9%" 
                          : "3.1%"}
                    </span>
                  </div>
                  <Progress 
                    value={
                      investmentDetails.financingMethod === "mortgage" && investmentDetails.downPayment <= 25
                        ? investmentDetails.strategy === "seasonal" 
                          ? 87 
                          : 62
                        : investmentDetails.strategy === "seasonal" 
                          ? 49 
                          : 31
                    } 
                    className="h-2" 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Valorisation annuelle estimée</span>
                    <span className="font-medium">
                      {investmentDetails.location === "annecy" || investmentDetails.location === "geneva" 
                        ? "3.5%" 
                        : "2.8%"}
                    </span>
                  </div>
                  <Progress 
                    value={
                      investmentDetails.location === "annecy" || investmentDetails.location === "geneva" 
                        ? 70 
                        : 55
                    } 
                    className="h-2" 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>TRI global sur 10 ans</span>
                    <span className="font-medium">
                      {investmentDetails.financingMethod === "mortgage" && investmentDetails.downPayment <= 25
                        ? investmentDetails.strategy === "seasonal" || investmentDetails.strategy === "coliving"
                          ? "9.8%" 
                          : "7.6%"
                        : investmentDetails.strategy === "seasonal" || investmentDetails.strategy === "coliving"
                          ? "6.2%" 
                          : "4.5%"}
                    </span>
                  </div>
                  <Progress 
                    value={
                      investmentDetails.financingMethod === "mortgage" && investmentDetails.downPayment <= 25
                        ? investmentDetails.strategy === "seasonal" || investmentDetails.strategy === "coliving"
                          ? 95 
                          : 75
                        : investmentDetails.strategy === "seasonal" || investmentDetails.strategy === "coliving"
                          ? 62 
                          : 45
                    } 
                    className="h-2 bg-mauve" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-gradient-to-br from-mauve/90 to-[#6E59A5] p-8 rounded-lg text-white">
            <h4 className="text-xl font-semibold mb-2">Prêt à passer à l'action ?</h4>
            <p className="mb-6 text-white/90">
              Réservez un audit personnalisé pour affiner votre stratégie d'investissement et obtenir 
              un accompagnement sur mesure.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button 
                onClick={onRestart}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-mauve"
              >
                Recommencer la simulation
              </Button>
              
              <Link to="/immobilier">
                <Button className="bg-white text-mauve hover:bg-white/90 w-full sm:w-auto">
                  Réserver un audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Add Settings to the import list
import { Settings } from "lucide-react";
