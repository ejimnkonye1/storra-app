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

const LearningGoalsScreen = () => {
  const { userId } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState([]);

  const goals = [
    { id: 'understand_concepts', label: 'Understand concepts better' },
    { id: 'ace_tests', label: 'Ace my tests' },
    { id: 'homework_help', label: 'Get help with homework' },
    { id: 'stay_ahead', label: 'Stay ahead of my class' },
  ];

  const toggleGoal = (goalId) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = async () => {
  if (selectedGoals.length === 0) {
    Alert.alert('Please select at least one goal');
    return;
  }

  setIsLoading(true);
  try {
    const response = await axios.patch(`${BASE_URL}/onboarding/learning-goals/${userId}`, {
      goals: selectedGoals,
    });

    // ✅ FIX: Correct response data extraction
    const requiresClassSelection = response?.data?.data?.requiresClassSelection;
    const nextStep = response?.data?.data?.nextStep;

    console.log("Next step from backend:", nextStep);

    console.log("Learning goals API response:", JSON.stringify(response.data, null, 2));

    if (requiresClassSelection || nextStep === 'class-selection') {
      router.push({
        pathname: '/auth/others/select-class',
        params: { userId },
      });
    } else {
      console.log("Learning goals API response:", JSON.stringify(response.data, null, 2));
      router.replace('/auth/student/login');
    }

  } catch (error) {
    console.error('Learning goals submission failed:', error.response?.data || error.message);
    Alert.alert('Error', 'Failed to save your goals. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <SafeAreaView className="flex-1 bg-white p-6 justify-center">
      <Text className="text-3xl font-bold text-center mb-4">
        What are your learning goals?
      </Text>
      <Text className="text-center text-gray-600 mb-10">
        Select all that apply.
      </Text>

      <View className="space-y-4">
        {goals.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            className={`p-4 border rounded-lg flex-row items-center ${
              selectedGoals.includes(goal.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onPress={() => toggleGoal(goal.id)}
          >
            <View className={`w-6 h-6 border-2 rounded-full mr-4 items-center justify-center ${
              selectedGoals.includes(goal.id) ? 'border-blue-500 bg-blue-500' : 'border-gray-400'
            }`}>
              {selectedGoals.includes(goal.id) && <Text className="text-white">✓</Text>}
            </View>
            <Text className="text-lg flex-1">{goal.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        className={`mt-10 py-4 rounded-full ${
          selectedGoals.length > 0 && !isLoading ? 'bg-blue-500' : 'bg-gray-300'
        }`}
        disabled={selectedGoals.length === 0 || isLoading}
        onPress={handleContinue}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-semibold text-center text-lg">
            Continue
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LearningGoalsScreen;
