import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { useUserStore } from '@/store/userStore';
import { BASE_URL } from '@/backendconfig';
const API_BASE_URL = BASE_URL
export default function TopicDetail() {
  const router = useRouter();
  const { topic } = useLocalSearchParams();
  const { token } = useUserStore();

  // Parse the topic object
  const parsedTopic = topic ? JSON.parse(topic as string) : null;
  const [activeTab, setActiveTab] = useState('About');
  
  // Progress state
  const [lessonsProgress, setLessonsProgress] = useState<any>({});
  const [courseProgress, setCourseProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (parsedTopic?.id) {
      fetchCourseProgress();
    }
  }, [parsedTopic]);

  // Fetch progress from backend
  const fetchCourseProgress = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/progress/course/${parsedTopic.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setCourseProgress(data.data.courseProgress);
        
        // Create a map of lesson progress
        const progressMap: any = {};
        data.data.lessons?.forEach((lesson: any) => {
          progressMap[lesson.id] = {
            progress: lesson.progress || 0,
            status: lesson.status || 'not_started',
            isBookmarked: lesson.isBookmarked || false,
          };
        });
        setLessonsProgress(progressMap);
      }
    } catch (error) {
      console.error('Error fetching course progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!parsedTopic) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Topic not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-12 pb-4">
        <Pressable onPress={() => router.back()} className="mb-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          {parsedTopic.name}
        </Text>
        
        {/* Course Progress Summary */}
        {courseProgress && (
          <View className="bg-blue-50 p-3 rounded-xl mt-2">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm text-blue-900 font-semibold">
                Course Progress
              </Text>
              <Text className="text-sm text-blue-700 font-bold">
                {courseProgress.overallProgress || 0}%
              </Text>
            </View>
            <View className="w-full h-2 bg-blue-200 rounded-full">
              <View
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${courseProgress.overallProgress || 0}%` }}
              />
            </View>
            <Text className="text-xs text-blue-700 mt-1">
              {courseProgress.completedLessons || 0}/{courseProgress.totalLessons || 0} lessons
            </Text>
          </View>
        )}
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
        {['About', 'FAQ', 'Reviews'].map((tab) => (
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
          <Text className="text-gray-700 leading-6">
            {parsedTopic.paragraph}
          </Text>
        )}

        {activeTab === 'FAQ' && (
          <View>
            {parsedTopic.faqs?.map((faq: any, index: number) => (
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
            {parsedTopic.reviews?.map((review: any, index: number) => (
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
                <Text className="text-gray-600">{review.comment || ''}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Lessons */}
      <View className="px-4 mb-8">
        <Text className="text-xl font-bold text-gray-900 mb-4">Lessons</Text>
        
        {loading ? (
          <ActivityIndicator size="small" color="#2563EB" />
        ) : (
          parsedTopic.topics?.map((lesson: any, index: number) => {
            const lessonProgress = lessonsProgress[lesson.id] || {};
            const progress = lessonProgress.progress || 0;
            const status = lessonProgress.status || 'not_started';
            const isBookmarked = lessonProgress.isBookmarked || false;

            return (
              <Pressable
                key={lesson.id}
                className="bg-gray-50 p-4 rounded-lg mb-3"
                onPress={() =>
                  router.push({
                    pathname: '/screens/learning',
                    params: {
                      topic: JSON.stringify(lesson),
                      courseId: parsedTopic.id, // Pass courseId for progress tracking
                      topicsList: JSON.stringify(parsedTopic.topics),
                      currentIndex: index.toString(),
                    },
                  })
                }
              >
                <View className="flex-row justify-between items-start mb-2">
                  <View className="flex-1">
                    <View className="flex-row items-center">
                      <Text className="text-gray-900 font-semibold mb-1 flex-1">
                        {lesson.title}
                      </Text>
                      {isBookmarked && (
                        <Ionicons
                          name="bookmark"
                          size={16}
                          color="#2563EB"
                          style={{ marginLeft: 8 }}
                        />
                      )}
                    </View>
                    <Text className="text-gray-500 text-sm">
                      {lesson.lessonType || 'Lesson'}
                    </Text>
                  </View>

                  {/* Status Badge */}
                  <View className="ml-2">
                    {status === 'completed' ? (
                      <View className="bg-green-100 px-2 py-1 rounded-full">
                        <Text className="text-green-700 text-xs font-semibold">
                          ✓ Done
                        </Text>
                      </View>
                    ) : status === 'in_progress' ? (
                      <View className="bg-blue-100 px-2 py-1 rounded-full">
                        <Text className="text-blue-700 text-xs font-semibold">
                          {progress}%
                        </Text>
                      </View>
                    ) : (
                      <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                    )}
                  </View>
                </View>

                {/* Progress Bar for In-Progress Lessons */}
                {status === 'in_progress' && progress > 0 && (
                  <View className="mt-2">
                    <View className="w-full h-1.5 bg-gray-200 rounded-full">
                      <View
                        className="h-1.5 bg-blue-600 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </View>
                  </View>
                )}
              </Pressable>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}