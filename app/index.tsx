//index.tsx
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import { useUserStore } from "../store/userStore";

export default function Onboarding() {
  const swiperRef = useRef<Swiper>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // Track hydration so we don't render <Redirect> before Zustand has loaded from storage
  const [hydrated, setHydrated] = useState(useUserStore.persist.hasHydrated());
  const token = useUserStore((s) => s.token);

  const totalScreens = 4;

  useEffect(() => {
    if (hydrated) return;
    const unsub = useUserStore.persist.onFinishHydration(() => setHydrated(true));
    return () => unsub();
  }, []);

  // Blank while waiting for storage hydration
  if (!hydrated) return null;

  // Let expo-router handle the navigation safely via <Redirect>
  if (token) return <Redirect href="/(tabs)/home" />;

  const handleSkip = () => {
    swiperRef.current?.scrollBy(totalScreens - currentIndex - 1, true);
  };

  const handleNext = () => {
    if (currentIndex === totalScreens - 1) {
      router.push("/auth/choose-account" as any);
    } else {
      swiperRef.current?.scrollBy(1, true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      swiperRef.current?.scrollBy(-1, true);
    }
  };

  return (
    <View className="flex-1 bg-white font-grotesk">
      {/* Header Controls (Back + Skip) */}
      <View className="flex-row justify-between items-center px-6 pt-12">
        {currentIndex > 0 ? (
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        ) : (
          <View className="w-6" />
        )}

        {currentIndex < totalScreens - 1 && (
          <TouchableOpacity onPress={handleSkip}>
            <Text className="text-gray-800 font-medium">Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Swiper Screens */}
      <Swiper
        ref={swiperRef}
        loop={false}
        showsButtons={false}
        dotColor="#ccc"
        activeDotColor="#2563eb"
        onIndexChanged={(index) => setCurrentIndex(index)}
      >
        {/* Screen 1 */}
        <View className="flex-1 items-center justify-center bg-white">
          <Image
            source={require("@/assets/images/storra.png")}
            className="w-60 h-60 mb-6"
            resizeMode="contain"
          />
        </View>

        {/* Screen 2 */}
        <View className="flex-1 items-center justify-center bg-white px-6">
          <Image
            source={require("@/assets/images/onboard1.png")}
            className="w-80 h-80 w-full mb-8"
            resizeMode="contain"
          />
          <Text className="font-grotesk font-semibold text-[25px] text-gray-800 mb-4 text-center">
            Fun, gamified learning for every age group.
          </Text>
          <Text className="text-[15px] text-gray-500 text-center">
            Explore fun lessons with videos, stories, games, and daily quizzes.
          </Text>
        </View>

        {/* Screen 3 */}
        <View className="flex-1 items-center justify-center bg-white px-6">
          <Image
            source={require("@/assets/images/onboard2.png")}
            className="w-80 h-80 w-full mb-8"
            resizeMode="contain"
          />
          <Text className="font-grotesk font-semibold text-[25px] text-gray-800 mb-4 text-center">
            Earn & Collect Rewards As You Earn
          </Text>
          <Text className="text-[15px] text-gray-500 text-center">
            Complete lessons and quizzes to earn points you can turn into cash,
            airtime, or gifts.
          </Text>
        </View>

        {/* Screen 4 */}
        <View className="flex-1 items-center justify-center bg-white px-6">
          <Image
            source={require("@/assets/images/onboard3.png")}
            className="w-80 h-80 w-full mb-8"
            resizeMode="contain"
          />
          <Text className="font-grotesk font-semibold text-[25px] text-gray-800 mb-4 text-center">
            Play, Compete, Win
          </Text>
          <Text className="text-[15px] text-gray-500 text-center">
            Join monthly challenges, climb the leaderboard, and stand a chance
            to win cash rewards.
          </Text>
        </View>
      </Swiper>

      {/* Continue / Next Button */}
      <View className="px-6 pb-10">
        <TouchableOpacity
          onPress={handleNext}
          className="mt-6 w-16 h-16 bg-blue-600 rounded-full items-center justify-center self-center"
        >
          <Ionicons name="arrow-forward" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
