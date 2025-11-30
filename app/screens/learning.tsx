import { markLessonCompleted, updateLessonProgress } from '@/services/lesson';
import { useUserStore } from '@/store/userStore';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
export default function Learning() {
  const router = useRouter();
  const { topic, topicsList, currentIndex, courseId } = useLocalSearchParams();
  const { token } = useUserStore();
  const [activeTab, setActiveTab] = useState(0);
  const mediaTabs = ['Text', 'Audio', 'Video'];
  const [timeSpent, setTimeSpent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
const triggerCoursesRefresh = useUserStore((state) => state.triggerCoursesRefresh);

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

const renderAudioContent = () => {

  const videoId = getYoutubeId(audioSource);
  return (
    <View className="px-4 pb-8">
      {audioSource ? (
        <Pressable
          onPress={() => setIsPlaying(prev => !prev)}
          className="bg-white border border-gray-200 rounded-lg p-4 flex-row items-center mb-3"
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="blue" />
          <Text className="ml-4 text-gray-900 font-semibold">
            {isPlaying ? 'Pause Audio' : 'Tap to Play Audio'}
          </Text>
        </Pressable>
      ) : (
        <Text className="text-gray-500">No audio content available for this lesson.</Text>
      )}

      {/* Hidden YoutubePlayer for audio */}
      {audioSource && (
        <View style={{ height: 0, width: 0, overflow: 'hidden' }}>
          <YoutubePlayer
            height={0}
            width={0}
            videoId={videoId}
            play={isPlaying}
            onChangeState={state => {
              if (state === 'ended') setIsPlaying(false);
            }}
          />
        </View>
      )}
    </View>
  );
};


// Utility function stays the same
const getYoutubeId = (url: string) => {
  const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : '';
};






// Inside Learning component
const renderVideoContent = () => (
  <View className="px-4 pb-8">
    {videoSource ? (
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/screens/video',
            params: { videoUrl: videoSource, title: parsedTopic.title }
          })
        }
        className="bg-white border border-gray-200 rounded-lg mb-3 overflow-hidden"
      >
        {/* Cover Image */}
        <Image
          source={{ uri: coverImage }}
          className="w-full h-40"
          resizeMode="cover"
        />

        {/* Overlay content */}
        <View className="flex-row items-center p-4">
          <View className="bg-blue-600 w-12 h-12 rounded-full items-center justify-center mr-4">
            <Ionicons name="play" size={24} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-900 font-semibold mb-1">Tap to Watch Video</Text>
            <Text className="text-gray-500 text-sm">{videoSource}</Text>
          </View>
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
         triggerCoursesRefresh();
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
           triggerCoursesRefresh();
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