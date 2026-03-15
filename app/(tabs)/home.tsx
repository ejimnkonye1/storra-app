import { getCurrentUser } from '@/services/userService';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCourses } from '../../services/courseService';
import { useUserStore } from '../../store/userStore';

// Components
import DashboardCard from '../components/home/DashboardCard';
import Header from '../components/home/Header';
import NotificationModal from '../components/home/NotificationModal';
import ProgressCard from '../components/home/ProgressCard';
import SectionHeader from '../components/home/SectionHeader';
import StatsCards from '../components/home/StatsCards';
import SubjectTabs from '../components/home/SubjectTabs';
import TopicsGrid from '../components/home/TopicsGrid';
import WelcomeBanner from '../components/home/WelcomeBanner';
import Loader from '../components/loader';
import { useDelayedLoader } from '../../utils/useDelayedLoader';

export default function HomeScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [loading, setLoading] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);

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
    getSelectedSubjectData,
    getLikedTopics,
    getCheckedTopics,
  } = useUserStore();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        if (!token) {
          router.replace('/auth/student/login');
          return;
        }

        try {
          setLoading(true);

          // Always fetch user data so rewards/coins/streak reflect in real time
          const userRes = await getCurrentUser(token);
          if (userRes?.data) {
            useUserStore.getState().setUser(userRes.data);
          }

          // Only fetch courses if not yet fetched (they don't change often)
          const { hasFetched, setHasFetched } = useUserStore.getState();
          if (!hasFetched) {
            const coursesRes = await getCourses(token);
            if (coursesRes.data?.subjects) {
              setSubjects(coursesRes.data.subjects);
            }
            setHasFetched(true);
          }
        } catch (error) {
          console.error('❌ Fetch failed:', error);
        } finally {
          setLoading(false);
        }
      };

      if (token) fetchData();
    }, [token])
  );

  const handleSubjectSelect = (index: number) => {
    setSelectedSubject(index);
    const ITEM_WIDTH = 100;
    scrollViewRef.current?.scrollTo({
      x: Math.max(0, ITEM_WIDTH * index - 1),
      animated: true
    });
  };

  const handleLike = (topicId: string) => toggleTopicLike(topicId);
  const handleCheck = (topicId: string) => toggleTopicCheck(topicId);

  // Only show the full-screen loader when there's no user yet AND the fetch
  // has been running for more than 2 seconds — fast responses skip it entirely.
  const showLoader = useDelayedLoader(!user ? loading : false);

  if (!user) {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
        {showLoader && <Loader />}
      </View>
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

  const {
    fullname,
    profilePictureUrl,
    rewards,
    overallProgressPercent,
    leaderboard,
    coursesProgress,
    currentClassLevel,
    educationLevel,
  } = user;

  // Derive real values from user data
  const totalPoints = leaderboard?.totalPoints ?? 0;
  const completedCoursesCount = coursesProgress?.filter(c => c.status === 'completed' || c.overallProgress === 100).length ?? 0;
  const grade = currentClassLevel || educationLevel || 'N/A';

  // coursesProgress from /me includes ALL courses in curriculum order with real statuses.
  // Priority: show the active in_progress course (under 100%). If none exists (e.g. user
  // just finished Maths and hasn't started English yet), show the next not_started course.

  const inProgressCourse = coursesProgress?.find(
    c => c.status === 'in_progress' && Math.round(c.overallProgress) < 100
  ) ?? null;

  // Only look for a next course when there is nothing actively in progress
  const nextCourse = !inProgressCourse
    ? (coursesProgress?.find(c => c.status === 'not_started')       // prefer unstarted in curriculum order
        ?? coursesProgress?.find(c => c.status === 'in_progress'))   // fallback: another partial course
    : null;

  const showNextCourse = !inProgressCourse && !!nextCourse;
  const nextCourseIsPartial = nextCourse?.status === 'in_progress';

  // Notification count = achievements + streak (if active)
  const achievementsCount = rewards?.achievements?.length ?? 0;
  const notifCount = achievementsCount + (rewards?.currentStreak && rewards.currentStreak > 0 ? 1 : 0);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <Header
          coins={rewards?.totalCoins ?? 0}
          diamond={rewards?.totalDiamonds ?? 0}
          onNotificationPress={() => setNotifVisible(true)}
          notificationCount={notifCount}
        />

        <WelcomeBanner
          fullname={fullname}
          grade={grade}
          profileImage={profilePictureUrl}
        />

        <DashboardCard
          points={totalPoints}
          onContinue={() => {
            const courseId = inProgressCourse?.courseId ?? nextCourse?.courseId;
            if (!courseId) return;
            const subject = subjects.find(s => s.id === courseId);
            if (!subject || subject.topics.length === 0) return;
            // Resume from the first incomplete topic, or start from the first topic
            const resumeIndex = subject.topics.findIndex(t => !t.progress || t.progress < 100);
            const topicIndex = resumeIndex >= 0 ? resumeIndex : 0;
            router.push({
              pathname: '/screens/learning',
              params: {
                topic: JSON.stringify(subject.topics[topicIndex]),
                topicsList: JSON.stringify(subject.topics),
                currentIndex: topicIndex.toString(),
                courseId: subject.id,
              },
            });
          }}
        />

        <View className="px-6 mb-1">
          <SectionHeader title="Your Progress" />
        </View>

        <ProgressCard
          title={
            inProgressCourse?.courseName
            ?? nextCourse?.courseName
            ?? 'All courses completed!'
          }
          subtitle={
            inProgressCourse
              ? `${inProgressCourse.completedLessons} of ${inProgressCourse.totalLessons} lessons done`
              : nextCourseIsPartial
              ? `${nextCourse!.completedLessons} of ${nextCourse!.totalLessons} lessons done`
              : nextCourse
              ? `${nextCourse.totalLessons} lessons • Not started yet`
              : 'You have completed all available courses'
          }
          progress={
            inProgressCourse
              ? Math.round(inProgressCourse.overallProgress)
              : nextCourse
              ? Math.round(nextCourse.overallProgress)
              : 100
          }
          buttonLabel={
            inProgressCourse
              ? 'Resume Lesson'
              : nextCourseIsPartial
              ? 'Continue'
              : nextCourse
              ? 'Start Course'
              : undefined
          }
          isNext={showNextCourse}
          onResume={() => {
            const courseId = inProgressCourse?.courseId ?? nextCourse?.courseId;
            if (courseId) {
              const idx = subjects.findIndex(s => s.id === courseId);
              if (idx >= 0) handleSubjectSelect(idx);
            }
          }}
        />

        <StatsCards
          completedCourses={completedCoursesCount}
          completedLessons={coursesProgress?.reduce((sum, c) => sum + c.completedLessons, 0) ?? 0}
          savedCount={getLikedTopics().length}
          favoriteCount={getCheckedTopics().length}
          onNextCourse={() => {
            const courseId = inProgressCourse?.courseId ?? nextCourse?.courseId;
            if (courseId) {
              const subject = subjects.find(s => s.id === courseId);
              if (!subject || subject.topics.length === 0) return;
              const resumeIndex = subject.topics.findIndex(t => !t.progress || t.progress < 100);
              const topicIndex = resumeIndex >= 0 ? resumeIndex : 0;
              router.push({
                pathname: '/screens/learning',
                params: {
                  topic: JSON.stringify(subject.topics[topicIndex]),
                  topicsList: JSON.stringify(subject.topics),
                  currentIndex: topicIndex.toString(),
                  courseId: subject.id,
                },
              });
            }
          }}
          onSaved={() => router.push({ pathname: '/screens/library' as any, params: { tab: 'saved' } })}
          onFavorite={() => router.push({ pathname: '/screens/library' as any, params: { tab: 'favourite' } })}
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
                params: {
                  topic: JSON.stringify(topic),
                  topicsList: JSON.stringify(currentSubject.topics),
                  currentIndex: topicIndex.toString(),
                  courseId: currentSubject.id
                },
              });
            }
          }}
        />
      </ScrollView>

      <NotificationModal
        visible={notifVisible}
        onClose={() => setNotifVisible(false)}
        user={user}
      />
    </SafeAreaView>
  );
}
