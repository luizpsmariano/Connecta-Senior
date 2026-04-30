import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Navigation2, MapPin } from 'lucide-react';

// Stabilize Leaflet marker icons using CDN URLs
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapWithRouteProps {
  targetLat: number;
  targetLng: number;
  targetName: string;
}

// Sub-component to center map when user location changes
const RecenterMap: React.FC<{ coords: [number, number] }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords);
  }, [coords, map]);
  return null;
};

export const MapWithRoute: React.FC<MapWithRouteProps> = ({ targetLat, targetLng, targetName }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('GPS não disponível');
      // Fallback location in Pinhais city center
      setUserLocation([-25.4411, -49.1916]);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        setError('Não foi possível obter sua localização');
        // Fallback location
        setUserLocation([-25.4411, -49.1916]);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  if (!userLocation) return (
    <div className="w-full h-48 bg-slate-50 rounded-[32px] flex items-center justify-center animate-pulse">
      <div className="text-center">
        <Navigation2 size={32} className="text-indigo-400 mx-auto mb-2 animate-bounce" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Carregando Mapa...</p>
      </div>
    </div>
  );

  const routePolyline: [number, number][] = [
    userLocation,
    [targetLat, targetLng]
  ];

  return (
    <div className="w-full h-64 bg-slate-100 rounded-[32px] overflow-hidden border-2 border-slate-50 relative">
      <MapContainer 
        center={userLocation} 
        zoom={14} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User Marker */}
        <Marker position={userLocation}>
          <Popup>Você está aqui</Popup>
        </Marker>

        {/* Target Marker */}
        <Marker position={[targetLat, targetLng]}>
          <Popup>{targetName}</Popup>
        </Marker>

        {/* Route Line (Simple Simulation) */}
        <Polyline 
          positions={routePolyline} 
          color="#4F46E5" 
          weight={4} 
          dashArray="10, 10"
        />

        {error && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-rose-100 flex items-center gap-2">
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">{error} (Simulado)</span>
          </div>
        )}
      </MapContainer>
    </div>
  );
};
