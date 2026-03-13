import { markLessonCompleted, updateLessonProgress } from '@/services/lesson';
import { useUserStore } from '@/store/userStore';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import { useCallback, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

// Split long text into chunks for TTS
const splitTextIntoChunks = (text: string, chunkSize = 500) => {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    chunks.push(text.slice(start, start + chunkSize));
    start += chunkSize;
  }
  return chunks;
};

export default function Learning() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const { topic, topicsList, currentIndex, courseId } = useLocalSearchParams();
  const { token } = useUserStore();
  const [showVideo, setShowVideo] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const triggerCoursesRefresh = useUserStore((state) => state.triggerCoursesRefresh);

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

  const videoSource = parsedTopic.content?.video || '';
  const coverImage = parsedTopic.coverImage || 'https://via.placeholder.com/300x150.png?text=No+Image';

  // Auto-read text on focus
 const hasSpoken = useRef(false);

useFocusEffect(
  useCallback(() => {
    if (!parsedTopic?.content?.text || hasSpoken.current) return;

    let isCancelled = false;
    const text = parsedTopic.content.text.replace(/\n+/g, ". ").replace(/\s\s+/g, " ");
    const chunks = splitTextIntoChunks(text);
    let index = 0;

    const speakNext = () => {
      if (isCancelled || index >= chunks.length) return;

      Speech.speak(chunks[index], {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.85,
        voice: 'en-us-x-sfg#female_1-local',
        onDone: () => {
          index++;
          if (index < chunks.length) speakNext();
          else {
            Speech.speak("Now it's time to watch the video", {
              language: 'en-US',
              pitch: 1.0,
              rate: 0.9,
              onDone: () => {
                if (!isCancelled) {
                  setShowVideo(true);
                  setPlayVideo(true);
                  setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 300);
                }
              },
            });
          }
        },
        onError: () => {
          index++;
          speakNext();
        },
      });
    };

    const timeout = setTimeout(() => speakNext(), 400);
    hasSpoken.current = true; // Mark that TTS has started

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
      Speech.stop();
    };
  }, [parsedTopic])
);

  const handleNextLesson = async () => {
    Speech.stop();

    if (!parsedTopic || !courseId) return;

    try {
      await updateLessonProgress(token, courseId as string, parsedTopic.id, { progress: 100 });
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
          courseId: courseId as string,
        },
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

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" ref={scrollRef}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-12 pb-4 mt-8 border-b border-gray-200">
          <View className="flex-row items-center flex-1">
            <Pressable onPress={() => { Speech.stop(); router.back(); }} className="mr-4">
              <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
            <Text className="text-lg font-semibold flex-1">{parsedTopic.title || 'Lesson'}</Text>
          </View>
        </View>

        {/* Cover Image */}
        <View className="px-4 mb-4">
          <Image source={{ uri: coverImage }} className="w-full h-48 rounded-xl" resizeMode="cover" />
        </View>

        {/* Lesson Text */}
        {parsedTopic.content?.text && (
          <View className="px-4 pb-8">
            <Text className="text-gray-700">{parsedTopic.content.text}</Text>
          </View>
        )}

        {/* Video below the text */}
        {showVideo && videoSource && (
          <View className="px-4 pb-8">
            <YoutubePlayer
              height={230}
              width="100%"
              videoId={getYoutubeId(videoSource)}
              play={playVideo}
            />
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View className="px-4 py-4 bg-white border-t border-gray-200 flex-row justify-between items-center">
        <Pressable onPress={() => { Speech.stop(); router.back(); }} className="px-6 py-3 rounded-lg border border-gray-300">
          <Text className="text-gray-700 font-semibold">Cancel</Text>
        </Pressable>

        <Pressable className="px-6 py-3 rounded-lg bg-blue-600 flex-row items-center" onPress={handleNextLesson}>
          <Text className="text-white font-semibold mr-2">Next Lesson</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
