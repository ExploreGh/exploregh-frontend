import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { EmptyState, KenteStrip } from '@/components';
import { useProfile } from '@/context/ProfileContext';

type BookingRequest = {
  id: string;
  touristName: string;
  date: string;
  groupSize: string;
  note: string;
  status: 'pending' | 'accepted' | 'declined';
};

const initialRequests: BookingRequest[] = [
  {
    id: '1',
    touristName: 'Explorer Guest',
    date: '20 August 2026',
    groupSize: '4',
    note: 'Interested in the historical sites around Cape Coast.',
    status: 'pending',
  },
];

export default function GuideDashboard() {
  const { profile } = useProfile();
  const [requests, setRequests] = useState(initialRequests);

  const respond = (id: string, status: 'accepted' | 'declined') => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const pendingCount = requests.filter((r) => r.status === 'pending').length;
  const acceptedCount = requests.filter((r) => r.status === 'accepted').length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookings</Text>
        <Text style={styles.headerSubtitle}>{profile.name}'s tour requests</Text>
      </View>
      <KenteStrip />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{pendingCount}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{acceptedCount}</Text>
            <Text style={styles.statLabel}>Accepted</Text>
          </View>
        </View>

        {requests.length === 0 ? (
          <EmptyState
            icon="calendar-outline"
            title="No booking requests"
            message="Tour requests from tourists will show up here."
          />
        ) : (
          <View style={styles.list}>
            {requests.map((request) => (
              <View key={request.id} style={styles.card}>
                <View style={styles.cardTop}>
                  <View style={styles.avatarFallback}>
                    <Text style={styles.avatarText}>{request.touristName[0]}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.touristName}>{request.touristName}</Text>
                    <Text style={styles.date}>{request.date} · {request.groupSize} people</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      request.status === 'pending' && styles.statusPending,
                      request.status === 'accepted' && styles.statusAccepted,
                      request.status === 'declined' && styles.statusDeclined,
                    ]}
                  >
                    <Text style={styles.statusText}>{request.status}</Text>
                  </View>
                </View>

                {request.note ? <Text style={styles.note}>{request.note}</Text> : null}

                {request.status === 'pending' && (
                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.declineButton]}
                      onPress={() => respond(request.id, 'declined')}
                    >
                      <Ionicons name="close" size={16} color={Colors.red} />
                      <Text style={styles.declineText}>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.acceptButton]}
                      onPress={() => respond(request.id, 'accepted')}
                    >
                      <Ionicons name="checkmark" size={16} color={Colors.gold} />
                      <Text style={styles.acceptText}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.mist },
  header: { backgroundColor: Colors.forest, paddingTop: 58, paddingBottom: 18, paddingHorizontal: 20 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: Colors.gold },
  headerSubtitle: { fontSize: 13, color: Colors.white, marginTop: 3, opacity: 0.9 },
  statsRow: { flexDirection: 'row', gap: 12, padding: 16 },
  statBox: {
    flex: 1, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: 16,
    alignItems: 'center', borderWidth: 1, borderColor: Colors.line, ...Shadow.card,
  },
  statNumber: { fontSize: 24, fontWeight: '800', color: Colors.forest, marginBottom: 4 },
  statLabel: { fontSize: 12, color: Colors.slate, textAlign: 'center' },
  list: { paddingHorizontal: 16, gap: 12 },
  card: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: 14,
    borderWidth: 1, borderColor: Colors.line, ...Shadow.card,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  avatarFallback: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.forestSoft,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: '800', color: Colors.forest },
  cardInfo: { flex: 1 },
  touristName: { fontSize: 15, fontWeight: '800', color: Colors.ink, marginBottom: 2 },
  date: { fontSize: 12, color: Colors.slate },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: Radius.pill },
  statusPending: { backgroundColor: Colors.goldSoft },
  statusAccepted: { backgroundColor: Colors.forestSoft },
  statusDeclined: { backgroundColor: Colors.redSoft },
  statusText: { fontSize: 11, fontWeight: '800', color: Colors.ink, textTransform: 'capitalize' },
  note: { fontSize: 13, color: Colors.slate, lineHeight: 19, marginBottom: 12 },
  actionsRow: { flexDirection: 'row', gap: 10 },
  actionButton: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 10, borderRadius: Radius.pill,
  },
  declineButton: { borderWidth: 2, borderColor: Colors.red },
  declineText: { color: Colors.red, fontWeight: '800', fontSize: 13 },
  acceptButton: { backgroundColor: Colors.forest },
  acceptText: { color: Colors.gold, fontWeight: '800', fontSize: 13 },
});