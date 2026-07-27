import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ProfileProvider } from '@/context/ProfileContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { MarketplaceProvider } from '@/context/MarketplaceContext';

export default function RootLayout() {
  return (
    <ProfileProvider>
      <WishlistProvider>
        <MarketplaceProvider>
          <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="splash" />
          <Stack.Screen name="index" />
          <Stack.Screen name="register" />
          <Stack.Screen name="login" />
          <Stack.Screen name="application-submitted" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(vendor)" />
          <Stack.Screen name="(guide)" />
          <Stack.Screen name="site-details" />
          <Stack.Screen name="vendor-details" />
          <Stack.Screen name="product-details" />
          <Stack.Screen name="guide-details" />
          <Stack.Screen name="wishlist" />
          <Stack.Screen name="safety-alerts" />
          <Stack.Screen name="trip-planner" />
          <Stack.Screen name="cultural-guide" />
          <Stack.Screen name="phrasebook" />
          <Stack.Screen name="emergency-contacts" />
          <Stack.Screen name="festivals" />
          <Stack.Screen name="coming-soon" />
          <Stack.Screen name="chat" />
          <Stack.Screen name="booking" />
          <Stack.Screen name="report" />
          <Stack.Screen name="edit-profile" />
          <Stack.Screen name="notifications" />
          </Stack>
        </MarketplaceProvider>
      </WishlistProvider>
    </ProfileProvider>
  );
}
