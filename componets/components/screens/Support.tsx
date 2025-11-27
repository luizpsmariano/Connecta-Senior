import { useState } from 'react';
import { ChevronLeft, Phone, Mail, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ButtonPrimary } from '../ButtonPrimary';
import { TextInput } from '../TextInput';

interface SupportProps {
  onBack: () => void;
}

const faqs = [
  {
    question: 'Como faço para me inscrever em um evento?',
    answer: 'Para se inscrever em um evento, basta navegar até a página de descoberta, selecionar o evento desejado e clicar no botão "Confirmar Inscrição". Você receberá uma confirmação por email.'
  },
  {
    question: 'Como cancelo minha inscrição?',
    answer: 'Você pode cancelar sua inscrição acessando o evento na sua agenda e clicando em "Cancelar Inscrição". Recomendamos cancelar com pelo menos 24 horas de antecedência.'
  },
  {
    question: 'O aplicativo tem custo?',
    answer: 'Não! O CONNECTA SENIOR é totalmente gratuito e oferecido pela Prefeitura Municipal para todos os cidadãos.'
  },
  {
    question: 'Como ajusto o tamanho do texto?',
    answer: 'Acesse seu perfil, depois "Configurações de Acessibilidade". Lá você pode ajustar o tamanho do texto e outras configurações de acessibilidade.'
  },
  {
    question: 'Como recebo notificações de novos eventos?',
    answer: 'Acesse "Perfil" > "Notificações" e ative as notificações para as categorias de eventos que você tem interesse.'
  }
];

export function Support({ onBack }: SupportProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setContactForm({ name: '', email: '', message: '' });
  };

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
            <h1 className="text-[var(--color-neutral-900)]">Ajuda e Suporte</h1>
          </div>
          <p className="text-[var(--color-neutral-700)]">
            Estamos aqui para ajudar você
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-6 pb-12">
        {/* Quick contact buttons */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)] hover:shadow-[var(--elevation-2)] transition-shadow focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30"
          >
            <div className="p-3 rounded-full bg-[var(--color-primary-light)]">
              <Phone className="w-6 h-6 text-[var(--color-primary-main)]" />
            </div>
            <span className="text-[var(--text-caption)] text-[var(--color-neutral-900)]">Ligar</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)] hover:shadow-[var(--elevation-2)] transition-shadow focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30"
          >
            <div className="p-3 rounded-full bg-[var(--color-secondary-light)]">
              <Mail className="w-6 h-6 text-[var(--color-secondary-main)]" />
            </div>
            <span className="text-[var(--text-caption)] text-[var(--color-neutral-900)]">Email</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)] hover:shadow-[var(--elevation-2)] transition-shadow focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30"
          >
            <div className="p-3 rounded-full bg-[var(--color-accent-light)]">
              <MessageCircle className="w-6 h-6 text-[var(--color-accent-main)]" />
            </div>
            <span className="text-[var(--text-caption)] text-[var(--color-neutral-900)]">Chat</span>
          </motion.button>
        </div>

        {/* Contact info */}
        <div className="bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)] p-6 mb-8">
          <h3 className="text-[var(--color-neutral-900)] mb-4">Canais de Atendimento</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[var(--color-primary-main)] mt-1 flex-shrink-0" />
              <div>
                <p className="text-[var(--color-neutral-900)]">Telefone</p>
                <p className="text-[var(--color-neutral-700)]">0800 123 4567</p>
                <p className="text-[var(--color-neutral-700)] text-[var(--text-caption)]">
                  Segunda a Sexta, 8h às 18h
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[var(--color-primary-main)] mt-1 flex-shrink-0" />
              <div>
                <p className="text-[var(--color-neutral-900)]">Email</p>
                <p className="text-[var(--color-neutral-700)]">suporte@conectasenior.gov.br</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-8">
          <h3 className="text-[var(--color-neutral-900)] mb-4">Perguntas Frequentes</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)] overflow-hidden"
              >
                <motion.button
                  whileTap={{ scale: 0.99 }}
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between gap-4 p-4 text-left focus:outline-none focus:bg-[var(--color-primary-light)]"
                >
                  <span className="text-[var(--color-neutral-900)] flex-1">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-6 h-6 text-[var(--color-primary-main)] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-[var(--color-neutral-700)] flex-shrink-0" />
                  )}
                </motion.button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-[var(--color-neutral-700)]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)] p-6">
          <h3 className="text-[var(--color-neutral-900)] mb-4">Envie uma Mensagem</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              label="Nome"
              placeholder="Seu nome completo"
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              required
            />
            <TextInput
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              required
            />
            <div>
              <label className="block mb-2 text-[var(--color-neutral-900)]">
                Mensagem
              </label>
              <textarea
                className="w-full min-h-[120px] p-4 rounded-[var(--radius-m)] bg-[var(--input-background)] text-[var(--color-neutral-900)] border-2 border-[var(--color-neutral-300)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30 focus:border-[var(--color-primary-main)] transition-all duration-300 resize-none"
                placeholder="Como podemos ajudar?"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                required
              />
            </div>
            <ButtonPrimary type="submit" fullWidth>
              Enviar Mensagem
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  );
}
