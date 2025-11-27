import { motion } from 'motion/react';
import { Clock, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Tag } from '../Tag';

export function News() {
  const newsItems = [
    {
      id: '1',
      title: 'Prefeitura inaugura novo centro de convivência para idosos',
      category: 'Infraestrutura',
      date: '5 Nov 2025',
      excerpt: 'Espaço conta com sala de ginástica, biblioteca e área de convivência para atividades sociais.',
      image: 'https://images.unsplash.com/photo-1760454477189-9af9947786ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBldmVudCUyMGdhdGhlcmluZ3xlbnwxfHx8fDE3NjI0MTg4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      variant: 'primary' as const
    },
    {
      id: '2',
      title: 'Vacinação contra gripe começa na próxima semana',
      category: 'Saúde',
      date: '4 Nov 2025',
      excerpt: 'Campanha é destinada a pessoas acima de 60 anos. Veja os postos de atendimento.',
      image: 'https://images.unsplash.com/photo-1758612899183-3c0f7481bc93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBlbGRlcmx5JTIwYWN0aXZpdHl8ZW58MXx8fHwxNzYyNTM3NTE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      variant: 'secondary' as const
    },
    {
      id: '3',
      title: 'Curso gratuito de informática para terceira idade',
      category: 'Educação',
      date: '3 Nov 2025',
      excerpt: 'Inscrições abertas para curso básico de informática e uso de smartphones.',
      image: 'https://images.unsplash.com/photo-1753164725041-6b62fb0d64b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBjdWx0dXJlJTIwYXJ0fGVufDF8fHx8MTc2MjUzNzUxNnww&ixlib=rb-4.1.0&q=80&w=1080',
      variant: 'accent' as const
    },
    {
      id: '4',
      title: 'Programa de transporte gratuito é ampliado',
      category: 'Transporte',
      date: '2 Nov 2025',
      excerpt: 'Mais linhas de ônibus oferecem passagem gratuita para maiores de 65 anos.',
      image: 'https://images.unsplash.com/photo-1747302653826-42c6cd7295f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwZXhlcmNpc2UlMjB5b2dhfGVufDF8fHx8MTc2MjUzNzUxNnww&ixlib=rb-4.1.0&q=80&w=1080',
      variant: 'primary' as const
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-neutral-50)] pb-24">
      {/* Header */}
      <div className="bg-white shadow-[var(--elevation-1)] sticky top-0 z-10">
        <div className="max-w-lg mx-auto p-6">
          <h1 className="text-[var(--color-neutral-900)] mb-2">Notícias</h1>
          <p className="text-[var(--color-neutral-700)]">
            Fique por dentro das novidades da sua cidade
          </p>
        </div>
      </div>

      {/* Featured news */}
      <div className="max-w-lg mx-auto p-6">
        <div className="bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-2)] overflow-hidden mb-6">
          <div className="relative h-56">
            <ImageWithFallback
              src={newsItems[0].image}
              alt={newsItems[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Tag variant={newsItems[0].variant}>{newsItems[0].category}</Tag>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h2 className="text-white mb-2">{newsItems[0].title}</h2>
              <div className="flex items-center gap-2 text-white/90">
                <Clock className="w-4 h-4" />
                <span className="text-[var(--text-caption)]">{newsItems[0].date}</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-[var(--color-neutral-700)] mb-4">{newsItems[0].excerpt}</p>
            <button className="flex items-center gap-2 text-[var(--color-primary-main)] min-h-[44px] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30 rounded-[var(--radius-s)] px-2 -ml-2">
              Ler mais
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* News list */}
        <h3 className="mb-4 text-[var(--color-neutral-900)]">Outras Notícias</h3>
        <div className="space-y-4">
          {newsItems.slice(1).map((news) => (
            <motion.div
              key={news.id}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)] overflow-hidden cursor-pointer hover:shadow-[var(--elevation-2)] transition-shadow"
            >
              <div className="flex gap-4 p-4">
                <div className="w-24 h-24 rounded-[var(--radius-s)] overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-2">
                    <Tag variant={news.variant}>{news.category}</Tag>
                  </div>
                  <h4 className="text-[var(--color-neutral-900)] mb-2 line-clamp-2">
                    {news.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[var(--color-neutral-700)]">
                    <Clock className="w-4 h-4" />
                    <span className="text-[var(--text-caption)]">{news.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 p-4 bg-white rounded-[var(--radius-m)] shadow-[var(--elevation-1)] text-[var(--color-primary-main)] hover:bg-[var(--color-primary-light)] transition-colors focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-main)]/30"
        >
          Carregar mais notícias
        </motion.button>
      </div>
    </div>
  );
}
