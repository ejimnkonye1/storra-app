// app/screens/quizzes.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCourses } from '../../services/courseService';
import { useUserStore } from '../../store/userStore';

const DEFAULT_COVER_IMAGE = 'https://via.placeholder.com/300x150.png?text=No+Image';

export default function Quizzes() {
  const router = useRouter();
  const { token } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('new');

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const response = await getCourses(token);
        const subjects = response?.data?.subjects || [];

        // Flatten and extract quiz data from subjects
      const apiQuizzes = subjects
      .map((subject: any, index: number) => {
  if (!subject.quiz) return null;

  const pct = subject.quiz.bestPercentage ?? 0;
  let status = "new";

  if (pct === 100) {
    status = "completed";
  } else if (pct >= 50) {
    status = "retake";
  } else if (pct > 0) {
    status = "incomplete";
  }

  console.log("Quiz Status:", subject.name, pct, status)

          return {
            id: subject.id || Math.random().toString(),
            courseId: subject.id,   // ← REQUIRED FOR DYNAMIC ROUTING
            title: subject.quiz.quizTitle || subject.name || 'Untitled Quiz',
            subtitle: subject.name || 'General Subject',
            estimatedTime: subject.quiz.timeLimit || '10 mins',
            totalQuestions: subject.quiz.questions?.length || 0,
            totalPoints: (subject.quiz.questions?.length || 0) * 10,
            coverImage: subject.topics?.[0]?.coverImage || DEFAULT_COVER_IMAGE,
            status,
            fullQuiz: subject.quiz, // quizId lives inside here
          };
        })
        .filter(Boolean);


        setQuizzes(apiQuizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [token]);

  const filterCounts = {
    new: quizzes.filter((q) => q.status === 'new').length,
    incomplete: quizzes.filter((q) => q.status === 'incomplete').length,
    retake: quizzes.filter((q) => q.status === 'retake').length,
    completed: quizzes.filter((q) => q.status === 'completed').length,
  };

  const filteredQuizzes = quizzes.filter((quiz) => quiz.status === activeFilter);

  const getFilterIcon = (filter: string) => {
    switch (filter) {
      case 'new':
        return 'flash';
      case 'incomplete':
        return 'alert-circle';
      case 'retake':
        return 'refresh';
      case 'completed':
        return 'checkmark-circle';
      default:
        return 'help';
    }
  };

  const filters = [
    { key: 'new', label: 'New' },
    { key: 'incomplete', label: 'Incomplete' },
    { key: 'retake', label: 'Retake' },
    { key: 'completed', label: 'Completed' },
  ];

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 12, color: '#6b7280', fontSize: 14 }}>Loading quizzes...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <SafeAreaView>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
          <Pressable onPress={() => router.back()} style={{ backgroundColor: '#f3f4f6', padding: 8, borderRadius: 10 }}>
            <Ionicons name="arrow-back" size={20} color="#111827" />
          </Pressable>
          <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>Quizzes</Text>
          <View style={{ width: 36 }} />
        </View>
      </SafeAreaView>

      {/* Filter Tabs */}
      <View className="px-4 mb-6">
        <View className="bg-gray-100 p-2 rounded-lg">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3">
              {filters.map((filter) => (
                <Pressable
                  key={filter.key}
                  onPress={() => setActiveFilter(filter.key)}
                  className={`flex-row items-center px-4 py-2 rounded-lg ${
                    activeFilter === filter.key ? 'bg-white' : 'transparent'
                  }`}
                >
                  <Ionicons
                    name={getFilterIcon(filter.key) as any}
                    size={16}
                    color={
                      activeFilter === filter.key ? '#2563EB' : '#6B7280'
                    }
                  />
                  <Text
                    className={`ml-2 font-medium ${
                      activeFilter === filter.key
                        ? 'text-blue-600'
                        : 'text-gray-700'
                    }`}
                  >
                    {filter.label}
                  </Text>
                  <View
                    className={`ml-2 px-2 py-0.5 rounded-full ${
                      activeFilter === filter.key
                        ? 'bg-blue-600'
                        : 'bg-gray-300'
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        activeFilter === filter.key
                          ? 'text-white'
                          : 'text-gray-700'
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
      </View>

      {/* Description */}
      <View className="px-4 mb-6">
        <Text className="text-xl font-bold text-gray-900 mb-2">
          {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Quizzes
        </Text>
        <Text className="text-gray-600">
          Quizzes based on your completed lessons.
        </Text>
      </View>

      {/* Quiz Cards */}
      <View className="px-4 pb-8">
        <View className="flex-row flex-wrap items-center justify-between">
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => (
              <Pressable
                key={quiz.id}
                onPress={() =>
                  router.push(`/screens/quiz/${quiz.courseId}/${quiz.fullQuiz.quizId}`)

                }
                className="w-[48%] mb-4"
              >
                <View className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <Image
                    source={{ uri: quiz.coverImage }}
                    className="w-full h-32"
                    resizeMode="cover"
                  />
                  <View className="absolute top-2 left-2 right-2">
                    <Text className="text-white font-bold text-sm">
                      {quiz.title}
                    </Text>
                  </View>

                  <View className="p-3">
                    <Text className="text-xs text-gray-500 mb-1">
                      {quiz.subtitle}
                    </Text>
                    <Text className="text-base font-bold text-gray-900 mb-3">
                      {quiz.title}
                    </Text>

                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <Ionicons name="trophy" size={14} color="#F59E0B" />
                        <Text className="text-xs text-gray-600 ml-1">
                          {quiz.totalPoints}pts
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Ionicons
                          name="help-circle"
                          size={14}
                          color="#6B7280"
                        />
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
            ))
          ) : (
            <View className="items-center justify-center py-16 w-full">
              <Text className="text-gray-500 text-lg">
                No quizzes available for this category.
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
