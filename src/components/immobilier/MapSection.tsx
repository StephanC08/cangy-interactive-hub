
import React, { useEffect, useState, useRef } from 'react';
import { Map, MapPin, Info } from "lucide-react";

// Définition des types pour les données de prix
interface PriceData {
  location: string;
  lat: number;
  lng: number;
  price: number;
}

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  // Exemple de données de prix au mètre carré
  const priceData: PriceData[] = [
    { location: "Thonon-les-Bains", lat: 46.3705, lng: 6.4784, price: 4250 },
    { location: "Évian-les-Bains", lat: 46.4003, lng: 6.5892, price: 4450 },
    { location: "Sciez", lat: 46.3326, lng: 6.3868, price: 3850 },
    { location: "Douvaine", lat: 46.3083, lng: 6.3035, price: 3950 },
    { location: "Annemasse", lat: 46.1934, lng: 6.2356, price: 3700 },
    { location: "Bons-en-Chablais", lat: 46.2554, lng: 6.3597, price: 3650 }
  ];

  useEffect(() => {
    // Fonction pour initialiser la carte Google Maps
    const initMap = () => {
      if (!window.google || !mapRef.current) {
        setErrorLoading(true);
        return;
      }

      try {
        const thononPosition = { lat: 46.3705, lng: 6.4784 }; // Coordonnées de Thonon-les-Bains
        
        const map = new window.google.maps.Map(mapRef.current, {
          center: thononPosition,
          zoom: 10,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
          ],
        });

        // Dessiner le cercle de 50km autour de Thonon
        const thononCircle = new window.google.maps.Circle({
          strokeColor: "#9b87f5",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#9b87f5",
          fillOpacity: 0.1,
          map,
          center: thononPosition,
          radius: 50000, // 50km en mètres
        });

        // Ajouter les marqueurs avec les prix au mètre carré
        priceData.forEach((data) => {
          const marker = new window.google.maps.Marker({
            position: { lat: data.lat, lng: data.lng },
            map,
            title: data.location,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: '#9b87f5',
              fillOpacity: 0.9,
              strokeWeight: 1,
              strokeColor: '#ffffff',
              scale: 8,
            },
          });

          // Ajouter une infowindow pour chaque marqueur
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 10px;">
                <h3 style="margin: 0 0 5px; font-weight: bold;">${data.location}</h3>
                <p style="margin: 0; font-size: 16px;">${data.price} €/m²</p>
              </div>
            `,
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });

        setMapLoaded(true);
      } catch (error) {
        console.error("Erreur lors de l'initialisation de la carte:", error);
        setErrorLoading(true);
      }
    };

    // Charger l'API Google Maps
    const loadGoogleMapsAPI = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=VOTRE_CLE_API_GOOGLE_MAPS&callback=initMap`;
        script.async = true;
        script.defer = true;
        window.initMap = initMap;
        document.head.appendChild(script);
      } else {
        initMap();
      }
    };

    loadGoogleMapsAPI();

    return () => {
      // Nettoyer la fonction globale initMap
      if (window.initMap) {
        window.initMap = undefined;
      }
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
            <div className="bg-noir-dark p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-mauve mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Impossible de charger la carte</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Veuillez vérifier votre connexion internet ou la clé API Google Maps.
                </p>
              </div>
            </div>
          ) : (
            <div 
              ref={mapRef} 
              className="h-96 w-full bg-noir-dark"
              aria-label="Carte des prix immobiliers au m² dans la région de Thonon-les-Bains"
            >
              {!mapLoaded && (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mauve mx-auto mb-4"></div>
                    <p className="text-mauve">Chargement de la carte...</p>
                  </div>
                </div>
              )}
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

// Ajout de la déclaration de type pour l'API Google Maps
declare global {
  interface Window {
    google?: any;
    initMap?: () => void;
  }
}

export default MapSection;
