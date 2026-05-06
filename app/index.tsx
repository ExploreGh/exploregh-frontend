import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo Area */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoIcon}>🌍</Text>
        <Text style={styles.logoText}>ExploreGH</Text>
        <Text style={styles.tagline}>Discover the beauty of Ghana</Text>
      </View>

      {/* Bottom Area */}
      <View style={styles.bottomContainer}>
        <Text style={styles.welcomeText}>
          Your gateway to Ghana's hidden gems, local guides, and unforgettable experiences.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/register')}>
          <Text style={styles.buttonText}>Get Started 🇬🇭</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.loginText}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006B3F',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FCD20F',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 8,
    opacity: 0.9,
  },
  bottomContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 32,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#FCD20F',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  loginText: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
});