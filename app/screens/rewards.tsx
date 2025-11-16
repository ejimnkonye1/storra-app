import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInRight,
  BounceIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  ZoomIn,
} from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { useUserStore } from "@/store/userStore";

export default function RewardScreen() {
  const router = useRouter();
  
  // Zustand store
  const {
    rewards,
    rewardsLoading,
    rewardsError,
    fetchRewards,
    claimDailyReward,
    claimAchievement,
    canClaimDailyReward,
    getUnclaimedAchievements,
    getLockedAchievements,
    getClaimedAchievements,
  } = useUserStore();

  const [claiming, setClaiming] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Animation values
  const streakScale = useSharedValue(1);
  const coinsRotate = useSharedValue(0);

  useEffect(() => {
    // Fetch rewards on mount
    fetchRewards();

    // Flame pulsing animation
    streakScale.value = withRepeat(
      withSequence(
        withSpring(1.15, { damping: 2, stiffness: 100 }),
        withSpring(1, { damping: 2, stiffness: 100 })
      ),
      -1,
      true
    );

    // Coin rotation animation
    coinsRotate.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRewards();
    setRefreshing(false);
  };

  const handleClaimDaily = async () => {
    if (claiming) return;

    setClaiming("daily");
    const result = await claimDailyReward();

    if (result.success) {
      Alert.alert(
        "🎉 Reward Claimed!",
        `You earned ${result.data?.rewards
          ?.map((r: any) => `${r.amount} ${r.type}`)
          .join(", ")}!\n\nStreak: ${result.data?.streak} days`,
        [{ text: "Awesome!" }]
      );
    } else {
      Alert.alert("Info", result.message);
    }

    setClaiming(null);
  };

  const handleClaimAchievement = async (achievementId: string, title: string) => {
    if (claiming) return;

    setClaiming(achievementId);
    const result = await claimAchievement(achievementId);

    if (result.success) {
      Alert.alert(
        "🏆 Achievement Unlocked!",
        `${title}\n\nYou earned ${result.data?.achievement?.rewardAmount} ${result.data?.achievement?.rewardType}!`,
        [{ text: "Great!" }]
      );
    } else {
      Alert.alert("Info", result.message);
    }

    setClaiming(null);
  };

  const streakAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: streakScale.value }],
  }));

  const coinsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${coinsRotate.value}deg` }],
  }));

  // Loading state
  if (rewardsLoading && !rewards) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="mt-4 text-gray-600 font-medium">
          Loading rewards...
        </Text>
      </View>
    );
  }

  // Error state
  if (rewardsError && !rewards) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center px-5">
        <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
        <Text className="mt-4 text-xl font-bold text-gray-900">Oops!</Text>
        <Text className="mt-2 text-gray-600 text-center">{rewardsError}</Text>
        <TouchableOpacity
          onPress={fetchRewards}
          className="mt-6 bg-blue-600 px-6 py-3 rounded-full"
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // No rewards data
  if (!rewards) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center px-5">
        <Ionicons name="gift-outline" size={64} color="#9CA3AF" />
        <Text className="mt-4 text-xl font-bold text-gray-900">
          No Rewards Yet
        </Text>
        <Text className="mt-2 text-gray-600 text-center">
          Start your learning journey to earn rewards!
        </Text>
        <TouchableOpacity
          onPress={fetchRewards}
          className="mt-6 bg-blue-600 px-6 py-3 rounded-full"
        >
          <Text className="text-white font-semibold">Check Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const unlockedAchievements = getUnclaimedAchievements();
  const lockedAchievements = getLockedAchievements();
  const claimedAchievements = getClaimedAchievements();
  const canClaim = canClaimDailyReward();

  return (
    <View className="flex-1 bg-gray-50 pt-12 px-5">
      {/* Header */}
      <Animated.View
        entering={FadeInDown.duration(400)}
        className="flex-row items-center mb-6"
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-bold text-gray-900">
          My Rewards
        </Text>
        <TouchableOpacity onPress={handleRefresh}>
          <Ionicons name="refresh" size={24} color="#2563EB" />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Streak Card */}
        <Animated.View entering={BounceIn.delay(200).duration(600)}>
          <Animatable.View
            animation="pulse"
            iterationCount="infinite"
            duration={2000}
            className="bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl shadow-lg p-5 mb-4 flex-row items-center"
            style={{
              backgroundColor: "#F97316",
              shadowColor: "#F97316",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 10,
            }}
          >
            <Animated.View style={streakAnimatedStyle}>
              <Ionicons name="flame" size={36} color="#FFFFFF" />
            </Animated.View>
            <View className="ml-4 flex-1">
              <Text className="text-3xl font-extrabold text-white">
                {rewards.currentStreak} Days 🔥
              </Text>
              <Text className="text-white opacity-95 mt-1 text-base">
                Longest: {rewards.longestStreak} days
              </Text>
            </View>
          </Animatable.View>
        </Animated.View>

        {/* Daily Claim Button */}
        {canClaim && (
          <Animated.View entering={ZoomIn.delay(300).duration(500)}>
            <TouchableOpacity
              onPress={handleClaimDaily}
              disabled={claiming === "daily"}
              activeOpacity={0.8}
              style={{
                backgroundColor: "#16A34A",
                shadowColor: "#16A34A",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 8,
              }}
              className="rounded-3xl p-5 mb-5 flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1">
                <Animated.View style={coinsAnimatedStyle}>
                  <Ionicons name="gift" size={32} color="#FFFFFF" />
                </Animated.View>
                <View className="ml-4 flex-1">
                  <Text className="text-xl font-bold text-white">
                    Claim Today&apos;s Reward
                  </Text>
                  <Text className="text-white opacity-90 mt-1">
                    Daily login bonus ready!
                  </Text>
                </View>
              </View>
              {claiming === "daily" ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <View className="bg-white/20 rounded-full p-2">
                  <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Balance Grid */}
        <Animated.View
          entering={FadeInUp.delay(400).duration(500)}
          className="flex-row flex-wrap justify-between mb-6"
        >
          <Animatable.View
            animation="fadeInLeft"
            delay={500}
            className="w-[48%] bg-white rounded-2xl p-4 mb-3"
            style={{
              shadowColor: "#F59E0B",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 4,
            }}
          >
            <View className="bg-yellow-100 w-12 h-12 rounded-full items-center justify-center mb-2">
              <Ionicons name="diamond" size={24} color="#F59E0B" />
            </View>
            <Text className="text-3xl font-bold text-gray-900">
              {rewards.totalCoins}
            </Text>
            <Text className="text-gray-500 text-sm mt-1">Coins</Text>
          </Animatable.View>

          <Animatable.View
            animation="fadeInRight"
            delay={600}
            className="w-[48%] bg-white rounded-2xl p-4 mb-3"
            style={{
              shadowColor: "#8B5CF6",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 4,
            }}
          >
            <View className="bg-purple-100 w-12 h-12 rounded-full items-center justify-center mb-2">
              <Ionicons name="star" size={24} color="#8B5CF6" />
            </View>
            <Text className="text-3xl font-bold text-gray-900">
              {rewards.totalPoints}
            </Text>
            <Text className="text-gray-500 text-sm mt-1">Points</Text>
          </Animatable.View>

          {rewards.spinChances > 0 && (
            <Animatable.View
              animation="fadeInLeft"
              delay={700}
              className="w-[48%] bg-white rounded-2xl p-4 mb-3"
              style={{
                shadowColor: "#EC4899",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 6,
                elevation: 4,
              }}
            >
              <View className="bg-pink-100 w-12 h-12 rounded-full items-center justify-center mb-2">
                <Ionicons name="refresh-circle" size={24} color="#EC4899" />
              </View>
              <Text className="text-3xl font-bold text-gray-900">
                {rewards.spinChances}
              </Text>
              <Text className="text-gray-500 text-sm mt-1">Spins</Text>
            </Animatable.View>
          )}

          {rewards.trialDaysRemaining > 0 && (
            <Animatable.View
              animation="fadeInRight"
              delay={800}
              className="w-[48%] bg-white rounded-2xl p-4 mb-3"
              style={{
                shadowColor: "#2563EB",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 6,
                elevation: 4,
              }}
            >
              <View className="bg-blue-100 w-12 h-12 rounded-full items-center justify-center mb-2">
                <Ionicons name="time" size={24} color="#2563EB" />
              </View>
              <Text className="text-3xl font-bold text-gray-900">
                {rewards.trialDaysRemaining}
              </Text>
              <Text className="text-gray-500 text-sm mt-1">Trial Days</Text>
            </Animatable.View>
          )}
        </Animated.View>

        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <>
            <Animated.Text
              entering={FadeInRight.delay(600).duration(500)}
              className="text-lg font-bold text-gray-800 mb-3 mt-2"
            >
              🏆 Unlocked - Tap to Claim!
            </Animated.Text>

            {unlockedAchievements.map((achievement, index) => (
              <Animated.View
                key={achievement.achievementId}
                entering={FadeInUp.delay(700 + index * 100).duration(500)}
              >
                <TouchableOpacity
                  onPress={() =>
                    handleClaimAchievement(
                      achievement.achievementId,
                      achievement.title
                    )
                  }
                  disabled={claiming === achievement.achievementId}
                  activeOpacity={0.7}
                >
                  <Animatable.View
                    animation="bounceIn"
                    delay={700 + index * 100}
                    className="bg-white rounded-3xl p-4 mb-3 flex-row justify-between items-center"
                    style={{
                      shadowColor: "#10B981",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 8,
                      elevation: 5,
                    }}
                  >
                    <View className="flex-row items-center flex-1">
                      <View
                        className={`w-14 h-14 ${achievement.color} rounded-full items-center justify-center`}
                      >
                        <Ionicons
                          name={achievement.icon as any}
                          size={26}
                          color="#2563EB"
                        />
                      </View>
                      <View className="ml-4 flex-1">
                        <Text className="text-gray-900 font-bold text-base">
                          {achievement.title}
                        </Text>
                        <Text className="text-green-600 font-semibold text-sm mt-1">
                          +{achievement.rewardAmount} {achievement.rewardType}
                        </Text>
                      </View>
                    </View>

                    {claiming === achievement.achievementId ? (
                      <ActivityIndicator size="small" color="#16A34A" />
                    ) : (
                      <View className="bg-green-500 px-5 py-2 rounded-full">
                        <Text className="text-white font-bold">Claim</Text>
                      </View>
                    )}
                  </Animatable.View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </>
        )}

        {/* Locked Achievements */}
        {lockedAchievements.length > 0 && (
          <>
            <Animated.Text
              entering={FadeInRight.delay(800).duration(500)}
              className="text-lg font-bold text-gray-800 mb-3 mt-4"
            >
              🔒 Keep Going!
            </Animated.Text>

            {lockedAchievements.map((achievement, index) => (
              <Animated.View
                key={achievement.achievementId}
                entering={FadeInUp.delay(900 + index * 80).duration(500)}
              >
                <Animatable.View
                  animation="fadeIn"
                  delay={900 + index * 80}
                  className="bg-gray-50 rounded-3xl p-4 mb-3 flex-row items-center border border-gray-200"
                >
                  <View className="w-14 h-14 bg-gray-200 rounded-full items-center justify-center">
                    <Ionicons
                      name={achievement.icon as any}
                      size={26}
                      color="#9CA3AF"
                    />
                  </View>
                  <View className="ml-4 flex-1">
                    <Text className="text-gray-600 font-bold text-base">
                      {achievement.title}
                    </Text>
                    <Text className="text-gray-400 text-sm mt-1">
                      {achievement.description}
                    </Text>
                  </View>
                  <Ionicons name="lock-closed" size={22} color="#9CA3AF" />
                </Animatable.View>
              </Animated.View>
            ))}
          </>
        )}

        {/* Claimed Achievements */}
        {claimedAchievements.length > 0 && (
          <>
            <Animated.Text
              entering={FadeInRight.delay(1000).duration(500)}
              className="text-lg font-bold text-gray-800 mb-3 mt-4"
            >
              ✅ Completed
            </Animated.Text>

            {claimedAchievements.map((achievement, index) => (
              <Animated.View
                key={achievement.achievementId}
                entering={FadeInUp.delay(1100 + index * 80).duration(500)}
              >
                <Animatable.View
                  animation="fadeIn"
                  delay={1100 + index * 80}
                  className="bg-white rounded-3xl p-4 mb-3 flex-row items-center"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 3,
                    elevation: 2,
                  }}
                >
                  <View
                    className={`w-14 h-14 ${achievement.color} rounded-full items-center justify-center`}
                  >
                    <Ionicons
                      name={achievement.icon as any}
                      size={26}
                      color="#10B981"
                    />
                  </View>
                  <View className="ml-4 flex-1">
                    <Text className="text-gray-700 font-semibold text-base">
                      {achievement.title}
                    </Text>
                    <Text className="text-gray-400 text-sm mt-1">
                      {new Date(achievement.claimedAt!).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </Text>
                  </View>
                  <Ionicons
                    name="checkmark-circle"
                    size={28}
                    color="#10B981"
                  />
                </Animatable.View>
              </Animated.View>
            ))}
          </>
        )}

        {/* Footer Spacing */}
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}