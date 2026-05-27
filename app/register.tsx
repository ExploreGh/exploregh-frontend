import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Register() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validate = () => {
    let valid = true;
    let newErrors = { fullName: '', email: '', password: '', confirmPassword: '' };

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

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = () => {
    if (validate()) {
      router.push('/(tabs)/home');
    }
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join ExploreGH today 🇬🇭</Text>

      <View style={styles.form}>

        {/* Full Name */}
        <TextInput
          style={[styles.input, errors.fullName ? styles.inputError : null]}
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={fullName}
          onChangeText={setFullName}
        />
        {errors.fullName ? <Text style={styles.errorText}>⚠️ {errors.fullName}</Text> : null}

        {/* Email */}
        <TextInput
          style={[styles.input, errors.email ? styles.inputError : null]}
          placeholder="Email Address"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email ? <Text style={styles.errorText}>⚠️ {errors.email}</Text> : null}

        {/* Password */}
        <TextInput
          style={[styles.input, errors.password ? styles.inputError : null]}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password ? <Text style={styles.errorText}>⚠️ {errors.password}</Text> : null}

        {/* Confirm Password */}
        <TextInput
          style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {errors.confirmPassword ? <Text style={styles.errorText}>⚠️ {errors.confirmPassword}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

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
    paddingTop: 80,
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
    marginBottom: 40,
  },
  form: {
    gap: 12,
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
  button: {
    backgroundColor: '#006B3F',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCD20F',
  },
  loginText: {
    fontSize: 14,
    color: '#006B3F',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
});