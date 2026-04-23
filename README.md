# Connecta Senior - Aplicativo Mobile

Um aplicativo mobile inovador desenvolvido com **React Native** e **Expo** para conectar idosos com eventos, atividades e oportunidades de socialização em suas comunidades.

## 🎯 Sobre o Projeto

Connecta Senior é uma plataforma que facilita a descoberta e participação de idosos em eventos locais, promovendo:

- **Descoberta de Eventos**: Encontre atividades próximas de você
- **Inscrição Fácil**: Inscreva-se em eventos com um toque
- **Check-in por Localização**: Confirme sua presença usando geolocalização
- **Perfil Personalizado**: Acompanhe seus eventos e histórico

## 📱 Características

### Telas Principais

1. **Discovery (Descoberta)**
   - Lista de eventos próximos
   - Filtros por categoria
   - Busca em tempo real
   - Indicador de lotação

2. **Event Detail (Detalhes do Evento)**
   - Informações completas do evento
   - Inscrição/Desincrição
   - Check-in por geolocalização
   - Compartilhamento

3. **Profile (Perfil)**
   - Informações do usuário
   - Estatísticas de participação
   - Histórico de eventos
   - Configurações

## 🚀 Começando

### Pré-requisitos

- Node.js 16+
- npm ou pnpm
- Expo CLI

### Instalação

```bash
cd Connecta-Senior-Mobile
npm install
```

### Executar em Desenvolvimento

```bash
npm start
# Pressione 'a' para Android, 'i' para iOS, 'w' para Web
```

### Build para APK

Consulte [BUILD_APK.md](./BUILD_APK.md) para instruções detalhadas.

```bash
# Build com EAS (recomendado)
eas build --platform android
```

## 📁 Estrutura do Projeto

```
Connecta-Senior-Mobile/
├── app/                    # Telas e navegação
│   ├── (tabs)/            # Telas com abas
│   │   ├── discovery.tsx   # Descoberta de eventos
│   │   ├── event-detail.tsx # Detalhes do evento
│   │   └── profile.tsx     # Perfil do usuário
│   └── _layout.tsx         # Layout raiz
├── contexts/              # Contextos React
│   └── EventContext.tsx    # Gerenciamento de eventos
├── hooks/                 # Hooks customizados
│   └── useGeolocation.ts   # Hook de geolocalização
├── components/            # Componentes reutilizáveis
├── assets/                # Imagens e ícones
├── app.json              # Configuração Expo
└── BUILD_APK.md          # Guia de build
```

## 🛠️ Tecnologias

- React Native 0.81.5
- Expo 54.0
- Expo Router 6.0
- TypeScript
- Expo Location (Geolocalização)

## 📚 Contextos e Hooks

### EventContext

```typescript
const { 
  registerEvent,
  unregisterEvent,
  isEventRegistered,
  checkInEvent,
  isCheckedIn
} = useEvent();
```

### useGeolocation

```typescript
const { 
  coordinates,
  error,
  loading,
  requestLocation,
  watchLocation
} = useGeolocation();
```

## 🎨 Design

- Paleta: Azul (#007AFF), Verde (#34C759)
- Ícones: Ionicons
- UI responsiva e acessível

## 📞 Suporte

- Documentação Expo: https://docs.expo.dev/
- Guia de Build: [BUILD_APK.md](./BUILD_APK.md)

## 🎯 Roadmap

- [ ] Integração com backend
- [ ] Autenticação de usuários
- [ ] Notificações push
- [ ] Google Play Store
- [ ] Apple App Store

---

**Versão**: 1.0.0  
**Status**: Em desenvolvimento ✨
