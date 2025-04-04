
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
    google: typeof google;
    initMap?: () => void;
  }
}

// Google Maps types - minimum necessary for our implementation
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
    }
    
    class Marker {
      constructor(opts?: MarkerOptions);
      addListener(eventName: string, handler: () => void): void;
    }
    
    class Circle {
      constructor(opts?: CircleOptions);
    }
    
    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      open(map?: Map, anchor?: Marker): void;
    }
    
    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      styles?: any[];
    }
    
    interface MarkerOptions {
      position?: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
      icon?: Icon | Symbol;
    }
    
    interface CircleOptions {
      strokeColor?: string;
      strokeOpacity?: number;
      strokeWeight?: number;
      fillColor?: string;
      fillOpacity?: number;
      map?: Map;
      center?: LatLng | LatLngLiteral;
      radius?: number;
    }
    
    interface InfoWindowOptions {
      content?: string | Node;
    }
    
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    
    interface LatLng {
      lat(): number;
      lng(): number;
    }
    
    interface Icon {
      url?: string;
    }
    
    interface Symbol {
      path?: SymbolPath | string;
      fillColor?: string;
      fillOpacity?: number;
      strokeWeight?: number;
      strokeColor?: string;
      scale?: number;
    }
    
    enum SymbolPath {
      CIRCLE,
      FORWARD_CLOSED_ARROW,
      FORWARD_OPEN_ARROW,
      BACKWARD_CLOSED_ARROW,
      BACKWARD_OPEN_ARROW
    }
  }
}
