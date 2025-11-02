import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { subjects, subjectCards } from '../../data/subjectData'
import { useState } from 'react'

export default function TopicDetailScreen() {
    const route = useRoute()
    const navigation = useNavigation()
    const { topic } = route.params // This receives the topic data
    
    const [activeTab, setActiveTab] = useState('About') // For switching between tabs
    
    return (
        <ScrollView className="flex-1 bg-white">
            {/* Header with back button */}
            <View className="px-4 pt-12 pb-4">
                <Pressable onPress={() => navigation.goBack()} className="mb-4">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
                
                <Text className="text-2xl font-bold text-gray-900 mb-4">
                    {topic.title}
                </Text>
            </View>

            {/* Cover Image */}
            <View className="px-4 mb-4">
                <Image 
                    source={topic.coverImage}
                    className="w-full h-48 rounded-xl"
                    resizeMode="cover"
                />
            </View>

            {/* Stats Row (Rating, Students, Last Updated) */}
            <View className="px-4 mb-6 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <Ionicons name="star" size={20} color="#FFA500" />
                    <Text className="ml-1 text-gray-700 font-semibold">
                        {subjectCards.rating}
                    </Text>
                </View>
                
                <View className="flex-row items-center">
                    <Ionicons name="people" size={20} color="#6B7280" />
                    <Text className="ml-1 text-gray-700">
                        {subjectCards.numberOfStudents}
                    </Text>
                </View>
                
                <View className="flex-row items-center">
                    <Ionicons name="calendar" size={20} color="#6B7280" />
                    <Text className="ml-1 text-gray-600 text-sm">
                        Last updated {subjectCards.lastUpdated}
                    </Text>
                </View>
            </View>

            {/* Tabs (About, FAQ, Reviews) */}
            <View className="px-4 mb-4 flex-row border-b border-gray-200">
                {['About', 'FAQ', 'Reviews'].map((tab) => (
                    <Pressable 
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        className={`mr-6 pb-3 ${activeTab === tab ? 'border-b-2 border-blue-600' : ''}`}
                    >
                        <Text className={`${activeTab === tab ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                            {tab}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {/* Tab Content */}
            <View className="px-4 mb-6">
                {activeTab === 'About' && (
                    <Text className="text-gray-700 leading-6">
                        {subjectCards.about}
                    </Text>
                )}
                
                {activeTab === 'FAQ' && (
                    <View>
                        {subjectCards.faqs.map((faq, index) => (
                            <View key={index} className="mb-4">
                                <Text className="font-semibold text-gray-900 mb-2">
                                    {faq.question}
                                </Text>
                                <Text className="text-gray-600">
                                    {faq.answer}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
                
                {activeTab === 'Reviews' && (
                    <View>
                        {subjectCards.reviews.map((review, index) => (
                            <View key={index} className="mb-4 pb-4 border-b border-gray-200">
                                <View className="flex-row items-center mb-2">
                                    <Text className="font-semibold text-gray-900 mr-2">
                                        {review.user}
                                    </Text>
                                    <View className="flex-row">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Ionicons key={i} name="star" size={14} color="#FFA500" />
                                        ))}
                                    </View>
                                </View>
                                <Text className="text-gray-600">
                                    {review.comment}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            {/* Subject Content / Lessons */}
            <View className="px-4 mb-8">
                <Text className="text-xl font-bold text-gray-900 mb-4">
                    Subject content
                </Text>
                
                {subjectCards.lessons.map((lesson) => (
                    <Pressable 
                        key={lesson.id}
                        className="bg-gray-50 p-4 rounded-lg mb-3 flex-row justify-between items-center"
                        onPress={() => console.log('Lesson clicked:', lesson.id)}
                    >
                        <View>
                            <Text className="text-gray-900 font-semibold mb-1">
                                {lesson.title}
                            </Text>
                            <Text className="text-gray-500 text-sm">
                                {lesson.lessonNumber}
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                    </Pressable>
                ))}
            </View>
        </ScrollView>
    )
}