import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { ScreenHeader } from '@/components';
import { culturalRegions } from '@/data/mockData';

// ============================================================
// Cultural Guide — photo banner per region, then icon-labelled
// sections for greetings, customs, dress code and taboos.
// ============================================================

export default function CulturalGuide() {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Cultural Guide" subtitle="Customs & etiquette by region" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Ionicons name="heart-outline" size={18} color={Colors.forestDark} />
          <Text style={styles.bannerText}>
            Respecting local customs makes your trip richer — and Ghanaians will love you for it.
          </Text>
        </View>

        <View style={styles.list}>
          {culturalRegions.map((region) => (
            <View key={region.id} style={styles.card}>
              {/* Region photo banner */}
              <ImageBackground
                source={{ uri: region.image }}
                style={styles.cardImage}
                imageStyle={styles.cardImageStyle}
              >
                <View style={styles.imageOverlay} />
                <View style={styles.regionRow}>
                  <Text style={styles.regionName}>{region.region}</Text>
                  <View style={styles.bestForBadge}>
                    <Text style={styles.bestForText}>{region.bestFor}</Text>
                  </View>
                </View>
              </ImageBackground>

              <View style={styles.cardBody}>
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Ionicons name="hand-right-outline" size={15} color={Colors.forest} />
                    <Text style={styles.sectionTitle}>Greetings</Text>
                  </View>
                  <Text style={styles.sectionText}>{region.greeting}</Text>
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Ionicons name="people-outline" size={15} color={Colors.forest} />
                    <Text style={styles.sectionTitle}>Customs</Text>
                  </View>
                  <Text style={styles.sectionText}>{region.customs}</Text>
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Ionicons name="shirt-outline" size={15} color={Colors.forest} />
                    <Text style={styles.sectionTitle}>Dress code</Text>
                  </View>
                  <Text style={styles.sectionText}>{region.dresscode}</Text>
                </View>

                <View style={[styles.section, styles.tabooSection]}>
                  <View style={styles.sectionHeader}>
                    <Ionicons name="close-circle-outline" size={15} color={Colors.red} />
                    <Text style={[styles.sectionTitle, { color: Colors.red }]}>Things to avoid</Text>
                  </View>
                  <Text style={styles.sectionText}>{region.taboos}</Text>
                </View>
              </View>
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
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.forestSoft,
    padding: 14,
    margin: 16,
    borderRadius: Radius.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.forest,
  },
  bannerText: {
    flex: 1,
    fontSize: 13,
    color: Colors.forestDark,
    lineHeight: 19,
  },
  list: {
    paddingHorizontal: 16,
    gap: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
  cardImage: {
    height: 100,
    justifyContent: 'flex-end',
  },
  cardImageStyle: {},
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 32, 19, 0.45)',
  },
  regionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    gap: 8,
  },
  regionName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
    flexShrink: 1,
  },
  bestForBadge: {
    backgroundColor: Colors.gold,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Radius.pill,
    maxWidth: 170,
  },
  bestForText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.forestDark,
  },
  cardBody: {
    padding: 14,
    gap: 12,
  },
  section: {
    gap: 5,
  },
  tabooSection: {
    backgroundColor: Colors.redSoft,
    borderRadius: Radius.md,
    padding: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.forest,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  sectionText: {
    fontSize: 13,
    color: Colors.slate,
    lineHeight: 20,
  },
});
