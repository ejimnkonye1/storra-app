
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
export default function Transaction(){
    return(
        <View className="mb-4">
  {/* Header */}
  <View className="flex-row justify-between items-center mb-3">
    <Text className="text-md font-semibold text-gray-800">Recent Transactions</Text>
    <TouchableOpacity activeOpacity={0.7}>
      <Text className="text-blue-600 text-sm font-medium">See all</Text>
    </TouchableOpacity>
  </View>

  {/* Transactions List */}
  <View className="bg-white rounded-2xl shadow-sm p-4">
    {[
      {
        title: "Added Money",
        desc: "Bank Transfer",
        amount: "+₦16,900",
        icon: <Feather name="arrow-down-circle" size={20} color="#10B981" />,
      },
      {
        title: "John Doe",
        desc: "Lunch Payment",
        amount: "-₦25.50",
        icon: <Feather name="arrow-up-circle" size={20} color="#EF4444" />,
      },
      {
        title: "Referral Bonus",
        desc: "Friend Joined",
        amount: "+₦500",
        icon: <Ionicons name="gift-outline" size={20} color="#8B5CF6" />,
      },
    ].map((item, index) => (
      <TouchableOpacity
        key={index}
        activeOpacity={0.8}
        className="flex-row items-center justify-between py-3 px-2 mb-1 rounded-xl"
      >
        {/* Left section: icon + text */}
        <View className="flex-row items-center flex-1">
          <View className="bg-gray-100 p-3 rounded-full mr-3">
            {item.icon}
          </View>
          <View>
            <Text className="text-gray-800 font-semibold text-sm">{item.title}</Text>
            <Text className="text-gray-500 text-xs">{item.desc}</Text>
          </View>
        </View>

        {/* Amount */}
        <Text
          className={`font-semibold ${
            item.amount.startsWith('+') ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {item.amount}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
</View>
    )
}