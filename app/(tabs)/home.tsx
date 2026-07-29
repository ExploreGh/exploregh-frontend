import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { SearchBar, EmptyState } from '@/components';
import { sites, Site } from '@/data/mockData';
import { useWishlist } from '@/context/WishlistContext';
import { useProfile } from '@/context/ProfileContext';

// ============================================================
// Home — greeting header, search, category chips, a featured
// horizontal carousel with photo cards, and the full site list.
// ============================================================

export default function Home() {
  const router = useRouter();
  const { profile } = useProfile();
  const [search, setSearch] = useState('');
  const carouselX = useRef(new Animated.Value(0)).current;
  const { wishlist, toggleWishlist } = useWishlist();

  const openSite = (site: Site) => {
    router.push({ pathname: '/site-details', params: { id: site.id } });
  };

  const filteredSites = sites.filter((site) => {
    const q = search.toLowerCase();
    const matchesSearch =
      site.name.toLowerCase().includes(q) ||
      site.region.toLowerCase().includes(q) ||
      site.category.toLowerCase().includes(q);
    return matchesSearch;
  });

  const featured = sites.slice(0, 4);
  const popular = sites.slice(4, 8);
  const isFiltering = search.trim().length > 0;
  const cardWidth = Math.min(Dimensions.get('window').width - 58, 330);
  const cardGap = 14;
  const snapInterval = cardWidth + cardGap;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.welcomeLabel}>Akwaaba</Text>
            <Text style={styles.greeting}>{profile.name}</Text>
            <Text style={styles.subGreeting}>Discover somewhere unforgettable</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => router.push('/notifications')}
              style={styles.bellButton}
              accessibilityRole="button"
              accessibilityLabel="Open notifications"
            >
              <Ionicons name="notifications-outline" size={22} color={Colors.forestDark} />
              <View style={styles.bellBadge}>
                <Text style={styles.bellBadgeText}>2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
          onPress={() => router.push('/wishlist' as any)}
              style={styles.savedButton}
              accessibilityRole="button"
              accessibilityLabel="Open saved destinations"
            >
              <Ionicons
                name={wishlist.length > 0 ? 'heart' : 'heart-outline'}
                size={23}
                color={wishlist.length > 0 ? Colors.red : Colors.forestDark}
              />
              {wishlist.length > 0 && (
                <View style={styles.wishlistBadge}>
                  <Text style={styles.wishlistBadgeText}>{wishlist.length}</Text>
                </View>
              )}
            </TouchableOpacity>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search destinations, regions..."
          onFilterPress={() => router.push('/(tabs)/explore')}
        />

        {/* Featured carousel — only when not filtering */}
        {!isFiltering && (
          <>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Popular</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.popularRow}
            >
              {popular.map((site) => (
                <TouchableOpacity
                  key={site.id}
                  style={styles.popularItem}
                  onPress={() => openSite(site)}
                  activeOpacity={0.85}
                >
                  <Image source={{ uri: site.image }} style={styles.popularImage} />
                  <Text style={styles.popularName} numberOfLines={1}>{site.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Recommended</Text>
              <Text style={styles.sectionHint}>For your next trip</Text>
            </View>
            <Animated.ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.carousel,
                { paddingHorizontal: (Dimensions.get('window').width - cardWidth) / 2 },
              ]}
              snapToInterval={snapInterval}
              decelerationRate="fast"
              snapToAlignment="start"
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: carouselX } } }],
                { useNativeDriver: true }
              )}
            >
              {featured.map((site, index) => {
                const inputRange = [
                  (index - 1) * snapInterval,
                  index * snapInterval,
                  (index + 1) * snapInterval,
                ];
                const scale = carouselX.interpolate({
                  inputRange,
                  outputRange: [0.9, 1, 0.9],
                  extrapolate: 'clamp',
                });
                const translateY = carouselX.interpolate({
                  inputRange,
                  outputRange: [12, 0, 12],
                  extrapolate: 'clamp',
                });
                const opacity = carouselX.interpolate({
                  inputRange,
                  outputRange: [0.72, 1, 0.72],
                  extrapolate: 'clamp',
                });

                return (
                  <Animated.View
                    key={site.id}
                    style={{
                      width: cardWidth,
                      opacity,
                      transform: [{ scale }, { translateY }],
                    }}
                  >
                    <TouchableOpacity
                      style={styles.featureCard}
                      activeOpacity={0.9}
                      onPress={() => openSite(site)}
                    >
                    <Image source={{ uri: site.image }} style={styles.featureImage} />
                    <TouchableOpacity
                      style={styles.heartButton}
                      onPress={(event) => {
                        event.stopPropagation();
                        toggleWishlist(site.id);
                      }}
                      hitSlop={8}
                    >
                      <Ionicons
                        name={wishlist.includes(site.id) ? 'heart' : 'heart-outline'}
                        size={20}
                        color={wishlist.includes(site.id) ? Colors.red : Colors.white}
                      />
                    </TouchableOpacity>
                    <View style={styles.featureInfo}>
                      <Text style={styles.featureName}>{site.name}</Text>
                      <View style={styles.featureMeta}>
                        <Ionicons name="location-sharp" size={12} color={Colors.forest} />
                        <Text style={styles.featureRegion}>{site.region}</Text>
                        <View style={styles.featureRating}>
                          <Ionicons name="star" size={12} color={Colors.gold} />
                          <Text style={styles.featureRatingText}>{site.rating}</Text>
                        </View>
                      </View>
                    </View>
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </Animated.ScrollView>
          </>
        )}

        {isFiltering && (
          <>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>
              {`${filteredSites.length} result${filteredSites.length !== 1 ? 's' : ''}`}
            </Text>
          </View>
        {filteredSites.length === 0 ? (
          <EmptyState
            icon="search"
            title="No destinations found"
            message="Try a different destination or region."
          />
        ) : (
          <View style={styles.list}>
            {filteredSites.map((site) => (
              <TouchableOpacity
                key={site.id}
                style={styles.siteCard}
                activeOpacity={0.9}
                onPress={() => openSite(site)}
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
                  style={styles.listHeart}
                  onPress={(event) => {
                        event.stopPropagation();
                        toggleWishlist(site.id);
                      }}
                  hitSlop={8}
                >
                  <Ionicons
                    name={wishlist.includes(site.id) ? 'heart' : 'heart-outline'}
                    size={20}
                    color={wishlist.includes(site.id) ? Colors.red : Colors.slate}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}
          </>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mist,
  },
  header: {
    backgroundColor: Colors.mist,
    paddingTop: 56,
    paddingBottom: 4,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.forest,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  greeting: {
    fontSize: 23,
    fontWeight: '800',
    color: Colors.ink,
  },
  subGreeting: {
    fontSize: 13,
    color: Colors.slate,
    marginTop: 3,
    opacity: 0.9,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellButton: {
  width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center',
  backgroundColor: Colors.white, position: 'relative', marginRight: 8,
  borderWidth: 1, borderColor: Colors.line,
},
bellBadge: {
  position: 'absolute', top: 2, right: 2, backgroundColor: Colors.red, width: 16, height: 16,
  borderRadius: 8, alignItems: 'center', justifyContent: 'center',
},
bellBadgeText: { color: Colors.white, fontSize: 9, fontWeight: '800' },
  savedButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.line,
    position: 'relative',
    marginRight: 8,
  },
  headerLogo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  wishlistBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.red,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  wishlistBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
  chipsRow: {
    marginTop: 14,
  },
  chipsContent: {
    paddingHorizontal: 16,
  },
  regionFilterRow: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  regionFilter: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.forestSoft,
    borderRadius: Radius.pill,
    paddingVertical: 7,
    paddingLeft: 12,
    paddingRight: 8,
    borderWidth: 1,
    borderColor: Colors.forest,
  },
  regionFilterText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.forest,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: Colors.ink,
  },
  seeAll: { color: Colors.forest, fontSize: 12, fontWeight: '800' },
  sectionHint: { color: Colors.slate, fontSize: 11, fontWeight: '600' },
  popularRow: { paddingHorizontal: 16, gap: 12 },
  popularItem: { width: 74, alignItems: 'center' },
  popularImage: {
    width: 62, height: 62, borderRadius: 20, backgroundColor: Colors.line, marginBottom: 7,
  },
  popularName: { width: 74, color: Colors.ink, fontSize: 10, fontWeight: '700', textAlign: 'center' },
  carousel: {
    gap: 14,
    paddingVertical: 14,
  },
  featureCard: {
    width: '100%',
    height: 282,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
  featureImage: {
    width: '100%',
    height: 190,
    backgroundColor: Colors.line,
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.white,
    ...Shadow.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureInfo: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  featureBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.gold,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: Radius.pill,
    marginBottom: 6,
  },
  featureBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.forestDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  featureName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 4,
  },
  featureMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featureRegion: {
    fontSize: 12,
    color: Colors.slate,
  },
  featureRating: {
    marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: Colors.goldSoft, paddingHorizontal: 7, paddingVertical: 4, borderRadius: Radius.pill,
  },
  featureRatingText: { color: Colors.ink, fontSize: 11, fontWeight: '800' },
  list: {
    paddingHorizontal: 16,
    gap: 12,
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
  listHeart: {
    padding: 8,
  },
  scrollContent: { paddingBottom: 108 },
});
