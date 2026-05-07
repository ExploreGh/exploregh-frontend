import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

const categories = ['All', 'Food', 'Crafts', 'Culture', 'Fashion'];

const vendors = [
  {
    id: '1',
    name: 'Akosua Kente Weaves',
    category: 'Crafts',
    location: 'Bonwire, Ashanti',
    rating: '4.9',
    reviews: 128,
    description: 'Authentic handwoven kente cloth directly from the source. Custom orders available.',
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
    description: 'Authentic Ghanaian cuisine. Try our famous fufu, light soup, and grilled tilapia.',
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
    description: 'Learn traditional Ghanaian drumming from a master drummer. Group sessions available.',
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
    description: 'Beautiful African print dresses, shirts and accessories. Custom tailoring available.',
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

export default function VendorMarketplace() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vendor Marketplace</Text>
        <View />
      </View>

      <ScrollView>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search vendors..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((cat) => (
            <TouchableOpacity key={cat} style={styles.categoryButton}>
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Vendors List */}
        <View style={styles.vendorsList}>
          <Text style={styles.sectionTitle}>{vendors.length} Vendors Found</Text>

          {vendors.map((vendor) => (
            <TouchableOpacity key={vendor.id} style={styles.vendorCard}>

              {/* Top Row */}
              <View style={styles.vendorTop}>
                <View style={styles.vendorEmoji}>
                  <Text style={styles.vendorEmojiText}>{vendor.emoji}</Text>
                </View>
                <View style={styles.vendorHeader}>
                  <Text style={styles.vendorName}>{vendor.name}</Text>
                  <Text style={styles.vendorLocation}>📍 {vendor.location}</Text>
                  <View style={styles.vendorRating}>
                    <Text style={styles.ratingText}>⭐ {vendor.rating}</Text>
                    <Text style={styles.reviewsText}>({vendor.reviews} reviews)</Text>
                  </View>
                </View>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{vendor.category}</Text>
                </View>
              </View>

              {/* Description */}
              <Text style={styles.vendorDescription}>{vendor.description}</Text>

              {/* Price & Contact */}
              <View style={styles.vendorBottom}>
                <Text style={styles.vendorPrice}>💰 {vendor.price}</Text>
                <TouchableOpacity style={styles.contactButton}>
                  <Text style={styles.contactButtonText}>Message</Text>
                </TouchableOpacity>
              </View>

            </TouchableOpacity>
          ))}
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
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FCD20F',
    fontSize: 20,
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
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
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
  vendorsList: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
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
    marginBottom: 4,
  },
  vendorRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewsText: {
    fontSize: 12,
    color: '#999',
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
});