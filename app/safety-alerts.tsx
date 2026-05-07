import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const alerts = [
  {
    id: '1',
    title: 'Pickpocket Warning',
    region: 'Accra Central',
    severity: 'high',
    time: '2 hours ago',
    description: 'Multiple tourists reported pickpockets near Makola Market. Keep your belongings secure.',
    emoji: '⚠️',
  },
  {
    id: '2',
    title: 'Road Closure',
    region: 'Cape Coast',
    severity: 'medium',
    time: '5 hours ago',
    description: 'The main road to Cape Coast Castle is partially closed due to construction. Use alternative route via Market Road.',
    emoji: '🚧',
  },
  {
    id: '3',
    title: 'Scam Alert',
    region: 'Kumasi',
    severity: 'high',
    time: '1 day ago',
    description: 'Fake tour guides reported near Kejetia Market. Always verify guide credentials through ExploreGH.',
    emoji: '🚨',
  },
  {
    id: '4',
    title: 'Beach Advisory',
    region: 'Labadi Beach',
    severity: 'low',
    time: '2 days ago',
    description: 'Strong currents reported at Labadi Beach. Swimming is not recommended until further notice.',
    emoji: '🌊',
  },
];

const severityColors: Record<string, string> = {
  high: '#cc0000',
  medium: '#ff8800',
  low: '#006B3F',
};

export default function SafetyAlerts() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Safety Alerts</Text>
        <View />
      </View>

      {/* Info Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          🛡️ Stay safe! These alerts are reported by the ExploreGH community in real time.
        </Text>
      </View>

      {/* Alerts List */}
      <ScrollView style={styles.alertsList}>
        {alerts.map((alert) => (
          <View key={alert.id} style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <Text style={styles.alertEmoji}>{alert.emoji}</Text>
              <View style={styles.alertHeaderText}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertRegion}>📍 {alert.region}</Text>
              </View>
              <View style={[styles.severityBadge, { backgroundColor: severityColors[alert.severity] }]}>
                <Text style={styles.severityText}>{alert.severity.toUpperCase()}</Text>
              </View>
            </View>
            <Text style={styles.alertDescription}>{alert.description}</Text>
            <Text style={styles.alertTime}>🕐 {alert.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Report Button */}
      <TouchableOpacity style={styles.reportButton}>
        <Text style={styles.reportButtonText}>⚠️ Report a Safety Issue</Text>
      </TouchableOpacity>

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
    backgroundColor: '#fff3cd',
    padding: 14,
    margin: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ff8800',
  },
  bannerText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
  alertsList: {
    paddingHorizontal: 16,
  },
  alertCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  alertEmoji: {
    fontSize: 28,
  },
  alertHeaderText: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  alertRegion: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  severityBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  severityText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  alertDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 21,
    marginBottom: 8,
  },
  alertTime: {
    fontSize: 12,
    color: '#999',
  },
  reportButton: {
    backgroundColor: '#cc0000',
    margin: 16,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  reportButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});