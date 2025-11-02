import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Airtime({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [selectedNetwork, setSelectedNetwork] = useState("MTN");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [phone, setPhone] = useState("");

  const networks = [
    { name: "MTN", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/MTN_Logo.svg" },
    { name: "GLO", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Glo_logo.svg" },
    { name: "Airtel", logo: "https://upload.wikimedia.org/wikipedia/commons/5/57/Airtel_logo.svg" },
    { name: "9Mobile", logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/9mobile_logo.svg" },
  ];

  const amounts = [ 100, 200, 500, 1000,  2000, 2500];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <BlurView intensity={80} tint="dark" className="flex-1 justify-center items-center px-4">
        <View className="bg-white rounded-2xl w-full max-w-md p-5">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">Buy Airtime</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text className="text-gray-500 mb-4">Top up your phone or send airtime to others</Text>

          {/* Network Selection */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            {networks.map((net) => (
              <TouchableOpacity
                key={net.name}
                onPress={() => setSelectedNetwork(net.name)}
                className={`mr-3 border rounded-xl px-4 py-3 ${
                  selectedNetwork === net.name ? "border-blue-600 bg-blue-50" : "border-gray-200"
                }`}
              >
                <Text className="text-gray-700 font-semibold">{net.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Phone Number */}
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
            className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
          />

          {/* Amount Selection */}
          <Text className="text-gray-800 font-semibold mb-2">Top Up</Text>
          <View className="flex-row flex-wrap justify-between mb-3">
            {amounts.map((amt) => (
              <TouchableOpacity
                key={amt}
                onPress={() => setSelectedAmount(amt)}
                className={`border w-[30%] py-2 rounded-xl mb-3 ${
                  selectedAmount === amt ? "border-blue-600 bg-blue-50" : "border-gray-300"
                }`}
              >
                <Text
                  className={`text-center ${
                    selectedAmount === amt ? "text-blue-600 font-semibold" : "text-gray-700"
                  }`}
                >
                  ₦ {amt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Custom Amount */}
          <TextInput
            placeholder="₦ 3000"
            keyboardType="numeric"
            className="border-b border-gray-300 text-lg text-gray-800 mb-5 px-2 py-2"
          />

          {/* Buttons */}
          <TouchableOpacity className="bg-blue-600 py-4 rounded-full mb-3">
            <Text className="text-center text-white font-semibold text-base">Pay Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            className="border border-blue-600 py-4 rounded-full"
          >
            <Text className="text-center text-blue-600 font-semibold text-base">Close</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
}
