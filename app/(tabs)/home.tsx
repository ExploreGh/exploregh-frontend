import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

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
  const [search, setSearch] = useState('');

  const filteredSites = sites.filter(site =>
    site.name.toLowerCase().includes(search.toLowerCase()) ||
    site.region.toLowerCase().includes(search.toLowerCase()) ||
    site.category.toLowerCase().includes(search.toLowerCase())
  );

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
          value={search}
          onChangeText={setSearch}
        />
        {search ? (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Results Count */}
      {search ? (
        <Text style={styles.resultsText}>
          {filteredSites.length} result{filteredSites.length !== 1 ? 's' : ''} for "{search}"
        </Text>
      ) : null}

      {/* Featured Sites */}
      <Text style={styles.sectionTitle}>
        {search ? 'Search Results' : 'Featured Sites'}
      </Text>

      {/* Empty State */}
      {filteredSites.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🔍</Text>
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptyText}>Try searching for a different destination or region</Text>
        </View>
      ) : (
        <View style={styles.sitesContainer}>
          {filteredSites.map((site) => (
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
      )}

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
  clearText: {
    fontSize: 16,
    color: '#999',
    paddingLeft: 8,
  },
  resultsText: {
    fontSize: 13,
    color: '#006B3F',
    marginHorizontal: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});