import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

export default function CoursesScreen() {
  const courses = [
    {
      id: 1,
      title: 'Introduction to Mathematics',
      lessons: 12,
      progress: 70,
      image: require('@/assets/images/whole-numbers.png'),
    },
    {
      id: 2,
      title: 'Basic Science for Beginners',
      lessons: 9,
      progress: 30,
      image: require('@/assets/images/whole-numbers.png'),
    },
    {
      id: 3,
      title: 'English Grammar Basics',
      lessons: 14,
      progress: 50,
      image: require('@/assets/images/whole-numbers.png'),
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6 pt-6">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-gray-900">My Courses</Text>
          <Ionicons name="search-outline" size={24} color="#374151" />
        </View>

        {/* Course Cards */}
        {courses.map((course) => (
          <TouchableOpacity
            key={course.id}
            activeOpacity={0.8}
            className="mb-5 bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            <Image
              source={course.image}
              className="w-full h-40 rounded-t-2xl"
              resizeMode="cover"
            />

            <View className="p-4">
              <Text className="text-lg font-semibold text-gray-800">
                {course.title}
              </Text>
              <Text className="text-gray-500 text-sm mb-2">
                {course.lessons} lessons
              </Text>

              {/* Progress bar */}
              <View className="h-2 w-full bg-gray-200 rounded-full">
                <View
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </View>

              <Text className="mt-2 text-gray-500 text-sm">
                Progress: {course.progress}%
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
