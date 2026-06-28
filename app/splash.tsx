import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>

      {/* Logo */}
<View style={styles.logoContainer}>
  <Image
    source={require('../assets/images/explore_main_no_bg.png')}
    style={styles.logo}
    resizeMode="contain"
  />
  <Text style={styles.logoText}>ExploreGH</Text>
  <Text style={styles.tagline}>Discover the beauty of Ghana</Text>
</View>

      {/* Loading Indicator */}
      <View style={styles.bottomContainer}>
        <ActivityIndicator size="large" color="#FCD20F" />
        <Text style={styles.loadingText}>Loading your experience...</Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>🇬🇭 Made with love for Ghana</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006B3F',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 80,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  logo: {
  width: 150,
  height: 150,
  marginBottom: 20,
},
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FCD20F',
    letterSpacing: 2,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  bottomContainer: {
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.7,
  },
  footer: {
    fontSize: 13,
    color: '#ffffff',
    opacity: 0.6,
  },
});