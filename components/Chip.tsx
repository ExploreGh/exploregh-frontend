import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Radius } from '@/constants/theme';

// ============================================================
// Chip — a selectable pill used for category filters.
// Selected chips fill green with gold text.
// ============================================================

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export default function Chip({ label, selected = false, onPress }: ChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: Radius.pill,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.line,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: Colors.forest,
    borderColor: Colors.forest,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.slate,
  },
  labelSelected: {
    color: Colors.gold,
  },
});
