import { Stack } from "expo-router";
import "./global.css";
import { NavigationProvider } from "./context/NavigationContext";


export default function RootLayout() {


  return (
    <NavigationProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </NavigationProvider>
    
  );
}
