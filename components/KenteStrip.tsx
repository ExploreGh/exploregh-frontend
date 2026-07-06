import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

// ============================================================
// KenteStrip — ExploreGH's signature design element.
// A thin woven stripe in Ghana's flag colours, used under
// headers across the app. Small detail, instantly recognisable.
// ============================================================

export default function KenteStrip() {
  return (
    <View style={styles.row}>
      <View style={[styles.seg, { backgroundColor: Colors.gold, flex: 3 }]} />
      <View style={[styles.seg, { backgroundColor: Colors.red, flex: 1 }]} />
      <View style={[styles.seg, { backgroundColor: Colors.ink, flex: 1 }]} />
      <View style={[styles.seg, { backgroundColor: Colors.gold, flex: 2 }]} />
      <View style={[styles.seg, { backgroundColor: Colors.forest, flex: 1 }]} />
      <View style={[styles.seg, { backgroundColor: Colors.gold, flex: 3 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 4,
    width: '100%',
  },
  seg: {
    height: '100%',
  },
});
