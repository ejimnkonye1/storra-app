import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';

export default function WalletPaymentsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity>
          <Text className="text-2xl text-black">←</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black">Wallet & Payments</Text>
        <TouchableOpacity>
          <Text className="text-xl">❓</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Balance Card */}
        <View className="bg-blue-100 rounded-2xl p-6 mx-4 mt-4 mb-6">
          <Text className="text-base text-gray-600 mb-2">Current Rewards Balance</Text>
          <Text className="text-5xl font-bold text-black mb-6">$150.00</Text>
          <TouchableOpacity className="bg-blue-500 rounded-full py-3.5 px-8 self-end">
            <Text className="text-base text-white font-semibold">Redeem Rewards</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View className="flex-row px-4 mb-4">
          <TouchableOpacity className="flex-1 py-3 border-b-4 border-blue-500">
            <Text className="text-sm font-semibold text-blue-500 text-center">
              Transaction History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-3">
            <Text className="text-sm font-medium text-gray-500 text-center">
              Payment Methods
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mx-4 mb-4">
          <Text className="text-lg text-gray-500 mr-2">🔍</Text>
          <TextInput
            placeholder="Search transactions..."
            placeholderTextColor="#8E8E93"
            className="flex-1 text-base text-black"
          />
        </View>

        {/* Transactions */}
        <TouchableOpacity className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center mr-3">
            <Text className="text-xl">🏆</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-black">Daily Challenge Bonus</Text>
            <Text className="text-sm text-gray-500 mt-0.5">Oct 26, 2023</Text>
          </View>
          <Text className="text-lg font-semibold text-green-500">+$5.00</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mr-3">
            <Text className="text-xl">🎓</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-black">Quiz Reward</Text>
            <Text className="text-sm text-gray-500 mt-0.5">Oct 25, 2023</Text>
          </View>
          <Text className="text-lg font-semibold text-green-500">+$10.00</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-red-100 items-center justify-center mr-3">
            <Text className="text-xl">💸</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-black">Cash Out to Bank</Text>
            <Text className="text-sm text-gray-500 mt-0.5">Oct 24, 2023</Text>
          </View>
          <Text className="text-lg font-semibold text-red-500">-$50.00</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-orange-100 items-center justify-center mr-3">
            <Text className="text-xl">⭐</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-black">Referral Bonus</Text>
            <Text className="text-sm text-gray-500 mt-0.5">Oct 22, 2023</Text>
          </View>
          <Text className="text-lg font-semibold text-green-500">+$25.00</Text>
        </TouchableOpacity>

        <View className="h-20" />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity className="absolute bottom-24 right-6 w-14 h-14 rounded-full bg-blue-500 items-center justify-center shadow-lg">
        <Text className="text-3xl text-white font-light">+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}