import { useState } from 'react';
import { ChevronLeft, Type, Contrast, Volume2, Eye } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { motion } from 'motion/react';

interface AccessibilitySettingsProps {
  onBack: () => void;
}

export function AccessibilitySettings({ onBack }: AccessibilitySettingsProps) {
  const [fontSize, setFontSize] = useState([100]);
  const [highContrast, setHighContrast] = useState(false);
  const [audioDescriptions, setAudioDescriptions] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-neutral-50)]">
      {/* Header */}
      <div className="bg-white shadow-[var(--elevation-1)] sticky top-0 z-10">
        <div className="max-w-lg mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-[var(--color-neutral-100)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30"
              aria-label="Voltar"
            >
              <ChevronLeft className="w-7 h-7 text-[var(--color-neutral-900)]" />
            </button>
            <h1 className="text-[var(--color-neutral-900)]">Acessibilidade</h1>
          </div>
          <p className="text-[var(--color-neutral-700)]">
            Personalize o aplicativo para suas necessidades
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-6 pb-12">
        {/* Font Size */}
        <div className="bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)] p-6 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-[var(--radius-s)] bg-[var(--color-primary-light)]">
              <Type className="w-6 h-6 text-[var(--color-primary-main)]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[var(--color-neutral-900)] mb-2">Tamanho do Texto</h3>
              <p className="text-[var(--color-neutral-700)] text-[var(--text-caption)]">
                Ajuste o tamanho do texto para melhor leitura
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Pequeno</span>
              <span className="text-[var(--color-primary-main)]">{fontSize[0]}%</span>
              <span className="text-xl">Grande</span>
            </div>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              min={80}
              max={150}
              step={10}
              className="w-full"
            />
            <div className="p-4 bg-[var(--color-neutral-100)] rounded-[var(--radius-s)]">
              <p style={{ fontSize: `${fontSize[0]}%` }}>
                Este é um exemplo de texto com o tamanho selecionado.
              </p>
            </div>
          </div>
        </div>

        {/* High Contrast */}
        <div className="bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)] p-6 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="p-3 rounded-[var(--radius-s)] bg-[var(--color-primary-light)]">
                <Contrast className="w-6 h-6 text-[var(--color-primary-main)]" />
              </div>
              <div className="flex-1">
                <h3 className="text-[var(--color-neutral-900)] mb-2">Alto Contraste</h3>
                <p className="text-[var(--color-neutral-700)] text-[var(--text-caption)]">
                  Aumenta o contraste das cores para melhor visibilidade
                </p>
              </div>
            </div>
            <Switch
              checked={highContrast}
              onCheckedChange={setHighContrast}
              className="flex-shrink-0"
            />
          </div>
        </div>

        {/* Audio Descriptions */}
        <div className="bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)] p-6 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="p-3 rounded-[var(--radius-s)] bg-[var(--color-primary-light)]">
                <Volume2 className="w-6 h-6 text-[var(--color-primary-main)]" />
              </div>
              <div className="flex-1">
                <h3 className="text-[var(--color-neutral-900)] mb-2">Leitura de Tela</h3>
                <p className="text-[var(--color-neutral-700)] text-[var(--text-caption)]">
                  Ativa a narração de elementos da tela
                </p>
              </div>
            </div>
            <Switch
              checked={audioDescriptions}
              onCheckedChange={setAudioDescriptions}
              className="flex-shrink-0"
            />
          </div>
        </div>

        {/* Reduce Motion */}
        <div className="bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)] p-6 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="p-3 rounded-[var(--radius-s)] bg-[var(--color-primary-light)]">
                <Eye className="w-6 h-6 text-[var(--color-primary-main)]" />
              </div>
              <div className="flex-1">
                <h3 className="text-[var(--color-neutral-900)] mb-2">Reduzir Movimento</h3>
                <p className="text-[var(--color-neutral-700)] text-[var(--text-caption)]">
                  Minimiza animações e efeitos visuais
                </p>
              </div>
            </div>
            <Switch
              checked={reduceMotion}
              onCheckedChange={setReduceMotion}
              className="flex-shrink-0"
            />
          </div>
        </div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-[var(--color-primary-light)] rounded-[var(--radius-m)] border-2 border-[var(--color-primary-main)]/20"
        >
          <h4 className="text-[var(--color-primary-main)] mb-2">💡 Dica</h4>
          <p className="text-[var(--color-neutral-700)]">
            Estas configurações ajudam a tornar o aplicativo mais fácil de usar. 
            Experimente diferentes combinações até encontrar o que funciona melhor para você.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
