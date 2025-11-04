import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { dummyLesson } from '../../data/subjectLessons'

export default function Learning() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Text')

  const renderTabButton = (tabName: string, icon: string) => (
    <Pressable
      className={`flex-row items-center px-4 py-2 rounded-full mr-3 ${
        activeTab === tabName ? 'bg-blue-600' : 'bg-gray-100'
      }`}
      onPress={() => setActiveTab(tabName)}
    >
      <Ionicons
        name={icon as any}
        size={18}
        color={activeTab === tabName ? '#FFFFFF' : '#6B7280'}
      />
      <Text
        className={`ml-2 font-medium ${
          activeTab === tabName ? 'text-white' : 'text-gray-700'
        }`}
      >
        {tabName}
      </Text>
    </Pressable>
  )

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-12 pb-4 mt-8 border-b border-gray-200">
        <View className="flex-row items-center flex-1">
          <Pressable onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Text className="text-lg font-semibold flex-1">
            Shapes and Spatial Understanding
          </Text>
        </View>
        <Pressable>
          <Ionicons name="ellipsis-vertical" size={24} color="#000" />
        </Pressable>
      </View>

      {/* Media Type Tabs */}
      <View className="px-4 py-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {renderTabButton('Text', 'document-text')}
          {renderTabButton('Audio', 'mic')}
          {renderTabButton('Video', 'play')}
        </ScrollView>
      </View>

      {/* Lesson Cover Image */}
      <View className="px-4 mb-4">
        <View className="rounded-lg overflow-hidden bg-purple-100">
          <Image
            source={dummyLesson.coverImage}
            className="w-full h-48"
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Lesson Title and Stats */}
      <View className="px-4 mb-4">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1 mr-4">
            <Text className="text-xl font-bold text-gray-900 mb-2">
              {dummyLesson.title}
            </Text>
          </View>
          <Pressable className="bg-blue-50 p-3 rounded-lg">
            <Ionicons name="download-outline" size={24} color="#3B82F6" />
          </Pressable>
        </View>

        <View className="flex-row items-center flex-wrap">
          <View className="flex-row items-center mr-4 mb-2">
            <Ionicons name="eye-outline" size={16} color="#F59E0B" />
            <Text className="text-gray-600 text-sm ml-1">
              {dummyLesson.views}
            </Text>
          </View>
          <View className="flex-row items-center mr-4 mb-2">
            <Ionicons name="download-outline" size={16} color="#3B82F6" />
            <Text className="text-gray-600 text-sm ml-1">
              {dummyLesson.downloads}
            </Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text className="text-gray-600 text-sm ml-1">
              Last updated {dummyLesson.lastUpdated}
            </Text>
          </View>
        </View>
      </View>

      {/* Lesson Content */}
      <View className="px-4 pb-8">
        {/* Introduction Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-blue-700 mb-3">
            {dummyLesson.content.introduction.title}
          </Text>
          {dummyLesson.content.introduction.points.map((point, index) => (
            <View key={index} className="flex-row mb-2">
              <Text className="text-blue-600 mr-2">•</Text>
              <Text className="text-gray-700 flex-1">{point}</Text>
            </View>
          ))}
        </View>

        {/* Properties Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-blue-700 mb-3">
            {dummyLesson.content.properties.title}
          </Text>
          {dummyLesson.content.properties.points.map((point, index) => (
            <View key={index} className="flex-row mb-2">
              <Text className="text-blue-600 mr-2">•</Text>
              <Text className="text-gray-700 flex-1">{point}</Text>
            </View>
          ))}
        </View>

        {/* Types Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-blue-700 mb-3">
            {dummyLesson.content.types.title}
          </Text>
          {dummyLesson.content.types.points.map((point, index) => (
            <View key={index} className="flex-row mb-2">
              <Text className="text-blue-600 mr-2">•</Text>
              <Text className="text-gray-700 flex-1">{point}</Text>
            </View>
          ))}
        </View>

        {/* How to Identify Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-blue-700 mb-3">
            {dummyLesson.content.howToIdentify.title}
          </Text>
          {dummyLesson.content.howToIdentify.points.map((point, index) => (
            <View key={index} className="flex-row mb-2">
              <Text className="text-blue-600 mr-2">•</Text>
              <Text className="text-gray-700 flex-1">{point}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}