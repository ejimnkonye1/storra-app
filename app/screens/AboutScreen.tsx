import { View, Text, ScrollView, Image } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView className="flex-1 bg-white px-5 py-6">
      <View className="items-center mb-6">
        <Image
          source={require("../assets/storra-logo.png")}
          className="w-24 h-24 mb-3"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-gray-900">About Storra</Text>
      </View>

      <Text className="text-base text-gray-700 leading-6 mb-4">
        <Text className="font-semibold">Storra</Text> is a digital learning platform designed to make education
        engaging, interactive, and accessible for students of all levels. Our goal is to
        help learners build strong foundational skills through guided lessons,
        visual learning materials, and fun quizzes that encourage mastery.
      </Text>

      <Text className="text-base text-gray-700 leading-6 mb-4">
        With Storra, students can learn at their own pace, track progress, and explore
        subjects through bite-sized lessons that make complex concepts easy to
        understand. Teachers and parents can also monitor learning growth and help
        students stay motivated along the way.
      </Text>

      <Text className="text-base text-gray-700 leading-6 mb-4">
        We believe learning should never feel like a chore. That’s why Storra combines
        beautiful visuals, interactive content, and smart learning tools — all in one
        place.
      </Text>

      <View className="mt-6 bg-gray-100 rounded-2xl p-4">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          Our Mission
        </Text>
        <Text className="text-gray-700 leading-6">
          To make quality education accessible, enjoyable, and personalized for every
          learner — empowering students to unlock their full potential anytime,
          anywhere.
        </Text>
      </View>

      <View className="mt-6 bg-gray-100 rounded-2xl p-4">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          Our Vision
        </Text>
        <Text className="text-gray-700 leading-6">
          A world where learning is not limited by place or pace — where every child has
          the tools to learn, grow, and achieve their dreams.
        </Text>
      </View>

      <Text className="text-center text-gray-500 text-sm mt-8 mb-4">
        © {new Date().getFullYear()} Storra Learning. All rights reserved.
      </Text>
    </ScrollView>
  );
}
