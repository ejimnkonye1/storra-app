import { View, Text, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface TopicCardProps {
    title: string
    paragraph: string
    coverImage: any
    isLiked: boolean
    isChecked: boolean
    onLike: () => void
    onCheck: () => void
    onLearnMore?: () => void
}

export default function TopicCard({
    title,
    paragraph,
    coverImage,
    isLiked,
    isChecked,
    onLike,
    onCheck,
    onLearnMore
}: TopicCardProps) {
    return (
        <View
            className="bg-white w-[48%] mb-5 p-3 rounded-2xl shadow-sm border border-gray-100"
            style={{ height: 200 }}
        >
            <Image
                source={coverImage}
                className="w-full h-24 rounded-lg mb-3"
                resizeMode="cover"
            />
            <Text className="text-gray-900 font-semibold text-base mb-2" numberOfLines={2}>
                {title}
            </Text>
            <Text className="text-gray-500 text-sm flex-1" numberOfLines={3}>
                {paragraph}
            </Text>
            <View className='flex-row w-full items-center justify-between mt-3'>
                <Pressable 
                    className="bg-blue-600 py-2 rounded-full"
                    onPress={onLearnMore}
                >
                    <Text className="text-white text-center font-semibold text-sm px-4">
                        Learn More
                    </Text>
                </Pressable>
                <View className="flex-row gap-3">
                    {/* Heart Icon */}
                    <Pressable onPress={onLike}>
                        <Ionicons
                            name={isLiked ? 'heart' : 'heart-outline'}
                            size={20}
                            color={isLiked ? 'red' : 'gray'}
                        />
                    </Pressable>

                    {/* Checkmark Icon */}
                    <Pressable onPress={onCheck}>
                        <Ionicons
                            name={isChecked ? 'checkmark-circle' : 'checkmark-circle-outline'}
                            size={20}
                            color={isChecked ? '#60A5FA' : 'gray'}
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}