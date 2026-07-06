import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { ScreenHeader, Chip } from '@/components';
import { languages } from '@/data/mockData';

// ============================================================
// Phrasebook — pick a language with chips, see phrase cards
// with the translation prominent and phonetics beneath.
// Tap the sound icon to hear the phrase spoken aloud using
// the device's Text-to-Speech engine (expo-speech).
// ============================================================

export default function Phrasebook() {
  const [selectedId, setSelectedId] = useState('1');
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const language = languages.find((l) => l.id === selectedId) ?? languages[0];

  const speakPhrase = (phonetic: string, index: number) => {
    Speech.stop(); // stop any phrase still speaking
    setSpeakingIndex(index);
    Speech.speak(phonetic, {
      rate: 0.85, // slightly slower for clarity
      onDone: () => setSpeakingIndex(null),
      onStopped: () => setSpeakingIndex(null),
      onError: () => setSpeakingIndex(null),
    });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Phrasebook" subtitle="Speak like a local" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Language selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsRow}
          contentContainerStyle={styles.chipsContent}
        >
          {languages.map((lang) => (
            <Chip
              key={lang.id}
              label={lang.language}
              selected={selectedId === lang.id}
              onPress={() => {
                Speech.stop();
                setSpeakingIndex(null);
                setSelectedId(lang.id);
              }}
            />
          ))}
        </ScrollView>

        <View style={styles.regionRow}>
          <Ionicons name="location-outline" size={14} color={Colors.slate} />
          <Text style={styles.regionText}>Spoken in {language.region}</Text>
        </View>

        {/* Tip banner */}
        <View style={styles.banner}>
          <Ionicons name="volume-high-outline" size={18} color={Colors.forestDark} />
          <Text style={styles.bannerText}>
            Tap the speaker icon to hear each phrase read aloud. Turn your volume up!
          </Text>
        </View>

        <View style={styles.list}>
          {language.phrases.map((phrase, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.phraseLeft}>
                <Text style={styles.english}>{phrase.english}</Text>
                <Text style={styles.translation}>{phrase.translation}</Text>
                <View style={styles.phoneticRow}>
                  <Ionicons name="volume-medium-outline" size={13} color={Colors.slate} />
                  <Text style={styles.phonetic}>{phrase.phonetic}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.soundButton,
                  speakingIndex === index && styles.soundButtonActive,
                ]}
                activeOpacity={0.8}
                onPress={() => speakPhrase(phrase.phonetic, index)}
              >
                <Ionicons
                  name={speakingIndex === index ? 'volume-high' : 'volume-high-outline'}
                  size={18}
                  color={speakingIndex === index ? Colors.gold : Colors.forest}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

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
  chipsRow: {
    marginTop: 16,
  },
  chipsContent: {
    paddingHorizontal: 16,
  },
  regionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 10,
  },
  regionText: {
    fontSize: 13,
    color: Colors.slate,
    fontWeight: '600',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.forestSoft,
    padding: 13,
    marginHorizontal: 16,
    marginBottom: 12,
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
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
  phraseLeft: {
    flex: 1,
  },
  english: {
    fontSize: 12,
    color: Colors.slate,
    marginBottom: 3,
  },
  translation: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.forestDark,
    marginBottom: 4,
  },
  phoneticRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  phonetic: {
    fontSize: 12,
    color: Colors.slate,
    fontStyle: 'italic',
  },
  soundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.forestSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundButtonActive: {
    backgroundColor: Colors.forest,
  },
});