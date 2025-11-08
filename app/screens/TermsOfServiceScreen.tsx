import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";

const TermsOfServiceScreen = () => {
  return (
    <View className="flex-1 bg-white px-5 pt-5">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <Pressable>
          <Text className="text-xl">{`<`}</Text>
        </Pressable>
        <Text className="text-lg font-semibold flex-1 text-center mr-4">
          Terms of Service
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-gray-500 text-sm mb-4">
          Last Updated: October 26, 2023
        </Text>

        <Text className="text-lg font-bold mb-2">1. Introduction</Text>
        <Text className="text-gray-700 mb-4 leading-6">
          Welcome to Storra. These Terms of Service govern your use of
          our mobile application and services. By
          accessing or using our Services, you agree to be bound by these Terms.
          Please read them carefully.
        </Text>

        <Text className="text-lg font-bold mb-2">2. User Eligibility and Accounts</Text>
        <Text className="text-gray-700 mb-4 leading-6">
          You must be at least 13 years old to use Storra. By creating an account,
          you represent that you meet this age requirement. You are responsible
          for maintaining the confidentiality of your account and all activities
          that occur under your account.
        </Text>

        <Text className="text-lg font-bold mb-2">3. Earning and Redeeming Rewards</Text>
        <Text className="text-gray-700 mb-4 leading-6">
          Storra allows users to earn rewards through participation in educational
          modules and financial literacy games. Rewards are subject to specific
          terms and conditions, have no cash value outside of the Storra platform,
          and may be changed or discontinued at our sole discretion.
        </Text>

        <Text className="text-lg font-bold mb-2">4. User Conduct</Text>
        <Text className="text-gray-700 mb-4 leading-6">
          You agree not to use the Service to: {"\n"}• Violate any applicable laws or
          regulations. {"\n"}• Infringe on the intellectual property rights of others.
          {"\n"}• Engage in any fraudulent activity, including creating multiple
          accounts to abuse the rewards system. {"\n"}• Transmit any viruses or
          malicious code.
        </Text>

        <Text className="text-lg font-bold mb-2">5. Privacy</Text>
        <Text className="text-gray-700 mb-4 leading-6">
          Your privacy is important to us. Our Privacy Policy explains how we
          collect, use, and share your personal information. By using our
          Services, you agree to the collection and use of information in
          accordance with our Privacy Policy.
        </Text>

        <Text className="text-lg font-bold mb-2">6. Termination</Text>
        <Text className="text-gray-700 mb-4 leading-6">
          We may terminate or suspend your account and access to the Services at
          our sole discretion, without prior notice, for conduct that we believe
          violates these Terms or is harmful to other users or Storra.
        </Text>

        <Text className="text-lg font-bold mb-2">7. Contact Information</Text>
        <Text className="text-gray-700 mb-10 leading-6">
          If you have any questions about these Terms, please contact us at{" "}
          <Text className="text-blue-600">support@storra.com</Text>.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsOfServiceScreen;
