import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const categories = ['All', 'Nature', 'History', 'Culture', 'Beach'];

const sites = [
  {
    id: '1',
    name: 'Cape Coast Castle',
    region: 'Central Region',
    category: 'History',
    emoji: '🏰',
    image: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=400',
  },
  {
    id: '2',
    name: 'Kakum National Park',
    region: 'Central Region',
    category: 'Nature',
    emoji: '🌿',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400',
  },
  {
    id: '3',
    name: 'Labadi Beach',
    region: 'Greater Accra',
    category: 'Beach',
    emoji: '🏖️',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
  },
  {
    id: '4',
    name: 'Kejetia Market',
    region: 'Ashanti Region',
    category: 'Culture',
    emoji: '🛍️',
    image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=400',
  },
  {
    id: '5',
    name: 'Mole National Park',
    region: 'Savannah Region',
    category: 'Nature',
    emoji: '🐘',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400',
  },
  {
    id: '6',
    name: 'Elmina Castle',
    region: 'Central Region',
    category: 'History',
    emoji: '🏯',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400',
  },
];

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredSites = sites.filter(site => {
    const matchesSearch =
      site.name.toLowerCase().includes(search.toLowerCase()) ||
      site.region.toLowerCase().includes(search.toLowerCase()) ||
      site.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || site.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Explorer! 👋</Text>
          <Text style={styles.subGreeting}>Where are you going today?</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.avatar}>🌍</Text>
          {wishlist.length > 0 && (
            <View style={styles.wishlistBadge}>
              <Text style={styles.wishlistBadgeText}>{wishlist.length}</Text>
            </View>
          )}
        </View>
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

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, selectedCategory === cat && styles.categoryButtonActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Wishlist Banner */}
      {wishlist.length > 0 && (
        <View style={styles.wishlistBanner}>
          <Text style={styles.wishlistBannerText}>
            ❤️ You have {wishlist.length} saved site{wishlist.length !== 1 ? 's' : ''} in your wishlist!
          </Text>
        </View>
      )}

      {/* Results Count */}
      {search || selectedCategory !== 'All' ? (
        <Text style={styles.resultsText}>
          {filteredSites.length} result{filteredSites.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          {search ? ` for "${search}"` : ''}
        </Text>
      ) : null}

      {/* Section Title */}
      <Text style={styles.sectionTitle}>
        {selectedCategory === 'All' && !search ? 'Featured Sites' : 'Results'}
      </Text>

      {/* Empty State */}
      {filteredSites.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🔍</Text>
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptyText}>Try a different category or search term</Text>
        </View>
      ) : (
        <View style={styles.sitesContainer}>
          {filteredSites.map((site) => (
            <TouchableOpacity
              key={site.id}
              style={styles.siteCard}
              onPress={() => router.push('/site-details')}
            >
              <Image source={{ uri: site.image }} style={styles.siteImage} />
              <View style={styles.siteInfo}>
                <Text style={styles.siteName}>{site.name}</Text>
                <Text style={styles.siteRegion}>📍 {site.region}</Text>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryTagText}>{site.category}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.heartButton}
                onPress={(e) => {
                  e.stopPropagation();
                  toggleWishlist(site.id);
                }}
              >
                <Text style={styles.heartIcon}>
                  {wishlist.includes(site.id) ? '❤️' : '🤍'}
                </Text>
              </TouchableOpacity>
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
  headerRight: {
    position: 'relative',
  },
  avatar: {
    fontSize: 40,
  },
  wishlistBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#cc0000',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishlistBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
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
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoryButton: {
    backgroundColor: '#e8f5e9',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#006B3F',
  },
  categoryButtonActive: {
    backgroundColor: '#006B3F',
  },
  categoryText: {
    color: '#006B3F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  categoryTextActive: {
    color: '#FCD20F',
  },
  wishlistBanner: {
    backgroundColor: '#fff0f0',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#cc0000',
  },
  wishlistBannerText: {
    fontSize: 13,
    color: '#cc0000',
    fontWeight: 'bold',
  },
  resultsText: {
    fontSize: 13,
    color: '#006B3F',
    marginHorizontal: 16,
    marginTop: 8,
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
  siteImage: {
  width: 70,
  height: 70,
  borderRadius: 12,
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
  heartButton: {
    padding: 8,
  },
  heartIcon: {
    fontSize: 24,
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