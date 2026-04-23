# Guia de Build para APK - Connecta Senior Mobile

Este documento contém instruções para fazer build do aplicativo Connecta Senior para Android (APK).

## Pré-requisitos

Antes de começar, certifique-se de que você tem instalado:

1. **Node.js** (versão 16 ou superior)
   - Download: https://nodejs.org/

2. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

3. **EAS CLI** (Expo Application Services)
   ```bash
   npm install -g eas-cli
   ```

4. **Android Studio** (opcional, mas recomendado)
   - Download: https://developer.android.com/studio
   - Necessário para emulador ou testes locais

5. **Java Development Kit (JDK)** (versão 11 ou superior)
   - Download: https://www.oracle.com/java/technologies/downloads/

## Instalação de Dependências

1. Navegue até a pasta do projeto:
   ```bash
   cd Connecta-Senior-Mobile
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   pnpm install
   ```

## Opção 1: Build com EAS (Recomendado)

### Passo 1: Criar conta Expo
Se ainda não tem, crie uma conta em: https://expo.dev

### Passo 2: Login no EAS
```bash
eas login
```

### Passo 3: Configurar o projeto
```bash
eas build:configure
```

### Passo 4: Fazer build para Android
```bash
eas build --platform android
```

O build será feito na nuvem e você receberá um link para download do APK quando estiver pronto.

### Passo 5: Baixar o APK
- Acesse o link fornecido ou vá para https://expo.dev/builds
- Baixe o arquivo `.apk`

## Opção 2: Build Local com Expo

### Passo 1: Preparar o projeto
```bash
expo prebuild --clean
```

### Passo 2: Fazer build
```bash
expo run:android
```

Isso abrirá o emulador Android ou conectará a um dispositivo físico.

## Opção 3: Build com Android Studio (Avançado)

### Passo 1: Gerar APK
```bash
cd android
./gradlew assembleRelease
```

### Passo 2: Localizar o APK
O arquivo APK estará em:
```
android/app/build/outputs/apk/release/app-release.apk
```

## Instalando o APK em um Dispositivo

### Via ADB (Android Debug Bridge)
```bash
adb install path/to/app.apk
```

### Via Android Studio
1. Abra Android Studio
2. Vá para: Device Manager > Physical Devices
3. Arraste e solte o APK no emulador

### Via Arquivo
1. Transfira o APK para seu dispositivo Android
2. Abra o gerenciador de arquivos
3. Toque no APK e siga as instruções de instalação

## Configurações Importantes

### app.json
O arquivo `app.json` contém as configurações do aplicativo:
- **name**: Nome do aplicativo (Connecta Senior)
- **slug**: Identificador único (connecta-senior)
- **version**: Versão do aplicativo (1.0.0)
- **android**: Configurações específicas do Android

### Permissões Android
O aplicativo requer as seguintes permissões (configuradas automaticamente):
- `ACCESS_FINE_LOCATION` - Para geolocalização
- `ACCESS_COARSE_LOCATION` - Para localização aproximada
- `INTERNET` - Para conexão com servidor

## Troubleshooting

### Erro: "Gradle build failed"
```bash
cd android
./gradlew clean
cd ..
expo prebuild --clean
```

### Erro: "Java not found"
Instale o JDK e configure a variável de ambiente `JAVA_HOME`

### Erro: "Android SDK not found"
Configure a variável de ambiente `ANDROID_SDK_ROOT` ou `ANDROID_HOME`

### Emulador não inicia
```bash
# Listar emuladores disponíveis
emulator -list-avds

# Iniciar um emulador específico
emulator -avd <nome_do_emulador>
```

## Variáveis de Ambiente (Opcional)

Crie um arquivo `.env` na raiz do projeto para configurações:
```
API_URL=https://sua-api.com
API_KEY=sua-chave-api
```

## Estrutura do Projeto

```
Connecta-Senior-Mobile/
├── app/                    # Telas e navegação (Expo Router)
│   ├── (tabs)/            # Telas com abas
│   │   ├── discovery.tsx   # Descoberta de eventos
│   │   ├── event-detail.tsx # Detalhes do evento
│   │   └── profile.tsx     # Perfil do usuário
│   └── _layout.tsx         # Layout raiz
├── contexts/              # Contextos React (Estado global)
│   └── EventContext.tsx    # Contexto de eventos
├── hooks/                 # Hooks customizados
│   └── useGeolocation.ts   # Hook de geolocalização
├── components/            # Componentes reutilizáveis
├── constants/             # Constantes
├── assets/                # Imagens e ícones
├── app.json              # Configuração do Expo
├── package.json          # Dependências
└── tsconfig.json         # Configuração TypeScript
```

## Próximos Passos

1. **Integrar Backend**: Conecte a um servidor para persistir dados
2. **Autenticação**: Implemente login/registro de usuários
3. **Notificações Push**: Configure notificações para eventos
4. **Testes**: Teste em múltiplos dispositivos
5. **Publicar**: Envie para Google Play Store

## Recursos Úteis

- [Documentação Expo](https://docs.expo.dev/)
- [Documentação React Native](https://reactnative.dev/)
- [Documentação EAS Build](https://docs.expo.dev/build/introduction/)
- [Google Play Console](https://play.google.com/console)

## Suporte

Para dúvidas ou problemas:
1. Consulte a documentação oficial
2. Verifique os logs: `expo logs`
3. Procure por issues similares no GitHub
4. Crie uma nova issue com detalhes do erro

---

**Versão**: 1.0.0  
**Última atualização**: Abril 2026
