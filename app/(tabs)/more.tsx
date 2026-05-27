import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const menuItems = [
  {
    id: '1',
    title: 'Trip Planner',
    description: 'Plan your Ghana itinerary',
    emoji: '📅',
    route: '/trip-planner',
    color: '#006B3F',
  },
  {
    id: '2',
    title: 'Safety Alerts',
    description: 'Real-time safety updates',
    emoji: '⚠️',
    route: '/safety-alerts',
    color: '#cc0000',
  },
  {
    id: '3',
    title: 'Cultural Guide',
    description: 'Customs and etiquette by region',
    emoji: '🤝',
    route: '/cultural-guide',
    color: '#006B3F',
  },
  {
    id: '4',
    title: 'Phrasebook',
    description: 'Essential phrases in Twi, Ga, Ewe & Hausa',
    emoji: '🗣️',
    route: '/phrasebook',
    color: '#006B3F',
  },
  {
    id: '5',
    title: 'Emergency Contacts',
    description: 'Police, hospitals and embassies',
    emoji: '🚨',
    route: '/emergency-contacts',
    color: '#cc0000',
  },
{
    id: '7',
    title: 'Festivals & Events',
    description: 'Upcoming Ghanaian festivals and cultural events',
    emoji: '🎉',
    route: '/festivals',
    color: '#006B3F',
  },
  {
    id: '6',
    title: 'Currency Converter',
    description: 'Coming soon — live exchange rates',
    emoji: '💱',
    route: '/coming-soon',
    color: '#006B3F',
  },
];

export default function More() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More ☰</Text>
        <Text style={styles.headerSubtitle}>All ExploreGH features</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Text style={styles.profileEmoji}>👤</Text>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Explorer</Text>
          <Text style={styles.profileEmail}>tourist@exploregh.com</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={styles.menuList}>
        <Text style={styles.sectionTitle}>Features</Text>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => router.push(item.route as any)}
          >
            <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
              <Text style={styles.menuEmoji}>{item.emoji}</Text>
            </View>
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/')}>
        <Text style={styles.logoutText}>🚪 Log Out</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#006B3F',
    padding: 24,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FCD20F',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  profileEmoji: {
    fontSize: 40,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 13,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#006B3F',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#FCD20F',
    fontWeight: 'bold',
    fontSize: 13,
  },
  menuList: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    gap: 12,
  },
  menuIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuEmoji: {
    fontSize: 22,
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 12,
    color: '#666',
  },
  menuArrow: {
    fontSize: 18,
    color: '#006B3F',
    fontWeight: 'bold',
  },
  logoutButton: {
    margin: 16,
    marginTop: 8,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#cc0000',
    marginBottom: 32,
  },
  logoutText: {
    color: '#cc0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});