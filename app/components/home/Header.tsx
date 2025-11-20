import { getCurrentUser } from '@/services/userService';
import { useUserStore } from '@/store/userStore';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';

export default function Header() {
  const { user, token } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!token) return;

        const res = await getCurrentUser(token);
        console.log("HEADER FETCH:", res);

        if (res?.data) {
          setRewards(res.data.rewards);  // <-- correct
        }

      } catch (err) {
        console.log("Header fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);


  if (loading || !user) {
    return (
      <View className="flex items-center justify-center py-4">
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <View className="flex-row items-center justify-between px-6">

      {/* LOGO */}
      <Image
        source={require('@/assets/images/storra.png')}
        className="w-20 h-20"
        resizeMode="contain"
      />

      {/* RIGHT SIDE */}
      <View className="flex-row items-center gap-4">

        {/* COINS */}
        <View className="flex-row items-center gap-1 bg-yellow-300 px-3 py-1 rounded-full">
          <Ionicons name="logo-bitcoin" size={18} color="black" />
          <Text className="font-semibold text-black">
            {rewards?.totalCoins ?? 0}
          </Text>
        </View>

        {/* DIAMONDS */}
        <View className="flex-row items-center gap-1 bg-purple-300 px-3 py-1 rounded-full">
          <Ionicons name="diamond-outline" size={18} color="black" />
          <Text className="font-semibold text-black">
            {rewards?.totalDiamonds ?? 0}
          </Text>
        </View>

        {/* NOTIFICATIONS */}
        <Pressable>
          <Ionicons name="notifications-outline" size={28} color="black" />
        </Pressable>

      </View>
    </View>
  );
}
