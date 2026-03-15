// app/_layout.tsx
import { useUserStore } from '@/store/userStore';
import { Stack } from 'expo-router';
import { NavigationProvider } from './context/NavigationContext';
import NotificationModal from './components/home/NotificationModal';
import './global.css';
// Import once here so the Axios interceptor is registered for the entire app lifetime
import '../services/userService';

function GlobalNotification() {
  const { user, notifVisible, setNotifVisible } = useUserStore();
  return (
    <NotificationModal
      visible={notifVisible}
      onClose={() => setNotifVisible(false)}
      user={user}
    />
  );
}

export default function RootLayout() {
  return (
    <NavigationProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="login"/>
        <Stack.Screen name="onboarding"/>
        <Stack.Screen name="(tabs)"/>
      </Stack>
      <GlobalNotification />
    </NavigationProvider>
  );
}
