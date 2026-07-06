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
import { festivals } from '@/data/mockData';

// ============================================================
// Festivals — big photo hero per festival with a status badge,
// then icon-labelled info rows.
// ============================================================

const statusConfig = {
  upcoming: { label: 'UPCOMING', color: Colors.forest },
  recurring: { label: 'EVERY 6 WEEKS', color: '#8248B8' },
  recent: { label: 'RECENTLY HELD', color: Colors.slate },
};

export default function Festivals() {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Festivals & Events" subtitle="Celebrate with Ghana" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {festivals.map((festival) => {
            const status = statusConfig[festival.status];
            return (
              <View key={festival.id} style={styles.card}>
                {/* Photo hero */}
                <ImageBackground
                  source={{ uri: festival.image }}
                  style={styles.cardImage}
                  imageStyle={styles.cardImageStyle}
                >
                  <View style={styles.imageOverlay} />
                  <View style={[styles.statusBadge, { backgroundColor: status.color }]}>
                    <Text style={styles.statusText}>{status.label}</Text>
                  </View>
                  <View style={styles.heroInfo}>
                    <Text style={styles.festivalName}>{festival.name}</Text>
                    <View style={styles.heroMeta}>
                      <Ionicons name="location-sharp" size={12} color={Colors.gold} />
                      <Text style={styles.heroMetaText}>
                        {festival.region} · {festival.tribe}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>

                <View style={styles.cardBody}>
                  <View style={styles.dateRow}>
                    <View style={styles.dateBadge}>
                      <Ionicons name="calendar-outline" size={13} color={Colors.forest} />
                      <Text style={styles.dateText}>{festival.date}</Text>
                    </View>
                    <View style={styles.dateBadge}>
                      <Ionicons name="hourglass-outline" size={13} color={Colors.forest} />
                      <Text style={styles.dateText}>{festival.duration}</Text>
                    </View>
                  </View>

                  <Text style={styles.description}>{festival.description}</Text>

                  <View style={styles.infoSection}>
                    <View style={styles.infoHeader}>
                      <Ionicons name="sparkles-outline" size={14} color={Colors.forest} />
                      <Text style={styles.infoTitle}>Highlights</Text>
                    </View>
                    <Text style={styles.infoText}>{festival.highlights}</Text>
                  </View>

                  <View style={styles.infoSection}>
                    <View style={styles.infoHeader}>
                      <Ionicons name="shirt-outline" size={14} color={Colors.forest} />
                      <Text style={styles.infoTitle}>What to wear</Text>
                    </View>
                    <Text style={styles.infoText}>{festival.dresscode}</Text>
                  </View>
                </View>
              </View>
            );
          })}
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
  list: {
    padding: 16,
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
    height: 160,
    justifyContent: 'space-between',
  },
  cardImageStyle: {},
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 32, 19, 0.4)',
  },
  statusBadge: {
    alignSelf: 'flex-end',
    margin: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Radius.pill,
  },
  statusText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroInfo: {
    padding: 14,
  },
  festivalName: {
    fontSize: 19,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroMetaText: {
    fontSize: 12,
    color: Colors.white,
    opacity: 0.92,
  },
  cardBody: {
    padding: 14,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.forestSoft,
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: Radius.pill,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.forest,
  },
  description: {
    fontSize: 13,
    color: Colors.slate,
    lineHeight: 20,
    marginBottom: 12,
  },
  infoSection: {
    marginBottom: 10,
    gap: 4,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.forest,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  infoText: {
    fontSize: 13,
    color: Colors.slate,
    lineHeight: 19,
  },
});
