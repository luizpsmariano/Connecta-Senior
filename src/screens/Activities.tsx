import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Calendar, Info, ArrowUpDown, Flame, ListFilter, Map as MapIcon, List } from 'lucide-react';
import { MOCK_ACTIVITIES } from '../constants';

import { Activity } from '../types';
import { ActivityDetails } from '../components/ActivityDetails';
import ActivityMap from '../components/ActivityMap';

interface ActivitiesProps {
  activities: Activity[];
  onToggleJoin: (id: string) => void;
  onCheckIn: (id: string) => void;
  viewType?: 'class' | 'event';
}

type SortOption = 'date' | 'popularity';
type CategoryFilter = 'all' | 'exercise' | 'social' | 'culture' | 'education';
type ViewMode = 'list' | 'map';

export const Activities: React.FC<ActivitiesProps> = ({ activities, onToggleJoin, onCheckIn, viewType }) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const categories: { label: string, value: CategoryFilter }[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Exercícios', value: 'exercise' },
    { label: 'Social', value: 'social' },
    { label: 'Cultura', value: 'culture' },
    { label: 'Educação', value: 'education' },
  ];

  const filteredAndSortedActivities = useMemo(() => {
    let result = [...activities];

    // Filter by type if provided
    if (viewType) {
      result = result.filter(a => a.type === viewType);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(a => a.category === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === 'popularity') {
        return b.currentParticipants - a.currentParticipants;
      }
      return 0;
    });

    return result;
  }, [activities, selectedCategory, sortBy]);

  return (
    <div className="space-y-6 pb-20 relative min-h-[600px]">
      {/* Tab-based Category Navigation */}
      <div className="bg-slate-50 p-1.5 rounded-[32px] flex w-full overflow-x-auto scrollbar-hide no-scrollbar relative" role="tablist" aria-label="Filtrar por categoria">
        {categories.map((cat) => (
          <button 
            key={cat.value}
            role="tab"
            aria-selected={selectedCategory === cat.value}
            aria-controls="activities-list"
            onClick={() => setSelectedCategory(cat.value)}
            className={`relative flex-shrink-0 px-6 py-3.5 rounded-[24px] font-black text-sm uppercase tracking-tight transition-all duration-300 outline-none active:scale-95 focus-visible:ring-4 focus-visible:ring-brand-primary ${
              selectedCategory === cat.value 
                ? 'text-white' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {selectedCategory === cat.value && (
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-brand-primary rounded-[24px] shadow-lg shadow-indigo-100"
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Sort and View Toggle */}
      <div className="flex gap-3 px-1 items-center">
        <div className="flex flex-1 gap-3" role="group" aria-label="Opções de ordenação">
          <button 
            onClick={() => setSortBy('date')}
            aria-pressed={sortBy === 'date'}
            className={`flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest border-2 transition-all outline-none focus-visible:ring-4 focus-visible:ring-slate-900 ${
              sortBy === 'date' 
                ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                : 'bg-white text-slate-500 border-slate-100'
            }`}
          >
            <Calendar size={14} />
            Data
          </button>
          <button 
            onClick={() => setSortBy('popularity')}
            aria-pressed={sortBy === 'popularity'}
            className={`flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest border-2 transition-all outline-none focus-visible:ring-4 focus-visible:ring-slate-900 ${
              sortBy === 'popularity' 
                ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                : 'bg-white text-slate-500 border-slate-100'
            }`}
          >
            <Flame size={14} />
            Vagas
          </button>
        </div>

        {/* View Mode Toggle */}
        <button 
          onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
          className="w-14 h-14 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          aria-label={viewMode === 'list' ? "Ver no mapa" : "Ver em lista"}
        >
          {viewMode === 'list' ? <MapIcon size={24} /> : <List size={24} />}
        </button>
      </div>

      <div className="flex-1 min-h-[500px]">
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div 
              key="list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-5" 
              role="list" 
              id="activities-list" 
              aria-label="Lista de atividades disponíveis"
            >
              {filteredAndSortedActivities.length > 0 ? (
                filteredAndSortedActivities.map((activity, index) => (
                  <ActivityCard 
                    key={activity.id} 
                    activity={activity} 
                    index={index} 
                    onJoin={() => onToggleJoin(activity.id)}
                    onOpen={() => setSelectedActivity(activity)}
                  />
                ))
              ) : (
                <div className="py-24 text-center">
                  <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ListFilter size={32} />
                  </div>
                  <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Nenhuma atividade encontrada</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="map-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full h-[500px]"
            >
              <ActivityMap 
                activities={filteredAndSortedActivities} 
                onActivitySelect={setSelectedActivity} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedActivity && (
          <ActivityDetails 
            activity={selectedActivity} 
            onClose={() => setSelectedActivity(null)} 
            onJoin={() => onToggleJoin(selectedActivity.id)}
            onCheckIn={() => onCheckIn(selectedActivity.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

interface ActivityCardProps {
  activity: Activity;
  index: number;
  onJoin: () => void;
  onOpen: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, index, onJoin, onOpen }) => {
  return (
    <motion.div 
      role="listitem"
      layoutId={`activity-${activity.id}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        delay: index * 0.1,
        layout: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } 
      }}
      className={`bg-white rounded-[40px] overflow-hidden shadow-xl border-2 transition-all group ${activity.isJoined ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-50'}`}
    >
      <div 
        className="h-44 relative cursor-pointer outline-none" 
        onClick={onOpen}
        role="button"
        tabIndex={0}
        aria-label={`Ver imagem e detalhes de ${activity.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        <img 
          src={activity.image} 
          alt="" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-5 right-5 bg-brand-primary text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
          {activity.category === 'exercise' ? 'Exercício' : 
           activity.category === 'social' ? 'Social' : 
           activity.category === 'culture' ? 'Cultura' : 'Geral'}
        </div>
        {activity.isJoined && (
          <div className="absolute top-5 left-5 bg-emerald-500 text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg flex items-center space-x-2">
            <span>✓ Inscrito</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/5 group-active:bg-black/20 group-focus-within:ring-4 group-focus-within:ring-brand-primary/30 transition-all cursor-pointer" />
      </div>
      <div className="p-6">
        <div 
          className="flex justify-between items-start gap-4 mb-1 cursor-pointer" 
          onClick={onOpen}
          aria-hidden="true" // Already covered by button or card title
        >
          <h3 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tight flex-1">{activity.title}</h3>
          <div className="p-2 bg-slate-100 rounded-full text-slate-400">
            <Info size={24} />
          </div>
        </div>

        {/* Capacity Indicator */}
        <div className="mb-4 flex items-center justify-between" aria-label={`Vagas preenchidas: ${activity.currentParticipants} de ${activity.maxParticipants}`}>
          <div className="flex-1 mr-4" aria-hidden="true">
             <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${(activity.currentParticipants / activity.maxParticipants) * 100}%` }}
                 className={`h-full ${activity.currentParticipants >= activity.maxParticipants ? 'bg-rose-500' : 'bg-emerald-500'}`}
               />
             </div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap" aria-hidden="true">
            {activity.currentParticipants} / {activity.maxParticipants} Vagas
          </span>
        </div>
        
        <div 
          className="space-y-3 bg-slate-50 p-5 rounded-[32px] mb-6 cursor-pointer" 
          onClick={onOpen}
          aria-label="Informações de data e local"
        >
          <div className="flex items-center text-base text-slate-900 font-black" aria-label={`Data: ${new Date(activity.date).toLocaleDateString('pt-BR')}`}>
            <Calendar size={24} className="mr-3 text-brand-primary" aria-hidden="true" />
            <span>{new Date(activity.date).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex items-center text-base text-slate-900 font-black" aria-label={`Horário: ${activity.time}`}>
            <Clock size={24} className="mr-3 text-brand-primary" aria-hidden="true" />
            <span>{activity.time}h</span>
          </div>
          <div className="flex items-center text-base text-slate-900 font-black" aria-label={`Local: ${activity.location}`}>
            <MapPin size={24} className="mr-3 text-brand-primary" aria-hidden="true" />
            <span className="truncate">{activity.location}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onOpen}
            className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-[28px] font-black text-sm uppercase tracking-tight active:scale-95 transition-transform"
          >
            Ver Detalhes
          </button>
          {!activity.isJoined ? (
            <button 
              onClick={onOpen} // Open details to show registration form
              className="flex-[1.5] py-4 bg-brand-primary text-white rounded-[28px] font-black text-sm uppercase tracking-tight shadow-md active:scale-95 transition-transform"
            >
              Inscrever-se
            </button>
          ) : (
            <button 
              onClick={onJoin}
              className="flex-[1.5] py-4 bg-rose-500 text-white rounded-[28px] font-black text-sm uppercase tracking-tight shadow-md active:scale-95 transition-transform"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
