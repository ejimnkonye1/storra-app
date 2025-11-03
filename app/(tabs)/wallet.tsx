import { Feather, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

const WalletScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-5 pt-8 font-grotesk">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- HEADER --- */}
        <View className="flex-row justify-between items-center mb-6 mt-4">
          <TouchableOpacity className="p-2 rounded-full bg-gray-100">
            <Ionicons name="menu" size={22} color="black" />
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

        {/* --- FEATURE CARDS --- */}
    
<View className="flex flex-row flex-wrap justify-between mb-1">
  {[
{
  title: "Send Money",
  desc: "Instant transfers ",
  icon: <Feather name="send" size={24} color="#2563EB" />,
  bg: "bg-blue-100",
},
    {
      title: "Earn Rewards",
      desc: "Complete task and Earn",
      icon: <Ionicons name="gift-outline" size={24} color="#7C3AED" />,
      bg: "bg-purple-100",
    },
    // {
    //   title: "Daily Spin",
    //   desc: "Spin the wheel for daily rewards",
    //   icon: <FontAwesome5 name="cog" size={20} color="#2563EB" />,
    //   bg: "bg-blue-100",
    // },
    {
      title: "Withdraw Money",
      desc: "Cash out to Bank",
      icon: <Feather name="arrow-down-circle" size={24} color="#F97316" />,
      bg: "bg-orange-100",
    },
    {
      title: "Buy Airtime",
      desc: "Top-up easily",
      icon: <FontAwesome5 name="mobile-alt" size={22} color="#10B981" />,
      bg: "bg-green-100",
    },
    {
      title: "Pay Bills",
      desc: "Electricity, Data & More",
      icon: <MaterialIcons name="payment" size={22} color="#3B82F6" />,
      bg: "bg-indigo-100",
    },
    {
      title: "Referral Program",
      desc: "Invite & Earn",
      icon: <Ionicons name="people-outline" size={22} color="#8B5CF6" />,
      bg: "bg-purple-100",
    },
  ].map((item, index) => (
    <TouchableOpacity
      key={index}
      className="bg-white w-[31%] rounded-xl shadow-sm p-4 items-center mb-4"
      activeOpacity={0.8}
    >
      <View className={`${item.bg} p-3 rounded-full mb-2`}>
        {item.icon}
      </View>
      <Text className="text-gray-800 font-semibold text-sm text-center mb-1">
        {item.title}
      </Text>
      <Text className="text-gray-500 text-xs text-center">{item.desc}</Text>
    </TouchableOpacity>
  ))}
</View>


{/* --- RECENT TRANSACTIONS --- */}
<View className="mb-4">
  {/* Header */}
  <View className="flex-row justify-between items-center mb-3">
    <Text className="text-md font-semibold text-gray-800">Recent Transactions</Text>
    <TouchableOpacity activeOpacity={0.7}>
      <Text className="text-blue-600 text-sm font-medium">See all</Text>
    </TouchableOpacity>
  </View>

  {/* Transactions List */}
  <View className="bg-white rounded-2xl shadow-sm p-4">
    {[
      {
        title: "Added Money",
        desc: "Bank Transfer",
        amount: "+₦16,900",
        icon: <Feather name="arrow-down-circle" size={20} color="#10B981" />,
      },
      {
        title: "John Doe",
        desc: "Lunch Payment",
        amount: "-₦25.50",
        icon: <Feather name="arrow-up-circle" size={20} color="#EF4444" />,
      },
      {
        title: "Referral Bonus",
        desc: "Friend Joined",
        amount: "+₦500",
        icon: <Ionicons name="gift-outline" size={20} color="#8B5CF6" />,
      },
    ].map((item, index) => (
      <TouchableOpacity
        key={index}
        activeOpacity={0.8}
        className="flex-row items-center justify-between py-3 px-2 mb-1 rounded-xl"
      >
        {/* Left section: icon + text */}
        <View className="flex-row items-center flex-1">
          <View className="bg-gray-100 p-3 rounded-full mr-3">
            {item.icon}
          </View>
          <View>
            <Text className="text-gray-800 font-semibold text-sm">{item.title}</Text>
            <Text className="text-gray-500 text-xs">{item.desc}</Text>
          </View>
        </View>

        {/* Amount */}
        <Text
          className={`font-semibold ${
            item.amount.startsWith('+') ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {item.amount}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
</View>

    
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;