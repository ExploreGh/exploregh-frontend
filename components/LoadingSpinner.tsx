import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

type LoadingSpinnerProps = {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
};

export default function LoadingSpinner({
  message = 'Loading...',
  size = 'large',
  color = '#006B3F',
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
    color: '#666',
    textAlign: 'center',
  },
});