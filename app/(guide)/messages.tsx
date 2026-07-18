import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { EmptyState, KenteStrip } from '@/components';

const sampleConversations = [
  {
    id: '1',
    name: 'Explorer Guest',
    lastMessage: 'Perfect, 10am for 4 people is no problem at all.',
    time: '9:10 AM',
  },
];

export default function GuideMessages() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <Text style={styles.headerSubtitle}>Conversations with tourists</Text>
      </View>
      <KenteStrip />

      {sampleConversations.length === 0 ? (
        <EmptyState
          icon="chatbubbles-outline"
          title="No messages yet"
          message="Conversations with tourists will show up here."
        />
      ) : (
        <FlatList
          data={sampleConversations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                router.push({
                  pathname: '/chat',
                  params: { name: item.name, role: 'Tourist' },
                })
              }
            >
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarText}>{item.name[0]}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.message} numberOfLines={1}>{item.lastMessage}</Text>
              </View>
              <Text style={styles.time}>{item.time}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.mist },
  header: { backgroundColor: Colors.forest, paddingTop: 58, paddingBottom: 18, paddingHorizontal: 20 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: Colors.gold },
  headerSubtitle: { fontSize: 13, color: Colors.white, marginTop: 3, opacity: 0.9 },
  list: { padding: 16, gap: 10 },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.white,
    borderRadius: Radius.md, padding: 12, borderWidth: 1, borderColor: Colors.line, ...Shadow.card,
  },
  avatarFallback: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.forestSoft,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: '800', color: Colors.forest },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '800', color: Colors.ink, marginBottom: 2 },
  message: { fontSize: 12, color: Colors.slate },
  time: { fontSize: 11, color: Colors.slate },
});