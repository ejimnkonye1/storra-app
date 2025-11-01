import { View, Text, ScrollView, Image, Pressable } from 'react-native'
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
                <View className="flex-1 flex-row bg-blue-600 mx-6 rounded-3xl py-6 mb-6">
                    <Image
                        source={require('@/assets/images/home-book.png')}
                    />
                    <View className="flex-1 ml-2 justify-center">
                        <Text className="text-white text-2xl font-semibold">Ready to unlock your next reward ?</Text>
                        <Text className="text-blue-200 text-sm mt-2">You&apos;ve earned 500 points this week</Text>
                        <Pressable>
                            <View className="mt-4 bg-white px-4 py-3 rounded-full w-40 items-center">
                                <Text className="text-blue-600 font-2xl font-semibold">Continue Learning</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>

                <View className="px-6 mb-6">
                    <Text className="text-gray-800 text-2xl font-semibold mb-4">Your Progress</Text>
                </View>
                
                <View className="px-6 mx-6 border border-solid rounded-xl border-gray-300 p-4">
                    <Image
                        source={require('@/assets/images/uim_analytics.png')}
                    />
                    <View className="flex-row mt-4 items-center">
                        <View className="flex justify-between mb-2">
                            <Text className="text-gray-800 text-xl font-semibold">In Progress</Text>
                            <Text className="text-gray-500 text-sm">Straight lines and curve lines</Text>
                        </View>
                        <Pressable className="ml-auto mt-2 bg-blue-200 hover:bg-blue-800 px-4 py-2 rounded-full">
                            <Text className="text-blue-600 text-lg font-semibold">Resume Lesson</Text>
                        </Pressable>
                    </View>
                    {/* Progress Bar */}
                    <Text className="text-gray-500 text-sm mt-4 text-right">
                        45% completed
                    </Text>
                    <View className="w-full h-2 bg-gray-200 rounded-full mt-4">
                        <View className="h-2 bg-blue-600 rounded-full" style={{ width: '45%' }} />
                    </View>
                </View>

                <View className=" flex-row justify-between px-6 mt-6 mb-6 ">
                    <View className=" items-start border border-solid rounded-xl border-gray-300 py-4 px-5">
                        <Image
                            source={require('@/assets/images/completed.png')}
                        />
                        <Text className="text-gray-800 text-lg font-semibold ">Completed Lessons</Text>
                        <Text className="text-gray-500 text-sm">2 courses completed</Text>
                        <Pressable className="flex-row gap-3 mt-4 bg-green-200 hover:bg-blue-800 px-4 py-1 rounded-full">
                            <Text className="text-green-600 text-lg font-semibold">Next course</Text>
                            <Ionicons 
                                name="arrow-forward" 
                                size={16} 
                                color="green" 
                                style={{ marginTop: 2 }}
                            />
                        </Pressable>
                    </View>

                    <View className=" items-start border border-solid rounded-xl border-gray-300 py-4 px-3">
                        <View className="bg-red-100 p-2 rounded-full">
                            <Image
                            className=''
                            source={require('@/assets/images/mdi_library-outline.png')}
                            />
                        </View>
                        
                        <Text className="text-gray-800 text-lg font-semibold ">My Library</Text>
                        <Text className="text-gray-500 text-sm">View sections</Text>
                        <View className="flex-row gap-2">
                            <Pressable className="flex-row gap-3 mt-4 bg-red-200 hover:bg-blue-800 px-4 py-1 rounded-full">
                            <Text className="text-red-600 text-lg font-semibold">Saved</Text>
                            </Pressable>
                            <Pressable className="flex-row gap-3 mt-4 bg-red-200 hover:bg-red-600 px-4 py-1 rounded-full">
                            <Text className="text-red-600 text-lg font-semibold">Favorite</Text>
                            </Pressable>
                        </View>
                        
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}