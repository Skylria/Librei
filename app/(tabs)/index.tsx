import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { CameraComponent } from '@/components/CameraComponent';
import { ConversationHistory } from '@/components/ConversationHistory';
import { ActionButtons } from '@/components/ActionButtons';
import { StatusIndicator } from '@/components/StatusIndicator';
import { initializeTensorFlow } from '@/utils/loadModel';

export interface ConversationMessage {
  id: string;
  type: 'gesture' | 'speech';
  content: string;
  timestamp: Date;
  confidence?: number;
}

export default function ConversaScreen() {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentGesture, setCurrentGesture] = useState<string>('');
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Inicializando...');

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setStatusMessage('Carregando modelo de IA...');
      await initializeTensorFlow();
      setIsModelLoaded(true);
      setStatusMessage('Pronto para conversar!');
    } catch (error) {
      console.error('Erro ao inicializar:', error);
      setStatusMessage('Erro ao carregar modelo. Verifique a conexão.');
    }
  };

  const addMessage = (type: 'gesture' | 'speech', content: string, confidence?: number) => {
    const newMessage: ConversationMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      confidence,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleGestureRecognized = (gesture: string, confidence: number) => {
    setCurrentGesture(gesture);
    addMessage('gesture', gesture, confidence);
  };

  const handleSpeechRecognized = (text: string) => {
    addMessage('speech', text);
  };

  const clearConversation = () => {
    setMessages([]);
    setCurrentGesture('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Conversa em Libras</Text>
        <StatusIndicator 
          isModelLoaded={isModelLoaded}
          statusMessage={statusMessage}
          isRecognizing={isRecognizing}
          isListening={isListening}
        />
      </View>

      <View style={styles.cameraContainer}>
        <CameraComponent
          onGestureRecognized={handleGestureRecognized}
          isRecognizing={isRecognizing}
          setIsRecognizing={setIsRecognizing}
          isModelLoaded={isModelLoaded}
        />
        {currentGesture && (
          <View style={styles.gestureOverlay}>
            <Text style={styles.gestureText}>Gesto: {currentGesture}</Text>
          </View>
        )}
      </View>

      <View style={styles.conversationContainer}>
        <ConversationHistory messages={messages} />
      </View>

      <ActionButtons
        isRecognizing={isRecognizing}
        isListening={isListening}
        setIsListening={setIsListening}
        onSpeechRecognized={handleSpeechRecognized}
        onClearConversation={clearConversation}
        isModelLoaded={isModelLoaded}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  cameraContainer: {
    flex: 2,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  gestureOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  gestureText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  conversationContainer: {
    flex: 1,
    margin: 16,
    marginTop: 8,
  },
});