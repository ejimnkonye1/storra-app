import { View, Image, Pressable, Modal, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { useRouter } from 'expo-router'

export default function Header() {
    const [menuVisible, setMenuVisible] = useState(false)
    const router = useRouter()

    const menuItems = [
        { icon: 'home-outline', label: 'Home', route: '/screens/home' },
        { icon: 'book-outline', label: 'Courses', route: '/screens/courses' },
        { icon: 'help-circle-outline', label: 'Quizzes', route: '/screens/quizzes' },
        { icon: 'wallet-outline', label: 'Wallet', route: '/screens/wallet' },
        { icon: 'trophy-outline', label: 'Leaderboard', route: '/screens/leaderboard' },
        { icon: 'logo-game-controller-b', label: 'Spin the Wheel', route: '/screens/spin-wheel' },
        { icon: 'gift-outline', label: 'Reward', route: '/screens/rewards' },
        { icon: 'settings-outline', label: 'Setting', route: '/screens/settings' },
        { icon: 'log-out-outline', label: 'Logout', route: '' },
    ]

    const handleMenuPress = (route: string, label: string) => {
        setMenuVisible(false)
        if (label === 'Logout') {
            // Handle logout logic here
            console.log('Logging out...')
            // router.replace('/login')
        } else {
            router.push(route as any)
        }
    }

    return (
        <>
            <View className="flex-row items-center justify-between px-6 pt-6">
                <Image
                    source={require('@/assets/images/storra.png')}
                    className="w-20 h-20"
                    resizeMode="contain"
                />
                <View className="flex-row items-center gap-4">
                    <Pressable>
                        <Ionicons 
                            name="notifications-outline" 
                            size={28} 
                            color="black"  
                        />
                    </Pressable>
                    <Pressable onPress={() => setMenuVisible(true)}>
                        <Ionicons 
                            name='menu' 
                            size={28} 
                            color="black"
                        />
                    </Pressable>
                </View>
            </View>

            {/* Sliding Menu Modal - Left Side */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={menuVisible}
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity 
                    className="flex-1 bg-black/50"
                    activeOpacity={1}
                    onPress={() => setMenuVisible(false)}
                >
                    <TouchableOpacity 
                        activeOpacity={1}
                        className="absolute left-0 top-0 h-full w-80 bg-gradient-to-b from-blue-600 to-blue-400 shadow-lg"
                        style={{ backgroundColor: 'white' }}
                        onPress={(e) => e.stopPropagation()}
                    >
                        {/* Menu Header */}
            <View className="flex-row items-center justify-between px-6 pt-6">
                <Image
                    source={require('@/assets/images/storra.png')}
                    className="w-20 h-20"
                    resizeMode="contain"
                />
                <View className="flex-row items-center gap-4">
                    <Pressable>
                        <Ionicons 
                            name="notifications-outline" 
                            size={28} 
                            color="black"  
                        />
                    </Pressable>
                    <Pressable onPress={() => setMenuVisible(true)}>
                        <Ionicons 
                            name='menu' 
                            size={28} 
                            color="black"
                        />
                    </Pressable>
                </View>
            </View>

            <SlidingMenu 
                visible={menuVisible} 
                onClose={() => setMenuVisible(false)} 
            />
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </>
    )
}