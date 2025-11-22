import { BASE_URL } from "@/backendconfig";
import { useUserStore } from "@/store/userStore";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
const ManageAccountScreen = () => {
  const { user, token, setUser } = useUserStore();
  const profile = user?.profile;

  const [fullname, setFullname] = useState(profile?.fullname || "");
  const [age, setAge] = useState(profile?.age?.toString() || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  if (!profile) return null;

  /** Text fields update */
  const handleSave = async () => {
    if (!token) {
      Alert.alert("Error", "You are not authenticated");
      return;
    }

    try {
      setIsSaving(true);
      const response = await axios.put(
        `${BASE_URL}/student/editprofile`,
        {
          fullname,
          age: age ? parseInt(age, 10) : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update Zustand store
      setUser({
        ...user!,
        profile: response.data.data,
        fullname: response.data.data.fullname,
        email: response.data.data.email,
      });

      Alert.alert("Success", "Profile updated successfully");
    } catch (err: any) {
      console.error("Edit profile error:", err.response?.data || err.message);
      Alert.alert(
        "Error",
        err.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setIsSaving(false);
    }
  };

  /** Profile image update */
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const image = result.assets[0];
      uploadProfileImage(image);
    }
  };

  const uploadProfileImage = async (image: { uri: string }) => {
    if (!token) {
      Alert.alert("Error", "You are not authenticated");
      return;
    }

    try {
      setIsUploadingImage(true);
      const formData = new FormData();
      const filename = image.uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename || "");
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("profile", {
        uri: image.uri,
        name: filename,
        type,
      } as any);
 formData.append("userId", profile?._id);
      const response = await axios.post(
        `${BASE_URL}/profile/upload-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser({
        ...user!,
        profile: {
          ...user!.profile,
          profilePictureUrl: response.data.url,
        },
      });

      Alert.alert("Success", "Profile image updated successfully");
    } catch (err: any) {
      console.error("Image upload error:", err.response?.data || err.message);
      Alert.alert("Error", "Failed to upload profile image");
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-10">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <Pressable>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text className="text-lg font-semibold flex-1 text-center mr-4">
          Manage Account
        </Text>
      </View>

      {/* Profile Section */}
      <View className="items-center mb-6">
        <View className="relative">
          <Image
            source={{ uri: profile.profilePictureUrl }}
            className="w-24 h-24 rounded-full"
          />
          <Pressable
            className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2"
            onPress={handlePickImage}
            disabled={isUploadingImage}
          >
            <Ionicons
              name={isUploadingImage ? "refresh" : "camera"}
              size={16}
              color="white"
            />
          </Pressable>
        </View>
        <Text className="text-lg font-semibold mt-3">{profile.fullname}</Text>
        <Text className="text-gray-500">{profile.email}</Text>
      </View>

      {/* Form Fields */}
      <View className="mb-6">
        <Text className="text-sm text-gray-600 mb-1">Full Name</Text>
        <TextInput
          className="border border-gray-200 rounded-lg px-3 py-3 text-base"
          value={fullname}
          onChangeText={setFullname}
        />
      </View>

      <View className="mb-6">
        <Text className="text-sm text-gray-600 mb-1">Age</Text>
        <TextInput
          className="border border-gray-200 rounded-lg px-3 py-3 text-base"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View>

      {/* Save Button */}
      <Pressable
        className={`rounded-full py-4 items-center ${
          isSaving ? "bg-gray-300" : "bg-blue-600"
        }`}
        onPress={handleSave}
        disabled={isSaving}
      >
        <Text
          className={`font-semibold ${
            isSaving ? "text-gray-500" : "text-white"
          }`}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default ManageAccountScreen;
