import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { Button, EmptyState } from '@/components';
import { vendors } from '@/data/mockData';

export default function VendorDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const vendorId = Array.isArray(id) ? id[0] : id;
  const vendor = vendors.find((item) => item.id === vendorId);

  if (!vendor) {
    return (
      <View style={styles.emptyContainer}>
        <TouchableOpacity style={styles.emptyBackButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={Colors.forestDark} />
        </TouchableOpacity>
        <EmptyState
          icon="storefront-outline"
          title="Vendor not found"
          message="This vendor may no longer be available. Please return to the marketplace."
        />
        <View style={styles.emptyAction}>
          <Button title="Browse vendors" icon="storefront-outline" onPress={() => router.replace('/(tabs)/vendors')} />
        </View>
      </View>
    );
  }

  const openChat = () => {
    router.push({
      pathname: '/chat',
      params: {
        name: vendor.name,
        photo: vendor.image,
        role: 'Vendor',
        context: vendor.category,
        price: vendor.price,
      },
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground source={{ uri: vendor.image }} style={styles.hero}>
        <View style={styles.heroOverlay} />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={Colors.white} />
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{vendor.category}</Text>
          </View>
          <Text style={styles.vendorName}>{vendor.name}</Text>
          <View style={styles.heroMeta}>
            <Ionicons name="location-sharp" size={14} color={Colors.gold} />
            <Text style={styles.heroLocation}>{vendor.location}, Ghana</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.ratingCard}>
          <View style={styles.ratingLeft}>
            <Ionicons name="star" size={18} color={Colors.gold} />
            <Text style={styles.ratingValue}>{vendor.rating}</Text>
            <Text style={styles.ratingReviews}>({vendor.reviews.toLocaleString()} reviews)</Text>
          </View>
          <View style={styles.priceBadge}>
            <Ionicons name="cash-outline" size={14} color={Colors.forest} />
            <Text style={styles.priceText}>{vendor.price}</Text>
          </View>
        </View>

        <View style={styles.verifiedCard}>
          <Ionicons name="shield-checkmark" size={20} color={Colors.forest} />
          <View style={styles.verifiedContent}>
            <Text style={styles.verifiedTitle}>Verified local business</Text>
            <Text style={styles.verifiedText}>Reviewed by ExploreGH before appearing in the marketplace.</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="information-circle-outline" size={18} color={Colors.ink} />
            <Text style={styles.cardTitle}>About this vendor</Text>
          </View>
          <Text style={styles.cardText}>{vendor.description}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="pricetag-outline" size={18} color={Colors.forest} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Category</Text>
              <Text style={styles.detailValue}>{vendor.category}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="location-outline" size={18} color={Colors.forest} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{vendor.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <Button title="Message vendor" icon="chatbubble-ellipses-outline" onPress={openChat} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.mist },
  emptyContainer: { flex: 1, backgroundColor: Colors.mist, paddingTop: 54 },
  emptyBackButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center', marginLeft: 16, ...Shadow.card,
  },
  emptyAction: { paddingHorizontal: 24, marginTop: 12 },
  hero: { height: 300, justifyContent: 'flex-end' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(6, 32, 19, 0.45)' },
  backButton: {
    position: 'absolute', top: 54, left: 16, width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center',
  },
  heroContent: { padding: 20 },
  categoryBadge: {
    alignSelf: 'flex-start', backgroundColor: Colors.gold, paddingVertical: 4,
    paddingHorizontal: 12, borderRadius: Radius.pill, marginBottom: 8,
  },
  categoryBadgeText: {
    color: Colors.forestDark, fontWeight: '800', fontSize: 11,
    textTransform: 'uppercase', letterSpacing: 0.5,
  },
  vendorName: { fontSize: 28, fontWeight: '800', color: Colors.white, marginBottom: 6 },
  heroMeta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  heroLocation: { fontSize: 14, color: Colors.white, opacity: 0.95 },
  content: { padding: 16 },
  ratingCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: 14,
    marginBottom: 14, borderWidth: 1, borderColor: Colors.line, ...Shadow.card,
  },
  ratingLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ratingValue: { fontSize: 17, fontWeight: '800', color: Colors.ink },
  ratingReviews: { fontSize: 13, color: Colors.slate },
  priceBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: Colors.forestSoft,
    paddingVertical: 6, paddingHorizontal: 10, borderRadius: Radius.pill, maxWidth: 170,
  },
  priceText: { fontSize: 11, fontWeight: '700', color: Colors.forest },
  verifiedCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.forestSoft,
    borderRadius: Radius.lg, padding: 14, marginBottom: 14,
  },
  verifiedContent: { flex: 1 },
  verifiedTitle: { fontSize: 14, fontWeight: '800', color: Colors.forestDark, marginBottom: 2 },
  verifiedText: { fontSize: 12, lineHeight: 17, color: Colors.forestDark },
  card: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: 16,
    marginBottom: 14, borderWidth: 1, borderColor: Colors.line, ...Shadow.card,
  },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: Colors.ink },
  cardText: { fontSize: 14, lineHeight: 21, color: Colors.slate },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  detailIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.forestSoft,
    alignItems: 'center', justifyContent: 'center',
  },
  detailLabel: { fontSize: 11, fontWeight: '700', color: Colors.slate, marginBottom: 2 },
  detailValue: { fontSize: 14, fontWeight: '800', color: Colors.ink },
  divider: { height: 1, backgroundColor: Colors.line, marginVertical: 12 },
  actions: { marginBottom: 32 },
});
