import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Radius } from '@/constants/theme';
import { AppModal, Button, KenteStrip } from '@/components';
import { useProfile } from '@/context/ProfileContext';
import { setupNotifications } from '@/services/notificationService';
import { authenticateLocalAccount } from '@/services/authService';
import { isValidEmail, normalizeEmail } from '@/utils/validation';

const REMEMBERED_EMAIL_KEY = 'exploregh.rememberedEmail';

export default function Login() {
  const router = useRouter();
  const { updateProfile } = useProfile();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(REMEMBERED_EMAIL_KEY)
      .then((savedEmail) => {
        if (savedEmail) {
          setEmail(savedEmail);
          setRememberMe(true);
        }
      })
      .catch(() => {
        // Remembering an email is optional, so login still works if storage is unavailable.
      });
  }, []);

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Please enter your email address';
      valid = false;
    } else if (!isValidEmail(email)) {
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

  const handleLogin = async () => {
    if (isLoggingIn || !validate()) return;

    setIsLoggingIn(true);
    const normalizedEmail = normalizeEmail(email);
    setEmail(normalizedEmail);

    try {
      setAuthError('');
      const account = await authenticateLocalAccount(normalizedEmail, password);
      updateProfile({
        name: account.name,
        email: account.email,
        phone: account.phone,
        role: account.role,
      });

      if (rememberMe) {
        await AsyncStorage.setItem(REMEMBERED_EMAIL_KEY, normalizedEmail);
      } else {
        await AsyncStorage.removeItem(REMEMBERED_EMAIL_KEY);
      }

      await setupNotifications();
      if (account.role === 'vendor') {
        router.push('/(vendor)/dashboard');
      } else if (account.role === 'guide') {
        router.push('/(guide)/dashboard');
      } else {
        router.push('/(tabs)/home');
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Unable to log in. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const formReady = isValidEmail(email) && password.length >= 6;

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
            autoCorrect={false}
            textContentType="emailAddress"
            autoComplete="email"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              if (errors.email) setErrors((current) => ({ ...current, email: '' }));
            }}
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
            textContentType="password"
            autoComplete="current-password"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              if (errors.password) setErrors((current) => ({ ...current, password: '' }));
            }}
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
        {authError ? (
          <View style={styles.authError}>
            <Ionicons name="alert-circle-outline" size={17} color={Colors.red} />
            <Text style={styles.authErrorText}>{authError}</Text>
          </View>
        ) : null}

        <View style={styles.loginOptions}>
          <TouchableOpacity
            style={styles.rememberButton}
            onPress={() => setRememberMe((current) => !current)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: rememberMe }}
          >
            <Ionicons
              name={rememberMe ? 'checkbox' : 'square-outline'}
              size={20}
              color={rememberMe ? Colors.forest : Colors.slate}
            />
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setForgotPasswordVisible(true)}
            accessibilityRole="button"
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Log in"
          icon="log-in-outline"
          onPress={handleLogin}
          loading={isLoggingIn}
          disabled={!formReady}
        />

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

      <AppModal
        visible={forgotPasswordVisible}
        title="Password reset"
        message={
          email && isValidEmail(email)
            ? `Password reset is not connected to the server yet. Once it is ready, reset instructions will be sent to ${normalizeEmail(email)}.`
            : 'Enter your account email first. Password reset will send instructions there once the authentication server is connected.'
        }
        icon="key-outline"
        confirmLabel="Got it"
        cancelLabel="Close"
        onConfirm={() => setForgotPasswordVisible(false)}
        onClose={() => setForgotPasswordVisible(false)}
      />
    </KeyboardAvoidingView>
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
  authError: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
    backgroundColor: Colors.redSoft,
    borderRadius: Radius.md,
    padding: 11,
  },
  authErrorText: { flex: 1, color: Colors.red, fontSize: 12, lineHeight: 17 },
  loginOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 4,
  },
  rememberButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 4,
  },
  rememberText: { color: Colors.slate, fontSize: 13, fontWeight: '600' },
  forgotText: { color: Colors.forest, fontSize: 13, fontWeight: '800' },
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
