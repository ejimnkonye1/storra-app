import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';

interface StatsCardsProps {
  completedCourses: number;
  onNextCourse?: () => void;
  onSaved?: () => void;
  onFavorite?: () => void;
}

export default function StatsCards({
  completedCourses,
  onNextCourse,
  onSaved,
  onFavorite,
}: StatsCardsProps) {
  return (
    <View className="flex-row flex-wrap justify-between px-6 mt-6 mb-6">
      
      {/* Card 1 */}
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
        <Text className="text-gray-500 text-sm">
          {completedCourses} courses completed
        </Text>
        <Pressable
          className="flex-row gap-2 mt-4 bg-green-200 px-4 py-1 rounded-full items-center"
          onPress={onNextCourse}
        >
          <Text className="text-green-600 text-sm font-semibold">Next course</Text>
          <Ionicons name="arrow-forward" size={16} color="green" />
        </Pressable>
      </View>

      {/* Card 2 */}
      <View className="w-[48%] border border-gray-300 rounded-xl py-4 px-2 mb-4">
        <View className="bg-red-100 rounded-full mb-2 items-center justify-center w-10 h-10">
          <Image
            source={require('@/assets/images/mdi_library-outline.png')}
            className="w-6 h-6"
          />
        </View>
        <Text className="text-gray-800 text-sm font-semibold">My Library</Text>
        <Text className="text-gray-500 text-sm">View sections</Text>
        <View className="flex-row gap-2 mt-4">
          <Pressable
            className="bg-red-200 px-3 py-1 rounded-full"
            onPress={onSaved}
          >
            <Text className="text-red-600 text-sm font-semibold">Saved</Text>
          </Pressable>
          <Pressable
            className="bg-red-200 px-4 py-1 rounded-full"
            onPress={onFavorite}
          >
            <Text className="text-red-600 text-sm font-semibold">Favorite</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
