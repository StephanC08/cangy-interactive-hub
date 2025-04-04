
import { PriceData } from './types';

// Function to add markers with price information to the map
export const addPriceMarkers = (
  map: any,
  priceData: PriceData[]
): void => {
  if (!window.google || !window.google.maps) {
    console.error("Google Maps API n'est pas disponible");
    return;
  }
  
  const markers: any[] = [];
  const infoWindows: any[] = [];
  
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
    
    markers.push(marker);

    // Ajouter une infowindow pour chaque marqueur
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 10px;">
          <h3 style="margin: 0 0 5px; font-weight: bold;">${data.location}</h3>
          <p style="margin: 0; font-size: 16px;">${data.price} €/m²</p>
        </div>
      `,
    });
    
    infoWindows.push(infoWindow);

    marker.addListener('click', () => {
      // Fermer toutes les infowindows ouvertes
      infoWindows.forEach(iw => iw.close());
      // Ouvrir cette infowindow
      infoWindow.open(map, marker);
    });
  });
  
  return { markers, infoWindows };
};
