import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { Chip, EmptyState, SearchBar } from '@/components';
import { categories, regions, sites, festivals, culturalRegions, Site } from '@/data/mockData';

export default function Explore() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const filteredSites = sites.filter((site) => {
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      site.name.toLowerCase().includes(query) ||
      site.region.toLowerCase().includes(query) ||
      site.category.toLowerCase().includes(query);
    const matchesCategory = !selectedCategory || site.category === selectedCategory;
    const matchesRegion = !selectedRegion || site.region === selectedRegion;
    return matchesSearch && matchesCategory && matchesRegion;
  });

  const openSite = (site: Site) =>
    router.push({ pathname: '/site-details', params: { id: site.id } });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>DISCOVER</Text>
        <Text style={styles.headerTitle}>Explore Ghana</Text>
        <Text style={styles.headerSubtitle}>Culture, coastlines and unforgettable stories</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search destinations or regions..."
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {categories.filter((category) => category !== 'All').map((category) => (
            <Chip
              key={category}
              label={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>

        <View style={styles.discoveryCards}>
          <TouchableOpacity
            style={styles.discoveryCardWrap}
            activeOpacity={0.9}
            onPress={() => router.push('/festivals')}
          >
            <ImageBackground
              source={{ uri: festivals[0].image }}
              style={styles.discoveryCard}
              imageStyle={styles.discoveryCardImage}
            >
              <View style={styles.discoveryOverlay} />
              <View style={styles.discoveryIcon}>
                <Ionicons name="musical-notes" size={18} color={Colors.forestDark} />
              </View>
              <View>
                <Text style={styles.discoveryTitle}>Festivals & Events</Text>
                <Text style={styles.discoverySubtitle}>Celebrate with Ghana</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.discoveryCardWrap}
            activeOpacity={0.9}
            onPress={() => router.push('/cultural-guide')}
          >
            <ImageBackground
              source={{ uri: culturalRegions[0].image }}
              style={styles.discoveryCard}
              imageStyle={styles.discoveryCardImage}
            >
              <View style={styles.discoveryOverlay} />
              <View style={styles.discoveryIcon}>
                <Ionicons name="people" size={18} color={Colors.forestDark} />
              </View>
              <View>
                <Text style={styles.discoveryTitle}>Cultural Guide</Text>
                <Text style={styles.discoverySubtitle}>Customs by region</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Browse by region</Text>
        <View style={styles.regionsList}>
          {regions.map((region) => {
            const actualSiteCount = sites.filter((site) => site.region === region.name).length;

            return (
            <TouchableOpacity
              key={region.id}
              activeOpacity={0.9}
              accessibilityRole="button"
              accessibilityLabel={`Explore destinations in ${region.name}`}
              onPress={() =>
                setSelectedRegion((current) => current === region.name ? '' : region.name)
              }
            >
              <ImageBackground
                source={{ uri: region.image }}
                style={[
                  styles.regionCard,
                  selectedRegion === region.name && styles.regionCardSelected,
                ]}
                imageStyle={styles.regionImage}
              >
                <View style={styles.regionOverlay} />
                <View style={styles.regionInfo}>
                  <Text style={styles.regionName}>{region.name}</Text>
                  <Text style={styles.regionSites}>
                    {actualSiteCount} {actualSiteCount === 1 ? 'tourist site' : 'tourist sites'}
                  </Text>
                </View>
                <View style={styles.regionArrow}>
                  <Ionicons
                    name={selectedRegion === region.name ? 'checkmark' : 'arrow-forward'}
                    size={18}
                    color={Colors.forestDark}
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            activeOpacity={0.9}
            accessibilityRole="button"
            accessibilityLabel="Show all destinations in Ghana"
            onPress={() => {
              setSelectedRegion('');
              setSelectedCategory('');
              setSearch('');
            }}
          >
            <ImageBackground
              source={{ uri: sites[0].image }}
              style={[
                styles.regionCard,
                !selectedRegion && !selectedCategory && !search && styles.regionCardSelected,
              ]}
              imageStyle={styles.regionImage}
            >
              <View style={styles.regionOverlay} />
              <View style={styles.regionInfo}>
                <Text style={styles.regionName}>All Destinations</Text>
                <Text style={styles.regionSites}>{sites.length} places across Ghana</Text>
              </View>
              <View style={styles.regionArrow}>
                <Ionicons
                  name={!selectedRegion && !selectedCategory && !search ? 'checkmark' : 'grid-outline'}
                  size={18}
                  color={Colors.forestDark}
                />
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={styles.destinationsHeader}>
          <View>
            <Text style={styles.sectionTitleInline}>Destinations</Text>
            <Text style={styles.destinationCount}>
              {filteredSites.length} place{filteredSites.length === 1 ? '' : 's'} to discover
            </Text>
          </View>
          {selectedRegion ? (
            <TouchableOpacity
              style={styles.clearRegion}
              onPress={() => setSelectedRegion('')}
            >
              <Text style={styles.clearRegionText}>Clear region</Text>
              <Ionicons name="close" size={15} color={Colors.forest} />
            </TouchableOpacity>
          ) : null}
        </View>

        {filteredSites.length === 0 ? (
          <EmptyState
            icon="map-outline"
            title="No destinations found"
            message="Try another category, region or search."
          />
        ) : (
          <View style={styles.destinationsList}>
            {filteredSites.map((site) => (
              <TouchableOpacity
                key={site.id}
                style={styles.destinationCard}
                activeOpacity={0.9}
                onPress={() => openSite(site)}
              >
                <Image source={{ uri: site.image }} style={styles.destinationImage} />
                <View style={styles.destinationBody}>
                  <View style={styles.destinationTop}>
                    <Text style={styles.destinationName} numberOfLines={1}>{site.name}</Text>
                    <View style={styles.rating}>
                      <Ionicons name="star" size={13} color={Colors.gold} />
                      <Text style={styles.ratingText}>{site.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.destinationMeta}>
                    <Ionicons name="location-outline" size={14} color={Colors.forest} />
                    <Text style={styles.destinationRegion}>{site.region}</Text>
                  </View>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{site.category}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={19} color={Colors.slate} />
              </TouchableOpacity>
            ))}
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.mist },
  header: { paddingTop: 58, paddingBottom: 8, paddingHorizontal: 20 },
  eyebrow: { fontSize: 11, fontWeight: '800', color: Colors.forest, letterSpacing: 1.1, marginBottom: 3 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: Colors.ink },
  headerSubtitle: { fontSize: 13, color: Colors.slate, marginTop: 4 },
  scrollContent: { paddingBottom: 108 },
  categoriesRow: { paddingHorizontal: 16, gap: 8, paddingTop: 4 },
  discoveryCards: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 18,
  },
  discoveryCardWrap: { flex: 1 },
  discoveryCard: {
    height: 144,
    padding: 14,
    justifyContent: 'space-between',
  },
  discoveryCardImage: { borderRadius: Radius.lg },
  discoveryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 29, 19, 0.52)',
    borderRadius: Radius.lg,
  },
  discoveryIcon: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discoveryTitle: { color: Colors.white, fontSize: 15, fontWeight: '800', lineHeight: 19 },
  discoverySubtitle: { color: Colors.gold, fontSize: 10, fontWeight: '700', marginTop: 3 },
  sectionTitle: { fontSize: 19, fontWeight: '800', color: Colors.ink, marginHorizontal: 16, marginTop: 24, marginBottom: 14 },
  regionsList: { paddingHorizontal: 16, gap: 12 },
  regionCard: { height: 156, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', padding: 18 },
  regionCardSelected: { borderWidth: 3, borderColor: Colors.gold, borderRadius: Radius.lg },
  regionImage: { borderRadius: Radius.lg },
  regionOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: Colors.overlay, borderRadius: Radius.lg },
  regionInfo: {},
  regionName: { fontSize: 20, fontWeight: '800', color: Colors.white, marginBottom: 3 },
  regionSites: { fontSize: 12, color: Colors.gold, fontWeight: '600' },
  regionArrow: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.gold, alignItems: 'center', justifyContent: 'center' },
  destinationsHeader: {
    marginTop: 28, marginBottom: 14, paddingHorizontal: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  sectionTitleInline: { fontSize: 21, fontWeight: '800', color: Colors.ink },
  destinationCount: { fontSize: 12, color: Colors.slate, marginTop: 3 },
  clearRegion: {
    flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.forestSoft,
    borderRadius: Radius.pill, paddingVertical: 7, paddingHorizontal: 10,
  },
  clearRegionText: { color: Colors.forest, fontSize: 11, fontWeight: '800' },
  destinationsList: { paddingHorizontal: 16, gap: 12 },
  destinationCard: {
    minHeight: 116, backgroundColor: Colors.white, borderRadius: Radius.lg,
    flexDirection: 'row', alignItems: 'center', padding: 10, gap: 12,
    borderWidth: 1, borderColor: Colors.line, ...Shadow.card,
  },
  destinationImage: { width: 102, height: 96, borderRadius: Radius.md, backgroundColor: Colors.line },
  destinationBody: { flex: 1 },
  destinationTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  destinationName: { flex: 1, fontSize: 15, fontWeight: '800', color: Colors.ink },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: 12, fontWeight: '800', color: Colors.ink },
  destinationMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 7 },
  destinationRegion: { fontSize: 12, color: Colors.slate },
  categoryBadge: {
    alignSelf: 'flex-start', marginTop: 9, backgroundColor: Colors.forestSoft,
    paddingVertical: 4, paddingHorizontal: 9, borderRadius: Radius.pill,
  },
  categoryBadgeText: { color: Colors.forest, fontSize: 10, fontWeight: '800' },
});
