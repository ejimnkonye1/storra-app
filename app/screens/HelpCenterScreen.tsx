import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import React from "react";

const HelpCenterScreen = () => {
  return (
    <ScrollView className="flex-1 bg-white px-5 pt-5">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <Pressable>
          <Text className="text-xl">{`<`}</Text>
        </Pressable>
        <Text className="text-lg font-semibold flex-1 text-center mr-4">
          Help Center
        </Text>
      </View>

      {/* Search Bar */}
      <View className="bg-gray-100 rounded-full px-4 py-3 mb-5">
        <TextInput
          placeholder="How can we help?"
          placeholderTextColor="#888"
          className="text-base"
        />
      </View>

      {/* Sections */}
      {[
        "Getting Started",
        "Account & Profile",
        "Learning & Quizzes",
        "Earning & Redeeming Rewards",
        "Security & Privacy",
      ].map((item, index) => (
        <View key={index} className="border-b border-gray-200 py-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-base font-medium text-gray-900">{item}</Text>
            <Text className="text-gray-400 text-lg">⌄</Text>
          </View>
          {item === "Getting Started" && (
            <Text className="text-gray-500 text-sm mt-2 leading-5">
              Here you will find answers to the most common questions about getting started with the Storra app and setting up your account for the first time.
            </Text>
          )}
        </View>
      ))}

      {/* Support Section */}
      <View className="items-center mt-10 mb-10">
        <Text className="text-gray-700 font-medium mb-1">Still need help?</Text>
        <Text className="text-gray-500 mb-5 text-center">
          Our support team is here for you.
        </Text>

        <Pressable className="bg-blue-600 w-full py-4 rounded-full items-center mb-3">
          <Text className="text-white font-semibold text-base">Chat with Us</Text>
        </Pressable>

        <Pressable className="bg-gray-100 w-full py-4 rounded-full items-center">
          <Text className="text-blue-600 font-semibold text-base">
            Email Support
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default HelpCenterScreen;
