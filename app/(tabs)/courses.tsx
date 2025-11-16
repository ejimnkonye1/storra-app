import { subjects } from '@/data/subjectData'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getCourses } from '../../services/courseService'
import { useUserStore } from '../../store/userStore'
import CourseCard from '../components/courses/CourseCard'
import CourseTabs from '../components/courses/CourseTabs'
import Header from '../components/home/Header'

const DEFAULT_COVER_IMAGE = 'https://via.placeholder.com/300x150.png?text=No+Image'

export default function CoursesScreen() {
    const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing')
    const [courses, setCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { token } = useUserStore()

    // Fetch courses from API
    useEffect(() => {
        const fetchCourses = async () => {
            if (!token) return
            try {
                setLoading(true)
                const response = await getCourses(token)
                const subjects = response.data?.subjects || []

              console.log("First subject from API:", response.data?.subjects?.[0])
      const apiCourses = subjects.map((subject, index) => {
    const firstTopic = subject.topics?.[0] || {}
    const totalLessons = subject.totalLessons || (subject.topics?.length || 1)

    // Mark only the first course as completed
    const completedLessons = index === 0 ? totalLessons : subject.completedLessons ?? 0

    return {
        id: subject.id || Math.random().toString(), // fallback id
        title: subject.name || 'Untitled Course',
        subtitle: `Completed ${completedLessons}/${totalLessons}`,
        coverImage: firstTopic.coverImage || DEFAULT_COVER_IMAGE,
        progress: totalLessons ? Math.floor((completedLessons / totalLessons) * 100) : 0,
        isCompleted: completedLessons === totalLessons,
        fullDetails: subject
    }
})
                setCourses(apiCourses)
            } catch (error) {
                console.error('Failed to fetch courses:', error)
                setCourses([]) // fallback to empty
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, [token])
console.log("courses",subjects)
    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-white">
                <Text>Loading courses...</Text>
            </SafeAreaView>
        )
    }

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



    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <Header />
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
        </SafeAreaView>
    )
}
