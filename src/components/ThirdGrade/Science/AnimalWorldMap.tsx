import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Declare Google Maps types
declare global {
  interface Window {
    google: {
      maps: {
        Map: any;
        MapTypeId: any;
        InfoWindow: any;
        Marker: any;
        Size: any;
        Point: any;
        marker: {
          AdvancedMarkerElement: any;
        };
      };
    };
  }
}

interface AnimalLocation {
  name: string;
  position: { lat: number; lng: number };
  habitat: string;
  emoji: string;
}

interface AnimalDetails {
  summary: string;
  funFact: string;
}

interface AnimalWorldMapProps {
  animalLocations: AnimalLocation[];
  selectedAnimal: string | null;
  animalDetails: Record<string, AnimalDetails>;
  onAnimalClick: (animalName: string) => void;
}

const AnimalWorldMap: React.FC<AnimalWorldMapProps> = ({
  animalLocations,
  selectedAnimal,
  animalDetails,
  onAnimalClick
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [infoWindow, setInfoWindow] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Wait for Google Maps to load
    const checkGoogleMaps = setInterval(() => {
      if (window.google && window.google.maps) {
        clearInterval(checkGoogleMaps);
        initializeMap();
      }
    }, 100);

    return () => {
      clearInterval(checkGoogleMaps);
      // Cleanup markers and map
      if (markers.length > 0) {
        markers.forEach(marker => {
          if (marker && marker.setMap) {
            marker.setMap(null);
          }
        });
      }
      if (infoWindow) {
        infoWindow.close();
      }
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) {
      console.log('Map ref or Google Maps not available');
      return;
    }

    // Prevent multiple initializations
    if (isInitialized) {
      console.log('Map already initialized');
      return;
    }

    console.log('Initializing map...');

    const newMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20, lng: 0 },
      zoom: 1,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [{ color: '#f5f5f5' }, { lightness: 20 }]
        }
      ]
    });

    const newInfoWindow = new window.google.maps.InfoWindow();
    setMap(newMap);
    setInfoWindow(newInfoWindow);
    setIsInitialized(true);

    console.log('Creating markers for', animalLocations.length, 'animals');

    // Create markers for each animal
    const newMarkers = animalLocations.map((animal) => {
      console.log('Creating marker for', animal.name, 'at', animal.position);
      
      // Create a simple marker with custom icon
      const marker = new window.google.maps.Marker({
        position: animal.position,
        title: animal.name,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="22" fill="white" stroke="#4F46E5" stroke-width="3"/>
              <text x="25" y="32" font-family="Arial" font-size="20" text-anchor="middle">${animal.emoji}</text>
            </svg>
          `)}`,
          scaledSize: new window.google.maps.Size(50, 50),
          anchor: new window.google.maps.Point(25, 25)
        }
      });

      marker.addListener('click', () => {
        console.log('Marker clicked for', animal.name);
        onAnimalClick(animal.name);
        showAnimalInfo(animal, newInfoWindow, newMap);
      });

      return marker;
    });

    setMarkers(newMarkers);
    console.log('Map initialization complete');
  };

  const showAnimalInfo = (animal: AnimalLocation, infoWindow: any, map: any) => {
    const details = animalDetails[animal.name];
    if (!details) return;

    const content = `
      <div style="padding: 10px; max-width: 300px;">
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <span style="font-size: 32px; margin-right: 10px;">${animal.emoji}</span>
          <div>
            <h3 style="margin: 0; font-size: 18px; font-weight: bold; color: #1F2937;">${animal.name}</h3>
            <p style="margin: 0; font-size: 14px; color: #6B7280;">${animal.habitat}</p>
          </div>
        </div>
        <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.4; color: #374151;">${details.summary}</p>
        <div style="background: #FEF3C7; padding: 8px; border-radius: 6px; border-left: 4px solid #F59E0B;">
          <p style="margin: 0; font-size: 13px; font-weight: bold; color: #92400E;">Fun Fact: ${details.funFact}</p>
        </div>
      </div>
    `;

    infoWindow.setContent(content);
    infoWindow.setPosition(animal.position);
    infoWindow.open(map);
  };

  // Update map when selected animal changes
  useEffect(() => {
    if (map && selectedAnimal && infoWindow) {
      const animal = animalLocations.find(a => a.name === selectedAnimal);
      if (animal) {
        map.panTo(animal.position);
        map.setZoom(4);
        showAnimalInfo(animal, infoWindow, map);
      }
    }
  }, [selectedAnimal, map, infoWindow]);

  return (
    <div className="space-y-6">
      {/* Map at the top - full width */}
      <div className="relative">
        <div 
          key="animal-world-map"
          ref={mapRef} 
          className="w-full h-96 rounded-lg shadow-lg"
          style={{ minHeight: '400px' }}
        />
      </div>

      {/* Bottom section with animal lists and details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Animal List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Animals by Habitat</h3>
            <div className="space-y-3">
              {animalLocations.slice(0, Math.ceil(animalLocations.length / 2)).map((animal) => (
                <button
                  key={animal.name}
                  onClick={() => onAnimalClick(animal.name)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedAnimal === animal.name
                      ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{animal.emoji}</span>
                    <div>
                      <div className="font-semibold">{animal.name}</div>
                      <div className="text-sm text-gray-600">{animal.habitat}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Animal Details */}
        <div className="lg:col-span-1">
          {selectedAnimal && animalDetails[selectedAnimal] ? (
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="text-3xl mr-3">
                    {animalLocations.find(a => a.name === selectedAnimal)?.emoji}
                  </span>
                  {selectedAnimal}
                </h3>
                <button
                  onClick={() => onAnimalClick('')}
                  className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">About this animal:</h4>
                <p className="text-gray-600 leading-relaxed">
                  {animalDetails[selectedAnimal].summary}
                </p>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-4">
                <h4 className="font-semibold text-yellow-800 mb-1">Fun Fact!</h4>
                <p className="text-yellow-700">
                  {animalDetails[selectedAnimal].funFact}
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Click on different animals to learn more!
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      const currentIndex = animalLocations.findIndex(a => a.name === selectedAnimal);
                      const prevIndex = currentIndex === 0 ? animalLocations.length - 1 : currentIndex - 1;
                      onAnimalClick(animalLocations[prevIndex].name);
                    }}
                    className="flex items-center text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = animalLocations.findIndex(a => a.name === selectedAnimal);
                      const nextIndex = (currentIndex + 1) % animalLocations.length;
                      onAnimalClick(animalLocations[nextIndex].name);
                    }}
                    className="flex items-center text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 text-center">
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Select an Animal</h3>
              <p className="text-gray-600">Click on an animal from the lists or map to learn more!</p>
            </div>
          )}
        </div>

        {/* Right Animal List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">More Animals</h3>
            <div className="space-y-3">
              {animalLocations.slice(Math.ceil(animalLocations.length / 2)).map((animal) => (
                <button
                  key={animal.name}
                  onClick={() => onAnimalClick(animal.name)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedAnimal === animal.name
                      ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{animal.emoji}</span>
                    <div>
                      <div className="font-semibold">{animal.name}</div>
                      <div className="text-sm text-gray-600">{animal.habitat}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Declare Google Maps types
declare global {
  interface Window {
    google: {
      maps: {
        Map: any;
        MapTypeId: any;
        InfoWindow: any;
        Marker: any;
        Size: any;
        Point: any;
        marker: {
          AdvancedMarkerElement: any;
        };
      };
    };
  }
}

export default AnimalWorldMap; 