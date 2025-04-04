
// Définition des types pour les données de prix
export interface PriceData {
  location: string;
  lat: number;
  lng: number;
  price: number;
}

// Déclaration des types pour l'API Google Maps
declare global {
  interface Window {
    google?: any;
    initMap?: () => void;
  }
}
