import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { useState, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
    const [selectedSubject, setSelectedSubject] = useState(0);
    const [likedTopics, setLikedTopics] = useState<{[key: string]: boolean}>({})
    const [checkedTopics, setCheckedTopics] = useState<{[key: string]: boolean}>({})
    const scrollViewRef = useRef<ScrollView>(null);

    const handlePress = (index: number) => {
        setSelectedSubject(index);

        const ITEM_WIDTH = 100;
        scrollViewRef.current?.scrollTo({ 
            x: Math.max(0, ITEM_WIDTH * index - 1),
            animated: true
        });

    }

    const subjects = ['Mathematics', 'English Language', 'Basic Science', 'Quantitative Reasoning', 'Verbal Reasoning', 'Health Education', 'Social Studies', 'Home Economics'];
    const subjectCards = [
  {
    id: 1,
    subject: 'Mathematics',
    topics: [
      { 
        id: 1, 
        title: 'Whole Numbers (1–5)', 
        paragraph: 'Whole numbers are the set of non-negative integers, including zero.', 
        progress: 45, 
        coverImage: require('@/assets/images/whole-numbers.png') 
      },
      { 
        id: 2, 
        title: 'Ordering Numbers', 
        paragraph: 'Learn how to arrange numbers in ascending and descending order.', 
        progress: 30, 
        coverImage: require('@/assets/images/ordering-numbers.png') 
      },
      {
        id: 3,
        title: 'Basic Shapes',
        paragraph: 'Explore the properties of shapes, angles, and patterns in geometry.',
        progress: 60,
        coverImage: require('@/assets/images/shapes.png')
      },
      {
        id: 4,
        title: 'Whole Numbers (6–10)',
        progress: 20,
        paragraph: 'Practice counting and identifying whole numbers from 6 to 10.',
        coverImage: require('@/assets/images/numbers2.png')
      }
    ]
  },
  {
    id: 2,
    subject: 'English Language',
    topics: [
      { 
        id: 1, 
        title: 'Grammar Basics', 
        paragraph: 'Learn about nouns, verbs, adjectives, and how they form sentences.', 
        progress: 70, 
        coverImage: require('@/assets/images/whole-numbers.png') 
      },
      { 
        id: 2, 
        title: 'Comprehension Skills', 
        paragraph: 'Understand how to read and answer comprehension passages correctly.', 
        progress: 40, 
        coverImage: require('@/assets/images/ordering-numbers.png') 
      },
      {
        id: 3,
        title: 'Vocabulary Building',
        paragraph: 'Improve your English vocabulary with common words and meanings.',
        progress: 55,
        coverImage: require('@/assets/images/shapes.png')
      },
      {
        id: 4,
        title: 'Creative Writing',
        paragraph: 'Learn how to write simple sentences, stories, and short essays.',
        progress: 30,
        coverImage: require('@/assets/images/numbers2.png')
      }
    ]
  },
  {
    id: 3,
    subject: 'Basic Science',
    topics: [
      { 
        id: 1, 
        title: 'Living and Non-living Things', 
        paragraph: 'Understand what makes something living or non-living.', 
        progress: 25, 
        coverImage: require('@/assets/images/whole-numbers.png') 
      },
      { 
        id: 2, 
        title: 'The Human Body', 
        paragraph: 'Learn about body parts, functions, and the five senses.', 
        progress: 50, 
        coverImage: require('@/assets/images/ordering-numbers.png') 
      },
      {
        id: 3,
        title: 'The Solar System',
        paragraph: 'Explore the planets, sun, and moon in our solar system.',
        progress: 35,
        coverImage: require('@/assets/images/shapes.png')
      },
      {
        id: 4,
        title: 'Materials Around Us',
        paragraph: 'Identify solid, liquid, and gas materials in our environment.',
        progress: 15,
        coverImage: require('@/assets/images/numbers2.png')
      }
    ]
  },
  {
    id: 4,
    subject: 'Quantitative Reasoning',
    topics: [
      { 
        id: 1, 
        title: 'Patterns and Sequences', 
        paragraph: 'Learn how to identify and complete number patterns.', 
        progress: 40, 
        coverImage: require('@/assets/images/whole-numbers.png') 
      },
      { 
        id: 2, 
        title: 'Comparing Quantities', 
        paragraph: 'Understand how to compare numbers and find differences.', 
        progress: 20, 
        coverImage: require('@/assets/images/ordering-numbers.png') 
      },
      {
        id: 3,
        title: 'Simple Word Problems',
        paragraph: 'Apply reasoning to solve real-world number problems.',
        progress: 55,
        coverImage: require('@/assets/images/shapes.png')
      },
      {
        id: 4,
        title: 'Logical Thinking',
        paragraph: 'Build problem-solving and analytical reasoning skills.',
        progress: 30,
        coverImage: require('@/assets/images/numbers2.png')
      }
    ]
  },
  {
    id: 5,
    subject: 'Verbal Reasoning',
    topics: [
      { 
        id: 1, 
        title: 'Opposites and Synonyms', 
        paragraph: 'Learn words with opposite and similar meanings.', 
        progress: 45, 
        coverImage: require('@/assets/images/whole-numbers.png') 
      },
      { 
        id: 2, 
        title: 'Word Pairs', 
        paragraph: 'Understand how related words connect logically.', 
        progress: 25, 
        coverImage: require('@/assets/images/ordering-numbers.png') 
      },
      {
        id: 3,
        title: 'Sentence Completion',
        paragraph: 'Find the best word to complete a sentence meaningfully.',
        progress: 60,
        coverImage: require('@/assets/images/shapes.png')
      },
      {
        id: 4,
        title: 'Analogies',
        paragraph: 'Practice solving verbal reasoning analogies and relationships.',
        progress: 35,
        coverImage: require('@/assets/images/numbers2.png')
      }
    ]
  },
  {
    id: 6,
    subject: 'Health Education',
    topics: [
      { 
        id: 1, 
        title: 'Personal Hygiene', 
        paragraph: 'Learn the importance of keeping your body clean and healthy.', 
        progress: 70, 
        coverImage: require('@/assets/images/whole-numbers.png') 
      },
      { 
        id: 2, 
        title: 'Nutrition and Food', 
        paragraph: 'Understand food groups and balanced diet essentials.', 
        progress: 45, 
        coverImage: require('@/assets/images/ordering-numbers.png') 
      },
      {
        id: 3,
        title: 'Exercise and Rest',
        paragraph: 'Know how physical activity and rest help your body grow.',
        progress: 60,
        coverImage: require('@/assets/images/shapes.png')
      },
      {
        id: 4,
        title: 'Common Diseases',
        paragraph: 'Identify common illnesses and learn simple prevention methods.',
        progress: 20,
        coverImage: require('@/assets/images/numbers2.png')
      }
    ]
  },
  {
    id: 7,
    subject: 'Social Studies',
    topics: [
      { 
        id: 1, 
        title: 'Family and Community', 
        paragraph: 'Understand family types and roles in a community.', 
        progress: 50, 
        coverImage: require('@/assets/images/whole-numbers.png') 
      },
      { 
        id: 2, 
        title: 'Culture and Traditions', 
        paragraph: 'Learn about different Nigerian cultures and customs.', 
        progress: 30, 
        coverImage: require('@/assets/images/ordering-numbers.png') 
      },
      {
        id: 3,
        title: 'Civic Responsibilities',
        paragraph: 'Know your duties and responsibilities as a citizen.',
        progress: 40,
        coverImage: require('@/assets/images/shapes.png')
      },
      {
        id: 4,
        title: 'Government and Leadership',
        paragraph: 'Understand how government works and why leaders are important.',
        progress: 25,
        coverImage: require('@/assets/images/numbers2.png')
      }
    ]
  },
  {
    id: 8,
    subject: 'Home Economics',
    topics: [
      { 
        id: 1, 
        title: 'Introduction to Home Economics', 
        paragraph: 'Learn the basics of managing home and resources effectively.', 
        progress: 55, 
        coverImage: require('@/assets/images/whole-numbers.png') 
      },
      { 
        id: 2, 
        title: 'Food and Nutrition', 
        paragraph: 'Understand food preparation, hygiene, and dietary balance.', 
        progress: 35, 
        coverImage: require('@/assets/images/ordering-numbers.png') 
      },
      {
        id: 3,
        title: 'Clothing and Sewing',
        paragraph: 'Discover how to care for clothes and basic hand-sewing techniques.',
        progress: 40,
        coverImage: require('@/assets/images/shapes.png')
      },
      {
        id: 4,
        title: 'Household Management',
        paragraph: 'Learn about budgeting, saving, and home maintenance.',
        progress: 30,
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
                <View className="px-4 mb-10">
                    <View className="flex-row flex-wrap justify-between items-center">
                        {subjectCards[selectedSubject].topics.map((topic) => (
                        <View
                            key={topic.id}
                            className="bg-white w-[48%] mb-5 p-3 rounded-2xl shadow-sm border border-gray-100"
                        >
                            <Image
                            source={topic.coverImage}
                            className="w-full h-24 rounded-lg mb-3"
                            resizeMode="cover"
                            />
                            <Text className="text-gray-900 font-semibold text-base mb-1">
                            {topic.title}
                            </Text>
                            <Text className="text-gray-500 text-sm mb-3">
                            {topic.paragraph}
                            </Text>
                            <View className='flex-row w-full items-center justify-between'>
                                <Pressable className="bg-blue-600 py-2 rounded-full">
                                <Text className="text-white text-center font-semibold text-sm px-4">
                                Learn More
                                </Text>
                                </Pressable>
                                    <View className="flex-row gap-3 mt-2">
                                        {/* Heart Icon */}
                                        <Pressable onPress={() => {
                                            const key = `${selectedSubject}-${topic.id}`;
                                            setLikedTopics(prev => ({...prev, [key]: !prev[key]}));
                                        }}>
                                            <Ionicons
                                            name={likedTopics[`${selectedSubject}-${topic.id}`] ? 'heart' : 'heart-outline'}
                                            size={20}
                                            color={likedTopics[`${selectedSubject}-${topic.id}`] ? 'red' : 'gray'}
                                            />
                                        </Pressable>

                                        {/* Checkmark Icon */}
                                        <Pressable onPress={() => {
                                            const key = `${selectedSubject}-${topic.id}`;
                                            setCheckedTopics(prev => ({...prev, [key]: !prev[key]}));
                                        }}>
                                            <Ionicons
                                            name={checkedTopics[`${selectedSubject}-${topic.id}`] ? 'checkmark-circle' : 'checkmark-circle-outline'}
                                            size={20}
                                            color={checkedTopics[`${selectedSubject}-${topic.id}`] ? '#60A5FA' : 'gray'}
                                            />
                                        </Pressable>
                                        </View>
                                
                            </View> 
                        </View>
                        ))}
                    </View>
                    </View>

            </ScrollView>
        </SafeAreaView>
    )
}