import { BASE_URL } from "@/backendconfig";
import { getCurrentUser } from "@/services/userService";
import { useUserStore } from "@/store/userStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// Helper: render avatar with fallback
const Avatar = ({ user, size = 48 }: { user: any; size?: number }) => {
  if (user.profilePictureUrl) {
    return (
      <Image
        source={{ uri: user.profilePictureUrl }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    );
  }
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#ddd",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: size / 2, color: "#555" }}>
        {user.fullname[0].toUpperCase()}
      </Text>
    </View>
  );
};

export default function LeaderboardScreen() {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadinguser, setuserLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
   const { 
        user, 
        token, 
       
    } = useUserStore();
     useEffect(() => {
      const fetchData = async () => {
          if (!token) {
              router.replace('/auth/student/login');
              return;
          }
  
          try {
              setuserLoading(true);
  
              // Fetch current user profile
              const userRes = await getCurrentUser(token);
                     setCurrentUserId(userRes.data._id);         
  
      } catch (error) {
            console.error('❌ Fetch failed:', error);
        } finally {
            setuserLoading(false);
        }
    };

    if (token) fetchData();
}, [token]);
         

  console.log("Current User ID:", currentUserId)

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/leaderboard`);
      const data = await res.json();
      if (data?.data?.leaderboard) {
        setLeaderboard(data.data.leaderboard);
      }
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-2 text-gray-500">Loading leaderboard...</Text>
      </View>
    );
  }

  const top3 = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);
  const yourRankData = leaderboard.find((u) => u.userId === currentUserId);
  const yourRank = yourRankData ? leaderboard.indexOf(yourRankData) + 1 : null;

  const renderOther = ({ item, index }: { item: any; index: number }) => (
    <View
      className="flex-row items-center justify-between bg-white rounded-xl px-4 py-3 mb-2 shadow"
      style={{ elevation: 1 }}
    >
      <View className="flex-row items-center">
        <Text className="w-6 text-center font-bold text-gray-700">{index + 4}</Text>
        <View className="ml-3">
          <Avatar user={item} size={40} />
        </View>
        <View className="ml-3">
          <Text className="font-semibold text-gray-800">{item.fullname}</Text>
          <Text className="text-gray-500">{item.totalPoints} pts</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color="#888" />
    </View>
  );

 return (
  <View className="flex-1 bg-white pt-12 px-5">

    {/* HEADER */}
    <View className="flex-row items-center justify-between mb-8">
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      <Text className="text-2xl font-extrabold text-gray-900">
        Leaderboard
      </Text>

      <MaterialCommunityIcons name="trophy" size={28} color="#f2b705" />
    </View>

    {/* TOP 3 - Centered, Clean, Modern */}
{/* TOP 3 SECTION - Compact Version */}
<View className="items-center mt-4 mb-6">

  {/* 🥇 Winner */}
  <View className="items-center mb-6">
    <Text style={{ fontSize: 26, marginBottom: -6 }}>👑</Text>

    <View
      style={{
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFD700",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Avatar user={top3[0]} size={80} />
    </View>

    <Text className="font-bold text-gray-900 text-base mt-2">
      {top3[0].fullname}
    </Text>
    <Text className="text-gray-500 text-sm">{top3[0].totalPoints} pts</Text>
  </View>

  {/* 🥈 Rank 2 & 🥉 Rank 3 */}
  <View className="flex-row justify-between w-full px-6">

    {/* Rank 2 */}
    <View className="items-center">
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          borderWidth: 2,
          borderColor: "#C0C0C0",
          overflow: "hidden",
          marginBottom: 4,
        }}
      >
        <Avatar user={top3[1]} size={60} />
      </View>

      <MaterialCommunityIcons
        name="medal-outline"
        size={16}
        color="#C0C0C0"
        style={{ marginBottom: 2 }}
      />

      <Text className="font-semibold text-gray-900 text-sm">{top3[1].fullname}</Text>
      <Text className="text-gray-500 text-xs">{top3[1].totalPoints} pts</Text>
    </View>

    {/* Rank 3 */}
    <View className="items-center">
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          borderWidth: 2,
          borderColor: "#CD7F32",
          overflow: "hidden",
          marginBottom: 4,
        }}
      >
        <Avatar user={top3[2]} size={60} />
      </View>

      <MaterialCommunityIcons
        name="medal-outline"
        size={16}
        color="#CD7F32"
        style={{ marginBottom: 2 }}
      />

      <Text className="font-semibold text-gray-900 text-sm">{top3[2].fullname}</Text>
      <Text className="text-gray-500 text-xs">{top3[2].totalPoints} pts</Text>
    </View>

  </View>

</View>



    {/* OTHERS */}
    <FlatList
      data={others}
      keyExtractor={(item) => item.userId}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <View
          className="flex-row items-center justify-between bg-gray-50 rounded-2xl px-5 py-4 mb-3"
          style={{ elevation: 1 }}
        >
          <View className="flex-row items-center">
            <Text className="w-7 text-center font-extrabold text-gray-700 text-lg">
              {index + 4}
            </Text>

            <View className="ml-3">
              <Avatar user={item} size={45} />
            </View>

            <View className="ml-3">
              <Text className="font-semibold text-gray-900 text-base">
                {item.fullname}
              </Text>
              <Text className="text-gray-500 text-sm">
                {item.totalPoints} pts
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward-outline" size={22} color="#aaa" />
        </View>
      )}
    />

    {/* YOUR RANK */}
    {yourRankData && (
      <View
        className="flex-row items-center justify-between bg-blue-100 rounded-2xl px-5 py-4 mt-5 mb-5 border border-blue-300"
      >
        <View className="flex-row items-center">
          <View className="w-9 h-9 bg-blue-600 rounded-full items-center justify-center mr-3">
            <Text className="font-bold text-white text-base">{yourRank}</Text>
          </View>

          <Avatar user={yourRankData} size={45} />

          <View className="ml-3">
            <Text className="font-semibold text-gray-900 text-base">
              {yourRankData.fullname}
            </Text>
            <Text className="text-gray-500 text-sm">
              {yourRankData.totalPoints} pts
            </Text>
          </View>
        </View>

        <Ionicons name="chevron-forward-outline" size={22} color="#999" />
      </View>
    )}
  </View>
);

}
