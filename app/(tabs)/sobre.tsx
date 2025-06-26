import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Heart, Users, Zap, Shield } from 'lucide-react-native';

export default function SobreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Sobre o App</Text>
          <Text style={styles.subtitle}>Conectando mundos através da comunicação</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.iconContainer}>
            <Heart size={32} color="#EF4444" />
          </View>
          <Text style={styles.sectionTitle}>Nossa Missão</Text>
          <Text style={styles.sectionText}>
            Facilitar a comunicação entre pessoas surdas e ouvintes através da tecnologia, 
            promovendo inclusão e acessibilidade em Recife e todo o Nordeste.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.iconContainer}>
            <Zap size={32} color="#F59E0B" />
          </View>
          <Text style={styles.sectionTitle}>Como Funciona</Text>
          <Text style={styles.sectionText}>
            • <Text style={styles.bold}>Reconhecimento de Gestos:</Text> A câmera captura gestos em Libras e os converte em texto e fala{'\n'}
            • <Text style={styles.bold}>Reconhecimento de Voz:</Text> Transcreve a fala em texto para leitura{'\n'}
            • <Text style={styles.bold}>Conversa Fluida:</Text> Permite diálogo natural entre ambas as modalidades
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.iconContainer}>
            <Users size={32} color="#8B5CF6" />
          </View>
          <Text style={styles.sectionTitle}>Contexto Regional</Text>
          <Text style={styles.sectionText}>
            Desenvolvido com foco na comunidade surda de Recife/PE, considerando:
            {'\n'}• Variações regionais da Libras do Nordeste
            {'\n'}• Termos específicos da cultura pernambucana
            {'\n'}• Expressões locais e regionalismos
            {'\n'}• Contexto sociocultural da região
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.iconContainer}>
            <Shield size={32} color="#10B981" />
          </View>
          <Text style={styles.sectionTitle}>Tecnologia & Privacidade</Text>
          <Text style={styles.sectionText}>
            • <Text style={styles.bold}>IA Local:</Text> Todo processamento acontece no seu dispositivo{'\n'}
            • <Text style={styles.bold}>Dados Seguros:</Text> Nenhuma conversa é enviada para servidores externos{'\n'}
            • <Text style={styles.bold}>Open Source:</Text> Código baseado em datasets públicos de Libras{'\n'}
            • <Text style={styles.bold}>TensorFlow.js:</Text> Reconhecimento em tempo real
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datasets Utilizados</Text>
          <Text style={styles.sectionText}>
            • MINDS-Libras (UFSC){'\n'}
            • Corpus de Libras (UFPB){'\n'}
            • SignWriting datasets{'\n'}
            • Contribuições da comunidade surda do Nordeste
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expansão Futura</Text>
          <Text style={styles.sectionText}>
            Atualmente o app reconhece o alfabeto manual em Libras. 
            Em breve incluiremos:{'\n'}
            • Palavras e frases completas{'\n'}
            • Expressões faciais e corporais{'\n'}
            • Contextos específicos (saúde, educação, trabalho){'\n'}
            • Modo offline completo
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Feito com ❤️ para a comunidade surda{'\n'}
            Recife - Pernambuco - Brasil
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
  },
  bold: {
    fontWeight: 'bold',
    color: '#374151',
  },
  footer: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});