//(tabs)/menu
import { Modal, Text, TouchableOpacity, View, Image, Pressable, Animated } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useRef } from 'react'
import { useRouter } from 'expo-router'

interface SlidingMenuProps {
    visible: boolean
    onClose: () => void
    activeRoute: string
    setActiveRoute: (route: string) => void
}

export default function SlidingMenu({ visible, onClose, activeRoute, setActiveRoute }: SlidingMenuProps) {
    const router = useRouter()
    const slideAnim = useRef(new Animated.Value(-320)).current // Start off-screen to the left

    const menuItems = [
        { icon: 'home-outline', label: 'Home', route: '/screens/home' },
        { icon: 'book-outline', label: 'Courses', route: '/screens/courses' },
        { icon: 'help-circle-outline', label: 'Quizzes', route: '/screens/quizzes' },
        { icon: 'wallet-outline', label: 'Wallet', route: '/screens/wallet' },
        { icon: 'trophy-outline', label: 'Leaderboard', route: '/screens/leaderboard' },
        { icon: 'logo-game-controller-b', label: 'Spin the Wheel', route: '/screens/spin-wheel' },
        { icon: 'gift-outline', label: 'Reward', route: '/screens/rewards' },
        { icon: 'settings-outline', label: 'Setting', route: '/screens/settings' },
        { icon: 'log-out-outline', label: 'Logout', route: '/(tabs)' },
    ]

    useEffect(() => {
        if (visible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                speed: 12,
                bounciness: 3,
            }).start()
        } else {
            Animated.timing(slideAnim, {
                toValue: -320,
                duration: 250,
                useNativeDriver: true,
            }).start()
        }
    }, [visible])

    const handleMenuPress = (route: string, label: string) => {
        console.log('Clicked:', label, 'Route:', route)
        console.log('Before update - activeRoute:', activeRoute)
        setActiveRoute(route)
        console.log('After update - should be:', route)
        
        if (label === 'Logout') {
            console.log('Logging out...')
            // router.replace('/login')
        } else {
            router.push(route as any)
        }
        onClose()
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity 
                className="flex-1 bg-black/50"
                activeOpacity={1}
                onPress={onClose}
            >
                <Animated.View
                    style={{
                        transform: [{ translateX: slideAnim }],
                    }}
                    className="absolute left-0 top-0 h-full w-80 bg-white shadow-lg"
                >
                    <TouchableOpacity 
                        activeOpacity={1}
                        onPress={(e) => e.stopPropagation()}
                        className="flex-1"
                    >
                        {/* Menu Header */}
                        <View className="px-6 pt-12 pb-8">
                            <View className="flex-row items-center justify-between mb-2">
                                <Image
                                    source={require('@/assets/images/storra.png')}
                                    className="w-24 h-24"
                                    resizeMode="contain"
                                />
                                <Pressable onPress={onClose}>
                                    <Ionicons name="arrow-forward" size={28} color="#374151" />
                                </Pressable>
                            </View>
                        </View>

                        {/* Menu Items */}
                        <View className="flex-1">
                            {menuItems.map((item, index) => {
                                const isActive = activeRoute === item.route;
                                console.log(`${item.label}: activeRoute=${activeRoute}, item.route=${item.route}, isActive=${isActive}`)
                                return (
                                    <Pressable
                                        key={index}
                                        onPress={() => handleMenuPress(item.route, item.label)}
                                        className={`flex-row items-center px-6 py-4 mx-6 rounded-xl ${
                                            isActive ? 'bg-blue-700' : ''
                                        }`}
                                        style={isActive ? { backgroundColor: '#1d4ed8' } : {}}
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
                                                fontWeight: isActive ? '600' : '400'
                                            }}
                                        >
                                            {item.label}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    )
}