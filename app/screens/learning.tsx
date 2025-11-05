import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { dummyLesson } from '../../data/subjectLessons'

export default function Learning() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(0)
  const mediaTabs = ['Text', 'Audio', 'Video']

  const lessonSections = [
    { key: 'introduction', data: dummyLesson.content.introduction },
    { key: 'properties', data: dummyLesson.content.properties },
    { key: 'types', data: dummyLesson.content.types },
    { key: 'howToIdentify', data: dummyLesson.content.howToIdentify },
    { key: 'howToDraw', data: dummyLesson.content.howToDraw },
  ]

  const renderTextContent = () => (
    <View className="px-4 pb-8">
      {lessonSections.map((section, index) => (
        <View key={index} className="mb-6">
          <Text className="text-lg font-bold text-blue-700 mb-3">
            {section.data.title}
          </Text>
          {section.data.points.map((point, pointIndex) => (
            <View key={pointIndex} className="flex-row mb-2">
              <Text className="text-blue-600 mr-2">•</Text>
              <Text className="text-gray-700 flex-1">{point}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  )

  const renderAudioContent = () => (
    <View className="px-4 pb-8">
      {lessonSections.map((section, index) => (
        <Pressable
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-4 mb-3 flex-row items-center"
        >
          <View className="bg-blue-600 w-12 h-12 rounded-full items-center justify-center mr-4">
            <Ionicons name="play" size={24} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-900 font-semibold mb-1">
              {section.data.title}
            </Text>
            <Text className="text-gray-500 text-sm">
              {section.data.duration}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  )

  const renderVideoContent = () => (
    <View className="px-4 pb-8">
      {lessonSections.map((section, index) => (
        <Pressable
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-4 mb-3 flex-row items-center"
        >
          <View className="bg-blue-600 w-12 h-12 rounded-full items-center justify-center mr-4">
            <Ionicons name="play" size={24} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-900 font-semibold mb-1">
              {section.data.title}
            </Text>
            <Text className="text-gray-500 text-sm">
              {section.data.duration}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  )

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
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
          <View className="bg-gray-100 p-2 rounded-lg flex-row">
            {mediaTabs.map((tab, index) => {
              const isActive = activeTab === index
              const icons = ['document-text', 'mic', 'play']
              return (
                <Pressable
                  key={index}
                  onPress={() => setActiveTab(index)}
                  className={`flex-1 flex-row items-center justify-center px-4 py-2 rounded-lg ${
                    isActive ? 'bg-white' : 'transparent'
                  }`}
                >
                  <Ionicons
                    name={icons[index] as any}
                    size={18}
                    color={isActive ? '#2563EB' : '#6B7280'}
                  />
                  <Text
                    className={`ml-2 font-medium ${
                      isActive ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {tab}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        </View>

        {/* Lesson Cover Image - Different for Video */}
        <View className="px-4 mb-4">
          <View className="rounded-lg overflow-hidden bg-purple-100 relative">
            <Image
              source={activeTab === 2 ? dummyLesson.videoCoverImage : dummyLesson.coverImage}
              className={`w-full ${activeTab === 2 ? 'h-50' : 'h-48'}`}
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

        {/* Dynamic Content Based on Active Tab */}
        {activeTab === 0 && renderTextContent()}
        {activeTab === 1 && renderAudioContent()}
        {activeTab === 2 && renderVideoContent()}
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View className="px-4 py-4 bg-white border-t border-gray-200 flex-row justify-between items-center">
        <Pressable
          onPress={() => router.back()}
          className="px-6 py-3 rounded-lg border border-gray-300"
        >
          <Text className="text-gray-700 font-semibold">Cancel</Text>
        </Pressable>

        <Pressable
          className="px-6 py-3 rounded-lg bg-blue-600 flex-row items-center"
          onPress={() => console.log('Next lesson')}
        >
          <Text className="text-white font-semibold mr-2">Next Lesson</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  )
}