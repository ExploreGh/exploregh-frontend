// ============================================================
// ExploreGH Design System
// Every color, spacing and shadow in the app comes from here.
// Change a value here and the WHOLE app updates. 🇬🇭
// ============================================================

export const Colors = {
  // Ghana flag palette
  forest: '#006B3F',      // primary green
  forestDark: '#004D2C',  // darker green (pressed states, gradients)
  gold: '#FCD20F',        // Ghana gold (main accent / CTAs)
  red: '#CE1126',         // Ghana red (alerts & danger only)
  ink: '#161B18',         // near-black text (also the black star colour)

  // Neutrals
  slate: '#6A7370',       // secondary text
  mist: '#F4F6F3',        // app background (soft green-tinted, not plain gray)
  line: '#E4E8E3',        // borders / dividers
  white: '#FFFFFF',

  // Soft tints for badges & banners
  forestSoft: '#E7F2EC',
  goldSoft: '#FFF7DA',
  redSoft: '#FCEBEA',
};

export const Radius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// One soft, consistent card shadow used everywhere
export const Shadow = {
  card: {
    shadowColor: '#0B2818',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
};
