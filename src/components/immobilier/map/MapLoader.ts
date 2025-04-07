
import { addPriceMarkers } from './PriceMarker';
import { PriceData } from './types';

// Track if the script is already being loaded
let isScriptLoading = false;
let mapInstance: any = null;
let markersCollection: any[] = [];
let infoWindowsCollection: any[] = [];

export const initializeMap = (
  mapElement: HTMLDivElement,
  priceData: PriceData[],
  onMapLoad: () => void,
  onMapError: () => void
): void => {
  if (!window.google || !window.google.maps) {
    onMapError();
    return;
  }

  try {
    const thononPosition = { lat: 46.3705, lng: 6.4784 }; // Coordonnées de Thonon-les-Bains
    
    // Clean up any existing map instance
    if (mapInstance) {
      mapInstance = null;
    }
    
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
    
    mapInstance = map;

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
    const { markers, infoWindows } = addPriceMarkers(map, priceData);
    markersCollection = markers;
    infoWindowsCollection = infoWindows;

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
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAEbCmQFd4_a8CfYmJkQO3twlxrMry1Vuw&callback=initMap`;
  script.async = true;
  script.defer = true;
  
  // Store reference to our callback function
  const initMapCallback = callback;
  
  // Set up the callback
  window.initMap = () => {
    isScriptLoading = false;
    initMapCallback();
  };
  
  // Add error handling
  script.onerror = () => {
    console.error("Google Maps script failed to load");
    isScriptLoading = false;
    // Remove the script element to avoid potential memory leaks
    if (script.parentNode) {
      script.parentNode.removeChild(script);
    }
  };
  
  // Cleanup function for component unmounting
  script.setAttribute('data-map-script', 'true');
  
  // Actually add the script to the page
  document.head.appendChild(script);
};

// Function to cleanup Google Maps resources
export const cleanupGoogleMapsResources = (): void => {
  // Cleanup all markers
  if (markersCollection && markersCollection.length) {
    markersCollection.forEach(marker => {
      if (marker) marker.setMap(null);
    });
    markersCollection = [];
  }
  
  // Cleanup all infoWindows
  if (infoWindowsCollection && infoWindowsCollection.length) {
    infoWindowsCollection.forEach(infoWindow => {
      if (infoWindow) infoWindow.close();
    });
    infoWindowsCollection = [];
  }
  
  // Reset the map instance
  mapInstance = null;
  
  // Clean up the script if needed
  const mapScript = document.querySelector('script[data-map-script="true"]');
  if (mapScript && mapScript.parentNode) {
    mapScript.parentNode.removeChild(mapScript);
  }
  
  // Reset the loading flag
  isScriptLoading = false;
};
