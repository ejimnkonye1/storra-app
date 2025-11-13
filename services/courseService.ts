import axios from 'axios';
import { BASE_URL } from '../backendconfig';

export const getCourses = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/classes/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Get courses error:', error.response?.data || error.message);
    throw error;
  }
};

export const getCourseTopics = async (token: string, courseId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/classes/courses/${courseId}/topics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Get course topics error:', error.response?.data || error.message);
    throw error;
  }
};