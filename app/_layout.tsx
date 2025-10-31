import * as Font from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "./global.css";

export default function RootLayout() {
     const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        SpaceGrotesk_400Regular: require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
        SpaceGrotesk_500Medium: require("../assets/fonts/SpaceGrotesk-Medium.ttf"),
        SpaceGrotesk_600SemiBold: require("../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        SpaceGrotesk_700Bold: require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
      });
      setLoaded(true);
    })();
  }, []);

  if (!loaded) return null;

  if (!loaded) {
    return (
      <View className="flex-1 items-center font-grotesk justify-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
