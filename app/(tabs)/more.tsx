import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '@/context/ProfileContext';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { AppModal, Avatar } from '@/components';
import { AkwaabaPhrasebookIcon, TrotroTripIcon } from '@/components/GhanaFeatureIcons';

// ============================================================
// More — profile card with initials avatar, and a menu of
// all extra features using proper icons in tinted circles.
// ============================================================

type MenuItem = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  customIcon?: 'trip' | 'phrasebook';
  route: string;
  color: string;
  bg: string;
};

const travelTools: MenuItem[] = [
  {
    id: '1',
    title: 'Trip Planner',
    description: 'Plan your Ghana itinerary',
    icon: 'calendar-outline',
    customIcon: 'trip',
    route: '/trip-planner',
    color: Colors.forest,
    bg: Colors.forestSoft,
  },
  {
    id: '4',
    title: 'Phrasebook',
    description: 'Essential phrases in Twi, Ga, Ewe & Hausa',
    icon: 'chatbubbles-outline',
    customIcon: 'phrasebook',
    route: '/phrasebook',
    color: Colors.forest,
    bg: Colors.forestSoft,
  },
];

const supportTools: MenuItem[] = [
  {
    id: '2',
    title: 'Safety Alerts',
    description: 'Community safety updates',
    icon: 'warning-outline',
    route: '/safety-alerts',
    color: Colors.red,
    bg: Colors.redSoft,
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
];

export default function More() {
  const router = useRouter();
  const { profile, clearProfile } = useProfile();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    clearProfile();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>YOUR GHANA COMPANION</Text>
        <Text style={styles.headerTitle}>Your ExploreGH</Text>
        <Text style={styles.headerSubtitle}>Travel tools, support and your account</Text>
      </View>

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

        <Text style={styles.sectionTitle}>Travel tools</Text>
        <View style={styles.quickTools}>
          {travelTools.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.quickTool}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.85}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.bg }]}>
                {item.customIcon === 'trip' ? (
                  <TrotroTripIcon size={22} color={item.color} />
                ) : item.customIcon === 'phrasebook' ? (
                  <AkwaabaPhrasebookIcon size={22} color={item.color} />
                ) : (
                  <Ionicons name={item.icon} size={20} color={item.color} />
                )}
              </View>
              <View style={styles.quickToolInfo}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>Safety & support</Text>
        <View style={styles.menuList}>
          {supportTools.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, item.id === '6' && styles.emergencyItem]}
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

        <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>Account</Text>
        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setShowLogoutModal(true)}
          activeOpacity={0.85}
        >
          <Ionicons name="log-out-outline" size={18} color={Colors.red} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <View style={{ height: 108 }} />
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
  container: {
    flex: 1,
    backgroundColor: Colors.mist,
  },
  header: {
    backgroundColor: Colors.mist,
    paddingTop: 58,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  eyebrow: {
    color: Colors.forest,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.ink,
  },
  headerSubtitle: {
    fontSize: 13,
    color: Colors.slate,
    marginTop: 3,
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
  sectionTitleSpaced: {
    marginTop: 22,
  },
  quickTools: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
  },
  quickTool: {
    flex: 1,
    minHeight: 146,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
  quickToolInfo: {
    marginTop: 14,
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
  emergencyItem: {
    borderColor: '#F1C9CC',
    backgroundColor: '#FFFDFD',
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
