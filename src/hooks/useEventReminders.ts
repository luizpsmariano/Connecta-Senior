import { useEffect, useRef } from 'react';
import { isAfter, isBefore, addHours, parseISO } from 'date-fns';
import { Activity } from '../types';
import { useNotifications } from '../components/NotificationManager';

export const useEventReminders = (activities: Activity[], enabled: boolean = true) => {
  const { addNotification } = useNotifications();
  const notifiedEventsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!enabled) return;

    // We run the check every 30 seconds to see if any event is coming up
    const checkUpcomingEvents = () => {
      const now = new Date();
      const threeHoursFromNow = addHours(now, 3);

      const eventsComingUp = activities.filter(activity => {
        if (!activity.isJoined) return false;
        if (notifiedEventsRef.current.has(activity.id)) return false;

        const eventDate = parseISO(`${activity.date}T${activity.time}`);
        
        // If event is starting within the next 3 hours and hasn't started yet
        return isAfter(eventDate, now) && isBefore(eventDate, threeHoursFromNow);
      });

      eventsComingUp.forEach(event => {
        addNotification({
          title: 'Lembrete de Evento',
          body: `Seu evento "${event.title}" começa em breve, às ${event.time} no ${event.location}.`,
          type: 'event'
        });
        notifiedEventsRef.current.add(event.id);
      });
    };

    // Initial check
    checkUpcomingEvents();

    const interval = setInterval(checkUpcomingEvents, 30000);
    return () => clearInterval(interval);
  }, [activities, addNotification]);
};
