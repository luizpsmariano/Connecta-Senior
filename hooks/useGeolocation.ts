import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';

export interface GeolocationCoordinates {
  lat: number;
  lng: number;
  accuracy: number;
}

export interface GeolocationState {
  coordinates: GeolocationCoordinates | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    loading: false,
  });

  const requestLocation = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setState({
          coordinates: null,
          error: 'Permissão de localização negada',
          loading: false,
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setState({
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
          accuracy: location.coords.accuracy || 0,
        },
        error: null,
        loading: false,
      });
    } catch (error) {
      setState({
        coordinates: null,
        error: error instanceof Error ? error.message : 'Erro ao obter localização',
        loading: false,
      });
    }
  }, []);

  const watchLocation = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setState({
          coordinates: null,
          error: 'Permissão de localização negada',
          loading: false,
        });
        return;
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        location => {
          setState({
            coordinates: {
              lat: location.coords.latitude,
              lng: location.coords.longitude,
              accuracy: location.coords.accuracy || 0,
            },
            error: null,
            loading: false,
          });
        }
      );

      return () => subscription.remove();
    } catch (error) {
      setState({
        coordinates: null,
        error: error instanceof Error ? error.message : 'Erro ao obter localização',
        loading: false,
      });
    }
  }, []);

  return {
    ...state,
    requestLocation,
    watchLocation,
  };
}

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function isNearEvent(
  userLat: number,
  userLng: number,
  eventLat: number,
  eventLng: number,
  radiusMeters: number = 500
): boolean {
  const distance = calculateDistance(userLat, userLng, eventLat, eventLng);
  return distance <= radiusMeters;
}
