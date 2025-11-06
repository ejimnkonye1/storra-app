import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function LeaderboardScreen() {
  const router = useRouter();
  const [tab, setTab] = useState("Monthly");

  const top3 = [
    {
      id: 1,
      name: "Alex R.",
      points: 34500,
      image: require("../../assets/images/pro.jpg"),
      color: "border-yellow-400",
      rank: 1,
    },
    {
      id: 2,
      name: "Sarah J.",
      points: 32100,
      image: require("../../assets/images/pro.jpg"),
      color: "border-gray-400",
      rank: 2,
    },
    {
      id: 3,
      name: "Mike T.",
      points: 30850,
      image: require("../../assets/images/pro.jpg"),
      color: "border-orange-400",
      rank: 3,
    },
  ];

  const others = [
    { id: 4, name: "Emily Carter", points: 29980, image: require("../../assets/images/pro.jpg"), up: true },
    { id: 5, name: "David Chen", points: 28550, image: require("../../assets/images/pro.jpg"), up: false },
    { id: 6, name: "Chloe Kim", points: 27400, image: require("../../assets/images/pro.jpg"), up: true },
  ];

  return (
    <View className="flex-1 bg-gray-50 pt-12 px-5">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Leaderboard</Text>
        <Ionicons name="help-circle-outline" size={22} color="black" />
      </View>

      {/* Tabs */}
      <View className="flex-row bg-gray-200 rounded-full p-1 mb-6">
        {["Weekly", "Monthly", "All-Time"].map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            className={`flex-1 py-2 rounded-full ${
              tab === t ? "bg-white" : ""
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                tab === t ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top 3 */}
        <View className="flex-row justify-around items-end mb-8">
          {top3.map((u, idx) => (
            <View
              key={u.id}
              className={`items-center ${
                idx === 0 ? "mt-0" : idx === 1 ? "mt-6" : "mt-8"
              }`}
            >
              <View
                className={`w-24 h-24 rounded-full border-4 ${u.color} overflow-hidden`}
              >
                <Image
                  source={u.image}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <Text className="font-semibold text-gray-800 mt-2">{u.name}</Text>
              <Text className="text-gray-500 text-sm">{u.points} pts</Text>
              <View
                className={`absolute -bottom-3 right-1 bg-${
                  u.rank === 1
                    ? "yellow"
                    : u.rank === 2
                    ? "gray"
                    : "orange"
                }-400 rounded-full w-6 h-6 items-center justify-center`}
              >
                <Text className="font-bold text-lg text-blue-400 relative top-[-45px] ">{u.rank}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Others */}
        {others.map((o, i) => (
          <View
            key={o.id}
            className="flex-row items-center justify-between bg-white rounded-2xl px-4 py-3 mb-3 shadow-sm"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center mr-3">
                <Text className="font-bold text-gray-700">{o.id}</Text>
              </View>
              <Image
                source={o.image}
                className="w-10 h-10 rounded-full mr-3"
                resizeMode="cover"
              />
              <View>
                <Text className="font-semibold text-gray-800">{o.name}</Text>
                <Text className="text-gray-500 text-sm">{o.points} pts</Text>
              </View>
            </View>
            <Ionicons
              name={o.up ? "arrow-up" : "arrow-down"}
              size={18}
              color={o.up ? "green" : "red"}
            />
          </View>
        ))}

        {/* Your Rank */}
        <View className="flex-row items-center justify-between bg-blue-50 border border-blue-300 rounded-2xl px-4 py-3 mt-6">
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-blue-600 rounded-full items-center justify-center mr-3">
              <Text className="font-bold text-white">58</Text>
            </View>
            <Image
              source={require("../../assets/images/pro.jpg")}
              className="w-10 h-10 rounded-full mr-3"
              resizeMode="cover"
            />
            <View>
              <Text className="font-semibold text-gray-800">Your Rank</Text>
              <Text className="text-gray-500 text-sm">15,620 pts</Text>
            </View>
          </View>
          <Ionicons name="remove" size={18} color="gray" />
        </View>

        {/* Boost Button */}
        <TouchableOpacity className="bg-blue-600 rounded-full py-4 mt-6 mb-10">
          <Text className="text-white font-semibold text-center text-base">
            🚀 Boost Your Rank
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
