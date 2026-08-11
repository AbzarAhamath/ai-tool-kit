// components/GlassCard.jsx
import { View, StyleSheet } from 'react-native';
import { colors, radii, spacing } from '../constants/theme';

// Reusable glass-style container — use this instead of raw View + border
// anywhere you want the "futuristic panel" look (cards, result boxes, etc).
export default function GlassCard({ children, style, glow = false }) {
  return (
    <View style={[styles.card, glow && styles.glow, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  glow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
});