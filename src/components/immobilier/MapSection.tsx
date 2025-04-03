
import React from 'react';
import { Home } from "lucide-react";

const MapSection = () => {
  return (
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
  );
};

export default MapSection;
