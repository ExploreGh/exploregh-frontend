import { Keyboard, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';

type SelectFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  icon: keyof typeof Ionicons.glyphMap;
  visible: boolean;
  error?: string;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (value: string) => void;
  onClear?: () => void;
};

export default function SelectField({
  label,
  placeholder,
  value,
  options,
  icon,
  visible,
  error,
  onOpen,
  onClose,
  onSelect,
  onClear,
}: SelectFieldProps) {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          styles.field,
          error ? styles.fieldError : null,
          pressed ? styles.pressed : null,
        ]}
        onPress={() => {
          Keyboard.dismiss();
          onOpen();
        }}
        accessibilityRole="button"
        accessibilityLabel={`${label}. ${value || placeholder}`}
        accessibilityHint="Opens a list of choices"
      >
        <Ionicons name={icon} size={18} color={Colors.slate} />
        <Text style={[styles.value, !value && styles.placeholder]} numberOfLines={1}>
          {value || placeholder}
        </Text>
        {value && onClear ? (
          <Pressable
            style={styles.clearButton}
            onPress={(event) => {
              event.stopPropagation();
              onClear();
            }}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Clear ${label}`}
          >
            <Ionicons name="close-circle" size={19} color={Colors.slate} />
          </Pressable>
        ) : (
          <Ionicons name="chevron-down" size={18} color={Colors.slate} />
        )}
      </Pressable>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={onClose}
      >
        <Pressable style={styles.backdrop} onPress={onClose}>
          <Pressable
            style={styles.sheet}
            onPress={(event) => event.stopPropagation()}
            accessibilityViewIsModal
          >
            <View style={styles.handle} />
            <View style={styles.header}>
              <View>
                <Text style={styles.eyebrow}>Choose one</Text>
                <Text style={styles.title}>{label}</Text>
              </View>
              <Pressable
                style={styles.closeButton}
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="Close choices"
              >
                <Ionicons name="close" size={20} color={Colors.forestDark} />
              </Pressable>
            </View>

            <ScrollView style={styles.options} showsVerticalScrollIndicator={false}>
              {options.map((option) => {
                const selected = option === value;
                return (
                  <Pressable
                    key={option}
                    style={({ pressed }) => [
                      styles.option,
                      selected && styles.optionSelected,
                      pressed && styles.pressed,
                    ]}
                    onPress={() => {
                      onSelect(option);
                      onClose();
                    }}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: selected }}
                  >
                    <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                      {option}
                    </Text>
                    {selected ? (
                      <Ionicons name="checkmark-circle" size={21} color={Colors.forest} />
                    ) : null}
                  </Pressable>
                );
              })}
              <View style={styles.bottomSpace} />
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    minHeight: 51,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.mist,
    borderRadius: Radius.md,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  fieldError: {
    borderColor: Colors.red,
    backgroundColor: Colors.redSoft,
  },
  value: { flex: 1, fontSize: 15, color: Colors.ink },
  placeholder: { color: Colors.slate },
  clearButton: { padding: 2 },
  errorText: { color: Colors.red, fontSize: 13, marginTop: 4, marginLeft: 4 },
  pressed: { opacity: 0.78 },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(6, 32, 19, 0.58)',
  },
  sheet: {
    maxHeight: '76%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 10,
    ...Shadow.card,
  },
  handle: {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.line,
    alignSelf: 'center',
    marginBottom: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  eyebrow: {
    color: Colors.forest,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: { color: Colors.forestDark, fontSize: 21, fontWeight: '800', marginTop: 2 },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mist,
  },
  options: { flexGrow: 0 },
  option: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderRadius: Radius.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.line,
  },
  optionSelected: { backgroundColor: Colors.forestSoft, borderBottomColor: Colors.forestSoft },
  optionText: { flex: 1, color: Colors.ink, fontSize: 15, fontWeight: '600' },
  optionTextSelected: { color: Colors.forestDark, fontWeight: '800' },
  bottomSpace: { height: 24 },
});
