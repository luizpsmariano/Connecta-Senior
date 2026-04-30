import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Activity } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Clock, Info } from 'lucide-react';

interface ActivityMapProps {
  activities: Activity[];
  onActivitySelect: (activity: Activity) => void;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

// Center of Pinhais/PR based on mock data
const center = {
  lat: -25.441113,
  lng: -49.191592,
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    {
      "featureType": "poi.business",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [{ "visibility": "simplified" }]
    }
  ]
};

const ActivityMap: React.FC<ActivityMapProps> = ({ activities, onActivitySelect }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-slate-100 flex items-center justify-center rounded-[40px] border-4 border-white shadow-inner">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Carregando Mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-[40px] overflow-hidden border-4 border-white shadow-xl relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {activities.map((activity) => (
          <Marker
            key={activity.id}
            position={{ lat: activity.lat, lng: activity.lng }}
            onClick={() => setSelectedActivity(activity)}
            icon={{
              url: activity.category === 'exercise' ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' :
                   activity.category === 'social' ? 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png' :
                   activity.category === 'education' ? 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' :
                   'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            }}
          />
        ))}

        <AnimatePresence>
          {selectedActivity && (
            <InfoWindow
              position={{ lat: selectedActivity.lat, lng: selectedActivity.lng }}
              onCloseClick={() => setSelectedActivity(null)}
            >
              <div className="p-2 max-w-[200px]" onClick={() => onActivitySelect(selectedActivity)}>
                <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm mb-1">{selectedActivity.title}</h4>
                <div className="flex items-center text-[10px] text-slate-500 font-bold mb-1">
                  <MapPin size={12} className="mr-1 text-brand-primary" />
                  <span className="truncate">{selectedActivity.location}</span>
                </div>
                <div className="flex items-center text-[10px] text-slate-500 font-bold mb-2">
                  <Clock size={12} className="mr-1 text-brand-primary" />
                  <span>{selectedActivity.time}</span>
                </div>
                <button 
                  className="w-full py-1 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg"
                >
                  Ver Detalhes
                </button>
              </div>
            </InfoWindow>
          )}
        </AnimatePresence>
      </GoogleMap>

      {/* Map Legend */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-white/50 space-y-2">
        <LegendItem color="text-green-500" label="Exercício" />
        <LegendItem color="text-orange-500" label="Social" />
        <LegendItem color="text-blue-500" label="Educação" />
        <LegendItem color="text-red-500" label="Cultura/Outros" />
      </div>
    </div>
  );
};

const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2 h-2 rounded-full bg-current ${color}`} />
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{label}</span>
  </div>
);

export default ActivityMap;
