
// Définition des types pour les données de prix
export interface PriceData {
  location: string;
  lat: number;
  lng: number;
  price: number;
}

// Define types for Google Maps API to fix TypeScript errors
declare global {
  interface Window {
    google: any;
    initMap?: () => void;
  }
}
