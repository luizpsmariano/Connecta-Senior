import { motion } from 'motion/react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventCardProps {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  attendees?: number;
  maxAttendees?: number;
  image: string;
  onClick?: () => void;
}

export function EventCard({
  title,
  category,
  date,
  time,
  location,
  attendees,
  maxAttendees,
  image,
  onClick
}: EventCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-2)] overflow-hidden cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className="inline-block px-3 py-1.5 bg-[var(--color-accent-main)] text-white rounded-full text-[var(--text-caption)]">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="mb-3 text-[var(--color-neutral-900)]">{title}</h3>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[var(--color-neutral-700)]">
            <Calendar className="w-5 h-5 flex-shrink-0" />
            <span className="text-[var(--text-body)]">{date} • {time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-[var(--color-neutral-700)]">
            <MapPin className="w-5 h-5 flex-shrink-0" />
            <span className="text-[var(--text-body)]">{location}</span>
          </div>
          
          {attendees !== undefined && maxAttendees && (
            <div className="flex items-center gap-2 text-[var(--color-neutral-700)]">
              <Users className="w-5 h-5 flex-shrink-0" />
              <span className="text-[var(--text-body)]">
                {attendees}/{maxAttendees} inscritos
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
