import React, { createContext, useContext, useState, useCallback } from 'react';

export interface UserRegistration {
  eventId: string;
  userId: string;
  registeredAt: Date;
  checkedIn: boolean;
  checkedInAt?: Date;
}

export interface EventContextType {
  registrations: Map<string, UserRegistration>;
  registerEvent: (eventId: string, userId: string) => void;
  unregisterEvent: (eventId: string, userId: string) => void;
  isEventRegistered: (eventId: string, userId: string) => boolean;
  checkInEvent: (eventId: string, userId: string, location: { lat: number; lng: number }) => boolean;
  isCheckedIn: (eventId: string, userId: string) => boolean;
  getEventRegistrations: (eventId: string) => UserRegistration[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [registrations, setRegistrations] = useState<Map<string, UserRegistration>>(new Map());
  const [currentUserId] = useState('user-123');

  const registerEvent = useCallback((eventId: string, userId: string) => {
    const key = `${eventId}-${userId}`;
    setRegistrations(prev => {
      const newMap = new Map(prev);
      newMap.set(key, {
        eventId,
        userId,
        registeredAt: new Date(),
        checkedIn: false,
      });
      return newMap;
    });
  }, []);

  const unregisterEvent = useCallback((eventId: string, userId: string) => {
    const key = `${eventId}-${userId}`;
    setRegistrations(prev => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const isEventRegistered = useCallback((eventId: string, userId: string): boolean => {
    const key = `${eventId}-${userId}`;
    return registrations.has(key);
  }, [registrations]);

  const checkInEvent = useCallback((eventId: string, userId: string, location: { lat: number; lng: number }): boolean => {
    const key = `${eventId}-${userId}`;
    const registration = registrations.get(key);

    if (!registration) {
      return false;
    }

    const isNearEvent = true;

    if (isNearEvent) {
      setRegistrations(prev => {
        const newMap = new Map(prev);
        const updated = { ...registration, checkedIn: true, checkedInAt: new Date() };
        newMap.set(key, updated);
        return newMap;
      });
      return true;
    }

    return false;
  }, [registrations]);

  const isCheckedIn = useCallback((eventId: string, userId: string): boolean => {
    const key = `${eventId}-${userId}`;
    const registration = registrations.get(key);
    return registration?.checkedIn ?? false;
  }, [registrations]);

  const getEventRegistrations = useCallback((eventId: string): UserRegistration[] => {
    const result: UserRegistration[] = [];
    registrations.forEach((reg) => {
      if (reg.eventId === eventId) {
        result.push(reg);
      }
    });
    return result;
  }, [registrations]);

  return (
    <EventContext.Provider
      value={{
        registrations,
        registerEvent,
        unregisterEvent,
        isEventRegistered,
        checkInEvent,
        isCheckedIn,
        getEventRegistrations,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvent must be used within EventProvider');
  }
  return context;
}
