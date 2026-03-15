import { BASE_URL } from '@/backendconfig';
import { useUserStore } from '@/store/userStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchWithTimeout } from '../../utils/fetchWithTimeout';

interface Reward { type: 'coins' | 'diamond'; amount: number }
interface CycleDay { day: number; reward: Reward; claimed: boolean; isToday: boolean }

const SOCIAL = [
  { platform: 'Facebook', color: '#1877F2', reward: 5000 },
  { platform: 'Instagram', color: '#C13584', reward: 5000 },
  { platform: 'X (Twitter)', color: '#000', reward: 5000 },
];

export default function DailyRewardScreen() {
  const router = useRouter();
  const { token } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [claimedToday, setClaimedToday] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [cycle, setCycle] = useState<CycleDay[]>([]);
  const [lastReward, setLastReward] = useState<Reward | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => { fetchDailyInfo(); }, []);

  const fetchDailyInfo = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetchWithTimeout(`${BASE_URL}/daily/info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setClaimedToday(data.data.claimedToday);
      setCurrentStreak(data.data.streak);
      setCycle(data.data.cycle || []);
      const claimed = data.data.cycle?.filter((c: any) => c.claimed) ?? [];
      setLastReward(claimed.length ? claimed[claimed.length - 1].reward : null);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const claimDailyReward = async () => {
    if (claiming || claimedToday) return;
    try {
      setClaiming(true);
      const res = await fetchWithTimeout(`${BASE_URL}/daily/claim`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setClaimedToday(true);
        setCurrentStreak(data.data.streak);
        setLastReward(data.data.reward);
        setCycle(prev => prev.map(c => c.day === data.data.cycleDay ? { ...c, claimed: true } : c));
      }
    } catch {
      // silent — button will re-enable
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 12, color: '#6b7280', fontSize: 14 }}>Loading daily reward...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 }}>
        <Ionicons name="wifi-outline" size={48} color="#d1d5db" />
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151', marginTop: 12, textAlign: 'center' }}>
          Couldn't load rewards
        </Text>
        <Text style={{ color: '#9ca3af', fontSize: 13, marginTop: 4, textAlign: 'center' }}>
          Check your connection and try again
        </Text>
        <TouchableOpacity
          onPress={fetchDailyInfo}
          style={{ marginTop: 20, backgroundColor: '#2563eb', paddingHorizontal: 28, paddingVertical: 12, borderRadius: 12 }}
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: '#f3f4f6', padding: 8, borderRadius: 10 }}>
          <Ionicons name="arrow-back" size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>Daily Rewards</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>

        {/* Streak card */}
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#f1f5f9', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Ionicons name="flame" size={28} color="#ea580c" />
            <Text style={{ fontSize: 32, fontWeight: '800', color: '#111827' }}>{currentStreak}</Text>
            <Text style={{ fontSize: 16, color: '#6b7280', fontWeight: '500' }}>day streak</Text>
          </View>
          {lastReward && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 }}>
              <Ionicons
                name={lastReward.type === 'coins' ? 'logo-bitcoin' : 'diamond'}
                size={14}
                color={lastReward.type === 'coins' ? '#d97706' : '#7c3aed'}
              />
              <Text style={{ color: '#6b7280', fontSize: 13 }}>
                Last reward: {lastReward.amount} {lastReward.type}
              </Text>
            </View>
          )}
        </View>

        {/* Daily check-in grid */}
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 12 }}>Daily Check-in</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {cycle.map((c) => (
            <View
              key={c.day}
              style={{
                width: '22%',
                aspectRatio: 1,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: c.claimed ? '#dcfce7' : c.reward.type === 'diamond' ? '#f5f3ff' : '#eff6ff',
                borderWidth: c.isToday ? 2 : 1,
                borderColor: c.isToday ? '#2563eb' : c.claimed ? '#86efac' : '#e5e7eb',
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: '700', color: '#6b7280', marginBottom: 2 }}>Day {c.day}</Text>
              <Ionicons
                name={c.reward.type === 'coins' ? 'logo-bitcoin' : 'diamond'}
                size={18}
                color={c.claimed ? '#16a34a' : c.reward.type === 'coins' ? '#d97706' : '#7c3aed'}
              />
              <Text style={{ fontSize: 10, fontWeight: '600', color: '#374151', marginTop: 2 }}>{c.reward.amount}</Text>
              {c.claimed && (
                <View style={{ position: 'absolute', top: 4, right: 4 }}>
                  <Ionicons name="checkmark-circle" size={12} color="#16a34a" />
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Claim button */}
        <TouchableOpacity
          onPress={claimDailyReward}
          disabled={claiming || claimedToday}
          style={{
            backgroundColor: claimedToday ? '#e5e7eb' : '#2563eb',
            borderRadius: 14,
            paddingVertical: 16,
            alignItems: 'center',
            marginBottom: 28,
          }}
        >
          {claiming ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: claimedToday ? '#9ca3af' : '#fff', fontWeight: '700', fontSize: 16 }}>
              {claimedToday ? '✓  Come Back Tomorrow' : 'Claim Daily Reward'}
            </Text>
          )}
        </TouchableOpacity>

        {/* More activities */}
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 12 }}>More Rewarded Activities</Text>
        <View style={{ backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#f1f5f9', overflow: 'hidden' }}>
          {SOCIAL.map((s, i) => (
            <View key={i}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: s.color, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: '800', fontSize: 13 }}>{s.platform[0]}</Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: '600', color: '#111827', fontSize: 14 }}>Follow on {s.platform}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 }}>
                      <Ionicons name="logo-bitcoin" size={12} color="#d97706" />
                      <Text style={{ color: '#6b7280', fontSize: 12 }}>+{s.reward.toLocaleString()} coins</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#2563eb', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20 }}>
                  <Text style={{ color: '#fff', fontWeight: '600', fontSize: 13 }}>Follow</Text>
                </TouchableOpacity>
              </View>
              {i < SOCIAL.length - 1 && <View style={{ height: 1, backgroundColor: '#f9fafb', marginHorizontal: 16 }} />}
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
