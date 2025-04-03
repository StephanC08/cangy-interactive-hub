
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

const PropertySimulator = () => {
  const [budget, setBudget] = useState(300000);
  const [propertyType, setPropertyType] = useState("appartement");
  const [location, setLocation] = useState("thonon");
  const [result, setResult] = useState<number | null>(null);

  const calculateEstimate = () => {
    // Simple estimation algorithm
    let basePrice = budget;
    
    // Adjust based on property type
    if (propertyType === "maison") {
      basePrice *= 1.2;
    } else if (propertyType === "terrain") {
      basePrice *= 0.8;
    }
    
    // Adjust based on location
    if (location === "evian") {
      basePrice *= 1.15;
    } else if (location === "autres") {
      basePrice *= 0.9;
    }
    
    setResult(Math.round(basePrice));
  };

  return (
    <section className="py-16 bg-noir-light">
      <div className="container mx-auto px-6">
        <h2 className="section-title mb-12">Simulateur Immobilier</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-noir-dark border-mauve/20">
            <CardHeader>
              <CardTitle className="text-white">Estimez votre projet</CardTitle>
              <CardDescription>Ajustez les critères pour obtenir une estimation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget: {budget.toLocaleString()} €</Label>
                <Slider 
                  id="budget"
                  min={100000} 
                  max={1000000} 
                  step={10000} 
                  value={[budget]} 
                  onValueChange={(value) => setBudget(value[0])}
                  className="py-4"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="propertyType">Type de bien</Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type de bien" />
                  </SelectTrigger>
                  <SelectContent className="bg-noir">
                    <SelectItem value="appartement">Appartement</SelectItem>
                    <SelectItem value="maison">Maison</SelectItem>
                    <SelectItem value="terrain">Terrain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Localisation</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Localisation" />
                  </SelectTrigger>
                  <SelectContent className="bg-noir">
                    <SelectItem value="thonon">Thonon-les-Bains</SelectItem>
                    <SelectItem value="evian">Évian-les-Bains</SelectItem>
                    <SelectItem value="autres">Autres secteurs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-mauve" onClick={calculateEstimate}>
                <Calculator className="mr-2" size={18} />
                Calculer
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-noir-dark border-mauve/20 flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="text-white">Votre estimation</CardTitle>
              <CardDescription>Basée sur les critères sélectionnés</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-12">
              {result ? (
                <>
                  <p className="text-4xl font-bold text-mauve mb-4">{result.toLocaleString()} €</p>
                  <p className="text-center text-gray-400">
                    Cette estimation est basée sur les tendances actuelles du marché immobilier dans la région sélectionnée. 
                    Pour une évaluation précise, n'hésitez pas à me contacter.
                  </p>
                </>
              ) : (
                <p className="text-center text-gray-400">
                  Ajustez les critères à gauche et cliquez sur "Calculer" pour obtenir une estimation de votre projet immobilier.
                </p>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" className="border-mauve text-mauve">
                Prendre rendez-vous pour plus de détails
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PropertySimulator;
