import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';
import { AppModal, Button, EmptyState, KenteStrip } from '@/components';
import { useProfile } from '@/context/ProfileContext';
import { useMarketplace } from '@/context/MarketplaceContext';


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
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);

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
    setDescription('');
    setImage(null);
  };

  const addListing = () => {
    const numericPrice = Number(price.replace(/[^0-9.]/g, ''));
    if (!name.trim() || !Number.isFinite(numericPrice) || numericPrice <= 0) {
      setDialog({ type: 'validation' });
      return;
    }
    addProduct({
      vendorId: 'vendor-account',
      vendorName: profile.name,
      name: name.trim(),
      price: numericPrice,
      category: category.trim() || 'General',
      description: description.trim(),
      image,
    });
    resetForm();
    setModalVisible(false);
  };

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
        <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={24} color={Colors.gold} />
        </TouchableOpacity>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add a listing</Text>
              <TouchableOpacity onPress={() => { setModalVisible(false); resetForm(); }}>
                <Ionicons name="close" size={22} color={Colors.slate} />
              </TouchableOpacity>
            </View>

            <ScrollView>
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
                style={styles.input}
                placeholder="Product name"
                placeholderTextColor={Colors.slate}
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Price (e.g. GHS 150 — 800)"
                placeholderTextColor={Colors.slate}
                value={price}
                onChangeText={setPrice}
              />
              <TextInput
                style={styles.input}
                placeholder="Category (e.g. Crafts, Food)"
                placeholderTextColor={Colors.slate}
                value={category}
                onChangeText={setCategory}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                placeholderTextColor={Colors.slate}
                value={description}
                onChangeText={setDescription}
                multiline
              />

              <Button title="Save listing" icon="checkmark-circle-outline" onPress={addListing} />
            </ScrollView>
          </View>
        </View>
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
              ? 'Enter a product name and a valid price greater than zero before saving.'
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
  textArea: { minHeight: 70 },
});
