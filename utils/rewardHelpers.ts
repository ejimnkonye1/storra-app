import { useUserStore } from '../store/userStore';
import { BASE_URL } from "@/backendconfig";


/**
 * Unlock an achievement for the current user
 * Call this from anywhere in your app when a user completes an action
 */
export const unlockAchievement = async (achievementId: string) => {
  const token = useUserStore.getState().token;

  if (!token) {
    console.error('No authentication token available');
    return { success: false, message: 'Not authenticated' };
  }

  try {
    const response = await fetch(`${BASE_URL}/rewards/unlock-achievement`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ achievementId }),
    });

    const data = await response.json();

    if (data.success) {
      // Refresh rewards in the store
      await useUserStore.getState().fetchRewards();
      return { success: true, message: 'Achievement unlocked!' };
    }

    return { success: false, message: data.message || 'Failed to unlock achievement' };
  } catch (error) {
    console.error('Error unlocking achievement:', error);
    return { success: false, message: 'Network error' };
  }
};

/**
 * Track course completion and unlock relevant achievements
 */
export const onCourseCompleted = async () => {
  const completedTopics = useUserStore.getState().getCompletedTopics();
  const isFirstCourse = completedTopics.length === 1;

  if (isFirstCourse) {
    await unlockAchievement('first_course_completed');
  }

  // Refresh rewards to get updated data
  await useUserStore.getState().fetchRewards();
};

/**
 * Track quiz completion and unlock achievements
 */
export const onQuizCompleted = async (score: number, totalQuizzes: number) => {
  // Perfect score achievement
  if (score === 100) {
    await unlockAchievement('perfect_quiz_score');
  }

  // 10 quizzes completed achievement
  if (totalQuizzes === 10) {
    await unlockAchievement('10_quizzes_completed');
  }

  // Refresh rewards
  await useUserStore.getState().fetchRewards();
};

/**
 * Check and update streak on app launch
 * Call this when the app starts or user logs in
 */
export const checkDailyStreak = async () => {
  const rewards = useUserStore.getState().rewards;

  if (!rewards) {
    // Fetch rewards if not loaded
    await useUserStore.getState().fetchRewards();
  }

  // The backend handles streak calculation when claiming daily reward
  // But we can check if user can claim today
  const canClaim = useUserStore.getState().canClaimDailyReward();
  
  return { canClaim };
};

/**
 * Spend coins for in-app purchases
 */
export const spendCoins = async (amount: number, reason: string) => {
  const rewards = useUserStore.getState().rewards;

  if (!rewards || rewards.totalCoins < amount) {
    return { success: false, message: 'Insufficient coins' };
  }

  // Update local state immediately for instant feedback
  useUserStore.getState().updateRewardBalance('coins', amount, 'subtract');

  // TODO: Send to backend to record transaction
  // You can create a new endpoint for this if needed

  return { success: true, message: 'Coins spent successfully' };
};

/**
 * Spend points for rewards
 */
export const spendPoints = async (amount: number, reason: string) => {
  const rewards = useUserStore.getState().rewards;

  if (!rewards || rewards.totalPoints < amount) {
    return { success: false, message: 'Insufficient points' };
  }

  // Update local state
  useUserStore.getState().updateRewardBalance('points', amount, 'subtract');

  // TODO: Send to backend to record transaction

  return { success: true, message: 'Points spent successfully' };
};

/**
 * Use a spin chance
 */
export const useSpinChance = async () => {
  const rewards = useUserStore.getState().rewards;

  if (!rewards || rewards.spinChances < 1) {
    return { success: false, message: 'No spin chances available' };
  }

  // Update local state
  useUserStore.getState().updateRewardBalance('spin_chance', 1, 'subtract');

  // TODO: Implement spin logic and send to backend

  return { success: true, message: 'Spin chance used!' };
};

/**
 * Get reward summary for display
 */
export const getRewardSummary = () => {
  const rewards = useUserStore.getState().rewards;

  if (!rewards) {
    return {
      coins: 0,
      points: 0,
      spins: 0,
      trialDays: 0,
      streak: 0,
      unclaimedAchievements: 0,
    };
  }

  return {
    coins: rewards.totalCoins,
    points: rewards.totalPoints,
    spins: rewards.spinChances,
    trialDays: rewards.trialDaysRemaining,
    streak: rewards.currentStreak,
    unclaimedAchievements: useUserStore.getState().getUnclaimedAchievements().length,
  };
};

/**
 * Example: Show achievement notification
 * You can use this with a toast/notification library
 */
export const showAchievementNotification = (title: string, description: string) => {
  // TODO: Implement with your notification library
  // Example: Toast.show({ text: `🏆 ${title}`, description })
  console.log(`🏆 Achievement Unlocked: ${title} - ${description}`);
};