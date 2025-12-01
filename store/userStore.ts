import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Topic {
  id: string;
  title: string;
  paragraph: string;
  coverImage: string;
  lessonType: 'text' | 'video' | 'audio';
  content: { text?: string; video?: string; audio?: string };
  isLiked?: boolean;
  isChecked?: boolean;
  progress?: number;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  image?: string;
  topics: Topic[];
}

interface Reward {
  totalCoins: number;
  totalDiamonds: number;
  spinChances?: number;
  achievements?: any[];
  currentStreak?: number;
  longestStreak?: number;
  dailyRewards?: any[];
  lastLoginDate?: string;
  transactionHistory?: any[];
  trialDaysRemaining?: number;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  __v?: number;
  _id?: string;
}

interface CourseProgressSummary {
  courseId: string;
  courseName: string;
  overallProgress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  completedLessons: number;
  totalLessons: number;
  lastAccessedAt: string | null;
}

export interface User {
  _id: string;
  fullname: string;
  profilePictureUrl: string;
  email: string;
  role: string;
  phoneNumber: string;
  createdAt: string;
  age?: number;
  currentClassId?: string;
  currentClassLevel?: string;
  educationLevel?: string;
  preferredLanguage?: string;
  learningGoals?: string[];
  hasCompletedOnboarding?: boolean;
  rewards?: Reward;
  coursesProgress: CourseProgressSummary[];
  overallProgressPercent?: number;
  spinChances?: number;
  leaderboard?: { totalPoints: number; rank: number };
}

interface UserStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  subjects: Subject[];
  selectedSubject: number;
  hasFetched: boolean;
  coursesUpdatedAt: number;

  setUser: (user: User) => void;
  setToken: (token: string) => Promise<void>;
  clearUser: () => void;
  loadUser: () => Promise<void>;
  logout: () => Promise<void>;

  setSubjects: (subjects: Subject[]) => void;
  setSelectedSubject: (index: number) => void;
  clearSubjects: () => void;
  getSelectedSubjectData: () => Subject | null;
  getTopicById: (topicId: string) => Topic | null;

  toggleTopicLike: (topicId: string) => void;
  toggleTopicCheck: (topicId: string) => void;
  updateTopicProgress: (topicId: string, progress: number) => void;

  getLikedTopics: () => Topic[];
  getCheckedTopics: () => Topic[];
  getCompletedTopics: () => Topic[];

  triggerCoursesRefresh: () => void;
  setHasFetched: (val: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true,
      subjects: [],
      selectedSubject: 0,
      hasFetched: false,
      coursesUpdatedAt: 0,

      setHasFetched: (val) => set({ hasFetched: val }),
      triggerCoursesRefresh: () => set({ coursesUpdatedAt: Date.now() }),

      setUser: (user) => set({ user, isLoading: false }),

      setToken: async (token) => {
        try {
          await AsyncStorage.setItem('access_token', token);
          set({ token });
        } catch (error) {
          console.error('Error saving token:', error);
        }
      },

      clearUser: () =>
        set({
          user: null,
          token: null,
          subjects: [],
          selectedSubject: 0,
          isLoading: false,
        }),

      loadUser: async () => {
        try {
          const token = await AsyncStorage.getItem('access_token');
          set({ token: token || null, isLoading: false });
        } catch (error) {
          console.error('Error loading user:', error);
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          await AsyncStorage.removeItem('access_token');
          set({
            user: null,
            token: null,
            subjects: [],
            selectedSubject: 0,
            isLoading: false,
          });
        } catch (error) {
          console.error('Error during logout:', error);
        }
      },

      setSubjects: (subjects) => {
        set({ subjects });
        const currentSelected = get().selectedSubject;
        if (currentSelected >= subjects.length) set({ selectedSubject: 0 });
      },

      setSelectedSubject: (index) => {
        const subjects = get().subjects;
        if (index >= 0 && index < subjects.length) set({ selectedSubject: index });
        else console.warn('Invalid subject index:', index);
      },

      clearSubjects: () => set({ subjects: [], selectedSubject: 0 }),

      getSelectedSubjectData: () => {
        const { subjects, selectedSubject } = get();
        return subjects[selectedSubject] || null;
      },

      getTopicById: (topicId) => {
        const { subjects } = get();
        for (const subject of subjects) {
          const topic = subject.topics.find((t) => t.id === topicId);
          if (topic) return topic;
        }
        return null;
      },

      toggleTopicLike: (topicId) => {
        const { subjects } = get();
        set({
          subjects: subjects.map((subject) => ({
            ...subject,
            topics: subject.topics.map((topic) =>
              topic.id === topicId ? { ...topic, isLiked: !topic.isLiked } : topic
            ),
          })),
        });
      },

      toggleTopicCheck: (topicId) => {
        const { subjects } = get();
        set({
          subjects: subjects.map((subject) => ({
            ...subject,
            topics: subject.topics.map((topic) =>
              topic.id === topicId ? { ...topic, isChecked: !topic.isChecked } : topic
            ),
          })),
        });
      },

      updateTopicProgress: (topicId, progress) => {
        const { subjects } = get();
        set({
          subjects: subjects.map((subject) => ({
            ...subject,
            topics: subject.topics.map((topic) =>
              topic.id === topicId ? { ...topic, progress } : topic
            ),
          })),
        });
      },

      getLikedTopics: () =>
        get().subjects.flatMap((subject) => subject.topics.filter((topic) => topic.isLiked)),

      getCheckedTopics: () =>
        get().subjects.flatMap((subject) => subject.topics.filter((topic) => topic.isChecked)),

      getCompletedTopics: () =>
        get().subjects.flatMap((subject) => subject.topics.filter((topic) => topic.progress === 100)),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        subjects: state.subjects,
        hasFetched: state.hasFetched,
        coursesUpdatedAt: state.coursesUpdatedAt,
      }),
    }
  )
);
