import { Modal, View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';

type AppModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: 'default' | 'danger';
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export default function AppModal({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  icon = 'information-circle-outline',
  variant = 'default',
  loading = false,
  onConfirm,
  onClose,
}: AppModalProps) {
  const isDanger = variant === 'danger';
  const accentColor = isDanger ? Colors.red : Colors.forest;
  const accentBackground = isDanger ? Colors.redSoft : Colors.forestSoft;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.backdrop}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Close dialog"
      >
        <Pressable
          style={styles.modalCard}
          onPress={(event) => event.stopPropagation()}
          accessibilityViewIsModal
          accessibilityRole="alert"
        >
          <View style={[styles.iconCircle, { backgroundColor: accentBackground }]}>
            <Ionicons name={icon} size={28} color={accentColor} />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [styles.cancelButton, pressed && styles.pressedButton]}
              onPress={onClose}
              disabled={loading}
              accessibilityRole="button"
            >
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.confirmButton,
                { backgroundColor: accentColor },
                pressed && styles.pressedButton,
              ]}
              onPress={onConfirm}
              disabled={loading}
              accessibilityRole="button"
            >
              {loading ? (
                <ActivityIndicator size="small" color={isDanger ? Colors.white : Colors.gold} />
              ) : (
                <Text style={[styles.confirmText, isDanger && styles.dangerConfirmText]}>
                  {confirmLabel}
                </Text>
              )}
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(6, 32, 19, 0.62)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.ink,
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    lineHeight: 21,
    color: Colors.slate,
    textAlign: 'center',
    marginBottom: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  cancelText: {
    color: Colors.slate,
    fontSize: 14,
    fontWeight: '800',
  },
  confirmButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    color: Colors.gold,
    fontSize: 14,
    fontWeight: '800',
  },
  dangerConfirmText: { color: Colors.white },
  pressedButton: { opacity: 0.82 },
});
