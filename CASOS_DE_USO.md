# 🎭 CASOS DE USO - CONNECTA SENIOR

## Atores do Sistema

### 👴 Ator Principal: Idoso (Usuário Final)
**Características:**
- Idade: 60+ anos
- Nível tecnológico: Básico a Intermediário
- Necessidades: Interface simples, texto grande, alto contraste
- Objetivos: Participar de atividades sociais, manter-se ativo

### 👨‍💼 Ator Secundário: Administrador da Prefeitura
**Características:**
- Responsável por criar e gerenciar eventos
- Publicar notícias e comunicados
- Moderar conteúdo

---

## 📋 CASOS DE USO PRINCIPAIS

### UC01: Descobrir Eventos Disponíveis

**Ator:** Idoso  
**Pré-condições:** Aplicativo aberto, onboarding concluído  
**Pós-condições:** Lista de eventos exibida

**Fluxo Principal:**
1. Usuário acessa a aba "Início"
2. Sistema exibe lista de eventos disponíveis
3. Usuário visualiza eventos com: imagem, título, data, local, vagas
4. Usuário pode rolar a tela para ver mais eventos

**Fluxos Alternativos:**

**FA01 - Buscar Evento Específico:**
1. Usuário clica no campo de busca
2. Usuário digita palavra-chave (ex: "yoga")
3. Sistema filtra eventos em tempo real
4. Sistema exibe contador de eventos encontrados
5. Usuário visualiza apenas eventos que correspondem à busca

**FA02 - Filtrar por Categoria:**
1. Usuário clica em uma categoria (ex: "Atividade Física")
2. Sistema filtra eventos daquela categoria
3. Sistema atualiza contador de eventos
4. Usuário visualiza apenas eventos filtrados

**Regras de Negócio:**
- RN01: Eventos devem ser ordenados por data (próximos primeiro)
- RN02: Eventos passados não devem aparecer na lista principal
- RN03: Eventos lotados devem indicar "Vagas Esgotadas"

---

### UC02: Inscrever-se em Evento

**Ator:** Idoso  
**Pré-condições:** Usuário logado, evento com vagas disponíveis  
**Pós-condições:** Usuário inscrito no evento, vaga reservada

**Fluxo Principal:**
1. Usuário seleciona um evento da lista
2. Sistema exibe detalhes completos do evento
3. Usuário lê informações: data, hora, local, descrição, requisitos
4. Usuário clica em "Confirmar Inscrição"
5. Sistema processa inscrição (loading)
6. Sistema exibe modal de confirmação
7. Sistema envia email de confirmação
8. Sistema atualiza status do evento para "Inscrito"
9. Sistema adiciona evento ao calendário do usuário

**Fluxos Alternativos:**

**FA01 - Evento Lotado:**
1. No passo 4, sistema detecta que não há vagas
2. Sistema desabilita botão "Confirmar Inscrição"
3. Sistema exibe mensagem "Vagas Esgotadas"
4. Sistema pode oferecer opção "Entrar na Lista de Espera"

**FA02 - Erro na Inscrição:**
1. No passo 5, ocorre erro de conexão
2. Sistema exibe mensagem de erro clara
3. Sistema oferece botão "Tentar Novamente"
4. Usuário pode tentar novamente ou cancelar

**Regras de Negócio:**
- RN04: Usuário só pode se inscrever uma vez por evento
- RN05: Inscrição deve ser confirmada em até 2 segundos
- RN06: Email de confirmação deve chegar em até 5 minutos
- RN07: Usuário deve poder cancelar até 24h antes do evento

---

### UC03: Cancelar Inscrição em Evento

**Ator:** Idoso  
**Pré-condições:** Usuário inscrito no evento  
**Pós-condições:** Inscrição cancelada, vaga liberada

**Fluxo Principal:**
1. Usuário acessa detalhes do evento inscrito
2. Sistema exibe status "Você está inscrito"
3. Usuário clica em "Cancelar Inscrição"
4. Sistema solicita confirmação
5. Usuário confirma cancelamento
6. Sistema processa cancelamento
7. Sistema libera vaga do evento
8. Sistema remove evento do calendário do usuário
9. Sistema exibe mensagem de confirmação

**Fluxos Alternativos:**

**FA01 - Cancelamento Muito Próximo:**
1. No passo 6, sistema detecta que faltam menos de 24h
2. Sistema exibe aviso sobre política de cancelamento
3. Usuário pode prosseguir ou manter inscrição

**FA02 - Usuário Desiste do Cancelamento:**
1. No passo 5, usuário clica em "Não, manter inscrição"
2. Sistema retorna à tela de detalhes
3. Inscrição permanece ativa

**Regras de Negócio:**
- RN08: Cancelamento após 24h do evento gera advertência
- RN09: Múltiplos cancelamentos podem resultar em bloqueio temporário
- RN10: Vaga cancelada volta imediatamente para disponibilidade

---

### UC04: Visualizar Agenda Pessoal

**Ator:** Idoso  
**Pré-condições:** Usuário tem eventos inscritos  
**Pós-condições:** Calendário exibido com eventos marcados

**Fluxo Principal:**
1. Usuário acessa aba "Agenda"
2. Sistema exibe calendário do mês atual
3. Sistema destaca dia atual
4. Sistema marca dias com eventos (dot colorido)
5. Sistema exibe contador "Você tem X eventos agendados"
6. Usuário visualiza calendário

**Fluxos Alternativos:**

**FA01 - Selecionar Data Específica:**
1. Usuário clica em uma data do calendário
2. Sistema destaca data selecionada
3. Sistema exibe lista de eventos daquela data
4. Cada evento mostra: hora, título, categoria
5. Usuário pode clicar no evento para ver detalhes

**FA02 - Navegar Entre Meses:**
1. Usuário clica em botão "Próximo mês" ou "Mês anterior"
2. Sistema atualiza calendário
3. Sistema mantém marcações de eventos
4. Usuário visualiza novo mês

**FA03 - Nenhum Evento na Data:**
1. Usuário seleciona data sem eventos
2. Sistema exibe mensagem "Nenhum evento nesta data"
3. Sistema pode sugerir "Descobrir eventos"

**Regras de Negócio:**
- RN11: Calendário deve funcionar para qualquer mês/ano
- RN12: Eventos passados devem aparecer com estilo diferente
- RN13: Eventos do dia devem ter destaque especial

---

### UC05: Ajustar Configurações de Acessibilidade

**Ator:** Idoso  
**Pré-condições:** Usuário no aplicativo  
**Pós-condições:** Configurações aplicadas em todo o app

**Fluxo Principal:**
1. Usuário acessa "Perfil"
2. Usuário clica em "Configurações de Acessibilidade"
3. Sistema exibe tela de configurações
4. Usuário vê opções: tamanho de texto, alto contraste, leitura de tela, reduzir movimento
5. Usuário ajusta configurações desejadas
6. Sistema aplica mudanças imediatamente
7. Usuário vê preview das alterações
8. Sistema salva preferências localmente

**Fluxos Alternativos:**

**FA01 - Ajustar Tamanho de Texto:**
1. Usuário move slider de tamanho de texto
2. Sistema atualiza tamanho em tempo real (80% a 150%)
3. Sistema mostra preview de texto
4. Usuário confirma tamanho desejado
5. Sistema aplica em todo o aplicativo

**FA02 - Ativar Alto Contraste:**
1. Usuário ativa toggle "Alto Contraste"
2. Sistema aumenta contraste de todas as cores
3. Sistema atualiza interface imediatamente
4. Usuário pode desativar se não gostar

**FA03 - Ativar Leitura de Tela:**
1. Usuário ativa toggle "Leitura de Tela"
2. Sistema habilita narração de elementos
3. Sistema pode pedir permissões do sistema
4. Usuário navega com feedback auditivo

**Regras de Negócio:**
- RN14: Configurações devem persistir entre sessões
- RN15: Alto contraste deve manter WCAG AAA
- RN16: Mudanças devem ser aplicadas sem recarregar app

---

### UC06: Buscar Ajuda e Suporte

**Ator:** Idoso  
**Pré-condições:** Usuário com dúvida ou problema  
**Pós-condições:** Dúvida esclarecida ou suporte contatado

**Fluxo Principal:**
1. Usuário acessa "Perfil"
2. Usuário clica em "Ajuda e Suporte"
3. Sistema exibe tela de suporte
4. Sistema mostra: FAQ, canais de contato, formulário
5. Usuário lê perguntas frequentes
6. Usuário encontra resposta

**Fluxos Alternativos:**

**FA01 - Consultar FAQ:**
1. Usuário vê lista de perguntas frequentes
2. Usuário clica em pergunta relevante
3. Sistema expande resposta (accordion)
4. Usuário lê resposta detalhada
5. Problema resolvido

**FA02 - Entrar em Contato por Telefone:**
1. Usuário clica em botão "Ligar"
2. Sistema abre discador do telefone
3. Número pré-preenchido (0800 123 4567)
4. Usuário faz ligação

**FA03 - Enviar Mensagem:**
1. Usuário rola até formulário de contato
2. Usuário preenche: nome, email, mensagem
3. Usuário clica em "Enviar Mensagem"
4. Sistema valida campos
5. Sistema envia mensagem
6. Sistema exibe confirmação de envio
7. Suporte responde em até 24h

**Regras de Negócio:**
- RN17: FAQ deve cobrir pelo menos 80% das dúvidas comuns
- RN18: Formulário deve ter validação em tempo real
- RN19: Tempo de resposta do suporte: máximo 24h

---

### UC07: Ler Notícias da Prefeitura

**Ator:** Idoso  
**Pré-condições:** Aplicativo aberto  
**Pós-condições:** Usuário informado sobre novidades

**Fluxo Principal:**
1. Usuário acessa aba "Notícias"
2. Sistema exibe notícia em destaque (featured)
3. Sistema exibe lista de outras notícias
4. Cada notícia mostra: imagem, título, categoria, data, resumo
5. Usuário navega pela lista
6. Usuário seleciona notícia de interesse
7. Sistema exibe conteúdo completo

**Fluxos Alternativos:**

**FA01 - Carregar Mais Notícias:**
1. Usuário rola até o final da lista
2. Usuário clica em "Carregar mais notícias"
3. Sistema carrega próxima página (10 notícias)
4. Sistema adiciona à lista existente

**FA02 - Compartilhar Notícia:**
1. Usuário clica em botão "Compartilhar"
2. Sistema abre menu de compartilhamento nativo
3. Usuário escolhe canal (WhatsApp, Email, etc)
4. Notícia é compartilhada

**Regras de Negócio:**
- RN20: Notícias devem ser ordenadas por data (mais recentes primeiro)
- RN21: Imagens devem ser otimizadas para mobile
- RN22: Notícias antigas (>6 meses) devem ser arquivadas

---

### UC08: Completar Onboarding Inicial

**Ator:** Idoso (novo usuário)  
**Pré-condições:** Primeira vez abrindo o app  
**Pós-condições:** Onboarding concluído, usuário pronto para usar app

**Fluxo Principal:**
1. Usuário abre aplicativo pela primeira vez
2. Sistema detecta que é primeira vez
3. Sistema exibe primeiro slide do onboarding
4. Slide mostra: ícone, título "Bem-vindo", descrição
5. Usuário lê informações
6. Usuário clica em "Próximo"
7. Sistema exibe segundo slide (sobre descobrir eventos)
8. Usuário clica em "Próximo"
9. Sistema exibe terceiro slide (sobre conectar-se)
10. Usuário clica em "Começar"
11. Sistema marca onboarding como completo
12. Sistema redireciona para tela principal

**Fluxos Alternativos:**

**FA01 - Pular Onboarding:**
1. Em qualquer slide, usuário clica em "Pular"
2. Sistema confirma que deseja pular
3. Sistema marca onboarding como completo
4. Sistema redireciona para tela principal

**FA02 - Voltar no Onboarding:**
1. Nos slides 2 ou 3, usuário pode voltar
2. Sistema exibe slide anterior
3. Indicadores (dots) atualizam

**Regras de Negócio:**
- RN23: Onboarding deve aparecer apenas uma vez
- RN24: Usuário deve poder rever onboarding nas configurações
- RN25: Cada slide deve ser lido em menos de 10 segundos

---

## 📊 MATRIZ DE CASOS DE USO

### Por Frequência de Uso

| Caso de Uso | Frequência Esperada | Criticidade | Complexidade |
|-------------|---------------------|-------------|--------------|
| UC01 - Descobrir Eventos | Alta (diária) | 🔴 Crítica | Média |
| UC02 - Inscrever-se | Média (semanal) | 🔴 Crítica | Alta |
| UC03 - Cancelar Inscrição | Baixa (mensal) | 🟠 Alta | Média |
| UC04 - Visualizar Agenda | Alta (diária) | 🔴 Crítica | Média |
| UC05 - Ajustar Acessibilidade | Baixa (única) | 🟠 Alta | Baixa |
| UC06 - Buscar Suporte | Baixa (ocasional) | 🟡 Média | Baixa |
| UC07 - Ler Notícias | Média (semanal) | 🟡 Média | Baixa |
| UC08 - Onboarding | Única | 🟠 Alta | Baixa |

---

## 🎯 JORNADAS DO USUÁRIO

### Jornada 1: Primeiro Uso - Descobrir e Participar

```
[Abrir App] → [Onboarding] → [Descobrir Eventos] → [Ver Detalhes] 
→ [Inscrever-se] → [Confirmação] → [Visualizar na Agenda]
```

**Tempo Estimado:** 3-5 minutos  
**Pontos de Fricção:** Nenhum identificado  
**Pontos de Deleite:** Modal de confirmação animado

---

### Jornada 2: Uso Recorrente - Verificar Agenda

```
[Abrir App] → [Aba Agenda] → [Selecionar Data] 
→ [Ver Eventos do Dia] → [Acessar Detalhes]
```

**Tempo Estimado:** 30 segundos  
**Pontos de Fricção:** Nenhum identificado  
**Pontos de Deleite:** Calendário visual intuitivo

---

### Jornada 3: Busca Específica

```
[Aba Início] → [Campo de Busca] → [Digitar "yoga"] 
→ [Ver Resultados] → [Selecionar Evento] → [Inscrever-se]
```

**Tempo Estimado:** 1-2 minutos  
**Pontos de Fricção:** Nenhum identificado  
**Pontos de Deleite:** Busca instantânea

---

### Jornada 4: Ajuste de Acessibilidade

```
[Perfil] → [Configurações de Acessibilidade] 
→ [Ajustar Tamanho de Texto] → [Ver Preview] → [Confirmar]
```

**Tempo Estimado:** 1 minuto  
**Pontos de Fricção:** Nenhum identificado  
**Pontos de Deleite:** Preview em tempo real

---

## 🚨 EXCEÇÕES E TRATAMENTO DE ERROS

### E01: Sem Conexão com Internet

**Cenário:** Usuário tenta carregar eventos sem conexão  
**Tratamento:**
1. Sistema detecta ausência de conexão
2. Sistema exibe mensagem clara: "Sem conexão com a internet"
3. Sistema mostra ícone de wifi cortado
4. Sistema oferece botão "Tentar Novamente"
5. Sistema carrega dados do cache (se disponíveis)

---

### E02: Servidor Fora do Ar

**Cenário:** API não responde  
**Tratamento:**
1. Sistema aguarda timeout (5 segundos)
2. Sistema exibe mensagem: "Estamos com dificuldades. Tente novamente em alguns minutos"
3. Sistema registra erro para análise
4. Sistema oferece ir para outras seções que não dependem do servidor

---

### E03: Evento Esgotou Durante Navegação

**Cenário:** Vagas se esgotam enquanto usuário visualiza detalhes  
**Tratamento:**
1. Usuário clica em "Confirmar Inscrição"
2. Sistema detecta que não há mais vagas
3. Sistema exibe mensagem: "Este evento acabou de esgotar as vagas"
4. Sistema desabilita botão de inscrição
5. Sistema oferece "Ver eventos similares"

---

### E04: Formulário com Dados Inválidos

**Cenário:** Usuário envia formulário com email inválido  
**Tratamento:**
1. Usuário clica em "Enviar"
2. Sistema valida campos
3. Sistema destaca campo com erro (borda vermelha)
4. Sistema exibe mensagem específica: "Por favor, insira um email válido"
5. Sistema mantém foco no campo com erro
6. Usuário corrige e reenvia

---

## 📈 MÉTRICAS DE SUCESSO POR CASO DE USO

### UC01 - Descobrir Eventos
- **Taxa de sucesso:** > 95%
- **Tempo médio:** < 15 segundos
- **Abandono:** < 5%

### UC02 - Inscrever-se em Evento
- **Taxa de sucesso:** > 90%
- **Tempo médio:** < 30 segundos
- **Taxa de conversão (visualizar → inscrever):** > 60%

### UC04 - Visualizar Agenda
- **Taxa de sucesso:** 100%
- **Tempo médio:** < 10 segundos
- **Frequência de uso:** > 3x por semana

### UC05 - Ajustar Acessibilidade
- **Taxa de uso:** > 40% dos usuários
- **Taxa de satisfação:** > 90%
- **Permanência das configurações:** > 95%

---

**Documento elaborado por**: Equipe CONNECTA SENIOR  
**Baseado em**: Pesquisa com usuários 60+  
**Última atualização**: Novembro 2025
