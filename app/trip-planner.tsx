import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { ScreenHeader } from '@/components';
import { trips } from '@/data/mockData';

// ============================================================
// Trip Planner — trips shown as photo cards with dates,
// stops and budget rows using icons.
// ============================================================

export default function TripPlanner() {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Trip Planner" subtitle="Build your perfect Ghana adventure" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Your trips</Text>

        <View style={styles.list}>
          {trips.map((trip) => (
            <TouchableOpacity key={trip.id} activeOpacity={0.9}>
              <ImageBackground
                source={{ uri: trip.image }}
                style={styles.card}
                imageStyle={styles.cardImage}
              >
                <View style={styles.overlay} />
                <View style={styles.cardContent}>
                  <Text style={styles.tripTitle}>{trip.title}</Text>
                  <View style={styles.metaRow}>
                    <Ionicons name="calendar-outline" size={13} color={Colors.gold} />
                    <Text style={styles.metaText}>
                      {trip.startDate} — {trip.endDate}
                    </Text>
                  </View>
                  <View style={styles.badges}>
                    <View style={styles.badge}>
                      <Ionicons name="location-outline" size={12} color={Colors.white} />
                      <Text style={styles.badgeText}>{trip.stops} stops</Text>
                    </View>
                    <View style={[styles.badge, styles.badgeGold]}>
                      <Ionicons name="cash-outline" size={12} color={Colors.forestDark} />
                      <Text style={[styles.badgeText, styles.badgeTextDark]}>{trip.budget}</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Floating create button */}
      <TouchableOpacity style={styles.createButton} activeOpacity={0.9}>
        <Ionicons name="add" size={20} color={Colors.gold} />
        <Text style={styles.createText}>Create new trip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mist,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.ink,
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 16,
    gap: 14,
  },
  card: {
    height: 150,
    justifyContent: 'flex-end',
  },
  cardImage: {
    borderRadius: Radius.lg,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 32, 19, 0.45)',
    borderRadius: Radius.lg,
  },
  cardContent: {
    padding: 16,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 5,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  metaText: {
    fontSize: 12,
    color: Colors.white,
    opacity: 0.95,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Radius.pill,
  },
  badgeGold: {
    backgroundColor: Colors.gold,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.white,
  },
  badgeTextDark: {
    color: Colors.forestDark,
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.forest,
    paddingVertical: 16,
    borderRadius: Radius.pill,
    ...Shadow.card,
  },
  createText: {
    color: Colors.gold,
    fontSize: 15,
    fontWeight: '800',
  },
});
