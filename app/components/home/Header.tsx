import { View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function Header() {
    return (
        <View className="flex-row items-center justify-between px-6 pt-6">
            <Image
                source={require('@/assets/images/storra.png')}
                className="w-20 h-20"
                resizeMode="contain"
            />
            <View className="flex-row items-center gap-4">
                <Ionicons 
                    name="notifications-outline" 
                    size={28} 
                    color="black"  
                />
                <Ionicons 
                    name='menu' 
                    size={28} 
                    color="black"
                />
            </View>
        </View>
    )
}