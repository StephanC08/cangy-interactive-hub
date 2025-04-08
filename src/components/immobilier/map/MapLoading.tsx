
import React from 'react';
import { MapPin } from 'lucide-react';

export const MapLoadingSpinner = () => (
  <div className="h-full w-full flex items-center justify-center bg-noir-dark">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-t-2 border-mauve mx-auto mb-4"></div>
      <p className="text-mauve text-lg">Chargement de la carte...</p>
    </div>
  </div>
);

export const MapError = () => (
  <div className="h-full w-full bg-noir-dark flex items-center justify-center">
    <div className="text-center p-8">
      <MapPin size={64} className="text-mauve mx-auto mb-6" />
      <h3 className="text-2xl font-semibold mb-3 text-white">Impossible de charger la carte</h3>
      <p className="text-gray-400 max-w-md mx-auto">
        Veuillez vérifier votre connexion internet ou rafraîchir la page.
      </p>
    </div>
  </div>
);
