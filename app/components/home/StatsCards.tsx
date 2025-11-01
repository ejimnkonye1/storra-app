import { View, Text, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface StatsCardsProps {
    completedCourses: number
    onNextCourse?: () => void
    onSaved?: () => void
    onFavorite?: () => void
}

export default function StatsCards({ 
    completedCourses, 
    onNextCourse, 
    onSaved, 
    onFavorite 
}: StatsCardsProps) {
    return (
        <View className="flex-row justify-between px-6 mt-6 mb-6">
            {/* Completed Lessons Card */}
            <View className="items-start border border-solid rounded-xl border-gray-300 py-4 px-5">
                <View className="bg-green-100 p-2 rounded-full">
                    <Image source={require('@/assets/images/completed.png')} />
                </View>
                <Text className="text-gray-800 text-lg font-semibold">
                    Completed Lessons
                </Text>
                <Text className="text-gray-500 text-sm">
                    {completedCourses} courses completed
                </Text>
                <Pressable 
                    className="flex-row gap-3 mt-4 bg-green-200 hover:bg-blue-800 px-4 py-1 rounded-full"
                    onPress={onNextCourse}
                >
                    <Text className="text-green-600 text-lg font-semibold">Next course</Text>
                    <Ionicons 
                        name="arrow-forward" 
                        size={16} 
                        color="green" 
                        style={{ marginTop: 2 }}
                    />
                </Pressable>
            </View>

            {/* My Library Card */}
            <View className="items-start border border-solid rounded-xl border-gray-300 py-4 px-3">
                <View className="bg-red-100 p-2 rounded-full">
                    <Image source={require('@/assets/images/mdi_library-outline.png')} />
                </View>
                <Text className="text-gray-800 text-lg font-semibold">My Library</Text>
                <Text className="text-gray-500 text-sm">View sections</Text>
                <View className="flex-row gap-2">
                    <Pressable 
                        className="flex-row gap-3 mt-4 bg-red-200 hover:bg-blue-800 px-4 py-1 rounded-full"
                        onPress={onSaved}
                    >
                        <Text className="text-red-600 text-lg font-semibold">Saved</Text>
                    </Pressable>
                    <Pressable 
                        className="flex-row gap-3 mt-4 bg-red-200 hover:bg-red-600 px-4 py-1 rounded-full"
                        onPress={onFavorite}
                    >
                        <Text className="text-red-600 text-lg font-semibold">Favorite</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}