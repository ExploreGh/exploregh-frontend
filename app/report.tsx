import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { Button } from '@/components';

type ReportType = 'safety' | 'listing';

const severities: { key: 'low' | 'medium' | 'high'; label: string; color: string }[] = [
  { key: 'low', label: 'Low', color: Colors.forest },
  { key: 'medium', label: 'Medium', color: '#D2571E' },
  { key: 'high', label: 'High', color: Colors.red },
];

export default function Report() {
  const router = useRouter();
  const [type, setType] = useState<ReportType>('safety');

  const [region, setRegion] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium');

  const [listingName, setListingName] = useState('');

  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (type === 'safety' && !region.trim()) {
      newErrors.region = 'Please enter a region or location';
    }
    if (type === 'listing' && !listingName.trim()) {
      newErrors.listingName = 'Please enter the vendor or guide name';
    }
    if (!description.trim()) {
      newErrors.description = 'Please describe what happened';
    } else if (description.trim().length < 15) {
      newErrors.description = 'Please add a bit more detail (at least 15 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <View style={styles.confirmContainer}>
        <View style={styles.confirmIcon}>
          <Ionicons name="checkmark-circle" size={64} color={Colors.forest} />
        </View>
        <Text style={styles.confirmTitle}>Report submitted</Text>
        <Text style={styles.confirmSubtitle}>
          Thank you for helping keep ExploreGH safe. Our team reviews every report and will follow
          up if we need more details.
        </Text>
        <Button title="Back to safety alerts" icon="arrow-back" onPress={() => router.replace('/safety-alerts')} />
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

      <Text style={styles.title}>Report an issue</Text>
      <Text style={styles.subtitle}>Help us keep ExploreGH safe and trustworthy</Text>

      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[styles.typeButton, type === 'safety' && styles.typeButtonActive]}
          onPress={() => setType('safety')}
        >
          <Ionicons
            name="warning-outline"
            size={20}
            color={type === 'safety' ? Colors.red : Colors.slate}
          />
          <Text style={[styles.typeText, type === 'safety' && styles.typeTextActiveSafety]}>
            Safety issue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === 'listing' && styles.typeButtonActive]}
          onPress={() => setType('listing')}
        >
          <Ionicons
            name="flag-outline"
            size={20}
            color={type === 'listing' ? Colors.forest : Colors.slate}
          />
          <Text style={[styles.typeText, type === 'listing' && styles.typeTextActiveListing]}>
            Vendor / Guide
          </Text>
        </TouchableOpacity>
      </View>

      {type === 'safety' ? (
        <>
          <Text style={styles.label}>Region or location</Text>
          <View style={[styles.inputWrap, errors.region && styles.inputError]}>
            <Ionicons name="location-outline" size={18} color={Colors.slate} />
            <TextInput
              style={styles.input}
              placeholder="e.g. Kejetia Market, Kumasi"
              placeholderTextColor={Colors.slate}
              value={region}
              onChangeText={setRegion}
            />
          </View>
          {errors.region ? <Text style={styles.errorText}>{errors.region}</Text> : null}

          <Text style={styles.label}>Severity</Text>
          <View style={styles.severityRow}>
            {severities.map((s) => (
              <TouchableOpacity
                key={s.key}
                style={[
                  styles.severityChip,
                  severity === s.key && { backgroundColor: s.color, borderColor: s.color },
                ]}
                onPress={() => setSeverity(s.key)}
              >
                <Text
                  style={[
                    styles.severityText,
                    severity === s.key && styles.severityTextActive,
                  ]}
                >
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <>
          <Text style={styles.label}>Vendor or guide name</Text>
          <View style={[styles.inputWrap, errors.listingName && styles.inputError]}>
            <Ionicons name="person-outline" size={18} color={Colors.slate} />
            <TextInput
              style={styles.input}
              placeholder="e.g. Kwame Asante"
              placeholderTextColor={Colors.slate}
              value={listingName}
              onChangeText={setListingName}
            />
          </View>
          {errors.listingName ? <Text style={styles.errorText}>{errors.listingName}</Text> : null}
        </>
      )}

      <Text style={styles.label}>What happened?</Text>
      <View style={[styles.inputWrap, styles.descriptionWrap, errors.description && styles.inputError]}>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Describe what happened in as much detail as you can..."
          placeholderTextColor={Colors.slate}
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>
      {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}

      <View style={styles.privacyCard}>
        <Ionicons name="shield-checkmark-outline" size={16} color={Colors.forestDark} />
        <Text style={styles.privacyText}>
          Reports are reviewed by our safety team and kept confidential.
        </Text>
      </View>

      <Button title="Submit report" icon="paper-plane-outline" variant="danger" onPress={handleSubmit} />

      <View style={{ height: 24 }} />
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
  title: { fontSize: 26, fontWeight: '800', color: Colors.forestDark, marginBottom: 4 },
  subtitle: { fontSize: 14, color: Colors.slate, marginBottom: 22 },
  typeRow: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  typeButton: {
    flex: 1, alignItems: 'center', gap: 6, paddingVertical: 14, borderRadius: Radius.md,
    borderWidth: 1.5, borderColor: Colors.line, backgroundColor: Colors.mist,
  },
  typeButtonActive: { backgroundColor: Colors.white, ...Shadow.card },
  typeText: { fontSize: 12, fontWeight: '700', color: Colors.slate },
  typeTextActiveSafety: { color: Colors.red },
  typeTextActiveListing: { color: Colors.forest },
  label: {
    fontSize: 12, fontWeight: '800', color: Colors.slate, textTransform: 'uppercase',
    letterSpacing: 0.6, marginBottom: 8, marginTop: 4,
  },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Colors.mist,
    borderRadius: Radius.md, paddingVertical: 14, paddingHorizontal: 14,
    borderWidth: 1, borderColor: Colors.line, marginBottom: 6,
  },
  input: { flex: 1, fontSize: 15, color: Colors.ink },
  inputError: { borderColor: Colors.red, backgroundColor: Colors.redSoft },
  errorText: { color: Colors.red, fontSize: 13, marginBottom: 16, marginLeft: 4 },
  severityRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  severityChip: {
    flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: Radius.md,
    backgroundColor: Colors.mist, borderWidth: 1, borderColor: Colors.line,
  },
  severityText: { fontSize: 13, fontWeight: '700', color: Colors.slate },
  severityTextActive: { color: Colors.white },
  descriptionWrap: { alignItems: 'flex-start', marginBottom: 6 },
  descriptionInput: { minHeight: 90 },
  privacyCard: {
    flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.forestSoft,
    borderRadius: Radius.md, padding: 12, marginBottom: 24, marginTop: 10,
  },
  privacyText: { flex: 1, fontSize: 12, color: Colors.forestDark, lineHeight: 17 },
  confirmContainer: {
    flex: 1, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 32, gap: 8,
  },
  confirmIcon: {
    width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.forestSoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  confirmTitle: { fontSize: 24, fontWeight: '800', color: Colors.forestDark, textAlign: 'center' },
  confirmSubtitle: {
    fontSize: 14, color: Colors.slate, textAlign: 'center', lineHeight: 21, marginBottom: 28,
  },
});
