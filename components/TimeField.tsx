import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';

type TimeFieldProps = {
  value: string;
  selectedDate: Date | null;
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (time: string) => void;
};

const timeSlots = Array.from({ length: 21 }, (_, index) => {
  const totalMinutes = 8 * 60 + index * 30;
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return {
    value: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
    label: `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`,
    hour,
    minute,
  };
});

export const formatDisplayTime = (value: string) =>
  timeSlots.find((slot) => slot.value === value)?.label || value;

export default function TimeField({
  value,
  selectedDate,
  visible,
  onOpen,
  onClose,
  onSelect,
}: TimeFieldProps) {
  const now = new Date();
  const isToday =
    selectedDate?.getFullYear() === now.getFullYear() &&
    selectedDate?.getMonth() === now.getMonth() &&
    selectedDate?.getDate() === now.getDate();

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.field,
          !selectedDate && styles.fieldDisabled,
          pressed && selectedDate && styles.pressed,
        ]}
        onPress={onOpen}
        disabled={!selectedDate}
        accessibilityRole="button"
        accessibilityState={{ disabled: !selectedDate }}
        accessibilityLabel={
          value ? `Preferred time, ${formatDisplayTime(value)}` : 'Choose preferred time'
        }
        accessibilityHint={
          selectedDate ? 'Opens available time slots' : 'Choose a date first'
        }
      >
        <Ionicons
          name="time-outline"
          size={18}
          color={selectedDate ? Colors.slate : Colors.line}
        />
        <Text
          style={[
            styles.fieldText,
            !value && styles.placeholder,
            !selectedDate && styles.disabledText,
          ]}
        >
          {value
            ? formatDisplayTime(value)
            : selectedDate
              ? 'Choose a time'
              : 'Choose a date first'}
        </Text>
        <Ionicons
          name="chevron-down"
          size={18}
          color={selectedDate ? Colors.slate : Colors.line}
        />
      </Pressable>

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
                <Text style={styles.eyebrow}>Available slots</Text>
                <Text style={styles.title}>Choose a time</Text>
              </View>
              <Pressable
                style={styles.closeButton}
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="Close time picker"
              >
                <Ionicons name="close" size={20} color={Colors.forestDark} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.slotGrid}>
                {timeSlots.map((slot) => {
                  const slotDate = selectedDate
                    ? new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        selectedDate.getDate(),
                        slot.hour,
                        slot.minute
                      )
                    : null;
                  const disabled = Boolean(isToday && slotDate && slotDate <= now);
                  const selected = slot.value === value;

                  return (
                    <Pressable
                      key={slot.value}
                      style={({ pressed }) => [
                        styles.slot,
                        selected && styles.slotSelected,
                        disabled && styles.slotDisabled,
                        pressed && !disabled && styles.pressed,
                      ]}
                      disabled={disabled}
                      onPress={() => {
                        onSelect(slot.value);
                        onClose();
                      }}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: selected, disabled }}
                    >
                      <Text
                        style={[
                          styles.slotText,
                          selected && styles.slotTextSelected,
                          disabled && styles.slotTextDisabled,
                        ]}
                      >
                        {slot.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <View style={styles.note}>
                <Ionicons name="sunny-outline" size={16} color={Colors.forest} />
                <Text style={styles.noteText}>
                  Booking times are available from 8:00 AM to 6:00 PM.
                </Text>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
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
    marginBottom: 20,
  },
  fieldDisabled: { backgroundColor: Colors.white },
  fieldText: { flex: 1, fontSize: 15, color: Colors.ink },
  placeholder: { color: Colors.slate },
  disabledText: { color: Colors.line },
  pressed: { opacity: 0.78 },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(6, 32, 19, 0.58)',
  },
  sheet: {
    maxHeight: '78%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
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
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  slot: {
    width: '31%',
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.mist,
  },
  slotSelected: { backgroundColor: Colors.forest, borderColor: Colors.forest },
  slotDisabled: { backgroundColor: Colors.white },
  slotText: { color: Colors.ink, fontSize: 13, fontWeight: '700' },
  slotTextSelected: { color: Colors.gold, fontWeight: '800' },
  slotTextDisabled: { color: Colors.line },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: Colors.forestSoft,
    borderRadius: Radius.md,
    padding: 11,
    marginTop: 18,
  },
  noteText: { flex: 1, color: Colors.forestDark, fontSize: 12, fontWeight: '600' },
});
