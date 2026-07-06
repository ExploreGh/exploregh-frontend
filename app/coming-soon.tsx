import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius } from '@/constants/theme';

export default function ComingSoon() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="construct-outline" size={44} color={Colors.gold} />
      </View>
      <Text style={styles.title}>Coming soon</Text>
      <Text style={styles.subtitle}>
        This feature will be available once our live services are connected. Check back shortly!
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={16} color={Colors.forestDark} />
        <Text style={styles.buttonText}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 26,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: Colors.gold,
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 23,
    opacity: 0.9,
    marginBottom: 38,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.gold,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: Radius.pill,
  },
  buttonText: {
    color: Colors.forestDark,
    fontSize: 15,
    fontWeight: '800',
  },
});
