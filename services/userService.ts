import { BASE_URL } from '@/backendconfig';
import axios from 'axios';

export const getCurrentUser = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/student/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
        console.log("current user response:",response.data)
    return response.data;

  } catch (error: any) {
    console.error('Get current user error:', error.response?.data || error.message);
    throw error;
  }
};