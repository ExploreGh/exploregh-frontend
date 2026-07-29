import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Linking,
  Share,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { Button } from '@/components';
import { sites } from '@/data/mockData';
import { useWishlist } from '@/context/WishlistContext';

// ============================================================
// Site Details — full-bleed photo hero with overlay, rating,
// live crowd meter, info cards and action buttons.
// The screen receives the site's id and looks up its full
// data — exactly how it will work with the backend later.
// ============================================================

export default function SiteDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { wishlist, toggleWishlist } = useWishlist();

  // Find the site by id; fall back to the first site
  const site = sites.find((s) => s.id === id) ?? sites[0];
  const saved = wishlist.includes(site.id);

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${site.latitude},${site.longitude}`;
    Linking.openURL(url);
  };

  const shareSite = () =>
    Share.share({
      title: site.name,
      message: `Discover ${site.name} in ${site.region}, Ghana with ExploreGH.`,
    });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Photo hero */}
      <ImageBackground source={{ uri: site.image }} style={styles.hero}>
        <View style={styles.heroOverlay} />

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={Colors.ink} />
        </TouchableOpacity>

        <View style={styles.heroActions}>
          <TouchableOpacity
            style={styles.heroIconButton}
            onPress={() => toggleWishlist(site.id)}
            accessibilityRole="button"
            accessibilityLabel={saved ? 'Remove from saved destinations' : 'Save destination'}
          >
            <Ionicons
              name={saved ? 'heart' : 'heart-outline'}
              size={21}
              color={saved ? Colors.red : Colors.ink}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.heroIconButton}
            onPress={shareSite}
            accessibilityRole="button"
            accessibilityLabel="Share destination"
          >
            <Ionicons name="share-social-outline" size={20} color={Colors.ink} />
          </TouchableOpacity>
        </View>

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
        <Text style={styles.welcomeLabel}>WELCOME TO</Text>
        <Text style={styles.contentTitle}>{site.name}</Text>
        <View style={styles.contentLocation}>
          <Ionicons name="location-outline" size={15} color={Colors.forest} />
          <Text style={styles.contentLocationText}>{site.region}, Ghana</Text>
        </View>

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

        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="map-outline" size={18} color={Colors.forest} />
            <Text style={styles.cardTitle}>Location</Text>
          </View>
          <View style={styles.locationPreview}>
            <View style={styles.mapPin}>
              <Ionicons name="location" size={22} color={Colors.white} />
            </View>
            <View style={styles.mapLines}>
              <View style={styles.mapLineLong} />
              <View style={styles.mapLineShort} />
              <Text style={styles.coordinates}>
                {site.latitude.toFixed(4)}, {site.longitude.toFixed(4)}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.inlineAction} onPress={openDirections}>
            <Text style={styles.inlineActionText}>Open directions</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.forest} />
          </TouchableOpacity>
        </View>

        {/* Best time */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="time-outline" size={17} color={Colors.ink} />
            <Text style={styles.cardTitle}>Best time to visit</Text>
          </View>
          <Text style={styles.cardText}>{site.bestTime}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="sparkles-outline" size={18} color={Colors.forest} />
            <Text style={styles.cardTitle}>Visitor facilities</Text>
          </View>
          <View style={styles.facilities}>
            {[
              ['people-outline', 'Local guides'],
              ['camera-outline', 'Photo spots'],
              ['restaurant-outline', 'Food nearby'],
              ['bag-handle-outline', 'Souvenirs'],
            ].map(([icon, label]) => (
              <View key={label} style={styles.facility}>
                <View style={styles.facilityIcon}>
                  <Ionicons name={icon as any} size={17} color={Colors.forest} />
                </View>
                <Text style={styles.facilityText}>{label}</Text>
              </View>
            ))}
          </View>
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
          <Button title="Get directions" icon="navigate-outline" variant="secondary" onPress={openDirections} />
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
    height: 320,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },
  backButton: {
    position: 'absolute',
    top: 54,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
  },
  heroActions: {
    position: 'absolute',
    top: 54,
    right: 16,
    flexDirection: 'row',
    gap: 9,
  },
  heroIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
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
    marginTop: -18,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: Colors.mist,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
  },
  welcomeLabel: {
    color: Colors.forest, fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 4,
  },
  contentTitle: { color: Colors.ink, fontSize: 25, fontWeight: '800', marginBottom: 6 },
  contentLocation: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 16 },
  contentLocationText: { color: Colors.slate, fontSize: 13, fontWeight: '600' },
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
  locationPreview: {
    minHeight: 92,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: Radius.md,
    backgroundColor: Colors.forestSoft,
    padding: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  mapPin: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: Colors.forest,
    alignItems: 'center', justifyContent: 'center',
  },
  mapLines: { flex: 1, gap: 7 },
  mapLineLong: { height: 5, width: '86%', borderRadius: 3, backgroundColor: Colors.sage },
  mapLineShort: { height: 5, width: '58%', borderRadius: 3, backgroundColor: Colors.sage },
  coordinates: { color: Colors.forestDark, fontSize: 11, fontWeight: '700' },
  inlineAction: {
    minHeight: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  inlineActionText: { color: Colors.forest, fontSize: 13, fontWeight: '800' },
  facilities: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 14 },
  facility: { width: '50%', flexDirection: 'row', alignItems: 'center', gap: 8 },
  facilityIcon: {
    width: 34, height: 34, borderRadius: 12, backgroundColor: Colors.forestSoft,
    alignItems: 'center', justifyContent: 'center',
  },
  facilityText: { color: Colors.ink, fontSize: 12, fontWeight: '700' },
});
