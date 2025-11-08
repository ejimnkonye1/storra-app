import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";

const PrivacyPolicyScreen = () => {
  return (
    <View className="flex-1 bg-white px-5 pt-5">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <Pressable>
          <Text className="text-xl">{`<`}</Text>
        </Pressable>
        <Text className="text-lg font-semibold flex-1 text-center mr-4">
          Privacy Policy
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-gray-500 text-sm mb-4">
          Last Updated: October 26, 2023
        </Text>

        <Text className="text-lg font-bold mb-2">Introduction</Text>
        <Text className="text-gray-700 mb-4 leading-6">
          Welcome to Storra. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you use our mobile
          application. We are committed to protecting your privacy and ensuring
          you have a positive experience on our AI-powered EdTech and FinTech
          platform.
        </Text>

        <Text className="text-lg font-bold mb-2">Information We Collect</Text>
        <Text className="text-gray-700 mb-4 leading-6">
          We may collect information about you in a variety of ways:
          {"\n\n"}• <Text className="font-semibold">Personal Data:</Text> Name,
          email address, and demographic info. {"\n"}• <Text className="font-semibold">
          Financial Data:</Text> Payment details such as card info. {"\n"}•{" "}
          <Text className="font-semibold">Usage Data:</Text> Info automatically
          collected when using the app.
        </Text>

        <Text className="text-lg font-bold mb-2">How We Use Your Information</Text>
        <Text className="text-gray-700 mb-4 leading-6">
          We use collected data to: {"\n"}• Create and manage your account.
          {"\n"}• Process payments and refunds. {"\n"}• Monitor and improve the
          app. {"\n"}• Notify you of updates.
        </Text>

        <Text className="text-lg font-bold mb-2">Data Security</Text>
        <Text className="text-gray-700 mb-4 leading-6">
          We use administrative, technical, and physical security measures to
          help protect your information. Despite our efforts, no system is
          completely secure. Please be aware that data transmission over the
          internet may not be fully protected.
        </Text>

        <Text className="text-lg font-bold mb-2">Contact Us</Text>
        <Text className="text-gray-700 mb-16 leading-6">
          If you have questions or comments about this Privacy Policy, please
          contact us at{" "}
          <Text className="text-blue-600">privacy@storra.app</Text>.
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;
