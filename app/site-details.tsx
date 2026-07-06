import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { Button } from '@/components';
import { sites } from '@/data/mockData';

// ============================================================
// Site Details — full-bleed photo hero with overlay, rating,
// live crowd meter, info cards and action buttons.
// The screen receives the site's id and looks up its full
// data — exactly how it will work with the backend later.
// ============================================================

export default function SiteDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Find the site by id; fall back to the first site
  const site = sites.find((s) => s.id === id) || sites[0];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Photo hero */}
      <ImageBackground source={{ uri: site.image }} style={styles.hero}>
        <View style={styles.heroOverlay} />

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={Colors.white} />
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{site.category}</Text>
          </View>
          <Text style={styles.siteName}>{site.name}</Text>
          <View style={styles.heroMeta}>
            <Ionicons name="location-sharp" size={14} color={Colors.gold} />
            <Text style={styles.heroRegion}>{site.region}, Ghana</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        {/* Rating */}
        <View style={styles.ratingCard}>
          <View style={styles.ratingLeft}>
            <Ionicons name="star" size={18} color={Colors.gold} />
            <Text style={styles.ratingValue}>{site.rating}</Text>
            <Text style={styles.ratingReviews}>({site.reviews.toLocaleString()} reviews)</Text>
          </View>
          <View style={styles.feeBadge}>
            <Ionicons name="ticket-outline" size={13} color={Colors.forest} />
            <Text style={styles.feeText}>{site.entryFee}</Text>
          </View>
        </View>

        {/* Crowd meter */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="people-outline" size={17} color={Colors.ink} />
            <Text style={styles.cardTitle}>Live crowd level</Text>
          </View>
          <View style={styles.crowdMeter}>
            <View style={[styles.crowdFill, { width: `${site.crowdLevel * 100}%` }]} />
          </View>
          <Text style={styles.crowdLabel}>{site.crowdLabel}</Text>
        </View>

        {/* Best time */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="time-outline" size={17} color={Colors.ink} />
            <Text style={styles.cardTitle}>Best time to visit</Text>
          </View>
          <Text style={styles.cardText}>{site.bestTime}</Text>
        </View>

        {/* About */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="information-circle-outline" size={17} color={Colors.ink} />
            <Text style={styles.cardTitle}>About this site</Text>
          </View>
          <Text style={styles.cardText}>{site.description}</Text>
        </View>

        {/* Etiquette */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="hand-left-outline" size={17} color={Colors.ink} />
            <Text style={styles.cardTitle}>Cultural etiquette</Text>
          </View>
          <Text style={styles.cardText}>{site.etiquette}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Button title="Add to trip plan" icon="calendar-outline" onPress={() => router.push('/trip-planner')} />
          <Button title="Get directions" icon="navigate-outline" variant="secondary" onPress={() => {}} />
          <Button title="Report safety issue" icon="warning-outline" variant="danger" onPress={() => router.push('/safety-alerts')} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mist,
  },
  hero: {
    height: 300,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 32, 19, 0.42)',
  },
  backButton: {
    position: 'absolute',
    top: 54,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    padding: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.gold,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: Radius.pill,
    marginBottom: 8,
  },
  categoryBadgeText: {
    color: Colors.forestDark,
    fontWeight: '800',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  siteName: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 6,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  heroRegion: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.95,
  },
  content: {
    padding: 16,
  },
  ratingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
  ratingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingValue: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.ink,
  },
  ratingReviews: {
    fontSize: 13,
    color: Colors.slate,
  },
  feeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.forestSoft,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Radius.pill,
    maxWidth: 180,
  },
  feeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.forest,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.ink,
  },
  cardText: {
    fontSize: 14,
    color: Colors.slate,
    lineHeight: 21,
  },
  crowdMeter: {
    height: 10,
    backgroundColor: Colors.line,
    borderRadius: 5,
    marginBottom: 8,
    overflow: 'hidden',
  },
  crowdFill: {
    height: '100%',
    backgroundColor: Colors.gold,
    borderRadius: 5,
  },
  crowdLabel: {
    fontSize: 13,
    color: Colors.forest,
    fontWeight: '700',
  },
  actions: {
    gap: 12,
    marginTop: 4,
    marginBottom: 24,
  },
});
