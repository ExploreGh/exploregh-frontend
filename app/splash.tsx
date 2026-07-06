import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Colors } from '@/constants/theme';
import { KenteStrip } from '@/components';

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
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

      <View style={styles.bottomContainer}>
        <ActivityIndicator size="large" color={Colors.gold} />
        <Text style={styles.loadingText}>Loading your experience...</Text>
      </View>

      <Text style={styles.footer}>Made with love for Ghana</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.forest,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 80,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 130,
    height: 130,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '800',
    color: Colors.gold,
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  stripWrap: {
    width: 160,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 14,
  },
  tagline: {
    fontSize: 15,
    color: Colors.white,
    opacity: 0.9,
  },
  bottomContainer: {
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 13,
    color: Colors.white,
    opacity: 0.7,
  },
  footer: {
    fontSize: 12,
    color: Colors.white,
    opacity: 0.55,
  },
});
