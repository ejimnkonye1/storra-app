import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

export default function TopicDetail() {
  const router = useRouter();
  const { topic } = useLocalSearchParams();

  // Parse the topic object
  const parsedTopic = topic ? JSON.parse(topic as string) : null;
  const [activeTab, setActiveTab] = useState('About');

  if (!parsedTopic) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Topic not found</Text>
      </View>
    );
  }
console.log("ttt",parsedTopic)
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-12 pb-4">
        <Pressable onPress={() => router.back()} className="mb-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          {parsedTopic.name}
        </Text>
      </View>

      {/* Cover Image */}
      <View className="px-4 mb-4">
        <Image
           source={{ uri: parsedTopic.image }}
          className="w-full h-48 rounded-xl"
          resizeMode="cover"
        />
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
          <Text className="text-gray-700 leading-6">{parsedTopic.paragraph}</Text>
        )}

        {activeTab === 'FAQ' && (
          <View>
            {parsedTopic.faqs?.map((faq, index) => (
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
            {parsedTopic.reviews?.map((review, index) => (
              <View key={index} className="mb-4 pb-4 border-b border-gray-200">
                <View className="flex-row items-center mb-2">
                  <Text className="font-semibold text-gray-900 mr-2">{review.user}</Text>
                  <View className="flex-row">
                    {[...Array(review.rating)].map((_, i) => (
                      <Ionicons key={i} name="star" size={14} color="#FFA500" />
                    ))}
                  </View>
                </View>
                <Text className="text-gray-600">{review.comment || ''}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Lessons */}
      <View className="px-4 mb-8">
        <Text className="text-xl font-bold text-gray-900 mb-4">Lessons</Text>
        {parsedTopic.topics?.map(lesson => (
          <Pressable
            key={lesson.id}
            className="bg-gray-50 p-4 rounded-lg mb-3 flex-row justify-between items-center"
               onPress={() => 
        router.push({
          pathname: '/screens/learning',
          params: {
            topic: JSON.stringify(lesson),          // current lesson
    courseId: parsedTopic.id,               // course ID
    topicsList: JSON.stringify(parsedTopic.topics),
    currentIndex: parsedTopic.topics.findIndex(t => t.id === lesson.id).toString(),

          },
        })
      }

          >
            <View>
              <Text className="text-gray-900 font-semibold mb-1">{lesson.title}</Text>
              <Text className="text-gray-500 text-sm">{lesson.id}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
