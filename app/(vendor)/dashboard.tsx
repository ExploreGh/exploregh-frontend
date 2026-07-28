import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { AppModal, Button, EmptyState, KenteStrip, SelectField } from '@/components';
import { useProfile } from '@/context/ProfileContext';
import { useMarketplace } from '@/context/MarketplaceContext';

const listingCategories = [
  'Arts & Crafts',
  'Food & Drinks',
  'Fashion',
  'Beauty & Wellness',
  'Home & Decor',
  'Experiences',
  'Other',
];

export default function VendorDashboard() {
  const { profile } = useProfile();
  const { products, addProduct, removeProduct } = useMarketplace();
  const listings = products.filter((product) => product.vendorId === 'vendor-account');
  const [modalVisible, setModalVisible] = useState(false);
  const [dialog, setDialog] = useState<{
    type: 'permission' | 'validation' | 'delete';
    listingId?: string;
  } | null>(null);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [otherCategory, setOtherCategory] = useState('');
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const savingRef = useRef(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setDialog({ type: 'permission' });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setCategory('');
    setOtherCategory('');
    setDescription('');
    setImage(null);
    setErrors({});
  };

  const addListing = async () => {
    if (savingRef.current) return;

    const numericPrice = Number(price.replace(/[^0-9.]/g, ''));
    const newErrors: Record<string, string> = {};

    if (name.trim().length < 3) {
      newErrors.name = 'Enter a product name with at least 3 characters';
    }
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      newErrors.price = 'Enter a valid price greater than zero';
    } else if (numericPrice > 100000) {
      newErrors.price = 'Price cannot be more than GHS 100,000';
    }
    if (!category) newErrors.category = 'Choose a product category';
    if (category === 'Other' && otherCategory.trim().length < 3) {
      newErrors.otherCategory = 'Please specify the category';
    }
    if (description.trim().length < 10) {
      newErrors.description = 'Add a description with at least 10 characters';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setDialog({ type: 'validation' });
      return;
    }

    savingRef.current = true;
    setIsSaving(true);
    try {
      addProduct({
        vendorId: 'vendor-account',
        vendorName: profile.name,
        name: name.trim(),
        price: numericPrice,
        category: category === 'Other' ? otherCategory.trim() : category,
        description: description.trim(),
        image,
      });
      resetForm();
      setModalVisible(false);
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
  };

  const listingReady =
    name.trim().length >= 3 &&
    Boolean(price) &&
    Boolean(category) &&
    description.trim().length >= 10 &&
    (category !== 'Other' || otherCategory.trim().length >= 3);

  const requestRemoveListing = (id: string) => {
    setDialog({ type: 'delete', listingId: id });
  };

  const confirmDialog = () => {
    if (dialog?.type === 'delete' && dialog.listingId) {
      removeProduct(dialog.listingId);
    }
    setDialog(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Shop</Text>
        <Text style={styles.headerSubtitle}>{profile.name}'s listings</Text>
      </View>
      <KenteStrip />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{listings.length}</Text>
            <Text style={styles.statLabel}>Active listings</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Orders this week</Text>
          </View>
        </View>

        {listings.length === 0 ? (
          <EmptyState
            icon="storefront-outline"
            title="No listings yet"
            message="Add your first product to start selling on ExploreGH."
            buttonTitle="Add a listing"
            onButtonPress={() => setModalVisible(true)}
          />
        ) : (
          <View style={styles.list}>
            {listings.map((listing) => (
              <View key={listing.id} style={styles.card}>
                {listing.image ? (
                  <Image source={{ uri: listing.image }} style={styles.cardImage} />
                ) : (
                  <View style={styles.cardImageFallback}>
                    <Ionicons name="image-outline" size={24} color={Colors.slate} />
                  </View>
                )}
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{listing.name}</Text>
                  <Text style={styles.cardCategory}>{listing.category}</Text>
                  <Text style={styles.cardPrice}>GHS {listing.price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => requestRemoveListing(listing.id)}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel={`Delete ${listing.name}`}
                >
                  <Ionicons name="trash-outline" size={18} color={Colors.red} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {listings.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setModalVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="Add a listing"
        >
          <Ionicons name="add" size={24} color={Colors.gold} />
        </TouchableOpacity>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setModalVisible(false);
          resetForm();
        }}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add a listing</Text>
              <TouchableOpacity
                onPress={() => { setModalVisible(false); resetForm(); }}
                accessibilityRole="button"
                accessibilityLabel="Close add listing form"
              >
                <Ionicons name="close" size={22} color={Colors.slate} />
              </TouchableOpacity>
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalContent}
            >
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.pickedImage} />
                ) : (
                  <View style={styles.imagePickerEmpty}>
                    <Ionicons name="camera-outline" size={22} color={Colors.forest} />
                    <Text style={styles.imagePickerText}>Add photo</Text>
                  </View>
                )}
              </TouchableOpacity>

              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Product name"
                placeholderTextColor={Colors.slate}
                value={name}
                onChangeText={(value) => {
                  setName(value);
                  if (errors.name) setErrors((current) => ({ ...current, name: '' }));
                }}
                autoCapitalize="words"
              />
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
              <TextInput
                style={[styles.input, errors.price && styles.inputError]}
                placeholder="Price in GHS"
                placeholderTextColor={Colors.slate}
                value={price}
                onChangeText={(value) => {
                  const cleaned = value.replace(/[^0-9.]/g, '');
                  const [whole, ...decimals] = cleaned.split('.');
                  setPrice(decimals.length ? `${whole}.${decimals.join('').slice(0, 2)}` : whole);
                  if (errors.price) setErrors((current) => ({ ...current, price: '' }));
                }}
                keyboardType="decimal-pad"
                maxLength={9}
              />
              {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}
              <View style={styles.selectSpacing}>
                <SelectField
                  label="Product category"
                  placeholder="Choose a category"
                  value={category}
                  options={listingCategories}
                  icon="pricetag-outline"
                  visible={categoryVisible}
                  error={errors.category}
                  onOpen={() => setCategoryVisible(true)}
                  onClose={() => setCategoryVisible(false)}
                  onSelect={(value) => {
                    setCategory(value);
                    setErrors((current) => ({ ...current, category: '' }));
                  }}
                  onClear={() => setCategory('')}
                />
              </View>
              {category === 'Other' ? (
                <>
                  <TextInput
                    style={[styles.input, errors.otherCategory && styles.inputError]}
                    placeholder="Specify the category"
                    placeholderTextColor={Colors.slate}
                    value={otherCategory}
                    onChangeText={(value) => {
                      setOtherCategory(value);
                      if (errors.otherCategory) {
                        setErrors((current) => ({ ...current, otherCategory: '' }));
                      }
                    }}
                    autoCapitalize="words"
                  />
                  {errors.otherCategory ? (
                    <Text style={styles.errorText}>{errors.otherCategory}</Text>
                  ) : null}
                </>
              ) : null}
              <TextInput
                style={[styles.input, styles.textArea, errors.description && styles.inputError]}
                placeholder="Description (at least 10 characters)"
                placeholderTextColor={Colors.slate}
                value={description}
                onChangeText={(value) => {
                  setDescription(value);
                  if (errors.description) {
                    setErrors((current) => ({ ...current, description: '' }));
                  }
                }}
                multiline
                maxLength={500}
              />
              {errors.description ? (
                <Text style={styles.errorText}>{errors.description}</Text>
              ) : null}

              <Button
                title="Save listing"
                icon="checkmark-circle-outline"
                onPress={addListing}
                loading={isSaving}
                disabled={!listingReady}
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <AppModal
        visible={dialog !== null}
        title={
          dialog?.type === 'delete'
            ? 'Remove this listing?'
            : dialog?.type === 'validation'
              ? 'Check the listing details'
              : 'Photo access needed'
        }
        message={
          dialog?.type === 'delete'
            ? 'This product will also be removed from the tourist marketplace.'
            : dialog?.type === 'validation'
              ? 'Check the highlighted fields, choose a category, and add a useful description before saving.'
              : 'Allow photo-library access in your phone settings to add a product image.'
        }
        icon={dialog?.type === 'delete' ? 'trash-outline' : dialog?.type === 'validation' ? 'alert-circle-outline' : 'images-outline'}
        variant={dialog?.type === 'delete' ? 'danger' : 'default'}
        confirmLabel={dialog?.type === 'delete' ? 'Remove' : 'Got it'}
        cancelLabel={dialog?.type === 'delete' ? 'Keep listing' : 'Close'}
        onConfirm={confirmDialog}
        onClose={() => setDialog(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.mist },
  header: { backgroundColor: Colors.forest, paddingTop: 58, paddingBottom: 18, paddingHorizontal: 20 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: Colors.gold },
  headerSubtitle: { fontSize: 13, color: Colors.white, marginTop: 3, opacity: 0.9 },
  statsRow: { flexDirection: 'row', gap: 12, padding: 16 },
  statBox: {
    flex: 1, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: 16,
    alignItems: 'center', borderWidth: 1, borderColor: Colors.line, ...Shadow.card,
  },
  statNumber: { fontSize: 24, fontWeight: '800', color: Colors.forest, marginBottom: 4 },
  statLabel: { fontSize: 12, color: Colors.slate, textAlign: 'center' },
  list: { paddingHorizontal: 16, gap: 12 },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.white,
    borderRadius: Radius.lg, padding: 12, borderWidth: 1, borderColor: Colors.line, ...Shadow.card,
  },
  cardImage: { width: 60, height: 60, borderRadius: Radius.md },
  cardImageFallback: {
    width: 60, height: 60, borderRadius: Radius.md, backgroundColor: Colors.mist,
    alignItems: 'center', justifyContent: 'center',
  },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 15, fontWeight: '800', color: Colors.ink, marginBottom: 2 },
  cardCategory: { fontSize: 12, color: Colors.slate, marginBottom: 2 },
  cardPrice: { fontSize: 13, fontWeight: '700', color: Colors.forest },
  fab: {
    position: 'absolute', bottom: 22, right: 20, width: 54, height: 54, borderRadius: 27,
    backgroundColor: Colors.forest, alignItems: 'center', justifyContent: 'center', ...Shadow.card,
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalCard: {
    backgroundColor: Colors.white, borderTopLeftRadius: Radius.xl, borderTopRightRadius: Radius.xl,
    padding: 20, maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: Colors.ink },
  modalContent: { paddingBottom: 24 },
  imagePicker: { marginBottom: 14, alignSelf: 'center' },
  imagePickerEmpty: {
    width: 100, height: 100, borderRadius: Radius.md, backgroundColor: Colors.mist,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.line, gap: 4,
  },
  imagePickerText: { fontSize: 11, color: Colors.forest, fontWeight: '700' },
  pickedImage: { width: 100, height: 100, borderRadius: Radius.md },
  input: {
    backgroundColor: Colors.mist, borderRadius: Radius.md, paddingVertical: 12,
    paddingHorizontal: 14, fontSize: 14, color: Colors.ink, marginBottom: 12,
    borderWidth: 1, borderColor: Colors.line,
  },
  inputError: { borderColor: Colors.red, backgroundColor: Colors.redSoft },
  errorText: {
    color: Colors.red, fontSize: 12, marginTop: -7, marginBottom: 10, marginLeft: 4,
  },
  selectSpacing: { marginBottom: 12 },
  textArea: { minHeight: 70 },
});
