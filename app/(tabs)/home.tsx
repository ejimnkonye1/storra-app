import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../../store/userStore';
import { getCurrentUser } from '../../services/userService';

// Import components
import Header from '../components/home/Header';
import WelcomeBanner from '../components/home/WelcomeBanner';
import DashboardCard from '../components/home/DashboardCard';
import ProgressCard from '../components/home/ProgressCard';
import StatsCards from '../components/home/StatsCards';
import SectionHeader from '../components/home/SectionHeader';
import SubjectTabs from '../components/home/SubjectTabs';
import TopicsGrid from '../components/home/TopicsGrid';

// Import data
import { subjects, subjectCards } from '../../data/subjectData';

export default function HomeScreen() {
    const router = useRouter();
    const [selectedSubject, setSelectedSubject] = useState(0);
    const [likedTopics, setLikedTopics] = useState<{[key: string]: boolean}>({});
    const [checkedTopics, setCheckedTopics] = useState<{[key: string]: boolean}>({});
    const scrollViewRef = useRef<ScrollView>(null);

    // Get user data from Zustand
    const { user, token, isLoading, setUser, loadUser } = useUserStore();

    useEffect(() => {
        // Load user data on mount
        const fetchUserData = async () => {
            await loadUser();

            // If we have a token but no user data, fetch it
            if (token && !user) {
                try {
                    const userResponse = await getCurrentUser(token);
                    const userData = userResponse.data || userResponse;
                    setUser(userData);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                    // If token is invalid, redirect to login
                    router.replace('/auth/student/login');
                }
            }

            // If no token, redirect to login
            if (!isLoading && !token) {
                router.replace('/auth/student/login');
            }
        };

        fetchUserData();
    }, [token, user, isLoading]);

    const handleSubjectSelect = (index: number) => {
        setSelectedSubject(index);
        const ITEM_WIDTH = 100;
        scrollViewRef.current?.scrollTo({ 
            x: Math.max(0, ITEM_WIDTH * index - 1),
            animated: true
        });
    };

    const handleLike = (topicId: number) => {
        const key = `${selectedSubject}-${topicId}`;
        setLikedTopics(prev => ({...prev, [key]: !prev[key]}));
    };

    const handleCheck = (topicId: number) => {
        const key = `${selectedSubject}-${topicId}`;
        setCheckedTopics(prev => ({...prev, [key]: !prev[key]}));
    };

    const getLikedState = (topicId: number) => {
        return likedTopics[`${selectedSubject}-${topicId}`] || false;
    };

    const getCheckedState = (topicId: number) => {
        return checkedTopics[`${selectedSubject}-${topicId}`] || false;
    };

    // Show loading state while fetching user data
    if (isLoading || !user) {
        return (
            <SafeAreaView className="flex-1 bg-white justify-center items-center">
                <ActivityIndicator size="large" color="#3b82f6" />
                <Text className="mt-4 text-gray-600">Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView>
                <Header />
                
                <WelcomeBanner 
                    fullname={user.fullname}
                    grade="Pri 1"
                    profileImage={user.profileImage}
                />
                
                <DashboardCard 
                    points={500}
                    onContinue={() => console.log('Continue learning')}
                />

                <View className="px-6 mb-6">
                    <SectionHeader title="Your Progress" />
                </View>
                
                <ProgressCard 
                    title="In Progress"
                    subtitle="Straight lines and curve lines"
                    progress={45}
                    onResume={() => console.log('Resume lesson')}
                />

                <StatsCards 
                    completedCourses={2}
                    onNextCourse={() => console.log('Next course')}
                    onSaved={() => console.log('Saved')}
                    onFavorite={() => console.log('Favorite')}
                />

                <SectionHeader 
                    title="Subject" 
                    actionText="All subjects"
                    onAction={() => console.log('View all subjects')}
                />

                <View className='flex-1 bg-gray-50'>
                    <SubjectTabs 
                        ref={scrollViewRef}
                        subjects={subjects}
                        selectedSubject={selectedSubject}
                        onSelectSubject={handleSubjectSelect}
                    />
                </View>

                <TopicsGrid
                    topics={subjectCards[selectedSubject].topics}
                    likedTopics={Object.fromEntries(
                        subjectCards[selectedSubject].topics.map(topic =>
                            [topic.id, getLikedState(topic.id)]
                        )
                    )}
                    checkedTopics={Object.fromEntries(
                        subjectCards[selectedSubject].topics.map(topic =>
                            [topic.id, getCheckedState(topic.id)]
                        )
                    )}
                    onLike={handleLike}
                    onCheck={handleCheck}
                    onLearnMore={(topicId) => {
                        const topic = subjectCards[selectedSubject].topics.find(t => t.id === topicId);
                        if (topic) {
                            router.push({
                                pathname: '/screens/topicDetailScreen',
                                params: { topic: JSON.stringify(topic) }
                            });
                        }
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}