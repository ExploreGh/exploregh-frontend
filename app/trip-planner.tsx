import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const trips = [
  {
    id: '1',
    title: 'Central Region Explorer',
    startDate: 'May 15, 2026',
    endDate: 'May 18, 2026',
    stops: 4,
    budget: 'GHS 1,200',
    emoji: '🏰',
  },
  {
    id: '2',
    title: 'Accra City Tour',
    startDate: 'June 1, 2026',
    endDate: 'June 2, 2026',
    stops: 3,
    budget: 'GHS 450',
    emoji: '🌆',
  },
  {
    id: '3',
    title: 'Northern Ghana Safari',
    startDate: 'July 10, 2026',
    endDate: 'July 15, 2026',
    stops: 6,
    budget: 'GHS 3,500',
    emoji: '🐘',
  },
];

export default function TripPlanner() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Planner</Text>
        <View />
      </View>

      {/* Info Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          📅 Plan your perfect Ghana adventure. Add sites, guides, and restaurants to your itinerary!
        </Text>
      </View>

      {/* Trips List */}
      <ScrollView style={styles.tripsList}>
        <Text style={styles.sectionTitle}>Your Trips</Text>

        {trips.map((trip) => (
          <TouchableOpacity key={trip.id} style={styles.tripCard}>
            <View style={styles.tripEmoji}>
              <Text style={styles.tripEmojiText}>{trip.emoji}</Text>
            </View>
            <View style={styles.tripInfo}>
              <Text style={styles.tripTitle}>{trip.title}</Text>
              <Text style={styles.tripDates}>📅 {trip.startDate} → {trip.endDate}</Text>
              <View style={styles.tripMeta}>
                <View style={styles.metaBadge}>
                  <Text style={styles.metaBadgeText}>📍 {trip.stops} stops</Text>
                </View>
                <View style={styles.metaBadgeGreen}>
                  <Text style={styles.metaBadgeGreenText}>💰 {trip.budget}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* Create New Trip Button */}
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>➕ Create New Trip</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#006B3F',
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
    color: '#FCD20F',
    fontSize: 20,
    fontWeight: 'bold',
  },
  banner: {
    backgroundColor: '#e8f5e9',
    padding: 14,
    margin: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#006B3F',
  },
  bannerText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
  tripsList: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  tripCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  tripEmoji: {
    width: 60,
    height: 60,
    backgroundColor: '#e8f5e9',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  tripEmojiText: {
    fontSize: 30,
  },
  tripInfo: {
    flex: 1,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  tripDates: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  tripMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  metaBadge: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  metaBadgeText: {
    fontSize: 12,
    color: '#555',
    fontWeight: 'bold',
  },
  metaBadgeGreen: {
    backgroundColor: '#e8f5e9',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  metaBadgeGreenText: {
    fontSize: 12,
    color: '#006B3F',
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#006B3F',
    margin: 16,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FCD20F',
    fontSize: 16,
    fontWeight: 'bold',
  },
});