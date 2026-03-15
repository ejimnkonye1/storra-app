// app/_layout.tsx
import { useUserStore } from '@/store/userStore';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationProvider } from './context/NavigationContext';
import './global.css';

export default function RootLayout() {
    const { loadUser,  } = useUserStore();

  // useEffect(() => {
  //   const init = async () => {
  //     await loadUser();           // Load token from AsyncStorage

  //   };
  //   init();
  // }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Onboarding or login routes (no tabs) */}
          <Stack.Screen name="index"/>
          <Stack.Screen name="login"/>
          <Stack.Screen name="onboarding"/>

          {/* Main app routes with bottom tabs */}
          <Stack.Screen name="(tabs)"/>
        </Stack>
      </NavigationProvider>
    </GestureHandlerRootView>
  )
}
