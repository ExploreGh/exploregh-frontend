import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function SiteDetails() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>🏰</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>History</Text>
        </View>
      </View>

      {/* Site Info */}
      <View style={styles.content}>

        <Text style={styles.siteName}>Cape Coast Castle</Text>
        <Text style={styles.siteRegion}>📍 Central Region, Ghana</Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
          <Text style={styles.ratingText}>4.8 (1,240 reviews)</Text>
        </View>

        {/* Crowd Meter */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>👥 Live Crowd Level</Text>
          <View style={styles.crowdMeter}>
            <View style={styles.crowdFill} />
          </View>
          <Text style={styles.crowdLabel}>Moderate — Good time to visit!</Text>
        </View>

        {/* Best Time To Visit */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🕐 Best Time To Visit</Text>
          <Text style={styles.cardText}>Early morning (7am — 10am) or late afternoon (4pm — 6pm). Avoid midday due to heat and crowds.</Text>
        </View>

        {/* Entry Fee */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎟️ Entry Fee</Text>
          <Text style={styles.cardText}>GHS 40 (Locals) · USD 15 (Foreigners)</Text>
        </View>

        {/* Description */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📝 About This Site</Text>
          <Text style={styles.cardText}>
            Cape Coast Castle is one of about forty slave castles built on the Gold Coast of West Africa. It is a UNESCO World Heritage Site and one of Ghana's most visited historical landmarks. Visitors can tour the dungeons, learn about the transatlantic slave trade, and walk through the Door of No Return.
          </Text>
        </View>

        {/* Cultural Guide */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🤝 Cultural Etiquette</Text>
          <Text style={styles.cardText}>Dress respectfully. Photography is allowed in most areas but not in the dungeons. Speak quietly and be respectful of the site's history.</Text>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>📅 Add to Trip Plan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>🗺️ Get Directions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.outlineButton}>
          <Text style={styles.outlineButtonText}>⚠️ Report Safety Issue</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  backText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  hero: {
    backgroundColor: '#006B3F',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 100,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#FCD20F',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  categoryBadgeText: {
    color: '#006B3F',
    fontWeight: 'bold',
    fontSize: 13,
  },
  content: {
    padding: 20,
  },
  siteName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  siteRegion: {
    fontSize: 15,
    color: '#666',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  stars: {
    fontSize: 16,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  crowdMeter: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginVertical: 8,
    overflow: 'hidden',
  },
  crowdFill: {
    width: '55%',
    height: '100%',
    backgroundColor: '#FCD20F',
    borderRadius: 6,
  },
  crowdLabel: {
    fontSize: 13,
    color: '#006B3F',
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#006B3F',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FCD20F',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#FCD20F',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: '#006B3F',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#cc0000',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 32,
  },
  outlineButtonText: {
    color: '#cc0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});