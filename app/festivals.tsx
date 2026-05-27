import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const festivals = [
  {
    id: '1',
    name: 'Homowo Festival',
    region: 'Greater Accra',
    tribe: 'Ga People',
    emoji: '🌽',
    date: 'August — September 2026',
    duration: '2 weeks',
    description: 'Homowo meaning "hooting at hunger" is the most important festival of the Ga people. It celebrates the end of a historic famine with traditional foods, drumming, and family reunions.',
    highlights: 'Traditional kpokpoi meal, libation pouring, family gatherings, drumming and dancing',
    dresscode: 'Traditional Ga attire or smart casual. Avoid red and black.',
    status: 'upcoming',
  },
  {
    id: '2',
    name: 'Akwasidae Festival',
    region: 'Ashanti Region',
    tribe: 'Ashanti People',
    emoji: '👑',
    date: 'Every 6 weeks (Next: June 2026)',
    duration: '1 day',
    description: 'Akwasidae is a sacred Ashanti festival held every 42 days at the Manhyia Palace in Kumasi. The Asantehene (Ashanti King) receives homage from chiefs and the public in full royal regalia.',
    highlights: 'Royal procession, golden stool ceremony, traditional drumming, chiefs in full regalia',
    dresscode: 'Traditional kente cloth. Smart formal attire acceptable for visitors.',
    status: 'recurring',
  },
  {
    id: '3',
    name: 'Chale Wote Street Art Festival',
    region: 'Greater Accra',
    tribe: 'All of Ghana',
    emoji: '🎨',
    date: 'August 2026',
    duration: '2 days',
    description: 'Ghana\'s biggest street art and culture festival held in James Town, Accra. Features live art, music, fashion, skateboarding, and performances from artists across Africa.',
    highlights: 'Live murals, music performances, fashion shows, food vendors, cultural exhibitions',
    dresscode: 'Creative and expressive! This is a fashion-forward event.',
    status: 'upcoming',
  },
  {
    id: '4',
    name: 'Panafest',
    region: 'Central Region',
    tribe: 'Pan-African',
    emoji: '✊🏾',
    date: 'July 2026',
    duration: '1 week',
    description: 'The Pan African Historical Theatre Festival held at Cape Coast brings together Africans and people of African descent worldwide to celebrate African heritage and the legacy of the slave trade.',
    highlights: 'Theatre performances, heritage tours, diaspora reunions, cultural exhibitions',
    dresscode: 'African traditional attire encouraged.',
    status: 'upcoming',
  },
  {
    id: '5',
    name: 'Aboakyir Festival',
    region: 'Central Region',
    tribe: 'Efutu People',
    emoji: '🦌',
    date: 'May 2026',
    duration: '1 day',
    description: 'The Aboakyir deer hunting festival of the Efutu people of Winneba. Two rival groups called Asafo companies compete to be the first to catch a live bushbuck deer as an offering to the gods.',
    highlights: 'Deer hunting competition, traditional drumming, colorful processions',
    dresscode: 'Traditional attire or smart casual.',
    status: 'recent',
  },
  {
    id: '6',
    name: 'Hogbetsotso Festival',
    region: 'Volta Region',
    tribe: 'Anlo Ewe People',
    emoji: '⛵',
    date: 'November 2026',
    duration: '1 day',
    description: 'Hogbetsotso meaning "the exodus" commemorates the migration of the Anlo Ewe people from Notsie in present-day Togo to their current home in the Volta Region of Ghana.',
    highlights: 'Historical reenactments, traditional dances, durbar of chiefs',
    dresscode: 'Traditional Ewe attire or smart casual.',
    status: 'upcoming',
  },
];

const statusColors: Record<string, string> = {
  upcoming: '#006B3F',
  recurring: '#003580',
  recent: '#999',
};

const statusLabels: Record<string, string> = {
  upcoming: 'Upcoming',
  recurring: 'Recurring',
  recent: 'Recently Held',
};

export default function Festivals() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Festivals & Events</Text>
        <View />
      </View>

      <ScrollView>

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            🎉 Experience Ghana's vibrant culture! These festivals are once-in-a-lifetime experiences you won't find anywhere else in the world.
          </Text>
        </View>

        {/* Festivals List */}
        <View style={styles.festivalsList}>
          {festivals.map((festival) => (
            <View key={festival.id} style={styles.festivalCard}>

              {/* Top */}
              <View style={styles.festivalTop}>
                <Text style={styles.festivalEmoji}>{festival.emoji}</Text>
                <View style={styles.festivalHeaderInfo}>
                  <Text style={styles.festivalName}>{festival.name}</Text>
                  <Text style={styles.festivalTribe}>👥 {festival.tribe}</Text>
                  <Text style={styles.festivalRegion}>📍 {festival.region}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColors[festival.status] }]}>
                  <Text style={styles.statusText}>{statusLabels[festival.status]}</Text>
                </View>
              </View>

              {/* Date & Duration */}
              <View style={styles.dateRow}>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateText}>📅 {festival.date}</Text>
                </View>
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>⏳ {festival.duration}</Text>
                </View>
              </View>

              {/* Description */}
              <Text style={styles.festivalDescription}>{festival.description}</Text>

              {/* Highlights */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>✨ Highlights</Text>
                <Text style={styles.sectionText}>{festival.highlights}</Text>
              </View>

              {/* Dress Code */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>👔 Dress Code</Text>
                <Text style={styles.sectionText}>{festival.dresscode}</Text>
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
  banner: {
    backgroundColor: '#fff9e6',
    padding: 14,
    margin: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FCD20F',
  },
  bannerText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
  festivalsList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  festivalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  festivalTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },
  festivalEmoji: {
    fontSize: 36,
  },
  festivalHeaderInfo: {
    flex: 1,
  },
  festivalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  festivalTribe: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  festivalRegion: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  dateBadge: {
    backgroundColor: '#e8f5e9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  dateText: {
    fontSize: 12,
    color: '#006B3F',
    fontWeight: 'bold',
  },
  durationBadge: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  durationText: {
    fontSize: 12,
    color: '#555',
    fontWeight: 'bold',
  },
  festivalDescription: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  section: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
});