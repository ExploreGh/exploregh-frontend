import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius } from '@/constants/theme';
import { Button, KenteStrip } from '@/components';
import { useProfile } from '@/context/ProfileContext';
import { setupNotifications } from '@/services/notificationService';

export default function Login() {
  const router = useRouter();
  const { profile } = useProfile();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

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
    setupNotifications();
    if (profile.role === 'vendor') {
      router.push('/(vendor)/dashboard');
    } else if (profile.role === 'guide') {
      router.push('/(guide)/dashboard');
    } else {
      router.push('/(tabs)/home');
    }
  }
};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Small logo at the top */}
      <View style={styles.logoRow}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Log in to continue exploring Ghana</Text>

      <View style={styles.form}>
        {/* Email */}
        <View style={[styles.inputWrap, errors.email ? styles.inputError : null]}>
          <Ionicons name="mail-outline" size={18} color={Colors.slate} />
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor={Colors.slate}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        {/* Password with show/hide */}
        <View style={[styles.inputWrap, errors.password ? styles.inputError : null]}>
          <Ionicons name="lock-closed-outline" size={18} color={Colors.slate} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.slate}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={18}
              color={Colors.slate}
            />
          </TouchableOpacity>
        </View>
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        <Button title="Log in" icon="log-in-outline" onPress={handleLogin} />

        <TouchableOpacity onPress={() => router.push('/register')} style={styles.registerLink}>
          <Text style={styles.registerText}>
            Don't have an account? <Text style={styles.registerBold}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stripWrap}>
        <KenteStrip />
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
    paddingTop: 70,
    paddingBottom: 40,
  },
  logoRow: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 84,
    height: 84,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: Colors.forestDark,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.slate,
    marginBottom: 36,
    textAlign: 'center',
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
    marginTop: -4,
    marginLeft: 4,
  },
  registerLink: {
    marginTop: 12,
    alignItems: 'center',
    padding: 6,
  },
  registerText: {
    fontSize: 14,
    color: Colors.slate,
  },
  registerBold: {
    fontWeight: '800',
    color: Colors.forest,
  },
  stripWrap: {
    marginTop: 48,
    borderRadius: 2,
    overflow: 'hidden',
  },
});
