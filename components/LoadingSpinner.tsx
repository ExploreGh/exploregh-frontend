import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/theme';

// ============================================================
// LoadingSpinner — shown while waiting for data (backend later).
// ============================================================

type LoadingSpinnerProps = {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
};

export default function LoadingSpinner({
  message = 'Loading...',
  size = 'large',
  color = Colors.forest,
}: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.slate,
    textAlign: 'center',
  },
});
