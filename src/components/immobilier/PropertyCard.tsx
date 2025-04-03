
import React from 'react';
import { MapPin } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Property {
  id: number;
  title: string;
  type: string;
  price: number;
  size: number;
  location: string;
  image: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Card className="bg-noir-dark border-mauve/20 hover:border-mauve/40 transition-all overflow-hidden">
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
  );
};

export default PropertyCard;
