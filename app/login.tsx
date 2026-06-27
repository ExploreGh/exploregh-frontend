import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = () => {
    let valid = true;
    let newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Please enter your email address';
      valid = false;
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Please enter your password';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validate()) {
      router.push('/(tabs)/home');
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Log in to ExploreGH 🌍</Text>

      <View style={styles.form}>

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

        <Button title="Log In" onPress={handleLogin} />

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.registerText}>Don't have an account? Register</Text>
        </TouchableOpacity>

      </View>
    </View>
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
  registerText: {
    fontSize: 14,
    color: '#006B3F',
    textAlign: 'center',
    marginTop: 16,
  },
});