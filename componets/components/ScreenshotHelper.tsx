import { useState } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface ScreenshotHelperProps {
  screens: Array<{
    name: string;
    component: React.ReactNode;
  }>;
}

export function ScreenshotHelper({ screens }: ScreenshotHelperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % screens.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + screens.length) % screens.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'h' || e.key === 'H') setShowControls(!showControls);
  };

  return (
    <div 
      className="relative min-h-screen bg-[var(--color-neutral-100)]"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Screenshot frame - simula dispositivo móvel */}
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="relative">
          {/* Mobile frame */}
          <div className="bg-black rounded-[40px] p-3 shadow-2xl">
            <div className="bg-white rounded-[32px] overflow-hidden w-[390px] h-[844px] relative">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50" />
              
              {/* Screen content */}
              <div className="h-full overflow-auto">
                {screens[currentIndex].component}
              </div>
            </div>
          </div>
          
          {/* Screen name badge */}
          {showControls && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg border-2 border-[var(--color-primary-main)]">
              <p className="text-[var(--color-primary-main)] font-medium whitespace-nowrap">
                {currentIndex + 1}/{screens.length}: {screens[currentIndex].name}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation controls */}
      {showControls && (
        <>
          {/* Left arrow */}
          <button
            onClick={goToPrevious}
            className="fixed left-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[var(--color-primary-light)] transition-colors focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30"
            aria-label="Tela anterior"
          >
            <ChevronLeft className="w-8 h-8 text-[var(--color-primary-main)]" />
          </button>

          {/* Right arrow */}
          <button
            onClick={goToNext}
            className="fixed right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[var(--color-primary-light)] transition-colors focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30"
            aria-label="Próxima tela"
          >
            <ChevronRight className="w-8 h-8 text-[var(--color-primary-main)]" />
          </button>

          {/* Bottom controls */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg px-6 py-4">
            <div className="flex items-center gap-6">
              {/* Screen indicator dots */}
              <div className="flex gap-2">
                {screens.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`
                      h-3 rounded-full transition-all duration-300
                      ${index === currentIndex 
                        ? 'w-8 bg-[var(--color-primary-main)]' 
                        : 'w-3 bg-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-700)]'
                      }
                    `}
                    aria-label={`Ir para ${screens[index].name}`}
                  />
                ))}
              </div>

              {/* Hide controls button */}
              <button
                onClick={() => setShowControls(false)}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary-main)] text-white rounded-full hover:bg-[var(--color-primary-dark)] transition-colors"
                title="Esconder controles (pressione H para mostrar novamente)"
              >
                <Camera className="w-5 h-5" />
                <span className="text-sm font-medium">Modo Screenshot</span>
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="fixed top-8 left-8 bg-white/95 backdrop-blur rounded-lg shadow-lg p-4 max-w-xs">
            <h3 className="font-medium text-[var(--color-neutral-900)] mb-2">
              📸 Como tirar prints:
            </h3>
            <ul className="text-sm text-[var(--color-neutral-700)] space-y-1">
              <li>• Use as setas ← → para navegar</li>
              <li>• Clique em "Modo Screenshot" ou pressione <kbd className="px-1.5 py-0.5 bg-[var(--color-neutral-200)] rounded text-xs">H</kbd></li>
              <li>• Tire o print da tela</li>
              <li>• Pressione <kbd className="px-1.5 py-0.5 bg-[var(--color-neutral-200)] rounded text-xs">H</kbd> novamente para voltar</li>
            </ul>
          </div>
        </>
      )}

      {/* Show controls hint when hidden */}
      {!showControls && (
        <button
          onClick={() => setShowControls(true)}
          className="fixed top-8 right-8 bg-white/90 backdrop-blur text-[var(--color-neutral-700)] px-4 py-2 rounded-full shadow-lg hover:bg-white transition-all text-sm"
        >
          Pressione <kbd className="px-1.5 py-0.5 bg-[var(--color-neutral-200)] rounded text-xs mx-1">H</kbd> para mostrar controles
        </button>
      )}
    </div>
  );
}
