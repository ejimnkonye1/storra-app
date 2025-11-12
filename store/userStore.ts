import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Subject {
  id: string;
  name: string;
  code: string;
  image?: string;
  topics: Topic[];
}

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
  isLiked?: boolean;      // Added
  isChecked?: boolean;    // Added
  progress?: number;      // Added for tracking completion
}

interface User {
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
}

interface UserStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  subjects: Subject[];
  selectedSubject: number;
  
  // User actions
  setUser: (user: User) => void;
  setToken: (token: string) => Promise<void>;
  clearUser: () => void;
  loadUser: () => Promise<void>;
  logout: () => Promise<void>;
  
  // Subject actions
  setSubjects: (subjects: Subject[]) => void;
  setSelectedSubject: (index: number) => void;
  clearSubjects: () => void;
  getSelectedSubjectData: () => Subject | null;
  getTopicById: (topicId: string) => Topic | null;
  
  // Topic interaction actions
  toggleTopicLike: (topicId: string) => void;
  toggleTopicCheck: (topicId: string) => void;
  updateTopicProgress: (topicId: string, progress: number) => void;
  
  // Utility getters
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

      // ============ User Management ============
      setUser: (user) => set({ user }),

      setToken: async (token) => {
        try {
          await AsyncStorage.setItem('access_token', token);
          set({ token });
        } catch (error) {
          console.error('Error saving token:', error);
        }
      },

      clearUser: () => set({ 
        user: null, 
        token: null, 
        subjects: [], 
        selectedSubject: 0 
      }),

      loadUser: async () => {
        try {
          const token = await AsyncStorage.getItem('access_token');
          if (token) {
            set({ token, isLoading: false });
          } else {
            set({ isLoading: false });
          }
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
            selectedSubject: 0 
          });
        } catch (error) {
          console.error('Error during logout:', error);
        }
      },

      // ============ Subject Management ============
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
          const topic = subject.topics.find(t => t.id === topicId);
          if (topic) return topic;
        }
        return null;
      },

      // ============ Topic Interactions ============
      toggleTopicLike: (topicId: string) => {
        const { subjects } = get();
        const updatedSubjects = subjects.map(subject => ({
          ...subject,
          topics: subject.topics.map(topic =>
            topic.id === topicId
              ? { ...topic, isLiked: !topic.isLiked }
              : topic
          ),
        }));
        set({ subjects: updatedSubjects });
      },

      toggleTopicCheck: (topicId: string) => {
        const { subjects } = get();
        const updatedSubjects = subjects.map(subject => ({
          ...subject,
          topics: subject.topics.map(topic =>
            topic.id === topicId
              ? { ...topic, isChecked: !topic.isChecked }
              : topic
          ),
        }));
        set({ subjects: updatedSubjects });
      },

      updateTopicProgress: (topicId: string, progress: number) => {
        const { subjects } = get();
        const updatedSubjects = subjects.map(subject => ({
          ...subject,
          topics: subject.topics.map(topic =>
            topic.id === topicId
              ? { ...topic, progress }
              : topic
          ),
        }));
        set({ subjects: updatedSubjects });
      },

      // ============ Utility Getters ============
      getLikedTopics: () => {
        const { subjects } = get();
        return subjects.flatMap(subject =>
          subject.topics.filter(topic => topic.isLiked)
        );
      },

      getCheckedTopics: () => {
        const { subjects } = get();
        return subjects.flatMap(subject =>
          subject.topics.filter(topic => topic.isChecked)
        );
      },

      getCompletedTopics: () => {
        const { subjects } = get();
        return subjects.flatMap(subject =>
          subject.topics.filter(topic => topic.progress === 100)
        );
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Persist user, token, and subjects (including interaction states)
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        subjects: state.subjects, // Now persisting subjects with like/check states
      }),
    }
  )
);