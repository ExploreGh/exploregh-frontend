import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import {useRouter} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { SearchBar, EmptyState, KenteStrip } from '@/components';
import { guides } from '@/data/mockData';

// ============================================================
// Guides — verified tour guides with real portrait photos,
// availability filter, and detail rows using icons.
// ============================================================

export default function Guides() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filteredGuides = guides.filter((guide) => {
    const q = search.toLowerCase();
    const matchesSearch =
      guide.name.toLowerCase().includes(q) ||
      guide.specialization.toLowerCase().includes(q) ||
      guide.regions.toLowerCase().includes(q) ||
      guide.languages.toLowerCase().includes(q);
    const matchesAvailability = showAvailableOnly ? guide.available : true;
    return matchesSearch && matchesAvailability;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tour Guides</Text>
        <Text style={styles.headerSubtitle}>Verified local experts across Ghana</Text>
      </View>
      <KenteStrip />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search by name, region or specialty..."
        />

        {/* Filter row */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterButton, showAvailableOnly && styles.filterButtonActive]}
            onPress={() => setShowAvailableOnly(!showAvailableOnly)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={showAvailableOnly ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={16}
              color={showAvailableOnly ? Colors.gold : Colors.forest}
            />
            <Text style={[styles.filterText, showAvailableOnly && styles.filterTextActive]}>
              Available only
            </Text>
          </TouchableOpacity>
          <Text style={styles.count}>
            {filteredGuides.length} guide{filteredGuides.length !== 1 ? 's' : ''} found
          </Text>
        </View>

        {/* Verified banner */}
        <View style={styles.banner}>
          <Ionicons name="shield-checkmark" size={18} color={Colors.forest} />
          <Text style={styles.bannerText}>
            All guides are verified and certified by ExploreGH before appearing here.
          </Text>
        </View>

        {filteredGuides.length === 0 ? (
          <EmptyState
            icon="people-outline"
            title="No guides found"
            message="Try a different name, region or specialty."
          />
        ) : (
          <View style={styles.list}>
            {filteredGuides.map((guide) => (
              <View key={guide.id} style={styles.card}>
                <View style={styles.cardTop}>
                  <Image source={{ uri: guide.photo }} style={styles.photo} />
                  <View style={styles.headerInfo}>
                    <View style={styles.nameRow}>
                      <Text style={styles.guideName}>{guide.name}</Text>
                      <Ionicons name="checkmark-circle" size={15} color={Colors.forest} />
                    </View>
                    <Text style={styles.specialization}>{guide.specialization}</Text>
                    <View style={styles.ratingRow}>
                      <Ionicons name="star" size={13} color={Colors.gold} />
                      <Text style={styles.ratingText}>{guide.rating}</Text>
                      <Text style={styles.reviewsText}>({guide.reviews} reviews)</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.availabilityBadge,
                      { backgroundColor: guide.available ? Colors.forest : Colors.slate },
                    ]}
                  >
                    <Text style={styles.availabilityText}>
                      {guide.available ? 'Available' : 'Busy'}
                    </Text>
                  </View>
                </View>

                <View style={styles.details}>
                  <View style={styles.detailRow}>
                    <Ionicons name="map-outline" size={14} color={Colors.slate} />
                    <Text style={styles.detailText}>{guide.regions}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="chatbubbles-outline" size={14} color={Colors.slate} />
                    <Text style={styles.detailText}>{guide.languages}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="time-outline" size={14} color={Colors.slate} />
                    <Text style={styles.detailText}>{guide.experience} experience</Text>
                  </View>
                </View>

                <View style={styles.cardBottom}>
                  <View style={styles.priceRow}>
                    <Ionicons name="cash-outline" size={15} color={Colors.forest} />
                    <Text style={styles.priceText}>{guide.price}</Text>
                  </View>
                  <TouchableOpacity
  style={[styles.bookButton, { backgroundColor: guide.available ? Colors.forest : Colors.line }]}
  disabled={!guide.available}
  activeOpacity={0.85}
  onPress={() =>
    router.push({
      pathname: '/booking',
      params: { name: guide.name, photo: guide.photo, price: guide.price },
    })
  }
>
  <Text style={[styles.bookText, { color: guide.available ? Colors.gold : Colors.slate }]}>
    {guide.available ? 'Book now' : 'Unavailable'}
  </Text>
</TouchableOpacity>
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
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 14,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.forest,
  },
  filterButtonActive: {
    backgroundColor: Colors.forest,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.forest,
  },
  filterTextActive: {
    color: Colors.gold,
  },
  count: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.slate,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.forestSoft,
    padding: 13,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: Radius.md,
  },
  bannerText: {
    flex: 1,
    fontSize: 13,
    color: Colors.forestDark,
    lineHeight: 18,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 14,
    gap: 14,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  photo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.mist,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  headerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2,
  },
  guideName: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.ink,
  },
  specialization: {
    fontSize: 13,
    color: Colors.slate,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.ink,
  },
  reviewsText: {
    fontSize: 12,
    color: Colors.slate,
  },
  availabilityBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Radius.pill,
  },
  availabilityText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '800',
  },
  details: {
    backgroundColor: Colors.mist,
    borderRadius: Radius.md,
    padding: 12,
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    flex: 1,
    fontSize: 13,
    color: Colors.slate,
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
    fontSize: 14,
    fontWeight: '800',
    color: Colors.forest,
  },
  bookButton: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: Radius.pill,
  },
  bookText: {
    fontWeight: '800',
    fontSize: 13,
  },
});
