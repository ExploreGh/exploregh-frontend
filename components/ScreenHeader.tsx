import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import KenteStrip from './KenteStrip';

// ============================================================
// ScreenHeader — the consistent green header for inner screens.
// Shows a back arrow, a title, an optional subtitle, and the
// signature KenteStrip along the bottom edge.
// ============================================================

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  color?: string; // override for special screens (e.g. red for emergencies)
};

export default function ScreenHeader({
  title,
  subtitle,
  showBack = true,
  color = Colors.forest,
}: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <View>
      <View style={[styles.header, { backgroundColor: color }]}>
        <View style={styles.row}>
          {showBack ? (
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} color={Colors.white} />
            </TouchableOpacity>
          ) : (
            <View style={styles.backButton} />
          )}
          <View style={styles.titleWrap}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          <View style={styles.backButton} />
        </View>
      </View>
      <KenteStrip />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 56,
    paddingBottom: 18,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: Colors.gold,
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  subtitle: {
    color: Colors.white,
    fontSize: 12,
    opacity: 0.85,
    marginTop: 2,
  },
});
