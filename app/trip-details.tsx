import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { trips } from '@/data/mockData';

export default function TripDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const trip = trips.find((item) => item.id === id);

  if (!trip) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="map-outline" size={42} color={Colors.forest} />
        <Text style={styles.emptyTitle}>Trip not found</Text>
        <TouchableOpacity style={styles.backToTrips} onPress={() => router.back()}>
          <Text style={styles.backToTripsText}>Back to trips</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={{ uri: trip.image }} style={styles.hero}>
          <View style={styles.overlay} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={22} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.heroContent}>
            <Text style={styles.eyebrow}>YOUR GHANA ADVENTURE</Text>
            <Text style={styles.title}>{trip.title}</Text>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <Ionicons name="calendar-outline" size={19} color={Colors.forest} />
              </View>
              <View style={styles.infoCopy}>
                <Text style={styles.infoLabel}>Travel dates</Text>
                <Text style={styles.infoValue}>{trip.startDate} — {trip.endDate}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <Ionicons name="location-outline" size={19} color={Colors.forest} />
              </View>
              <View style={styles.infoCopy}>
                <Text style={styles.infoLabel}>Places to explore</Text>
                <Text style={styles.infoValue}>{trip.stops} planned stops</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <Ionicons name="cash-outline" size={19} color={Colors.forest} />
              </View>
              <View style={styles.infoCopy}>
                <Text style={styles.infoLabel}>Estimated budget</Text>
                <Text style={styles.infoValue}>{trip.budget}</Text>
              </View>
            </View>
          </View>

          <View style={styles.noteCard}>
            <Ionicons name="bulb-outline" size={21} color={Colors.gold} />
            <Text style={styles.noteText}>
              Keep exploring destinations and local guides as you prepare for this trip.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.exploreButton}
            activeOpacity={0.88}
            onPress={() => router.push('/(tabs)/home')}
            accessibilityRole="button"
            accessibilityLabel="Browse Ghana destinations"
          >
            <Ionicons name="compass-outline" size={19} color={Colors.gold} />
            <Text style={styles.exploreButtonText}>Browse destinations</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.mist },
  hero: { height: 300, justifyContent: 'space-between' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(6, 32, 19, 0.48)' },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 54,
    marginLeft: 16,
  },
  heroContent: { padding: 20 },
  eyebrow: { color: Colors.gold, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginBottom: 7 },
  title: { color: Colors.white, fontSize: 29, fontWeight: '800' },
  content: { padding: 16, gap: 16 },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 13, paddingVertical: 5 },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.forestSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCopy: { flex: 1 },
  infoLabel: { fontSize: 12, color: Colors.slate, marginBottom: 3 },
  infoValue: { fontSize: 15, color: Colors.ink, fontWeight: '700' },
  divider: { height: 1, backgroundColor: Colors.line, marginVertical: 11 },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: Colors.forest,
    borderRadius: Radius.md,
    padding: 15,
  },
  noteText: { flex: 1, color: Colors.white, fontSize: 13, lineHeight: 19 },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.forest,
    paddingVertical: 16,
    borderRadius: Radius.pill,
  },
  exploreButtonText: { color: Colors.gold, fontSize: 15, fontWeight: '800' },
  emptyContainer: {
    flex: 1,
    backgroundColor: Colors.mist,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 14,
  },
  emptyTitle: { fontSize: 21, fontWeight: '800', color: Colors.ink },
  backToTrips: { backgroundColor: Colors.forest, paddingVertical: 13, paddingHorizontal: 24, borderRadius: Radius.pill },
  backToTripsText: { color: Colors.gold, fontWeight: '800' },
});
