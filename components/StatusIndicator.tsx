import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react-native';

interface StatusIndicatorProps {
  isModelLoaded: boolean;
  statusMessage: string;
  isRecognizing: boolean;
  isListening: boolean;
}

export function StatusIndicator({ 
  isModelLoaded, 
  statusMessage, 
  isRecognizing, 
  isListening 
}: StatusIndicatorProps) {
  const getStatusColor = () => {
    if (!isModelLoaded) return '#F59E0B';
    if (isRecognizing || isListening) return '#3B82F6';
    return '#22C55E';
  };

  const getStatusIcon = () => {
    if (!isModelLoaded) {
      return <Loader size={16} color={getStatusColor()} />;
    }
    if (isRecognizing || isListening) {
      return <AlertCircle size={16} color={getStatusColor()} />;
    }
    return <CheckCircle size={16} color={getStatusColor()} />;
  };

  const getDisplayMessage = () => {
    if (isRecognizing) return 'Reconhecendo gesto...';
    if (isListening) return 'Ouvindo...';
    return statusMessage;
  };

  return (
    <View style={[styles.container, { backgroundColor: `${getStatusColor()}15` }]}>
      {getStatusIcon()}
      <Text style={[styles.text, { color: getStatusColor() }]}>
        {getDisplayMessage()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});