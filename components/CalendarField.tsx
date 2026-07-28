import { useEffect, useMemo, useState } from 'react';
import { Keyboard, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';

type CalendarFieldProps = {
  value: Date | null;
  visible: boolean;
  minimumDate?: Date;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (date: Date) => void;
  onClear?: () => void;
};

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const formatDisplayDate = (date: Date) =>
  date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default function CalendarField({
  value,
  visible,
  minimumDate = new Date(),
  onOpen,
  onClose,
  onSelect,
  onClear,
}: CalendarFieldProps) {
  const minimum = startOfDay(minimumDate);
  const [shownMonth, setShownMonth] = useState(
    new Date((value || minimum).getFullYear(), (value || minimum).getMonth(), 1)
  );

  useEffect(() => {
    if (visible) {
      const startingDate = value || minimum;
      setShownMonth(new Date(startingDate.getFullYear(), startingDate.getMonth(), 1));
    }
  }, [visible]);

  const days = useMemo(() => {
    const firstWeekDay = shownMonth.getDay();
    const numberOfDays = new Date(
      shownMonth.getFullYear(),
      shownMonth.getMonth() + 1,
      0
    ).getDate();
    return [
      ...Array.from({ length: firstWeekDay }, () => null),
      ...Array.from({ length: numberOfDays }, (_, index) => index + 1),
    ];
  }, [shownMonth]);

  const previousMonthAllowed =
    shownMonth.getFullYear() > minimum.getFullYear() ||
    (shownMonth.getFullYear() === minimum.getFullYear() &&
      shownMonth.getMonth() > minimum.getMonth());

  const moveMonth = (amount: number) => {
    setShownMonth(
      new Date(shownMonth.getFullYear(), shownMonth.getMonth() + amount, 1)
    );
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.field, pressed && styles.pressed]}
        onPress={() => {
          Keyboard.dismiss();
          onOpen();
        }}
        accessibilityRole="button"
        accessibilityLabel={
          value ? `Preferred date, ${formatDisplayDate(value)}` : 'Choose preferred date'
        }
        accessibilityHint="Opens the calendar"
      >
        <Ionicons name="calendar-outline" size={18} color={Colors.slate} />
        <Text style={[styles.fieldText, !value && styles.placeholder]}>
          {value ? formatDisplayDate(value) : 'Choose a date'}
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
            accessibilityLabel="Clear preferred date"
          >
            <Ionicons name="close-circle" size={19} color={Colors.slate} />
          </Pressable>
        ) : (
          <Ionicons name="chevron-down" size={18} color={Colors.slate} />
        )}
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
            <View style={styles.titleRow}>
              <View>
                <Text style={styles.eyebrow}>Plan your visit</Text>
                <Text style={styles.title}>Choose a date</Text>
              </View>
              <Pressable
                style={styles.closeButton}
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="Close calendar"
              >
                <Ionicons name="close" size={20} color={Colors.forestDark} />
              </Pressable>
            </View>

            <View style={styles.monthRow}>
              <Pressable
                style={[styles.navButton, !previousMonthAllowed && styles.navButtonDisabled]}
                onPress={() => moveMonth(-1)}
                disabled={!previousMonthAllowed}
                accessibilityRole="button"
                accessibilityLabel="Previous month"
              >
                <Ionicons
                  name="chevron-back"
                  size={20}
                  color={previousMonthAllowed ? Colors.forestDark : Colors.line}
                />
              </Pressable>
              <Text style={styles.monthText}>
                {shownMonth.toLocaleDateString('en-GB', {
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
              <Pressable
                style={styles.navButton}
                onPress={() => moveMonth(1)}
                accessibilityRole="button"
                accessibilityLabel="Next month"
              >
                <Ionicons name="chevron-forward" size={20} color={Colors.forestDark} />
              </Pressable>
            </View>

            <View style={styles.calendarGrid}>
              {weekDays.map((day) => (
                <View key={day} style={styles.dayCell}>
                  <Text style={styles.weekDay}>{day}</Text>
                </View>
              ))}
              {days.map((day, index) => {
                if (!day) return <View key={`empty-${index}`} style={styles.dayCell} />;

                const date = new Date(
                  shownMonth.getFullYear(),
                  shownMonth.getMonth(),
                  day
                );
                const disabled = date < minimum;
                const selected =
                  value?.getFullYear() === date.getFullYear() &&
                  value?.getMonth() === date.getMonth() &&
                  value?.getDate() === date.getDate();

                return (
                  <View key={date.toISOString()} style={styles.dayCell}>
                    <Pressable
                      style={({ pressed }) => [
                        styles.dayButton,
                        selected && styles.daySelected,
                        pressed && !disabled && styles.pressed,
                      ]}
                      disabled={disabled}
                      onPress={() => {
                        onSelect(date);
                        onClose();
                      }}
                      accessibilityRole="button"
                      accessibilityState={{ disabled, selected }}
                      accessibilityLabel={formatDisplayDate(date)}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          disabled && styles.dayDisabled,
                          selected && styles.dayTextSelected,
                        ]}
                      >
                        {day}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>

            <View style={styles.todayNote}>
              <Ionicons name="information-circle-outline" size={16} color={Colors.forest} />
              <Text style={styles.todayNoteText}>Past dates cannot be selected.</Text>
            </View>
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
  fieldText: { flex: 1, fontSize: 15, color: Colors.ink },
  placeholder: { color: Colors.slate },
  clearButton: { padding: 2 },
  pressed: { opacity: 0.78 },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(6, 32, 19, 0.58)',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 28,
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
  titleRow: {
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
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  monthText: { color: Colors.ink, fontSize: 16, fontWeight: '800' },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.forestSoft,
  },
  navButtonDisabled: { backgroundColor: Colors.mist },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: {
    width: '14.2857%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDay: {
    color: Colors.slate,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  dayButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daySelected: { backgroundColor: Colors.forest },
  dayText: { color: Colors.ink, fontSize: 14, fontWeight: '700' },
  dayDisabled: { color: Colors.line },
  dayTextSelected: { color: Colors.gold, fontWeight: '800' },
  todayNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: Colors.forestSoft,
    borderRadius: Radius.md,
    padding: 11,
    marginTop: 14,
  },
  todayNoteText: { color: Colors.forestDark, fontSize: 12, fontWeight: '600' },
});
