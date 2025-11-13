import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../../../backendconfig"; // ✅ make sure this points to your backend base URL

const BasicPersonalizationScreen = () => {
  const { userId } = useLocalSearchParams(); // ✅ receive from registration screen or previous step
  const [age, setAge] = useState<number | null>(null);
  const [currentClassLevel, setCurrentClassLevel] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const classes = [
    { label: "Nursery", value: "nursery" },
    { label: "Primary", value: "primary" },
    { label: "Secondary", value: "secondary" },
    { label: "Tertiary", value: "tertiary" },
    { label: "General Studies", value: "general-studies" },
  ];

  const languages = [
    { label: "English", value: "English" },
    { label: "Spanish", value: "Spanish" },
    { label: "French", value: "French" },
    { label: "German", value: "German" },
  ];

  const handleContinue = async () => {
    if (!age) return Alert.alert("Required Field", "Please select your age");
    if (!currentClassLevel)
      return Alert.alert("Required Field", "Please select your current class level");
    if (!language)
      return Alert.alert("Required Field", "Please select your preferred language");

    setIsLoading(true);
    try {
      // ✅ Call correct backend endpoint
      const response = await axios.patch(
        `${BASE_URL}/onboarding/personalization/${userId}`,
        {
          age,
          currentClassLevel,
          preferredLanguage: language,
        }
      );

      console.log("✅ Personalization updated:", response.data);

      // ✅ Navigate to the next step (reason screen)
      router.push({
        pathname: "/auth/others/learning-goals",
        params: { userId },
      });
    } catch (error: any) {
      console.error("❌ Personalization error:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to save your information. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Reusable dropdown component
  const DropdownField = ({
    label,
    value,
    options,
    onSelect,
  }: {
    label: string;
    value?: string | number;
    options: Array<{ label: string; value: any }>;
    onSelect: (value: any) => void;
  }) => (
    <View className="mb-5">
      <Text className="text-base font-medium text-gray-700 mb-2">{label}</Text>
      <View className="flex-row flex-wrap">
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => onSelect(option.value)}
            className={`border rounded-lg px-4 py-2 mr-2 mb-2 ${
              value === option.value
                ? "bg-indigo-500 border-indigo-500"
                : "bg-white border-gray-300"
            }`}
          >
            <Text
              className={value === option.value ? "text-white" : "text-gray-700"}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        className="p-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center pt-2 pb-6">
          <TouchableOpacity onPress={() => router.back()} className="pr-3">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Basic Personalization</Text>
        </View>

        {/* Progress Bar */}
        <View className="h-1.5 bg-gray-200 rounded-full w-full mb-8">
          <View className="bg-indigo-600 rounded-full h-full w-[33%]" />
        </View>

        {/* Age */}
        <Text className="text-lg font-semibold mb-3">What is your age?</Text>
        <View className="flex-row flex-wrap mb-6">
          {[...Array(10)].map((_, i) => {
            const ageValue = (i + 1) * 5; // 5, 10, 15, ...
            return (
              <TouchableOpacity
                key={ageValue}
                onPress={() => setAge(ageValue)}
                className={`border rounded-lg px-4 py-2 mr-2 mb-2 ${
                  age === ageValue
                    ? "bg-indigo-500 border-indigo-500"
                    : "bg-white border-gray-300"
                }`}
              >
                <Text
                  className={age === ageValue ? "text-white" : "text-gray-700"}
                >
                  {ageValue}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Class */}
        <DropdownField
          label="What is your current class level?"
          value={currentClassLevel}
          options={classes}
          onSelect={setCurrentClassLevel}
        />

        {/* Language */}
        <DropdownField
          label="What language do you prefer to work in?"
          value={language}
          options={languages}
          onSelect={setLanguage}
        />
      </ScrollView>

      {/* Footer Buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="py-3 px-6"
          disabled={isLoading}
        >
          <Text className="text-gray-600 text-lg font-medium">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleContinue}
          disabled={isLoading}
          className={`py-3 px-8 rounded-xl flex-row items-center shadow-lg ${
            isLoading ? "bg-indigo-400" : "bg-indigo-600"
          }`}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Text className="text-white text-lg font-medium mr-2">Continue</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BasicPersonalizationScreen;
