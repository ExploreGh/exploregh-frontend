import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '@/context/ProfileContext';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { Avatar, KenteStrip } from '@/components';

// ============================================================
// More — profile card with initials avatar, and a menu of
// all extra features using proper icons in tinted circles.
// ============================================================

type MenuItem = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  color: string;
  bg: string;
};

const menuItems: MenuItem[] = [
  {
    id: '1',
    title: 'Trip Planner',
    description: 'Plan your Ghana itinerary',
    icon: 'calendar-outline',
    route: '/trip-planner',
    color: Colors.forest,
    bg: Colors.forestSoft,
  },
  {
    id: '2',
    title: 'Safety Alerts',
    description: 'Real-time safety updates',
    icon: 'warning-outline',
    route: '/safety-alerts',
    color: Colors.red,
    bg: Colors.redSoft,
  },
  {
    id: '3',
    title: 'Cultural Guide',
    description: 'Customs and etiquette by region',
    icon: 'people-circle-outline',
    route: '/cultural-guide',
    color: Colors.forest,
    bg: Colors.forestSoft,
  },
  {
    id: '4',
    title: 'Phrasebook',
    description: 'Essential phrases in Twi, Ga, Ewe & Hausa',
    icon: 'chatbubbles-outline',
    route: '/phrasebook',
    color: Colors.forest,
    bg: Colors.forestSoft,
  },
  {
    id: '5',
    title: 'Festivals & Events',
    description: 'Upcoming Ghanaian festivals',
    icon: 'musical-notes-outline',
    route: '/festivals',
    color: Colors.forest,
    bg: Colors.goldSoft,
  },
  {
    id: '6',
    title: 'Emergency Contacts',
    description: 'Police, hospitals and embassies',
    icon: 'call-outline',
    route: '/emergency-contacts',
    color: Colors.red,
    bg: Colors.redSoft,
  },
  {
    id: '7',
    title: 'Currency Converter',
    description: 'Coming soon — live exchange rates',
    icon: 'swap-horizontal-outline',
    route: '/coming-soon',
    color: Colors.slate,
    bg: Colors.mist,
  },
];

export default function More() {
  const router = useRouter();
  const { profile } = useProfile();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
        <Text style={styles.headerSubtitle}>All ExploreGH features</Text>
      </View>
      <KenteStrip />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile card */}
        <View style={styles.profileCard}>
          <Avatar name={profile.name} size={54} />
<View style={styles.profileInfo}>
  <Text style={styles.profileName}>{profile.name}</Text>
  <Text style={styles.profileEmail}>{profile.email}</Text>
</View>
          <TouchableOpacity
  style={styles.editButton}
  activeOpacity={0.85}
  onPress={() => router.push('/edit-profile')}>
            <Ionicons name="pencil-outline" size={14} color={Colors.gold} />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Menu */}
        <Text style={styles.sectionTitle}>Features</Text>
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

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.push('/')}
          activeOpacity={0.85}
        >
          <Ionicons name="log-out-outline" size={18} color={Colors.red} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mist,
  },
  header: {
    backgroundColor: Colors.forest,
    paddingTop: 58,
    paddingBottom: 18,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.gold,
  },
  headerSubtitle: {
    fontSize: 13,
    color: Colors.white,
    marginTop: 3,
    opacity: 0.9,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: Radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 13,
    color: Colors.slate,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.forest,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: Radius.pill,
  },
  editText: {
    color: Colors.gold,
    fontWeight: '700',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.ink,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  menuList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: 13,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 12,
    color: Colors.slate,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    margin: 16,
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: Radius.pill,
    borderWidth: 2,
    borderColor: Colors.red,
  },
  logoutText: {
    color: Colors.red,
    fontSize: 15,
    fontWeight: '800',
  },
});
