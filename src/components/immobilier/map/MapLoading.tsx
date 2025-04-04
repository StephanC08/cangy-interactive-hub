
import React from 'react';

export const MapLoadingSpinner = () => (
  <div className="h-full w-full flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mauve mx-auto mb-4"></div>
      <p className="text-mauve">Chargement de la carte...</p>
    </div>
  </div>
);

export const MapError = () => (
  <div className="bg-noir-dark p-8 h-96 flex items-center justify-center">
    <div className="text-center">
      <MapPin size={48} className="text-mauve mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">Impossible de charger la carte</h3>
      <p className="text-gray-400 max-w-md mx-auto">
        Veuillez vérifier votre connexion internet ou la clé API Google Maps.
      </p>
    </div>
  </div>
);

// We need to import MapPin from lucide-react
import { MapPin } from 'lucide-react';
