import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const categories = [
  { id: '1', name: 'History', emoji: '🏰', count: 24 },
  { id: '2', name: 'Nature', emoji: '🌿', count: 18 },
  { id: '3', name: 'Beaches', emoji: '🏖️', count: 12 },
  { id: '4', name: 'Culture', emoji: '🎭', count: 31 },
  { id: '5', name: 'Food', emoji: '🍲', count: 45 },
  { id: '6', name: 'Markets', emoji: '🛒', count: 15 },
  { id: '7', name: 'Wildlife', emoji: '🐘', count: 8 },
  { id: '8', name: 'Festivals', emoji: '🎉', count: 22 },
];

const regions = [
  { id: '1', name: 'Greater Accra', emoji: '🌆', sites: 34 },
  { id: '2', name: 'Ashanti Region', emoji: '👑', sites: 28 },
  { id: '3', name: 'Central Region', emoji: '🏰', sites: 19 },
  { id: '4', name: 'Volta Region', emoji: '⛰️', sites: 22 },
  { id: '5', name: 'Savannah Region', emoji: '🐘', sites: 11 },
  { id: '6', name: 'Western Region', emoji: '🌊', sites: 16 },
];

export default function Explore() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Ghana 🇬🇭</Text>
        <Text style={styles.headerSubtitle}>Find your next adventure</Text>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Browse by Category</Text>
      <View style={styles.categoriesGrid}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat.id} style={styles.categoryCard} onPress={() => router.push('/site-details')}>
            <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
            <Text style={styles.categoryName}>{cat.name}</Text>
            <Text style={styles.categoryCount}>{cat.count} sites</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Regions */}
      <Text style={styles.sectionTitle}>Browse by Region</Text>
      <View style={styles.regionsList}>
        {regions.map((region) => (
          <TouchableOpacity key={region.id} style={styles.regionCard}>
            <Text style={styles.regionEmoji}>{region.emoji}</Text>
            <View style={styles.regionInfo}>
              <Text style={styles.regionName}>{region.name}</Text>
              <Text style={styles.regionSites}>{region.sites} tourist sites</Text>
            </View>
            <Text style={styles.regionArrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#006B3F',
    padding: 24,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FCD20F',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '47%',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#006B3F',
    fontWeight: 'bold',
  },
  regionsList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 10,
  },
  regionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  regionEmoji: {
    fontSize: 30,
    marginRight: 14,
  },
  regionInfo: {
    flex: 1,
  },
  regionName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  regionSites: {
    fontSize: 13,
    color: '#666',
  },
  regionArrow: {
    fontSize: 18,
    color: '#006B3F',
    fontWeight: 'bold',
  },
});