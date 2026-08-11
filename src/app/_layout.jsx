// app/_layout.jsx
import { Stack } from 'expo-router';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'AI Toolkit' }} />
      <Stack.Screen name="bot/[serviceId]" options={{ title: '' }} />
      <Stack.Screen name="history/index" options={{ title: 'History' }} />
    </Stack>
  );
}