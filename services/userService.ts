import axios from 'axios';
import { BASE_URL } from '@/backendconfig';

export const getCurrentUser = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/student/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Get current user error:', error.response?.data || error.message);
    throw error;
  }
};