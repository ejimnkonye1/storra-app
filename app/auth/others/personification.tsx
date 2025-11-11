import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const BasicPersonalizationScreen = () => {
  const [age, setAge] = useState<number | null>(null);
  const [currentClass, setCurrentClass] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);

  const ages = Array.from({ length: 50 }, (_, i) => i + 1); // 1 to 50
  const classes = [
    "Nursery",
    "Primary",
    "Secondary",
    "Tertiary",
    "General Studies",
  ];
  const languages = ["English", "Spanish", "French", "German"];

  const handleContinue = () => {
    console.log({ age, currentClass, language });
    alert("Continue pressed!");
  };

  // Reusable dropdown-style mock
  const DropdownField = ({ label, value }: { label: string; value?: string }) => (
    <View className="mb-5">
      <TouchableOpacity
        onPress={() => console.log(`Opening picker for ${label}`)}
        className="border border-gray-300 rounded-lg p-3 flex-row justify-between items-center bg-white"
      >
        <Text className={value ? "text-gray-800" : "text-gray-400"}>
          {value || `Select ${label}`}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#6B7280" />
      </TouchableOpacity>
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
          <TouchableOpacity onPress={() => console.log("Go back")} className="pr-3">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Basic Personalization</Text>
        </View>

        {/* Progress Bar */}
        <View className="h-1.5 bg-gray-200 rounded-full w-full mb-8">
          <View className="bg-indigo-600 rounded-full h-full w-[40%]" />
        </View>

        {/* Age */}
        <Text className="text-lg font-semibold mb-3">What is your age?</Text>
        <DropdownField label="Age" value={age ? `${age}` : undefined} />

        {/* Class */}
        <Text className="text-lg font-semibold mt-4 mb-3">
          What is your current class?
        </Text>
        {classes.map((className) => (
          <DropdownField key={className} label={className} value={null} />
        ))}

        {/* Language */}
        <Text className="text-lg font-semibold mt-4 mb-3">
          What language do you prefer to work in?
        </Text>
        <DropdownField label="Language" value={language || undefined} />
      </ScrollView>

      {/* Footer Buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 flex-row justify-between items-center">
        <TouchableOpacity onPress={() => console.log("Cancel")} className="py-3 px-6">
          <Text className="text-gray-600 text-lg font-medium">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleContinue}
          className="bg-indigo-600 py-3 px-8 rounded-xl flex-row items-center shadow-lg"
        >
          <Text className="text-white text-lg font-medium mr-2">Continue</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BasicPersonalizationScreen;
