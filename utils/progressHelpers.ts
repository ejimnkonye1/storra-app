// utils/progressHelpers.ts
import { useUserStore } from '../store/userStore';
import { BASE_URL } from '@/backendconfig';
const API_BASE_URL = BASE_URL

// ============================================
// LESSON PROGRESS HELPERS
// ============================================

/**
 * Update lesson progress
 */
export const updateLessonProgress = async (
  lessonId: string,
  courseId: string,
  data: {
    progress?: number;
    timeSpent?: number;
    videoWatchPercentage?: number;
    audioListenPercentage?: number;
    textReadPercentage?: number;
  }
) => {
  const token = useUserStore.getState().token;

  if (!token) {
    console.error('No authentication token');
    return { success: false, message: 'Not authenticated' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/progress/lesson/${lessonId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId, ...data }),
    });

    const result = await response.json();

    if (result.success) {
      return { success: true, data: result.data };
    }

    return { success: false, message: result.message };
  } catch (error) {
    console.error('Error updating lesson progress:', error);
    return { success: false, message: 'Network error' };
  }
};

/**
 * Mark lesson as completed
 */
export const markLessonCompleted = async (lessonId: string, courseId: string) => {
  const token = useUserStore.getState().token;

  if (!token) {
    console.error('No authentication token');
    return { success: false, message: 'Not authenticated' };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/progress/lesson/${lessonId}/complete`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId }),
      }
    );

    const result = await response.json();

    if (result.success) {
      return { success: true, data: result.data };
    }

    return { success: false, message: result.message };
  } catch (error) {
    console.error('Error completing lesson:', error);
    return { success: false, message: 'Network error' };
  }
};

/**
 * Toggle lesson bookmark
 */
export const toggleLessonBookmark = async (lessonId: string, courseId: string) => {
  const token = useUserStore.getState().token;

  if (!token) {
    console.error('No authentication token');
    return { success: false, message: 'Not authenticated' };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/progress/lesson/${lessonId}/bookmark`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId }),
      }
    );

    const result = await response.json();

    if (result.success) {
      return { success: true, isBookmarked: result.data.isBookmarked };
    }

    return { success: false, message: result.message };
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    return { success: false, message: 'Network error' };
  }
};

/**
 * Update lesson notes
 */
export const updateLessonNotes = async (
  lessonId: string,
  courseId: string,
  notes: string
) => {
  const token = useUserStore.getState().token;

  if (!token) {
    console.error('No authentication token');
    return { success: false, message: 'Not authenticated' };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/progress/lesson/${lessonId}/notes`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId, notes }),
      }
    );

    const result = await response.json();

    if (result.success) {
      return { success: true, data: result.data };
    }

    return { success: false, message: result.message };
  } catch (error) {
    console.error('Error updating notes:', error);
    return { success: false, message: 'Network error' };
  }
};

// ============================================
// COURSE PROGRESS HELPERS
// ============================================

/**
 * Get course progress overview
 */
export const getCourseProgress = async (courseId: string) => {
  const token = useUserStore.getState().token;

  if (!token) {
    console.error('No authentication token');
    return { success: false, message: 'Not authenticated' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/progress/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (result.success) {
      return { success: true, data: result.data };
    }

    return { success: false, message: result.message };
  } catch (error) {
    console.error('Error fetching course progress:', error);
    return { success: false, message: 'Network error' };
  }
};

/**
 * Get all bookmarked lessons
 */
export const getBookmarkedLessons = async () => {
  const token = useUserStore.getState().token;

  if (!token) {
    console.error('No authentication token');
    return { success: false, message: 'Not authenticated' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/progress/bookmarks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (result.success) {
      return { success: true, data: result.data };
    }

    return { success: false, message: result.message };
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return { success: false, message: 'Network error' };
  }
};

/**
 * Get overall learning statistics
 */
export const getLearningStats = async () => {
  const token = useUserStore.getState().token;

  if (!token) {
    console.error('No authentication token');
    return { success: false, message: 'Not authenticated' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/progress/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (result.success) {
      return { success: true, data: result.data };
    }

    return { success: false, message: result.message };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { success: false, message: 'Network error' };
  }
};

// ============================================
// TIME TRACKING HELPERS
// ============================================

/**
 * Time tracker class for automatic progress updates
 */
export class LessonTimeTracker {
  private lessonId: string;
  private courseId: string;
  private startTime: number;
  private totalTime: number = 0;
  private interval: number | null = null;
  private updateInterval: number = 30000; // 30 seconds

  constructor(lessonId: string, courseId: string) {
    this.lessonId = lessonId;
    this.courseId = courseId;
    this.startTime = Date.now();
  }

  /**
   * Start tracking time
   */
  start() {
    this.startTime = Date.now();

    // Update progress every 30 seconds
    this.interval = setInterval(() => {
      this.sendUpdate();
    }, this.updateInterval);
  }

  /**
   * Stop tracking and send final update
   */
  async stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    await this.sendUpdate();
  }

  /**
   * Get elapsed time in seconds
   */
  getElapsedTime(): number {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  /**
   * Send update to backend
   */
  private async sendUpdate() {
    const timeSpent = this.getElapsedTime();

    if (timeSpent > 0) {
      await updateLessonProgress(this.lessonId, this.courseId, {
        timeSpent,
      });
    }
  }
}

// ============================================
// VIDEO PROGRESS TRACKER
// ============================================

/**
 * Track video watch progress
 */
export class VideoProgressTracker {
  private lessonId: string;
  private courseId: string;
  private lastUpdatePercentage: number = 0;
  private updateThreshold: number = 10; // Update every 10%

  constructor(lessonId: string, courseId: string) {
    this.lessonId = lessonId;
    this.courseId = courseId;
  }

  /**
   * Handle video progress update
   */
  async handleProgress(currentTime: number, duration: number) {
    if (!duration || duration === 0) return;

    const percentage = Math.min(100, (currentTime / duration) * 100);

    // Update every 10%
    if (
      Math.abs(percentage - this.lastUpdatePercentage) >= this.updateThreshold ||
      percentage === 100
    ) {
      await updateLessonProgress(this.lessonId, this.courseId, {
        videoWatchPercentage: Math.round(percentage),
        progress: Math.round(percentage),
      });

      this.lastUpdatePercentage = percentage;
    }
  }

  /**
   * Handle video completion
   */
  async handleComplete() {
    await markLessonCompleted(this.lessonId, this.courseId);
  }
}

// ============================================
// SCROLL PROGRESS TRACKER (for text lessons)
// ============================================

/**
 * Track reading progress based on scroll
 */
export class ScrollProgressTracker {
  private lessonId: string;
  private courseId: string;
  private lastUpdatePercentage: number = 0;
  private updateThreshold: number = 10; // Update every 10%

  constructor(lessonId: string, courseId: string) {
    this.lessonId = lessonId;
    this.courseId = courseId;
  }

  /**
   * Calculate scroll percentage
   */
  calculateScrollPercentage(
    scrollY: number,
    contentHeight: number,
    containerHeight: number
  ): number {
    const scrollableHeight = contentHeight - containerHeight;
    if (scrollableHeight <= 0) return 100;

    return Math.min(100, (scrollY / scrollableHeight) * 100);
  }

  /**
   * Handle scroll update
   */
  async handleScroll(scrollPercentage: number) {
    if (
      Math.abs(scrollPercentage - this.lastUpdatePercentage) >= this.updateThreshold ||
      scrollPercentage >= 95 // Consider 95% as complete
    ) {
      await updateLessonProgress(this.lessonId, this.courseId, {
        textReadPercentage: Math.round(scrollPercentage),
        progress: Math.round(scrollPercentage),
      });

      this.lastUpdatePercentage = scrollPercentage;

      // Auto-complete at 95%
      if (scrollPercentage >= 95) {
        await markLessonCompleted(this.lessonId, this.courseId);
      }
    }
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format time in seconds to readable string
 */
export const formatTimeSpent = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
};

/**
 * Calculate completion percentage
 */
export const calculateCompletionPercentage = (
  completed: number,
  total: number
): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

/**
 * Get status badge color
 */
export const getStatusColor = (
  status: 'not_started' | 'in_progress' | 'completed'
): string => {
  switch (status) {
    case 'completed':
      return '#10B981'; // green
    case 'in_progress':
      return '#F59E0B'; // amber
    case 'not_started':
      return '#9CA3AF'; // gray
    default:
      return '#9CA3AF';
  }
};

/**
 * Get status badge text
 */
export const getStatusText = (
  status: 'not_started' | 'in_progress' | 'completed'
): string => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in_progress':
      return 'In Progress';
    case 'not_started':
      return 'Not Started';
    default:
      return 'Unknown';
  }
};