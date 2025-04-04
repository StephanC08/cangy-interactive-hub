
import { PriceData } from './types';

// Function to add markers with price information to the map
export const addPriceMarkers = (
  map: google.maps.Map,
  priceData: PriceData[]
): void => {
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
};
