# 📸 Como Tirar Screenshots do CONNECTA SENIOR

## Método Rápido

### Passo 1: Ativar o Modo Screenshot

Abra o arquivo `/App.tsx` e encontre a linha 28:

```typescript
const SCREENSHOT_MODE = false;
```

Mude para:

```typescript
const SCREENSHOT_MODE = true;
```

### Passo 2: Visualizar as Telas

Após ativar o modo screenshot, o aplicativo mostrará:
- ✅ Um frame de celular simulado (iPhone - 390x844px)
- ✅ Todas as 8 telas principais
- ✅ Navegação fácil entre telas
- ✅ Indicador de qual tela está sendo exibida

### Passo 3: Navegar Entre as Telas

Use os controles disponíveis:

**Teclas do teclado:**
- `←` (Seta Esquerda) - Tela anterior
- `→` (Seta Direita) - Próxima tela
- `H` - Esconder/Mostrar controles

**Mouse:**
- Clique nos botões de seta nas laterais
- Clique nos pontos indicadores na parte inferior
- Clique em "Modo Screenshot" para esconder todos os controles

### Passo 4: Tirar o Print

#### No Windows:
1. Pressione `H` para esconder os controles
2. Use `Windows + Shift + S` para abrir a ferramenta de captura
3. Selecione a área do celular (frame preto)
4. O print será copiado para a área de transferência
5. Cole em um editor de imagem ou documento

#### No Mac:
1. Pressione `H` para esconder os controles
2. Use `Command + Shift + 4` para captura de área
3. Selecione a área do celular (frame preto)
4. O print será salvo na sua área de trabalho

#### No Linux:
1. Pressione `H` para esconder os controles
2. Use `PrtScn` ou ferramenta de screenshot do sistema
3. Selecione a área do celular

### Passo 5: Voltar ao Modo Normal

Quando terminar de tirar os prints:

1. Abra `/App.tsx` novamente
2. Mude `SCREENSHOT_MODE` de volta para `false`
3. O aplicativo voltará ao modo funcional normal

---

## 📱 Telas Disponíveis para Screenshot

1. **Onboarding (Boas-vindas)** - Tela de introdução
2. **Discovery (Home)** - Tela principal com eventos
3. **Event Detail** - Detalhes de um evento específico
4. **Calendar** - Calendário com agenda pessoal
5. **News** - Notícias da prefeitura
6. **Profile** - Perfil do usuário
7. **Accessibility Settings** - Configurações de acessibilidade
8. **Support** - Ajuda e suporte

---

## 💡 Dicas Extras

### Qualidade das Imagens
- O frame do celular tem dimensões 390x844px (iPhone padrão)
- Certifique-se de capturar todo o frame preto para manter a proporção
- Para apresentações, você pode capturar apenas o conteúdo interno (sem o frame)

### Diferentes Estados
Se você quiser capturar diferentes estados das telas (ex: formulário preenchido, evento selecionado), você pode:

1. Modificar temporariamente os componentes das telas
2. Adicionar mais variações no array `screens` em `/App.tsx`
3. Usar o modo normal do app e tirar prints enquanto navega

### Captura em Diferentes Resoluções

Para simular diferentes dispositivos, edite `/components/ScreenshotHelper.tsx` na linha 29:

```typescript
// iPhone SE (menor)
<div className="bg-white rounded-[32px] overflow-hidden w-[375px] h-[667px] relative">

// iPhone Padrão (atual)
<div className="bg-white rounded-[32px] overflow-hidden w-[390px] h-[844px] relative">

// iPhone Pro Max (maior)
<div className="bg-white rounded-[32px] overflow-hidden w-[428px] h-[926px] relative">
```

### Remover o Frame do Celular

Se quiser prints sem o frame preto do celular, em `/components/ScreenshotHelper.tsx`, remova ou comente as linhas 27-40 e deixe apenas o conteúdo:

```typescript
<div className="h-full overflow-auto">
  {screens[currentIndex].component}
</div>
```

---

## 🎨 Exportar para Figma/Design

Se você quiser importar os prints para o Figma:

1. Tire os screenshots conforme descrito acima
2. No Figma, crie um novo arquivo
3. Arraste as imagens para o canvas
4. Use como referência para documentação ou apresentação

---

## 🔧 Troubleshooting

**Os controles não aparecem:**
- Pressione a tecla `H` para mostrar/esconder
- Verifique se você clicou na área do aplicativo (foco)

**A navegação não funciona:**
- Certifique-se de que a área do app está em foco (clique nela)
- Use os botões de mouse se as teclas não funcionarem

**SCREENSHOT_MODE não muda nada:**
- Salve o arquivo `/App.tsx` após a alteração
- Recarregue a página do navegador (F5 ou Cmd+R)

---

**Criado para**: CONNECTA SENIOR v1.0.0  
**Data**: Novembro 2025
