
import React, { useState, useEffect, useRef } from 'react';
import { Section } from '../ui/section';
import { priceData } from './map/PriceData';
import { loadGoogleMapsAPI, initializeMap, cleanupGoogleMapsResources } from './map/MapLoader';
import { MapLoadingSpinner, MapError } from './map/MapLoading';

const MapSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapLoadedRef = useRef<boolean>(false);

  const initMap = () => {
    if (!mapRef.current) return;
    
    try {
      initializeMap(
        mapRef.current,
        priceData,
        () => {
          setIsLoading(false);
          mapLoadedRef.current = true;
        },
        () => {
          setIsLoading(false);
          setIsError(true);
        }
      );
    } catch (error) {
      console.error("Erreur lors de l'initialisation de la carte:", error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    const loadMap = async () => {
      setIsLoading(true);
      loadGoogleMapsAPI(initMap);
    };

    loadMap();

    // Cleanup function when component unmounts
    return () => {
      cleanupGoogleMapsResources();
      mapLoadedRef.current = false;
    };
  }, []);

  return (
    <Section id="map-section" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-3 text-white">Prix immobiliers par localité</h2>
        <p className="mb-8 text-gray-300">Explorez les prix moyens au m² dans les communes du Chablais.</p>
        
        <div className="bg-noir-dark rounded-lg overflow-hidden">
          <div className="h-96 w-full relative">
            {isLoading && <MapLoadingSpinner />}
            {isError && <MapError />}
            <div 
              ref={mapRef} 
              className="h-full w-full" 
              style={{ display: isLoading || isError ? 'none' : 'block' }}
              id="google-map"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default MapSection;
