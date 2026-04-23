import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useEvent } from '@/contexts/EventContext';
import { useGeolocation, isNearEvent } from '@/hooks/useGeolocation';

const eventData = {
  id: '1',
  title: 'Caminhada no Parque',
  category: 'Atividade Física',
  date: '15 Nov 2024',
  time: '08:00 - 10:00',
  location: 'Parque Municipal',
  latitude: -23.5505,
  longitude: -46.6333,
  attendees: 12,
  maxAttendees: 20,
  description: 'Uma caminhada relaxante no parque municipal para manter a saúde e conhecer novas pessoas. Ideal para idosos que desejam se exercitar em um ambiente seguro e agradável.',
  organizer: 'Centro Comunitário Local',
  requirements: 'Roupas confortáveis e tênis apropriado para caminhada',
};

export default function EventDetailScreen() {
  const { registerEvent, unregisterEvent, isEventRegistered, checkInEvent, isCheckedIn } = useEvent();
  const { coordinates, requestLocation, loading } = useGeolocation();
  const [isRegistered, setIsRegistered] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const userId = 'user-123';

  const handleRegister = () => {
    if (isRegistered) {
      unregisterEvent(eventData.id, userId);
      setIsRegistered(false);
      Alert.alert('Sucesso', 'Você foi desinscrito do evento');
    } else {
      registerEvent(eventData.id, userId);
      setIsRegistered(true);
      Alert.alert('Sucesso', 'Você foi inscrito no evento!');
    }
  };

  const handleCheckIn = async () => {
    try {
      await requestLocation();
      
      if (!coordinates) {
        Alert.alert('Erro', 'Não foi possível obter sua localização');
        return;
      }

      const near = isNearEvent(
        coordinates.lat,
        coordinates.lng,
        eventData.latitude,
        eventData.longitude,
        500
      );

      if (near) {
        const success = checkInEvent(eventData.id, userId, {
          lat: coordinates.lat,
          lng: coordinates.lng,
        });

        if (success) {
          setCheckedIn(true);
          Alert.alert('Check-in Realizado!', 'Você fez check-in com sucesso no evento');
        }
      } else {
        Alert.alert(
          'Localização Distante',
          'Você precisa estar a menos de 500 metros do evento para fazer check-in'
        );
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao realizar check-in');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-social-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Event Image Placeholder */}
      <View style={styles.imagePlaceholder}>
        <Ionicons name="image-outline" size={64} color="#ccc" />
      </View>

      {/* Event Info */}
      <View style={styles.content}>
        <Text style={styles.category}>{eventData.category}</Text>
        <Text style={styles.title}>{eventData.title}</Text>

        {/* Date and Time */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color="#007AFF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Data e Hora</Text>
              <Text style={styles.infoValue}>{eventData.date}</Text>
              <Text style={styles.infoValue}>{eventData.time}</Text>
            </View>
          </View>
        </View>

        {/* Location */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#007AFF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Local</Text>
              <Text style={styles.infoValue}>{eventData.location}</Text>
            </View>
          </View>
        </View>

        {/* Attendees */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={20} color="#007AFF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Participantes</Text>
              <Text style={styles.infoValue}>
                {eventData.attendees} de {eventData.maxAttendees} inscritos
              </Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${(eventData.attendees / eventData.maxAttendees) * 100}%` }
              ]}
            />
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o Evento</Text>
          <Text style={styles.description}>{eventData.description}</Text>
        </View>

        {/* Organizer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Organizador</Text>
          <Text style={styles.description}>{eventData.organizer}</Text>
        </View>

        {/* Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O que Levar</Text>
          <Text style={styles.description}>{eventData.requirements}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.registerButton,
              isRegistered && styles.registerButtonActive
            ]}
            onPress={handleRegister}
          >
            <Ionicons 
              name={isRegistered ? "checkmark-circle" : "add-circle-outline"} 
              size={20} 
              color={isRegistered ? "#fff" : "#007AFF"}
            />
            <Text style={[
              styles.registerButtonText,
              isRegistered && styles.registerButtonTextActive
            ]}>
              {isRegistered ? 'Inscrito' : 'Inscrever-se'}
            </Text>
          </TouchableOpacity>

          {isRegistered && (
            <TouchableOpacity
              style={[
                styles.checkInButton,
                checkedIn && styles.checkInButtonActive
              ]}
              onPress={handleCheckIn}
              disabled={loading}
            >
              <Ionicons 
                name={checkedIn ? "checkmark-done" : "location"} 
                size={20} 
                color="#fff"
              />
              <Text style={styles.checkInButtonText}>
                {loading ? 'Localizando...' : checkedIn ? 'Check-in Realizado' : 'Fazer Check-in'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: '#e8e8e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  category: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: '#fff',
  },
  registerButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 8,
  },
  registerButtonTextActive: {
    color: '#fff',
  },
  checkInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#34C759',
  },
  checkInButtonActive: {
    backgroundColor: '#30B24D',
  },
  checkInButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
});
