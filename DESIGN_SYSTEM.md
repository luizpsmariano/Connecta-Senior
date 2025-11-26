# CONNECTA SENIOR - Sistema de Design

## 📋 Visão Geral

O CONNECTA SENIOR é um aplicativo móvel projetado especificamente para idosos, com foco em acessibilidade, usabilidade e inclusão digital. Este documento descreve o sistema de design implementado seguindo princípios de Design Thinking e Design Centrado no Usuário.

## 🎨 Tokens de Design

### Cores

#### Cores Primárias (Azul - Confiança e Calma)
- `--color-primary-main`: #1565C0
- `--color-primary-light`: #E3F2FD
- `--color-primary-dark`: #0D47A1

#### Cores Secundárias (Verde - Saúde e Sucesso)
- `--color-secondary-main`: #2E7D32
- `--color-secondary-light`: #E8F5E9
- `--color-secondary-dark`: #1B5E20

#### Cores de Destaque (Laranja - Energia e CTA)
- `--color-accent-main`: #F57C00
- `--color-accent-light`: #FFF3E0
- `--color-accent-dark`: #E65100

#### Cores Neutras
- `--color-neutral-white`: #FFFFFF
- `--color-neutral-50`: #FAFAFA
- `--color-neutral-100`: #F5F5F5
- `--color-neutral-200`: #EEEEEE
- `--color-neutral-300`: #E0E0E0
- `--color-neutral-700`: #616161
- `--color-neutral-900`: #212121

#### Cores de Status
- `--color-error`: #D32F2F (Alto contraste)
- `--color-success`: #388E3C
- `--color-warning`: #F57C00

### Tipografia

**Tamanhos de Fonte** (Aumentados para melhor legibilidade):
- `--text-heading-1`: 32px
- `--text-heading-2`: 28px
- `--text-heading-3`: 24px
- `--text-body-large`: 20px
- `--text-body`: 18px (padrão)
- `--text-caption`: 16px

**Pesos de Fonte**:
- `--font-weight-normal`: 400
- `--font-weight-medium`: 600

### Espaçamento

Sistema de espaçamento baseado em múltiplos de 4px:
- `--spacing-xs`: 8px
- `--spacing-s`: 12px
- `--spacing-m`: 16px
- `--spacing-l`: 24px
- `--spacing-xl`: 32px
- `--spacing-xxl`: 48px

### Elevação/Sombras

- `--elevation-1`: 0 2px 4px rgba(0, 0, 0, 0.1)
- `--elevation-2`: 0 4px 8px rgba(0, 0, 0, 0.12)
- `--elevation-3`: 0 8px 16px rgba(0, 0, 0, 0.15)

### Border Radius

- `--radius-s`: 8px
- `--radius-m`: 12px
- `--radius-l`: 16px
- `--radius-full`: 9999px

## 🧩 Componentes

### ButtonPrimary
**Uso**: Ações principais (inscrição em eventos, confirmações)
**Características**:
- Altura mínima: 56px (facilita toque)
- Contraste WCAG AAA
- Estados: normal, hover, active, disabled, loading
- Animação de tap (scale: 0.97)
- Focus ring visível para navegação por teclado

### ButtonSecondary
**Uso**: Ações secundárias (cancelamento, voltar)
**Características**:
- Altura mínima: 56px
- Borda de 2px para melhor visibilidade
- Mesmos estados que ButtonPrimary

### TextInput
**Uso**: Campos de entrada de texto
**Características**:
- Altura mínima: 56px
- Label visível e persistente
- Estados de erro com mensagens claras
- Focus ring proeminente
- Placeholder com contraste adequado

### EventCard
**Uso**: Exibição de eventos na lista de descoberta
**Características**:
- Imagem grande (h-48)
- Informações claramente organizadas
- Ícones descritivos (Calendar, MapPin, Users)
- Tag de categoria colorida
- Animação hover e tap

### Navbar
**Uso**: Navegação principal do aplicativo
**Características**:
- Posição fixa na parte inferior
- Altura: 80px (20px a mais que padrão)
- 4 opções principais com ícones grandes (28px)
- Labels de texto sempre visíveis
- Indicador visual claro do item ativo

### Tag
**Uso**: Categorização e status
**Variantes**: primary, secondary, accent
**Características**:
- Padding generoso
- Cores de alto contraste
- Border radius arredondado

## 📱 Telas Implementadas

### 1. Onboarding (Welcome)
- **Propósito**: Introduzir o aplicativo para novos usuários
- **Características**:
  - 3 slides com ilustrações simples
  - Texto grande e claro
  - Botão "Pular" sempre visível
  - Indicadores de progresso (dots)
  - Gradiente suave de fundo

### 2. Discovery (Home)
- **Propósito**: Descobrir eventos e atividades
- **Características**:
  - Barra de busca proeminente
  - Filtros por categoria
  - Grid de cards de eventos
  - Botão de notificações

### 3. EventDetail (Registration)
- **Propósito**: Ver detalhes e se inscrever em eventos
- **Características**:
  - Imagem hero grande
  - Informações organizadas em cards
  - Barra de progresso de inscrições
  - Modal de confirmação
  - Estados: não inscrito / inscrito

### 4. Calendar
- **Propósito**: Ver agenda pessoal
- **Características**:
  - Calendário visual com navegação mensal
  - Indicadores de eventos (dots)
  - Seleção de data
  - Lista de eventos do dia selecionado
  - Controles de navegação grandes (56px)

### 5. News
- **Propósito**: Notícias da prefeitura
- **Características**:
  - Card featured em destaque
  - Lista de notícias com miniaturas
  - Tags de categoria
  - Opção "Ler mais"

### 6. Profile
- **Propósito**: Configurações e informações do usuário
- **Características**:
  - Header com gradiente
  - Estatísticas visuais
  - Menu de configurações
  - Opção de logout

### 7. AccessibilitySettings
- **Propósito**: Personalizar acessibilidade
- **Características**:
  - Controle de tamanho de fonte (slider)
  - Toggle para alto contraste
  - Toggle para leitura de tela
  - Toggle para reduzir movimento
  - Preview ao vivo das mudanças

### 8. Support
- **Propósito**: Ajuda e suporte
- **Características**:
  - Botões de contato rápido (telefone, email, chat)
  - FAQ expansível (accordion)
  - Formulário de contato
  - Informações de atendimento

## ♿ Acessibilidade

### Contraste de Cores
- Todas as combinações de cores atendem WCAG 2.1 Nível AAA
- Relação de contraste mínima: 7:1 para texto normal
- Relação de contraste mínima: 4.5:1 para texto grande

### Navegação por Teclado
- Todos os elementos interativos têm focus ring visível
- Ordem de tabulação lógica
- Atalhos de teclado disponíveis

### Tamanho de Toque
- Áreas de toque mínimas: 44x44px (WCAG)
- Botões principais: 56px de altura
- Espaçamento adequado entre elementos

### Feedback Visual
- Estados claros para todos os elementos interativos
- Animações suaves (0.2-0.4s)
- Mensagens de sucesso/erro visíveis

### Suporte a Leitores de Tela
- Labels descritivos em todos os campos
- aria-label em ícones
- Estrutura semântica HTML adequada

## 🎯 Princípios de Design

### 1. Simplicidade
- Interface limpa e descomplicada
- Apenas informações essenciais visíveis
- Hierarquia visual clara

### 2. Consistência
- Padrões visuais repetidos
- Comportamentos previsíveis
- Terminologia uniforme

### 3. Feedback
- Resposta imediata a ações
- Estados de carregamento visíveis
- Mensagens de confirmação claras

### 4. Perdão
- Confirmações antes de ações críticas
- Possibilidade de desfazer
- Mensagens de erro construtivas

### 5. Inclusão
- Design para todos os níveis de habilidade
- Suporte a tecnologias assistivas
- Opções de personalização

## 🔄 Interações e Animações

### Duração
- Micro-interações: 0.2s
- Transições: 0.3s
- Animações complexas: 0.4s

### Easing
- Entrada: ease-out
- Saída: ease-in
- Bidirecional: ease-in-out

### Tipos de Animação
- **Tap**: scale(0.97-0.98) - feedback tátil
- **Hover**: mudança de cor/sombra - affordance
- **Focus**: ring animado - acessibilidade
- **Loading**: spinner + texto - status
- **Modal**: fade + scale - hierarquia

## 📐 Grid e Layout

### Mobile-First
- Base: 375px (iPhone SE)
- Máximo: 428px (iPhone 14 Pro Max)
- Container máximo: 512px (lg)

### Padding Padrão
- Telas: 24px (var(--spacing-l))
- Cards: 16px (var(--spacing-m))
- Elementos pequenos: 12px (var(--spacing-s))

### Espaçamento Vertical
- Entre seções: 24px
- Entre elementos: 16px
- Entre grupos: 12px

## 🚀 Extensões Futuras

### Capacitação Digital
- Tutoriais interativos em vídeo
- Modo de prática guiada
- Dicas contextuais
- Centro de aprendizado

### Recursos Adicionais
- Modo escuro
- Múltiplos idiomas
- Integração com calendário do dispositivo
- Notificações push personalizadas
- Compartilhamento de eventos
- Mapa com localização de eventos

### Melhorias de Acessibilidade
- Controle de velocidade de animação
- Temas de alto contraste predefinidos
- Suporte a mais idiomas
- Integração com sistemas de leitura de tela nativos

---

**Versão**: 1.0.0  
**Data**: Novembro 2025  
**Metodologia**: Design Thinking + Design Centrado no Usuário
