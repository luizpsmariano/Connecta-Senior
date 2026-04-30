import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  addMonths, 
  subMonths,
  getDay,
  startOfWeek,
  endOfWeek
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { Activity } from '../types';
import { CheckInButton } from './CheckInButton';

interface MonthlyCalendarProps {
  activities: Activity[];
  onCheckIn: (id: string) => void;
}

export const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({ activities, onCheckIn }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const joinedActivities = activities.filter(a => a.isJoined);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const activitiesOnSelectedDate = joinedActivities.filter(a => 
    isSameDay(new Date(a.date), selectedDate)
  );

  return (
    <div className="bg-white rounded-[40px] shadow-xl border-2 border-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black uppercase tracking-tighter leading-none">Minha Agenda</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={prevMonth}
            aria-label="Mês anterior"
            className="p-2 hover:bg-white/10 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-white outline-none"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextMonth}
            aria-label="Próximo mês"
            className="p-2 hover:bg-white/10 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-white outline-none"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Days Header */}
        <div className="grid grid-cols-7 mb-2" aria-hidden="true">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
            <div key={i} className="text-center text-[10px] font-black text-slate-300 uppercase py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Calendário mensal">
          {calendarDays.map((day, i) => {
            const isCurrentMonth = isSameDay(startOfMonth(day), startOfMonth(currentDate));
            const hasActivity = joinedActivities.some(a => isSameDay(new Date(a.date), day));
            const isSelected = isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());
            
            const dayLabel = format(day, "EEEE, d 'de' MMMM", { locale: ptBR });
            const activityLabel = hasActivity ? ' - Possui evento agendado' : '';

            return (
              <button
                key={i}
                onClick={() => setSelectedDate(day)}
                aria-label={`${dayLabel}${activityLabel}`}
                aria-selected={isSelected}
                role="gridcell"
                className={`
                  relative h-12 flex items-center justify-center rounded-2xl text-sm font-black transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-primary
                  ${!isCurrentMonth ? 'text-slate-200' : 'text-slate-900'}
                  ${isSelected ? 'bg-brand-primary text-white shadow-lg shadow-indigo-100 scale-105 z-10' : 'hover:bg-slate-50'}
                  ${isToday && !isSelected ? 'text-brand-primary underline decoration-2' : ''}
                `}
              >
                {format(day, 'd')}
                {hasActivity && !isSelected && (
                  <div className={`absolute bottom-2 w-1.5 h-1.5 rounded-full ${isToday ? 'bg-brand-primary' : 'bg-amber-400'}`} />
                )}
                {isToday && isSelected && (
                   <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Activity Details for Selected Date */}
        <div className="mt-6 pt-6 border-t-2 border-slate-50">
          <AnimatePresence mode="wait">
            {activitiesOnSelectedDate.length > 0 ? (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CalendarIcon size={14} className="text-brand-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
                  </span>
                </div>
                {activitiesOnSelectedDate.map(activity => (
                  <div key={activity.id} className="bg-slate-50 rounded-3xl p-4 border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-black text-slate-900 uppercase tracking-tight">{activity.title}</h4>
                        <p className="text-xs font-bold text-slate-500">{activity.time}h • {activity.location}</p>
                      </div>
                      <div className="bg-amber-100 text-amber-700 p-2 rounded-xl">
                        <MapPin size={16} />
                      </div>
                    </div>
                    
                    {/* Check-in logic: Only show if it matches current simulated date */}
                    {/* In a real app, we check if new Date(activity.date) is same day as today */}
                    {isSameDay(new Date(activity.date), new Date()) && (
                      <div className="mt-2">
                        <CheckInButton 
                          targetLat={activity.lat} 
                          targetLng={activity.lng} 
                          isCheckedIn={!!activity.isCheckedIn}
                          onSuccess={() => onCheckIn(activity.id)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-8 text-center"
              >
                <div className="text-slate-300 mb-2">
                  <CalendarIcon size={24} className="mx-auto opacity-20" />
                </div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Nenhum evento agendado</p>
                <p className="text-[9px] font-bold text-slate-200 uppercase tracking-tight mt-1">
                  Selecione um dia com ponto para detalhes
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
