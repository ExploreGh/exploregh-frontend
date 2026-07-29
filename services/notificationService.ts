import { Platform } from 'react-native';
import Constants, { ExecutionEnvironment } from 'expo-constants';

// ============================================================
// notificationService — asks the phone for permission to send
// notifications, then gets a unique "device token" from
// Firebase. This token is like the phone's ID card — once we
// send it to the backend (User Service), the backend can tell
// Firebase "deliver a notification to THIS exact phone."
//
// Firebase Cloud Messaging only works on a real Android/iOS
// build (it reads google-services.json during that native
// build step). On web there is no native Firebase app, so we
// skip it safely instead of crashing.
// ============================================================

export async function setupNotifications() {
  if (Platform.OS === 'web') {
    console.log('Push notifications are not available on web — skipping. This works on a real Android/iOS build.');
    return;
  }

  // Expo Go does not contain React Native Firebase's native modules.
  // A development or production build still uses Firebase normally.
  if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
    console.log('Firebase notifications are unavailable in Expo Go - skipping notification setup.');
    return;
  }

  try {
    const messaging = require('@react-native-firebase/messaging').default;
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.log('Notification permission not granted');
      return;
    }

    const token = await messaging().getToken();
    console.log('Device token obtained:', token);
    // TODO: once User Service is ready, send this token to the backend:
    // await fetch(`${API_BASE_URL}/users/me/fcm-token`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ token }),
    // });
  } catch (error) {
    console.log('Error setting up notifications:', error);
  }
}
