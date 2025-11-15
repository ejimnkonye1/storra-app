// services/quizService.ts
import axios from 'axios';
import { BASE_URL } from '../backendconfig';

// -----------------------------
// Types
// -----------------------------
export interface QuizAnswer {
  questionId: string;
  selectedAnswer: string;
}

export interface QuizQuestion {
  questionId: string;
  questionText: string;
  options?: string[];
  correctAnswer?: string;
}

export interface Quiz {
  quizId: string;
  quizTitle: string;
  timeLimit?: string;
  questions: QuizQuestion[];
}

export interface QuizAttemptResponse {
  attemptNumber: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  status: 'new' | 'incomplete' | 'complete';
  pointsEarned: number;
  passed: boolean;
  passingScore: number;
  answers: {
    questionId: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
  message: string;
}

export interface QuizProgress {
  quizId: string;
  status: 'new' | 'incomplete' | 'complete';
  attempts: number;
  bestScore: number;
  bestPercentage: number;
  pointsEarned: number;
  completedAt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: {
    _id: string;
    fullname: string;
    username: string;
    email: string;
  };
  totalPoints: number;
  quizzesCompleted: number;
  perfectScores: number;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  userRank: number | null;
  scope: 'class' | 'education' | 'global';
}

// -----------------------------
// Quiz Service
// -----------------------------
export const quizService = {
  // Get a specific quiz by course & quiz ID
  getQuiz: async (token: string, courseId: string, quizId: string): Promise<Quiz> => {
    const response = await axios.get(`${BASE_URL}/course/${courseId}/quiz/${quizId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    console.log("daaaa",data)

    return {
      quizId: data.quizId ?? quizId,
      quizTitle: data.quizTitle ?? 'Quiz',
      timeLimit: data.timeLimit ?? '—',
      questions: data.questions?.map((q: any) => ({
        questionId: q.questionId,
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer, // optional, may be hidden in backend
      })) ?? [],
    };
  },

  // Submit a quiz attempt
  submitQuizAttempt: async (
    token: string,
    courseId: string,
    quizId: string,
    answers: QuizAnswer[],
    timeSpent?: number
  ): Promise<QuizAttemptResponse> => {
    const response = await axios.post(
      `${BASE_URL}/course/${courseId}/quiz/${quizId}/submit`,
      { answers, timeSpent },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  // Get user's quiz progress for a course
  getCourseProgress: async (token: string, courseId: string): Promise<QuizProgress[]> => {
    const response = await axios.get(`${BASE_URL}/course/${courseId}/progress`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.quizzes ?? [];
  },

  // Get all user quiz statistics
  getUserStats: async (token: string) => {
    const response = await axios.get(`${BASE_URL}/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Get leaderboard
  getLeaderboard: async (
    token: string,
    scope: 'class' | 'education' | 'global' = 'global'
  ): Promise<LeaderboardResponse> => {
    const response = await axios.get(`${BASE_URL}/leaderboard?scope=${scope}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
