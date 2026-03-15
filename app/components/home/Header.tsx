import { useUserStore } from '@/store/userStore';
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';

interface HeaderProps {
  coins: number;
  diamond: number;
}

export default function Header({ coins, diamond }: HeaderProps) {
  const { user, setNotifVisible } = useUserStore();

  const achievementsCount = user?.rewards?.achievements?.length ?? 0;
  const notificationCount = achievementsCount + ((user?.rewards?.currentStreak ?? 0) > 0 ? 1 : 0);

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
            {coins ?? 0}
          </Text>
        </View>

        {/* DIAMONDS */}
        <View className="flex-row items-center gap-1 bg-purple-300 px-3 py-1 rounded-full">
          <Ionicons name="diamond-outline" size={18} color="black" />
          <Text className="font-semibold text-black">
            {diamond ?? 0}
          </Text>
        </View>

        {/* NOTIFICATIONS */}
        <Pressable onPress={() => setNotifVisible(true)} style={{ position: 'relative' }}>
          <Ionicons name="notifications-outline" size={28} color="black" />
          {notificationCount > 0 && (
            <View
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                backgroundColor: '#ef4444',
                borderRadius: 8,
                minWidth: 16,
                height: 16,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 3,
              }}
            >
              <Text style={{ color: 'white', fontSize: 10, fontWeight: '700' }}>
                {notificationCount > 9 ? '9+' : notificationCount}
              </Text>
            </View>
          )}
        </Pressable>

      </View>
    </View>
  );
}
