import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Mic, MicOff, Hand, Trash2 } from 'lucide-react-native';
import { transcribeAudio } from '@/utils/transcribeAudio';

interface ActionButtonsProps {
  isRecognizing: boolean;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  onSpeechRecognized: (text: string) => void;
  onClearConversation: () => void;
  isModelLoaded: boolean;
}

export function ActionButtons({
  isRecognizing,
  isListening,
  setIsListening,
  onSpeechRecognized,
  onClearConversation,
  isModelLoaded
}: ActionButtonsProps) {
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleStartListening = async () => {
    try {
      setIsListening(true);
      setIsTranscribing(true);
      
      const result = await transcribeAudio();
      
      if (result && result.length > 0) {
        onSpeechRecognized(result);
      } else {
        Alert.alert('Aviso', 'Não consegui ouvir nada. Tente falar mais próximo ao dispositivo.');
      }
    } catch (error) {
      console.error('Erro na transcrição:', error);
      Alert.alert('Erro', 'Não foi possível transcrever o áudio. Verifique as permissões do microfone.');
    } finally {
      setIsListening(false);
      setIsTranscribing(false);
    }
  };

  const handleStopListening = () => {
    setIsListening(false);
    setIsTranscribing(false);
  };

  const confirmClearConversation = () => {
    Alert.alert(
      'Limpar Conversa',
      'Tem certeza que deseja apagar todo o histórico da conversa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', style: 'destructive', onPress: onClearConversation },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.primaryButton,
            styles.gestureButton,
            (!isModelLoaded || isRecognizing) && styles.buttonDisabled
          ]}
          onPress={() => {
            // Toggle gesture recognition
            // This would be handled by parent component
          }}
          disabled={!isModelLoaded}
        >
          <Hand size={24} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>
            {isRecognizing ? 'Reconhecendo...' : 'Traduzir Gesto'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.primaryButton,
            styles.speechButton,
            isListening && styles.listeningButton
          ]}
          onPress={isListening ? handleStopListening : handleStartListening}
        >
          {isListening ? (
            <MicOff size={24} color="#FFFFFF" />
          ) : (
            <Mic size={24} color="#FFFFFF" />
          )}
          <Text style={styles.primaryButtonText}>
            {isTranscribing ? 'Ouvindo...' : 
             isListening ? 'Parar' : 'Ouvir Resposta'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={confirmClearConversation}
      >
        <Trash2 size={20} color="#EF4444" />
        <Text style={styles.secondaryButtonText}>Limpar Conversa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  gestureButton: {
    backgroundColor: '#3B82F6',
  },
  speechButton: {
    backgroundColor: '#22C55E',
  },
  listeningButton: {
    backgroundColor: '#EF4444',
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '500',
  },
});