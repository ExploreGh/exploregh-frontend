import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { Button, EmptyState } from '@/components';
import { guides } from '@/data/mockData';

export default function GuideDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const guideId = Array.isArray(id) ? id[0] : id;
  const guide = guides.find((item) => item.id === guideId);

  if (!guide) {
    return (
      <View style={styles.emptyContainer}>
        <TouchableOpacity style={styles.emptyBackButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={Colors.forestDark} />
        </TouchableOpacity>
        <EmptyState
          icon="people-outline"
          title="Guide not found"
          message="This guide may no longer be available. Please return to the guide directory."
        />
        <View style={styles.emptyAction}>
          <Button title="Browse guides" icon="people-outline" onPress={() => router.replace('/(tabs)/guides')} />
        </View>
      </View>
    );
  }

  const openBooking = () => {
    if (!guide.available) return;
    router.push({
      pathname: '/booking',
      params: { name: guide.name, photo: guide.photo, price: guide.price },
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground source={{ uri: guide.photo }} style={styles.hero}>
        <View style={styles.heroOverlay} />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={Colors.white} />
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <View style={[styles.availabilityBadge, { backgroundColor: guide.available ? Colors.forest : Colors.slate }]}>
            <Text style={styles.availabilityText}>{guide.available ? 'Available' : 'Busy'}</Text>
          </View>
          <View style={styles.nameRow}>
            <Text style={styles.guideName}>{guide.name}</Text>
            <Ionicons name="checkmark-circle" size={20} color={Colors.gold} />
          </View>
          <Text style={styles.specialization}>{guide.specialization}</Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.ratingCard}>
          <View style={styles.ratingLeft}>
            <Ionicons name="star" size={18} color={Colors.gold} />
            <Text style={styles.ratingValue}>{guide.rating}</Text>
            <Text style={styles.ratingReviews}>({guide.reviews.toLocaleString()} reviews)</Text>
          </View>
          <View style={styles.priceBadge}>
            <Ionicons name="cash-outline" size={14} color={Colors.forest} />
            <Text style={styles.priceText}>{guide.price}</Text>
          </View>
        </View>

        <View style={styles.verifiedCard}>
          <Ionicons name="shield-checkmark" size={20} color={Colors.forest} />
          <View style={styles.verifiedContent}>
            <Text style={styles.verifiedTitle}>Verified local guide</Text>
            <Text style={styles.verifiedText}>Certified by ExploreGH before appearing in the guide directory.</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Guide information</Text>
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="map-outline" size={18} color={Colors.forest} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Regions covered</Text>
              <Text style={styles.detailValue}>{guide.regions}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="chatbubbles-outline" size={18} color={Colors.forest} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Languages</Text>
              <Text style={styles.detailValue}>{guide.languages}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="time-outline" size={18} color={Colors.forest} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Experience</Text>
              <Text style={styles.detailValue}>{guide.experience}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.bookButton, !guide.available && styles.bookButtonDisabled]}
          activeOpacity={0.85}
          disabled={!guide.available}
          accessibilityRole="button"
          accessibilityLabel={guide.available ? `Book ${guide.name}` : `${guide.name} is unavailable`}
          onPress={openBooking}
        >
          <Ionicons
            name={guide.available ? 'calendar-outline' : 'time-outline'}
            size={18}
            color={guide.available ? Colors.gold : Colors.slate}
          />
          <Text style={[styles.bookText, !guide.available && styles.bookTextDisabled]}>
            {guide.available ? 'Book this guide' : 'Currently unavailable'}
          </Text>
        </TouchableOpacity>
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
  hero: { height: 320, justifyContent: 'flex-end' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(6, 32, 19, 0.46)' },
  backButton: {
    position: 'absolute', top: 54, left: 16, width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center',
  },
  heroContent: { padding: 20 },
  availabilityBadge: {
    alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 12,
    borderRadius: Radius.pill, marginBottom: 8,
  },
  availabilityText: { color: Colors.white, fontSize: 11, fontWeight: '800' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  guideName: { fontSize: 28, fontWeight: '800', color: Colors.white },
  specialization: { fontSize: 14, color: Colors.gold, fontWeight: '700', marginTop: 5 },
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
    paddingVertical: 6, paddingHorizontal: 10, borderRadius: Radius.pill,
  },
  priceText: { fontSize: 12, fontWeight: '700', color: Colors.forest },
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
  sectionTitle: { fontSize: 15, fontWeight: '800', color: Colors.ink, marginBottom: 14 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  detailIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.forestSoft,
    alignItems: 'center', justifyContent: 'center',
  },
  detailContent: { flex: 1 },
  detailLabel: { fontSize: 11, fontWeight: '700', color: Colors.slate, marginBottom: 2 },
  detailValue: { fontSize: 14, fontWeight: '800', color: Colors.ink, lineHeight: 19 },
  divider: { height: 1, backgroundColor: Colors.line, marginVertical: 12 },
  bookButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: Colors.forest, borderRadius: Radius.pill, paddingVertical: 15, marginBottom: 32,
  },
  bookButtonDisabled: { backgroundColor: Colors.line },
  bookText: { color: Colors.gold, fontSize: 15, fontWeight: '800' },
  bookTextDisabled: { color: Colors.slate },
});
