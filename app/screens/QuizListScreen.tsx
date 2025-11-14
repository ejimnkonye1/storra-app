// app/screens/Quizzes.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCourses } from '../../services/courseService';
import { QuizProgress, quizService } from '../../services/quizService';
import { useUserStore } from '../../store/userStore';

const DEFAULT_COVER_IMAGE = 'https://via.placeholder.com/300x150.png?text=No+Image';

export default function Quizzes() {
  const router = useRouter();
  const { token } = useUserStore();

  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<'new' | 'incomplete' | 'retake' | 'completed'>('new');

  useEffect(() => {
    const fetchAllUserQuizzes = async () => {
      if (!token) {
        console.warn('No token available — skipping fetch.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // 1) Fetch all courses/subjects
        const coursesResp = await getCourses(token);
        const subjects = coursesResp?.data?.subjects ?? coursesResp?.data ?? [];

        // 2) Fetch user quiz progress for each course in parallel
        const progressResults = await Promise.all(
          subjects.map(async (subject: any) => {
            const courseId = subject.id ?? subject.courseId ?? subject.slug ?? null;
            if (!courseId) return { subject, progress: [] as QuizProgress[] };

            try {
              const resp = await quizService.getCourseProgress(token, courseId);
              return { subject, progress: resp };
            } catch (err) {
              console.error(`Failed to fetch progress for course ${courseId}:`, err);
              return { subject, progress: [] as QuizProgress[] };
            }
          })
        );

        // 3) Build a unified quizzes array
        const builtQuizzes = progressResults.flatMap((res) => {
          const subject = res.subject;
          const progress = res.progress;

          if (!progress || progress.length === 0) {
            // fallback: use quizzes inside the subject
            const fallbackQuiz = subject.quiz ?? subject.quizzes ?? null;
            if (!fallbackQuiz) return [];
            const arr = Array.isArray(fallbackQuiz) ? fallbackQuiz : [fallbackQuiz];

            return arr.map((q: any, i: number) => ({
              id: q.quizId ?? `${subject.id ?? 's'}-fallback-${i}`,
              title: q.quizTitle ?? subject.name ?? 'Untitled Quiz',
              subtitle: subject.name ?? '',
              estimatedTime: q.timeLimit ?? '—',
              totalQuestions: q.questions?.length ?? 0,
              totalPoints: (q.questions?.length ?? 0) * 10,
              coverImage: subject.topics?.[0]?.coverImage ?? DEFAULT_COVER_IMAGE,
              status: 'new',
              courseId: subject.id ?? subject.courseId ?? null,
              rawQuiz: q,
            }));
          }

          return progress.map((q: QuizProgress) => ({
            id: q.quizId,
            title: q.quizTitle ?? q.quizId  ?? 'o',
            subtitle: subject.name ?? '',
            estimatedTime: q.timeLimit ?? '—',
            totalQuestions: q.totalQuestions ?? 0,
            totalPoints: (q.totalQuestions ?? 0) * 10,
            coverImage: subject.topics?.[0]?.coverImage ?? DEFAULT_COVER_IMAGE,
            status: q.status as any,
            courseId: subject.id ?? subject.courseId ?? null,
            rawQuiz: q,
          }));
        });

        setQuizzes(builtQuizzes);
      } catch (err) {
        console.error('Error fetching courses/quizzes/progress:', err);
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUserQuizzes();
  }, [token]);

  const filterCounts = {
    new: quizzes.filter((q) => q.status === 'new').length,
    incomplete: quizzes.filter((q) => q.status === 'incomplete').length,
    retake: quizzes.filter((q) => q.status === 'retake').length,
    completed: quizzes.filter((q) => q.status === 'complete').length,
  };

  const filteredQuizzes = quizzes.filter((quiz) => quiz.status === activeFilter);

  const getFilterIcon = (filter: string) => {
    switch (filter) {
      case 'new': return 'flash';
      case 'incomplete': return 'alert-circle';
      case 'retake': return 'refresh';
      case 'completed': return 'checkmark-circle';
      default: return 'help';
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
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-700">Loading quizzes...</Text>
      </SafeAreaView>
    );
  }

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
        <View className="bg-gray-100 p-2 rounded-lg">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3">
              {filters.map((filter) => (
                <Pressable
                  key={filter.key}
                  onPress={() => setActiveFilter(filter.key as any)}
                  className={`flex-row items-center px-4 py-2 rounded-lg ${activeFilter === filter.key ? 'bg-white' : 'transparent'}`}
                >
                  <Ionicons
                    name={getFilterIcon(filter.key) as any}
                    size={16}
                    color={activeFilter === filter.key ? '#2563EB' : '#6B7280'}
                  />
                  <Text className={`ml-2 font-medium ${activeFilter === filter.key ? 'text-blue-600' : 'text-gray-700'}`}>
                    {filter.label}
                  </Text>
                  <View className={`ml-2 px-2 py-0.5 rounded-full ${activeFilter === filter.key ? 'bg-blue-600' : 'bg-gray-300'}`}>
                    <Text className={`text-xs font-medium ${activeFilter === filter.key ? 'text-white' : 'text-gray-700'}`}>
                      {filterCounts[filter.key as keyof typeof filterCounts]}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Quiz Cards */}
      <View className="px-4 pb-8 flex-row flex-wrap justify-between">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <Pressable
              key={quiz.id}
              onPress={() =>
                router.push({
                  pathname: '/screens/QuizScreen',
                  params: { quiz: JSON.stringify(quiz.rawQuiz ?? {}) },
                })
              }
              className="w-[48%] mb-4"
            >
              <View className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <Image source={{ uri: quiz.coverImage }} className="w-full h-32" resizeMode="cover" />
                <View className="absolute top-2 left-2 right-2">
                  <Text className="text-white font-bold text-sm">{quiz.title}</Text>
                </View>
                <View className="p-3">
                  <Text className="text-xs text-gray-500 mb-1">{quiz.subtitle}</Text>
                  <Text className="text-base font-bold text-gray-900 mb-3">{quiz.title}</Text>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <Ionicons name="trophy" size={14} color="#F59E0B" />
                      <Text className="text-xs text-gray-600 ml-1">{quiz.totalPoints}pts</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="help-circle" size={14} color="#6B7280" />
                      <Text className="text-xs text-gray-600 ml-1">{quiz.totalQuestions} questions</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="time" size={14} color="#6B7280" />
                      <Text className="text-xs text-gray-600 ml-1">{quiz.estimatedTime}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          ))
        ) : (
          <View className="items-center justify-center py-16 w-full">
            <Text className="text-gray-500 text-lg">No quizzes available for this category.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
