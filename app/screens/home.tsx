import { View, Text, ScrollView, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function HomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView>
                {/* Header */}
                <View className="flex-row items-center justify-between px-6 pt-6 ">
                    <Image
                            source={require('@/assets/images/storra.png')}
                            className="w-20 h-20"
                            resizeMode="contain"
                    />
                    <View className="flex-row items-center gap-4">
                            <Ionicons 
                                name="notifications-outline" 
                                size={28} 
                                color="black"  
                            />
                            <Ionicons 
                                name='menu' 
                                size={28} 
                                color="black"
                            />
                    </View>
                </View>    
                {/* User pfp */}
                <View className=" flex-row text-center items-start gap-8 px-6 mt-4 mb-6">
                    <Image
                        source={require('@/assets/images/Jem.png')}    
                        className="w-12 h-12 rounded-full"
                        resizeMode="contain"
                    />
                    <View className='flex-row'>
                        <View>
                            <Text className="mt-2 text-2xl font-semibold text-gray-800">Welcome back, Jem!</Text>
                            <Text className="text-gray-500 text-lg">{"Here's your learning Journey today"}</Text>
                        </View>
                        <View className='flex-row pl-8 mt-6'>
                            <Text className="text-blue-600 font-semibold mt-2">Pri 1 </Text>
                            <Ionicons 
                                name="chevron-down" 
                                size={15} 
                                color="blue" 
                                style={{ marginTop: 6 }}
                            />
                        </View>
                    </View>
                </View>
                {/* Dashboard */}
                <View className="">
                    <Image
                        source={require('@/assets/images/home-book.png')}
                    />
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}