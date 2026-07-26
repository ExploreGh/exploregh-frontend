import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '@/constants/theme';

type Message = {
  id: string;
  text: string;
  fromMe: boolean;
  time: string;
};

export default function Chat() {
  const router = useRouter();
  const { name, photo, role, context, price } = useLocalSearchParams();

  const displayName = (name as string) || 'ExploreGH Contact';
  const displayRole = (role as string) || 'Vendor';
  const isGuide = displayRole === 'Tour Guide';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'greeting',
      text: `Akwaaba! This is ${displayName.split(' ')[0]}. Send a message and I'll get back to you here.`,
      fromMe: false,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      fromMe: true,
      time: 'Now',
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity
  style={styles.backButton}
  onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)/guides'))}
>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>

        {photo ? (
          <Image source={{ uri: photo as string }} style={styles.headerPhoto} />
        ) : (
          <View style={styles.headerPhotoFallback}>
            <Ionicons name={isGuide ? 'person' : 'storefront'} size={18} color={Colors.forest} />
          </View>
        )}

        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{displayName}</Text>
          <View style={styles.statusRow}>
            <Ionicons
              name={isGuide ? 'ribbon-outline' : 'storefront-outline'}
              size={11}
              color={Colors.gold}
            />
            <Text style={styles.headerRole}>{displayRole}</Text>
          </View>
        </View>
      </View>

      {(context || price) ? (
        <View style={styles.contextCard}>
          <View style={styles.contextLeft}>
            {context ? (
              <View style={styles.contextRow}>
                <Ionicons
                  name={isGuide ? 'ribbon-outline' : 'pricetag-outline'}
                  size={13}
                  color={Colors.forest}
                />
                <Text style={styles.contextText}>{context}</Text>
              </View>
            ) : null}
            {price ? (
              <View style={styles.contextRow}>
                <Ionicons name="cash-outline" size={13} color={Colors.forest} />
                <Text style={styles.contextText}>{price}</Text>
              </View>
            ) : null}
          </View>
          {isGuide ? (
            <TouchableOpacity style={styles.bookingButton} activeOpacity={0.85}>
              <Text style={styles.bookingButtonText}>Request booking</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}

      <View style={styles.demoBanner}>
        <Ionicons name="information-circle-outline" size={14} color={Colors.forestDark} />
        <Text style={styles.demoBannerText}>
          Your messages send and appear here. Replies aren't live yet - that connects once the
          backend messaging service is ready.
        </Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        renderItem={({ item }) => (
          <View style={[styles.bubbleRow, item.fromMe ? styles.bubbleRowMe : styles.bubbleRowThem]}>
            <View style={[styles.bubble, item.fromMe ? styles.bubbleMe : styles.bubbleThem]}>
              <Text style={item.fromMe ? styles.bubbleTextMe : styles.bubbleTextThem}>
                {item.text}
              </Text>
            </View>
            <Text style={[styles.time, item.fromMe && styles.timeMe]}>{item.time}</Text>
          </View>
        )}
      />

      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={Colors.slate}
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!input.trim()}
        >
          <Ionicons name="send" size={18} color={Colors.gold} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.mist },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Colors.forest, paddingTop: 56, paddingBottom: 16, paddingHorizontal: 12,
  },
  backButton: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  headerPhoto: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.white },
  headerPhotoFallback: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center' },
  headerInfo: { flex: 1 },
  headerName: { fontSize: 16, fontWeight: '800', color: Colors.white, marginBottom: 2 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  headerRole: { fontSize: 11, color: Colors.white, opacity: 0.85 },
  contextCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.white, marginHorizontal: 12, marginTop: 10, padding: 12,
    borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.line, ...Shadow.card,
  },
  contextLeft: { gap: 4 },
  contextRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  contextText: { fontSize: 12, color: Colors.ink, fontWeight: '600' },
  bookingButton: {
    backgroundColor: Colors.forest, paddingVertical: 8, paddingHorizontal: 14, borderRadius: Radius.pill,
  },
  bookingButtonText: { color: Colors.gold, fontSize: 12, fontWeight: '800' },
  demoBanner: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.goldSoft, paddingVertical: 8, paddingHorizontal: 14, marginTop: 10 },
  demoBannerText: { flex: 1, fontSize: 11, color: Colors.ink, lineHeight: 15 },
  messagesList: { padding: 16, gap: 4 },
  bubbleRow: { marginBottom: 10, maxWidth: '78%' },
  bubbleRowMe: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  bubbleRowThem: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubble: { borderRadius: Radius.lg, paddingVertical: 10, paddingHorizontal: 14 },
  bubbleMe: { backgroundColor: Colors.forest, borderBottomRightRadius: 4 },
  bubbleThem: { backgroundColor: Colors.white, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: Colors.line, ...Shadow.card },
  bubbleTextMe: { color: Colors.white, fontSize: 14, lineHeight: 20 },
  bubbleTextThem: { color: Colors.ink, fontSize: 14, lineHeight: 20 },
  time: { fontSize: 10, color: Colors.slate, marginTop: 3, marginHorizontal: 4 },
  timeMe: { textAlign: 'right' },
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 10, backgroundColor: Colors.white,
    paddingHorizontal: 14, paddingVertical: 10, borderTopWidth: 1, borderTopColor: Colors.line,
  },
  input: {
    flex: 1, backgroundColor: Colors.mist, borderRadius: Radius.lg, paddingHorizontal: 14,
    paddingVertical: 10, fontSize: 14, color: Colors.ink, maxHeight: 100, borderWidth: 1, borderColor: Colors.line,
  },
  sendButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: Colors.forest, alignItems: 'center', justifyContent: 'center' },
  sendButtonDisabled: { opacity: 0.4 },
});
