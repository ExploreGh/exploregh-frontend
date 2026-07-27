import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { SearchBar, Chip, EmptyState, KenteStrip } from '@/components';
import { sites, categories, Site } from '@/data/mockData';
import { useWishlist } from '@/context/WishlistContext';

// ============================================================
// Home — greeting header, search, category chips, a featured
// horizontal carousel with photo cards, and the full site list.
// ============================================================

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { category, region } = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    typeof category === 'string' ? category : 'All'
  );
  const [selectedRegion, setSelectedRegion] = useState(
    typeof region === 'string' ? region : ''
  );

  useEffect(() => {
    setSelectedCategory(typeof category === 'string' ? category : 'All');
  }, [category]);

  useEffect(() => {
    setSelectedRegion(typeof region === 'string' ? region : '');
  }, [region]);
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
    const matchesCategory = selectedCategory === 'All' || site.category === selectedCategory;
    const matchesRegion = !selectedRegion || site.region === selectedRegion;
    return matchesSearch && matchesCategory && matchesRegion;
  });

  const featured = sites.slice(0, 4);
  const isFiltering = search.length > 0 || selectedCategory !== 'All' || !!selectedRegion;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Akwaaba, Explorer</Text>
            <Text style={styles.subGreeting}>Where are you going today?</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => router.push('/notifications')}
              style={styles.bellButton}
              accessibilityRole="button"
              accessibilityLabel="Open notifications"
            >
              <Ionicons name="notifications-outline" size={24} color={Colors.white} />
              <View style={styles.bellBadge}>
                <Text style={styles.bellBadgeText}>2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/wishlist')}
              style={styles.savedButton}
              accessibilityRole="button"
              accessibilityLabel="Open saved destinations"
            >
              <Ionicons
                name={wishlist.length > 0 ? 'heart' : 'heart-outline'}
                size={23}
                color={Colors.white}
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
      <KenteStrip />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search destinations, regions..."
        />

        {/* Category chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsRow}
          contentContainerStyle={styles.chipsContent}
        >
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              selected={selectedCategory === cat}
              onPress={() => setSelectedCategory(cat)}
            />
          ))}
        </ScrollView>

        {selectedRegion ? (
          <View style={styles.regionFilterRow}>
            <View style={styles.regionFilter}>
              <Ionicons name="location-sharp" size={14} color={Colors.forest} />
              <Text style={styles.regionFilterText}>{selectedRegion}</Text>
              <TouchableOpacity
                onPress={() => setSelectedRegion('')}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={`Clear ${selectedRegion} filter`}
              >
                <Ionicons name="close-circle" size={18} color={Colors.slate} />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {/* Featured carousel — only when not filtering */}
        {!isFiltering && (
          <>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Featured this week</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carousel}
            >
              {featured.map((site) => (
                <TouchableOpacity
                  key={site.id}
                  activeOpacity={0.9}
                  onPress={() => openSite(site)}
                >
                  <ImageBackground
                    source={{ uri: site.image }}
                    style={styles.featureCard}
                    imageStyle={styles.featureImage}
                  >
                    <View style={styles.featureOverlay} />
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
                      <View style={styles.featureBadge}>
                        <Text style={styles.featureBadgeText}>{site.category}</Text>
                      </View>
                      <Text style={styles.featureName}>{site.name}</Text>
                      <View style={styles.featureMeta}>
                        <Ionicons name="location-sharp" size={12} color={Colors.gold} />
                        <Text style={styles.featureRegion}>{site.region}</Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        {/* Results / all sites list */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>
            {isFiltering ? `${filteredSites.length} result${filteredSites.length !== 1 ? 's' : ''}` : 'All destinations'}
          </Text>
        </View>

        {filteredSites.length === 0 ? (
          <EmptyState
            icon="search"
            title="No destinations found"
            message="Try a different category or search term."
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

        <View style={{ height: 24 }} />
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
    backgroundColor: Colors.forest,
    paddingTop: 58,
    paddingBottom: 18,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.gold,
    letterSpacing: 0.3,
  },
  subGreeting: {
    fontSize: 13,
    color: Colors.white,
    marginTop: 3,
    opacity: 0.9,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellButton: {
  width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center',
  backgroundColor: 'rgba(255,255,255,0.15)', position: 'relative', marginRight: 8,
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
    backgroundColor: 'rgba(255,255,255,0.15)',
    position: 'relative',
    marginRight: 8,
  },
  headerLogo: {
    width: 46,
    height: 46,
    backgroundColor: Colors.white,
    borderRadius: 23,
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
    fontSize: 17,
    fontWeight: '800',
    color: Colors.ink,
  },
  carousel: {
    paddingHorizontal: 16,
    gap: 12,
  },
  featureCard: {
    width: 250,
    height: 180,
    justifyContent: 'flex-end',
  },
  featureImage: {
    borderRadius: Radius.lg,
  },
  featureOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 32, 19, 0.38)',
    borderRadius: Radius.lg,
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureInfo: {
    padding: 14,
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
    fontSize: 17,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
  },
  featureMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featureRegion: {
    fontSize: 12,
    color: Colors.white,
    opacity: 0.9,
  },
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
});
