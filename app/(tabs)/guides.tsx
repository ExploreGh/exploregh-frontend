import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

const guides = [
  {
    id: '1',
    name: 'Kwame Asante',
    specialization: 'History & Culture',
    regions: 'Central Region, Greater Accra',
    languages: 'English, Twi, French',
    rating: '4.9',
    reviews: 214,
    experience: '8 years',
    price: 'GHS 200/day',
    emoji: '👨🏾‍🦱',
    available: true,
  },
  {
    id: '2',
    name: 'Abena Mensah',
    specialization: 'Nature & Wildlife',
    regions: 'Savannah Region, Brong-Ahafo',
    languages: 'English, Twi',
    rating: '4.8',
    reviews: 156,
    experience: '5 years',
    price: 'GHS 180/day',
    emoji: '👩🏾',
    available: true,
  },
  {
    id: '3',
    name: 'Kofi Boateng',
    specialization: 'Food & Markets',
    regions: 'Ashanti Region, Greater Accra',
    languages: 'English, Twi, Ga',
    rating: '5.0',
    reviews: 89,
    experience: '3 years',
    price: 'GHS 150/day',
    emoji: '👨🏾',
    available: false,
  },
  {
    id: '4',
    name: 'Ama Owusu',
    specialization: 'Festivals & Traditions',
    regions: 'Volta Region, Oti Region',
    languages: 'English, Ewe, Twi',
    rating: '4.7',
    reviews: 103,
    experience: '6 years',
    price: 'GHS 190/day',
    emoji: '👩🏾‍🦱',
    available: true,
  },
];

export default function Guides() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tour Guides 🎖️</Text>
        <Text style={styles.headerSubtitle}>Verified local experts across Ghana</Text>
      </View>

      <ScrollView>
        {/* Search */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by region or specialty..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>🎖️ All guides are verified and certified by ExploreGH!</Text>
        </View>

        {/* Guides */}
        <View style={styles.guidesList}>
          <Text style={styles.sectionTitle}>{guides.length} Guides Available</Text>
          {guides.map((guide) => (
            <View key={guide.id} style={styles.guideCard}>
              <View style={styles.guideTop}>
                <View style={styles.guideAvatar}>
                  <Text style={styles.guideAvatarText}>{guide.emoji}</Text>
                </View>
                <View style={styles.guideHeader}>
                  <Text style={styles.guideName}>{guide.name}</Text>
                  <Text style={styles.guideSpecialization}>🎯 {guide.specialization}</Text>
                  <Text style={styles.guideRating}>⭐ {guide.rating} ({guide.reviews} reviews)</Text>
                </View>
                <View style={[styles.availabilityBadge, { backgroundColor: guide.available ? '#006B3F' : '#999' }]}>
                  <Text style={styles.availabilityText}>{guide.available ? 'Available' : 'Busy'}</Text>
                </View>
              </View>
              <View style={styles.guideDetails}>
                <Text style={styles.detailText}>📍 {guide.regions}</Text>
                <Text style={styles.detailText}>🗣️ {guide.languages}</Text>
                <Text style={styles.detailText}>⏳ {guide.experience} experience</Text>
              </View>
              <View style={styles.guideBottom}>
                <Text style={styles.guidePrice}>💰 {guide.price}</Text>
                <TouchableOpacity
                  style={[styles.bookButton, { backgroundColor: guide.available ? '#006B3F' : '#ccc' }]}
                  disabled={!guide.available}
                >
                  <Text style={styles.bookButtonText}>{guide.available ? 'Book Now' : 'Unavailable'}</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  banner: {
    backgroundColor: '#e8f5e9',
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#006B3F',
  },
  bannerText: {
    fontSize: 13,
    color: '#555',
  },
  guidesList: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  guideCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  guideTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },
  guideAvatar: {
    width: 55,
    height: 55,
    backgroundColor: '#e8f5e9',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideAvatarText: {
    fontSize: 28,
  },
  guideHeader: {
    flex: 1,
  },
  guideName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  guideSpecialization: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  guideRating: {
    fontSize: 12,
    color: '#333',
  },
  availabilityBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  availabilityText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  guideDetails: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    gap: 4,
  },
  detailText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 2,
  },
  guideBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  guidePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  bookButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  bookButtonText: {
    color: '#FCD20F',
    fontWeight: 'bold',
    fontSize: 13,
  },
});