import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const emergencyServices = [
  {
    id: '1',
    category: 'Police',
    emoji: '🚔',
    color: '#003580',
    contacts: [
      { name: 'Ghana Police Service', number: '191' },
      { name: 'Police Emergency', number: '18555' },
      { name: 'Motor Traffic & Transport', number: '054 191 0001' },
    ],
  },
  {
    id: '2',
    category: 'Medical',
    emoji: '🏥',
    color: '#cc0000',
    contacts: [
      { name: 'Ambulance Service', number: '193' },
      { name: 'Korle Bu Teaching Hospital', number: '030 250 1300' },
      { name: 'Komfo Anokye Teaching Hospital', number: '032 202 2301' },
      { name: 'Ridge Hospital Accra', number: '030 266 1947' },
    ],
  },
  {
    id: '3',
    category: 'Fire Service',
    emoji: '🚒',
    color: '#cc0000',
    contacts: [
      { name: 'Ghana National Fire Service', number: '192' },
      { name: 'Fire Emergency', number: '030 222 5678' },
    ],
  },
  {
    id: '4',
    category: 'Tourist Support',
    emoji: '🌍',
    color: '#006B3F',
    contacts: [
      { name: 'Ghana Tourism Authority', number: '030 223 3200' },
      { name: 'Tourist Police Unit', number: '030 277 3906' },
      { name: 'GIPC Tourist Helpline', number: '0800 900 900' },
    ],
  },
  {
    id: '5',
    category: 'Embassies in Ghana',
    emoji: '🏛️',
    color: '#555',
    contacts: [
      { name: 'US Embassy Accra', number: '030 274 1000' },
      { name: 'UK High Commission', number: '030 221 3250' },
      { name: 'Nigerian High Commission', number: '030 277 4521' },
      { name: 'French Embassy', number: '030 221 3094' },
      { name: 'Chinese Embassy', number: '030 277 3388' },
    ],
  },
];

export default function EmergencyContacts() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Contacts</Text>
        <View />
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          🚨 Save these numbers before you travel. In an emergency, every second counts!
        </Text>
      </View>

      <ScrollView style={styles.list}>
        {emergencyServices.map((service) => (
          <View key={service.id} style={styles.serviceCard}>

            {/* Category Header */}
            <View style={[styles.categoryHeader, { backgroundColor: service.color }]}>
              <Text style={styles.categoryEmoji}>{service.emoji}</Text>
              <Text style={styles.categoryName}>{service.category}</Text>
            </View>

            {/* Contacts */}
            {service.contacts.map((contact, index) => (
              <View key={index} style={styles.contactRow}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <View style={styles.numberBadge}>
                  <Text style={styles.contactNumber}>{contact.number}</Text>
                </View>
              </View>
            ))}

          </View>
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#cc0000',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  banner: {
    backgroundColor: '#fff3cd',
    padding: 14,
    margin: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#cc0000',
  },
  bannerText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
  list: {
    paddingHorizontal: 16,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 10,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  contactName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  numberBadge: {
    backgroundColor: '#006B3F',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  contactNumber: {
    color: '#FCD20F',
    fontWeight: 'bold',
    fontSize: 13,
  },
});