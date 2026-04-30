import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Layout } from './components/Layout';
import { Welcome } from './screens/Welcome';
import { Home } from './screens/Home';
import { Activities } from './screens/Activities';
import { Chat } from './screens/Chat';
import { Health } from './screens/Health';
import { Profile } from './screens/Profile';
import { History } from './screens/History';
import { Settings } from './screens/Settings';
import { Safety } from './screens/Safety';
import { Auth } from './screens/Auth';
import { Screen, Activity as ActivityType, HistoryItem, NotificationPreferences, UserProfile } from './types';
import { MOCK_ACTIVITIES } from './constants';
import { NotificationProvider, useNotifications } from './components/NotificationManager';
import { Notifications } from './screens/Notifications';
import { useEventReminders } from './hooks/useEventReminders';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [isReady, setIsReady] = useState(false);
  const [activities, setActivities] = useState<ActivityType[]>(MOCK_ACTIVITIES);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({
    eventReminders: true,
    healthTips: true,
    newMessages: true,
    communityNews: false
  });
  const { addNotification } = useNotifications();

  useEventReminders(activities, notificationPreferences.eventReminders);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user1',
    name: 'Mariano',
    age: 68,
    avatar: 'https://picsum.photos/seed/mariano/200/200',
    city: 'Pinhais, PR',
    bio: 'Aposentado, amo caminhar no Bosque Municipal e aprender coisas novas.',
    interests: ['Caminhada', 'Tecnologia', 'Chá', 'Dança']
  });

  const handleAuth = (userData: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...userData }));
    setIsAuthenticated(true);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
  };

  const addToHistory = (activity: ActivityType, action: HistoryItem['action']) => {
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      activityId: activity.id,
      activityTitle: activity.title,
      date: activity.date,
      action,
      timestamp: new Date().toISOString()
    };
    setHistory(prev => [newItem, ...prev]);
  };

  // Simulate coming notifications
  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        addNotification({
          title: 'Dica de Saúde',
          body: 'Lembre-se de beber um copo de água agora!',
          type: 'health'
        });
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  const toggleJoinActivity = (id: string) => {
    setActivities(prev => prev.map(act => {
      if (act.id === id) {
        const isJoining = !act.isJoined;
        if (isJoining) {
           addNotification({
             title: 'Inscrição Confirmada!',
             body: `Sua vaga em "${act.title}" está garantida.`,
             type: 'event'
           });
           addToHistory(act, 'joined');
        } else {
           addToHistory(act, 'cancelled');
        }
        return { 
          ...act, 
          isJoined: isJoining,
          currentParticipants: isJoining ? act.currentParticipants + 1 : act.currentParticipants - 1
        };
      }
      return act;
    }));
  };

  const checkInActivity = (id: string) => {
    setActivities(prev => prev.map(act => {
      if (act.id === id) {
        addNotification({
          title: 'Check-in Realizado!',
          body: `Sua presença foi confirmada em "${act.title}". Bom evento!`,
          type: 'event'
        });
        addToHistory(act, 'checked-in');
        return { ...act, isCheckedIn: true };
      }
      return act;
    }));
  };

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-brand-primary text-white font-sans">
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-4xl font-black italic tracking-tighter"
        >
          CONNECTA
        </motion.div>
      </div>
    );
  }

  if (currentScreen === 'welcome') {
    return <Welcome onStart={() => setCurrentScreen('signup')} />;
  }

  if (!isAuthenticated) {
    return (
      <Auth 
        initialMode={currentScreen === 'signup' ? 'signup' : 'login'} 
        onLogin={handleAuth} 
        onScreenChange={setCurrentScreen} 
      />
    );
  }

  const getTitle = () => {
    switch (currentScreen) {
      case 'home': return 'Início';
      case 'activities': return 'Eventos';
      case 'classes': return 'Aulas';
      case 'chat': return 'Conversas';
      case 'health': return 'Saúde';
      case 'profile': return 'Meu Perfil';
      case 'notifications': return 'Notificações';
      case 'history': return 'Histórico de Atividades';
      case 'settings': return 'Configurações';
      case 'safety': return 'Segurança';
      case 'login': return 'Acesso';
      case 'signup': return 'Cadastro';
      default: return 'Connecta';
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home': return (
        <Home 
          activities={activities} 
          history={history}
          interests={userProfile.interests}
          onScreenChange={setCurrentScreen} 
          onToggleJoin={toggleJoinActivity} 
          onCheckIn={checkInActivity} 
        />
      );
      case 'activities': return <Activities activities={activities} onToggleJoin={toggleJoinActivity} onCheckIn={checkInActivity} viewType="event" />;
      case 'classes': return <Activities activities={activities} onToggleJoin={toggleJoinActivity} onCheckIn={checkInActivity} viewType="class" />;
      case 'chat': return <Chat />;
      case 'health': return <Health />;
      case 'profile': return <Profile onScreenChange={setCurrentScreen} user={userProfile} history={history} onLogout={handleLogout} />;
      case 'notifications': return <Notifications />;
      case 'history': return <History history={history} onScreenChange={setCurrentScreen} />;
      case 'settings': 
        return (
          <Settings 
            preferences={notificationPreferences} 
            onPreferenceChange={(key, value) => setNotificationPreferences(prev => ({ ...prev, [key]: value }))}
            onScreenChange={setCurrentScreen}
            onLogout={handleLogout}
          />
        );
      case 'safety': return <Safety />;
      default: return (
        <Home 
          activities={activities} 
          history={history}
          interests={userProfile.interests}
          onScreenChange={setCurrentScreen} 
          onToggleJoin={toggleJoinActivity} 
          onCheckIn={checkInActivity} 
        />
      );
    }
  };

  return (
    <Layout 
      activeScreen={currentScreen} 
      setScreen={setCurrentScreen} 
      title={getTitle()}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
}

