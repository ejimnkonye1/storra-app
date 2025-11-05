// app/screens/quizzes.tsx
import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { quizzes } from '@/data/quizData'

export default function Quizzes() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState('new')

  const filterCounts = {
    new: quizzes.filter(q => q.status === 'new').length,
    incomplete: quizzes.filter(q => q.status === 'incomplete').length,
    retake: quizzes.filter(q => q.status === 'retake').length,
    completed: quizzes.filter(q => q.status === 'completed').length,
  }

  const filteredQuizzes = quizzes.filter(quiz => quiz.status === activeFilter)

  const getFilterIcon = (filter: string) => {
    switch (filter) {
      case 'new':
        return 'flash'
      case 'incomplete':
        return 'alert-circle'
      case 'retake':
        return 'refresh'
      case 'completed':
        return 'checkmark-circle'
      default:
        return 'help'
    }
  }

  const filters = [
    { key: 'new', label: 'New' },
    { key: 'incomplete', label: 'Incomplete' },
    { key: 'retake', label: 'Retake' },
    { key: 'completed', label: 'Completed' },
  ]

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-12 pb-4">
        <Pressable onPress={() => router.back()} className="mb-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text className="text-2xl font-bold text-gray-900">Quizzes</Text>
      </View>

      {/* Filter Tabs */}
      <View className="px-4 mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-3">
            {filters.map(filter => (
              <Pressable
                key={filter.key}
                onPress={() => setActiveFilter(filter.key)}
                className={`flex-row items-center px-4 py-2 rounded-full ${
                  activeFilter === filter.key
                    ? 'bg-blue-50 border border-blue-600'
                    : 'bg-gray-100 border border-gray-200'
                }`}
              >
                <Ionicons
                  name={getFilterIcon(filter.key) as any}
                  size={16}
                  color={activeFilter === filter.key ? '#2563EB' : '#6B7280'}
                />
                <Text
                  className={`ml-2 font-medium ${
                    activeFilter === filter.key ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {filter.label}
                </Text>
                <View
                  className={`ml-2 px-2 py-0.5 rounded-full ${
                    activeFilter === filter.key ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <Text
                    className={`text-xs ${
                      activeFilter === filter.key ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {filterCounts[filter.key as keyof typeof filterCounts]}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Description */}
      <View className="px-4 mb-6">
        <Text className="text-xl font-bold text-gray-900 mb-2">New Quizzes</Text>
        <Text className="text-gray-600">
          Quizzes you&apos;ve unlocked after completing lessons.
        </Text>
      </View>

      {/* Quiz Cards */}
      <View className="px-4 pb-8">
        <View className="flex-row flex-wrap items-center justify-between">
          {filteredQuizzes.map((quiz, index) => (
            <Pressable
              key={quiz.id}
              onPress={() =>
                router.push({
                  pathname: '/screens/QuizScreen',
                  params: { quizId: quiz.id },
                })
              }
              className="w-[48%] mb-4"
            >
              <View className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Quiz Cover Image */}
                <Image
                  source={quiz.coverImage}
                  className="w-full h-32"
                  resizeMode="cover"
                />
                <View className="absolute top-2 left-2 right-2">
                  <Text className="text-white font-bold text-sm">
                    {quiz.title}
                  </Text>
                </View>

                {/* Quiz Info */}
                <View className="p-3">
                  <Text className="text-xs text-gray-500 mb-1">
                    {quiz.subtitle}
                  </Text>
                  <Text className="text-base font-bold text-gray-900 mb-3">
                    {quiz.title}
                  </Text>

                  {/* Quiz Stats */}
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <Ionicons name="trophy" size={14} color="#F59E0B" />
                      <Text className="text-xs text-gray-600 ml-1">
                        {quiz.totalPoints}pts
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="help-circle" size={14} color="#6B7280" />
                      <Text className="text-xs text-gray-600 ml-1">
                        {quiz.totalQuestions} questions
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="time" size={14} color="#6B7280" />
                      <Text className="text-xs text-gray-600 ml-1">
                        {quiz.estimatedTime}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}