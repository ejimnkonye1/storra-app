import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function PayBillModal({ visible, onClose }) {
  const [activeTab, setActiveTab] = useState("Electricity");
  const [billingType, setBillingType] = useState("Prepaid");
  const [selectedAmount, setSelectedAmount] = useState(null);

  const amounts = [ 100, 200, 1000, 1500, 2000, 5000];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black/40">
        <View className="bg-white w-11/12 rounded-3xl p-5">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-xl font-semibold text-gray-900 mb-3">
                Pay Bill
              </Text>
              <Text className="text-gray-500 text-sm">
                Pay your electricity, internet, transport and other bills
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="p-2 relative top-[-20px] right-[25px] bg-gray-100 rounded-full"
            >
              <Ionicons name="close" size={22} color="black" />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
      

          {/* Selected Provider */}
          <TouchableOpacity className="flex-row justify-between items-center bg-gray-50 p-3 rounded-xl mb-4">
            <Text className="text-gray-700 font-medium">Ikeja Electricity</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>

          {/* Billing Type */}
          <View className="flex-row bg-gray-50 rounded-xl mb-4">
            {["Prepaid", "Postpaid"].map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => setBillingType(type)}
                className={`flex-1 py-3 rounded-xl border ${
                  billingType === type ? "border-blue-500" : "border-transparent"
                }`}
              >
                <Text
                  className={`text-center font-semibold ${
                    billingType === type ? "text-blue-600" : "text-black"
                  }`}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Input Field */}
          <View className="mb-4">
            <Text className="text-gray-700 mb-1">Meter Number</Text>
            <TextInput
              placeholder="Enter Meter Number"
              keyboardType="numeric"
              className="border border-gray-300 rounded-xl p-3 text-gray-800"
            />
            <Text className="text-red-500 text-xs mt-1">
              Please enter the Correct Number
            </Text>
          </View>

          {/* Amount */}
          <Text className="text-gray-700 mb-2 font-medium">Amount</Text>
          <View className="flex-row flex-wrap justify-between mb-4">
            {amounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                onPress={() => setSelectedAmount(amount)}
                className={`w-[30%] py-2 rounded-full border mb-2 ${
                  selectedAmount === amount
                    ? "border-blue-500 bg-blue-50"
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
          <View className="flex-row items-center justify-between border border-gray-300 rounded-xl p-3 mb-5">
            <Text className="text-gray-700">₦ 5000</Text>
            <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-full">
              <Text className="text-white font-semibold">Pay Now</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Buttons */}
          <View className="space-y-4 ">
            <TouchableOpacity className="bg-blue-600 py-3 rounded-full">
              <Text className="text-white text-center font-semibold mb-2">
                Pay Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-blue-600 py-3 mt-2 rounded-full">
              <Text className="text-blue-600 text-center font-semibold">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
