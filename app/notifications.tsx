import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { ScreenHeader, EmptyState } from '@/components';
import { notifications as initialNotifications } from '@/data/notifications';
import { useProfile } from '@/context/ProfileContext';

export default function Notifications() {
  const { profile } = useProfile();
  const relevantNotifications = initialNotifications.filter((n) =>
    n.forRoles.includes(profile.role)
  );
  const [items, setItems] = useState(relevantNotifications);

  const markAsRead = (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Notifications" subtitle="Stay updated" />

      {items.length === 0 ? (
        <EmptyState icon="notifications-outline" title="No notifications yet" message="You're all caught up!" />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, !item.read && styles.cardUnread]}
              onPress={() => markAsRead(item.id)}
              activeOpacity={0.85}
            >
              <View style={[styles.iconCircle, { backgroundColor: item.color + '22' }]}>
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              {!item.read ? <View style={styles.dot} /> : null}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.mist },
  list: { padding: 16, gap: 10 },
  card: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: Colors.white,
    borderRadius: Radius.md, padding: 14, borderWidth: 1, borderColor: Colors.line, ...Shadow.card,
  },
  cardUnread: { backgroundColor: Colors.forestSoft, borderColor: Colors.forest },
  iconCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: '800', color: Colors.ink, marginBottom: 3 },
  message: { fontSize: 13, color: Colors.slate, lineHeight: 18, marginBottom: 5 },
  time: { fontSize: 11, color: Colors.slate },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.red, marginTop: 4 },
});