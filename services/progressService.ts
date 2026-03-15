import axios from 'axios';
import { BASE_URL } from '../backendconfig';

export const toggleBookmark = async (token: string, lessonId: string, courseId: string) => {
  const res = await axios.put(
    `${BASE_URL}/progress/lesson/${lessonId}/bookmark`,
    { courseId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const toggleFavourite = async (token: string, lessonId: string, courseId: string) => {
  const res = await axios.put(
    `${BASE_URL}/progress/lesson/${lessonId}/favourite`,
    { courseId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const getBookmarks = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/progress/bookmarks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getFavourites = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/progress/favourites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
