import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ConversationMessage } from '@/app/(tabs)/index';
import { MessageSquare, Mic } from 'lucide-react-native';

interface ConversationHistoryProps {
  messages: ConversationMessage[];
}

export function ConversationHistory({ messages }: ConversationHistoryProps) {
  if (messages.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MessageSquare size={48} color="#9CA3AF" />
        <Text style={styles.emptyText}>
          Inicie uma conversa fazendo um gesto ou falando
        </Text>
        <Text style={styles.emptySubText}>
          Seus diálogos aparecerão aqui
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversa</Text>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {messages.map((message) => (
          <View 
            key={message.id} 
            style={[
              styles.messageContainer,
              message.type === 'gesture' ? styles.gestureMessage : styles.speechMessage
            ]}
          >
            <View style={styles.messageHeader}>
              <View style={styles.messageIcon}>
                {message.type === 'gesture' ? (
                  <Text style={styles.gestureEmoji}>🤏</Text>
                ) : (
                  <Mic size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.messageType}>
                {message.type === 'gesture' ? 'Libras' : 'Fala'}
              </Text>
              {message.confidence && (
                <Text style={styles.confidence}>
                  {Math.round(message.confidence * 100)}%
                </Text>
              )}
            </View>
            <Text style={styles.messageContent}>{message.content}</Text>
            <Text style={styles.messageTime}>
              {message.timestamp.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '500',
  },
  emptySubText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
  },
  messageContainer: {
    borderRadius: 12,
    padding: 12,
    marginVertical: 4,
  },
  gestureMessage: {
    backgroundColor: '#EBF5FF',
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  speechMessage: {
    backgroundColor: '#F0FDF4',
    borderLeftWidth: 4,
    borderLeftColor: '#22C55E',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  messageIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  gestureEmoji: {
    fontSize: 16,
  },
  messageType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  confidence: {
    fontSize: 11,
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  messageContent: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 22,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'right',
  },
});