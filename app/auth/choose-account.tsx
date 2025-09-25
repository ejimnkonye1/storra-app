// app/auth/choose-account.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ChooseAccount() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>("student");

  const accounts = [
    {
      id: "student",
      title: "Student Account",
      description: "You’re just one step away from learning & earning",
      icon: "school-outline",
    },
    {
      id: "parent",
      title: "Parent Account",
      description: "Track your child’s learning. Set limits. Earn together",
      icon: "people-outline",
    },
    {
      id: "teacher",
      title: "Teacher Account",
      description:
        "Get tools to manage students, assign quizzes, and monitor performance",
      icon: "briefcase-outline",
    },
  ];

  const handleContinue = () => {
    if (!selected) return;
    router.push(`/auth/${selected}/register` as any);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      {/* Logo */}
      <View className="items-center mb-10">
        <Image
          source={require("@/assets/images/storra.png")}
          className="w-20 h-20 "
          resizeMode="contain"
        />
        {/* <Text className="text-xl font-semibold text-gray-800">Storra</Text> */}
      </View>

      {/* Header */}
      <Text className="text-xl font-semibold text-center mb-6 text-gray-900">
        Which account type would you like to Login with?
      </Text>

      {/* Account Options */}
      {accounts.map((acc) => (
        <TouchableOpacity
          key={acc.id}
          onPress={() => setSelected(acc.id)}
          className={`flex-row items-center p-4 mb-4 rounded-xl border ${
            selected === acc.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
          }`}
        >
          <Ionicons
            name={acc.icon as any}
            size={24}
            color={selected === acc.id ? "#2563eb" : "#6b7280"}
          />
          <View className="ml-3 flex-1">
            <Text
              className={`font-semibold text-base ${
                selected === acc.id ? "text-blue-600" : "text-gray-800"
              }`}
            >
              {acc.title}
            </Text>
            <Text className="text-sm text-gray-500">{acc.description}</Text>
          </View>
          <Ionicons
            name={
              selected === acc.id ? "radio-button-on" : "radio-button-off"
            }
            size={22}
            color={selected === acc.id ? "#2563eb" : "#9ca3af"}
          />
        </TouchableOpacity>
      ))}

      {/* Continue Button */}
      <TouchableOpacity
        onPress={handleContinue}
        className="mt-8 py-4 rounded-full bg-blue-600"
      >
        <Text className="text-center text-white text-lg font-semibold">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
