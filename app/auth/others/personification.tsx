// app/screens/BasicPersonalizationScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BASE_URL } from "../../../backendconfig"; // your backend base URL
interface Params extends Record<string, string | undefined> {
  userId: string;
}

const BasicPersonalizationScreen = () => {
  const { userId } = useLocalSearchParams<Params>(); // ✅ receive userId from previous step
  const [age, setAge] = useState<number | null>(null);
  const [currentClassLevel, setCurrentClassLevel] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [profilePictureUri, setProfilePictureUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Pick image from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePictureUri(result.assets[0].uri);
    }
  };

  // Upload image to backend
  const uploadImage = async (): Promise<string | null> => {
    if (!profilePictureUri) return null;

    const formData = new FormData();
    formData.append("profile", {
      uri: profilePictureUri,
      name: "profile.jpg",
      type: "image/jpeg",
    } as any);
    formData.append("userId", userId);
    console.log(userId,"lll")

    try {
      const res = await axios.post(`${BASE_URL}/profile/upload-profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.url; // public URL from backend/Supabase
    } catch (err: any) {
      console.log(err.response?.data || err.message)
      console.error("❌ Image upload failed", err.response?.data || err.message);
      Alert.alert("Error", "Failed to upload profile picture");
      return null;
    }
  };

  const handleContinue = async () => {
    if (!age || !currentClassLevel || !language) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const profilePictureUrl = await uploadImage(); // first upload image (optional)

      // Call backend to update personalization
      const response = await axios.patch(
        `${BASE_URL}/onboarding/personalization/${userId}`,
        {
          age,
          currentClassLevel,
          preferredLanguage: language,
          profilePictureUrl, // may be null if no image picked
        }
      );

      console.log("✅ Personalization updated:", response.data);

      // Navigate to next step using info from backend
      router.push({
        pathname: "/auth/others/learning-goals",
        params: { userId, profilePictureUrl },
      });
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to save your information.");
    } finally {
      setIsLoading(false);
    }
  };

  // Dropdown / selection options
  const classes = [
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
            <Text className={value === option.value ? "text-white" : "text-gray-700"}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="p-4">
        {/* Header */}
        <View className="flex-row items-center pt-2 pb-6">
          <TouchableOpacity onPress={() => router.back()} className="pr-3">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Basic Personalization</Text>
        </View>

        {/* Profile Picture */}
        <View className="items-center mb-6">
          <TouchableOpacity
            onPress={pickImage}
            className="w-32 h-32 bg-gray-200 rounded-full items-center justify-center mb-2"
          >
            {profilePictureUri ? (
              <Image source={{ uri: profilePictureUri }} className="w-32 h-32 rounded-full" />
            ) : (
              <Ionicons name="camera" size={48} color="gray" />
            )}
          </TouchableOpacity>
          <Text className="text-gray-600">Upload Profile Picture</Text>
        </View>

        {/* Age selection */}
        <Text className="text-lg font-semibold mb-3">What is your age?</Text>
        <View className="flex-row flex-wrap mb-6">
          {[...Array(10)].map((_, i) => {
            const ageValue = (i + 1) * 5;
            return (
              <TouchableOpacity
                key={ageValue}
                onPress={() => setAge(ageValue)}
                className={`border rounded-lg px-4 py-2 mr-2 mb-2 ${
                  age === ageValue ? "bg-indigo-500 border-indigo-500" : "bg-white border-gray-300"
                }`}
              >
                <Text className={age === ageValue ? "text-white" : "text-gray-700"}>{ageValue}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Class level */}
        <DropdownField
          label="Current Class Level"
          value={currentClassLevel}
          options={classes}
          onSelect={setCurrentClassLevel}
        />

        {/* Language */}
        <DropdownField
          label="Preferred Language"
          value={language}
          options={languages}
          onSelect={setLanguage}
        />
      </ScrollView>

      {/* Footer buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 flex-row justify-between items-center">
        <TouchableOpacity onPress={() => router.back()} disabled={isLoading} className="py-3 px-6">
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
