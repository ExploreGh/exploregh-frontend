import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { Button, CalendarField, TimeField } from '@/components';
import { formatDisplayDate } from '@/components/CalendarField';
import { formatDisplayTime } from '@/components/TimeField';

const groupSizes = ['1', '2', '3', '4', '5+'];

export default function Booking() {
  const router = useRouter();
  const { name, photo, price } = useLocalSearchParams();

  const [date, setDate] = useState<Date | null>(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [time, setTime] = useState('');
  const [timeVisible, setTimeVisible] = useState(false);
  const [groupSize, setGroupSize] = useState('1');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
const [status, setStatus] = useState<'pending' | 'accepted'>('pending');

  const displayName = (name as string) || 'Your guide';
  const displayDate = date ? formatDisplayDate(date) : '';
  const displayDateTime = time
    ? `${displayDate} at ${formatDisplayTime(time)}`
    : displayDate;

  const handleConfirm = () => {
    if (!date || !time) return;
    setSubmitted(true);
  };

  if (submitted) {
  return (
    <View style={styles.confirmContainer}>
      {status === 'pending' ? (
        <>
          <View style={[styles.confirmIcon, { backgroundColor: Colors.goldSoft }]}>
            <Ionicons name="time-outline" size={64} color={Colors.gold} />
          </View>
          <Text style={styles.confirmTitle}>Booking request sent</Text>
          <Text style={styles.confirmSubtitle}>
            Waiting for {displayName} to accept your request for {displayDateTime}. You'll get a
            notification the moment they respond — Message and Call unlock once accepted.
          </Text>

          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => setStatus('accepted')}
          >
            <Ionicons name="play-outline" size={14} color={Colors.slate} />
            <Text style={styles.demoButtonText}>
              Demo only — preview what happens once accepted
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.confirmIcon}>
            <Ionicons name="checkmark-circle" size={64} color={Colors.forest} />
          </View>
          <Text style={styles.confirmTitle}>Booking accepted!</Text>
          <Text style={styles.confirmSubtitle}>
            {displayName} confirmed your booking for {displayDateTime}. You can now message or call each
            other directly.
          </Text>

          <View style={styles.contactRow}>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() =>
                router.push({
                  pathname: '/chat',
                  params: {
                    name: displayName,
                    photo: photo as string,
                    role: 'Tour Guide',
                    context: 'Booking confirmed',
                    price: displayDateTime,
                  },
                })
              }
            >
              <Ionicons name="chatbubble-outline" size={18} color={Colors.forest} />
              <Text style={styles.contactButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => Linking.openURL('tel:+233200000000')}
            >
              <Ionicons name="call-outline" size={18} color={Colors.forest} />
              <Text style={styles.contactButtonText}>Call</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Button title="Back to guides" icon="arrow-back" onPress={() => router.replace('/(tabs)/guides')} />
    </View>
  );
}

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        showsVerticalScrollIndicator={false}
      >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color={Colors.forestDark} />
      </TouchableOpacity>

      <Text style={styles.title}>Confirm booking</Text>

      <View style={styles.guideCard}>
        {photo ? (
          <Image source={{ uri: photo as string }} style={styles.guidePhoto} />
        ) : (
          <View style={styles.guidePhotoFallback}>
            <Ionicons name="person" size={20} color={Colors.forest} />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.guideName}>{displayName}</Text>
          {price ? <Text style={styles.guidePrice}>{price}</Text> : null}
        </View>
      </View>

      <Text style={styles.label}>Preferred date</Text>
      <CalendarField
        value={date}
        visible={calendarVisible}
        onOpen={() => setCalendarVisible(true)}
        onClose={() => setCalendarVisible(false)}
        onSelect={(selectedDate) => {
          setDate(selectedDate);
          setTime('');
        }}
        onClear={() => {
          setDate(null);
          setTime('');
        }}
      />

      <Text style={styles.label}>Preferred time</Text>
      <TimeField
        value={time}
        selectedDate={date}
        visible={timeVisible}
        onOpen={() => setTimeVisible(true)}
        onClose={() => setTimeVisible(false)}
        onSelect={setTime}
        onClear={() => setTime('')}
      />

      <Text style={styles.label}>Group size</Text>
      <View style={styles.sizeRow}>
        {groupSizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={[styles.sizeChip, groupSize === size && styles.sizeChipActive]}
            onPress={() => setGroupSize(size)}
          >
            <Text style={[styles.sizeText, groupSize === size && styles.sizeTextActive]}>
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Note (optional)</Text>
      <View style={[styles.inputWrap, styles.noteWrap]}>
        <TextInput
          style={[styles.input, styles.noteInput]}
          placeholder="Anything your guide should know..."
          placeholderTextColor={Colors.slate}
          value={note}
          onChangeText={setNote}
          multiline
        />
      </View>

      <View style={styles.summaryCard}>
        <Ionicons name="information-circle-outline" size={16} color={Colors.forestDark} />
        <Text style={styles.summaryText}>
          This sends a booking request - {displayName} confirms availability before it's final.
        </Text>
      </View>

      <Button
        title="Confirm booking"
        icon="checkmark-circle-outline"
        onPress={handleConfirm}
        disabled={!date || !time}
      />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 48 },
  backButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.mist,
    alignItems: 'center', justifyContent: 'center', marginBottom: 18,
  },
  title: { fontSize: 26, fontWeight: '800', color: Colors.forestDark, marginBottom: 20 },
  guideCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.forestSoft,
    borderRadius: Radius.lg, padding: 14, marginBottom: 24,
  },
  guidePhoto: { width: 48, height: 48, borderRadius: 24 },
  guidePhotoFallback: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
  guideName: { fontSize: 15, fontWeight: '800', color: Colors.ink },
  guidePrice: { fontSize: 12, color: Colors.forest, fontWeight: '700', marginTop: 2 },
  label: {
    fontSize: 12, fontWeight: '800', color: Colors.slate, textTransform: 'uppercase',
    letterSpacing: 0.6, marginBottom: 8, marginTop: 4,
  },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Colors.mist,
    borderRadius: Radius.md, paddingVertical: 14, paddingHorizontal: 14,
    borderWidth: 1, borderColor: Colors.line, marginBottom: 20,
  },
  input: { flex: 1, fontSize: 15, color: Colors.ink },
  sizeRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  sizeChip: {
    flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: Radius.md,
    backgroundColor: Colors.mist, borderWidth: 1, borderColor: Colors.line,
  },
  sizeChipActive: { backgroundColor: Colors.forest, borderColor: Colors.forest },
  sizeText: { fontSize: 13, fontWeight: '700', color: Colors.slate },
  sizeTextActive: { color: Colors.gold },
  noteWrap: { alignItems: 'flex-start' },
  noteInput: { minHeight: 60 },
  summaryCard: {
    flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.goldSoft,
    borderRadius: Radius.md, padding: 12, marginBottom: 24,
  },
  summaryText: { flex: 1, fontSize: 12, color: Colors.ink, lineHeight: 17 },
  contactRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  contactButton: {
    flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.forestSoft,
    paddingVertical: 12, paddingHorizontal: 20, borderRadius: Radius.pill,
  },
  contactButtonText: { color: Colors.forest, fontWeight: '700', fontSize: 13 },
  confirmContainer: {
    flex: 1, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 32, gap: 8,
  },
  demoButton: {
  flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20,
  paddingVertical: 8, paddingHorizontal: 14, borderRadius: Radius.pill,
  backgroundColor: Colors.mist, borderWidth: 1, borderColor: Colors.line,
},
demoButtonText: { fontSize: 11, color: Colors.slate, fontWeight: '600' },
  confirmIcon: {
    width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.forestSoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  confirmTitle: { fontSize: 24, fontWeight: '800', color: Colors.forestDark, textAlign: 'center' },
  confirmSubtitle: {
    fontSize: 14, color: Colors.slate, textAlign: 'center', lineHeight: 21, marginBottom: 28,
  },
});
