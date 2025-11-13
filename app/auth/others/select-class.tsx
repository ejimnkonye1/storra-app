import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../../backendconfig';

const SelectClassScreen = () => {
  const { userId } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const classes = [
    { classId: 'primary-1', className: 'Primary 1', educationLevel: 'primary' },
    { classId: 'primary-2', className: 'Primary 2', educationLevel: 'primary' },
    { classId: 'primary-3', className: 'Primary 3', educationLevel: 'primary' },
    { classId: 'primary-4', className: 'Primary 4', educationLevel: 'primary' },
    { classId: 'primary-5', className: 'Primary 5', educationLevel: 'primary' },
    { classId: 'primary-6', className: 'Primary 6', educationLevel: 'primary' },
  ];

  const handleFinish = async () => {
    if (!selectedClass) {
      Alert.alert('Please select your class');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/onboarding/select-class/${userId}`, {
        classId: selectedClass.classId,
        className: selectedClass.className,
        educationLevel: selectedClass.educationLevel,
      });

      Alert.alert(
        'Setup Complete!',
        'Your profile is all set. You can now log in.',
        [{ text: 'OK', onPress: () => router.replace('/auth/student/login') }]
      );
    } catch (error) {
      console.error('Class selection failed:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to save your class. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6 justify-center">
      <Text className="text-3xl font-bold text-center mb-4">
        Which class are you in?
      </Text>
      <Text className="text-center text-gray-600 mb-10">
        This helps us find the right content for you.
      </Text>

      <View className="flex-row flex-wrap justify-center">
        {classes.map((item) => (
          <TouchableOpacity
            key={item.classId}
            className={`py-3 px-5 border rounded-full m-2 ${
              selectedClass?.classId === item.classId
                ? 'bg-blue-500 border-blue-500'
                : 'border-gray-300'
            }`}
            onPress={() => setSelectedClass(item)}
          >
            <Text
              className={`font-semibold ${
                selectedClass?.classId === item.classId
                  ? 'text-white'
                  : 'text-gray-700'
              }`}
            >
              {item.className}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        className={`mt-10 py-4 rounded-full ${
          selectedClass && !isLoading ? 'bg-blue-500' : 'bg-gray-300'
        }`}
        disabled={!selectedClass || isLoading}
        onPress={handleFinish}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-semibold text-center text-lg">
            Finish Setup
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SelectClassScreen;
