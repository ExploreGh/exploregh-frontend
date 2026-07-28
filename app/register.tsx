import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius } from '@/constants/theme';
import { Button, SelectField } from '@/components';
import { useProfile } from '@/context/ProfileContext';
import {
  formatGhanaPhone,
  getPasswordChecks,
  isValidEmail,
  isValidGhanaMobile,
  isStrongPassword,
  normalizeEmail,
  normalizeGhanaPhone,
  toInternationalGhanaPhone,
} from '@/utils/validation';

type Role = 'tourist' | 'vendor' | 'guide';

const roleOptions: { key: Role; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'tourist', label: 'Tourist', icon: 'person-outline' },
  { key: 'vendor', label: 'Vendor', icon: 'storefront-outline' },
  { key: 'guide', label: 'Tour Guide', icon: 'ribbon-outline' },
];

const businessCategories = [
  'Food & Drinks', 'Arts & Crafts', 'Fashion', 'Accommodation', 'Transport',
  'Experiences', 'Other',
];
const ghanaRegions = [
  'Ahafo', 'Ashanti', 'Bono', 'Bono East', 'Central', 'Eastern', 'Greater Accra',
  'North East', 'Northern', 'Oti', 'Savannah', 'Upper East', 'Upper West', 'Volta',
  'Western', 'Western North',
];
const guideSpecializations = [
  'History & Culture', 'Nature & Wildlife', 'Food & Markets', 'Adventure',
  'Festivals & Events', 'City Tours', 'Other',
];
const localLanguageOptions = [
  'English', 'Twi', 'Ga', 'Ewe', 'Fante', 'Dagbani', 'Dangme', 'Dagaare',
  'Gonja', 'Gurene', 'Kasem', 'Nzema',
];
const foreignLanguageOptions = [
  'None', 'English', 'French', 'Spanish', 'German', 'Italian', 'Portuguese',
  'Arabic', 'Mandarin',
];

type SelectKey =
  | 'businessCategory'
  | 'businessLocation'
  | 'specialization'
  | 'regions'
  | 'localLanguage'
  | 'foreignLanguage';

export default function Register() {
  const router = useRouter();
  const { updateProfile } = useProfile();
  const scrollRef = useRef<ScrollView>(null);
  const submittingRef = useRef(false);
  const [role, setRole] = useState<Role>('tourist');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Vendor fields
  const [businessName, setBusinessName] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [otherBusinessCategory, setOtherBusinessCategory] = useState('');
  const [businessLocation, setBusinessLocation] = useState('');

  // Guide fields
  const [specialization, setSpecialization] = useState('');
  const [otherSpecialization, setOtherSpecialization] = useState('');
  const [regions, setRegions] = useState('');
  const [localLanguage, setLocalLanguage] = useState('');
  const [foreignLanguage, setForeignLanguage] = useState('None');
  const [experience, setExperience] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openSelect, setOpenSelect] = useState<SelectKey | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!phone) {
      newErrors.phone = 'Please enter your mobile number';
      valid = false;
    } else if (!isValidGhanaMobile(phone)) {
      newErrors.phone = 'Enter a valid 9-digit Ghana mobile number';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Please enter a password';
      valid = false;
    } else if (!isStrongPassword(password)) {
      newErrors.password = 'Please meet all password requirements';
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
      if (businessCategory === 'Other') {
        if (!otherBusinessCategory.trim()) {
          newErrors.otherBusinessCategory = 'Please specify your business category';
          valid = false;
        } else if (otherBusinessCategory.trim().length < 3) {
          newErrors.otherBusinessCategory = 'Please enter at least 3 characters';
          valid = false;
        }
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
      if (specialization === 'Other') {
        if (!otherSpecialization.trim()) {
          newErrors.otherSpecialization = 'Please specify your guide specialty';
          valid = false;
        } else if (otherSpecialization.trim().length < 3) {
          newErrors.otherSpecialization = 'Please enter at least 3 characters';
          valid = false;
        }
      }
      if (!regions) {
        newErrors.regions = 'Please enter the regions you cover';
        valid = false;
      } else if (/\d/.test(regions)) {
        newErrors.regions = 'Regions should only contain text e.g. Greater Accra';
        valid = false;
      }
      if (!localLanguage) {
        newErrors.localLanguage = 'Please choose at least one local language';
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
    if (!valid) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ y: 120, animated: true });
      });
    }
    return valid;
  };

  const handleRegister = async () => {
    if (submittingRef.current || !validate()) return;

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      updateProfile({
        name: fullName.trim(),
        email: normalizeEmail(email),
        phone: toInternationalGhanaPhone(phone),
        role,
      });
      if (role === 'tourist') {
        router.push('/(tabs)/home');
      } else {
        router.push('/application-submitted');
      }
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const commonFieldsComplete =
    Boolean(fullName.trim()) &&
    isValidEmail(email) &&
    isValidGhanaMobile(phone) &&
    isStrongPassword(password) &&
    Boolean(confirmPassword) &&
    password === confirmPassword;

  const vendorFieldsComplete =
    role !== 'vendor' ||
    (Boolean(businessName.trim()) &&
      Boolean(businessCategory) &&
      Boolean(businessLocation) &&
      (businessCategory !== 'Other' || Boolean(otherBusinessCategory.trim())));

  const guideFieldsComplete =
    role !== 'guide' ||
    (Boolean(specialization) &&
      Boolean(regions) &&
      Boolean(localLanguage) &&
      Boolean(experience) &&
      (specialization !== 'Other' || Boolean(otherSpecialization.trim())));

  const formReady = commonFieldsComplete && vendorFieldsComplete && guideFieldsComplete;

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
          onChangeText={(text) => {
            setValue(text);
            if (errors[key]) {
              setErrors((current) => ({ ...current, [key]: '' }));
            }
          }}
          secureTextEntry={options?.secure}
          keyboardType={options?.keyboard || 'default'}
          autoCapitalize={options?.keyboard === 'email-address' ? 'none' : 'sentences'}
        />
      </View>
      {errors[key] ? <Text style={styles.errorText}>{errors[key]}</Text> : null}
    </View>
  );

  const renderPasswordInput = (
    key: 'password' | 'confirmPassword',
    placeholder: string,
    value: string,
    setValue: (text: string) => void,
    visible: boolean,
    setVisible: (visible: boolean) => void,
    contentType: 'newPassword' | 'password'
  ) => (
    <View>
      <View style={[styles.inputWrap, errors[key] ? styles.inputError : null]}>
        <Ionicons name="lock-closed-outline" size={18} color={Colors.slate} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.slate}
          value={value}
          onChangeText={(text) => {
            setValue(text);
            if (errors[key]) {
              setErrors((current) => ({ ...current, [key]: '' }));
            }
          }}
          secureTextEntry={!visible}
          textContentType={contentType}
          autoComplete={contentType === 'newPassword' ? 'new-password' : 'password'}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={visible ? 'Hide password' : 'Show password'}
        >
          <Ionicons
            name={visible ? 'eye-off-outline' : 'eye-outline'}
            size={19}
            color={Colors.slate}
          />
        </TouchableOpacity>
      </View>
      {errors[key] ? <Text style={styles.errorText}>{errors[key]}</Text> : null}
    </View>
  );

  const passwordChecks = getPasswordChecks(password);
  const passwordRequirements = [
    { label: '8+ characters', met: passwordChecks.length },
    { label: 'Uppercase', met: passwordChecks.uppercase },
    { label: 'Lowercase', met: passwordChecks.lowercase },
    { label: 'Number', met: passwordChecks.number },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        showsVerticalScrollIndicator={false}
      >
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
        <View>
          <View style={[styles.inputWrap, errors.phone ? styles.inputError : null]}>
            <Ionicons name="call-outline" size={18} color={Colors.slate} />
            <View style={styles.phonePrefix}>
              <Text style={styles.phoneFlag}>🇬🇭</Text>
              <Text style={styles.phonePrefixText}>+233</Text>
            </View>
            <View style={styles.phoneDivider} />
            <TextInput
              style={styles.input}
              placeholder="24 123 4567"
              placeholderTextColor={Colors.slate}
              value={formatGhanaPhone(phone)}
              onChangeText={(value) => {
                setPhone(normalizeGhanaPhone(value));
                if (errors.phone) {
                  setErrors((current) => ({ ...current, phone: '' }));
                }
              }}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              autoComplete="tel"
              maxLength={11}
            />
          </View>
          {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
        </View>
        {renderPasswordInput(
          'password',
          'Password',
          password,
          setPassword,
          showPassword,
          setShowPassword,
          'newPassword'
        )}
        {password ? (
          <View style={styles.passwordGuide}>
            <View style={styles.passwordGuideHeader}>
              <Text style={styles.passwordGuideTitle}>Password strength</Text>
              <Text
                style={[
                  styles.passwordStrength,
                  isStrongPassword(password) && styles.passwordStrengthComplete,
                ]}
              >
                {isStrongPassword(password) ? 'Strong' : 'Keep going'}
              </Text>
            </View>
            <View style={styles.requirementsRow}>
              {passwordRequirements.map((requirement) => (
                <View key={requirement.label} style={styles.requirement}>
                  <Ionicons
                    name={requirement.met ? 'checkmark-circle' : 'ellipse-outline'}
                    size={14}
                    color={requirement.met ? Colors.forest : Colors.slate}
                  />
                  <Text
                    style={[
                      styles.requirementText,
                      requirement.met && styles.requirementTextMet,
                    ]}
                  >
                    {requirement.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
        {renderPasswordInput(
          'confirmPassword',
          'Confirm password',
          confirmPassword,
          setConfirmPassword,
          showConfirmPassword,
          setShowConfirmPassword,
          'password'
        )}

        {role === 'vendor' && (
          <View style={styles.form}>
            <Text style={styles.sectionLabel}>Business information</Text>
            {renderInput('businessName', 'Business name', businessName, setBusinessName, 'storefront-outline')}
            <SelectField
              label="Business category"
              placeholder="Choose a business category"
              value={businessCategory}
              options={businessCategories}
              icon="pricetag-outline"
              visible={openSelect === 'businessCategory'}
              error={errors.businessCategory}
              onOpen={() => setOpenSelect('businessCategory')}
              onClose={() => setOpenSelect(null)}
              onSelect={(value) => {
                setBusinessCategory(value);
                setErrors((current) => ({ ...current, businessCategory: '' }));
              }}
              onClear={() => setBusinessCategory('')}
            />
            {businessCategory === 'Other'
              ? renderInput(
                  'otherBusinessCategory',
                  'Specify your business category',
                  otherBusinessCategory,
                  setOtherBusinessCategory,
                  'create-outline'
                )
              : null}
            <SelectField
              label="Business region"
              placeholder="Choose a region"
              value={businessLocation}
              options={ghanaRegions}
              searchable
              icon="location-outline"
              visible={openSelect === 'businessLocation'}
              error={errors.businessLocation}
              onOpen={() => setOpenSelect('businessLocation')}
              onClose={() => setOpenSelect(null)}
              onSelect={(value) => {
                setBusinessLocation(value);
                setErrors((current) => ({ ...current, businessLocation: '' }));
              }}
              onClear={() => setBusinessLocation('')}
            />
          </View>
        )}

        {role === 'guide' && (
          <View style={styles.form}>
            <Text style={styles.sectionLabel}>Guide information</Text>
            <SelectField
              label="Guide specialty"
              placeholder="Choose your main specialty"
              value={specialization}
              options={guideSpecializations}
              icon="ribbon-outline"
              visible={openSelect === 'specialization'}
              error={errors.specialization}
              onOpen={() => setOpenSelect('specialization')}
              onClose={() => setOpenSelect(null)}
              onSelect={(value) => {
                setSpecialization(value);
                setErrors((current) => ({ ...current, specialization: '' }));
              }}
              onClear={() => setSpecialization('')}
            />
            {specialization === 'Other'
              ? renderInput(
                  'otherSpecialization',
                  'Specify your guide specialty',
                  otherSpecialization,
                  setOtherSpecialization,
                  'create-outline'
                )
              : null}
            <SelectField
              label="Primary region"
              placeholder="Choose your main region"
              value={regions}
              options={ghanaRegions}
              searchable
              icon="map-outline"
              visible={openSelect === 'regions'}
              error={errors.regions}
              onOpen={() => setOpenSelect('regions')}
              onClose={() => setOpenSelect(null)}
              onSelect={(value) => {
                setRegions(value);
                setErrors((current) => ({ ...current, regions: '' }));
              }}
              onClear={() => setRegions('')}
            />
            <SelectField
              label="Local language"
              placeholder="Choose a local language"
              value={localLanguage}
              options={localLanguageOptions}
              icon="chatbubbles-outline"
              visible={openSelect === 'localLanguage'}
              error={errors.localLanguage}
              onOpen={() => setOpenSelect('localLanguage')}
              onClose={() => setOpenSelect(null)}
              onSelect={(value) => {
                setLocalLanguage(value);
                setErrors((current) => ({ ...current, localLanguage: '' }));
              }}
              onClear={() => setLocalLanguage('')}
            />
            <SelectField
              label="Foreign language"
              placeholder="Choose a foreign language"
              value={foreignLanguage}
              options={foreignLanguageOptions}
              icon="language-outline"
              visible={openSelect === 'foreignLanguage'}
              onOpen={() => setOpenSelect('foreignLanguage')}
              onClose={() => setOpenSelect(null)}
              onSelect={setForeignLanguage}
            />
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
          loading={isSubmitting}
          disabled={!formReady}
        />

        <TouchableOpacity onPress={() => router.push('/login')} style={styles.loginLink}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginBold}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
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
  phonePrefix: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  phoneFlag: { fontSize: 16 },
  phonePrefixText: {
    color: Colors.ink,
    fontSize: 14,
    fontWeight: '800',
  },
  phoneDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.line,
  },
  passwordGuide: {
    backgroundColor: Colors.forestSoft,
    borderRadius: Radius.md,
    padding: 12,
    marginTop: -4,
  },
  passwordGuideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 9,
  },
  passwordGuideTitle: {
    color: Colors.forestDark,
    fontSize: 12,
    fontWeight: '800',
  },
  passwordStrength: {
    color: Colors.slate,
    fontSize: 11,
    fontWeight: '800',
  },
  passwordStrengthComplete: { color: Colors.forest },
  requirementsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 7,
  },
  requirement: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  requirementText: { color: Colors.slate, fontSize: 11, fontWeight: '600' },
  requirementTextMet: { color: Colors.forestDark },
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
