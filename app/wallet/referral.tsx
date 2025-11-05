import { Feather, Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import React from "react";
import {
    Alert,
    ScrollView,
    Share,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ReferralScreen() {
  const router = useRouter();
  const referralCode = "1587-9758-8582-0472-1587";
  const totalReferred = 12;
  const totalEarned = 1500;

  const handleCopy = async () => {
  
    Alert.alert("Copied!", "Referral code copied to clipboard.");
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join EduWallet using my referral code: ${referralCode}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 bg-white pt-12 px-5">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-gray-900">
          Referral Program
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-gray-500 mb-6">
          Invite friends and earn rewards when they join EduWallet.
        </Text>

        {/* Referral Code */}
        <Text className="text-center text-gray-700 font-semibold mb-2">
          Your Referral Code
        </Text>

        <View className="border border-blue-500 rounded-xl flex-row justify-between items-center px-4 py-3 mb-6">
          <Text className="text-blue-600 font-semibold text-xs flex-1">
            {referralCode}
          </Text>
          <TouchableOpacity onPress={handleCopy}>
            <Feather name="copy" size={18} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="flex-row justify-between mb-6">
          <View className="w-[48%] bg-gray-50 rounded-xl p-4 items-center">
            <Text className="text-gray-900 text-lg font-bold">
              {totalReferred}
            </Text>
            <Text className="text-gray-500 text-xs mt-1">Total Referred</Text>
          </View>
          <View className="w-[48%] bg-gray-50 rounded-xl p-4 items-center">
            <Text className="text-gray-900 text-lg font-bold">
              ₦{totalEarned}
            </Text>
            <Text className="text-gray-500 text-xs mt-1">Total Earned</Text>
          </View>
        </View>

        {/* Share Button */}
        <TouchableOpacity
          onPress={handleShare}
          className="bg-blue-600 py-4 rounded-full mb-3"
        >
          <Text className="text-center text-white font-semibold text-base">
            Share Referral Link
          </Text>
        </TouchableOpacity>

        {/* Go Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="border border-blue-600 py-4 rounded-full mb-10"
        >
          <Text className="text-center text-blue-600 font-semibold text-base">
            Go Back
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
