import { BASE_URL } from "@/backendconfig";
import { useUserStore } from "@/store/userStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";


export default function DailyRewardScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [claimedToday, setClaimedToday] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [rewardsData, setRewardsData] = useState<{amount?: number, type?: string} | null>(null);

 const { 
   
        token, 

    } = useUserStore();

  // Fetch daily reward info
  const fetchDailyInfo = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/daily/info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      setClaimedToday(data.dailyClaimed);
      setCurrentStreak(data.currentStreak);
      setLongestStreak(data.longestStreak);
      setRewardsData(data.rewards || null);
    } catch (error) {
      console.error("Failed to fetch daily info:", error);
      Alert.alert("Error", "Could not fetch daily reward info.");
    } finally {
      setLoading(false);
    }
  };

  const claimDailyReward = async () => {
    if (claiming || claimedToday) return;

    try {
      setClaiming(true);
      const res = await fetch(`${BASE_URL}/daily/claim`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        setCurrentStreak(data.data?.streak || currentStreak + 1);
        setClaimedToday(true);
        setRewardsData(data.data?.rewards?.[0] || null);
        Alert.alert(
          "🎉 Reward Claimed!",
          `You earned ${data.data?.rewards
            ?.map((r: any) => `${r.amount} ${r.type}`)
            .join(", ")}!\n\nStreak: ${data.data?.streak} days`
        );
      } else {
        Alert.alert("Info", data.message || "Could not claim reward.");
      }
    } catch (error) {
      console.error("Claim failed:", error);
      Alert.alert("Error", "Failed to claim reward.");
    } finally {
      setClaiming(false);
    }
  };

  useEffect(() => {
    fetchDailyInfo();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="mt-4 text-gray-600 font-medium">Loading daily reward...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Daily Reward</Text>
          <View style={{ width: 26 }} /> {/* Placeholder for spacing */}
        </View>

        {/* Streak */}
        <View className="bg-orange-400 rounded-3xl p-5 mb-6 shadow-lg">
          <Text className="text-2xl font-bold text-white">🔥 Current Streak: {currentStreak} days</Text>
          <Text className="text-white opacity-90 mt-1">Longest streak: {longestStreak} days</Text>
        </View>

        {/* Claim Button */}
        {claimedToday ? (
          <View className="bg-gray-300 rounded-3xl p-5 mb-6 items-center">
            <Text className="text-gray-700 font-bold">You have already claimed today ✅</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={claimDailyReward}
            disabled={claiming}
            className="bg-green-500 rounded-3xl p-5 mb-6 items-center flex-row justify-center"
          >
            {claiming && <ActivityIndicator color="#fff" />}
            <Text className="text-white font-bold text-lg ml-2">
              {claiming ? "Claiming..." : "Claim Today's Reward"}
            </Text>
          </TouchableOpacity>
        )}

        {/* Reward Info */}
        {rewardsData && (
          <View className="bg-white rounded-2xl p-5 shadow mb-6">
            <Text className="text-gray-900 font-bold text-lg">Last Reward</Text>
            <Text className="text-gray-700 mt-1">
              {rewardsData.amount} {rewardsData.type}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
