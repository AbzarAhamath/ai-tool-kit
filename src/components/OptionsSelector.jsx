// components/OptionsSelector.jsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radii, typography } from '../constants/theme';

// Renders each extraOption from a config as a row of pill buttons.
// options = current selected values { cuisine: 'indian', ... }
// setOptions = updater function
export default function OptionsSelector({ extraOptions, options, setOptions }) {
  if (!extraOptions || extraOptions.length === 0) return null;

  const selectValue = (key, value) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View style={{ marginBottom: spacing.md }}>
      {extraOptions.map((opt) => {
        const selected = options[opt.key] ?? opt.default;

        return (
          <View key={opt.key} style={{ marginBottom: spacing.sm }}>
            <Text style={styles.label}>{opt.label}</Text>
            <View style={styles.row}>
              {opt.choices.map((choice) => {
                const isActive = selected === choice.value;
                return (
                  <Pressable
                    key={choice.value}
                    style={[styles.pill, isActive && styles.pillActive]}
                    onPress={() => selectValue(opt.key, choice.value)}
                  >
                    <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                      {choice.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  pill: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pillText: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
  },
  pillTextActive: {
    color: colors.textPrimary,
  },
});