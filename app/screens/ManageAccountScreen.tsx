import { View, Text, TextInput, Image, Pressable, ScrollView } from "react-native";
import React from "react";

const ManageAccountScreen = () => {
  return (
    <ScrollView className="flex-1 bg-white px-5 pt-5">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <Pressable>
          <Text className="text-xl">{`<`}</Text>
        </Pressable>
        <Text className="text-lg font-semibold flex-1 text-center mr-4">
          Manage Account
        </Text>
      </View>

      {/* Profile Section */}
      <View className="items-center mb-6">
        <View className="relative">
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png" }}
            className="w-24 h-24 rounded-full"
          />
          <View className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2">
            <Text className="text-white text-xs">✏️</Text>
          </View>
        </View>
        <Text className="text-lg font-semibold mt-3">Alex Doe</Text>
        <Text className="text-gray-500">alex.doe@storra.com</Text>
      </View>

      {/* Form Fields */}
      <View className="mb-6">
        <Text className="text-sm text-gray-600 mb-1">Full Name</Text>
        <TextInput
          className="border border-gray-200 rounded-lg px-3 py-3 text-base"
          value="Alex Doe"
        />
      </View>

      <View className="mb-6">
        <Text className="text-sm text-gray-600 mb-1">Email Address</Text>
        <View className="flex-row items-center border border-gray-200 rounded-lg px-3 py-3 bg-gray-100">
          <Text className="flex-1 text-gray-500">alex.doe@storra.com</Text>
          <Text className="text-gray-400 text-lg">🔒</Text>
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-sm text-gray-600 mb-1">Age</Text>
        <TextInput
          className="border border-gray-200 rounded-lg px-3 py-3 text-base"
          value="28"
        />
      </View>

      {/* Save Button */}
      <Pressable className="bg-gray-200 rounded-full py-4 items-center">
        <Text className="text-gray-500 font-semibold">Save Changes</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ManageAccountScreen;
