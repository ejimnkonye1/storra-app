import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface ClassOption {
  classId: string;
  className: string;
  educationLevel: string;
  order: number;
}

const SelectClassScreen = () => {
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Get userId from route params or AsyncStorage
  const userId = ""; // TODO: Get from route params or storage

  useEffect(() => {
    loadAvailableClasses();
  }, []);

  const loadAvailableClasses = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(
        `${API_URL}onboarding/classes/${userId}`,
        {
          headers: {
            // Add Authorization header if you have token stored
            // "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load classes");
      }

      console.log("✅ Classes loaded:", data);
      setClasses(data.data.classes || []);

    } catch (error: any) {
      console.error("❌ Load classes error:", error);
      Alert.alert(
        "Error",
        error.message || "Failed to load classes. Please try again."
      );
    } finally {
      setIsFetching(false);
    }
  };

  const handleContinue = async () => {
    if (!selectedClass) {
      Alert.alert("Required", "Please select a class to continue");
      return;
    }

    setIsLoading(true);

    try {
      // Save selected class to backend
      const response = await fetch(
        `${API_URL}/api/v1/onboarding/select-class/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add Authorization header if you have token stored
            // "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            classId: selectedClass,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to select class");
      }

      console.log("✅ Class selected:", data);

      // Registration complete - redirect to login
      Alert.alert(
        "Registration Complete! 🎉",
        "Your account has been set up successfully. Please login to continue.",
        [
          {
            text: "Go to Login",
            onPress: () => router.replace("/auth/student/login"),
          },
        ]
      );

    } catch (error: any) {
      console.error("❌ Select class error:", error);
      Alert.alert(
        "Error",
        error.message || "Failed to select class. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Group classes by education level
  const primaryClasses = classes.filter(c => c.educationLevel === 'primary');
  const jssClasses = classes.filter(c => c.educationLevel === 'junior-secondary');
  const sssClasses = classes.filter(c => c.educationLevel === 'senior-secondary');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 100 }} 
        className="p-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center pt-2 pb-6">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="pr-3"
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Select Your Class</Text>
        </View>

        {/* Progress Bar */}
        <View className="h-1.5 bg-gray-200 rounded-full w-full mb-8">
          <View className="bg-indigo-600 rounded-full h-full w-[100%]" />
        </View>

        {isFetching ? (
          <View className="items-center justify-center py-20">
            <ActivityIndicator size="large" color="#4F46E5" />
            <Text className="text-gray-600 mt-4">Loading classes...</Text>
          </View>
        ) : classes.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Text className="text-gray-600">No classes available</Text>
          </View>
        ) : (
          <>
            <Text className="text-lg font-semibold mb-4">
              Choose the class that matches your current level
            </Text>

            {/* Primary Classes */}
            {primaryClasses.length > 0 && (
              <View className="mb-6">
                <Text className="text-base font-semibold text-gray-700 mb-3">
                  Primary School
                </Text>
                {primaryClasses.map((cls) => (
                  <TouchableOpacity
                    key={cls.classId}
                    onPress={() => setSelectedClass(cls.classId)}
                    className={`border rounded-lg p-4 mb-3 flex-row items-center justify-between ${
                      selectedClass === cls.classId
                        ? 'bg-indigo-500 border-indigo-500'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <Text
                      className={`text-lg ${
                        selectedClass === cls.classId
                          ? 'text-white font-semibold'
                          : 'text-gray-800'
                      }`}
                    >
                      {cls.className}
                    </Text>
                    {selectedClass === cls.classId && (
                      <Ionicons name="checkmark-circle" size={24} color="white" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Junior Secondary Classes */}
            {jssClasses.length > 0 && (
              <View className="mb-6">
                <Text className="text-base font-semibold text-gray-700 mb-3">
                  Junior Secondary School
                </Text>
                {jssClasses.map((cls) => (
                  <TouchableOpacity
                    key={cls.classId}
                    onPress={() => setSelectedClass(cls.classId)}
                    className={`border rounded-lg p-4 mb-3 flex-row items-center justify-between ${
                      selectedClass === cls.classId
                        ? 'bg-indigo-500 border-indigo-500'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <Text
                      className={`text-lg ${
                        selectedClass === cls.classId
                          ? 'text-white font-semibold'
                          : 'text-gray-800'
                      }`}
                    >
                      {cls.className}
                    </Text>
                    {selectedClass === cls.classId && (
                      <Ionicons name="checkmark-circle" size={24} color="white" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Senior Secondary Classes */}
            {sssClasses.length > 0 && (
              <View className="mb-6">
                <Text className="text-base font-semibold text-gray-700 mb-3">
                  Senior Secondary School
                </Text>
                {sssClasses.map((cls) => (
                  <TouchableOpacity
                    key={cls.classId}
                    onPress={() => setSelectedClass(cls.classId)}
                    className={`border rounded-lg p-4 mb-3 flex-row items-center justify-between ${
                      selectedClass === cls.classId
                        ? 'bg-indigo-500 border-indigo-500'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <Text
                      className={`text-lg ${
                        selectedClass === cls.classId
                          ? 'text-white font-semibold'
                          : 'text-gray-800'
                      }`}
                    >
                      {cls.className}
                    </Text>
                    {selectedClass === cls.classId && (
                      <Ionicons name="checkmark-circle" size={24} color="white" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Footer Buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 flex-row justify-between items-center">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="py-3 px-6"
          disabled={isLoading}
        >
          <Text className="text-gray-600 text-lg font-medium">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleContinue}
          disabled={isLoading || !selectedClass}
          className={`py-3 px-8 rounded-xl flex-row items-center shadow-lg ${
            isLoading || !selectedClass ? "bg-indigo-400" : "bg-indigo-600"
          }`}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Text className="text-white text-lg font-medium mr-2">Complete</Text>
              <Ionicons name="checkmark" size={20} color="white" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectClassScreen;