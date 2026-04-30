/**
 * Types for Connecta Senior
 */

export interface HistoryItem {
  id: string;
  activityId: string;
  activityTitle: string;
  date: string;
  action: 'joined' | 'checked-in' | 'cancelled';
  timestamp: string;
}

export interface NotificationPreferences {
  eventReminders: boolean;
  healthTips: boolean;
  newMessages: boolean;
  communityNews: boolean;
}

export type Screen = 'home' | 'activities' | 'classes' | 'chat' | 'health' | 'profile' | 'welcome' | 'notifications' | 'history' | 'settings' | 'safety' | 'login' | 'signup';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  city: string;
  bio: string;
  interests: string[];
  address?: string;
  addressNumber?: string;
  complement?: string;
  neighborhood?: string;
  state?: string;
  cep?: string;
  phone?: string;
  cpf?: string;
  rg?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'exercise' | 'social' | 'education' | 'health' | 'culture';
  image: string;
  isJoined?: boolean;
  tips?: string[];
  maxParticipants: number;
  currentParticipants: number;
  lat: number;
  lng: number;
  isCheckedIn?: boolean;
  type: 'class' | 'event';
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  lastMessage: string;
  time: string;
}

export interface Medication {
  id: string;
  name: string;
  time: string;
  taken: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  type: 'event' | 'message' | 'health';
  read: boolean;
}
