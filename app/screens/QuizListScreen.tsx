import React from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { quizData } from "../../data/quizData";

export type RootStackParamList = {
  QuizList: undefined;
  Quiz: { quiz: any };
};


type QuizListNav = NativeStackNavigationProp<RootStackParamList, "QuizList">;

const categories = ["New", "Incomplete", "Retake", "Completed"];

const QuizListScreen = () => {
  const navigation = useNavigation<QuizListNav>();

  const renderQuizCard = ({ item }: any) => (
    <Pressable
      onPress={() => navigation.navigate("Quiz", { quiz: item })}
      className="bg-white rounded-2xl shadow-sm p-4 w-[48%] mb-4"
    >
      <Image
        source={require("../assets/quiz-thumb.png")}
        className="w-full h-24 rounded-xl mb-3"
        resizeMode="cover"
      />
      <Text className="text-[15px] font-semibold text-gray-800">{item.title}</Text>
      <Text className="text-gray-500 text-xs mt-1">{item.subject}</Text>
      <View className="flex-row justify-between mt-2">
        <Text className="text-xs text-yellow-500 font-semibold">
          ⭐ {item.points}pts
        </Text>
        <Text className="text-xs text-gray-400">
          {item.questionsCount} questions
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-gray-50 px-4 pt-8">
      {/* Tabs */}
      <View className="flex-row justify-between mb-4">
        {categories.map((cat) => (
          <Pressable
            key={cat}
            className="px-3 py-2 bg-white rounded-full shadow-sm"
          >
            <Text className="text-sm font-semibold text-gray-700">{cat}</Text>
          </Pressable>
        ))}
      </View>

      {/* Quiz Grid */}
      <FlatList
        data={quizData}
        renderItem={renderQuizCard}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default QuizListScreen;
