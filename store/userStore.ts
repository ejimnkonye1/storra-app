import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Topic {
  id: string;
  title: string;
  paragraph: string;
  coverImage: string;
  lessonType: 'text' | 'video' | 'audio';
  content: {
    text?: string;
    video?: string;
    audio?: string;
  };
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
interface Profile {
  _id: string;
  fullname: string;
  profilePictureUrl: string;
  email: string;
  username?: string;
  phoneNumber: string;
  createdAt: string;
  role: string;
  classId?: string;
  className?: string;
  educationLevel?: string;
  preferredLanguage?: string;
  age?: number;
  hasCompletedOnboarding?: boolean;
  learningGoals?: string[];
}

interface User {
  profilePictureUrl: string;
  email: string;
  username?: string;
  fullname: string;
  role: string;
  phoneNumber: string;
  createdAt: string;
  profileImage?: string;
  classId?: string;
  className?: string;
  educationLevel?: string;
    rewards?: Reward;
  coursesProgress: CourseProgressSummary[];
  overallProgressPercent?: number;
  profile: Profile;
}

interface UserStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  subjects: Subject[];
  selectedSubject: number;

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
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true,
      subjects: [],
      selectedSubject: 0,

      // 🔹 Fix: Ensure loading stops when user is set
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
            isLoading: false, // ✅ important
          });
        } catch (error) {
          console.error('Error during logout:', error);
        }
      },

      setSubjects: (subjects) => {
        set({ subjects });
        const currentSelected = get().selectedSubject;
        if (currentSelected >= subjects.length) {
          set({ selectedSubject: 0 });
        }
      },

      setSelectedSubject: (index) => {
        const subjects = get().subjects;
        if (index >= 0 && index < subjects.length) {
          set({ selectedSubject: index });
        } else {
          console.warn('Invalid subject index:', index);
        }
      },

      clearSubjects: () => set({ subjects: [], selectedSubject: 0 }),

      getSelectedSubjectData: () => {
        const { subjects, selectedSubject } = get();
        return subjects[selectedSubject] || null;
      },

      getTopicById: (topicId: string) => {
        const { subjects } = get();
        for (const subject of subjects) {
          const topic = subject.topics.find((t) => t.id === topicId);
          if (topic) return topic;
        }
        return null;
      },

      toggleTopicLike: (topicId: string) => {
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

      toggleTopicCheck: (topicId: string) => {
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

      updateTopicProgress: (topicId: string, progress: number) => {
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

      getLikedTopics: () => {
        const { subjects } = get();
        return subjects.flatMap((subject) =>
          subject.topics.filter((topic) => topic.isLiked)
        );
      },

      getCheckedTopics: () => {
        const { subjects } = get();
        return subjects.flatMap((subject) =>
          subject.topics.filter((topic) => topic.isChecked)
        );
      },

      getCompletedTopics: () => {
        const { subjects } = get();
        return subjects.flatMap((subject) =>
          subject.topics.filter((topic) => topic.progress === 100)
        );
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        subjects: state.subjects,
      }),
    }
  )
);
