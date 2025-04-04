
import React, { useEffect, useState, useRef } from 'react';
import { Map, MapPin, Info } from "lucide-react";
import { initializeMap, loadGoogleMapsAPI } from './map/MapLoader';
import { priceData } from './map/PriceData';
import { MapLoadingSpinner, MapError } from './map/MapLoading';
import { PriceData } from './map/types';

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  
  // Store the callback function in a ref to avoid recreating it on re-renders
  const callbackRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Define the callback for when Google Maps API loads
    const initMap = () => {
      if (!mapRef.current) {
        setErrorLoading(true);
        return;
      }

      // Only initialize the map if the component is still mounted
      try {
        initializeMap(
          mapRef.current, 
          priceData, 
          () => setMapLoaded(true), 
          () => setErrorLoading(true)
        );
      } catch (error) {
        console.error("Error initializing map:", error);
        setErrorLoading(true);
      }
    };

    // Store the callback for cleanup
    callbackRef.current = initMap;
    
    // Set the global initMap function
    window.initMap = initMap;
    
    // Load Google Maps API
    loadGoogleMapsAPI(initMap);

    return () => {
      // Clean up the global initMap reference
      if (window.initMap === initMap) {
        window.initMap = undefined;
      }
      
      // Reset the callback ref
      callbackRef.current = null;
    };
  }, []);

  return (
    <section className="py-16 bg-noir-light">
      <div className="container mx-auto px-6">
        <h2 className="section-title mb-12">Prix au m² dans la région</h2>
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="text-gray-400 mb-2">
              <Map size={16} className="inline-block mr-2 text-mauve" />
              Visualisez les prix au m² à Thonon-les-Bains et dans un rayon de 50 km
            </p>
            <p className="text-sm text-gray-500">Cliquez sur les marqueurs pour voir les détails des prix</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <Info size={16} className="text-mauve mr-2" />
            <span className="text-sm text-gray-400">Données basées sur les transactions récentes</span>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border border-mauve/20">
          {errorLoading ? (
            <MapError />
          ) : (
            <div 
              ref={mapRef} 
              className="h-96 w-full bg-noir-dark"
              aria-label="Carte des prix immobiliers au m² dans la région de Thonon-les-Bains"
            >
              {!mapLoaded && <MapLoadingSpinner />}
            </div>
          )}
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-400 text-center">
            Les prix affichés sont des moyennes et peuvent varier selon les caractéristiques spécifiques des biens.
            Pour une estimation personnalisée, contactez-moi.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
