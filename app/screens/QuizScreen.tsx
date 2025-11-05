import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  QuizList: undefined;
  Quiz: { quiz: any };
};


type Props = NativeStackScreenProps<RootStackParamList, "Quiz">;

const QuizScreen = ({ route }: Props) => {
  const { quiz } = route.params;
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 pt-6">
      <Text className="text-xl font-bold mb-2">{quiz.title}</Text>
      <Text className="text-gray-500 mb-4">{quiz.subject}</Text>

      {quiz.questions.map((q: any) => (
        <View key={q.id} className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <Text className="font-semibold mb-3 text-gray-800">
            {q.id}. {q.text}
          </Text>

          {q.type === "short-answer" && (
            <TextInput
              placeholder="Type your answer..."
              className="border border-gray-300 rounded-lg p-2 text-sm"
              value={answers[q.id] || ""}
              onChangeText={(val) => handleAnswer(q.id, val)}
            />
          )}

          {q.type === "multiple-choice" &&
            q.options?.map((opt: string) => (
              <Pressable
                key={opt}
                className={`border rounded-lg p-2 mb-2 ${
                  answers[q.id] === opt
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
                onPress={() => handleAnswer(q.id, opt)}
              >
                <Text className="text-sm text-gray-700">{opt}</Text>
              </Pressable>
            ))}

          {q.type === "true-false" &&
            q.options?.map((opt: string) => (
              <Pressable
                key={opt}
                className={`border rounded-lg p-2 mb-2 ${
                  answers[q.id] === opt
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
                onPress={() => handleAnswer(q.id, opt)}
              >
                <Text className="text-sm text-gray-700">{opt}</Text>
              </Pressable>
            ))}

          {q.type === "matching-pair" && (
            <View>
              {q.pairs?.map((pair: any, idx: number) => (
                <View
                  key={idx}
                  className="flex-row justify-between mb-2 border-b border-gray-200 pb-1"
                >
                  <Text className="text-sm text-gray-800">{pair.left}</Text>
                  <Text className="text-sm text-gray-500">{pair.right}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}

      <Pressable className="bg-blue-500 rounded-2xl py-3 mt-6 mb-10">
        <Text className="text-center text-white font-semibold">Submit Quiz</Text>
      </Pressable>
    </ScrollView>
  );
};

export default QuizScreen;
