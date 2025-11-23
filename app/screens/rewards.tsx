import { BASE_URL } from '@/backendconfig';
import { useUserStore } from '@/store/userStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Reward {
  type: 'coins' | 'diamond';
  amount: number;
}

interface CycleDay {
  day: number;
  reward: Reward;
  claimed: boolean;
  isToday: boolean;
}

interface SocialActivity {
  platform: string;
  reward: number;
}

export default function DailyRewardScreen() {
  const router = useRouter();
  const { token } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [claimedToday, setClaimedToday] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [cycle, setCycle] = useState<CycleDay[]>([]);
  const [lastReward, setLastReward] = useState<Reward | null>(null);

  const socialActivities: SocialActivity[] = [
    { platform: 'Facebook', reward: 5000 },
    { platform: 'Instagram', reward: 5000 },
    { platform: 'X (Twitter)', reward: 5000 },
  ];

  useEffect(() => {
    fetchDailyInfo();
  }, []);

  const fetchDailyInfo = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/daily/info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setClaimedToday(data.data.claimedToday);
      setCurrentStreak(data.data.streak);
      setCycle(data.data.cycle || []);
      const claimedHistory = data.data.cycle.filter((c: any) => c.claimed);
      setLastReward(claimedHistory.length ? claimedHistory[claimedHistory.length - 1].reward : null);
    } catch (error) {
      console.error('Failed to fetch daily info:', error);
    } finally {
      setLoading(false);
    }
  };

  const claimDailyReward = async () => {
    if (claiming || claimedToday) return;
    try {
      setClaiming(true);
      const res = await fetch(`${BASE_URL}/daily/claim`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setClaimedToday(true);
        setCurrentStreak(data.data.streak);
        setLastReward(data.data.reward);
        const updatedCycle = cycle.map((c) =>
          c.day === data.data.cycleDay ? { ...c, claimed: true } : c
        );
        setCycle(updatedCycle);
      }
    } catch (error) {
      console.error('Claim failed:', error);
    } finally {
      setClaiming(false);
    }
  };

  const renderRewardIcon = (type: string) =>
    type === 'coins' ? (
<Ionicons name="logo-bitcoin" size={20} color="#FFD700" />
    ) : (
      <Ionicons name="diamond-outline" size={20} color="#8b5cf6" />
    );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="mt-4 text-gray-800 font-medium">Loading daily reward...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white mt-12">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-black">Reward</Text>
          <View style={{ width: 26 }} />
        </View>

        {/* Streak Info */}
        <View className="bg-blue-50 p-4 rounded-2xl mb-6 border border-blue-200">
          <Text className="text-center text-gray-800 font-semibold text-lg">
            Current Streak: {currentStreak} days
          </Text>
          {lastReward && (
            <Text className="text-center text-gray-600 mt-1">
              Last reward: {lastReward.amount} {lastReward.type}
            </Text>
          )}
        </View>

      

        {/* Daily Check-in Grid */}
        <Text className="text-gray-800 font-semibold text-lg mb-3">Daily Check-in</Text>
        <View className="flex-row flex-wrap justify-between mb-6">
  {cycle.map((c, index) => {
    const totalItems = cycle.length;
    const itemsInLastRow = totalItems % 4;
    const isLastRow = index >= totalItems - itemsInLastRow;
    
    let widthClass = "w-[22%]"; // Default 4 items per row
    
    if (isLastRow && itemsInLastRow > 0) {
      // Calculate width based on how many items in last row
      switch (itemsInLastRow) {
        case 1:
          widthClass = "w-full"; // Single item takes full width
          break;
        case 2:
          widthClass = "w-[48%]"; // Two items side by side
          break;
        case 3:
          widthClass = "w-[30%]"; // Three items evenly distributed
          break;
        default:
          widthClass = "w-[22%]";
      }
    }
    
    return (
      <View
        key={c.day}
        className={`${widthClass} mb-3`}
        style={{ aspectRatio: 1 }}
      >
        {/* Fixed border wrapper */}
        <View
          className={`flex-1 rounded-lg ${
            c.isToday
              ? 'border-2 border-green-500'
              : 'border border-gray-300'
          }`}
          style={{
            backgroundColor:
              c.claimed
                ? '#BBF7D0' // green-200 for claimed
                : c.reward.type === 'diamond'
                ? '#E9D5FF' // purple-100
                : '#DBEAFE', // blue-100
          }}
        >
          {/* Inner content with padding */}
          <View className="flex-1 p-2 items-center justify-center rounded-lg">
            <Text className="font-bold text-black mb-1 mt-1 text-xs">Day {c.day}</Text>
            {renderRewardIcon(c.reward.type)}
            <Text className="text-black font-semibold mt-1 text-xs">
              {c.reward.amount}
            </Text>
          </View>
        </View>
      </View>
    );
  })}
</View>

          {/* Claim Button */}
        <TouchableOpacity
          onPress={claimDailyReward}
          disabled={claiming || claimedToday}
          className={`py-4 rounded-2xl mb-6 ${
            claimedToday ? 'bg-gray-400' : 'bg-green-500'
          } shadow-md`}
        >
          {claiming ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : claimedToday ? (
            <Text className="text-white text-center font-bold text-lg">
              Come Back Tomorrow!
            </Text>
          ) : (
            <Text className="text-white text-center font-bold text-lg">
              Claim Daily Reward
            </Text>
          )}
        </TouchableOpacity>

        {/* More Rewarded Activities */}
        <Text className="text-gray-800 font-semibold text-lg mb-3">More rewarded activities</Text>
        {socialActivities.map((activity, idx) => (
          <View
            key={idx}
            className="flex-row justify-between items-center bg-white p-4 mb-4 rounded-2xl shadow-md border border-gray-200"
          >
            <View className="flex-row items-center space-x-3">
              {/* Platform icon placeholder */}
              <View className="w-5 h-5 rounded-full items-center justify-center" style={{
                backgroundColor: activity.platform === 'Facebook' ? '#1877F2' : activity.platform === 'Instagram' ? '#C13584' : '#1DA1F2'
              }}>
                <Text className="text-white font-bold">{activity.platform[0]}</Text>
              </View>
              <Text className="text-gray-800 text-sm">
                Follow us on {activity.platform} +{activity.reward.toLocaleString()} coins
              </Text>
            </View>
            <TouchableOpacity className="bg-green-500 px-3 py-2 rounded-full shadow-sm">
              <Text className="text-white font-semibold">Follow</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}