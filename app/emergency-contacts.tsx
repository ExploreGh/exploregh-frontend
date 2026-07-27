import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { ScreenHeader } from '@/components';
import { emergencyServices } from '@/data/mockData';

// ============================================================
// Emergency Contacts — category cards with coloured icon
// headers and tappable call rows.
// ============================================================

export default function EmergencyContacts() {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Emergency Contacts" subtitle="Help is one tap away" color={Colors.red} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Ionicons name="call-outline" size={18} color={Colors.ink} />
          <Text style={styles.bannerText}>
            Save these numbers before travelling — networks can be slow in remote areas.
          </Text>
        </View>

        <View style={styles.list}>
          {emergencyServices.map((service) => (
            <View key={service.id} style={styles.card}>
              <View style={[styles.cardHeader, { backgroundColor: service.color }]}>
                <Ionicons name={service.icon as any} size={18} color={Colors.white} />
                <Text style={styles.cardHeaderText}>{service.category}</Text>
              </View>
              <View style={styles.contacts}>
                {service.contacts.map((contact, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.contactRow}
                    activeOpacity={0.7}
                    onPress={() => Linking.openURL(`tel:${contact.number.replace(/\D/g, '')}`)}
                    accessibilityRole="button"
                    accessibilityLabel={`Call ${contact.name} at ${contact.number}`}
                  >
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactName}>{contact.name}</Text>
                    </View>
                    <View style={styles.numberBadge}>
                      <Ionicons name="call" size={13} color={Colors.forest} />
                      <Text style={styles.numberText}>{contact.number}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
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
    gap: 14,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  cardHeaderText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
  contacts: {
    padding: 6,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    paddingHorizontal: 10,
    gap: 10,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 14,
    color: Colors.ink,
    fontWeight: '600',
  },
  numberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.forestSoft,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Radius.pill,
  },
  numberText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.forest,
  },
});
