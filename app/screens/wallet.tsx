import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";
import AccountCard from "../components/wallet/accountcard";
import Cards from "../components/wallet/cards";
import Transaction from "../components/wallet/transaction";

const WalletScreen = () => {
      const [menuVisible, setMenuVisible] = useState(false)
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-5 pt-8 font-grotesk">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- HEADER --- */}
        <View  className="flex-row justify-between items-center mb-6 mt-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-gray-100">
            <Ionicons name="arrow-back" size={22} color="black" />
          </TouchableOpacity>
         

          <View className="flex-row space-x-3">
     <TouchableOpacity className="p-[2px] rounded-full bg-gray-100 overflow-hidden">
  <Image
    source={require("@/assets/images/pro.jpg")} // replace with your user image URL
    className="w-10 h-10 rounded-full"
  />
</TouchableOpacity>

      <View className="relative">
  <TouchableOpacity className="p-2 rounded-full bg-gray-100">
    <Ionicons name="notifications-outline" size={22} color="black" />
  </TouchableOpacity>

  {/* Red Badge */}
  <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5  items-center justify-center border-2 border-full border-white">
    <Text className="text-white text-[10px] font-bold">3</Text>
  </View>
</View>

          </View>
        </View>

        {/* --- ACTION BUTTONS --- */}


        {/* --- ACCOUNT CARD --- */}
   <AccountCard />

        {/* --- FEATURE CARDS --- */}
    
<Cards />

{/* --- RECENT TRANSACTIONS --- */}
<Transaction />

      
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;
