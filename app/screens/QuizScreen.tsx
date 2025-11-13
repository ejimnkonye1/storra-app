import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

export default function QuizTaking() {
  const router = useRouter();
  const { quiz } = useLocalSearchParams();

  // ✅ Parse & normalize quiz structure
  let parsedQuiz = null;
  try {
    parsedQuiz = quiz ? JSON.parse(quiz as string) : null;
    if (parsedQuiz) {
      parsedQuiz = {
        title: parsedQuiz.quizTitle || "Quiz",
        subtitle: parsedQuiz.timeLimit || "",
        estimatedTime: parsedQuiz.timeLimit || "",
        questions: parsedQuiz.questions.map((q: any) => ({
          id: q.questionId,
          question: q.questionText,
          options: q.options,
          answer: q.correctAnswer,
          type: q.options?.length ? "multiple_choice" : "short_answer",
        })),
      };
    }
  } catch (err) {
    console.error("Error parsing quiz:", err);
  }

  if (!parsedQuiz) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-600 text-lg">Quiz data not available.</Text>
      </View>
    );
  }

  // ✅ Destructure quiz data
  const { title, subtitle, questions, estimatedTime } = parsedQuiz;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleNext = () => {
    const selected = selectedAnswers[currentQuestion.id];
    if (selected && currentQuestion.answer) {
      if (selected === currentQuestion.answer) {
        setScore((prev) => prev + 1);
      }
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert(
        `🎉 Quiz completed!\nYour score: ${
          score + (selected === currentQuestion.answer ? 1 : 0)
        } / ${questions.length}`
      );
      router.back();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const renderMultipleChoice = (question: any) => {
    const selectedOption = selectedAnswers[question.id];
    return (
      <View className="px-4">
        <Text className="text-gray-900 text-base mb-6 leading-6">
          {question.question}
        </Text>

        <View className="space-y-3">
          {question.options?.map((option: string, index: number) => {
            const isSelected = selectedOption === option;
            return (
              <Pressable
                key={index}
                onPress={() =>
                  setSelectedAnswers({ ...selectedAnswers, [question.id]: option })
                }
                className={`flex-row items-center p-4 rounded-lg border-2 ${
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

          {subtitle && (
            <Text className="text-sm text-gray-600 mb-1">{subtitle}</Text>
          )}
          <Text className="text-xl font-bold text-gray-900 mb-4">{title}</Text>

          {/* Progress Bar */}
          <View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-600">
                Question {currentIndex + 1} of {questions.length}
              </Text>
              {estimatedTime && (
                <Text className="text-sm text-gray-600">⏱ {estimatedTime}</Text>
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
