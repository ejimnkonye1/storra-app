import { Feather, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Cards() {
  const router = useRouter();

  const cards = [
    {
      title: "Send Money",
      desc: "Instant transfers",
      icon: <Feather name="send" size={24} color="#2563EB" />,
      bg: "bg-blue-100",
      // route: "/wallet/sendmoney",
    },
    {
      title: "Earn Rewards",
      desc: "Complete tasks and Earn",
      icon: <Ionicons name="gift-outline" size={24} color="#7C3AED" />,
      bg: "bg-purple-100",
      route: "/wallet/reward",
    },
    {
      title: "Withdraw Money",
      desc: "Cash out to Bank",
      icon: <Feather name="arrow-down-circle" size={24} color="#F97316" />,
      bg: "bg-orange-100",
      // route: "/wallet/withdraw",
    },
    {
      title: "Buy Airtime",
      desc: "Top-up easily",
      icon: <FontAwesome5 name="mobile-alt" size={22} color="#10B981" />,
      bg: "bg-green-100",
      route: "/wallet/airtime",
    },
    {
      title: "Pay Bills",
      desc: "Electricity, Data & More",
      icon: <MaterialIcons name="payment" size={22} color="#3B82F6" />,
      bg: "bg-indigo-100",
      route: "/wallet/bills",
    },
    {
      title: "Referral Program",
      desc: "Invite & Earn",
      icon: <Ionicons name="people-outline" size={22} color="#8B5CF6" />,
      bg: "bg-purple-100",
      route: "/wallet/referral",
    },
  ];

  return (
    <View className="flex flex-row flex-wrap justify-between mb-1">
      {cards.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => router.push(item.route)}
          className="bg-white w-[31%] rounded-xl shadow-sm p-4 items-center mb-4"
          activeOpacity={0.8}
        >
          <View className={`${item.bg} p-3 rounded-full mb-2`}>{item.icon}</View>
          <Text className="text-gray-800 font-semibold text-sm text-center mb-1">
            {item.title}
          </Text>
          <Text className="text-gray-500 text-xs text-center">{item.desc}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
