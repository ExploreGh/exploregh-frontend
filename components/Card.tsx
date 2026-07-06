import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Shadow } from '@/constants/theme';

// ============================================================
// Card — the standard white rounded container used everywhere.
// ============================================================

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
});
