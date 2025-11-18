import { BASE_URL } from '../backendconfig';

/**
 * Update progress for a specific lesson
 */
export const updateLessonProgress = async (
  token: string,
  courseId: string,
  lessonId: string,
  data: Record<string, any> = {}
) => {
  const body = { ...data, courseId };
  console.log('Updating lesson progress with body:', body);

  const res = await fetch(`${BASE_URL}/progress/lesson/${lessonId}`, {
    method: 'PUT',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const resData = await res.json();
  console.log('Response from updateLessonProgress:', resData);

  if (!res.ok) {
    throw new Error(resData.message || 'Failed to update lesson progress');
  }

  return resData;
};

/**
 * Mark a lesson as completed
 */
export const markLessonCompleted = async (
  token: string,
  courseId: string,
  lessonId: string,
  data: Record<string, any> = {}
) => {
  const body = { ...data, courseId };
  console.log('Marking lesson completed with body:', body);

  const res = await fetch(`${BASE_URL}/progress/lesson/${lessonId}/complete`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const resData = await res.json();
  console.log('Response from markLessonCompleted:', resData);

  if (!res.ok) {
    throw new Error(resData.message || 'Failed to mark lesson completed');
  }

  return resData;
};
