// LoginSecurityScreen.tsx
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Switch } from 'react-native';

export default function LoginSecurityScreen() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity>
          <Text className="text-2xl text-black">←</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black">Login & Security</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1 pb-20">
        {/* Account Access Section */}
        <Text className="text-xs font-semibold text-gray-500 px-4 pt-6 pb-3 tracking-wider">
          ACCOUNT ACCESS
        </Text>

        <TouchableOpacity className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mr-3">
            <Text className="text-xl">🔒</Text>
          </View>
          <Text className="flex-1 text-base font-medium text-black">Change Password</Text>
          <Text className="text-2xl text-gray-300 font-light">›</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mr-3">
            <Text className="text-xl">✉️</Text>
          </View>
          <Text className="flex-1 text-base font-medium text-black">Manage Email Address</Text>
          <Text className="text-2xl text-gray-300 font-light">›</Text>
        </TouchableOpacity>

        {/* Authentication Section */}
        <Text className="text-xs font-semibold text-gray-500 px-4 pt-8 pb-3 tracking-wider">
          AUTHENTICATION
        </Text>

        <View className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mr-3">
            <Text className="text-xl">🛡️</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-black">Two-Factor Authentication</Text>
            <Text className="text-sm text-gray-500 mt-1">
              Add an extra layer of security to your account.
            </Text>
          </View>
          <Switch
            value={twoFactorEnabled}
            onValueChange={setTwoFactorEnabled}
            trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
          />
        </View>

        <View className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mr-3">
            <Text className="text-xl">👆</Text>
          </View>
          <Text className="flex-1 text-base font-medium text-black">Biometric Login</Text>
          <Switch
            value={biometricEnabled}
            onValueChange={setBiometricEnabled}
            trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
          />
        </View>

        {/* Active Sessions Section */}
        <View className="flex-row items-center justify-between px-4 pt-8 pb-3">
          <Text className="text-xs font-semibold text-gray-500 tracking-wider">ACTIVE SESSIONS</Text>
          <TouchableOpacity>
            <Text className="text-sm text-blue-500 font-medium">See all</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-3">
            <Text className="text-xl">📱</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-black">iPhone 14 Pro</Text>
            <Text className="text-sm text-gray-500 mt-0.5">
              <Text className="text-green-500 font-medium">Active now</Text> · New York, NY
            </Text>
          </View>
        </View>

        <View className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-3">
            <Text className="text-xl">💻</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-black">Macbook Pro</Text>
            <Text className="text-sm text-gray-500 mt-0.5">Last active 2 hours ago</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-sm text-red-500 font-medium">Log out</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="bg-blue-100 rounded-full py-4 mx-4 mt-4">
          <Text className="text-base text-blue-500 font-semibold text-center">
            Log Out From All Other Devices
          </Text>
        </TouchableOpacity>

        {/* Connected Devices Section */}
        <View className="flex-row items-center justify-between px-4 pt-8 pb-3">
          <Text className="text-xs font-semibold text-gray-500 tracking-wider">CONNECTED DEVICES</Text>
          <TouchableOpacity>
            <Text className="text-sm text-blue-500 font-medium">Manage</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-3">
            <Text className="text-xl">📱</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-black">iPad Air</Text>
            <Text className="text-sm text-gray-500 mt-0.5">Added on 12 May 2023</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-sm text-red-500 font-medium">Remove</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}