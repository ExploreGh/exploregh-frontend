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
import { Colors, Radius } from '@/constants/theme';
import { regions, sites, festivals } from '@/data/mockData';

const exploreCategories: {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { id: '1', name: 'History', icon: 'business-outline' },
  { id: '2', name: 'Nature', icon: 'leaf-outline' },
  { id: '3', name: 'Beach', icon: 'water-outline' },
  { id: '4', name: 'Culture', icon: 'color-palette-outline' },
  { id: '5', name: 'Wildlife', icon: 'paw-outline' },
  { id: '6', name: 'Education', icon: 'school-outline' },
  { id: '7', name: 'Festivals', icon: 'musical-notes-outline' },
];

export default function Explore() {
  const router = useRouter();

  const getCount = (categoryName: string) => {
    if (categoryName === 'Festivals') return festivals.length;
    return sites.filter((s) => s.category === categoryName).length;
  };

  const openCategory = (categoryName: string) => {
    if (categoryName === 'Festivals') {
      router.push('/festivals');
      return;
    }
    router.push({
      pathname: '/(tabs)/home',
      params: { category: categoryName },
    });
  };

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
        <Text style={styles.sectionTitle}>Browse by category</Text>
        <View style={styles.grid}>
          {exploreCategories.map((cat) => {
            const count = getCount(cat.name);
            return (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryCard}
                activeOpacity={0.85}
                onPress={() => openCategory(cat.name)}
              >
                <View style={styles.categoryIcon}>
                  <Ionicons name={cat.icon} size={24} color={Colors.forest} />
                </View>
                <Text style={styles.categoryName}>{cat.name}</Text>
                <Text style={styles.categoryCount}>
                  {count} {count === 1 ? 'place' : 'places'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Browse by region</Text>
        <View style={styles.regionsList}>
          {regions.map((region) => (
            <TouchableOpacity
              key={region.id}
              activeOpacity={0.9}
              accessibilityRole="button"
              accessibilityLabel={`Explore destinations in ${region.name}`}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/home',
                  params: { region: region.name },
                })
              }
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
  sectionTitle: { fontSize: 19, fontWeight: '800', color: Colors.ink, marginHorizontal: 16, marginTop: 24, marginBottom: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 10 },
  categoryCard: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, paddingVertical: 17, alignItems: 'center',
    width: '31%', borderWidth: 1, borderColor: Colors.line,
  },
  categoryIcon: {
    width: 48, height: 48, borderRadius: 17, backgroundColor: Colors.forestSoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  categoryName: { fontSize: 13, fontWeight: '800', color: Colors.ink, marginBottom: 2 },
  categoryCount: { fontSize: 11, color: Colors.slate },
  regionsList: { paddingHorizontal: 16, gap: 12 },
  regionCard: { height: 156, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', padding: 18 },
  regionImage: { borderRadius: Radius.lg },
  regionOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: Colors.overlay, borderRadius: Radius.lg },
  regionInfo: {},
  regionName: { fontSize: 20, fontWeight: '800', color: Colors.white, marginBottom: 3 },
  regionSites: { fontSize: 12, color: Colors.gold, fontWeight: '600' },
  regionArrow: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.gold, alignItems: 'center', justifyContent: 'center' },
});
