import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="site-details" />
      <Stack.Screen name="safety-alerts" />
      <Stack.Screen name="trip-planner" />
      <Stack.Screen name="cultural-guide" />
      <Stack.Screen name="phrasebook" />
      <Stack.Screen name="coming-soon" />
      <Stack.Screen name="emergency-contacts" />
      <Stack.Screen name="festivals" />
    </Stack>
  );
}