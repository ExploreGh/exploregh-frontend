import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Radius } from '@/constants/theme';
import { Button, KenteStrip } from '@/components';

// ============================================================
// Welcome screen — a real photo of Ghana as the backdrop with
// a dark overlay, the logo in a white circle, and gold CTA.
// ============================================================

export default function Welcome() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=70' }}
      style={styles.background}
    >
      {/* Dark overlay so text stays readable over the photo */}
      <View style={styles.overlay} />

      <View style={styles.content}>
        {/* Logo area */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.logoText}>ExploreGH</Text>
          <View style={styles.stripWrap}>
            <KenteStrip />
          </View>
          <Text style={styles.tagline}>Discover the beauty of Ghana</Text>
        </View>

        {/* Bottom area */}
        <View style={styles.bottomContainer}>
          <Text style={styles.welcomeText}>
            Your gateway to Ghana's hidden gems, verified local guides, and unforgettable
            experiences.
          </Text>

          <Button
            title="Get Started"
            icon="arrow-forward"
            variant="secondary"
            onPress={() => router.push('/register')}
          />

          <TouchableOpacity onPress={() => router.push('/login')} style={styles.loginLink}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginBold}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 61, 36, 0.82)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 70,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  logo: {
    width: 112,
    height: 112,
  },
  logoText: {
    fontSize: 44,
    fontWeight: '800',
    color: Colors.gold,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  stripWrap: {
    width: 140,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  tagline: {
    fontSize: 15,
    color: Colors.white,
    opacity: 0.92,
  },
  bottomContainer: {
    alignItems: 'center',
    gap: 4,
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.85,
    marginBottom: 26,
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  loginLink: {
    marginTop: 18,
    padding: 6,
  },
  loginText: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
  },
  loginBold: {
    fontWeight: '800',
    color: Colors.gold,
  },
});
