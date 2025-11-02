import { Feather, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { Modal, Share, Text, TouchableOpacity, View } from "react-native";

export default function ReferralModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const referralCode = "1587-9758-8582-0472-1587";
  const totalReferred = 12;
  const totalEarned = 1500;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralCode);
    alert("Referral code copied!");
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
    <Modal visible={visible} transparent animationType="fade">
      <BlurView intensity={80} tint="dark" className="flex-1 justify-center items-center px-4">
        <View className="bg-white rounded-2xl w-full max-w-md p-6">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">Referral Program</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text className="text-gray-500 mb-6">
            Invite friends and earn rewards when they join EduWallet
          </Text>

          {/* Referral Code */}
          <Text className="text-center text-gray-700 font-semibold mb-2">
            Your Referral Code
          </Text>

          <View className="border border-blue-500 rounded-xl flex-row justify-between items-center px-4 py-3 mb-6">
            <Text className="text-blue-600 font-semibold text-xs">{referralCode}</Text>
            <TouchableOpacity onPress={handleCopy}>
              <Feather name="copy" size={18} color="#2563EB" />
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View className="flex-row justify-between mb-6">
            <View className="w-[48%] bg-gray-50 rounded-xl p-4 items-center">
              <Text className="text-gray-900 text-lg font-bold">{totalReferred}</Text>
              <Text className="text-gray-500 text-xs mt-1">Total Referred</Text>
            </View>
            <View className="w-[48%] bg-gray-50 rounded-xl p-4 items-center">
              <Text className="text-gray-900 text-lg font-bold">₦{totalEarned}</Text>
              <Text className="text-gray-500 text-xs mt-1">Total Earned</Text>
            </View>
          </View>

          {/* Share Button */}
          <TouchableOpacity
            onPress={handleShare}
            className="bg-blue-600 py-4 rounded-full"
          >
            <Text className="text-center text-white font-semibold text-base">
              Share Link 
            </Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
}
