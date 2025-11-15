import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
// Note: This example uses Ionicon names, but you would need a custom icon setup or 
// another library like MaterialCommunityIcons to match all the icons in the image exactly.
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 

// --- Reusable Icon Chip Component ---
const IconChip = ({ label, iconName, isSelected, onSelect, iconType = 'Ionicons' }) => (
  <TouchableOpacity
    onPress={onSelect}
    className={`
      ${isSelected ? 'bg-indigo-500 border-indigo-500' : 'bg-white border-gray-300'}
      border rounded-full py-2 px-3 mr-2 mb-3 flex-row items-center
    `}
  >
    {iconType === 'Ionicons' ? (
      <Ionicons 
        name={iconName} 
        size={16} 
        color={isSelected ? 'white' : '#4B5563'} 
        style={{ marginRight: 6 }} 
      />
    ) : (
       // Using MaterialCommunityIcons for some specialized icons (e.g., Rewards)
      <MaterialCommunityIcons 
        name={iconName} 
        size={16} 
        color={isSelected ? 'white' : '#4B5563'} 
        style={{ marginRight: 6 }} 
      />
    )}
    
    <Text className={isSelected ? 'text-white font-medium' : 'text-gray-700'}>
      {label}
    </Text>
  </TouchableOpacity>
);


const LearningStyleInterestScreen = () => {
  const [styles, setStyles] = useState(['Listening']);
  const [topics, setTopics] = useState(['Maths', 'Reading']);
  const [rewards, setRewards] = useState(['XP & badges']);

  // Helper function to toggle selection for arrays with limits (Choose 2-3)
  const handleToggle = (setter, key, limit) => {
    setter(prevArray => {
      if (prevArray.includes(key)) {
        return prevArray.filter(item => item !== key);
      } else if (prevArray.length < limit) {
        return [...prevArray, key];
      }
      return prevArray; // Don't add if limit is reached
    });
  };

  // Data for the chips
  const learningStyles = [
    { label: 'Listening', icon: 'volume-high-outline', key: 'listening' },
    { label: 'Watching videos', icon: 'videocam-outline', key: 'videos' },
    { label: 'Playing game', icon: 'game-controller-outline', key: 'game' },
    { label: 'Drawing or writing', icon: 'hand-draw-outline', key: 'drawing' }, // Using a suitable Ionicon
    { label: 'Solving puzzles', icon: 'apps-outline', key: 'puzzles' },
  ];
  
  const topicsOfInterest = [
    { label: 'Maths', icon: 'book-outline', key: 'maths' }, 
    { label: 'Reading', icon: 'book-open-outline', key: 'reading' },
    { label: 'Science', icon: 'color-filter-outline', key: 'science' }, // Using a suitable Ionicon
    { label: 'Art', icon: 'happy-outline', key: 'art' }, // Using a suitable Ionicon
    { label: 'Languages', icon: 'chatbox-outline', key: 'languages1' },
    { label: 'Languages', icon: 'chatbox-outline', key: 'languages2' }, // Duplicated in image
  ];

  const rewardMotivations = [
    { label: 'XP & badges', icon: 'rocket-outline', key: 'xp' },
    { label: 'Real rewards & gifts', icon: 'gift', key: 'rewards', type: 'Material' }, // Use Material for gift
    { label: 'Knowledge & skills', icon: 'bulb-outline', key: 'knowledge' },
    { label: 'Fun & gmaes', icon: 'game-controller', key: 'fun', type: 'Material' }, // Using Material for controller
  ];


  const handleContinue = () => {
    console.log({ styles, topics, rewards });
    alert('Setup Complete! Ready to Continue.');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="p-4">
        {/* --- Header --- */}
        <View className="flex-row items-center pt-2 pb-6">
          <TouchableOpacity onPress={() => console.log('Go back')} className="pr-3">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Learning Style & Interest</Text>
        </View>

        {/* --- Progress Bar --- */}
        <View className="h-1.5 bg-gray-200 rounded-full w-full mb-8">
          {/* Simulating 100% progress */}
          <View className="bg-indigo-600 rounded-full h-full w-full" /> 
        </View>

        {/* --- How do you like to learn best? --- */}
        <Text className="text-lg font-semibold mb-3">How do you like to learn best?</Text>
        <View className="flex-row flex-wrap mb-6">
          {learningStyles.map((style) => (
            <IconChip
              key={style.key}
              label={style.label}
              iconName={style.icon}
              isSelected={styles.includes(style.key)}
              onSelect={() => handleToggle(setStyles, style.key, 5)} // No strict limit shown
            />
          ))}
        </View>

        {/* --- Which topics do you enjoy the most? --- */}
        <Text className="text-lg font-semibold mt-4 mb-3">
          Which topics do you enjoy the most?
          <Text className="text-sm font-normal text-gray-500"> (Choose 2-3)</Text>
        </Text>
        <View className="flex-row flex-wrap mb-6">
          {topicsOfInterest.map((topic) => (
            <IconChip
              key={topic.key}
              label={topic.label}
              iconName={topic.icon}
              isSelected={topics.includes(topic.key)}
              onSelect={() => handleToggle(setTopics, topic.key, 3)}
            />
          ))}
        </View>

        {/* --- What are you most excited to earn? --- */}
        <Text className="text-lg font-semibold mt-4 mb-3">
          What are you most excited to earn on storra?
          <Text className="text-sm font-normal text-gray-500"> (Choose 2-3)</Text>
        </Text>
        <View className="flex-row flex-wrap mb-6">
          {rewardMotivations.map((reward) => (
            <IconChip
              key={reward.key}
              label={reward.label}
              iconName={reward.icon}
              iconType={reward.type}
              isSelected={rewards.includes(reward.key)}
              onSelect={() => handleToggle(setRewards, reward.key, 3)}
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

export default LearningStyleInterestScreen;