import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { Onboarding } from './components/screens/Onboarding';
import { Discovery } from './components/screens/Discovery';
import { EventDetail } from './components/screens/EventDetail';
import { CalendarScreen } from './components/screens/CalendarScreen';
import { Profile } from './components/screens/Profile';
import { AccessibilitySettings } from './components/screens/AccessibilitySettings';
import { News } from './components/screens/News';
import { Support } from './components/screens/Support';
import { Navbar } from './components/Navbar';
import { ScreenshotHelper } from './components/ScreenshotHelper';

type Screen = 
  | 'onboarding'
  | 'home'
  | 'event-detail'
  | 'calendar'
  | 'news'
  | 'profile'
  | 'accessibility'
  | 'support';

type TabScreen = 'home' | 'calendar' | 'news' | 'profile';

export default function App() {
  // 🎯 ATIVE O MODO SCREENSHOT: Mude para true para tirar prints das telas
  const SCREENSHOT_MODE = false;

  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen('home');
  };

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentScreen('event-detail');
  };

  const handleBackFromEvent = () => {
    setCurrentScreen('home');
    setSelectedEventId(null);
  };

  const handleTabChange = (tab: TabScreen) => {
    setCurrentScreen(tab);
  };

  const handleAccessibilityClick = () => {
    setCurrentScreen('accessibility');
  };

  const handleSupportClick = () => {
    setCurrentScreen('support');
  };

  const handleBackToProfile = () => {
    setCurrentScreen('profile');
  };

  // Determine if navbar should be shown
  const showNavbar = hasCompletedOnboarding && 
    !['onboarding', 'event-detail', 'accessibility', 'support'].includes(currentScreen);

  // 📸 MODO SCREENSHOT: Renderiza todas as telas para captura de screenshots
  if (SCREENSHOT_MODE) {
    const screens = [
      {
        name: 'Onboarding - Slide 1',
        component: <Onboarding onComplete={() => {}} />
      },
      {
        name: 'Discovery (Home)',
        component: (
          <>
            <Discovery onEventClick={handleEventClick} />
            <Navbar activeTab="home" onTabChange={handleTabChange} />
          </>
        )
      },
      {
        name: 'Event Detail',
        component: <EventDetail eventId="1" onBack={() => {}} />
      },
      {
        name: 'Calendar',
        component: (
          <>
            <CalendarScreen onEventClick={handleEventClick} />
            <Navbar activeTab="calendar" onTabChange={handleTabChange} />
          </>
        )
      },
      {
        name: 'News',
        component: (
          <>
            <News />
            <Navbar activeTab="news" onTabChange={handleTabChange} />
          </>
        )
      },
      {
        name: 'Profile',
        component: (
          <>
            <Profile 
              onAccessibilityClick={handleAccessibilityClick}
              onSupportClick={handleSupportClick}
            />
            <Navbar activeTab="profile" onTabChange={handleTabChange} />
          </>
        )
      },
      {
        name: 'Accessibility Settings',
        component: <AccessibilitySettings onBack={() => {}} />
      },
      {
        name: 'Support',
        component: <Support onBack={() => {}} />
      }
    ];

    return <ScreenshotHelper screens={screens} />;
  }

  // 🎯 MODO NORMAL: Aplicativo funcional completo
  return (
    <div className="min-h-screen bg-[var(--color-neutral-50)]">
      {/* Screen routing */}
      {currentScreen === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      {currentScreen === 'home' && (
        <Discovery onEventClick={handleEventClick} />
      )}

      {currentScreen === 'event-detail' && selectedEventId && (
        <EventDetail eventId={selectedEventId} onBack={handleBackFromEvent} />
      )}

      {currentScreen === 'calendar' && (
        <CalendarScreen onEventClick={handleEventClick} />
      )}

      {currentScreen === 'news' && (
        <News />
      )}

      {currentScreen === 'profile' && (
        <Profile 
          onAccessibilityClick={handleAccessibilityClick}
          onSupportClick={handleSupportClick}
        />
      )}

      {currentScreen === 'accessibility' && (
        <AccessibilitySettings onBack={handleBackToProfile} />
      )}

      {currentScreen === 'support' && (
        <Support onBack={handleBackToProfile} />
      )}

      {/* Bottom navigation */}
      {showNavbar && (
        <Navbar 
          activeTab={currentScreen as TabScreen} 
          onTabChange={handleTabChange}
        />
      )}

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}
