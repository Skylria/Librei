import { Audio } from 'expo-av';
import { Platform } from 'react-native';

/**
 * Transcreve áudio em texto usando reconhecimento de fala
 * 
 * IMPLEMENTAÇÃO ATUAL: Simulação para demonstração web
 * IMPLEMENTAÇÃO REAL NECESSÁRIA para produção:
 * 1. Para iOS/Android: usar react-native-voice ou expo-speech com reconhecimento
 * 2. Para Web: usar Web Speech API
 * 3. Alternativa: integrar com serviços como Google Speech-to-Text
 * 
 * @returns Texto transcrito ou string vazia se erro
 */
export async function transcribeAudio(): Promise<string> {
  try {
    // Verificar e solicitar permissões de áudio
    const permission = await Audio.requestPermissionsAsync();
    
    if (!permission.granted) {
      throw new Error('Permissão de áudio não concedida');
    }

    // Para Web - usar Web Speech API se disponível
    if (Platform.OS === 'web' && 'webkitSpeechRecognition' in window) {
      return await transcribeWithWebSpeechAPI();
    }
    
    // Para iOS/Android - implementação nativa necessária
    if (Platform.OS !== 'web') {
      return await transcribeWithNativeAPI();
    }

    // Fallback - simulação para demonstração
    return await simulateTranscription();
    
  } catch (error) {
    console.error('Erro na transcrição de áudio:', error);
    return '';
  }
}

/**
 * Implementação para Web usando Web Speech API
 * Funciona apenas em navegadores compatíveis (Chrome, Edge)
 */
async function transcribeWithWebSpeechAPI(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // @ts-ignore - Web Speech API não tem tipos TypeScript completos
      const recognition = new webkitSpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'pt-BR'; // Português brasileiro
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Erro no reconhecimento de fala:', event.error);
        reject(new Error(`Erro no reconhecimento: ${event.error}`));
      };

      recognition.onend = () => {
        // Se não houve resultado, resolve com string vazia
        resolve('');
      };

      recognition.start();
      
      // Timeout de 10 segundos
      setTimeout(() => {
        recognition.stop();
        resolve('');
      }, 10000);
      
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Implementação para iOS/Android (requer biblioteca nativa)
 * 
 * PARA IMPLEMENTAÇÃO REAL:
 * 1. Instalar: npm install react-native-voice
 * 2. Configurar permissões no app.json/Info.plist/AndroidManifest.xml
 * 3. Implementar gravação e transcrição
 */
async function transcribeWithNativeAPI(): Promise<string> {
  // TODO: Implementar com react-native-voice
  // 
  // Exemplo de implementação:
  // import Voice from 'react-native-voice';
  // 
  // return new Promise((resolve, reject) => {
  //   Voice.onSpeechResults = (e) => {
  //     resolve(e.value[0] || '');
  //   };
  //   
  //   Voice.onSpeechError = (e) => {
  //     reject(new Error(e.error));
  //   };
  //   
  //   Voice.start('pt-BR');
  // });

  console.log('Transcrição nativa não implementada - usando simulação');
  return await simulateTranscription();
}

/**
 * SIMULAÇÃO - REMOVER NA IMPLEMENTAÇÃO REAL
 * Simula transcrição de áudio para demonstração
 */
async function simulateTranscription(): Promise<string> {
  // Simula tempo de processamento
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const simulatedResponses = [
    'Olá, como você está?',
    'Muito prazer em conhecer você!',
    'Que bom que conseguimos nos comunicar!',
    'Você pode repetir, por favor?',
    'Entendi perfeitamente!',
    'Vamos continuar nossa conversa?',
    'Obrigado pela paciência!',
    'Isso é muito interessante!',
    'Pode falar mais devagar?',
    'Excelente! Funcionou!'
  ];
  
  const randomIndex = Math.floor(Math.random() * simulatedResponses.length);
  return simulatedResponses[randomIndex];
}

/**
 * Configurações para diferentes idiomas/dialetos
 * Para expansão regional (Recife/PE/Nordeste)
 */
export const LANGUAGE_CONFIGS = {
  'pt-BR': {
    code: 'pt-BR',
    name: 'Português (Brasil)',
    region: 'Brasil',
  },
  'pt-BR-northeast': {
    code: 'pt-BR',
    name: 'Português (Nordeste)',
    region: 'Nordeste',
    // Configurações específicas para sotaque nordestino poderiam ser adicionadas
  }
};

/**
 * MELHORIAS FUTURAS:
 * 
 * 1. Implementar detecção automática de idioma
 * 2. Adicionar correção de texto específica para termos de Libras
 * 3. Implementar filtros de ruído para ambientes externos
 * 4. Adicionar suporte offline usando modelos locais
 * 5. Implementar calibração por usuário (treinar com voz específica)
 * 6. Adicionar detecção de palavras-chave em Libras soletradas
 */