import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Airtime() {
  const [selectedNetwork, setSelectedNetwork] = useState("MTN");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [phone, setPhone] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const networks = [
    { name: "MTN", logo: require("../../assets/images/m.png") },
    { name: "GLO", logo: require("../../assets/images/glo.png") },
    { name: "Airtel", logo: require("../../assets/images/airtel.png") },
    { name: "9Mobile", logo: require("../../assets/images/9.png") },
  ];

  const amounts = [100, 200, 500, 1000, 2000, 2500];

  const selected = networks.find((n) => n.name === selectedNetwork);

  return (
    <View className="flex-1 bg-white px-5 pt-12">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-gray-900">Buy Airtime</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <Text className="text-gray-500 mb-6">
        Top up your phone or send airtime to others
      </Text>

      {/* Phone and Network Row */}
      <Text className="text-gray-800 font-semibold mb-3">Phone Number</Text>
      <View className="flex-row items-center border border-gray-300 rounded-xl mb-6 overflow-hidden">
        {/* Network Selector */}
        <TouchableOpacity
          onPress={() => setShowDropdown(true)}
          className="flex-row items-center justify-center w-[25%] py-2 bg-gray-50 border-r border-gray-200"
          activeOpacity={0.8}
        >
          <Image
            source={selected?.logo}
            className="w-8 h-8"
            resizeMode="contain"
          />
          <Ionicons name="chevron-down" size={16} color="gray" className="ml-1" />
        </TouchableOpacity>

        {/* Phone Input */}
        <TextInput
          placeholder="Enter phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          className="flex-1 px-3 py-3 text-gray-800"
          placeholderTextColor="#9ca3af"
        />
      </View>

      {/* Dropdown Modal */}
      <Modal visible={showDropdown} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setShowDropdown(false)}
          className="flex-1 bg-black/30 justify-center items-center"
        >
          <View className="bg-white rounded-2xl p-4 w-72 shadow-lg">
            <Text className="font-semibold text-gray-700 mb-3">
              Select Network
            </Text>
            {networks.map((net) => (
              <TouchableOpacity
                key={net.name}
                onPress={() => {
                  setSelectedNetwork(net.name);
                  setShowDropdown(false);
                }}
                className={`flex-row items-center p-3 rounded-lg mb-1 ${
                  selectedNetwork === net.name ? "bg-blue-50" : ""
                }`}
              >
                <Image
                  source={net.logo}
                  className="w-7 h-7 mr-3"
                  resizeMode="contain"
                />
                <Text className="text-gray-800 font-medium">{net.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Amount Selection */}
      <Text className="text-gray-800 font-semibold mb-3">Select Amount</Text>
      <View className="flex-row flex-wrap justify-between mb-4">
        {amounts.map((amt) => (
          <TouchableOpacity
            key={amt}
            onPress={() => setSelectedAmount(amt)}
            className={`border w-[30%] py-3 rounded-xl mb-3 ${
              selectedAmount === amt
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <Text
              className={`text-center ${
                selectedAmount === amt
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              ₦ {amt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom Amount */}
      <TextInput
        placeholder="Enter custom amount"
        keyboardType="numeric"
        className="border-b border-gray-300 text-lg text-gray-800 mb-8 px-2 py-2"
        placeholderTextColor="#9ca3af"
      />

      {/* Pay Button */}
      <TouchableOpacity className="bg-blue-600 py-4 rounded-full mb-3">
        <Text className="text-center text-white font-semibold text-base">
          Pay Now
        </Text>
      </TouchableOpacity>
    </View>
  );
}
