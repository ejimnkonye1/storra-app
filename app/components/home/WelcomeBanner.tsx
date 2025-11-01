import { View, Text, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface WelcomeBannerProps {
    name: string
    grade: string
    profileImage: any
}

export default function WelcomeBanner({ name, grade, profileImage }: WelcomeBannerProps) {
    return (
        <View className="flex-row text-center items-start gap-8 px-6 mt-4 mb-6">
            <Image
                source={profileImage}    
                className="w-12 h-12 rounded-full"
                resizeMode="contain"
            />
            <View className='flex-row'>
                <View>
                    <Text className="mt-2 text-2xl font-semibold text-gray-800">
                        Welcome back, {name}!
                    </Text>
                    <Text className="text-gray-500 text-lg">
                        Here&apos;s your learning Journey today
                    </Text>
                </View>
                <View className='flex-row pl-8 mt-6'>
                    <Text className="text-blue-600 font-semibold mt-2">{grade} </Text>
                    <Ionicons 
                        name="chevron-down" 
                        size={15} 
                        color="blue" 
                        style={{ marginTop: 6 }}
                    />
                </View>
            </View>
        </View>
    )
}