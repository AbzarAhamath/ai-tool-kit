// app/bot/[serviceId].jsx
import { useState } from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { services } from '../../services/configs';
import { runAIRequest } from '../../services/aiService';
import { saveToHistory } from '../../services/historyService';
import InputPanel from '../../components/InputPanel';
import OptionsSelector from '../../components/OptionsSelector';
import ResultCard from '../../components/ResultCard';
import { colors, spacing, radii, typography } from '../../constants/theme';

export default function BotScreen() {
  const { serviceId } = useLocalSearchParams();
  const config = services[serviceId];

  const [userText, setUserText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  if (!config) {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.textPrimary }}>Tool not found.</Text>
      </View>
    );
  }

  const canSubmit = config.inputType === 'text' ? userText.trim().length > 0 : !!imageUri;

  const handleSubmit = async () => {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const response = await runAIRequest({
        config,
        userText,
        imageUris: imageUri ? [imageUri] : [],
        options,
      });

      setResult(response);

      await saveToHistory({
        serviceId: config.id,
        serviceName: config.name,
        result: response,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{config.name}</Text>
      <Text style={styles.desc}>{config.description}</Text>

      <InputPanel
        config={config}
        userText={userText}
        setUserText={setUserText}
        imageUri={imageUri}
        setImageUri={setImageUri}
      />

      <OptionsSelector
        extraOptions={config.extraOptions}
        options={options}
        setOptions={setOptions}
      />

      <Pressable
        style={[styles.button, !canSubmit && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!canSubmit || loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.textPrimary} />
        ) : (
          <Text style={styles.buttonText}>Run</Text>
        )}
      </Pressable>

      {error && <Text style={styles.error}>{error}</Text>}

      <ResultCard result={result} resultLayout={config.resultLayout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  title: { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: colors.textPrimary },
  desc: { fontSize: typography.size.sm, color: colors.textSecondary, marginTop: 4, marginBottom: spacing.lg },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: { color: colors.textPrimary, fontWeight: typography.weight.semibold },
  error: { color: colors.error, marginBottom: spacing.md },
});