import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { Button, EmptyState } from '@/components';
import { useMarketplace } from '@/context/MarketplaceContext';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const { products } = useMarketplace();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <View style={styles.emptyContainer}>
        <TouchableOpacity style={styles.emptyBackButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={Colors.forestDark} />
        </TouchableOpacity>
        <EmptyState
          icon="bag-handle-outline"
          title="Product not found"
          message="This product may no longer be available. Please return to the marketplace."
        />
      </View>
    );
  }

  const enquire = () => {
    router.push({
      pathname: '/chat',
      params: {
        name: product.vendorName,
        photo: product.image || '',
        role: 'Vendor',
        context: product.name,
        price: `GHS ${product.price.toFixed(2)}`,
        message: `Hi, I am interested in ${product.name}. Is it available?`,
      },
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={{ uri: product.image || 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=60' }}
        style={styles.hero}
      >
        <View style={styles.heroOverlay} />
        {!product.image && (
          <Ionicons name="image-outline" size={58} color={Colors.white} style={styles.fallbackIcon} />
        )}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.heroContent}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.vendorName}>by {product.vendorName}</Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.priceCard}>
          <View>
            <Text style={styles.priceLabel}>Starting price</Text>
            <Text style={styles.price}>GHS {product.price.toFixed(2)}</Text>
          </View>
          <View style={styles.enquiryBadge}>
            <Ionicons name="chatbubble-ellipses-outline" size={15} color={Colors.forest} />
            <Text style={styles.enquiryBadgeText}>Enquire to order</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="information-circle-outline" size={19} color={Colors.ink} />
            <Text style={styles.cardTitle}>About this item</Text>
          </View>
          <Text style={styles.description}>{product.description || 'Message the vendor for more information about this item.'}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="chatbubbles-outline" size={19} color={Colors.ink} />
            <Text style={styles.cardTitle}>How it works</Text>
          </View>
          <View style={styles.stepRow}>
            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>1</Text></View>
            <Text style={styles.stepText}>Send the vendor an enquiry about availability.</Text>
          </View>
          <View style={styles.stepRow}>
            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>2</Text></View>
            <Text style={styles.stepText}>Confirm details such as size, collection, delivery or timing.</Text>
          </View>
          <View style={styles.stepRow}>
            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>3</Text></View>
            <Text style={styles.stepText}>Agree on the order directly with the verified local vendor.</Text>
          </View>
        </View>

        <View style={styles.notice}>
          <Ionicons name="shield-checkmark-outline" size={20} color={Colors.forest} />
          <Text style={styles.noticeText}>ExploreGH does not process payment yet. Confirm the price and arrangements with the vendor before paying.</Text>
        </View>

        <View style={styles.actions}>
          <Button title="Enquire about this item" icon="chatbubble-ellipses-outline" onPress={enquire} />
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
  hero: { height: 330, justifyContent: 'flex-end', backgroundColor: Colors.forest },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(6, 32, 19, 0.48)' },
  fallbackIcon: { position: 'absolute', alignSelf: 'center', top: 130, opacity: 0.7 },
  backButton: {
    position: 'absolute', top: 54, left: 16, width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center',
  },
  heroContent: { padding: 20 },
  categoryBadge: {
    alignSelf: 'flex-start', backgroundColor: Colors.gold, paddingVertical: 4,
    paddingHorizontal: 12, borderRadius: Radius.pill, marginBottom: 8,
  },
  categoryText: { color: Colors.forestDark, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  productName: { fontSize: 27, fontWeight: '800', color: Colors.white, marginBottom: 5 },
  vendorName: { fontSize: 14, color: Colors.white, opacity: 0.92 },
  content: { padding: 16 },
  priceCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: 16, marginBottom: 14,
    borderWidth: 1, borderColor: Colors.line, ...Shadow.card,
  },
  priceLabel: { fontSize: 11, color: Colors.slate, marginBottom: 3 },
  price: { fontSize: 21, fontWeight: '800', color: Colors.forest },
  enquiryBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.forestSoft,
    paddingVertical: 7, paddingHorizontal: 10, borderRadius: Radius.pill,
  },
  enquiryBadgeText: { fontSize: 11, fontWeight: '800', color: Colors.forest },
  card: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: 16, marginBottom: 14,
    borderWidth: 1, borderColor: Colors.line, ...Shadow.card,
  },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 11 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: Colors.ink },
  description: { fontSize: 14, lineHeight: 22, color: Colors.slate },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 11, marginBottom: 12 },
  stepNumber: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.forestSoft,
    alignItems: 'center', justifyContent: 'center',
  },
  stepNumberText: { fontSize: 12, fontWeight: '800', color: Colors.forest },
  stepText: { flex: 1, fontSize: 13, lineHeight: 18, color: Colors.slate },
  notice: {
    flexDirection: 'row', gap: 10, backgroundColor: Colors.forestSoft,
    borderRadius: Radius.lg, padding: 14, marginBottom: 16,
  },
  noticeText: { flex: 1, fontSize: 12, lineHeight: 18, color: Colors.forestDark },
  actions: { marginBottom: 32 },
});
