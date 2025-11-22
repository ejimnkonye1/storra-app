import { useFocusEffect } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BASE_URL } from '../../backendconfig'
import { getCourses } from '../../services/courseService'
import { useUserStore } from '../../store/userStore'
import CourseCard from '../components/courses/CourseCard'
import CourseTabs from '../components/courses/CourseTabs'
import Header from '../components/home/Header'
import Loader from '../components/loader'

const DEFAULT_COVER_IMAGE = 'https://via.placeholder.com/300x150.png?text=No+Image'

export default function CoursesScreen() {
    const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing')
    const [courses, setCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { user, token } = useUserStore()

    // Fetch courses from API

// Replace your useEffect with this:
useFocusEffect(
  useCallback(() => {
    const fetchCoursesWithProgress = async () => {
      if (!token) return;
      setLoading(true);
      try {



        const response = await getCourses(token);
        const subjects = response.data?.subjects || [];

        const coursesWithProgress = await Promise.all(
          subjects.map(async (subject) => {
            const courseId = subject.id;
            let progressData = null;

            try {
              const progressRes = await fetch(`${BASE_URL}/progress/course/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              const json = await progressRes.json();
              progressData = json.data;

            } catch (err) {
              console.warn(`Failed to fetch progress for ${courseId}`, err);
            }

            const totalLessons = subject.totalLessons || (subject.topics?.length || 1);
            const completedLessons = progressData?.completedLessons ?? 0;
            const progressPercent = totalLessons ? Math.floor((completedLessons / totalLessons) * 100) : 0;

            return {
              id: subject.id || Math.random().toString(),
              title: subject.name || 'Untitled Course',
              subtitle: `Completed ${completedLessons}/${totalLessons}`,
              coverImage: subject.topics?.[0]?.coverImage || DEFAULT_COVER_IMAGE,
              progress: progressPercent,
              isCompleted: completedLessons === totalLessons,
              fullDetails: subject,
              progressData,
            };
          })
        );

        setCourses(coursesWithProgress);
      } catch (err) {
        console.error('Failed to fetch courses with progress:', err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesWithProgress();
  }, [token])
);

// console.log("courses",subjects)
    // if (loading) {
    //     return (
    //         <SafeAreaView className="flex-1 justify-center items-center bg-white">
    //             <Text>Loading courses...</Text>
    //         </SafeAreaView>
    //     )
    // }

    const ongoingCourses = courses.filter(course => !course.isCompleted)
    const completedCourses = courses.filter(course => course.isCompleted)
    const displayedCourses = activeTab === 'ongoing' ? ongoingCourses : completedCourses

const handleStartQuiz = (course: any) => {
    const quiz = course.fullDetails?.quiz;

    if (!quiz) {
        console.warn("No quiz found for this course");
        return;
    }

    const courseId = course.fullDetails.id;
    const quizId = quiz.quizId;

    router.push(`/screens/quiz/${courseId}/${quizId}`);
};


const { rewards, } = user;
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <Header
              coins={rewards?.totalCoins || 0} 
               diamond={rewards?.totalDiamonds || 0} 
            />
            <ScrollView className="flex-1 px-6 pt-6">
                <Text className="text-gray-900 text-3xl font-bold mb-6">Courses</Text>

                <CourseTabs 
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    ongoingCount={ongoingCourses.length}
                    completedCount={completedCourses.length}
                />

                {displayedCourses.length > 0 ? (
                    displayedCourses.map(course => (
                        <CourseCard
                            key={course.id}
                            title={course.title}
                            subtitle={course.subtitle}
                            coverImage={course.coverImage}
                            progress={course.progress}
                            isCompleted={course.isCompleted}
                            topicData={course.fullDetails}
                            onStartQuiz={() => handleStartQuiz(course)}
                           
                        />
                    ))
                ) : (
                    <View className="items-center justify-center py-16">
                        <Text className="text-gray-500 text-lg">
                            No {activeTab} courses available
                        </Text>
                    </View>
                )}
            </ScrollView>
             {loading && (
   <View className="absolute inset-0 bg-black/30 items-center justify-center z-50">
  <Loader />
</View>

      )}

        </SafeAreaView>
    )
}
