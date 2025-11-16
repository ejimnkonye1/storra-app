// ============================================
// Example 1: When User Completes a Topic/Course
// ============================================
import { useUserStore } from ‘../store/userStore’;
import { onCourseCompleted } from ‘../utils/rewardHelpers’;

export function TopicDetailScreen() {
const { updateTopicProgress } = useUserStore();

const handleTopicComplete = async (topicId: string) => {
// Mark topic as complete
updateTopicProgress(topicId, 100);

```
// Check and unlock course completion achievement
await onCourseCompleted();

// Show success message
Alert.alert('🎉 Topic Completed!', 'Check your rewards!');
```

};

return (
// Your component JSX
);
}

// ============================================
// Example 2: When User Completes a Quiz
// ============================================
import { onQuizCompleted } from ‘../utils/rewardHelpers’;

export function QuizResultScreen() {
const handleQuizResult = async (score: number) => {
// Calculate total quizzes (you’ll need to track this)
const totalQuizzes = 10; // Get from your state/API

```
// Unlock quiz-related achievements
await onQuizCompleted(score, totalQuizzes);

if (score === 100) {
  Alert.alert('🏆 Perfect Score!', 'You unlocked an achievement!');
}
```

};

return (
// Your component JSX
);
}

// ============================================
// Example 3: Show Rewards in Header/Navigation
// ============================================
import { useUserStore } from ‘../store/userStore’;

export function HeaderComponent() {
const { rewards } = useUserStore();

return (
<View className="flex-row items-center">
{/* Coins Display */}
<View className="flex-row items-center bg-yellow-100 px-3 py-1 rounded-full mr-2">
<Ionicons name="diamond" size={16} color="#F59E0B" />
<Text className="ml-1 font-bold text-yellow-800">
{rewards?.totalCoins || 0}
</Text>
</View>

```
  {/* Points Display */}
  <View className="flex-row items-center bg-purple-100 px-3 py-1 rounded-full">
    <Ionicons name="star" size={16} color="#8B5CF6" />
    <Text className="ml-1 font-bold text-purple-800">
      {rewards?.totalPoints || 0}
    </Text>
  </View>
</View>
```

);
}

// ============================================
// Example 4: Daily Login Check (App.tsx or _layout.tsx)
// ============================================
import { useEffect } from ‘react’;
import { useUserStore } from ‘../store/userStore’;
import { checkDailyStreak } from ‘../utils/rewardHelpers’;

export default function App() {
const { user, fetchRewards } = useUserStore();

useEffect(() => {
if (user) {
// Fetch rewards when app loads
fetchRewards();

```
  // Check if user can claim daily reward
  checkDailyStreak().then(({ canClaim }) => {
    if (canClaim) {
      // Show notification or reminder
      console.log('You can claim your daily reward!');
    }
  });
}
```

}, [user]);

return (
// Your app structure
);
}

// ============================================
// Example 5: Spending Coins in Shop
// ============================================
import { spendCoins } from ‘../utils/rewardHelpers’;

export function ShopScreen() {
const handlePurchase = async (itemPrice: number, itemName: string) => {
const result = await spendCoins(itemPrice, `Purchased ${itemName}`);

```
if (result.success) {
  Alert.alert('Success!', `You bought ${itemName}!`);
} else {
  Alert.alert('Oops!', result.message);
}
```

};

return (
<View>
<TouchableOpacity onPress={() => handlePurchase(100, ‘Premium Theme’)}>
<Text>Buy Premium Theme - 100 Coins</Text>
</TouchableOpacity>
</View>
);
}

// ============================================
// Example 6: Achievement Badge Component
// ============================================
import { useUserStore } from ‘../store/userStore’;

export function AchievementBadge() {
const { getUnclaimedAchievements } = useUserStore();
const unclaimedCount = getUnclaimedAchievements().length;

if (unclaimedCount === 0) return null;

return (
<View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
<Text className="text-white text-xs font-bold">{unclaimedCount}</Text>
</View>
);
}

// Usage in Tab Navigation
export function TabBarIcon({ name, focused }) {
return (
<View>
<Ionicons name={name} size={24} color={focused ? ‘#2563EB’ : ‘#9CA3AF’} />
{name === ‘trophy’ && <AchievementBadge />}
</View>
);
}

// ============================================
// Example 7: Streak Reminder Notification
// ============================================
import { useUserStore } from ‘../store/userStore’;

export function DashboardScreen() {
const { rewards, canClaimDailyReward } = useUserStore();
const canClaim = canClaimDailyReward();

return (
<ScrollView>
{/* Streak Banner */}
{canClaim && (
<TouchableOpacity
onPress={() => router.push(’/rewards’)}
className=“bg-orange-500 p-4 rounded-2xl m-4 flex-row items-center”
>
<Ionicons name="flame" size={32} color="#FFFFFF" />
<View className="ml-3 flex-1">
<Text className="text-white font-bold text-lg">
Don’t Break Your Streak!
</Text>
<Text className="text-white opacity-90">
Claim your daily reward now
</Text>
</View>
<Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
</TouchableOpacity>
)}

```
  {/* Streak Progress */}
  <View className="bg-white p-4 rounded-2xl m-4">
    <Text className="font-bold text-lg mb-2">Your Progress</Text>
    <View className="flex-row items-center">
      <Ionicons name="flame" size={24} color="#F97316" />
      <Text className="ml-2 text-gray-700">
        {rewards?.currentStreak || 0} day streak
      </Text>
    </View>
  </View>

  {/* Rest of your dashboard */}
</ScrollView>
```

);
}

// ============================================
// Example 8: Profile Screen with Rewards Summary
// ============================================
import { useUserStore } from ‘../store/userStore’;
import { getRewardSummary } from ‘../utils/rewardHelpers’;

export function ProfileScreen() {
const summary = getRewardSummary();

return (
<ScrollView>
{/* Rewards Summary Card */}
<View className="bg-white p-4 rounded-2xl m-4">
<Text className="font-bold text-lg mb-4">Your Rewards</Text>

```
    <View className="flex-row justify-between mb-3">
      <View className="flex-row items-center">
        <Ionicons name="diamond" size={20} color="#F59E0B" />
        <Text className="ml-2 text-gray-700">Coins</Text>
      </View>
      <Text className="font-bold text-gray-900">{summary.coins}</Text>
    </View>

    <View className="flex-row justify-between mb-3">
      <View className="flex-row items-center">
        <Ionicons name="star" size={20} color="#8B5CF6" />
        <Text className="ml-2 text-gray-700">Points</Text>
      </View>
      <Text className="font-bold text-gray-900">{summary.points}</Text>
    </View>

    <View className="flex-row justify-between mb-3">
      <View className="flex-row items-center">
        <Ionicons name="flame" size={20} color="#F97316" />
        <Text className="ml-2 text-gray-700">Streak</Text>
      </View>
      <Text className="font-bold text-gray-900">{summary.streak} days</Text>
    </View>

    {summary.unclaimedAchievements > 0 && (
      <TouchableOpacity
        onPress={() => router.push('/rewards')}
        className="bg-green-500 p-3 rounded-full mt-2"
      >
        <Text className="text-white font-bold text-center">
          Claim {summary.unclaimedAchievements} Achievement
          {summary.unclaimedAchievements > 1 ? 's' : ''}! 🏆
        </Text>
      </TouchableOpacity>
    )}
  </View>
</ScrollView>
```

);
}

// ============================================
// Example 9: First Login Achievement
// ============================================
import { useEffect } from ‘react’;
import { useUserStore } from ‘../store/userStore’;
import { unlockAchievement } from ‘../utils/rewardHelpers’;

export function useFirstLoginAchievement() {
const { user, rewards } = useUserStore();

useEffect(() => {
if (user && rewards) {
const firstLoginAchievement = rewards.achievements.find(
(a) => a.achievementId === ‘first_login’
);

```
  if (firstLoginAchievement && !firstLoginAchievement.unlockedAt) {
    // This is their first login!
    unlockAchievement('first_login');
  }
}
```

}, [user, rewards]);
}

// Use in your main layout
export default function RootLayout() {
useFirstLoginAchievement();

return (
// Your layout
);
}