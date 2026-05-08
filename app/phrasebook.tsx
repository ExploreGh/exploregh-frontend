import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const languages = [
  {
    id: '1',
    language: 'Twi',
    region: 'Ashanti & most of Ghana',
    emoji: '👑',
    phrases: [
      { english: 'Welcome', translation: 'Akwaaba', phonetic: 'Ah-kwah-bah' },
      { english: 'Good morning', translation: 'Maakye', phonetic: 'Mah-chee' },
      { english: 'Good afternoon', translation: 'Maaha', phonetic: 'Mah-hah' },
      { english: 'How are you?', translation: 'Ete sen?', phonetic: 'Eh-teh-sen' },
      { english: 'I am fine', translation: 'Eye', phonetic: 'Eh-yeh' },
      { english: 'Thank you', translation: 'Medaase', phonetic: 'Meh-dah-seh' },
      { english: 'Please', translation: 'Mepa wo kyew', phonetic: 'Meh-pah-woh-chew' },
      { english: 'How much?', translation: 'Sika sen?', phonetic: 'See-kah-sen' },
      { english: 'Help me', translation: 'Boa me', phonetic: 'Boh-ah-meh' },
    ],
  },
  {
    id: '2',
    language: 'Ga',
    region: 'Greater Accra',
    emoji: '🌆',
    phrases: [
      { english: 'Welcome', translation: 'Ojekoo', phonetic: 'Oh-jeh-koo' },
      { english: 'Good morning', translation: 'Miile', phonetic: 'Mee-leh' },
      { english: 'How are you?', translation: 'Afi o?', phonetic: 'Ah-fee-oh' },
      { english: 'I am fine', translation: 'Miihii', phonetic: 'Mee-hee' },
      { english: 'Thank you', translation: 'Oyiwaladon', phonetic: 'Oh-yee-wah-lah-don' },
      { english: 'Please', translation: 'Ekwa', phonetic: 'Eh-kwah' },
      { english: 'How much?', translation: 'Gbee?', phonetic: 'Gbeh' },
    ],
  },
  {
    id: '3',
    language: 'Ewe',
    region: 'Volta Region',
    emoji: '⛰️',
    phrases: [
      { english: 'Welcome', translation: 'Woezor', phonetic: 'Woh-zor' },
      { english: 'Good morning', translation: 'Ŋdi', phonetic: 'Ndee' },
      { english: 'How are you?', translation: 'Efoa?', phonetic: 'Eh-foh-ah' },
      { english: 'I am fine', translation: 'Hõ em', phonetic: 'Hoh-em' },
      { english: 'Thank you', translation: 'Akpe', phonetic: 'Ah-kpeh' },
      { english: 'Please', translation: 'Meɖekuku', phonetic: 'Meh-deh-koo-koo' },
      { english: 'How much?', translation: 'Esia?', phonetic: 'Eh-see-ah' },
    ],
  },
  {
    id: '4',
    language: 'Hausa',
    region: 'Northern Ghana',
    emoji: '🕌',
    phrases: [
      { english: 'Welcome', translation: 'Barka da zuwa', phonetic: 'Bar-kah-dah-zoo-wah' },
      { english: 'Good morning', translation: 'Ina kwana', phonetic: 'Ee-nah-kwah-nah' },
      { english: 'How are you?', translation: 'Yaya dai?', phonetic: 'Yah-yah-die' },
      { english: 'I am fine', translation: 'Lafiya lau', phonetic: 'Lah-fee-yah-lau' },
      { english: 'Thank you', translation: 'Na gode', phonetic: 'Nah-goh-deh' },
      { english: 'Please', translation: 'Don Allah', phonetic: 'Don-ah-lah' },
      { english: 'How much?', translation: 'Nawa ne?', phonetic: 'Nah-wah-neh' },
    ],
  },
];

export default function Phrasebook() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Phrasebook</Text>
        <View />
      </View>

      <ScrollView>

        {/* Info Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            🗣️ Speaking even a few words in the local language will earn you smiles and respect from Ghanaians!
          </Text>
        </View>

        {/* Languages */}
        <View style={styles.languagesList}>
          {languages.map((lang) => (
            <View key={lang.id} style={styles.languageCard}>

              {/* Language Header */}
              <View style={styles.languageHeader}>
                <Text style={styles.languageEmoji}>{lang.emoji}</Text>
                <View>
                  <Text style={styles.languageName}>{lang.language}</Text>
                  <Text style={styles.languageRegion}>📍 {lang.region}</Text>
                </View>
              </View>

              {/* Phrases */}
              {lang.phrases.map((phrase, index) => (
                <View key={index} style={styles.phraseRow}>
                  <View style={styles.phraseLeft}>
                    <Text style={styles.englishText}>{phrase.english}</Text>
                    <Text style={styles.phoneticText}>🔊 {phrase.phonetic}</Text>
                  </View>
                  <View style={styles.translationBadge}>
                    <Text style={styles.translationText}>{phrase.translation}</Text>
                  </View>
                </View>
              ))}

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
  languagesList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  languageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  languageEmoji: {
    fontSize: 36,
  },
  languageName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006B3F',
    marginBottom: 2,
  },
  languageRegion: {
    fontSize: 12,
    color: '#666',
  },
  phraseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  phraseLeft: {
    flex: 1,
  },
  englishText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  phoneticText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  translationBadge: {
    backgroundColor: '#006B3F',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 10,
  },
  translationText: {
    color: '#FCD20F',
    fontWeight: 'bold',
    fontSize: 13,
  },
});