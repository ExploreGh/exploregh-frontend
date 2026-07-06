import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { KenteStrip } from '@/components';
import { regions, sites } from '@/data/mockData';

// ============================================================
// Explore — browse by category (icon grid) and by region
// (photo cards). Every tile uses a real image or vector icon.
// ============================================================

const exploreCategories = [
  { id: '1', name: 'History', icon: 'business-outline' as const, count: 24 },
  { id: '2', name: 'Nature', icon: 'leaf-outline' as const, count: 18 },
  { id: '3', name: 'Beaches', icon: 'water-outline' as const, count: 12 },
  { id: '4', name: 'Culture', icon: 'color-palette-outline' as const, count: 31 },
  { id: '5', name: 'Food', icon: 'restaurant-outline' as const, count: 45 },
  { id: '6', name: 'Markets', icon: 'cart-outline' as const, count: 15 },
  { id: '7', name: 'Wildlife', icon: 'paw-outline' as const, count: 8 },
  { id: '8', name: 'Festivals', icon: 'musical-notes-outline' as const, count: 22 },
];

export default function Explore() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Ghana</Text>
        <Text style={styles.headerSubtitle}>Find your next adventure</Text>
      </View>
      <KenteStrip />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories grid */}
        <Text style={styles.sectionTitle}>Browse by category</Text>
        <View style={styles.grid}>
          {exploreCategories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryCard}
              activeOpacity={0.85}
              onPress={() => router.push('/(tabs)/home')}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name={cat.icon} size={24} color={Colors.forest} />
              </View>
              <Text style={styles.categoryName}>{cat.name}</Text>
              <Text style={styles.categoryCount}>{cat.count} places</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Regions with photos */}
        <Text style={styles.sectionTitle}>Browse by region</Text>
        <View style={styles.regionsList}>
          {regions.map((region) => (
            <TouchableOpacity
              key={region.id}
              activeOpacity={0.9}
              onPress={() => router.push('/(tabs)/home')}
            >
              <ImageBackground
                source={{ uri: region.image }}
                style={styles.regionCard}
                imageStyle={styles.regionImage}
              >
                <View style={styles.regionOverlay} />
                <View style={styles.regionInfo}>
                  <Text style={styles.regionName}>{region.name}</Text>
                  <Text style={styles.regionSites}>{region.sitesCount} tourist sites</Text>
                </View>
                <View style={styles.regionArrow}>
                  <Ionicons name="arrow-forward" size={18} color={Colors.forestDark} />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>

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
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.gold,
  },
  headerSubtitle: {
    fontSize: 13,
    color: Colors.white,
    marginTop: 3,
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.ink,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
  },
  categoryCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    paddingVertical: 16,
    alignItems: 'center',
    width: '31%',
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
  categoryIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.forestSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 11,
    color: Colors.slate,
  },
  regionsList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  regionCard: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  regionImage: {
    borderRadius: Radius.lg,
  },
  regionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 32, 19, 0.45)',
    borderRadius: Radius.lg,
  },
  regionInfo: {},
  regionName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 3,
  },
  regionSites: {
    fontSize: 12,
    color: Colors.gold,
    fontWeight: '600',
  },
  regionArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
