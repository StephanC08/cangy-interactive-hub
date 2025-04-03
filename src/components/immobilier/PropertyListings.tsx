
import React from 'react';
import PropertyCard, { Property } from './PropertyCard';

interface PropertyListingsProps {
  properties: Property[];
}

const PropertyListings: React.FC<PropertyListingsProps> = ({ properties }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="section-title mb-12">Biens disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyListings;
