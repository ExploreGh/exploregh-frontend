import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ApplicationSubmitted() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Success Icon */}
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🎉</Text>
      </View>

      {/* Message */}
      <Text style={styles.title}>Application Submitted!</Text>
      <Text style={styles.subtitle}>Thank you for joining ExploreGH</Text>

      {/* Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>What happens next?</Text>
        <View style={styles.step}>
          <Text style={styles.stepNumber}>1</Text>
          <Text style={styles.stepText}>Our team will review your application within 2-3 business days</Text>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepNumber}>2</Text>
          <Text style={styles.stepText}>You will receive an email notification once your account is approved</Text>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepNumber}>3</Text>
          <Text style={styles.stepText}>Once approved, log in with your email and password to access your account</Text>
        </View>
      </View>

      {/* Info Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          📧 Make sure to check your email inbox including your spam folder for our approval notification!
        </Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Go To Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/')}>
        <Text style={styles.homeText}>Back to Welcome Screen</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 80,
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#e8f5e9',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006B3F',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#006B3F',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
    backgroundColor: '#006B3F',
    borderRadius: 12,
    color: '#FCD20F',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 24,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  banner: {
    backgroundColor: '#fff9e6',
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FCD20F',
    width: '100%',
    marginBottom: 32,
  },
  bannerText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#006B3F',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FCD20F',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeText: {
    fontSize: 14,
    color: '#006B3F',
    textAlign: 'center',
  },
});