import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function PayBill() {
  const router = useRouter();
  const [billingType, setBillingType] = useState("Prepaid");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const amounts = [100, 200, 1000, 1500, 2000, 5000];

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-12">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-gray-900">Pay Bill</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <Text className="text-gray-500 mb-6">
        Pay your electricity, internet, transport, and other bills easily.
      </Text>

      {/* Provider */}
      <TouchableOpacity className="flex-row justify-between items-center bg-gray-50 p-4 rounded-xl mb-4 border border-gray-200">
        <Text className="text-gray-700 font-medium">Ikeja Electricity</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>

      {/* Billing Type */}
      <View className="flex-row bg-gray-100 rounded-xl mb-5">
        {["Prepaid", "Postpaid"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setBillingType(type)}
            className={`flex-1 py-3 rounded-xl border ${
              billingType === type
                ? "border-blue-600 bg-blue-50"
                : "border-transparent"
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                billingType === type ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Meter Input */}
      <View className="mb-5">
        <Text className="text-gray-700 mb-2 font-semibold">Meter Number</Text>
        <TextInput
          placeholder="Enter Meter Number"
          keyboardType="numeric"
          className="border border-gray-300 rounded-xl p-3 text-gray-800"
        />
        <Text className="text-red-500 text-xs mt-1">
          Please enter the correct number
        </Text>
      </View>

      {/* Amount Selection */}
      <Text className="text-gray-800 font-semibold mb-3">Amount</Text>
      <View className="flex-row flex-wrap justify-between mb-5">
        {amounts.map((amount) => (
          <TouchableOpacity
            key={amount}
            onPress={() => setSelectedAmount(amount)}
            className={`w-[30%] py-3 rounded-xl border mb-3 ${
              selectedAmount === amount
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <Text
              className={`text-center ${
                selectedAmount === amount
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              ₦{amount}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom Amount */}
      <TextInput
        placeholder="₦ 5000"
        keyboardType="numeric"
        className="border-b border-gray-300 text-lg text-gray-800 mb-8 px-2 py-2"
      />

      {/* Pay Now */}
      <TouchableOpacity className="bg-blue-600 py-4 rounded-full mb-3">
        <Text className="text-center text-white font-semibold text-base">
          Pay Now
        </Text>
      </TouchableOpacity>

      {/* Close */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="border border-blue-600 py-4 rounded-full mb-10"
      >
        <Text className="text-center text-blue-600 font-semibold text-base">
          Close
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
