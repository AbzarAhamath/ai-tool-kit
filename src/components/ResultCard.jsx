// components/ResultCard.jsx
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii, typography } from '../constants/theme';

export default function ResultCard({ result, resultLayout }) {
  if (!result) return null;

  if (resultLayout === 'explanation') {
    return (
      <View style={styles.card}>
        <Text style={styles.summary}>{result.summary}</Text>
        <Text style={styles.body}>{result.explanation}</Text>

        {result.analogy ? (
          <View style={styles.subBox}>
            <Text style={styles.label}>Think of it like this</Text>
            <Text style={styles.body}>{result.analogy}</Text>
          </View>
        ) : null}

        {result.keyTerms?.length > 0 && (
          <View style={{ marginTop: spacing.md }}>
            <Text style={styles.label}>Key Terms</Text>
            {result.keyTerms.map((item, i) => (
              <View key={i} style={{ marginTop: spacing.xs }}>
                <Text style={styles.termName}>{item.term}</Text>
                <Text style={styles.body}>{item.meaning}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }

  if (resultLayout === 'diagnosis') {
    return (
      <View style={styles.card}>
        <Text style={styles.summary}>{result.plantGuess}</Text>
        <Text style={styles.body}>{result.diagnosis}</Text>

        <View style={styles.urgencyRow}>
          <Text style={styles.label}>Urgency: </Text>
          <Text style={[styles.urgencyText, urgencyColor(result.urgency)]}>
            {result.urgency?.toUpperCase()}
          </Text>
        </View>

        {result.issues?.length > 0 && (
          <View style={{ marginTop: spacing.md }}>
            <Text style={styles.label}>Issues Found</Text>
            {result.issues.map((item, i) => (
              <View key={i} style={{ marginTop: spacing.xs }}>
                <Text style={styles.termName}>{item.problem}</Text>
                <Text style={styles.body}>{item.explanation}</Text>
              </View>
            ))}
          </View>
        )}

        {result.careTips?.length > 0 && (
          <View style={styles.subBox}>
            <Text style={styles.label}>Care Tips</Text>
            {result.careTips.map((tip, i) => (
              <Text key={i} style={styles.body}>• {tip}</Text>
            ))}
          </View>
        )}

        {/* Edibility section */}
        <View style={styles.divider} />

        <View style={styles.urgencyRow}>
          <Text style={styles.label}>Edible: </Text>
          <Text style={[styles.urgencyText, edibilityColor(result.isEdible)]}>
            {result.isEdible?.toUpperCase()}
          </Text>
        </View>

        {result.isEdible === 'yes' && result.healthBenefits?.length > 0 && (
          <View style={styles.subBox}>
            <Text style={styles.label}>Health Benefits</Text>
            {result.healthBenefits.map((item, i) => (
              <View key={i} style={{ marginTop: spacing.xs }}>
                <Text style={styles.termName}>{item.benefit}</Text>
                <Text style={styles.body}>{item.detail}</Text>
              </View>
            ))}
          </View>
        )}

        {result.isEdible === 'yes' && result.conditionsItMayHelp?.length > 0 && (
          <View style={{ marginTop: spacing.md }}>
            <Text style={styles.label}>May Help With</Text>
            {result.conditionsItMayHelp.map((c, i) => (
              <Text key={i} style={styles.body}>• {c}</Text>
            ))}
          </View>
        )}

        {result.isEdible === 'no' && result.toxicityWarning ? (
          <View style={[styles.subBox, { borderColor: colors.error, borderWidth: 1 }]}>
            <Text style={[styles.label, { color: colors.error }]}>⚠ Toxicity Warning</Text>
            <Text style={styles.body}>{result.toxicityWarning}</Text>
          </View>
        ) : null}

        {result.edibilityDisclaimer ? (
          <Text style={styles.disclaimer}>{result.edibilityDisclaimer}</Text>
        ) : (
          <Text style={styles.disclaimer}>
            This is an AI estimate, not a guarantee. Never eat a wild plant based on an app alone — confirm with a local expert first.
          </Text>
        )}
      </View>
    );
  }

  if (resultLayout === 'macros') {
    return (
      <View style={styles.card}>
        <Text style={styles.summary}>{result.mealGuess}</Text>

        <View style={styles.macroRow}>
          <MacroBox label="Calories" value={result.calories} />
          <MacroBox label="Protein" value={`${result.protein}g`} />
          <MacroBox label="Carbs" value={`${result.carbs}g`} />
          <MacroBox label="Fat" value={`${result.fat}g`} />
        </View>

        {result.notes ? <Text style={[styles.body, { marginTop: spacing.md }]}>{result.notes}</Text> : null}
      </View>
    );
  }

  // fallback: raw dump for layouts not built yet (code, recipe, outfit)
  return (
    <View style={styles.card}>
      <Text style={styles.body}>{JSON.stringify(result, null, 2)}</Text>
    </View>
  );
}

function MacroBox({ label, value }) {
  return (
    <View style={styles.macroBox}>
      <Text style={styles.macroValue}>{value}</Text>
      <Text style={styles.macroLabel}>{label}</Text>
    </View>
  );
}

function urgencyColor(level) {
  if (level === 'high') return { color: colors.error };
  if (level === 'medium') return { color: colors.warning };
  return { color: colors.secondary };
}

function edibilityColor(status) {
  if (status === 'yes') return { color: colors.secondary };
  if (status === 'no') return { color: colors.error };
  return { color: colors.warning };
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  summary: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  body: {
    color: colors.textPrimary,
    lineHeight: 21,
    fontSize: typography.size.sm,
  },
  subBox: {
    marginTop: spacing.md,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.md,
    padding: spacing.sm,
  },
  label: {
    color: colors.secondary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  termName: {
    color: colors.textPrimary,
    fontWeight: typography.weight.semibold,
    fontSize: typography.size.sm,
  },
  urgencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  urgencyText: {
    fontWeight: typography.weight.bold,
    fontSize: typography.size.sm,
  },
  macroRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  macroBox: {
    flex: 1,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.md,
    padding: spacing.sm,
    alignItems: 'center',
  },
  macroValue: {
    color: colors.textPrimary,
    fontWeight: typography.weight.bold,
    fontSize: typography.size.md,
  },
  macroLabel: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  disclaimer: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    marginTop: spacing.md,
    fontStyle: 'italic',
    lineHeight: 16,
  },
});