import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const regions = [
  {
    id: '1',
    region: 'Ashanti Region',
    emoji: '👑',
    greeting: 'Maakye (Good Morning) · Maaha (Good Afternoon)',
    customs: 'Always greet elders first. Remove shoes before entering a home. Use your right hand for giving and receiving items.',
    dresscode: 'Dress modestly. Kente cloth is worn for special occasions. Avoid wearing funeral colors (red and black) casually.',
    taboos: 'Do not point at someone with your left hand. Avoid eating while walking in public. Do not whistle at night.',
    bestFor: 'Festivals, chieftaincy ceremonies, kente weaving visits',
  },
  {
    id: '2',
    region: 'Greater Accra',
    emoji: '🌆',
    greeting: 'Ete sen? (How are you? — Twi) · Miile (Hello — Ga)',
    customs: 'Handshakes are common greetings. It is polite to ask about family when meeting someone. Bargaining is expected in markets.',
    dresscode: 'Smart casual is acceptable in the city. Beach areas are more relaxed. Avoid revealing clothing in traditional communities.',
    taboos: 'Avoid discussing politics with strangers. Do not photograph people without permission. Tipping is appreciated but not mandatory.',
    bestFor: 'City tours, beaches, nightlife, shopping',
  },
  {
    id: '3',
    region: 'Central Region',
    emoji: '🏰',
    greeting: 'Akwaaba (Welcome) · Ete sen? (How are you?)',
    customs: 'At slave castles, maintain respectful silence especially in dungeons. Photography rules are strictly enforced.',
    dresscode: 'Dress respectfully when visiting historical sites. Avoid flashy clothing at memorial sites.',
    taboos: 'Never joke about the slave trade history at the castles. Do not enter sacred areas without permission from elders.',
    bestFor: 'Historical tours, cultural learning, beach visits',
  },
  {
    id: '4',
    region: 'Volta Region',
    emoji: '⛰️',
    greeting: 'Woezor (Welcome — Ewe) · Ŋdi (Good morning — Ewe)',
    customs: 'Community visits require greeting the chief or community leader first. Always accept offered food or drink as refusing is considered rude.',
    dresscode: 'Modest clothing is expected especially in villages. Cover shoulders and knees when visiting shrines.',
    taboos: 'Do not climb certain sacred mountains without a guide. Avoid loud behavior near shrines and sacred sites.',
    bestFor: 'Nature hikes, waterfalls, traditional village experiences',
  },
  {
    id: '5',
    region: 'Savannah Region',
    emoji: '🐘',
    greeting: 'Despa (Good morning — Dagbani) · Antire (Welcome)',
    customs: 'Remove shoes when entering mosques. Dress conservatively especially in Muslim communities. Friday is a holy day.',
    dresscode: 'Women should cover hair when entering mosques. Men and women should dress modestly covering arms and legs.',
    taboos: 'Do not photograph mosques without permission. Avoid eating in public during Ramadan. Never enter a mosque with shoes.',
    bestFor: 'Wildlife safaris, cultural diversity, mosque visits',
  },
];

export default function CulturalGuide() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cultural Guide</Text>
        <View />
      </View>

      <ScrollView>

        {/* Info Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            🤝 Understanding local culture makes your trip more respectful and enjoyable. Take a moment to learn before you visit!
          </Text>
        </View>

        {/* Regions */}
        <View style={styles.regionsList}>
          {regions.map((item) => (
            <View key={item.id} style={styles.regionCard}>

              {/* Region Header */}
              <View style={styles.regionHeader}>
                <Text style={styles.regionEmoji}>{item.emoji}</Text>
                <View>
                  <Text style={styles.regionName}>{item.region}</Text>
                  <Text style={styles.regionBestFor}>Best for: {item.bestFor}</Text>
                </View>
              </View>

              {/* Greeting */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>👋 Greetings</Text>
                <Text style={styles.sectionText}>{item.greeting}</Text>
              </View>

              {/* Customs */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🤝 Customs</Text>
                <Text style={styles.sectionText}>{item.customs}</Text>
              </View>

              {/* Dress Code */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>👔 Dress Code</Text>
                <Text style={styles.sectionText}>{item.dresscode}</Text>
              </View>

              {/* Taboos */}
              <View style={[styles.section, styles.tabooSection]}>
                <Text style={styles.sectionTitle}>⛔ Taboos to Avoid</Text>
                <Text style={styles.sectionText}>{item.taboos}</Text>
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
    backgroundColor: '#e8f5e9',
    padding: 14,
    margin: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#006B3F',
  },
  bannerText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
  regionsList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  regionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
  },
  regionEmoji: {
    fontSize: 36,
  },
  regionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  regionBestFor: {
    fontSize: 12,
    color: '#006B3F',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  tabooSection: {
    backgroundColor: '#fff5f5',
    borderLeftWidth: 3,
    borderLeftColor: '#cc0000',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
});