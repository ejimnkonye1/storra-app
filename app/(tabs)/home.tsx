import { getCurrentUser } from '@/services/userService';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCourses } from '../../services/courseService';
import { useUserStore } from '../../store/userStore';
// Import components
import DashboardCard from '../components/home/DashboardCard';
import Header from '../components/home/Header';
import ProgressCard from '../components/home/ProgressCard';
import SectionHeader from '../components/home/SectionHeader';
import StatsCards from '../components/home/StatsCards';
import SubjectTabs from '../components/home/SubjectTabs';
import TopicsGrid from '../components/home/TopicsGrid';
import WelcomeBanner from '../components/home/WelcomeBanner';

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
    const fetchData = async () => {
        if (!token) {
            router.replace('/auth/student/login');
            return;
        }

        try {
            setLoading(true);

            // Fetch current user profile
            const userRes = await getCurrentUser(token);
                            console.log('✅ Fetched User:', userRes); 
     if (userRes?.data?.profile) {
    useUserStore.getState().setUser(userRes.data.profile);
}


            // Fetch courses
            const coursesRes = await getCourses(token);
            if (coursesRes.data?.subjects) {
                setSubjects(coursesRes.data.subjects);
            }

        } catch (error) {
            console.error('❌ Fetch failed:', error);
        } finally {
            setLoading(false);
        }
    };

    if (token) fetchData();
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

    console.log("👤 U:", user.profilePictureUrl);
// console.log("🪙 Token:", token);
// console.log("isLoading (Zustand):", isLoading);
// console.log("loading (local):", loading);
//  console.log("✅ subjectsss:", subjects);
//  console.log("✅ subjectsss:", subjects);

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
                <Header  />
                
                <WelcomeBanner 
                    fullname={user.fullname}
                    grade="Pri 1"
                    profileImage={user.profilePictureUrl}
                />
                
                <DashboardCard 
                    points={500}
                    onContinue={() => console.log('Continue learning')}
                />

                <View className="px-6 mb-1">
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
                       const topicIndex = currentSubject.topics.findIndex(t => t.id === topicId);
    const topic = currentSubject.topics.find(t => t.id === topicId);
    if (topic) {
      router.push({
        pathname: '/screens/learning',
        params: { topic: JSON.stringify(topic),
        topicsList: JSON.stringify(currentSubject.topics),
          currentIndex: topicIndex.toString(),
          courseId: currentSubject.id 
         },
         // Pass topic object as string
      });
    }
  }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}