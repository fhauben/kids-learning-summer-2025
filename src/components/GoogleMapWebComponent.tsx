import React, { useEffect, useRef } from 'react';

interface GoogleMapWebComponentProps {
  center: { lat: number; lng: number };
  zoom: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title: string;
  }>;
  className?: string;
  mapId?: string;
}

const GoogleMapWebComponent: React.FC<GoogleMapWebComponentProps> = ({ 
  center, 
  zoom, 
  markers = [], 
  className = "",
  mapId = "DEMO_MAP_ID"
}) => {
  const mapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Ensure the Google Maps Web Components are loaded
    if (typeof customElements !== 'undefined') {
      // The web components should be automatically registered when the script loads
      console.log('Google Maps Web Components should be available');
    }
  }, []);

  return (
    <div className={`w-full h-full ${className}`}>
      <gmp-map
        ref={mapRef}
        center={`${center.lat},${center.lng}`}
        zoom={zoom.toString()}
        map-id={mapId}
        style={{ width: '100%', height: '100%', minHeight: '200px' }}
      >
        {markers.map((marker, index) => (
          <gmp-advanced-marker
            key={index}
            position={`${marker.position.lat},${marker.position.lng}`}
            title={marker.title}
          />
        ))}
      </gmp-map>
    </div>
  );
};

// Declare the custom elements for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmp-map': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        center?: string;
        zoom?: string;
        'map-id'?: string;
      };
      'gmp-advanced-marker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        position?: string;
        title?: string;
      };
    }
  }
}

export default GoogleMapWebComponent;