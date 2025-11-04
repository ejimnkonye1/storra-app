import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { subjectCards } from '../../data/subjectData'

export default function TopicDetail() {
  const router = useRouter()
  const { topic } = useLocalSearchParams()
  const parsedTopic = topic ? JSON.parse(topic as string) : null
  const [activeTab, setActiveTab] = useState('About')

  // Find the subject that contains this topic
  const subjectData = subjectCards.find(subject =>
    subject.topics.some(t => t.id === parsedTopic?.id)
  )

  if (!subjectData) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Subject not found</Text>
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-12 pb-4">
        <Pressable onPress={() => router.back()} className="mb-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          {parsedTopic?.title}
        </Text>
      </View>

      {/* Cover Image */}
      <View className="px-4 mb-4">
        <Image
          source={parsedTopic?.coverImage}
          className="w-full h-48 rounded-xl"
          resizeMode="cover"
        />
      </View>

      {/* Stats */}
      <View className="px-4 mb-6 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons name="star" size={20} color="#FFA500" />
          <Text className="ml-1 text-gray-700 font-semibold">
            {subjectData.rating}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="people" size={20} color="#6B7280" />
          <Text className="ml-1 text-gray-700">
            {subjectData.numberOfStudents}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="calendar" size={20} color="#6B7280" />
          <Text className="ml-1 text-gray-600 text-sm">
            Last updated {subjectData.lastUpdated}
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="px-4 mb-4 flex-row border-b border-gray-200">
        {['About', 'FAQ', 'Reviews'].map(tab => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`mr-6 pb-3 ${
              activeTab === tab ? 'border-b-2 border-blue-600' : ''
            }`}
          >
            <Text
              className={`${
                activeTab === tab
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Tab Content */}
      <View className="px-4 mb-6">
        {activeTab === 'About' && (
          <Text className="text-gray-700 leading-6">{subjectData.about}</Text>
        )}

        {activeTab === 'FAQ' && (
          <View>
            {subjectData.faqs?.map((faq, index) => (
              <View key={index} className="mb-4">
                <Text className="font-semibold text-gray-900 mb-2">
                  {faq.question}
                </Text>
                <Text className="text-gray-600">{faq.answer}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'Reviews' && (
          <View>
            {subjectData.reviews?.map((review, index) => (
              <View
                key={index}
                className="mb-4 pb-4 border-b border-gray-200"
              >
                <View className="flex-row items-center mb-2">
                  <Text className="font-semibold text-gray-900 mr-2">
                    {review.user}
                  </Text>
                  <View className="flex-row">
                    {[...Array(review.rating)].map((_, i) => (
                      <Ionicons
                        key={i}
                        name="star"
                        size={14}
                        color="#FFA500"
                      />
                    ))}
                  </View>
                </View>
                <Text className="text-gray-600">{review.comment}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Lessons */}
      <View className="px-4 mb-8">
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Subject content
        </Text>

        {subjectData.lessons?.map(lesson => (
          <Pressable
            key={lesson.id}
            className="bg-gray-50 p-4 rounded-lg mb-3 flex-row justify-between items-center"
            onPress={() => router.push('/screens/learning')}
          >
            <View>
              <Text className="text-gray-900 font-semibold mb-1">
                {lesson.title}
              </Text>
              <Text className="text-gray-500 text-sm">
                {lesson.lessonNumber}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  )
}
