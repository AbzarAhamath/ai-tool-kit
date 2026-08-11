// components/InputPanel.jsx
import { View, Text, TextInput, Pressable, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radii, typography } from '../constants/theme';

export default function InputPanel({ config, userText, setUserText, imageUri, setImageUri }) {
  const pickImage = async (fromCamera) => {
    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert('Permission is needed to continue.');
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({ quality: 0.7 })
      : await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  if (config.inputType === 'text') {
    return (
      <TextInput
        style={styles.textInput}
        placeholder="Paste your text here..."
        placeholderTextColor={colors.textSecondary}
        value={userText}
        onChangeText={setUserText}
        multiline
      />
    );
  }

  // image or multi-image input
  return (
    <View>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.preview} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="image-outline" size={32} color={colors.textSecondary} />
          <Text style={styles.placeholderText}>No image selected</Text>
        </View>
      )}

      <View style={styles.row}>
        <Pressable style={styles.imageButton} onPress={() => pickImage(true)}>
          <Ionicons name="camera-outline" size={18} color={colors.textPrimary} />
          <Text style={styles.imageButtonText}>Camera</Text>
        </Pressable>
        <Pressable style={styles.imageButton} onPress={() => pickImage(false)}>
          <Ionicons name="images-outline" size={18} color={colors.textPrimary} />
          <Text style={styles.imageButtonText}>Gallery</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    color: colors.textPrimary,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: spacing.md,
  },
  preview: {
    width: '100%',
    height: 220,
    borderRadius: radii.md,
    marginBottom: spacing.md,
  },
  placeholder: {
    width: '100%',
    height: 220,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  placeholderText: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontSize: typography.size.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.md,
    paddingVertical: spacing.sm + 2,
  },
  imageButtonText: {
    color: colors.textPrimary,
    fontWeight: typography.weight.medium,
  },
});