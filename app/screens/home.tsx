import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { useState, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function HomeScreen() {
    const [selectedSubject, setSelectedSubject] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const handlePress = (index: number) => {
        setSelectedSubject(index);

        const ITEM_WIDTH = 50;
        scrollViewRef.current?.scrollTo({ 
            x: Math.max(0, ITEM_WIDTH * index - 1),
            animated: true
        });

    }

    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography'];
    const subjectCards = [
        {
            id: 1,
            subject: 'Mathematics',
            topics: [
                { 
                    id: 1, 
                    title: 'Whole Numbers(1-5)', 
                    paragraph: 'Whole numbers are the set of non negative integers, including zero.', 
                    progress: 45, 
                    coverImage: require('@/assets/images/whole-numbers.png') 
                },
                { 
                    id: 2, 
                    title: '', 
                    paragraph: 'Explore the properties of shapes, angles, and theorems in geometry.', 
                    progress: 30, 
                    coverImage: require('@/assets/images/ordering-numbers.png') 
                },
                {
                    id: 3,
                    title: 'Calculus Introduction',
                    paragraph: 'Understand the basics of limits, derivatives, and integrals in calculus.',
                    progress: 60,
                    coverImage: require('@/assets/images/shapes.png')
                },
                {
                    id: 4,
                    title: 'Whole Numbers(6-10)',
                    progress: 20,
                    paragraph: 'Whole numbers are the set of non negative integers, including zero',
                    coverImage: require('@/assets/images/numbers2.png')
                }
            ]
        }
    ];

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
                    <View className="p-2 bg-blue-100 rounded-full w-12 h-12 items-center">
                    <Image
                        source={require('@/assets/images/uim_analytics.png')}
                    />
                    </View>
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
                        <View className="bg-green-100 p-2 rounded-full">
                            <Image
                                source={require('@/assets/images/completed.png')}
                            />
                        </View>
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
                <View className="flex-row justify-between mx-6 mt-2" >
                    <Text className="text-gray-800 text-2xl font-semibold mb-4">
                        Subject
                    </Text>
                    <Text className="text-blue-500 text-lg font-bold mb-6">
                       All subjects
                    </Text>
                </View>
                <View className='flex-1 bg-gray-50'>
                    <View className=" px-6 mb-6">
                    <ScrollView ref={scrollViewRef} horizontal={true} showsHorizontalScrollIndicator={false}  className=" bg-gray-100 p-2 rounded-lg">
                        <View className="flex-row gap-4">
                            {subjects.map((subject, index) => {
                                const isActive = selectedSubject === index || (!selectedSubject && index === 0);
                                return (
                                    <Pressable
                                        key={index}
                                        onPress={() => handlePress(index)}
                                        className={`px-4 py-2 rounded-lg ${isActive ? 'bg-blue-600' : 'transparent'} `}
                                    >
                                        <Text className={`text-lg font-medium ${isActive ? 'text-white' : 'text-gray-800'}`}>
                                            {subject}
                                        </Text>
                                    </Pressable>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                </View>
                <View className="px-6 mb-10">
                    <View className="grid grid-cols-2 gap-4">
                        {/* Subject Cards */}
                        {
                            subjectCards.
                        }
                        
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}