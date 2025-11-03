import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import Header from '../components/home/Header'
import CourseTabs from '../components/courses/CourseTabs'
import CourseCard from '../components/courses/CourseCard'
import { subjectCards } from '@/data/subjectData'

export default function CoursesScreen() {
    const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing')
    const router = useRouter()

    // Transform subject data into course format
    const allCourses = subjectCards.map(subject => {
        const randomTopicIndex = Math.floor(Math.random() * subject.topics.length)
        return {
            id: subject.id,
            subject: subject.subject,
            title: subject.subject,
            subtitle: `Congratulations! You've completed the lessons for this topic`,
            coverImage: subject.topics[randomTopicIndex].coverImage, // Random topic image
            progress: Math.floor(Math.random() * 100), // Random progress for demo
            isCompleted: Math.random() > 0.5 // Random completion for demo
        }
    })

    const ongoingCourses = allCourses.filter(course => !course.isCompleted)
    const completedCourses = allCourses.filter(course => course.isCompleted)

    const displayedCourses = activeTab === 'ongoing' ? ongoingCourses : completedCourses

    const handleStartQuiz = (courseId: number) => {
        console.log('Start quiz for course:', courseId)
        // router.push(`/quiz/${courseId}`)
    }

    const handleContinue = (courseId: number) => {
        console.log('Continue course:', courseId)
        // router.push(`/course/${courseId}`)
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <Header />
            
            <ScrollView className="flex-1 px-6 pt-6">
                {/* Page Title */}
                <Text className="text-gray-900 text-3xl font-bold mb-6">
                    Courses
                </Text>

                {/* Course Tabs */}
                <CourseTabs 
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    ongoingCount={ongoingCourses.length}
                    completedCount={completedCourses.length}
                />

                {/* Course List */}
                {displayedCourses.length > 0 ? (
                    displayedCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            title={course.title}
                            subtitle={course.subtitle}
                            coverImage={course.coverImage}
                            progress={course.progress}
                            isCompleted={course.isCompleted}
                            onStartQuiz={() => handleStartQuiz(course.id)}
                            onContinue={() => handleContinue(course.id)}
                        />
                    ))
                ) : (
                    <View className="items-center justify-center py-16">
                        <Text className="text-gray-500 text-lg">
                            No {activeTab} courses yet
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}