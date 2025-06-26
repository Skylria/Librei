import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { predictGesture } from '@/utils/predictGesture';
import { Camera, AlertCircle } from 'lucide-react-native';

interface CameraComponentProps {
  onGestureRecognized: (gesture: string, confidence: number) => void;
  isRecognizing: boolean;
  setIsRecognizing: (recognizing: boolean) => void;
  isModelLoaded: boolean;
}

export function CameraComponent({ 
  onGestureRecognized, 
  isRecognizing, 
  setIsRecognizing,
  isModelLoaded 
}: CameraComponentProps) {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecognizing && isModelLoaded) {
      startGestureRecognition();
    } else {
      stopGestureRecognition();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecognizing, isModelLoaded]);

  const startGestureRecognition = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Simulação de reconhecimento de gestos - substitua pela implementação real
    intervalRef.current = setInterval(async () => {
      try {
        // Aqui você faria a captura do frame da câmera e passaria para o modelo
        const result = await predictGesture(null); // null por enquanto - implementar captura de frame
        
        if (result && result.gesture && result.confidence > 0.7) {
          onGestureRecognized(result.gesture, result.confidence);
          setIsRecognizing(false);
        }
      } catch (error) {
        console.error('Erro no reconhecimento:', error);
      }
    }, 1000); // Reconhece a cada 1 segundo
  };

  const stopGestureRecognition = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <AlertCircle size={48} color="#EF4444" />
        <Text style={styles.permissionText}>Carregando permissões...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Camera size={48} color="#6B7280" />
        <Text style={styles.permissionText}>
          Precisamos de acesso à câmera para reconhecer os gestos em Libras
        </Text>
        <Text style={styles.permissionButton} onPress={requestPermission}>
          Permitir Acesso
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        onCameraReady={() => console.log('Camera ready')}
      >
        <View style={styles.overlay}>
          {isRecognizing && (
            <View style={styles.recognizingIndicator}>
              <Text style={styles.recognizingText}>
                🤏 Reconhecendo gesto...
              </Text>
            </View>
          )}
          
          {!isModelLoaded && (
            <View style={styles.loadingIndicator}>
              <Text style={styles.loadingText}>
                Carregando modelo de IA...
              </Text>
            </View>
          )}

          <View style={styles.handGuides}>
            <View style={styles.handGuide} />
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginVertical: 16,
    lineHeight: 24,
  },
  permissionButton: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
  recognizingIndicator: {
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 20,
  },
  recognizingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingIndicator: {
    backgroundColor: 'rgba(59, 130, 246, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 20,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  handGuides: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handGuide: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    borderStyle: 'dashed',
  },
});