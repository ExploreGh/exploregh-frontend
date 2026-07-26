import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { EmptyState, KenteStrip } from '@/components';
import { sites } from '@/data/mockData';
import { useWishlist } from '@/context/WishlistContext';

export default function Wishlist() {
  const router = useRouter();
  const { wishlist, removeFromWishlist } = useWishlist();
  const savedSites = wishlist.flatMap((id) => {
    const site = sites.find((item) => item.id === id);
    return site ? [site] : [];
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.title}>Saved destinations</Text>
            <Text style={styles.subtitle}>
              {savedSites.length} place{savedSites.length === 1 ? '' : 's'} saved for later
            </Text>
          </View>
        </View>
      </View>
      <KenteStrip />

      {savedSites.length === 0 ? (
        <View style={styles.emptyContent}>
          <EmptyState
            icon="heart-outline"
            title="No saved destinations"
            message="Tap the heart on a destination to keep it here for later."
          />
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => router.replace('/(tabs)/home')}
          >
            <Ionicons name="compass-outline" size={18} color={Colors.white} />
            <Text style={styles.exploreButtonText}>Explore destinations</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          {savedSites.map((site) => (
            <TouchableOpacity
              key={site.id}
              style={styles.siteCard}
              activeOpacity={0.9}
              onPress={() =>
                router.push({ pathname: '/site-details', params: { id: site.id } })
              }
            >
              <Image source={{ uri: site.image }} style={styles.siteImage} />
              <View style={styles.siteInfo}>
                <Text style={styles.siteName}>{site.name}</Text>
                <View style={styles.siteMeta}>
                  <Ionicons name="location-outline" size={13} color={Colors.slate} />
                  <Text style={styles.siteRegion}>{site.region}</Text>
                </View>
                <View style={styles.siteBottom}>
                  <View style={styles.categoryTag}>
                    <Text style={styles.categoryTagText}>{site.category}</Text>
                  </View>
                  <View style={styles.rating}>
                    <Ionicons name="star" size={13} color={Colors.gold} />
                    <Text style={styles.ratingText}>{site.rating}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={(event) => {
                  event.stopPropagation();
                  removeFromWishlist(site.id);
                }}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${site.name} from saved destinations`}
              >
                <Ionicons name="heart" size={21} color={Colors.red} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mist,
  },
  header: {
    backgroundColor: Colors.forest,
    paddingTop: 58,
    paddingBottom: 18,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.gold,
  },
  subtitle: {
    marginTop: 3,
    fontSize: 12,
    color: Colors.white,
    opacity: 0.9,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  exploreButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: Radius.pill,
    backgroundColor: Colors.forest,
  },
  exploreButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  list: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  siteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
  siteImage: {
    width: 74,
    height: 74,
    borderRadius: Radius.md,
    marginRight: 12,
    backgroundColor: Colors.mist,
  },
  siteInfo: {
    flex: 1,
  },
  siteName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 3,
  },
  siteMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 8,
  },
  siteRegion: {
    fontSize: 12,
    color: Colors.slate,
  },
  siteBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categoryTag: {
    backgroundColor: Colors.forestSoft,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: Radius.pill,
  },
  categoryTagText: {
    color: Colors.forest,
    fontSize: 11,
    fontWeight: '700',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.ink,
  },
  removeButton: {
    padding: 8,
  },
});
