import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';

interface StatsCardsProps {
  completedCourses: number;
  completedLessons: number;
  savedCount: number;
  favoriteCount: number;
  onNextCourse?: () => void;
  onSaved?: () => void;
  onFavorite?: () => void;
}

export default function StatsCards({
  completedCourses,
  completedLessons,
  savedCount,
  favoriteCount,
  onNextCourse,
  onSaved,
  onFavorite,
}: StatsCardsProps) {
  return (
    <View className="flex-row flex-wrap justify-between px-6 mt-6 mb-6">

      {/* Card 1 — Completed */}
      <View className="w-[48%] border border-gray-300 rounded-xl py-4 px-2 mb-4">
        <View className="bg-green-100 rounded-full mb-2 items-center justify-center w-10 h-10">
          <Image
            source={require('@/assets/images/completed.png')}
            className="w-6 h-6"
          />
        </View>
        <Text className="text-gray-800 text-sm font-semibold">
          Completed Lessons
        </Text>
        <Text className="text-2xl font-bold text-gray-900 mt-1">
          {completedLessons}
        </Text>
        <Text className="text-gray-400 text-xs mt-0.5">
          {completedCourses} {completedCourses === 1 ? 'course' : 'courses'} done
        </Text>
        <Pressable
          className="flex-row gap-2 mt-3 bg-green-200 px-4 py-1 rounded-full items-center self-start"
          onPress={onNextCourse}
        >
          <Text className="text-green-600 text-xs font-semibold">Next course</Text>
          <Ionicons name="arrow-forward" size={13} color="green" />
        </Pressable>
      </View>

      {/* Card 2 — Library */}
      <View className="w-[48%] border border-gray-300 rounded-xl py-4 px-2 mb-4">
        <View className="bg-red-100 rounded-full mb-2 items-center justify-center w-10 h-10">
          <Image
            source={require('@/assets/images/mdi_library-outline.png')}
            className="w-6 h-6"
          />
        </View>
        <Text className="text-gray-800 text-sm font-semibold">My Library</Text>
        <Text className="text-2xl font-bold text-gray-900 mt-1">
          {savedCount + favoriteCount}
        </Text>
        <Text className="text-gray-400 text-xs mt-0.5">
          {savedCount} saved · {favoriteCount} favourite
        </Text>
        <View className="flex-row gap-2 mt-3">
          <Pressable
            className="bg-red-200 px-3 py-1 rounded-full"
            onPress={onSaved}
          >
            <Text className="text-red-600 text-xs font-semibold">Saved</Text>
          </Pressable>
          <Pressable
            className="bg-red-200 px-3 py-1 rounded-full"
            onPress={onFavorite}
          >
            <Text className="text-red-600 text-xs font-semibold">Favourite</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
