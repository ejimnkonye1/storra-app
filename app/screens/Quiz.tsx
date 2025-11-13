// app/screens/QuizScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function QuizScreen() {
  const router = useRouter();
  const { quiz } = useLocalSearchParams();

  // Parse quiz safely
  const parsedQuiz = quiz ? JSON.parse(quiz as string) : null;
  const questions = parsedQuiz?.questions || [];
  const quizTitle = parsedQuiz?.title || 'Quiz';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  if (!parsedQuiz) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-600 text-lg">Quiz data not available.</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption && currentQuestion?.answer) {
      if (selectedOption === currentQuestion.answer) {
        setScore(prev => prev + 1);
      }
    }

    setSelectedOption(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert(`Quiz completed! Your score: ${score + (selectedOption === currentQuestion?.answer ? 1 : 0)} / ${questions.length}`);
      router.back();
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-12 pb-24">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <Pressable onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text className="text-2xl font-bold text-gray-900 flex-1">{quizTitle}</Text>
        </View>

        {/* Question */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Question {currentIndex + 1} of {questions.length}
          </Text>
          <Text className="text-gray-700 text-base">
            {currentQuestion?.question || 'No question text available.'}
          </Text>
        </View>

        {/* Options */}
        <View className="mb-6">
          {currentQuestion?.options?.map((option: string, index: number) => {
            const isSelected = selectedOption === option;
            return (
              <Pressable
                key={index}
                onPress={() => handleOptionSelect(option)}
                className={`border rounded-lg p-4 mb-3 ${
                  isSelected ? 'border-blue-600 bg-blue-100' : 'border-gray-300'
                }`}
              >
                <Text className={`text-gray-800 ${isSelected ? 'font-bold' : 'font-medium'}`}>
                  {option}
                </Text>
              </Pressable>
            );
          }) || <Text className="text-gray-500">No options available.</Text>}
        </View>

        {/* Next Button */}
        <Pressable
          onPress={handleNext}
          className="bg-blue-600 rounded-lg py-3 flex-row justify-center items-center"
        >
          <Text className="text-white font-semibold mr-2">
            {currentIndex + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </Pressable>
      </ScrollView>
    </View>
  );
}
