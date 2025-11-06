// app/(tabs)/menu.tsx
import { Ionicons } from '@expo/vector-icons'
import { usePathname, useRouter } from 'expo-router'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'

export default function MenuPage() {
  const router = useRouter()
  const activeRoute = usePathname()

  const menuItems = [
    { icon: 'home-outline', label: 'Home', route: '/home' },
    { icon: 'book-outline', label: 'Courses', route: '/courses' },
    { icon: 'help-circle-outline', label: 'Quizzes', route: '/screens/QuizListScreen' },
    { icon: 'wallet-outline', label: 'Wallet', route: '/screens/wallet' },
    { icon: 'trophy-outline', label: 'Leaderboard', route: '/screens/leaderboard' },
    { icon: 'logo-game-controller-b', label: 'Spin the Wheel', route: '/screens/spin-wheel' },
    { icon: 'gift-outline', label: 'Rewards', route: '/screens/rewards' },
    { icon: 'settings-outline', label: 'Settings', route: '/screens/settings' },
  ]

  const handleMenuPress = (route: string) => {
    router.push(route as any)
  }

  return (
    <View className="flex-1 bg-gray-200">
      {/* Header */}
      <View className="px-6 pt-14 pb-8 flex-row items-center justify-between">
        <Image
          source={require('@/assets/images/storra.png')}
          className="w-24 h-24"
          resizeMode="contain"
        />
      </View>

      {/* Menu Items */}
      <ScrollView className="flex-1">
        {menuItems.map((item, index) => {
          const isActive = activeRoute === item.route
          return (
            <Pressable
              key={index}
              onPress={() => handleMenuPress(item.route)}
              className={`flex-row items-center px-6 py-4 mx-6 my-1 rounded-xl ${
                isActive ? 'bg-blue-700' : 'bg-gray-50'
              }`}
            >
              <View className="mr-4">
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={isActive ? 'white' : '#000'}
                />
              </View>
              <Text
                className="text-lg font-medium flex-1"
                style={{
                  color: isActive ? 'white' : '#000',
                  fontWeight: isActive ? '600' : '400',
                }}
              >
                {item.label}
              </Text>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}