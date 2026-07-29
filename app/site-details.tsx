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
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { Button } from '@/components';
import { sites } from '@/data/mockData';
import { useWishlist } from '@/context/WishlistContext';

const destinationHours: Record<string, { open: string; close: string; note: string }> = {
  '1': { open: '9:00 AM', close: '4:30 PM', note: 'Open daily' },
  '2': { open: '8:00 AM', close: '5:00 PM', note: 'Open daily' },
  '3': { open: '6:00 AM', close: '11:00 PM', note: 'Open daily' },
  '4': { open: '8:00 AM', close: '6:00 PM', note: 'Monday–Saturday' },
  '5': { open: '6:00 AM', close: '6:00 PM', note: 'Open daily' },
  '6': { open: '9:00 AM', close: '5:00 PM', note: 'Open daily' },
  '7': { open: '8:00 AM', close: '5:00 PM', note: 'Open daily' },
  '8': { open: '8:30 AM', close: '5:00 PM', note: 'Open daily' },
  '9': { open: '8:30 AM', close: '5:00 PM', note: 'Open daily' },
  '10': { open: '6:00 AM', close: '10:00 PM', note: 'Visitor access' },
  '11': { open: '8:00 AM', close: '5:00 PM', note: 'Outside prayer times' },
  '12': { open: '9:00 AM', close: '5:00 PM', note: 'Tuesday–Sunday' },
  '13': { open: '8:00 AM', close: '5:00 PM', note: 'Open daily' },
};

const destinationHighlights: Record<string, string[]> = {
  '1': [
    'Walk through the male and female dungeons and the Door of No Return with a guide.',
    'Visit the West African Historical Museum and the former governor’s quarters.',
    'Allow time for reflection—the history and stories shared here can be emotionally heavy.',
  ],
  '2': [
    'Cross the seven-section canopy walkway high above the tropical rainforest.',
    'Join a guided forest walk to learn about plants, birds, butterflies and wildlife habitats.',
    'The visitor centre has refreshments, local food, exhibits and a craft shop.',
  ],
  '3': [
    'Enjoy Atlantic sunsets, live drumming, dancing, horse rides and beach football.',
    'Weekday mornings are calmer; weekends and holidays have a lively festival atmosphere.',
    'Swim cautiously, watch sea conditions and keep phones and valuables secure.',
  ],
  '4': [
    'Explore sections dedicated to kente, beads, produce, spices, crafts and household goods.',
    'A local guide can help you navigate the market’s busy halls and specialised lanes.',
    'Ask before taking portraits and agree on prices politely before purchasing.',
  ],
  '5': [
    'Book ranger-led walking or vehicle safaris for elephants, antelope, baboons and birdlife.',
    'The escarpment viewpoint overlooks a waterhole where animals often gather in dry months.',
    'Wildlife sightings vary; early-morning outings generally offer cooler and quieter conditions.',
  ],
  '6': [
    'Tour the dungeons, punishment cells, chapel, governor’s areas and Door of No Return.',
    'The castle dates to 1482 and is the oldest surviving European building in sub-Saharan Africa.',
    'Combine the visit with Elmina fishing harbour and nearby Fort St Jago.',
  ],
  '7': [
    'The mostly level lower-falls trail crosses streams and passes rich butterfly and bird habitat.',
    'Strong hikers can arrange the longer, steeper upper-falls route with an authorised guide.',
    'Look for the large fruit-bat colony roosting along the cliffs near the falls.',
  ],
  '8': [
    'Walk beneath historic palms and explore tropical plants introduced from around the world.',
    'Look for the famous strangler fig, carved trees and the old helicopter installation.',
    'The cooler Akuapem hills make the gardens popular for walks, picnics and photography.',
  ],
  '9': [
    'See chimpanzees, crocodiles, antelope, reptiles and birds in the centre of Kumasi.',
    'Morning visits are best for active animals and smaller school-trip crowds.',
    'Never feed animals or cross barriers; follow all instructions from keepers.',
  ],
  '10': [
    'See the Great Hall, central monuments, landscaped grounds and major college areas.',
    'KNUST began as Kumasi College of Technology and developed into a leading public university.',
    'Remember that this is an active campus—avoid interrupting lectures, research or student life.',
  ],
  '11': [
    'Admire the whitewashed Sudano-Sahelian form, timber supports and distinctive buttresses.',
    'Hear local accounts of the mosque’s founding and the sacred Qur’an associated with Larabanga.',
    'Exterior visits should avoid prayer periods; entry is restricted and modest dress is expected.',
  ],
  '12': [
    'Explore royal regalia, photographs, drums, palanquins and life-size figures of Asante rulers.',
    'The 1925 building was the residence of Asantehene Prempeh I and became a museum in 1995.',
    'Guided presentations explain Asante royal lineage, resistance, rituals and gold craftsmanship.',
  ],
  '13': [
    'See the twin “male” and “female” falls, which are strongest during the rainy season.',
    'Extend the visit with a guided hike to Umbrella Rock and the three-headed palm tree.',
    'The descent includes many steps and slippery sections, so wear supportive footwear.',
  ],
};

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
  const [showFullDetails, setShowFullDetails] = useState(false);

  // Find the site by id; fall back to the first site
  const site = sites.find((s) => s.id === id) ?? sites[0];
  const saved = wishlist.includes(site.id);
  const hours = destinationHours[site.id] ?? {
    open: '8:00 AM',
    close: '5:00 PM',
    note: 'Confirm before visiting',
  };
  const highlights = destinationHighlights[site.id] ?? [];

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
        <TouchableOpacity
          style={styles.photoCredit}
          onPress={() => Linking.openURL(site.imageSource)}
          accessibilityRole="link"
          accessibilityLabel={`Photo source: ${site.imageCredit}`}
        >
          <Ionicons name="camera-outline" size={13} color={Colors.slate} />
          <Text style={styles.photoCreditText}>Photo: {site.imageCredit}</Text>
          <Ionicons name="open-outline" size={12} color={Colors.slate} />
        </TouchableOpacity>

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

        <View style={styles.hoursCard}>
          <View style={styles.hoursIcon}>
            <Ionicons name="time" size={20} color={Colors.white} />
          </View>
          <View style={styles.hoursItem}>
            <Text style={styles.hoursLabel}>OPENS</Text>
            <Text style={styles.hoursValue}>{hours.open}</Text>
          </View>
          <View style={styles.hoursDivider} />
          <View style={styles.hoursItem}>
            <Text style={styles.hoursLabel}>CLOSES</Text>
            <Text style={styles.hoursValue}>{hours.close}</Text>
          </View>
          <Text style={styles.hoursNote}>{hours.note}</Text>
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
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.82}
          onPress={() => setShowFullDetails((current) => !current)}
          accessibilityRole="button"
          accessibilityState={{ expanded: showFullDetails }}
          accessibilityLabel={`${showFullDetails ? 'Hide' : 'Show'} more details about ${site.name}`}
        >
          <View style={styles.cardTitleRow}>
            <Ionicons name="information-circle-outline" size={17} color={Colors.ink} />
            <Text style={styles.cardTitle}>About this site</Text>
          </View>
          <Text style={styles.cardText} numberOfLines={showFullDetails ? undefined : 2}>
            {site.description}
          </Text>
          {showFullDetails && highlights.length > 0 ? (
            <View style={styles.highlights}>
              <Text style={styles.highlightsTitle}>What to know</Text>
              {highlights.map((highlight) => (
                <View key={highlight} style={styles.highlightRow}>
                  <View style={styles.highlightDot} />
                  <Text style={styles.highlightText}>{highlight}</Text>
                </View>
              ))}
            </View>
          ) : null}
          <View style={styles.moreDetailsRow}>
            <Text style={styles.moreDetailsText}>
              {showFullDetails ? 'Show less' : 'More details'}
            </Text>
            <Ionicons
              name={showFullDetails ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={Colors.forest}
            />
          </View>
        </TouchableOpacity>

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
  photoCredit: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: -7,
    marginBottom: 14,
  },
  photoCreditText: { color: Colors.slate, fontSize: 10, fontWeight: '600' },
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
  hoursCard: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.forestDark,
    borderRadius: Radius.lg,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    ...Shadow.card,
  },
  hoursIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: Colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hoursItem: { gap: 2 },
  hoursLabel: {
    color: Colors.sage,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  hoursValue: { color: Colors.white, fontSize: 13, fontWeight: '800' },
  hoursDivider: { width: 1, height: 34, backgroundColor: 'rgba(255,255,255,0.18)' },
  hoursNote: {
    flex: 1,
    color: Colors.gold,
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 14,
    textAlign: 'right',
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
  moreDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
  },
  moreDetailsText: { color: Colors.forest, fontSize: 12, fontWeight: '800' },
  highlights: {
    marginTop: 14,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    gap: 9,
  },
  highlightsTitle: { color: Colors.ink, fontSize: 13, fontWeight: '800' },
  highlightRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  highlightDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gold,
    marginTop: 7,
  },
  highlightText: { flex: 1, color: Colors.slate, fontSize: 13, lineHeight: 19 },
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
