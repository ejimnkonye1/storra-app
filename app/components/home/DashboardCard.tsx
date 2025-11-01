import { View, Text, Image, Pressable } from 'react-native'

interface DashboardCardProps {
    points: number
    onContinue?: () => void
}

export default function DashboardCard({ points, onContinue }: DashboardCardProps) {
    return (
        <View className="flex-1 flex-row bg-blue-600 mx-6 rounded-3xl py-6 mb-6">
            <Image source={require('@/assets/images/home-book.png')} />
            <View className="flex-1 ml-2 justify-center">
                <Text className="text-white text-2xl font-semibold">
                    Ready to unlock your next reward?
                </Text>
                <Text className="text-blue-200 text-sm mt-2">
                    You&apos;ve earned {points} points this week
                </Text>
                <Pressable onPress={onContinue}>
                    <View className="mt-4 bg-white px-4 py-3 rounded-full w-40 items-center">
                        <Text className="text-blue-600 font-2xl font-semibold">
                            Continue Learning
                        </Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}