import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius } from '@/constants/theme';

// ============================================================
// Button — one button for the whole app.
// variant: 'primary' (green) | 'secondary' (gold) |
//          'outline' (green border) | 'danger' (red border)
// icon: optional Ionicons name shown before the title
// ============================================================

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
};

export default function Button({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
}: ButtonProps) {
  const textColor =
    variant === 'primary' ? Colors.gold
    : variant === 'secondary' ? Colors.forestDark
    : variant === 'danger' ? Colors.red
    : Colors.forest;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'outline' && styles.outline,
        variant === 'danger' && styles.danger,
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          {icon ? <Ionicons name={icon} size={18} color={textColor} /> : null}
          <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  primary: { backgroundColor: Colors.forest },
  secondary: { backgroundColor: Colors.gold },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.forest,
  },
  danger: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.red,
  },
  disabled: { opacity: 0.5 },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
