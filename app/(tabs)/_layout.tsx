import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Radius, Shadow } from '@/constants/theme';
import {
  GhanaExploreIcon,
  GhanaGuideIcon,
  GhanaVendorIcon,
  IndependenceArchIcon,
} from '@/components/GhanaTabIcons';

function FloatingTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabShell, { bottom: Math.max(insets.bottom, 10) }]}>
      {state.routes.map((route: any, index: number) => {
        const focused = state.index === index;
        const options = descriptors[route.key].options;
        const label = options.title ?? route.name;
        const color = focused ? Colors.forestDark : Colors.slate;

        return (
          <Pressable
            key={route.key}
            style={({ pressed }) => [
              styles.tabItem,
              focused && styles.tabItemActive,
              pressed && styles.tabItemPressed,
            ]}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
            }}
            onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            accessibilityLabel={`${label} tab`}
          >
            {options.tabBarIcon?.({ focused, color, size: 23 })}
            {focused ? <Text style={styles.tabLabel}>{label}</Text> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

// ============================================================
// Tab bar — Ghana-inspired vector icons and existing app colours.
// ============================================================

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
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

const styles = StyleSheet.create({
  tabShell: {
    position: 'absolute',
    left: 14,
    right: 14,
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
  tabItem: {
    minWidth: 48,
    height: 48,
    paddingHorizontal: 12,
    borderRadius: Radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  tabItemActive: { backgroundColor: Colors.forestSoft },
  tabItemPressed: { opacity: 0.72 },
  tabLabel: { color: Colors.forestDark, fontSize: 12, fontWeight: '800' },
});
