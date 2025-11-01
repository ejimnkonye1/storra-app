import { View, Text, Image, Pressable } from 'react-native'

interface ProgressCardProps {
    title: string
    subtitle: string
    progress: number
    onResume?: () => void
}

export default function ProgressCard({ title, subtitle, progress, onResume }: ProgressCardProps) {
    return (
        <View className="px-6 mx-6 border border-solid rounded-xl border-gray-300 p-4">
            <View className="p-2 bg-blue-100 rounded-full w-12 h-12 items-center">
                <Image source={require('@/assets/images/uim_analytics.png')} />
            </View>
            <View className="flex-row mt-4 items-center">
                <View className="flex justify-between mb-2">
                    <Text className="text-gray-800 text-xl font-semibold">{title}</Text>
                    <Text className="text-gray-500 text-sm">{subtitle}</Text>
                </View>
                <Pressable 
                    className="ml-auto mt-2 bg-blue-200 hover:bg-blue-800 px-4 py-2 rounded-full"
                    onPress={onResume}
                >
                    <Text className="text-blue-600 text-lg font-semibold">Resume Lesson</Text>
                </Pressable>
            </View>
            <Text className="text-gray-500 text-sm mt-4 text-right">
                {progress}% completed
            </Text>
            <View className="w-full h-2 bg-gray-200 rounded-full mt-4">
                <View 
                    className="h-2 bg-blue-600 rounded-full" 
                    style={{ width: `${progress}%` }} 
                />
            </View>
        </View>
    )
}