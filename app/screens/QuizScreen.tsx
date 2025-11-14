// app/screens/QuizTaking.tsx
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Quiz, QuizAnswer, quizService } from "../../services/quizService";
import { useUserStore } from "../../store/userStore";

export default function QuizTaking() {
  const router = useRouter();
  const { quiz } = useLocalSearchParams();
  const { token } = useUserStore();

  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  // ----------------------------
  // Fetch quiz from backend
  // ----------------------------
  useEffect(() => {
    const fetchQuiz = async () => {
      if (!token) return;

      try {
        const parsed = quiz ? JSON.parse(quiz as string) : null;
        if (!parsed) throw new Error("Quiz data not found");

        const courseId = parsed.courseId ?? parsed.id ?? parsed.quizId;
        const quizId = parsed.quizId ?? parsed.id;

        if (!courseId || !quizId) throw new Error("Missing courseId or quizId");

        const fullQuiz = await quizService.getQuiz(token, courseId, quizId);
        setQuizData(fullQuiz);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setQuizData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quiz, token]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-600 text-lg">Loading quiz...</Text>
      </View>
    );
  }

  if (!quizData) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-600 text-lg">Quiz data not available.</Text>
      </View>
    );
  }

  const { quizTitle: title, timeLimit: subtitle, questions } = quizData;
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  // ----------------------------
  // Navigation
  // ----------------------------
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  // ----------------------------
  // Submit quiz
  // ----------------------------
  const handleSubmit = async () => {
    if (!token) return;
    if (!quizData) return;

    const answers: QuizAnswer[] = questions.map((q) => ({
      questionId: q.questionId,
      selectedAnswer: selectedAnswers[q.questionId] ?? "",
    }));

    setSubmitting(true);
    try {
      const courseId = quizData.quizId; // assuming courseId = quizId for route
      const quizId = quizData.quizId;

      const result = await quizService.submitQuizAttempt(token, courseId, quizId, answers);
      alert(
        `🎉 Quiz completed!\nScore: ${result.score} / ${result.totalQuestions}\nStatus: ${result.status}`
      );
      router.back();
    } catch (err) {
      console.error("Error submitting quiz:", err);
      alert("Failed to submit quiz. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ----------------------------
  // Render functions
  // ----------------------------
  const renderMultipleChoice = (question: any) => {
    const selectedOption = selectedAnswers[question.questionId];
    return (
      <View className="px-4">
        <Text className="text-gray-900 text-base mb-6 leading-6">{question.questionText}</Text>
        <View className="space-y-3">
          {question.options?.map((option: string, index: number) => {
            const isSelected = selectedOption === option;
            return (
              <Pressable
                key={index}
                onPress={() =>
                  setSelectedAnswers({ ...selectedAnswers, [question.questionId]: option })
                }
                className={`flex-row items-center p-4 rounded-lg border-2 ${
                  isSelected ? "bg-blue-600 border-blue-600" : "bg-white border-gray-200"
                }`}
              >
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                    isSelected ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <Text className={`font-bold ${isSelected ? "text-blue-600" : "text-gray-700"}`}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text className={`flex-1 ${isSelected ? "text-white font-semibold" : "text-gray-900"}`}>
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
    const answer = selectedAnswers[question.questionId] || "";
    return (
      <View className="px-4">
        <Text className="text-gray-900 text-base mb-6 leading-6">{question.questionText}</Text>
        <TextInput
          className="bg-white border-2 border-gray-200 rounded-lg p-4 text-gray-900"
          placeholder="Type your answer..."
          placeholderTextColor="#9CA3AF"
          value={answer}
          onChangeText={(text) =>
            setSelectedAnswers({ ...selectedAnswers, [question.questionId]: text })
          }
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
    );
  };

  const renderQuestion = () => {
    return currentQuestion.options?.length ? renderMultipleChoice(currentQuestion) : renderShortAnswer(currentQuestion);
  };

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-4 pt-12 pb-4 border-b border-gray-200">
          <Pressable onPress={() => router.back()} className="mb-4">
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>

          {subtitle && <Text className="text-sm text-gray-600 mb-1">{subtitle}</Text>}
          <Text className="text-xl font-bold text-gray-900 mb-4">{title}</Text>

          {/* Progress Bar */}
          <View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-600">
                Question {currentIndex + 1} of {questions.length}
              </Text>
              {subtitle && <Text className="text-sm text-gray-600">⏱ {subtitle}</Text>}
            </View>
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <View className="h-full bg-blue-600 rounded-full" style={{ width: `${progress}%` }} />
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
          className={`px-6 py-3 rounded-lg ${currentIndex === 0 ? "bg-gray-100" : "bg-gray-200"}`}
        >
          <Text className={`font-semibold ${currentIndex === 0 ? "text-gray-400" : "text-gray-700"}`}>Previous</Text>
        </Pressable>

        <Pressable
          onPress={handleNext}
          disabled={submitting}
          className={`px-6 py-3 rounded-lg flex-row items-center ${submitting ? "bg-gray-400" : "bg-blue-600"}`}
        >
          <Text className="text-white font-semibold mr-2">
            {currentIndex === questions.length - 1 ? (submitting ? "Submitting..." : "Submit") : "Next"}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
