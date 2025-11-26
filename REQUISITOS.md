# 📋 REQUISITOS DO SISTEMA - CONNECTA SENIOR

## Documento de Requisitos Funcionais e Não Funcionais

**Projeto:** CONNECTA SENIOR - Aplicativo Móvel para Idosos  
**Versão:** 1.0.0  
**Data:** Novembro 2025  
**Metodologia:** Design Thinking + Design Centrado no Usuário

---

## 📱 1. REQUISITOS FUNCIONAIS (RF)

Os requisitos funcionais descrevem **o que** o sistema deve fazer.

### 1.1 Módulo de Onboarding

**RF01 - Apresentação do Aplicativo**
- O sistema deve apresentar uma sequência de 3 slides introdutórios ao usuário
- Cada slide deve conter: ícone ilustrativo, título, descrição
- O sistema deve permitir navegação entre slides (Próximo/Anterior)
- O sistema deve permitir pular o onboarding a qualquer momento
- O sistema deve exibir indicadores visuais de progresso (dots)

**RF02 - Conclusão do Onboarding**
- Ao concluir o onboarding, o sistema deve redirecionar para a tela principal
- O onboarding deve ser exibido apenas na primeira vez que o usuário acessa o app

---

### 1.2 Módulo de Descoberta de Eventos

**RF03 - Listagem de Eventos**
- O sistema deve exibir lista de eventos disponíveis
- Cada evento deve mostrar: imagem, título, categoria, data, horário, local, número de inscritos
- O sistema deve suportar scroll infinito ou paginação

**RF04 - Busca de Eventos**
- O sistema deve permitir busca de eventos por palavra-chave
- A busca deve ser realizada em tempo real (ao digitar)
- A busca deve considerar: título, descrição, categoria

**RF05 - Filtros de Eventos**
- O sistema deve permitir filtrar eventos por categoria
- Categorias disponíveis: Todos, Atividade Física, Cultural, Social, Saúde
- O sistema deve exibir contador de eventos encontrados

**RF06 - Visualização de Detalhes do Evento**
- Ao clicar em um evento, o sistema deve abrir tela de detalhes
- Tela de detalhes deve exibir: imagem, título, categoria, data completa, horário, endereço, descrição, organizador, requisitos, vagas disponíveis

---

### 1.3 Módulo de Inscrição em Eventos

**RF07 - Inscrição em Evento**
- O sistema deve permitir inscrição em eventos com vagas disponíveis
- O sistema deve exibir confirmação visual ao se inscrever
- O sistema deve mostrar modal de sucesso após inscrição
- O sistema deve impedir inscrição quando o evento estiver lotado

**RF08 - Cancelamento de Inscrição**
- O sistema deve permitir cancelamento de inscrição
- O sistema deve solicitar confirmação antes de cancelar
- O sistema deve atualizar o status visual após cancelamento

**RF09 - Gerenciamento de Vagas**
- O sistema deve exibir número de vagas disponíveis
- O sistema deve exibir barra de progresso visual das vagas
- O sistema deve atualizar contador de inscritos em tempo real

---

### 1.4 Módulo de Calendário e Agenda

**RF10 - Visualização do Calendário**
- O sistema deve exibir calendário mensal
- O sistema deve destacar o dia atual
- O sistema deve indicar visualmente dias com eventos (dot/marcador)

**RF11 - Navegação no Calendário**
- O sistema deve permitir navegar entre meses (anterior/próximo)
- O sistema deve exibir nome do mês e ano atual

**RF12 - Seleção de Data**
- O sistema deve permitir selecionar uma data no calendário
- Ao selecionar data, deve exibir eventos agendados para aquele dia
- Data selecionada deve ter destaque visual

**RF13 - Listagem de Eventos da Agenda**
- O sistema deve listar eventos do usuário por data
- Cada evento deve exibir: hora, título, categoria
- O sistema deve permitir acessar detalhes do evento da agenda

**RF14 - Contador de Eventos**
- O sistema deve exibir total de eventos agendados
- O sistema deve categorizar eventos: total, participados, próximos

---

### 1.5 Módulo de Notícias

**RF15 - Visualização de Notícias**
- O sistema deve exibir lista de notícias da prefeitura
- Cada notícia deve conter: imagem, título, categoria, data, resumo

**RF16 - Notícia em Destaque**
- O sistema deve destacar a notícia principal (featured)
- Notícia em destaque deve ter layout diferenciado

**RF17 - Categorização de Notícias**
- Notícias devem ser categorizadas: Infraestrutura, Saúde, Educação, Transporte, etc.
- Cada categoria deve ter tag colorida identificadora

**RF18 - Acesso ao Conteúdo Completo**
- O sistema deve permitir acessar conteúdo completo da notícia
- Deve exibir botão "Ler mais" em cada notícia

**RF19 - Carregamento de Mais Notícias**
- O sistema deve permitir carregar mais notícias (paginação)
- Deve exibir botão "Carregar mais"

---

### 1.6 Módulo de Perfil

**RF20 - Visualização de Dados do Perfil**
- O sistema deve exibir: foto, nome, email do usuário
- O sistema deve exibir estatísticas: eventos inscritos, participados, próximos

**RF21 - Menu de Configurações**
- O sistema deve exibir menu com opções de configuração
- Opções: Acessibilidade, Notificações, Privacidade, Ajuda

**RF22 - Logout**
- O sistema deve permitir sair da conta
- Deve solicitar confirmação antes de fazer logout

---

### 1.7 Módulo de Acessibilidade

**RF23 - Ajuste de Tamanho de Fonte**
- O sistema deve permitir ajustar tamanho do texto (80% a 150%)
- Deve exibir slider para ajuste
- Deve exibir preview em tempo real das mudanças

**RF24 - Modo Alto Contraste**
- O sistema deve permitir ativar/desativar alto contraste
- Alteração deve ser aplicada em todo o aplicativo

**RF25 - Leitura de Tela**
- O sistema deve permitir ativar/desativar narração de tela
- Deve ser compatível com leitores de tela nativos

**RF26 - Redução de Movimento**
- O sistema deve permitir reduzir animações e efeitos visuais
- Configuração deve afetar todas as transições e animações

---

### 1.8 Módulo de Suporte e Ajuda

**RF27 - Canais de Contato**
- O sistema deve exibir: telefone, email, horário de atendimento
- Deve permitir acesso rápido aos canais (botões de ação)

**RF28 - FAQ (Perguntas Frequentes)**
- O sistema deve exibir lista de perguntas frequentes
- Perguntas devem ser expansíveis (accordion)
- Deve cobrir tópicos principais: inscrição, cancelamento, acessibilidade

**RF29 - Formulário de Contato**
- O sistema deve permitir envio de mensagem para suporte
- Campos: nome, email, mensagem
- Deve validar campos obrigatórios
- Deve exibir confirmação de envio

---

### 1.9 Módulo de Navegação

**RF30 - Navegação Principal**
- O sistema deve ter navegação inferior fixa com 4 abas
- Abas: Início, Agenda, Notícias, Perfil
- Deve destacar visualmente a aba ativa

**RF31 - Navegação entre Telas**
- O sistema deve permitir navegação entre todas as telas
- Deve manter histórico de navegação
- Botões "Voltar" devem retornar à tela anterior

**RF32 - Indicadores de Notificação**
- O sistema deve exibir badge de notificações pendentes
- Badge deve aparecer nos ícones relevantes da navegação

---

### 1.10 Módulo de Notificações

**RF33 - Notificações de Eventos**
- O sistema deve notificar sobre novos eventos
- Deve notificar sobre eventos próximos (lembretes)
- Deve notificar confirmação de inscrição

**RF34 - Configuração de Notificações**
- O sistema deve permitir ativar/desativar notificações
- Deve permitir escolher categorias de notificação

---

## ⚙️ 2. REQUISITOS NÃO FUNCIONAIS (RNF)

Os requisitos não funcionais descrevem **como** o sistema deve funcionar.

### 2.1 Usabilidade

**RNF01 - Interface Intuitiva**
- A interface deve ser simples e fácil de usar para pessoas com 60+ anos
- Fluxos principais devem ter no máximo 3 passos
- Deve seguir padrões conhecidos de navegação mobile

**RNF02 - Tamanho de Elementos Interativos**
- Todos os botões devem ter no mínimo 44x44px (WCAG 2.1)
- Botões principais devem ter 56px de altura
- Espaçamento mínimo entre elementos tocáveis: 8px

**RNF03 - Tipografia Legível**
- Fonte base: 18px (maior que padrão 16px)
- Títulos principais: mínimo 28px
- Peso da fonte: mínimo 400 (normal) e 600 (ênfase)
- Line-height: 1.5 para melhor legibilidade

**RNF04 - Feedback Visual**
- Todas as ações devem ter feedback visual imediato
- Estados de loading devem ser claramente indicados
- Transições devem ser suaves (0.2-0.4s)

**RNF05 - Mensagens de Erro**
- Mensagens de erro devem ser claras e em linguagem simples
- Devem indicar como corrigir o problema
- Devem ter contraste visual adequado (cor vermelha)

---

### 2.2 Acessibilidade

**RNF06 - Contraste de Cores (WCAG AAA)**
- Texto normal: contraste mínimo de 7:1
- Texto grande (18px+): contraste mínimo de 4.5:1
- Elementos gráficos: contraste mínimo de 3:1

**RNF07 - Navegação por Teclado**
- Todos os elementos interativos devem ser acessíveis por teclado
- Focus ring deve ser sempre visível (4px, cor primária)
- Ordem de tabulação deve ser lógica

**RNF08 - Compatibilidade com Leitores de Tela**
- Todos os elementos devem ter labels descritivos
- Imagens devem ter texto alternativo (alt)
- Estrutura semântica HTML deve ser correta (h1, h2, nav, etc)
- Ícones devem ter aria-label

**RNF09 - Suporte a Zoom**
- Interface deve suportar zoom até 200% sem perda de funcionalidade
- Texto não deve ser truncado ao ampliar
- Layout deve permanecer utilizável

**RNF10 - Personalização**
- Usuário deve poder ajustar tamanho de texto (80-150%)
- Usuário deve poder ativar alto contraste
- Usuário deve poder desativar animações

---

### 2.3 Performance

**RNF11 - Tempo de Carregamento**
- Tela inicial deve carregar em menos de 2 segundos
- Transições entre telas: máximo 0.4 segundos
- Busca em tempo real: resposta em menos de 300ms

**RNF12 - Otimização de Imagens**
- Imagens devem ser otimizadas para web
- Deve usar lazy loading para imagens fora da tela
- Deve ter fallback para imagens não carregadas

**RNF13 - Animações Performáticas**
- Animações devem usar CSS transforms (GPU)
- Frame rate: mínimo 60fps
- Não deve causar lag ou stuttering

---

### 2.4 Responsividade

**RNF14 - Suporte a Dispositivos Móveis**
- Deve funcionar em smartphones iOS e Android
- Resolução mínima: 375px de largura (iPhone SE)
- Resolução máxima otimizada: 428px (iPhone Pro Max)

**RNF15 - Orientação de Tela**
- Deve funcionar primariamente em modo retrato
- Layout deve se adaptar a diferentes alturas de tela

**RNF16 - Responsividade de Componentes**
- Todos os componentes devem se adaptar ao tamanho da tela
- Texto deve fazer wrap adequado
- Imagens devem manter proporção

---

### 2.5 Compatibilidade

**RNF17 - Navegadores**
- Deve funcionar em Chrome (versão atual)
- Deve funcionar em Safari (iOS 14+)
- Deve funcionar em Firefox (versão atual)

**RNF18 - Sistemas Operacionais**
- iOS: versão 14 ou superior
- Android: versão 8 (Oreo) ou superior

**RNF19 - Progressive Web App (PWA)**
- Deve ser instalável como PWA
- Deve funcionar offline (funcionalidades básicas)
- Deve ter ícone e splash screen

---

### 2.6 Segurança

**RNF20 - Proteção de Dados**
- Dados pessoais devem ser transmitidos via HTTPS
- Senhas devem ser criptografadas
- Não deve armazenar dados sensíveis localmente

**RNF21 - Autenticação**
- Sessão deve expirar após 30 dias de inatividade
- Deve permitir logout seguro
- Deve ter proteção contra CSRF

**RNF22 - Privacidade**
- Não deve coletar dados sem consentimento
- Deve estar em conformidade com LGPD
- Deve permitir exclusão de dados pessoais

---

### 2.7 Manutenibilidade

**RNF23 - Código Limpo**
- Código deve seguir padrões React/TypeScript
- Componentes devem ser reutilizáveis
- Nomenclatura deve ser clara e consistente

**RNF24 - Documentação**
- Sistema de design deve estar documentado
- Componentes devem ter comentários descritivos
- API deve ter documentação clara

**RNF25 - Versionamento**
- Código deve usar controle de versão (Git)
- Deve ter versionamento semântico (1.0.0)
- Mudanças devem ser rastreáveis

---

### 2.8 Escalabilidade

**RNF26 - Arquitetura Modular**
- Componentes devem ser independentes
- Deve permitir adição de novas funcionalidades facilmente
- Deve suportar múltiplos idiomas (i18n ready)

**RNF27 - Performance com Muitos Dados**
- Lista de eventos deve suportar 100+ itens sem lag
- Calendário deve funcionar para qualquer mês/ano
- Busca deve ser eficiente mesmo com muitos eventos

---

### 2.9 Disponibilidade

**RNF28 - Uptime**
- Sistema deve ter disponibilidade de 99.5%
- Manutenções devem ser agendadas em horários de baixo uso

**RNF29 - Tratamento de Erros**
- Erros de conexão devem ser tratados gracefully
- Deve exibir mensagem amigável em caso de erro
- Deve ter retry automático para falhas de rede

---

### 2.10 Conformidade e Padrões

**RNF30 - WCAG 2.1 Nível AAA**
- Deve atender todos os critérios de acessibilidade WCAG 2.1 AAA
- Deve ser testado com ferramentas de acessibilidade

**RNF31 - LGPD (Lei Geral de Proteção de Dados)**
- Deve ter política de privacidade clara
- Deve permitir acesso, correção e exclusão de dados
- Deve ter base legal para tratamento de dados

**RNF32 - Design System**
- Deve seguir sistema de design documentado
- Tokens devem ser centralizados
- Deve manter consistência visual

---

## 📊 3. MATRIZ DE RASTREABILIDADE

### 3.1 Requisitos Funcionais vs. Telas

| Requisito | Onboarding | Discovery | Event Detail | Calendar | News | Profile | Accessibility | Support |
|-----------|:----------:|:---------:|:------------:|:--------:|:----:|:-------:|:-------------:|:-------:|
| RF01-RF02 | ✓ | - | - | - | - | - | - | - |
| RF03-RF06 | - | ✓ | - | - | - | - | - | - |
| RF07-RF09 | - | - | ✓ | - | - | - | - | - |
| RF10-RF14 | - | - | - | ✓ | - | - | - | - |
| RF15-RF19 | - | - | - | - | ✓ | - | - | - |
| RF20-RF22 | - | - | - | - | - | ✓ | - | - |
| RF23-RF26 | - | - | - | - | - | - | ✓ | - |
| RF27-RF29 | - | - | - | - | - | - | - | ✓ |
| RF30-RF32 | - | ✓ | ✓ | ✓ | ✓ | ✓ | - | - |

### 3.2 Requisitos Não Funcionais - Status de Implementação

| Categoria | Requisito | Status | Prioridade |
|-----------|-----------|:------:|:----------:|
| Usabilidade | RNF01-RNF05 | ✅ Implementado | Alta |
| Acessibilidade | RNF06-RNF10 | ✅ Implementado | Crítica |
| Performance | RNF11-RNF13 | ✅ Implementado | Alta |
| Responsividade | RNF14-RNF16 | ✅ Implementado | Alta |
| Compatibilidade | RNF17-RNF19 | ⚠️ Parcial | Média |
| Segurança | RNF20-RNF22 | 🔄 Backend necessário | Alta |
| Manutenibilidade | RNF23-RNF25 | ✅ Implementado | Média |
| Escalabilidade | RNF26-RNF27 | ✅ Implementado | Média |
| Disponibilidade | RNF28-RNF29 | 🔄 Backend necessário | Alta |
| Conformidade | RNF30-RNF32 | ✅ Implementado | Crítica |

---

## 🎯 4. PRIORIZAÇÃO (MoSCoW)

### Must Have (Deve Ter) - MVP
- ✅ RF03-RF06: Descoberta de eventos
- ✅ RF07-RF09: Inscrição em eventos
- ✅ RF10-RF14: Calendário e agenda
- ✅ RF23-RF26: Configurações de acessibilidade
- ✅ RNF01-RNF10: Usabilidade e acessibilidade
- ✅ RNF14-RNF16: Responsividade

### Should Have (Deveria Ter)
- ✅ RF01-RF02: Onboarding
- ✅ RF15-RF19: Notícias
- ✅ RF20-RF22: Perfil
- ✅ RF27-RF29: Suporte
- ✅ RNF11-RNF13: Performance
- ⚠️ RNF20-RNF22: Segurança (requer backend)

### Could Have (Poderia Ter)
- 📋 RF33-RF34: Notificações push
- 📋 Compartilhamento de eventos
- 📋 Integração com calendário nativo
- 📋 Modo escuro
- 📋 Múltiplos idiomas

### Won't Have (Não Terá - Agora)
- ❌ Chat em tempo real
- ❌ Videochamadas
- ❌ Gamificação
- ❌ Rede social integrada

---

## 📈 5. MÉTRICAS DE SUCESSO

### 5.1 Métricas de Usabilidade
- **Taxa de conclusão de tarefas**: > 90%
- **Tempo médio para inscrição em evento**: < 30 segundos
- **Taxa de erro**: < 5%
- **NPS (Net Promoter Score)**: > 70

### 5.2 Métricas de Acessibilidade
- **Conformidade WCAG**: 100% Nível AAA
- **Compatibilidade com leitores de tela**: 100%
- **Uso de recursos de acessibilidade**: > 40% dos usuários

### 5.3 Métricas de Performance
- **Tempo de carregamento inicial**: < 2s
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: > 90

### 5.4 Métricas de Negócio
- **Taxa de adoção**: > 30% do público-alvo em 6 meses
- **Engajamento**: > 3 sessões por semana
- **Taxa de inscrição em eventos**: > 60%
- **Taxa de comparecimento**: > 80%

---

## 🔄 6. PRÓXIMAS ITERAÇÕES

### Versão 1.1 (Curto Prazo)
1. Integração com backend (Supabase)
2. Autenticação de usuários
3. Notificações push
4. Modo offline

### Versão 1.2 (Médio Prazo)
1. Modo escuro
2. Compartilhamento de eventos
3. Integração com calendário nativo
4. Múltiplos idiomas

### Versão 2.0 (Longo Prazo)
1. Centro de capacitação digital
2. Comunidades e grupos
3. Gamificação leve
4. Integração com serviços municipais

---

**Documento elaborado por**: Equipe CONNECTA SENIOR  
**Aprovado por**: [Pendente]  
**Última atualização**: Novembro 2025
