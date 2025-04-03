
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Home, Calculator } from "lucide-react";

const Immobilier = () => {
  useEffect(() => {
    document.title = 'Conseil Immobilier | Stephan CANGY';
  }, []);

  // Property simulation state
  const [budget, setBudget] = useState(300000);
  const [propertyType, setPropertyType] = useState("appartement");
  const [location, setLocation] = useState("thonon");
  const [result, setResult] = useState<number | null>(null);

  // Example properties
  const properties = [
    {
      id: 1,
      title: "Appartement vue lac",
      type: "Appartement",
      price: 320000,
      size: 75,
      location: "Thonon-les-Bains",
      image: "/lovable-uploads/7d76f0ad-485f-4326-9db9-260d6e80cde9.png"
    },
    {
      id: 2,
      title: "Villa contemporaine",
      type: "Maison",
      price: 450000,
      size: 120,
      location: "Évian-les-Bains",
      image: "/lovable-uploads/7d76f0ad-485f-4326-9db9-260d6e80cde9.png"
    },
    {
      id: 3,
      title: "Terrain constructible",
      type: "Terrain",
      price: 180000,
      size: 800,
      location: "Sciez",
      image: "/lovable-uploads/7d76f0ad-485f-4326-9db9-260d6e80cde9.png"
    }
  ];

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
    <div className="flex flex-col min-h-screen bg-noir text-white">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-noir-dark py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                  Conseil <span className="mauve-gradient-text">Immobilier</span>
                </h1>
                <p className="text-gray-300 text-lg mb-8">
                  Découvrez les meilleures opportunités immobilières à Thonon-les-Bains et dans un rayon de 50 km. 
                  Que vous recherchiez une résidence principale, un investissement locatif ou un bien à rénover, 
                  je vous accompagne dans toutes les étapes de votre projet.
                </p>
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="text-mauve" />
                  <span>Thonon-les-Bains et environs (50 km)</span>
                </div>
                <Button className="btn-primary">
                  Prendre rendez-vous
                </Button>
              </div>
              <div className="md:w-1/2 mt-10 md:mt-0">
                <div className="relative">
                  <div className="w-full h-64 md:h-80 bg-mauve/10 rounded-xl overflow-hidden">
                    <img 
                      src="/lovable-uploads/7d76f0ad-485f-4326-9db9-260d6e80cde9.png" 
                      alt="Immobilier Thonon-les-Bains" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-noir-light border border-mauve px-4 py-2 rounded-md z-20">
                    <span className="text-mauve font-medium">Service personnalisé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Simulator Section */}
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

        {/* Property Listings */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="section-title mb-12">Biens disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {properties.map((property) => (
                <Card key={property.id} className="bg-noir-dark border-mauve/20 hover:border-mauve/40 transition-all overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">{property.title}</CardTitle>
                      <span className="text-mauve font-semibold">{property.price.toLocaleString()} €</span>
                    </div>
                    <CardDescription>{property.type} - {property.size}m²</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-gray-400">
                      <MapPin size={16} className="mr-2 text-mauve" />
                      {property.location}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-mauve/10 text-mauve hover:bg-mauve hover:text-white">
                      Voir les détails
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-noir-light">
          <div className="container mx-auto px-6">
            <h2 className="section-title mb-12">Carte des opportunités</h2>
            <div className="bg-noir-dark border border-mauve/20 rounded-xl p-4 h-96 flex items-center justify-center">
              <div className="text-center">
                <Home size={48} className="text-mauve mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Carte interactive</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Visualisez les opportunités immobilières à Thonon-les-Bains et dans un rayon de 50 km. 
                  Contactez-moi pour des informations détaillées sur les biens disponibles.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ChatBot />
      </main>
      <Footer />
    </div>
  );
};

export default Immobilier;
