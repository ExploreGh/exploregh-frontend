import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import {
  GhanaExploreIcon,
  GhanaGuideIcon,
  GhanaVendorIcon,
  IndependenceArchIcon,
} from '@/components/GhanaTabIcons';

// ============================================================
// Tab bar — Ghana-inspired vector icons and existing app colours.
// ============================================================

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.65)',
        tabBarStyle: {
          backgroundColor: Colors.forestDark,
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 8,
          height: 66,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IndependenceArchIcon color={color} focused={focused} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <GhanaExploreIcon color={color} focused={focused} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="vendors"
        options={{
          title: 'Vendors',
          tabBarIcon: ({ color, focused }) => (
            <GhanaVendorIcon color={color} focused={focused} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="guides"
        options={{
          title: 'Guides',
          tabBarIcon: ({ color, focused }) => (
            <GhanaGuideIcon color={color} focused={focused} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'grid' : 'grid-outline'} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
