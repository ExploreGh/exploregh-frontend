import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius } from '@/constants/theme';
import { Button, Avatar } from '@/components';
import { useProfile } from '@/context/ProfileContext';

export default function EditProfile() {
  const router = useRouter();
  const { profile, updateProfile } = useProfile();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Please enter your name';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      updateProfile({ name: name.trim(), email: email.trim() });
      router.back();
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color={Colors.forestDark} />
      </TouchableOpacity>

      <Text style={styles.title}>Edit profile</Text>

      <View style={styles.avatarRow}>
        <Avatar name={name || 'Explorer Guest'} size={72} />
      </View>

      <Text style={styles.label}>Full name</Text>
      <View style={[styles.inputWrap, errors.name && styles.inputError]}>
        <Ionicons name="person-outline" size={18} color={Colors.slate} />
        <TextInput
          style={styles.input}
          placeholder="Your name"
          placeholderTextColor={Colors.slate}
          value={name}
          onChangeText={setName}
        />
      </View>
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <Text style={styles.label}>Email address</Text>
      <View style={[styles.inputWrap, errors.email && styles.inputError]}>
        <Ionicons name="mail-outline" size={18} color={Colors.slate} />
        <TextInput
          style={styles.input}
          placeholder="Your email"
          placeholderTextColor={Colors.slate}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <Button title="Save changes" icon="checkmark-circle-outline" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 48 },
  backButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.mist,
    alignItems: 'center', justifyContent: 'center', marginBottom: 18,
  },
  title: { fontSize: 26, fontWeight: '800', color: Colors.forestDark, marginBottom: 24 },
  avatarRow: { alignItems: 'center', marginBottom: 28 },
  label: {
    fontSize: 12, fontWeight: '800', color: Colors.slate, textTransform: 'uppercase',
    letterSpacing: 0.6, marginBottom: 8,
  },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Colors.mist,
    borderRadius: Radius.md, paddingVertical: 14, paddingHorizontal: 14,
    borderWidth: 1, borderColor: Colors.line, marginBottom: 6,
  },
  input: { flex: 1, fontSize: 15, color: Colors.ink },
  inputError: { borderColor: Colors.red, backgroundColor: Colors.redSoft },
  errorText: { color: Colors.red, fontSize: 13, marginBottom: 18, marginLeft: 4 },
});