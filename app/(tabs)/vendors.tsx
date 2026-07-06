import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { SearchBar, Chip, EmptyState, KenteStrip } from '@/components';
import { vendors, vendorCategories } from '@/data/mockData';

// ============================================================
// Vendors — marketplace with photo cards, search + category
// filter, ratings with star icons and a message button.
// ============================================================

export default function Vendors() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVendors = vendors.filter((vendor) => {
    const q = search.toLowerCase();
    const matchesSearch =
      vendor.name.toLowerCase().includes(q) ||
      vendor.location.toLowerCase().includes(q) ||
      vendor.category.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === 'All' || vendor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vendor Marketplace</Text>
        <Text style={styles.headerSubtitle}>Support local Ghanaian businesses</Text>
      </View>
      <KenteStrip />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search vendors..." />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsRow}
          contentContainerStyle={styles.chipsContent}
        >
          {vendorCategories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              selected={selectedCategory === cat}
              onPress={() => setSelectedCategory(cat)}
            />
          ))}
        </ScrollView>

        <Text style={styles.count}>
          {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''} found
        </Text>

        {filteredVendors.length === 0 ? (
          <EmptyState
            icon="storefront-outline"
            title="No vendors found"
            message="Try a different category or search term."
          />
        ) : (
          <View style={styles.list}>
            {filteredVendors.map((vendor) => (
              <View key={vendor.id} style={styles.card}>
                <Image source={{ uri: vendor.image }} style={styles.cardImage} />
                <View style={styles.cardBody}>
                  <View style={styles.cardTop}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.vendorName}>{vendor.name}</Text>
                      <View style={styles.metaRow}>
                        <Ionicons name="location-outline" size={13} color={Colors.slate} />
                        <Text style={styles.metaText}>{vendor.location}</Text>
                      </View>
                    </View>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>{vendor.category}</Text>
                    </View>
                  </View>

                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={14} color={Colors.gold} />
                    <Text style={styles.ratingText}>{vendor.rating}</Text>
                    <Text style={styles.reviewsText}>({vendor.reviews} reviews)</Text>
                  </View>

                  <Text style={styles.description}>{vendor.description}</Text>

                  <View style={styles.cardBottom}>
                    <View style={styles.priceRow}>
                      <Ionicons name="cash-outline" size={15} color={Colors.forest} />
                      <Text style={styles.priceText}>{vendor.price}</Text>
                    </View>
                    <TouchableOpacity style={styles.messageButton} activeOpacity={0.85}>
                      <Ionicons name="chatbubble-ellipses-outline" size={15} color={Colors.gold} />
                      <Text style={styles.messageText}>Message</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
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
  chipsRow: {
    marginTop: 14,
  },
  chipsContent: {
    paddingHorizontal: 16,
  },
  count: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.slate,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 16,
    gap: 14,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
  cardImage: {
    width: '100%',
    height: 140,
    backgroundColor: Colors.mist,
  },
  cardBody: {
    padding: 14,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 6,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: 12,
    color: Colors.slate,
  },
  categoryBadge: {
    backgroundColor: Colors.forestSoft,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Radius.pill,
  },
  categoryBadgeText: {
    color: Colors.forest,
    fontSize: 11,
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.ink,
  },
  reviewsText: {
    fontSize: 12,
    color: Colors.slate,
  },
  description: {
    fontSize: 13,
    color: Colors.slate,
    lineHeight: 19,
    marginBottom: 12,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  priceText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.forest,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.forest,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Radius.pill,
  },
  messageText: {
    color: Colors.gold,
    fontWeight: '700',
    fontSize: 13,
  },
});
