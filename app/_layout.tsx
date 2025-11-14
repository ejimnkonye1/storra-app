// app/_layout.tsx
import { Stack } from 'expo-router'
import './global.css'
import { NavigationProvider } from './context/NavigationContext'

export default function RootLayout() {
  return (
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
          <Stack.Screen name="screens"/>

        {/* Main app routes with bottom tabs */}
        <Stack.Screen name="(tabs)"/>
      </Stack>
    </NavigationProvider>
  )
}
