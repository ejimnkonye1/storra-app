import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Pressable, ScrollView, Text, TextInput, View, ActivityIndicator } from "react-native";
import axios from "axios";
import { BASE_URL } from "@/backendconfig";
import { useUserStore } from "@/store/userStore";

export default function QuizTaking() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { token } = useUserStore();
  
  // ✅ Extract params properly
  const courseId = params.courseId as string;
  const quizId = params.quizId as string;

  console.log("📋 Params received:", { courseId, quizId });

  // ✅ ALL HOOKS FIRST
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Check if params exist before fetching
  useEffect(() => {
    if (!courseId || !quizId) {
      console.error("❌ Missing params:", { courseId, quizId });
      setError("Missing quiz information");
      setIsLoading(false);
      return;
    }
    fetchQuiz();
  }, [courseId, quizId]);

  const fetchQuiz = async () => {
    try {
      setIsLoading(true);
      const url = `${BASE_URL}/quiz/course/${courseId}/quiz/${quizId}`;
      console.log('🔍 Fetching quiz from:', url);
    console.log('🔑 Token:', token ? 'Token exists' : 'NO TOKEN!');
    console.log('🔑 Token preview:', token?.substring(0, 20) + '...');
    
      console.log("🔍 Fetching quiz from:", url);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Quiz response:", response.data);

      if (response.data.data.quiz && response.data.data.quiz.questions) {
        setQuizData(response.data.data.quiz);
      } else {
        setError("Quiz has no questions");
      }
    } catch (err: any) {
        console.error('❌ Full error:', err);
    console.error('❌ Response:', err.response);
    console.error('❌ Status:', err.response?.status);
    console.error('❌ Data:', err.response?.data);
      console.error("❌ Error fetching quiz:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to load quiz");
    } finally {
      setIsLoading(false);
    }
  };
  // ✅ Loading state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-600 mt-4">Loading quiz...</Text>
      </View>
    );
  }

  // ✅ Error state
  if (error || !quizData || !quizData.questions || quizData.questions.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-4">
        <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
        <Text className="text-gray-900 text-xl font-bold mt-4">Quiz Not Available</Text>
        <Text className="text-gray-600 text-center mt-2 mb-6">
          {error || "Unable to load quiz questions. Please try again."}
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </Pressable>
      </View>
    );
  }
  // ✅ Format questions for display
  const questions = quizData.questions.map((q: any) => ({
    id: q.questionId,
    question: q.questionText,
    options: q.options || [],
    type: q.options && q.options.length > 0 ? "multiple_choice" : "short_answer",
  }));

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleNext = () => {
    const selected = selectedAnswers[currentQuestion.id];

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Submit quiz to backend
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    try {
      // Format answers for submission
      const answers = Object.keys(selectedAnswers).map((questionId) => ({
        questionId,
        selectedAnswer: selectedAnswers[questionId],
      }));

      console.log("📤 Submitting quiz:", answers);

      const response = await axios.post(
        `${BASE_URL}/quiz/course/${courseId}/quiz/${quizId}/submit`,
        {
          answers,
          timeSpent: 0, // You can add timer logic
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Quiz submitted:", response.data);

      const result = response.data.data;
      
      alert(
        `${result.message}\n\n` +
        `Score: ${result.score}/${result.totalQuestions}\n` +
        `Percentage: ${result.percentage}%\n` +
        `${result.pointsEarned > 0 ? `Points Earned: ${result.pointsEarned}` : ""}`
      );

      router.back();
    } catch (err: any) {
      console.error("❌ Error submitting quiz:", err.response?.data || err.message);
      alert("Failed to submit quiz. Please try again.");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const renderMultipleChoice = (question: any) => {
    const selectedOption = selectedAnswers[question.id];

    if (!question.options || question.options.length === 0) {
      return (
        <View className="px-4">
          <Text className="text-gray-900 text-base mb-6 leading-6">
            {question.question}
          </Text>
          <Text className="text-red-500">No options available for this question.</Text>
        </View>
      );
    }

    return (
      <View className="px-4">
        <Text className="text-gray-900 text-base mb-6 leading-6">
          {question.question}
        </Text>

        <View className="space-y-3">
          {question.options.map((option: string, index: number) => {
            const isSelected = selectedOption === option;
            return (
              <Pressable
                key={index}
                onPress={() =>
                  setSelectedAnswers({ ...selectedAnswers, [question.id]: option })
                }
                className={`flex-row items-center p-4 rounded-lg border-2 mb-3 ${
                  isSelected
                    ? "bg-blue-600 border-blue-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                    isSelected ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`font-bold ${
                      isSelected ? "text-blue-600" : "text-gray-700"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text
                  className={`flex-1 ${
                    isSelected ? "text-white font-semibold" : "text-gray-900"
                  }`}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  };

  const renderShortAnswer = (question: any) => {
    const answer = selectedAnswers[question.id] || "";
    return (
      <View className="px-4">
        <Text className="text-gray-900 text-base mb-6 leading-6">
          {question.question}
        </Text>
        <TextInput
          className="bg-white border-2 border-gray-200 rounded-lg p-4 text-gray-900"
          placeholder="Type your answer..."
          placeholderTextColor="#9CA3AF"
          value={answer}
          onChangeText={(text) =>
            setSelectedAnswers({ ...selectedAnswers, [question.id]: text })
          }
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
    );
  };

  const renderQuestion = () => {
    if (!currentQuestion) {
      return (
        <View className="px-4">
          <Text className="text-red-500">Question not found</Text>
        </View>
      );
    }

    switch (currentQuestion.type) {
      case "short_answer":
        return renderShortAnswer(currentQuestion);
      case "multiple_choice":
      default:
        return renderMultipleChoice(currentQuestion);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-4 pt-12 pb-4 border-b border-gray-200">
          <Pressable onPress={() => router.back()} className="mb-4">
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>

          {quizData.timeLimit && (
            <Text className="text-sm text-gray-600 mb-1">{quizData.timeLimit}</Text>
          )}
          <Text className="text-xl font-bold text-gray-900 mb-4">
            {quizData.quizTitle || "Quiz"}
          </Text>

          {/* Progress Bar */}
          <View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-600">
                Question {currentIndex + 1} of {questions.length}
              </Text>
              {quizData.timeLimit && (
                <Text className="text-sm text-gray-600">⏱ {quizData.timeLimit}</Text>
              )}
            </View>
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <View
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </View>
          </View>
        </View>

        {/* Question Content */}
        <View className="py-6">{renderQuestion()}</View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="px-4 py-4 bg-white border-t border-gray-200 flex-row justify-between items-center">
        <Pressable
          onPress={handlePrevious}
          disabled={currentIndex === 0}
          className={`px-6 py-3 rounded-lg ${
            currentIndex === 0 ? "bg-gray-100" : "bg-gray-200"
          }`}
        >
          <Text
            className={`font-semibold ${
              currentIndex === 0 ? "text-gray-400" : "text-gray-700"
            }`}
          >
            Previous
          </Text>
        </Pressable>

        <Pressable
          onPress={handleNext}
          className="px-6 py-3 rounded-lg bg-blue-600 flex-row items-center"
        >
          <Text className="text-white font-semibold mr-2">
            {currentIndex === questions.length - 1 ? "Submit" : "Next"}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}