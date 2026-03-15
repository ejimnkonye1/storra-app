import { BASE_URL } from "@/backendconfig";
import { useUserStore } from "@/store/userStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchWithTimeout } from "../../utils/fetchWithTimeout";

const Avatar = ({ user, size = 44 }: { user: any; size?: number }) => {
  if (user?.profilePictureUrl) {
    return (
      <Image
        source={{ uri: user.profilePictureUrl }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    );
  }
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#dbeafe', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontWeight: '700', fontSize: size * 0.38, color: '#2563eb' }}>
        {user?.fullname?.[0]?.toUpperCase() ?? '?'}
      </Text>
    </View>
  );
};

const MEDAL_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];
const MEDAL_SIZES = [72, 58, 58];

export default function LeaderboardScreen() {
  const router = useRouter();
  const { user } = useUserStore();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => { fetchLeaderboard(); }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetchWithTimeout(`${BASE_URL}/leaderboard`);
      const data = await res.json();
      if (data?.data?.leaderboard) setLeaderboard(data.data.leaderboard);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 12, color: '#6b7280', fontSize: 14 }}>Loading leaderboard...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 }}>
        <Ionicons name="wifi-outline" size={48} color="#d1d5db" />
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151', marginTop: 12, textAlign: 'center' }}>Couldn't load leaderboard</Text>
        <Text style={{ color: '#9ca3af', fontSize: 13, marginTop: 4, textAlign: 'center' }}>Check your connection and try again</Text>
        <TouchableOpacity onPress={fetchLeaderboard} style={{ marginTop: 20, backgroundColor: '#2563eb', paddingHorizontal: 28, paddingVertical: 12, borderRadius: 12 }}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const top3 = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);
  const myEntry = leaderboard.find(u => u.userId === user?._id);
  const myRank = myEntry ? leaderboard.indexOf(myEntry) + 1 : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: '#f3f4f6', padding: 8, borderRadius: 10 }}>
          <Ionicons name="arrow-back" size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>Leaderboard</Text>
        <MaterialCommunityIcons name="trophy" size={22} color="#d97706" />
      </View>

      <FlatList
        data={others}
        keyExtractor={item => item.userId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        ListHeaderComponent={() => (
          <>
            {/* Top 3 podium */}
            {top3.length >= 3 && (
              <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 20, marginTop: 16, marginBottom: 16, borderWidth: 1, borderColor: '#f1f5f9', alignItems: 'center' }}>
                {/* #1 */}
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                  <Text style={{ fontSize: 22 }}>👑</Text>
                  <View style={{ borderWidth: 3, borderColor: MEDAL_COLORS[0], borderRadius: MEDAL_SIZES[0] / 2, marginTop: 4 }}>
                    <Avatar user={top3[0]} size={MEDAL_SIZES[0]} />
                  </View>
                  <Text style={{ fontWeight: '700', color: '#111827', fontSize: 15, marginTop: 8 }} numberOfLines={1}>{top3[0].fullname}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <Ionicons name="star" size={12} color="#d97706" />
                    <Text style={{ color: '#6b7280', fontSize: 13 }}>{top3[0].totalPoints} pts</Text>
                  </View>
                </View>

                {/* #2 and #3 */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                  {[1, 2].map(i => (
                    <View key={i} style={{ alignItems: 'center' }}>
                      <View style={{ borderWidth: 2, borderColor: MEDAL_COLORS[i], borderRadius: MEDAL_SIZES[i] / 2 }}>
                        <Avatar user={top3[i]} size={MEDAL_SIZES[i]} />
                      </View>
                      <View style={{ backgroundColor: MEDAL_COLORS[i], width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
                        <Text style={{ color: '#fff', fontWeight: '800', fontSize: 11 }}>{i + 1}</Text>
                      </View>
                      <Text style={{ fontWeight: '600', color: '#111827', fontSize: 13, marginTop: 4 }} numberOfLines={1}>{top3[i].fullname}</Text>
                      <Text style={{ color: '#9ca3af', fontSize: 12 }}>{top3[i].totalPoints} pts</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Your rank */}
            {myEntry && (
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#eff6ff', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 16, borderWidth: 1, borderColor: '#bfdbfe' }}>
                <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Text style={{ color: '#fff', fontWeight: '800', fontSize: 13 }}>#{myRank}</Text>
                </View>
                <Avatar user={myEntry} size={40} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ fontWeight: '700', color: '#1d4ed8', fontSize: 14 }}>You</Text>
                  <Text style={{ color: '#3b82f6', fontSize: 13 }}>{myEntry.totalPoints} pts</Text>
                </View>
                <Text style={{ color: '#2563eb', fontSize: 12, fontWeight: '600' }}>Your rank</Text>
              </View>
            )}

            {others.length > 0 && (
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#9ca3af', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8, paddingLeft: 2 }}>
                Rankings
              </Text>
            )}
          </>
        )}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 8, borderWidth: 1, borderColor: '#f1f5f9' }}>
            <Text style={{ width: 28, fontWeight: '700', color: '#9ca3af', fontSize: 14 }}>{index + 4}</Text>
            <Avatar user={item} size={42} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ fontWeight: '600', color: '#111827', fontSize: 14 }} numberOfLines={1}>{item.fullname}</Text>
              <Text style={{ color: '#9ca3af', fontSize: 12 }}>{item.totalPoints} pts</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#d1d5db" />
          </View>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Ionicons name="podium-outline" size={48} color="#d1d5db" />
            <Text style={{ color: '#9ca3af', marginTop: 10, fontSize: 14 }}>No rankings yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
