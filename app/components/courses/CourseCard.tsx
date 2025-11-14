import { useRouter } from 'expo-router'
import { Image, Pressable, Text, View } from 'react-native'

interface CourseCardProps {
    title: string
    subtitle: string
    coverImage: any
    progress?: number
    isCompleted: boolean
    topicData: any
    onStartQuiz?: () => void
  
}

export default function CourseCard({
    title,
    subtitle,
    coverImage,
    progress,
    isCompleted,
    topicData,
    onStartQuiz,
  
}: CourseCardProps) {
 const router = useRouter()
        const handleContinue = () => {
        router.push({
            pathname: '/screens/coursedetails',
            params: { topic: JSON.stringify(topicData) }, // Pass topic as string
        })
    }

    return (
        <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-200 shadow-sm">
            <View className="flex-row items-center">
                {/* Course Image */}
                <Image
                    source={{uri:coverImage}}
                    className="w-24 h-24 rounded-xl mr-4"
                    resizeMode="cover"
                />

                {/* Course Info */}
                <View className="flex-1">
                    <Text className="text-gray-900 text-lg font-semibold mb-1">
                        {title}
                    </Text>
                    <Text className="text-blue-600 text-sm mb-3">
                        {subtitle} 
                    </Text>

                    {/* Action Button */}
                    {isCompleted ? (
                        <Pressable 
                            onPress={onStartQuiz}
                            className="bg-blue-600 py-2 px-6 rounded-full self-start"
                        >
                            <Text className="text-white font-semibold text-sm">
                                Start Quiz
                            </Text>
                        </Pressable>
                    ) : (
                        <>
                            {/* Progress Bar for Ongoing */}
                            <View className="mb-2">
                                <View className="w-full h-2 bg-gray-200 rounded-full">
                                    <View 
                                        className="h-2 bg-blue-600 rounded-full" 
                                        style={{ width: `${progress}%` }} 
                                    />
                                </View>
                            </View>
                            <Pressable 
                                onPress={handleContinue}
                                className="bg-gray-100 py-2 px-6 rounded-full self-start"
                            >
                                <Text className="text-gray-700 font-semibold text-sm">
                                    Continue
                                </Text>
                            </Pressable>
                        </>
                    )}
                </View>
            </View>
        </View>
    )
}