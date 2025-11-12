import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../../store/userStore';
import { getCourses } from '../../services/courseService';

// Import components
import Header from '../components/home/Header';
import WelcomeBanner from '../components/home/WelcomeBanner';
import DashboardCard from '../components/home/DashboardCard';
import ProgressCard from '../components/home/ProgressCard';
import StatsCards from '../components/home/StatsCards';
import SectionHeader from '../components/home/SectionHeader';
import SubjectTabs from '../components/home/SubjectTabs';
import TopicsGrid from '../components/home/TopicsGrid';

export default function HomeScreen() {
    const router = useRouter();
    const scrollViewRef = useRef<ScrollView>(null);
    const [loading, setLoading] = useState(true);

    // Get data from Zustand
    const { 
        user, 
        token, 
        isLoading, 
        subjects, 
        selectedSubject, 
        setSubjects, 
        setSelectedSubject,
        toggleTopicLike,
        toggleTopicCheck,
        getSelectedSubjectData
    } = useUserStore();

    useEffect(() => {
        const fetchCourses = async () => {
            if (!token) {
                router.replace('/auth/student/login');
                return;
            }

            try {
                setLoading(true);
                const response = await getCourses(token);
                
                if (response.data?.subjects) {
                    setSubjects(response.data.subjects);
                }
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchCourses();
        }
    }, [token]);

    const handleSubjectSelect = (index: number) => {
        setSelectedSubject(index);
        const ITEM_WIDTH = 100;
        scrollViewRef.current?.scrollTo({ 
            x: Math.max(0, ITEM_WIDTH * index - 1),
            animated: true
        });
    };

    // Updated to use string IDs
    const handleLike = (topicId: string) => {
        toggleTopicLike(topicId);
    };

    const handleCheck = (topicId: string) => {
        toggleTopicCheck(topicId);
    };

    if (isLoading || loading || !user) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#3b82f6" />
                <Text style={{ marginTop: 16, color: '#6b7280' }}>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (subjects.length === 0) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: '#6b7280' }}>No courses available</Text>
            </SafeAreaView>
        );
    }

    const currentSubject = getSelectedSubjectData();

    if (!currentSubject) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: '#6b7280' }}>No subject selected</Text>
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
                        subjects={subjects.map(s => ({ name: s.name, icon: s.image }))}
                        selectedSubject={selectedSubject}
                        onSelectSubject={handleSubjectSelect}
                    />
                </View>

                <TopicsGrid
                    topics={currentSubject.topics}
                    likedTopics={Object.fromEntries(
                        currentSubject.topics.map(topic => [topic.id, topic.isLiked || false])
                    )}
                    checkedTopics={Object.fromEntries(
                        currentSubject.topics.map(topic => [topic.id, topic.isChecked || false])
                    )}
                    onLike={handleLike}
                    onCheck={handleCheck}
                    onLearnMore={(topicId) => {
                        const topic = currentSubject.topics.find(t => t.id === topicId);
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