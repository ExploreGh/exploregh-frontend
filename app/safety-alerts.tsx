import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { ScreenHeader } from '@/components';
import { safetyAlerts } from '@/data/mockData';

// ============================================================
// Safety Alerts — community-reported incidents with severity
// badges and icons. Header uses red to signal urgency.
// ============================================================

const severityStyles = {
  high: { color: Colors.red, bg: Colors.redSoft, icon: 'alert-circle' as const },
  medium: { color: '#B96A00', bg: Colors.goldSoft, icon: 'warning' as const },
  low: { color: Colors.forest, bg: Colors.forestSoft, icon: 'information-circle' as const },
};

export default function SafetyAlerts() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ScreenHeader title="Safety Alerts" subtitle="Community-reported, in real time" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Ionicons name="shield-checkmark-outline" size={18} color={Colors.forestDark} />
          <Text style={styles.bannerText}>
            Stay safe. Alerts are reported and confirmed by the ExploreGH community.
          </Text>
        </View>

        <View style={styles.list}>
          {safetyAlerts.map((alert) => {
            const s = severityStyles[alert.severity];
            return (
              <View key={alert.id} style={styles.card}>
                <View style={styles.cardTop}>
                  <View style={[styles.iconCircle, { backgroundColor: s.bg }]}>
                    <Ionicons name={s.icon} size={20} color={s.color} />
                  </View>
                  <View style={styles.headerInfo}>
                    <Text style={styles.alertTitle}>{alert.title}</Text>
                    <View style={styles.metaRow}>
                      <Ionicons name="location-outline" size={12} color={Colors.slate} />
                      <Text style={styles.metaText}>{alert.region}</Text>
                    </View>
                  </View>
                  <View style={[styles.severityBadge, { backgroundColor: s.color }]}>
                    <Text style={styles.severityText}>{alert.severity.toUpperCase()}</Text>
                  </View>
                </View>
                <Text style={styles.description}>{alert.description}</Text>
                <View style={styles.timeRow}>
                  <Ionicons name="time-outline" size={12} color={Colors.slate} />
                  <Text style={styles.timeText}>{alert.time}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Floating report button */}
      <TouchableOpacity
  style={styles.reportButton}
  activeOpacity={0.9}
  onPress={() => router.push('/report')}
>
  <Ionicons name="megaphone-outline" size={18} color={Colors.white} />
  <Text style={styles.reportText}>Report a safety issue</Text>
</TouchableOpacity>
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
    backgroundColor: Colors.goldSoft,
    padding: 14,
    margin: 16,
    borderRadius: Radius.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.gold,
  },
  bannerText: {
    flex: 1,
    fontSize: 13,
    color: Colors.ink,
    lineHeight: 19,
  },
  list: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: 12,
    color: Colors.slate,
  },
  severityBadge: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: Radius.pill,
  },
  severityText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 13,
    color: Colors.slate,
    lineHeight: 20,
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: Colors.slate,
  },
  reportButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.red,
    paddingVertical: 16,
    borderRadius: Radius.pill,
    ...Shadow.card,
  },
  reportText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
});
