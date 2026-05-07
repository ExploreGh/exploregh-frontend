import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const categories = ['All', 'Nature', 'History', 'Food', 'Culture'];

const sites = [
  { id: '1', name: 'Cape Coast Castle', region: 'Central Region', category: 'History', emoji: '🏰' },
  { id: '2', name: 'Kakum National Park', region: 'Central Region', category: 'Nature', emoji: '🌿' },
  { id: '3', name: 'Labadi Beach', region: 'Greater Accra', category: 'Nature', emoji: '🏖️' },
  { id: '4', name: 'Kejetia Market', region: 'Ashanti Region', category: 'Culture', emoji: '🛍️' },
  { id: '5', name: 'Mole National Park', region: 'Savannah Region', category: 'Nature', emoji: '🐘' },
  { id: '6', name: 'Elmina Castle', region: 'Central Region', category: 'History', emoji: '🏯' },
];

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Explorer! 👋</Text>
          <Text style={styles.subGreeting}>Where are you going today?</Text>
        </View>
        <Text style={styles.avatar}>🌍</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations..."
          placeholderTextColor="#999"
        />
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured Sites */}
      <Text style={styles.sectionTitle}>Featured Sites</Text>
      <View style={styles.sitesContainer}>
        {sites.map((site) => (
          <TouchableOpacity key={site.id} style={styles.siteCard} onPress={() => router.push('/site-details')}>
            <Text style={styles.siteEmoji}>{site.emoji}</Text>
            <View style={styles.siteInfo}>
              <Text style={styles.siteName}>{site.name}</Text>
              <Text style={styles.siteRegion}>📍 {site.region}</Text>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryTagText}>{site.category}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
     {/* Safety Alerts Button */}
      <TouchableOpacity style={styles.safetyButton} onPress={() => router.push('/safety-alerts')}>
        <Text style={styles.safetyButtonText}>⚠️ View Safety Alerts</Text>
      </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FCD20F',
  },
  subGreeting: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 4,
    opacity: 0.9,
  },
  avatar: {
    fontSize: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoryButton: {
    backgroundColor: '#006B3F',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: '#FCD20F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sitesContainer: {
    padding: 16,
    gap: 12,
  },
  siteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  siteEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  siteInfo: {
    flex: 1,
  },
  siteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  siteRegion: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  categoryTag: {
    backgroundColor: '#e8f5e9',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  categoryTagText: {
    color: '#006B3F',
    fontSize: 12,
    fontWeight: 'bold',
  },
  safetyButton: {
    backgroundColor: '#cc0000',
    margin: 16,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  safetyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});