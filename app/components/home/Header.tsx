import { View, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
// import SlidingMenu from './SlidingMenu'

export default function Header() {

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
            
                </View>
            </View>

            {/* <SlidingMenu 
                visible={menuVisible} 
                onClose={() => setMenuVisible(false)}
                activeRoute={activeRoute}
                setActiveRoute={setActiveRoute}
            /> */}
        </>
    )
}