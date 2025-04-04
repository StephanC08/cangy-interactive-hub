
import React, { useEffect, useState, useRef } from 'react';
import { Map, MapPin, Info } from "lucide-react";
import { initializeMap, loadGoogleMapsAPI, cleanupGoogleMapsResources } from './map/MapLoader';
import { priceData } from './map/PriceData';
import { MapLoadingSpinner, MapError } from './map/MapLoading';

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  
  useEffect(() => {
    let isMounted = true;
    
    // Define the callback for when Google Maps API loads
    const initMap = () => {
      if (!mapRef.current || !isMounted) {
        return;
      }

      try {
        initializeMap(
          mapRef.current, 
          priceData, 
          () => isMounted && setMapLoaded(true), 
          () => isMounted && setErrorLoading(true)
        );
      } catch (error) {
        console.error("Error initializing map:", error);
        if (isMounted) {
          setErrorLoading(true);
        }
      }
    };
    
    // Store the function to check in cleanup
    const currentInitMap = initMap;
    
    // Set the global initMap function
    window.initMap = initMap;
    
    // Load Google Maps API
    loadGoogleMapsAPI(initMap);

    return () => {
      isMounted = false;
      
      // Clean up the global initMap reference only if it still points to our function
      if (window.initMap === currentInitMap) {
        window.initMap = undefined;
      }
      
      // Clean up Google Maps resources
      cleanupGoogleMapsResources();
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
