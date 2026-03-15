import { BASE_URL } from '@/backendconfig';
import axios from 'axios';
import { useUserStore } from '../store/userStore';

export const getCurrentUser = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/student/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("current user response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error('Get current user error:', error.response?.data || error.message);
    throw error;
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await axios.post(`${BASE_URL}/student/refresh`, { refreshToken });
  return response.data.data as { accessToken: string; refreshToken: string };
};

// Axios interceptor: auto-refresh on 401
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: any) => void }> = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token!);
  });
  failedQueue = [];
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only intercept 401 errors that haven't been retried yet
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Don't retry the refresh endpoint itself
    if (originalRequest.url?.includes('/student/refresh') || originalRequest.url?.includes('/student/loginuser')) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return axios(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const store = useUserStore.getState();
    const storedRefreshToken = store.refreshToken;

    if (!storedRefreshToken) {
      isRefreshing = false;
      store.logout();
      return Promise.reject(error);
    }

    try {
      const tokens = await refreshAccessToken(storedRefreshToken);
      await store.setToken(tokens.accessToken);
      store.setRefreshToken(tokens.refreshToken);

      axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
      originalRequest.headers['Authorization'] = `Bearer ${tokens.accessToken}`;

      processQueue(null, tokens.accessToken);
      return axios(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      store.logout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
