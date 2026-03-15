// app/(tabs)/menu.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserStore } from '../../store/userStore';

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

const MENU_ITEMS = [
  { icon: 'home-outline', label: 'Home', route: '/(tabs)/home', color: '#2563eb', bg: '#eff6ff' },
  { icon: 'book-outline', label: 'Courses', route: '/(tabs)/courses', color: '#7c3aed', bg: '#f5f3ff' },
  { icon: 'help-circle-outline', label: 'Quizzes', route: '/screens/QuizListScreen', color: '#0891b2', bg: '#ecfeff' },
  { icon: 'wallet-outline', label: 'Wallet', route: '/(tabs)/wallet', color: '#059669', bg: '#ecfdf5' },
  { icon: 'trophy-outline', label: 'Leaderboard', route: '/screens/leaderboard', color: '#d97706', bg: '#fffbeb' },
  { icon: 'gift-outline', label: 'Rewards', route: '/screens/rewards', color: '#db2777', bg: '#fdf2f8' },
  { icon: 'refresh-circle-outline', label: 'Spin the Wheel', route: '/screens/spin-wheel', color: '#7c3aed', bg: '#f5f3ff' },
  { icon: 'settings-outline', label: 'Settings', route: '/screens/settings', color: '#4b5563', bg: '#f9fafb' },
  { icon: 'help-buoy-outline', label: 'Help Center', route: '/screens/HelpCenterScreen', color: '#0284c7', bg: '#f0f9ff' },
  { icon: 'shield-checkmark-outline', label: 'Privacy Policy', route: '/screens/PrivacyPolicyScreen', color: '#16a34a', bg: '#f0fdf4' },
];

export default function MenuPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, logout, setNotifVisible } = useUserStore();

  const coins = user?.rewards?.totalCoins ?? 0;
  const diamonds = user?.rewards?.totalDiamonds ?? 0;
  const points = user?.leaderboard?.totalPoints ?? 0;
  const rank = user?.leaderboard?.rank ?? 0;
  const streak = user?.rewards?.currentStreak ?? 0;
  const completedCourses = user?.coursesProgress?.filter(
    c => c.status === 'completed' || c.overallProgress === 100
  ).length ?? 0;

  const achievementsCount = user?.rewards?.achievements?.length ?? 0;
  const notifCount = achievementsCount + (streak > 0 ? 1 : 0);

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/');
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* ── Header ── */}
      <View style={{ backgroundColor: '#fff', paddingTop: insets.top + 8, paddingBottom: 20, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>

        {/* Top row: logo + bells */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Image
            source={require('@/assets/images/storra.png')}
            style={{ width: 80, height: 36 }}
            resizeMode="contain"
          />
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity
              onPress={() => setNotifVisible(true)}
              style={{ backgroundColor: '#eff6ff', padding: 9, borderRadius: 12 }}
            >
              <Ionicons name="notifications-outline" size={20} color="#2563eb" />
              {notifCount > 0 && (
                <View style={{ position: 'absolute', top: 5, right: 5, backgroundColor: '#ef4444', borderRadius: 4, width: 8, height: 8 }} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/screens/settings' as any)}
              style={{ backgroundColor: '#eff6ff', padding: 9, borderRadius: 12 }}
            >
              <Ionicons name="settings-outline" size={20} color="#2563eb" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile row */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          {user?.profilePictureUrl ? (
            <Image
              source={{ uri: user.profilePictureUrl }}
              style={{ width: 56, height: 56, borderRadius: 28, borderWidth: 2, borderColor: '#dbeafe' }}
            />
          ) : (
            <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#dbeafe', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="person" size={26} color="#2563eb" />
            </View>
          )}
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#111827', fontSize: 17, fontWeight: '700', marginBottom: 2 }}>
              {user?.fullname ?? 'Student'}
            </Text>
            <Text style={{ color: '#6b7280', fontSize: 13 }}>{user?.email ?? ''}</Text>
            <View style={{ flexDirection: 'row', gap: 6, marginTop: 5 }}>
              {(user?.currentClassLevel || user?.educationLevel) && (
                <View style={{ backgroundColor: '#dbeafe', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 }}>
                  <Text style={{ color: '#2563eb', fontSize: 11, fontWeight: '600' }}>
                    {user?.currentClassLevel ?? user?.educationLevel}
                  </Text>
                </View>
              )}
              {completedCourses > 0 && (
                <View style={{ backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 }}>
                  <Text style={{ color: '#16a34a', fontSize: 11, fontWeight: '600' }}>
                    {completedCourses} done
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Stats strip */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#f8fafc', borderRadius: 14, paddingVertical: 12, marginTop: 18, borderWidth: 1, borderColor: '#f1f5f9' }}>
          {[
            { icon: 'logo-bitcoin', color: '#d97706', label: 'Coins', value: fmt(coins) },
            { icon: 'diamond', color: '#7c3aed', label: 'Diamonds', value: fmt(diamonds) },
            { icon: 'star', color: '#2563eb', label: 'Points', value: fmt(points) },
            { icon: 'flame', color: '#ea580c', label: 'Streak', value: `${streak}d` },
            { icon: 'podium', color: '#0891b2', label: 'Rank', value: rank ? `#${rank}` : '—' },
          ].map((s, i) => (
            <View key={i} style={{ alignItems: 'center' }}>
              <Ionicons name={s.icon as any} size={16} color={s.color} style={{ marginBottom: 3 }} />
              <Text style={{ color: '#111827', fontWeight: '700', fontSize: 13 }}>{s.value}</Text>
              <Text style={{ color: '#9ca3af', fontSize: 10 }}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── Menu sections ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 }}
      >
        <View style={{ backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 20 }}>
          {MENU_ITEMS.map((item, idx) => (
            <View key={item.route}>
              <TouchableOpacity
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.7}
                style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 }}
              >
                <View style={{ backgroundColor: item.bg, padding: 9, borderRadius: 11, marginRight: 14 }}>
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </View>
                <Text style={{ flex: 1, fontSize: 15, fontWeight: '500', color: '#111827' }}>
                  {item.label}
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#d1d5db" />
              </TouchableOpacity>
              {idx < MENU_ITEMS.length - 1 && (
                <View style={{ height: 1, backgroundColor: '#f9fafb', marginLeft: 58 }} />
              )}
            </View>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#fef2f2', borderRadius: 16, paddingVertical: 15,
            gap: 8, borderWidth: 1, borderColor: '#fecaca', marginTop: 4,
          }}
        >
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={{ color: '#ef4444', fontWeight: '700', fontSize: 15 }}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
