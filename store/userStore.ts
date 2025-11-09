import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  email: string;
  username: string;
  fullname: string;
  role: string;
  phoneNumber: string;
  createdAt: string;
  profileImage?: string;
}

interface UserStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
  loadUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  token: null,
  isLoading: true,

  setUser: (user) => set({ user }),

  setToken: async (token) => {
    await AsyncStorage.setItem('access_token', token);
    set({ token });
  },

  clearUser: () => set({ user: null, token: null }),

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
    await AsyncStorage.removeItem('access_token');
    set({ user: null, token: null });
  },
}));