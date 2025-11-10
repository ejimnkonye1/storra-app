import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// --- Reusable Chip Component for Selection ---
const SelectableChip = ({ label, isSelected, onSelect }) => (
  <TouchableOpacity
    onPress={onSelect}
    className={`
      ${isSelected ? 'bg-indigo-500 border-indigo-500' : 'bg-white border-gray-300'}
      border rounded-full py-2 px-4 mr-2 mb-3
    `}
  >
    <Text className={isSelected ? 'text-white font-medium' : 'text-gray-700'}>
      {label}
    </Text>
  </TouchableOpacity>
);

const LearningGoalsScreen = () => {
  const [goals, setGoals] = useState(['Reading faster', 'Spelling']);
  const [daysPerWeek, setDaysPerWeek] = useState('3 days');
  const [timePerDay, setTimePerDay] = useState('15-30 mins');

  const availableGoals = [
    'Reading faster', 
    'Spelling', 
    'Doing math in my head', 
    'Learning a new language',
    'Improving focus'
  ];
  
  const daysOptions = ['1 day', '2 days', '3 days', '4 days', '5 days', '6 days', '7 days'];
  
  // Notice the '15-30 mins' is duplicated in the image, we will list unique options here
  const timeOptions = ['10 mins', '10-15 mins', '15-30 mins', '1 hour'];

  const handleGoalToggle = (goal) => {
    setGoals(prevGoals => 
      prevGoals.includes(goal)
        ? prevGoals.filter(g => g !== goal)
        : [...prevGoals, goal]
    );
  };

  const handleContinue = () => {
    console.log({ goals, daysPerWeek, timePerDay });
    alert('Continuing to the app!');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="p-4">
        {/* --- Header --- */}
        <View className="flex-row items-center pt-2 pb-6">
          <TouchableOpacity onPress={() => console.log('Go back')} className="pr-3">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Learning Goals</Text>
        </View>

        {/* --- Progress Bar --- */}
        <View className="h-1.5 bg-gray-200 rounded-full w-full mb-8">
          {/* Simulating 75% progress (next step from 40%) */}
          <View className="bg-indigo-600 rounded-full h-full w-[75%]" /> 
        </View>

        {/* --- What do you want to get better at? --- */}
        <Text className="text-lg font-semibold mb-3">What do you want to get better at?</Text>
        <View className="flex-row flex-wrap mb-6">
          {availableGoals.slice(0, 3).map((goal) => (
            <SelectableChip
              key={goal}
              label={goal}
              isSelected={goals.includes(goal)}
              onSelect={() => handleGoalToggle(goal)}
            />
          ))}
          {/* Add Button */}
          <TouchableOpacity className="border border-gray-300 rounded-full py-2 px-4 mr-2 mb-3 flex-row items-center">
            <Ionicons name="add-outline" size={20} color="#6B7280" style={{ marginRight: 4 }} />
            <Text className="text-gray-700">Add</Text>
          </TouchableOpacity>
        </View>

        {/* --- How many days a week? --- */}
        <Text className="text-lg font-semibold mt-4 mb-3">
          How many days a week would you want to learn on storra?
        </Text>
        <View className="flex-row flex-wrap mb-6">
          {daysOptions.map((day) => (
            <SelectableChip
              key={day}
              label={day}
              isSelected={daysPerWeek === day}
              onSelect={() => setDaysPerWeek(day)}
            />
          ))}
        </View>

        {/* --- How much time can you spend? --- */}
        <Text className="text-lg font-semibold mt-4 mb-3">
          How much time can you spend learning each day?
        </Text>
        <View className="flex-row flex-wrap mb-6">
          {timeOptions.map((time) => (
            <SelectableChip
              key={time}
              label={time}
              isSelected={timePerDay === time}
              onSelect={() => setTimePerDay(time)}
            />
          ))}
        </View>
        
      </ScrollView>

      {/* --- Footer Buttons (Fixed Position) --- */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 flex-row justify-between items-center">
        <TouchableOpacity onPress={() => console.log('Cancel')} className="py-3 px-6">
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

export default LearningGoalsScreen;