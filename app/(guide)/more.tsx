import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { AppModal, Avatar, KenteStrip } from '@/components';
import { useProfile } from '@/context/ProfileContext';

const menuItems = [
  {
    id: '1',
    title: 'Safety Alerts',
    description: 'Real-time safety updates',
    icon: 'warning-outline' as const,
    route: '/safety-alerts',
    color: Colors.red,
    bg: Colors.redSoft,
  },
  {
    id: '2',
    title: 'Notifications',
    description: 'Bookings, messages and updates',
    icon: 'notifications-outline' as const,
    route: '/notifications',
    color: Colors.forest,
    bg: Colors.forestSoft,
  },
];

export default function GuideMore() {
  const router = useRouter();
  const { profile } = useProfile();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
        <Text style={styles.headerSubtitle}>Account & settings</Text>
      </View>
      <KenteStrip />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <Avatar name={profile.name} size={54} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileEmail}>{profile.email}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>Tour guide account</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={0.85}
            onPress={() => router.push('/edit-profile')}
          >
            <Ionicons name="pencil-outline" size={14} color={Colors.gold} />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.menuList}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.85}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.bg }]}>
                <Ionicons name={item.icon} size={20} color={item.color} />
              </View>
              <View style={styles.menuInfo}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.slate} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setShowLogoutModal(true)}
          activeOpacity={0.85}
        >
          <Ionicons name="log-out-outline" size={18} color={Colors.red} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>

      <AppModal
        visible={showLogoutModal}
        title="Log out of ExploreGH?"
        message="You will return to the welcome screen and can sign in again at any time."
        icon="log-out-outline"
        variant="danger"
        confirmLabel="Log out"
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.mist },
  header: { backgroundColor: Colors.forest, paddingTop: 58, paddingBottom: 18, paddingHorizontal: 20 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: Colors.gold },
  headerSubtitle: { fontSize: 13, color: Colors.white, marginTop: 3, opacity: 0.9 },
  profileCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: Colors.white,
    margin: 16, borderRadius: Radius.lg, padding: 16, borderWidth: 1, borderColor: Colors.line, ...Shadow.card,
  },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 17, fontWeight: '800', color: Colors.ink, marginBottom: 2 },
  profileEmail: { fontSize: 13, color: Colors.slate, marginBottom: 6 },
  roleBadge: {
    alignSelf: 'flex-start', backgroundColor: Colors.goldSoft, paddingVertical: 3,
    paddingHorizontal: 10, borderRadius: Radius.pill,
  },
  roleBadgeText: { fontSize: 10, fontWeight: '800', color: Colors.forestDark },
  editButton: {
    flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: Colors.forest,
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: Radius.pill,
  },
  editText: { color: Colors.gold, fontWeight: '700', fontSize: 13 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.ink, marginHorizontal: 16, marginBottom: 10 },
  menuList: { paddingHorizontal: 16, gap: 10 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.white,
    borderRadius: Radius.md, padding: 13, borderWidth: 1, borderColor: Colors.line,
  },
  menuIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  menuInfo: { flex: 1 },
  menuTitle: { fontSize: 14, fontWeight: '800', color: Colors.ink, marginBottom: 2 },
  menuDescription: { fontSize: 12, color: Colors.slate },
  logoutButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, margin: 16,
    marginTop: 20, paddingVertical: 15, borderRadius: Radius.pill, borderWidth: 2, borderColor: Colors.red,
  },
  logoutText: { color: Colors.red, fontSize: 15, fontWeight: '800' },
});
