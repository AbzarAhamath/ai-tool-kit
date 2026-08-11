// app/history/index.jsx
import { useState, useCallback } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getHistory, deleteFromHistory } from '../../services/historyService';
import { colors, spacing, radii, typography } from '../../constants/theme';

export default function History() {
  const [items, setItems] = useState([]);

  const loadHistory = useCallback(() => {
    getHistory().then(setItems);
  }, []);

  useFocusEffect(loadHistory);

  const handleDelete = async (id) => {
    await deleteFromHistory(id);
    loadHistory();
  };

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>No history yet. Run a tool to see results here.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.serviceName}>{item.serviceName}</Text>
              <Text style={styles.date}>
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </View>
            <Pressable onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash-outline" size={20} color={colors.error} />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  empty: { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  serviceName: {
    color: colors.textPrimary,
    fontWeight: typography.weight.semibold,
    fontSize: typography.size.sm,
  },
  date: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    marginTop: 2,
  },
});