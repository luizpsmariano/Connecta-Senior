import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface CalendarScreenProps {
  onEventClick: (eventId: string) => void;
}

const myEvents = [
  {
    id: '1',
    title: 'Caminhada no Parque',
    date: '2025-11-15',
    time: '08:00',
    category: 'Atividade Física'
  },
  {
    id: '2',
    title: 'Yoga para Terceira Idade',
    date: '2025-11-16',
    time: '09:00',
    category: 'Atividade Física'
  },
  {
    id: '3',
    title: 'Exposição de Arte Local',
    date: '2025-11-18',
    time: '14:00',
    category: 'Cultural'
  },
  {
    id: '4',
    title: 'Encontro Social',
    date: '2025-11-20',
    time: '10:00',
    category: 'Social'
  }
];

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function CalendarScreen({ onEventClick }: CalendarScreenProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 7)); // November 7, 2025
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const hasEventOnDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return myEvents.some(event => event.date === dateStr);
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return myEvents.filter(event => event.date === dateStr);
  };

  const selectedEvents = getEventsForDate(selectedDate);

  return (
    <div className="min-h-screen bg-[var(--color-neutral-50)] pb-24">
      {/* Header */}
      <div className="bg-white shadow-[var(--elevation-1)]">
        <div className="max-w-lg mx-auto p-6">
          <h1 className="text-[var(--color-neutral-900)] mb-2">Minha Agenda</h1>
          <p className="text-[var(--color-neutral-700)]">
            Você tem {myEvents.length} eventos agendados
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-6">
        {/* Calendar navigation */}
        <div className="bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)] p-4 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[var(--color-neutral-900)]">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={previousMonth}
                className="p-2 rounded-[var(--radius-s)] bg-[var(--color-primary-light)] text-[var(--color-primary-main)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30"
                aria-label="Mês anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={nextMonth}
                className="p-2 rounded-[var(--radius-s)] bg-[var(--color-primary-light)] text-[var(--color-primary-main)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30"
                aria-label="Próximo mês"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Week days */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-[var(--color-neutral-700)] text-[var(--text-caption)] p-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const isSelected = selectedDate?.getDate() === day && 
                selectedDate?.getMonth() === currentDate.getMonth();
              const hasEvent = hasEventOnDate(day);
              const isToday = day === 7 && currentDate.getMonth() === 10; // November 7

              return (
                <motion.button
                  key={day}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDate(date)}
                  className={`
                    aspect-square rounded-[var(--radius-s)] flex flex-col items-center justify-center
                    transition-all duration-300 relative
                    focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30
                    ${isSelected 
                      ? 'bg-[var(--color-primary-main)] text-white' 
                      : isToday
                      ? 'bg-[var(--color-primary-light)] text-[var(--color-primary-main)]'
                      : 'hover:bg-[var(--color-neutral-100)] text-[var(--color-neutral-900)]'
                    }
                  `}
                >
                  <span className="text-[var(--text-body)]">{day}</span>
                  {hasEvent && (
                    <div className={`w-1.5 h-1.5 rounded-full mt-1 ${
                      isSelected ? 'bg-white' : 'bg-[var(--color-accent-main)]'
                    }`} />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Events for selected date */}
        {selectedDate && selectedEvents.length > 0 ? (
          <div>
            <h3 className="mb-4 text-[var(--color-neutral-900)]">
              Eventos em {selectedDate.getDate()} de {months[selectedDate.getMonth()]}
            </h3>
            <div className="space-y-3">
              {selectedEvents.map((event) => (
                <motion.div
                  key={event.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onEventClick(event.id)}
                  className="bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)] p-4 cursor-pointer hover:shadow-[var(--elevation-2)] transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-[var(--radius-s)] bg-[var(--color-primary-light)]">
                      <CalendarIcon className="w-6 h-6 text-[var(--color-primary-main)]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[var(--color-neutral-900)] mb-1">{event.title}</h4>
                      <p className="text-[var(--color-neutral-700)] text-[var(--text-caption)]">
                        {event.time} • {event.category}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : selectedDate ? (
          <div className="text-center p-8 bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)]">
            <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-[var(--color-neutral-300)]" />
            <p className="text-[var(--color-neutral-700)]">
              Nenhum evento nesta data
            </p>
          </div>
        ) : (
          <div className="text-center p-8 bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)]">
            <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-[var(--color-neutral-300)]" />
            <p className="text-[var(--color-neutral-700)]">
              Selecione uma data para ver os eventos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
