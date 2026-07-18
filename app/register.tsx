import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius } from '@/constants/theme';
import { Button } from '@/components';
import { useProfile } from '@/context/ProfileContext';

type Role = 'tourist' | 'vendor' | 'guide';

const roleOptions: { key: Role; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'tourist', label: 'Tourist', icon: 'person-outline' },
  { key: 'vendor', label: 'Vendor', icon: 'storefront-outline' },
  { key: 'guide', label: 'Tour Guide', icon: 'ribbon-outline' },
];

export default function Register() {
  const router = useRouter();
  const { updateProfile } = useProfile();
  const [role, setRole] = useState<Role>('tourist');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Vendor fields
  const [businessName, setBusinessName] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [businessLocation, setBusinessLocation] = useState('');

  // Guide fields
  const [specialization, setSpecialization] = useState('');
  const [regions, setRegions] = useState('');
  const [languages, setLanguages] = useState('');
  const [experience, setExperience] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    let valid = true;
    const newErrors: Record<string, string> = {};

    if (!fullName) {
      newErrors.fullName = 'Please enter your full name';
      valid = false;
    } else if (fullName.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
      valid = false;
    }

    if (!email) {
      newErrors.email = 'Please enter your email address';
      valid = false;
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Please enter a password';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if (role === 'vendor') {
      if (!businessName) {
        newErrors.businessName = 'Please enter your business name';
        valid = false;
      } else if (businessName.length < 3) {
        newErrors.businessName = 'Business name must be at least 3 characters';
        valid = false;
      }
      if (!businessCategory) {
        newErrors.businessCategory = 'Please enter your business category';
        valid = false;
      } else if (/\d/.test(businessCategory)) {
        newErrors.businessCategory = 'Category should only contain text e.g. Food, Crafts';
        valid = false;
      }
      if (!businessLocation) {
        newErrors.businessLocation = 'Please enter your business location';
        valid = false;
      } else if (/\d/.test(businessLocation)) {
        newErrors.businessLocation = 'Location should only contain text e.g. Kumasi';
        valid = false;
      }
    }

    if (role === 'guide') {
      if (!specialization) {
        newErrors.specialization = 'Please enter your specialization';
        valid = false;
      } else if (/\d/.test(specialization)) {
        newErrors.specialization = 'Specialization should only contain text e.g. History & Culture';
        valid = false;
      }
      if (!regions) {
        newErrors.regions = 'Please enter the regions you cover';
        valid = false;
      } else if (/\d/.test(regions)) {
        newErrors.regions = 'Regions should only contain text e.g. Greater Accra';
        valid = false;
      }
      if (!languages) {
        newErrors.languages = 'Please enter languages you speak';
        valid = false;
      } else if (/\d/.test(languages)) {
        newErrors.languages = 'Languages should only contain text e.g. English, Twi';
        valid = false;
      }
      if (!experience) {
        newErrors.experience = 'Please enter your years of experience';
        valid = false;
      } else if (isNaN(Number(experience))) {
        newErrors.experience = 'Experience should be a number e.g. 5';
        valid = false;
      } else if (Number(experience) < 1 || Number(experience) > 50) {
        newErrors.experience = 'Please enter a valid number of years (1–50)';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = () => {
    if (validate()) {
      updateProfile({ name: fullName, email, role });
      if (role === 'tourist') {
        router.push('/(tabs)/home');
      } else {
        router.push('/application-submitted');
      }
    }
  };

  const renderInput = (
    key: string,
    placeholder: string,
    value: string,
    setValue: (t: string) => void,
    icon: keyof typeof Ionicons.glyphMap,
    options?: { secure?: boolean; keyboard?: 'default' | 'email-address' | 'numeric' }
  ) => (
    <View>
      <View style={[styles.inputWrap, errors[key] ? styles.inputError : null]}>
        <Ionicons name={icon} size={18} color={Colors.slate} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.slate}
          value={value}
          onChangeText={setValue}
          secureTextEntry={options?.secure}
          keyboardType={options?.keyboard || 'default'}
          autoCapitalize={options?.keyboard === 'email-address' ? 'none' : 'sentences'}
        />
      </View>
      {errors[key] ? <Text style={styles.errorText}>{errors[key]}</Text> : null}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color={Colors.forestDark} />
      </TouchableOpacity>

      <Text style={styles.title}>Create account</Text>
      <Text style={styles.subtitle}>Join ExploreGH today</Text>

      {/* Role selector */}
      <Text style={styles.sectionLabel}>I am registering as a:</Text>
      <View style={styles.roleContainer}>
        {roleOptions.map((option) => {
          const selected = role === option.key;
          return (
            <TouchableOpacity
              key={option.key}
              style={[styles.roleButton, selected && styles.roleButtonActive]}
              onPress={() => setRole(option.key)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={option.icon}
                size={22}
                color={selected ? Colors.forest : Colors.slate}
              />
              <Text style={[styles.roleText, selected && styles.roleTextActive]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionLabel}>Personal information</Text>
        {renderInput('fullName', 'Full name', fullName, setFullName, 'person-outline')}
        {renderInput('email', 'Email address', email, setEmail, 'mail-outline', { keyboard: 'email-address' })}
        {renderInput('password', 'Password', password, setPassword, 'lock-closed-outline', { secure: true })}
        {renderInput('confirmPassword', 'Confirm password', confirmPassword, setConfirmPassword, 'lock-closed-outline', { secure: true })}

        {role === 'vendor' && (
          <View style={styles.form}>
            <Text style={styles.sectionLabel}>Business information</Text>
            {renderInput('businessName', 'Business name', businessName, setBusinessName, 'storefront-outline')}
            {renderInput('businessCategory', 'Category e.g. Food, Crafts, Fashion', businessCategory, setBusinessCategory, 'pricetag-outline')}
            {renderInput('businessLocation', 'Business location', businessLocation, setBusinessLocation, 'location-outline')}
          </View>
        )}

        {role === 'guide' && (
          <View style={styles.form}>
            <Text style={styles.sectionLabel}>Guide information</Text>
            {renderInput('specialization', 'Specialization e.g. History & Culture', specialization, setSpecialization, 'ribbon-outline')}
            {renderInput('regions', 'Regions you cover', regions, setRegions, 'map-outline')}
            {renderInput('languages', 'Languages spoken', languages, setLanguages, 'chatbubbles-outline')}
            {renderInput('experience', 'Years of experience e.g. 5', experience, setExperience, 'time-outline', { keyboard: 'numeric' })}
          </View>
        )}

        {role !== 'tourist' && (
          <View style={styles.reviewNote}>
            <Ionicons name="information-circle-outline" size={18} color={Colors.forest} />
            <Text style={styles.reviewNoteText}>
              Vendor and guide accounts are reviewed by our team before going live.
            </Text>
          </View>
        )}

        <Button
          title={role === 'tourist' ? 'Create account' : 'Submit application'}
          icon={role === 'tourist' ? 'checkmark' : 'paper-plane-outline'}
          onPress={handleRegister}
        />

        <TouchableOpacity onPress={() => router.push('/login')} style={styles.loginLink}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginBold}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 48,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.mist,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: Colors.forestDark,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.slate,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.slate,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 6,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22,
  },
  roleButton: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.line,
    backgroundColor: Colors.mist,
  },
  roleButtonActive: {
    borderColor: Colors.forest,
    backgroundColor: Colors.forestSoft,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.slate,
  },
  roleTextActive: {
    color: Colors.forest,
  },
  form: {
    gap: 12,
  },
  inputWrap: {
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
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.ink,
  },
  inputError: {
    borderColor: Colors.red,
    backgroundColor: Colors.redSoft,
  },
  errorText: {
    color: Colors.red,
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
  },
  reviewNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.forestSoft,
    borderRadius: Radius.md,
    padding: 12,
  },
  reviewNoteText: {
    flex: 1,
    fontSize: 13,
    color: Colors.forestDark,
    lineHeight: 18,
  },
  loginLink: {
    alignItems: 'center',
    padding: 6,
    marginTop: 4,
  },
  loginText: {
    fontSize: 14,
    color: Colors.slate,
  },
  loginBold: {
    fontWeight: '800',
    color: Colors.forest,
  },
});
