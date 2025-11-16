import { create } from 'zustand';
import { BASE_URL } from "@/backendconfig";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// ============= REWARDS TYPES =============
export type RewardType = 'coins' | 'points' | 'spin_chance' | 'trial_access';

interface Reward {
  type: RewardType;
  amount: number;
  description: string;
}

interface DailyReward {
  day: number;
  month: number;
  year: number;
  rewards: Reward[];
  claimed: boolean;
  claimedAt?: string;
}

interface Achievement {
  achievementId: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  rewardType: RewardType;
  rewardAmount: number;
  condition: string;
  unlockedAt?: string;
  claimed: boolean;
  claimedAt?: string;
}

interface UserRewards {
  totalCoins: number;
  totalPoints: number;
  spinChances: number;
  trialDaysRemaining: number;
  currentStreak: number;
  longestStreak: number;
  lastLoginDate?: string;
  dailyRewards: DailyReward[];
  achievements: Achievement[];
  lastFetched?: string;
}

// ============= STORE INTERFACE =============
interface UserStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  subjects: Subject[];
  selectedSubject: number;

  // Rewards State
  rewards: UserRewards | null;
  rewardsLoading: boolean;
  rewardsError: string | null;

  // User Actions
  setUser: (user: User) => void;
  setToken: (token: string) => Promise<void>;
  clearUser: () => void;
  loadUser: () => Promise<void>;
  logout: () => Promise<void>;

  // Subject Actions
  setSubjects: (subjects: Subject[]) => void;
  setSelectedSubject: (index: number) => void;
  clearSubjects: () => void;
  getSelectedSubjectData: () => Subject | null;
  getTopicById: (topicId: string) => Topic | null;

  // Topic Actions
  toggleTopicLike: (topicId: string) => void;
  toggleTopicCheck: (topicId: string) => void;
  updateTopicProgress: (topicId: string, progress: number) => void;
  getLikedTopics: () => Topic[];
  getCheckedTopics: () => Topic[];
  getCompletedTopics: () => Topic[];

  // Rewards Actions
  fetchRewards: () => Promise<void>;
  setRewards: (rewards: UserRewards) => void;
  claimDailyReward: () => Promise<{ success: boolean; message: string; data?: any }>;
  claimAchievement: (achievementId: string) => Promise<{ success: boolean; message: string; data?: any }>;
  updateRewardBalance: (type: RewardType, amount: number, operation: 'add' | 'subtract') => void;
  clearRewards: () => void;
  
  // Helper getters
  canClaimDailyReward: () => boolean;
  getUnclaimedAchievements: () => Achievement[];
  getLockedAchievements: () => Achievement[];
  getClaimedAchievements: () => Achievement[];
}

// ============= API BASE URL =============

// ============= STORE =============
export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true,
      subjects: [],
      selectedSubject: 0,

      // Rewards Initial State
      rewards: null,
      rewardsLoading: false,
      rewardsError: null,

      // ============= USER ACTIONS =============
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
          rewards: null,
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
            rewards: null,
            isLoading: false,
          });
        } catch (error) {
          console.error('Error during logout:', error);
        }
      },

      // ============= SUBJECT ACTIONS =============
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

      // ============= TOPIC ACTIONS =============
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

      // ============= REWARDS ACTIONS =============
      fetchRewards: async () => {
        const token = get().token;
        if (!token) {
          set({ rewardsError: 'No authentication token', rewardsLoading: false });
          return;
        }

        try {
          set({ rewardsLoading: true, rewardsError: null });

          const response = await fetch(`${BASE_URL}/rewards`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();

          if (data.success) {
            set({
              rewards: {
                ...data.data,
                lastFetched: new Date().toISOString(),
              },
              rewardsLoading: false,
              rewardsError: null,
            });
          } else {
            throw new Error('Failed to fetch rewards');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An error occurred';
          set({
            rewardsError: errorMessage,
            rewardsLoading: false,
          });
          console.error('Error fetching rewards:', error);
        }
      },

      setRewards: (rewards) => {
        set({
          rewards: {
            ...rewards,
            lastFetched: new Date().toISOString(),
          },
        });
      },

      claimDailyReward: async () => {
        const token = get().token;
        if (!token) {
          return { success: false, message: 'No authentication token' };
        }

        try {
          const response = await fetch(`${BASE_URL}/rewards/daily-claim`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();

          if (data.success) {
            // Update rewards state
            await get().fetchRewards();
            return {
              success: true,
              message: 'Daily reward claimed successfully!',
              data: data.data,
            };
          } else {
            return {
              success: false,
              message: data.message || 'Failed to claim daily reward',
            };
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An error occurred';
          console.error('Error claiming daily reward:', error);
          return { success: false, message: errorMessage };
        }
      },

      claimAchievement: async (achievementId: string) => {
        const token = get().token;
        if (!token) {
          return { success: false, message: 'No authentication token' };
        }

        try {
          const response = await fetch(
            `${BASE_URL}/rewards/achievement/${achievementId}/claim`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          const data = await response.json();

          if (data.success) {
            // Update rewards state
            await get().fetchRewards();
            return {
              success: true,
              message: 'Achievement claimed successfully!',
              data: data.data,
            };
          } else {
            return {
              success: false,
              message: data.message || 'Failed to claim achievement',
            };
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An error occurred';
          console.error('Error claiming achievement:', error);
          return { success: false, message: errorMessage };
        }
      },

      updateRewardBalance: (type: RewardType, amount: number, operation: 'add' | 'subtract') => {
        const rewards = get().rewards;
        if (!rewards) return;

        const updatedRewards = { ...rewards };

        switch (type) {
          case 'coins':
            updatedRewards.totalCoins =
              operation === 'add'
                ? rewards.totalCoins + amount
                : Math.max(0, rewards.totalCoins - amount);
            break;
          case 'points':
            updatedRewards.totalPoints =
              operation === 'add'
                ? rewards.totalPoints + amount
                : Math.max(0, rewards.totalPoints - amount);
            break;
          case 'spin_chance':
            updatedRewards.spinChances =
              operation === 'add'
                ? rewards.spinChances + amount
                : Math.max(0, rewards.spinChances - amount);
            break;
          case 'trial_access':
            updatedRewards.trialDaysRemaining =
              operation === 'add'
                ? rewards.trialDaysRemaining + amount
                : Math.max(0, rewards.trialDaysRemaining - amount);
            break;
        }

        set({ rewards: updatedRewards });
      },

      clearRewards: () => {
        set({
          rewards: null,
          rewardsLoading: false,
          rewardsError: null,
        });
      },

      // ============= HELPER GETTERS =============
      canClaimDailyReward: () => {
        const rewards = get().rewards;
        if (!rewards) return false;

        const today = new Date().getDate();
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        const todayReward = rewards.dailyRewards.find(
          (dr) => dr.day === today && dr.month === currentMonth && dr.year === currentYear
        );

        return !todayReward?.claimed;
      },

      getUnclaimedAchievements: () => {
        const rewards = get().rewards;
        if (!rewards) return [];
        return rewards.achievements.filter((a) => a.unlockedAt && !a.claimed);
      },

      getLockedAchievements: () => {
        const rewards = get().rewards;
        if (!rewards) return [];
        return rewards.achievements.filter((a) => !a.unlockedAt);
      },

      getClaimedAchievements: () => {
        const rewards = get().rewards;
        if (!rewards) return [];
        return rewards.achievements.filter((a) => a.claimed);
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        subjects: state.subjects,
        rewards: state.rewards, // ✅ Persist rewards too!
      }),
    }
  )
);