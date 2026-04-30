export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: '1',
    title: 'Novo Evento!',
    body: 'A Prefeitura adicionou o Baile da Melhor Idade. Confira!',
    time: 'Há 5 min',
    type: 'event',
    read: false
  },
  {
    id: '2',
    title: 'Conversa Nova',
    body: 'Dona Maria enviou uma mensagem para você.',
    time: 'Há 1 hora',
    type: 'message',
    read: true
  },
  {
    id: '3',
    title: 'Lembrete de Saúde',
    body: 'Hora de tomar sua Vitamina C.',
    time: 'Há 2 horas',
    type: 'health',
    read: true
  }
];

import { Activity, Message, Medication, AppNotification } from './types';

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Ginástica Localizada',
    description: 'Venha se exercitar e manter a saúde em dia com nosso grupo matinal. Atividade voltada para fortalecimento muscular e flexibilidade.',
    date: '2026-04-23',
    time: '08:00',
    location: 'Ginásio Municipal de Pinhais',
    category: 'exercise',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
    isJoined: true,
    tips: ['Use tênis confortável', 'Leve sua garrafinha de água'],
    maxParticipants: 30,
    currentParticipants: 24,
    lat: -25.441113,
    lng: -49.191592,
    isCheckedIn: false,
    type: 'class'
  },
  {
    id: '2',
    title: 'Chá com Histórias',
    description: 'Um momento delicioso para compartilhar memórias e ouvir boas histórias com as amigas.',
    date: '2026-04-24',
    time: '20:30',
    location: 'Centro Cultural de Pinhais',
    category: 'social',
    image: 'https://images.unsplash.com/photo-1544787210-2213d84ad960?auto=format&fit=crop&q=80&w=800',
    isJoined: true,
    tips: ['Traga sua xícara favorita', 'Evento gratuito'],
    maxParticipants: 20,
    currentParticipants: 18,
    lat: -25.442567,
    lng: -49.193256,
    isCheckedIn: false,
    type: 'event'
  },
  {
    id: '3',
    title: 'Informática Básica',
    description: 'Aprenda a usar o celular, WhatsApp e o computador para se conectar com a família.',
    date: '2026-04-25',
    time: '10:00',
    location: 'Biblioteca Pública',
    category: 'education',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    isJoined: false,
    tips: ['Traga seu celular carregado', 'Não precisa ter conhecimento prévio'],
    maxParticipants: 15,
    currentParticipants: 8,
    lat: -25.441500,
    lng: -49.192000,
    isCheckedIn: false,
    type: 'event'
  },
  {
    id: '4',
    title: 'Baile da Melhor Idade',
    description: 'Tarde de música e dança para celebrar a vida. Traga sua animação!',
    date: '2026-04-28',
    time: '14:00',
    location: 'Bosque Municipal',
    category: 'culture',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
    isJoined: true,
    tips: ['Use sapatos confortáveis', 'Haverá lanche comunitário'],
    maxParticipants: 100,
    currentParticipants: 65,
    lat: -25.438000,
    lng: -49.185000,
    isCheckedIn: false,
    type: 'event'
  },
  {
    id: '5',
    title: 'Hidroginástica',
    description: 'Exercícios na água para melhorar a circulação e fortalecer as articulações.',
    date: '2026-04-30',
    time: '09:00',
    location: 'Piscina Municipal',
    category: 'exercise',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800',
    isJoined: false,
    tips: ['Use touca de natação', 'Traga toalha e chinelo'],
    maxParticipants: 25,
    currentParticipants: 12,
    lat: -25.443000,
    lng: -49.195000,
    isCheckedIn: false,
    type: 'class'
  },
  {
    id: '6',
    title: 'Yoga Suave',
    description: 'Equilíbrio entre corpo e mente com posturas leves e respiração.',
    date: '2026-05-02',
    time: '07:30',
    location: 'Sala Multiuso - Ginásio',
    category: 'health',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    isJoined: false,
    tips: ['Use roupas que permitam movimento', 'Traga seu tapetinho se tiver'],
    maxParticipants: 15,
    currentParticipants: 5,
    lat: -25.441113,
    lng: -49.191592,
    isCheckedIn: false,
    type: 'class'
  },
  {
    id: '7',
    title: 'Natação para Idosos',
    description: 'Aprenda ou aperfeiçoe sua natação em um ambiente seguro e controlado.',
    date: '2026-05-05',
    time: '11:00',
    location: 'Piscina Municipal',
    category: 'exercise',
    image: 'https://images.unsplash.com/photo-1530549387074-d562cb0e55b6?auto=format&fit=crop&q=80&w=800',
    isJoined: false,
    tips: ['Exame médico em dia', 'Uso obrigatório de touca'],
    maxParticipants: 10,
    currentParticipants: 3,
    lat: -25.443000,
    lng: -49.195000,
    isCheckedIn: false,
    type: 'class'
  },
  {
    id: '8',
    title: 'Vôlei Adaptado',
    description: 'Esporte em equipe focado na diversão e coordenação motora.',
    date: '2026-05-07',
    time: '15:00',
    location: 'Ginásio Municipal',
    category: 'exercise',
    image: 'https://images.unsplash.com/photo-1547347695-1943f58a995d?auto=format&fit=crop&q=80&w=800',
    isJoined: false,
    tips: ['Tênis com bom amortecimento', 'Espírito esportivo!'],
    maxParticipants: 20,
    currentParticipants: 6,
    lat: -25.441113,
    lng: -49.191592,
    isCheckedIn: false,
    type: 'class'
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    senderId: 'user2',
    senderName: 'Dona Maria',
    senderAvatar: 'https://picsum.photos/seed/martha/100/100',
    lastMessage: 'Vamos no chá amanhã?',
    time: '14:20'
  },
  {
    id: '2',
    senderId: 'user3',
    senderName: 'Sr. José',
    senderAvatar: 'https://picsum.photos/seed/jose/100/100',
    lastMessage: 'Bom dia! O grupo de caminhada já saiu?',
    time: '07:15'
  }
];

export const MOCK_MEDICATIONS: Medication[] = [
  { id: '1', name: 'Pressão (Manhã)', time: '08:00', taken: true },
  { id: '2', name: 'Vitamina C', time: '12:00', taken: false },
  { id: '3', name: 'Pressão (Noite)', time: '20:00', taken: false }
];
