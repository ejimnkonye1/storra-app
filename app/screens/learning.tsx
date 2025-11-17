import { markLessonCompleted, updateLessonProgress } from '@/services/lesson';
import { useUserStore } from '@/store/userStore';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

export default function Learning() {
  const router = useRouter();
  const { topic, topicsList, currentIndex, courseId } = useLocalSearchParams();
  const { token } = useUserStore();
  const [activeTab, setActiveTab] = useState(0);
  const mediaTabs = ['Text', 'Audio', 'Video'];
  const [timeSpent, setTimeSpent] = useState(0);

  // Increment time every second
  useEffect(() => {
    const timer = setInterval(() => setTimeSpent(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Parse topic and topicsList safely
  const parsedTopic = topic ? JSON.parse(topic as string) : null;
  const parsedTopicsList = topicsList ? JSON.parse(topicsList as string) : [];
  const topicIndex = currentIndex ? parseInt(currentIndex as string, 10) : 0;

  if (!parsedTopic) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-600 text-lg">Lesson data not found</Text>
      </View>
    );
  }

  const audioSource = parsedTopic.content?.audio || '';
  const videoSource = parsedTopic.content?.video || '';
  const coverImage = parsedTopic.coverImage || 'https://via.placeholder.com/300x150.png?text=No+Image';

  const renderTextContent = () => (
    <View className="px-4 pb-8">
      {parsedTopic.content?.text ? (
        <Text className="text-gray-700">{parsedTopic.content.text}</Text>
      ) : (
        <Text className="text-gray-500">No text content available for this lesson.</Text>
      )}
    </View>
  );

  const renderAudioContent = () => (
    <View className="px-4 pb-8">
      {audioSource ? (
        <Pressable className="bg-white border border-gray-200 rounded-lg p-4 flex-row items-center mb-3">
          <View className="bg-blue-600 w-12 h-12 rounded-full items-center justify-center mr-4">
            <Ionicons name="play" size={24} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-900 font-semibold mb-1">Audio Lesson</Text>
            <Text className="text-gray-500 text-sm">{audioSource}</Text>
          </View>
        </Pressable>
      ) : (
        <Text className="text-gray-500">No audio content available for this lesson.</Text>
      )}
    </View>
  );

  const renderVideoContent = () => (
    <View className="px-4 pb-8">
      {videoSource ? (
        <Pressable className="bg-white border border-gray-200 rounded-lg p-4 flex-row items-center mb-3">
          <View className="bg-blue-600 w-12 h-12 rounded-full items-center justify-center mr-4">
            <Ionicons name="play" size={24} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-900 font-semibold mb-1">Video Lesson</Text>
            <Text className="text-gray-500 text-sm">{videoSource}</Text>
          </View>
        </Pressable>
      ) : (
        <Text className="text-gray-500">No video content available for this lesson.</Text>
      )}
    </View>
  );

  // Navigate to next lesson
  const handleNextLesson = async () => {
    if (!parsedTopic || !courseId) return;

    try {
      // Update lesson progress
      await updateLessonProgress(token, courseId as string, parsedTopic.id, {
        progress: 100
      });
    } catch (err) {
      console.warn('Failed to update lesson progress', err);
    }

    const nextIndex = topicIndex + 1;
    if (nextIndex < parsedTopicsList.length) {
      router.replace({
        pathname: '/screens/learning',
        params: {
          topic: JSON.stringify(parsedTopicsList[nextIndex]),
          topicsList: JSON.stringify(parsedTopicsList),
          currentIndex: nextIndex.toString(),
          courseId: courseId as string
        }
      });
    } else {
      alert('You have completed all lessons in this course!');
      try {
        await markLessonCompleted(token, courseId as string, parsedTopic.id);
      } catch (err) {
        console.warn('Failed to mark lesson completed', err);
      }
    }
  };

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
              {parsedTopic.title || 'Lesson'}
            </Text>
          </View>
          <Pressable>
            <Ionicons name="ellipsis-vertical" size={24} color="#000" />
          </Pressable>
        </View>

        {/* Media Tabs */}
        <View className="px-4 py-4">
          <View className="bg-gray-100 p-2 rounded-lg flex-row">
            {mediaTabs.map((tab, index) => {
              const isActive = activeTab === index;
              const icons = ['document-text', 'mic', 'play'];
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
                  <Text className={`ml-2 font-medium ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>
                    {tab}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Cover Image */}
        <View className="px-4 mb-4">
          <Image
            source={{ uri: activeTab === 2 && videoSource ? videoSource : coverImage }}
            className={`w-full ${activeTab === 2 ? 'h-50' : 'h-48'}`}
            resizeMode="cover"
          />
        </View>

        {/* Content */}
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
          onPress={handleNextLesson}
        >
          <Text className="text-white font-semibold mr-2">Next Lesson</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
