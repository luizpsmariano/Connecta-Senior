import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, MapPinned, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';

interface CheckInButtonProps {
  targetLat: number;
  targetLng: number;
  onSuccess: () => void;
  isCheckedIn: boolean;
}

export const CheckInButton: React.FC<CheckInButtonProps> = ({ targetLat, targetLng, onSuccess, isCheckedIn }) => {
  const [status, setStatus] = useState<'idle' | 'locating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in metres
  };

  const handleCheckIn = () => {
    if (!navigator.geolocation) {
      setErrorMessage('Localização não suportada no seu aparelho.');
      setStatus('error');
      return;
    }

    setStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const distance = calculateDistance(
          position.coords.latitude,
          position.coords.longitude,
          targetLat,
          targetLng
        );

        // Allow check-in if within 500 meters
        if (distance < 500) {
          setStatus('success');
          onSuccess();
        } else {
          setErrorMessage('Você parece não estar no local do evento ainda.');
          setStatus('error');
        }
      },
      (error) => {
        setErrorMessage('Não conseguimos encontrar sua localização.');
        setStatus('error');
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  if (isCheckedIn) {
    return (
      <div className="w-full py-4 bg-emerald-700 text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-tighter shadow-lg">
        <CheckCircle2 size={24} />
        <span>Presença Confirmada</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <button 
        onClick={handleCheckIn}
        disabled={status === 'locating'}
        aria-busy={status === 'locating'}
        aria-describedby={status === 'error' ? "check-in-error" : undefined}
        className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-tighter shadow-xl transition-all active:scale-95 border-b-4 outline-none focus-visible:ring-4 focus-visible:ring-amber-300 ${
          status === 'locating' 
          ? 'bg-slate-200 text-slate-500 border-slate-300' 
          : 'bg-amber-500 text-white border-amber-700 shadow-amber-200'
        }`}
      >
        {status === 'locating' ? (
          <>
            <Loader2 size={24} className="animate-spin" />
            <span>Localizando...</span>
          </>
        ) : (
          <>
            <MapPinned size={24} />
            <span>Fazer Check-in (GPS)</span>
          </>
        )}
      </button>
      
      <div aria-live="polite" className="sr-only">
        {status === 'locating' && "Localizando sua posição..."}
        {status === 'success' && "Check-in realizado com sucesso!"}
        {status === 'error' && errorMessage}
      </div>

      {status === 'error' && (
        <motion.div 
          id="check-in-error"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold flex items-center gap-2 border border-red-100"
        >
          <AlertTriangle size={14} />
          {errorMessage}
        </motion.div>
      )}
    </div>
  );
};
