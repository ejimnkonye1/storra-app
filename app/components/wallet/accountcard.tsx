import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
export default function AccountCard(){
    return(
            <View className="bg-blue-700 rounded-xl p-5 mb-6 shadow-lg">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-white text-sm">Account balance</Text>
            <Ionicons name="eye-outline" size={18} color="white" />
          </View>
          <Text className="text-white text-2xl font-semibold mb-2">₦250,000</Text>
          <Text className="text-white text-xs">
            Account number 01023455678{" "}
            <Ionicons name="copy-outline" size={14} color="white" />
          </Text>
        </View>
    )
}