import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function RewardScreen() {
  const router = useRouter();
  const [claimed, setClaimed] = useState<{ [key: string]: boolean }>({
    "7-Day Streak": true,
  });

  // Daily rewards (Day 1–10)
  const dailyRewards = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    day: `Day ${i + 1}`,
    icon: "gift-outline",
  }));

  const achievements = [
    {
      id: "1",
      title: "First Course Completed",
      points: 50,
      color: "bg-blue-50",
      icon: "school-outline",
    },
    {
      id: "2",
      title: "Perfect Quiz Score",
      points: 100,
      color: "bg-blue-50",
      icon: "ribbon-outline",
    },
    {
      id: "3",
      title: "7-Day Streak Achieved",
      points: 250,
      color: "bg-yellow-50",
      icon: "calendar-outline",
    },
  ];

  return (
    <View className="flex-1 bg-gray-50 pt-12 px-5">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-bold text-gray-900">
          My Rewards
        </Text>
        <View className="w-6" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Streak Card */}
        <View className="bg-white rounded-3xl shadow-sm p-5 mb-4 flex-row items-center">
          <Ionicons name="flame" size={28} color="#FACC15" />
          <View className="ml-3">
            <Text className="text-xl font-bold text-blue-600">
              15 Day Streak!
            </Text>
            <Text className="text-gray-500">
              Keep it up to earn bonus points!
            </Text>
          </View>
        </View>

        {/* Daily Reward Grid */}
        <Text className="text-lg font-bold text-gray-800 mb-3">
          Daily Rewards
        </Text>
        <View className="flex-row flex-wrap justify-between mb-6">
          {dailyRewards.map((r) => (
            <TouchableOpacity
              key={r.id}
              onPress={() =>
                setClaimed((prev) => ({ ...prev, [r.day]: true }))
              }
              className={`w-[22%] bg-white rounded-2xl mb-4 items-center justify-center p-3 ${
                claimed[r.day] ? "opacity-60" : ""
              }`}
            >
              <View className="bg-green-100 rounded-full p-2 mb-2">
                <Ionicons
                  name={r.icon as any}
                  size={20}
                  color={claimed[r.day] ? "#9CA3AF" : "#16A34A"}
                />
              </View>
              <Text
                className={`text-sm font-semibold ${
                  claimed[r.day] ? "text-gray-400" : "text-green-700"
                }`}
              >
                {r.day}
              </Text>
              {claimed[r.day] ? (
                <Text className="text-xs text-gray-400 mt-1">Claimed</Text>
              ) : (
                <Text className="text-xs text-green-600 mt-1">Claim</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Achievements */}
        <Text className="text-lg font-bold text-gray-800 mb-2">
          Unlocked Achievements
        </Text>

        {achievements.map((a) => (
          <View
            key={a.id}
            className="bg-white rounded-3xl p-4 mb-3 flex-row justify-between items-center"
          >
            <View className="flex-row items-center">
              <View
                className={`w-12 h-12 ${a.color} rounded-full items-center justify-center`}
              >
                <Ionicons name={a.icon as any} size={22} color="#2563EB" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-900 font-semibold text-base">
                  {a.title}
                </Text>
                <Text className="text-gray-500 text-sm">
                  +{a.points} Points
                </Text>
              </View>
            </View>

            {claimed[a.title] ? (
              <Text className="text-gray-400 font-semibold">Claimed</Text>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  setClaimed((prev) => ({ ...prev, [a.title]: true }))
                }
                className="bg-green-100 px-4 py-2 rounded-full"
              >
                <Text className="text-green-700 font-semibold">Claim</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Footer */}
        <View className="flex-row justify-between items-center mt-4 py-4 border-t border-gray-200">
          <View>
            <Text className="text-gray-500 text-sm">Your Total Points</Text>
            <Text className="text-blue-600 font-bold text-xl">1,250</Text>
          </View>
          <TouchableOpacity className="bg-green-600 py-3 px-6 rounded-full">
            <Text className="text-white font-semibold text-base">
              Redeem Points
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
