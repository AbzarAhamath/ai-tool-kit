// components/ServiceCard.jsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radii, typography } from '../constants/theme';

export default function ServiceCard({ service, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconWrap}>
        <Ionicons name={service.icon} size={24} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{service.name}</Text>
        <Text style={styles.desc}>{service.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  title: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
  desc: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
});