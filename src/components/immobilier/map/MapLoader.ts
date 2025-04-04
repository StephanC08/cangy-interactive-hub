
import { addPriceMarkers } from './PriceMarker';
import { PriceData } from './types';

// Track if the script is already being loaded
let isScriptLoading = false;
let scriptElement: HTMLScriptElement | null = null;

export const initializeMap = (
  mapElement: HTMLDivElement,
  priceData: PriceData[],
  onMapLoad: () => void,
  onMapError: () => void
): void => {
  if (!window.google) {
    onMapError();
    return;
  }

  try {
    const thononPosition = { lat: 46.3705, lng: 6.4784 }; // Coordonnées de Thonon-les-Bains
    
    const map = new window.google.maps.Map(mapElement, {
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

    // Add markers with price information
    addPriceMarkers(map, priceData);

    onMapLoad();
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la carte:", error);
    onMapError();
  }
};

export const loadGoogleMapsAPI = (callback: () => void): void => {
  // If the API is already available, just use it
  if (window.google && window.google.maps) {
    callback();
    return;
  }
  
  // If we're already loading the script, don't load it again
  if (isScriptLoading) {
    // Just register the callback to be called when script loads
    const originalInitMap = window.initMap;
    window.initMap = () => {
      if (originalInitMap) originalInitMap();
      callback();
    };
    return;
  }
  
  // Set up the script
  isScriptLoading = true;
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDnuKqsyZjOtlMXm17b_hqOGhqbvheQM-8&callback=initMap`;
  script.async = true;
  script.defer = true;
  
  // Store the script element globally to avoid cleanup issues
  scriptElement = script;
  
  // Set up the callback
  window.initMap = () => {
    isScriptLoading = false;
    callback();
  };
  
  // Add error handling
  script.onerror = () => {
    console.error("Google Maps script failed to load");
    isScriptLoading = false;
  };
  
  // Actually add the script to the page
  document.head.appendChild(script);
};
