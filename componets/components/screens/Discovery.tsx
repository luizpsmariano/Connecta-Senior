import { useState } from 'react';
import { Search, Filter, Bell } from 'lucide-react';
import { EventCard } from '../EventCard';
import { Tag } from '../Tag';
import { motion } from 'motion/react';

interface DiscoveryProps {
  onEventClick: (eventId: string) => void;
}

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'physical', label: 'Atividade Física' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'social', label: 'Social' },
  { id: 'health', label: 'Saúde' }
];

const events = [
  {
    id: '1',
    title: 'Caminhada no Parque',
    category: 'Atividade Física',
    date: '15 Nov',
    time: '08:00',
    location: 'Parque Municipal',
    attendees: 12,
    maxAttendees: 20,
    image: 'https://images.unsplash.com/photo-1758612899183-3c0f7481bc93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBlbGRlcmx5JTIwYWN0aXZpdHl8ZW58MXx8fHwxNzYyNTM3NTE1fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '2',
    title: 'Yoga para Terceira Idade',
    category: 'Atividade Física',
    date: '16 Nov',
    time: '09:00',
    location: 'Centro Comunitário',
    attendees: 8,
    maxAttendees: 15,
    image: 'https://images.unsplash.com/photo-1747302653826-42c6cd7295f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwZXhlcmNpc2UlMjB5b2dhfGVufDF8fHx8MTc2MjUzNzUxNnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '3',
    title: 'Exposição de Arte Local',
    category: 'Cultural',
    date: '18 Nov',
    time: '14:00',
    location: 'Museu da Cidade',
    attendees: 25,
    maxAttendees: 50,
    image: 'https://images.unsplash.com/photo-1753164725041-6b62fb0d64b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBjdWx0dXJlJTIwYXJ0fGVufDF8fHx8MTc2MjUzNzUxNnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '4',
    title: 'Encontro Social - Café da Manhã',
    category: 'Social',
    date: '20 Nov',
    time: '10:00',
    location: 'Praça Central',
    attendees: 18,
    maxAttendees: 30,
    image: 'https://images.unsplash.com/photo-1760454477189-9af9947786ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBldmVudCUyMGdhdGhlcmluZ3xlbnwxfHx8fDE3NjI0MTg4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function Discovery({ onEventClick }: DiscoveryProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || 
      event.category.toLowerCase().includes(selectedCategory);
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[var(--color-neutral-50)] pb-24">
      {/* Header */}
      <div className="bg-white shadow-[var(--elevation-1)] sticky top-0 z-10">
        <div className="max-w-lg mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-[var(--color-neutral-900)]">Descubra</h1>
              <p className="text-[var(--color-neutral-700)] mt-1">
                Encontre atividades próximas
              </p>
            </div>
            <button 
              className="p-3 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-main)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30"
              aria-label="Notificações"
            >
              <Bell className="w-6 h-6" />
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--color-neutral-700)]" />
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-[56px] pl-14 pr-4 rounded-[var(--radius-m)] bg-[var(--color-neutral-100)] border-2 border-transparent focus:border-[var(--color-primary-main)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-lg mx-auto px-6 py-4">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-4 py-2 rounded-full whitespace-nowrap min-h-[44px]
                transition-all duration-300
                focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30
                ${selectedCategory === category.id
                  ? 'bg-[var(--color-primary-main)] text-white'
                  : 'bg-white text-[var(--color-neutral-900)] border-2 border-[var(--color-neutral-300)]'
                }
              `}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Events grid */}
      <div className="max-w-lg mx-auto px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[var(--color-neutral-700)]">
            {filteredEvents.length} eventos encontrados
          </p>
          <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-s)] text-[var(--color-primary-main)] min-h-[44px] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30">
            <Filter className="w-5 h-5" />
            Filtros
          </button>
        </div>

        <div className="grid gap-4">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              onClick={() => onEventClick(event.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
