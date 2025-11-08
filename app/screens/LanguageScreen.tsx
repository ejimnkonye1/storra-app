import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";

const languages = [
  { name: "English", subtitle: "English" },
  { name: "Español", subtitle: "Spanish" },
  { name: "Français", subtitle: "French" },
  { name: "Deutsch", subtitle: "German" },
  { name: "Português", subtitle: "Portuguese" },
  { name: "日本語", subtitle: "Japanese" },
  { name: "한국어", subtitle: "Korean" },
];

const LanguageScreen = () => {
  const [selected, setSelected] = useState("English");

  return (
    <View className="flex-1 bg-gray-50 px-5 pt-5">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <Pressable>
          <Text className="text-xl">{`<`}</Text>
        </Pressable>
        <Text className="text-lg font-semibold flex-1 text-center mr-4">
          Language
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {languages.map((lang, index) => (
          <Pressable
            key={index}
            onPress={() => setSelected(lang.name)}
            className={`border rounded-2xl px-5 py-4 mb-3 ${
              selected === lang.name
                ? "border-blue-600 bg-white"
                : "border-gray-200 bg-white"
            }`}
          >
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-base font-semibold text-gray-900">
                  {lang.name}
                </Text>
                <Text className="text-sm text-gray-500">{lang.subtitle}</Text>
              </View>
              <View
                className={`w-5 h-5 rounded-full border-2 ${
                  selected === lang.name ? "border-blue-600" : "border-gray-300"
                } items-center justify-center`}
              >
                {selected === lang.name && (
                  <View className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                )}
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Save Button */}
      <Pressable className="bg-blue-600 rounded-full py-4 items-center mb-5 mt-2">
        <Text className="text-white font-semibold text-base">Save Changes</Text>
      </Pressable>
    </View>
  );
};

export default LanguageScreen;
