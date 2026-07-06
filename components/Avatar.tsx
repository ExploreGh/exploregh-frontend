import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

// ============================================================
// Avatar — circular badge showing a person's initials.
// Used on the More tab profile card and anywhere we need
// a user picture before real photos exist.
// ============================================================

type AvatarProps = {
  name: string;
  size?: number;
};

export default function Avatar({ name, size = 52 }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.36 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.forestDark,
  },
  initials: {
    fontWeight: '800',
    color: Colors.forestDark,
    letterSpacing: 0.5,
  },
});
