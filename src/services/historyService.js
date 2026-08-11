// services/historyService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'ai_toolkit_history';

// Get all saved results, newest first
export async function getHistory() {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Save one result to history
export async function saveToHistory({ serviceId, serviceName, result }) {
  const history = await getHistory();

  const entry = {
    id: Date.now().toString(),
    serviceId,
    serviceName,
    result,
    createdAt: new Date().toISOString(),
  };

  const updated = [entry, ...history];
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return entry;
}

// Delete one entry by id
export async function deleteFromHistory(id) {
  const history = await getHistory();
  const updated = history.filter((item) => item.id !== id);
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

// Clear everything
export async function clearHistory() {
  await AsyncStorage.removeItem(HISTORY_KEY);
}