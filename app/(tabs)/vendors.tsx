import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const categories = ['All', 'Food', 'Crafts', 'Culture', 'Fashion'];

const vendors = [
  {
    id: '1',
    name: 'Akosua Kente Weaves',
    category: 'Crafts',
    location: 'Bonwire, Ashanti',
    rating: '4.9',
    reviews: 128,
    description: 'Authentic handwoven kente cloth directly from the source.',
    emoji: '🧵',
    price: 'GHS 150 — 800',
  },
  {
    id: '2',
    name: 'Mama Ama\'s Kitchen',
    category: 'Food',
    location: 'Cape Coast',
    rating: '4.8',
    reviews: 94,
    description: 'Authentic Ghanaian cuisine. Famous fufu, light soup, and grilled tilapia.',
    emoji: '🍲',
    price: 'GHS 25 — 80',
  },
  {
    id: '3',
    name: 'Vume Pottery Studio',
    category: 'Crafts',
    location: 'Vume, Volta Region',
    rating: '4.7',
    reviews: 56,
    description: 'Traditional pottery making demonstrations and handmade ceramic souvenirs.',
    emoji: '🏺',
    price: 'GHS 50 — 300',
  },
  {
    id: '4',
    name: 'Kojo\'s Drumming Experience',
    category: 'Culture',
    location: 'Accra',
    rating: '5.0',
    reviews: 203,
    description: 'Learn traditional Ghanaian drumming from a master drummer.',
    emoji: '🥁',
    price: 'GHS 100 per session',
  },
  {
    id: '5',
    name: 'Abena African Fashion',
    category: 'Fashion',
    location: 'Kumasi',
    rating: '4.6',
    reviews: 77,
    description: 'Beautiful African print dresses, shirts and accessories.',
    emoji: '👗',
    price: 'GHS 120 — 500',
  },
  {
    id: '6',
    name: 'Kofi\'s Fresh Coconuts',
    category: 'Food',
    location: 'Labadi Beach, Accra',
    rating: '4.9',
    reviews: 312,
    description: 'Fresh coconuts, tropical fruits and local snacks right on the beach.',
    emoji: '🥥',
    price: 'GHS 5 — 20',
  },
];

export default function Vendors() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(search.toLowerCase()) ||
      vendor.location.toLowerCase().includes(search.toLowerCase()) ||
      vendor.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || vendor.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vendor Marketplace 🛍️</Text>
        <Text style={styles.headerSubtitle}>Support local Ghanaian businesses</Text>
      </View>

      <ScrollView>
        {/* Search */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search vendors..."
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

        {/* Results Count */}
        {search || selectedCategory !== 'All' ? (
          <Text style={styles.resultsText}>
            {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
            {search ? ` for "${search}"` : ''}
          </Text>
        ) : null}

        {/* Vendors */}
        <View style={styles.vendorsList}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' && !search ? `${vendors.length} Vendors Found` : 'Results'}
          </Text>

          {/* Empty State */}
          {filteredVendors.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyTitle}>No vendors found</Text>
              <Text style={styles.emptyText}>Try a different category or search term</Text>
            </View>
          ) : (
            filteredVendors.map((vendor) => (
              <TouchableOpacity key={vendor.id} style={styles.vendorCard}>
                <View style={styles.vendorTop}>
                  <View style={styles.vendorEmoji}>
                    <Text style={styles.vendorEmojiText}>{vendor.emoji}</Text>
                  </View>
                  <View style={styles.vendorHeader}>
                    <Text style={styles.vendorName}>{vendor.name}</Text>
                    <Text style={styles.vendorLocation}>📍 {vendor.location}</Text>
                    <Text style={styles.vendorRating}>⭐ {vendor.rating} ({vendor.reviews} reviews)</Text>
                  </View>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{vendor.category}</Text>
                  </View>
                </View>
                <Text style={styles.vendorDescription}>{vendor.description}</Text>
                <View style={styles.vendorBottom}>
                  <Text style={styles.vendorPrice}>💰 {vendor.price}</Text>
                  <TouchableOpacity style={styles.contactButton}>
                    <Text style={styles.contactButtonText}>Message</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FCD20F',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
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
  resultsText: {
    fontSize: 13,
    color: '#006B3F',
    marginHorizontal: 16,
    marginTop: 4,
    fontWeight: 'bold',
  },
  vendorsList: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginTop: 8,
  },
  vendorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  vendorTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 10,
  },
  vendorEmoji: {
    width: 50,
    height: 50,
    backgroundColor: '#e8f5e9',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vendorEmojiText: {
    fontSize: 24,
  },
  vendorHeader: {
    flex: 1,
  },
  vendorName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  vendorLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  vendorRating: {
    fontSize: 12,
    color: '#333',
  },
  categoryBadge: {
    backgroundColor: '#e8f5e9',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  categoryBadgeText: {
    color: '#006B3F',
    fontSize: 11,
    fontWeight: 'bold',
  },
  vendorDescription: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  vendorBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vendorPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  contactButton: {
    backgroundColor: '#006B3F',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  contactButtonText: {
    color: '#FCD20F',
    fontWeight: 'bold',
    fontSize: 13,
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