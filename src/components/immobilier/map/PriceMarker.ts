
import { PriceData } from './types';
import { MapPin, Info } from 'lucide-react';

// Function to add markers with price information to the map
export const addPriceMarkers = (
  map: any,
  priceData: PriceData[]
): { markers: any[]; infoWindows: any[]; } => {
  if (!window.google || !window.google.maps) {
    console.error("Google Maps API n'est pas disponible");
    return { markers: [], infoWindows: [] };
  }
  
  const markers: any[] = [];
  const infoWindows: any[] = [];
  
  priceData.forEach((data) => {
    // Create custom marker icon with price label
    const markerDiv = document.createElement('div');
    markerDiv.className = 'price-marker';
    markerDiv.innerHTML = `
      <div style="
        background-color: #9b87f5; 
        color: white; 
        border-radius: 50%; 
        width: 40px; 
        height: 40px; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        font-weight: bold;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      ">
        <div style="font-size: 11px; text-align: center;">${Math.round(data.price/1000)}K€</div>
      </div>
    `;
    
    // Create the marker
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
        scale: 10,
      },
    });
    
    markers.push(marker);

    // Ajouter une infowindow améliorée pour chaque marqueur
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="
          padding: 12px; 
          border-radius: 8px; 
          min-width: 180px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        ">
          <h3 style="
            margin: 0 0 8px; 
            font-weight: bold;
            font-size: 16px;
            color: #333;
          ">${data.location}</h3>
          <div style="
            display: flex;
            align-items: center;
            background-color: #f8f9fa;
            padding: 8px;
            border-radius: 6px;
            margin-bottom: 4px;
          ">
            <span style="
              margin: 0; 
              font-size: 18px;
              font-weight: bold;
              color: #9b87f5;
            ">${data.price.toLocaleString()} €/m²</span>
          </div>
          <p style="
            margin: 4px 0 0;
            font-size: 12px;
            color: #666;
          ">Prix moyen au m²</p>
        </div>
      `,
      pixelOffset: new window.google.maps.Size(0, -5),
      maxWidth: 320,
    });
    
    infoWindows.push(infoWindow);

    // Show infowindow on marker click
    marker.addListener('click', () => {
      // Close all open infowindows
      infoWindows.forEach(iw => iw.close());
      // Open this infowindow
      infoWindow.open(map, marker);
    });
    
    // Also show infowindow by default when the map loads
    // Comment the next line if you don't want all markers to show infowindow by default
    // infoWindow.open(map, marker);
  });
  
  return { markers, infoWindows };
};
