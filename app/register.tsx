import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Button from '@/components/Button';

type Role = 'tourist' | 'vendor' | 'guide';

export default function Register() {
  const router = useRouter();
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
    let newErrors: Record<string, string> = {};

    if (!fullName) {
      newErrors.fullName = 'Please enter your full name';
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
    newErrors.businessLocation = 'Location should only contain text e.g. Kumasi, Ashanti';
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
    newErrors.regions = 'Regions should only contain text e.g. Greater Accra, Ashanti';
    valid = false;
  }

  if (!languages) {
    newErrors.languages = 'Please enter languages you speak';
    valid = false;
  } else if (/\d/.test(languages)) {
    newErrors.languages = 'Languages should only contain text e.g. English, Twi, French';
    valid = false;
  }

  if (!experience) {
    newErrors.experience = 'Please enter your years of experience';
    valid = false;
  } else if (isNaN(Number(experience))) {
    newErrors.experience = 'Experience should be a number e.g. 5';
    valid = false;
  } else if (Number(experience) < 1) {
    newErrors.experience = 'Experience must be at least 1 year';
    valid = false;
  } else if (Number(experience) > 50) {
    newErrors.experience = 'Please enter a valid number of years';
    valid = false;
  }
}

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = () => {
  if (validate()) {
    if (role === 'tourist') {
      router.push('/(tabs)/home');
    } else {
      router.push('/application-submitted');
    }
  }
};

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join ExploreGH today 🇬🇭</Text>

      {/* Role Selector */}
      <Text style={styles.sectionLabel}>I am registering as a:</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'tourist' && styles.roleButtonActive]}
          onPress={() => setRole('tourist')}
        >
          <Text style={styles.roleEmoji}>👤</Text>
          <Text style={[styles.roleText, role === 'tourist' && styles.roleTextActive]}>Tourist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === 'vendor' && styles.roleButtonActive]}
          onPress={() => setRole('vendor')}
        >
          <Text style={styles.roleEmoji}>🛍️</Text>
          <Text style={[styles.roleText, role === 'vendor' && styles.roleTextActive]}>Vendor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === 'guide' && styles.roleButtonActive]}
          onPress={() => setRole('guide')}
        >
          <Text style={styles.roleEmoji}>🎖️</Text>
          <Text style={[styles.roleText, role === 'guide' && styles.roleTextActive]}>Tour Guide</Text>
        </TouchableOpacity>
      </View>

      {/* Common Fields */}
      <View style={styles.form}>
        <Text style={styles.sectionLabel}>Personal Information</Text>

        <TextInput
          style={[styles.input, errors.fullName && styles.inputError]}
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={fullName}
          onChangeText={setFullName}
        />
        {errors.fullName ? <Text style={styles.errorText}>⚠️ {errors.fullName}</Text> : null}

        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Email Address"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email ? <Text style={styles.errorText}>⚠️ {errors.email}</Text> : null}

        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password ? <Text style={styles.errorText}>⚠️ {errors.password}</Text> : null}

        <TextInput
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {errors.confirmPassword ? <Text style={styles.errorText}>⚠️ {errors.confirmPassword}</Text> : null}

        {/* Vendor Extra Fields */}
        {role === 'vendor' && (
          <View>
            <Text style={styles.sectionLabel}>Business Information</Text>
            <TextInput
              style={[styles.input, errors.businessName && styles.inputError]}
              placeholder="Business Name"
              placeholderTextColor="#999"
              value={businessName}
              onChangeText={setBusinessName}
            />
            {errors.businessName ? <Text style={styles.errorText}>⚠️ {errors.businessName}</Text> : null}

            <TextInput
              style={[styles.input, errors.businessCategory && styles.inputError]}
              placeholder="Business Category (e.g. Food, Crafts, Fashion)"
              placeholderTextColor="#999"
              value={businessCategory}
              onChangeText={setBusinessCategory}
            />
            {errors.businessCategory ? <Text style={styles.errorText}>⚠️ {errors.businessCategory}</Text> : null}

            <TextInput
              style={[styles.input, errors.businessLocation && styles.inputError]}
              placeholder="Business Location"
              placeholderTextColor="#999"
              value={businessLocation}
              onChangeText={setBusinessLocation}
            />
            {errors.businessLocation ? <Text style={styles.errorText}>⚠️ {errors.businessLocation}</Text> : null}
          </View>
        )}

        {/* Guide Extra Fields */}
        {role === 'guide' && (
          <View>
            <Text style={styles.sectionLabel}>Guide Information</Text>
            <TextInput
              style={[styles.input, errors.specialization && styles.inputError]}
              placeholder="Specialization (e.g. History & Culture)"
              placeholderTextColor="#999"
              value={specialization}
              onChangeText={setSpecialization}
            />
            {errors.specialization ? <Text style={styles.errorText}>⚠️ {errors.specialization}</Text> : null}

            <TextInput
              style={[styles.input, errors.regions && styles.inputError]}
              placeholder="Regions You Cover (e.g. Greater Accra, Ashanti)"
              placeholderTextColor="#999"
              value={regions}
              onChangeText={setRegions}
            />
            {errors.regions ? <Text style={styles.errorText}>⚠️ {errors.regions}</Text> : null}

            <TextInput
              style={[styles.input, errors.languages && styles.inputError]}
              placeholder="Languages Spoken (e.g. English, Twi, French)"
              placeholderTextColor="#999"
              value={languages}
              onChangeText={setLanguages}
            />
            {errors.languages ? <Text style={styles.errorText}>⚠️ {errors.languages}</Text> : null}

            <TextInput
              style={[styles.input, errors.experience && styles.inputError]}
              placeholder="Years of Experience (e.g. 5 years)"
              placeholderTextColor="#999"
              value={experience}
              onChangeText={setExperience}
            />
            {errors.experience ? <Text style={styles.errorText}>⚠️ {errors.experience}</Text> : null}
          </View>
        )}

        <Button 
  title={role === 'tourist' ? 'Create Account' : 'Submit Application'} 
  onPress={handleRegister} 
/>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.loginText}>Already have an account? Log in</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#006B3F',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 8,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  roleButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  roleButtonActive: {
    borderColor: '#006B3F',
    backgroundColor: '#e8f5e9',
  },
  roleEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  roleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
  },
  roleTextActive: {
    color: '#006B3F',
  },
  form: {
    gap: 12,
    paddingBottom: 40,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputError: {
    borderColor: '#cc0000',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#cc0000',
    fontSize: 13,
    marginTop: -4,
    marginLeft: 4,
  },
  loginText: {
    fontSize: 14,
    color: '#006B3F',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
});