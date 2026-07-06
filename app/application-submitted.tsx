import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius } from '@/constants/theme';
import { Button } from '@/components';

const steps = [
  'Our team reviews your application within 2–3 business days',
  'You receive an email notification once your account is approved',
  'Log in with your email and password to access your account',
];

export default function ApplicationSubmitted() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={64} color={Colors.forest} />
      </View>

      <Text style={styles.title}>Application submitted</Text>
      <Text style={styles.subtitle}>Thank you for joining ExploreGH</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>What happens next?</Text>
        {steps.map((step, index) => (
          <View key={index} style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <View style={styles.banner}>
        <Ionicons name="mail-unread-outline" size={18} color={Colors.forestDark} />
        <Text style={styles.bannerText}>
          Check your email inbox — including the spam folder — for our approval notification.
        </Text>
      </View>

      <Button title="Go to login" icon="log-in-outline" onPress={() => router.push('/login')} />

      <TouchableOpacity onPress={() => router.push('/')} style={styles.homeLink}>
        <Text style={styles.homeText}>Back to welcome screen</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 48,
    alignItems: 'center',
  },
  iconContainer: {
    width: 110,
    height: 110,
    backgroundColor: Colors.forestSoft,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.forestDark,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.slate,
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.mist,
    borderRadius: Radius.lg,
    padding: 20,
    width: '100%',
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.forest,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.ink,
    marginBottom: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    backgroundColor: Colors.forest,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: Colors.gold,
    fontWeight: '800',
    fontSize: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: Colors.slate,
    lineHeight: 20,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.goldSoft,
    padding: 14,
    borderRadius: Radius.md,
    width: '100%',
    marginBottom: 28,
  },
  bannerText: {
    flex: 1,
    fontSize: 13,
    color: Colors.ink,
    lineHeight: 19,
  },
  homeLink: {
    marginTop: 16,
    padding: 6,
  },
  homeText: {
    fontSize: 14,
    color: Colors.forest,
    fontWeight: '600',
  },
});
