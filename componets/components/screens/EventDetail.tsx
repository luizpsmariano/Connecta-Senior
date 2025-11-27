import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Calendar, MapPin, Users, Clock, Info } from 'lucide-react';
import { ButtonPrimary } from '../ButtonPrimary';
import { ButtonSecondary } from '../ButtonSecondary';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface EventDetailProps {
  eventId: string;
  onBack: () => void;
}

export function EventDetail({ eventId, onBack }: EventDetailProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock event data
  const event = {
    id: eventId,
    title: 'Caminhada no Parque',
    category: 'Atividade Física',
    date: '15 de Novembro, 2025',
    time: '08:00 - 10:00',
    location: 'Parque Municipal',
    address: 'Rua das Flores, 123 - Centro',
    attendees: 12,
    maxAttendees: 20,
    image: 'https://images.unsplash.com/photo-1758612899183-3c0f7481bc93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBlbGRlcmx5JTIwYWN0aXZpdHl8ZW58MXx8fHwxNzYyNTM3NTE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Junte-se a nós para uma caminhada revigorante no Parque Municipal. Esta atividade é perfeita para todas as idades e níveis de condicionamento físico. Vamos caminhar em um ritmo confortável, apreciar a natureza e socializar com outros membros da comunidade.',
    organizer: 'Secretaria de Esportes',
    requirements: ['Usar calçados confortáveis', 'Trazer garrafa de água', 'Chegar 10 minutos antes']
  };

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setIsRegistered(true);
      setShowConfirmDialog(true);
      setLoading(false);
    }, 1500);
  };

  const handleUnregister = () => {
    setIsRegistered(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-neutral-50)]">
      {/* Header image */}
      <div className="relative h-64">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-3 rounded-full bg-white shadow-[var(--elevation-2)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30"
          aria-label="Voltar"
        >
          <ChevronLeft className="w-6 h-6 text-[var(--color-neutral-900)]" />
        </button>
        <div className="absolute bottom-4 left-6">
          <span className="inline-block px-3 py-1.5 bg-[var(--color-accent-main)] text-white rounded-full text-[var(--text-caption)]">
            {event.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-6 py-6 pb-32">
        <h1 className="mb-6 text-[var(--color-neutral-900)]">{event.title}</h1>

        {/* Info cards */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4 p-4 bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)]">
            <div className="p-3 rounded-full bg-[var(--color-primary-light)]">
              <Calendar className="w-6 h-6 text-[var(--color-primary-main)]" />
            </div>
            <div className="flex-1">
              <p className="text-[var(--color-neutral-700)] text-[var(--text-caption)]">Data</p>
              <p className="text-[var(--color-neutral-900)]">{event.date}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)]">
            <div className="p-3 rounded-full bg-[var(--color-primary-light)]">
              <Clock className="w-6 h-6 text-[var(--color-primary-main)]" />
            </div>
            <div className="flex-1">
              <p className="text-[var(--color-neutral-700)] text-[var(--text-caption)]">Horário</p>
              <p className="text-[var(--color-neutral-900)]">{event.time}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)]">
            <div className="p-3 rounded-full bg-[var(--color-primary-light)]">
              <MapPin className="w-6 h-6 text-[var(--color-primary-main)]" />
            </div>
            <div className="flex-1">
              <p className="text-[var(--color-neutral-700)] text-[var(--text-caption)]">Local</p>
              <p className="text-[var(--color-neutral-900)]">{event.location}</p>
              <p className="text-[var(--color-neutral-700)] text-[var(--text-caption)] mt-1">
                {event.address}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)]">
            <div className="p-3 rounded-full bg-[var(--color-primary-light)]">
              <Users className="w-6 h-6 text-[var(--color-primary-main)]" />
            </div>
            <div className="flex-1">
              <p className="text-[var(--color-neutral-700)] text-[var(--text-caption)]">Participantes</p>
              <p className="text-[var(--color-neutral-900)]">
                {event.attendees}/{event.maxAttendees} inscritos
              </p>
              <div className="mt-2 h-2 bg-[var(--color-neutral-200)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[var(--color-primary-main)] transition-all duration-300"
                  style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="mb-3 text-[var(--color-neutral-900)]">Sobre o Evento</h3>
          <p className="text-[var(--color-neutral-700)] leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Requirements */}
        <div className="mb-8 p-4 bg-[var(--color-accent-light)] rounded-[var(--radius-m)] border-2 border-[var(--color-accent-main)]/20">
          <div className="flex items-start gap-3 mb-3">
            <Info className="w-6 h-6 text-[var(--color-accent-main)] flex-shrink-0 mt-1" />
            <h3 className="text-[var(--color-neutral-900)]">O que levar</h3>
          </div>
          <ul className="space-y-2 ml-9">
            {event.requirements.map((req, index) => (
              <li key={index} className="text-[var(--color-neutral-700)] flex items-start gap-2">
                <span className="text-[var(--color-accent-main)]">•</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Organizer */}
        <div className="mb-8">
          <p className="text-[var(--color-neutral-700)]">
            Organizado por: <span className="text-[var(--color-neutral-900)]">{event.organizer}</span>
          </p>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[var(--color-neutral-200)] shadow-[var(--elevation-3)] p-6">
        <div className="max-w-lg mx-auto">
          {!isRegistered ? (
            <ButtonPrimary onClick={handleRegister} fullWidth loading={loading}>
              Confirmar Inscrição
            </ButtonPrimary>
          ) : (
            <div className="space-y-3">
              <div className="p-4 bg-[var(--color-success-light)] rounded-[var(--radius-m)] text-center">
                <p className="text-[var(--color-success)]">
                  ✓ Você está inscrito neste evento
                </p>
              </div>
              <ButtonSecondary onClick={handleUnregister} fullWidth>
                Cancelar Inscrição
              </ButtonSecondary>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle className="text-center mb-4">
              Inscrição Confirmada!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-success-light)] flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <span className="text-5xl">✓</span>
              </motion.div>
            </div>
            <p className="text-[var(--color-neutral-700)] mb-6">
              Você foi inscrito com sucesso em <strong>{event.title}</strong>. 
              Enviamos uma confirmação para seu email.
            </p>
            <ButtonPrimary onClick={() => setShowConfirmDialog(false)} fullWidth>
              Entendi
            </ButtonPrimary>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
