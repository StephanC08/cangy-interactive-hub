
import { addPriceMarkers } from './PriceMarker';
import { PriceData } from './types';

// Track if the script is already being loaded
let isScriptLoading = false;
let mapInstance: any = null;
let markersCollection: any[] = [];
let infoWindowsCollection: any[] = [];
let scriptElement: HTMLScriptElement | null = null;
let scriptLoadPromise: Promise<void> | null = null;

export const initializeMap = (
  mapElement: HTMLDivElement,
  priceData: PriceData[],
  onMapLoad: () => void,
  onMapError: () => void
): any => {
  if (!window.google || !window.google.maps) {
    onMapError();
    return null;
  }

  try {
    const thononPosition = { lat: 46.3705, lng: 6.4784 }; // Coordonnées de Thonon-les-Bains
    
    // Clean up any existing map instance
    if (mapInstance) {
      cleanupGoogleMapsResources();
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

    // Trigger resize event to ensure map displays correctly
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      onMapLoad();
    }, 100);

    return map;
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la carte:", error);
    onMapError();
    return null;
  }
};

export const loadGoogleMapsAPI = (): Promise<void> => {
  // If the API is already available, just use it
  if (window.google && window.google.maps) {
    return Promise.resolve();
  }
  
  // If we already have a promise for loading the script, return it
  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }
  
  // Create a new promise for loading the script
  scriptLoadPromise = new Promise((resolve, reject) => {
    // Cleanup any existing script elements
    cleanupGoogleMapsScript();
    
    // Set up the script
    isScriptLoading = true;
    scriptElement = document.createElement('script');
    const apiKey = 'AIzaSyAEbCmQFd4_a8CfYmJkQO3twlxrMry1Vuw';
    scriptElement.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    scriptElement.async = true;
    scriptElement.defer = true;
    
    // Set up callbacks
    scriptElement.onload = () => {
      isScriptLoading = false;
      resolve();
    };
    
    scriptElement.onerror = () => {
      console.error("Google Maps script failed to load");
      isScriptLoading = false;
      cleanupGoogleMapsScript();
      reject(new Error("Failed to load Google Maps API"));
      scriptLoadPromise = null;
    };
    
    // Cleanup function for component unmounting
    scriptElement.setAttribute('data-map-script', 'true');
    
    // Actually add the script to the page
    document.head.appendChild(scriptElement);
  });
  
  return scriptLoadPromise;
};

// Function to cleanup the Google Maps script element
const cleanupGoogleMapsScript = (): void => {
  const existingScripts = document.querySelectorAll('script[data-map-script="true"]');
  existingScripts.forEach(script => {
    if (script.parentNode) {
      script.parentNode.removeChild(script);
    }
  });
  scriptElement = null;
  scriptLoadPromise = null;
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
  
  // Reset the loading flag
  isScriptLoading = false;
};
