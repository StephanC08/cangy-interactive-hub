
import React, { useState, useEffect, useRef } from 'react';
import { Section } from '../ui/section';
import { priceData } from './map/PriceData';
import { loadGoogleMapsAPI, initializeMap, cleanupGoogleMapsResources } from './map/MapLoader';
import { MapLoadingSpinner, MapError } from './map/MapLoading';
import { MapPin, Info } from 'lucide-react';

const MapSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadMap = async () => {
      if (!mapRef.current) return;
      
      try {
        // Nettoyer les ressources précédentes s'il y en a
        cleanupGoogleMapsResources();
        
        // Charger l'API Google Maps
        await loadGoogleMapsAPI();
        
        // Seulement si le composant est toujours monté
        if (isMounted && mapRef.current) {
          // Initialiser la carte
          const mapInstance = initializeMap(
            mapRef.current,
            priceData,
            () => {
              if (isMounted) setIsLoading(false);
            },
            () => {
              if (isMounted) {
                setIsLoading(false);
                setIsError(true);
              }
            }
          );
          
          mapInstanceRef.current = mapInstance;
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la carte:", error);
        if (isMounted) {
          setIsLoading(false);
          setIsError(true);
        }
      }
    };

    loadMap();

    // Nettoyage lors du démontage du composant
    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        cleanupGoogleMapsResources();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <Section id="map-section" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-3 text-white">Prix immobiliers par localité</h2>
        <p className="mb-8 text-gray-300">Explorez les prix moyens au m² dans les communes du Chablais.</p>
        
        <div className="bg-noir-dark rounded-lg overflow-hidden shadow-lg">
          <div className="h-[500px] w-full relative">
            {isLoading && <MapLoadingSpinner />}
            {isError && <MapError />}
            <div 
              ref={mapRef} 
              className="h-full w-full" 
              style={{ display: isLoading ? 'none' : 'block' }}
              id="google-map"
            />
            
            <div className="absolute bottom-4 left-4 bg-noir-dark/80 p-3 rounded-lg border border-mauve/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm text-white">
                <div className="w-3 h-3 rounded-full bg-mauve"></div>
                <span>Prix au m² par commune</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-start gap-3 bg-noir-light/50 p-4 rounded-lg border border-mauve/10">
          <Info size={20} className="text-mauve mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-300">
              Ces prix sont des moyennes basées sur les transactions immobilières récentes. 
              Les variations peuvent être importantes selon le type de bien, sa situation exacte et son état.
              Pour une estimation précise, consultez un professionnel de l'immobilier.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default MapSection;
