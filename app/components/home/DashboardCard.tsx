import { View, Text, Image, Pressable } from 'react-native'
import { scaleWidth, scaleFont, moderateScale, SCREEN } from '../../../utils/responsive'

interface DashboardCardProps {
    points: number
    onContinue?: () => void
}

export default function DashboardCard({ points, onContinue }: DashboardCardProps) {
    return (
        <View 
            style={{
                flexDirection: 'row',
                backgroundColor: '#2563eb',
                marginHorizontal: moderateScale(24),
                borderRadius: moderateScale(24),
                paddingVertical: moderateScale(24),
                paddingHorizontal: moderateScale(16),
                marginBottom: moderateScale(24),
                alignItems: 'center',
            }}
        >
            <Image 
                source={require('@/assets/images/home-book.png')} 
                style={{
                    width: scaleWidth(SCREEN.isSmall ? 80 : 100),
                    height: scaleWidth(SCREEN.isSmall ? 80 : 100),
                }}
                resizeMode="contain"
            />
            <View style={{ flex: 1, marginLeft: moderateScale(12), justifyContent: 'center' }}>
                <Text 
                    style={{
                        color: 'white',
                        fontSize: scaleFont(SCREEN.isSmall ? 18 : 22),
                        fontWeight: '600',
                        lineHeight: scaleFont(SCREEN.isSmall ? 24 : 30),
                    }}
                    numberOfLines={2}
                    adjustsFontSizeToFit
                >
                    Ready to unlock your next reward?
                </Text>
                <Text 
                    style={{
                        color: '#bfdbfe',
                        fontSize: scaleFont(SCREEN.isSmall ? 12 : 14),
                        marginTop: moderateScale(8),
                    }}
                >
                    You&apos;ve earned {points} points this week
                </Text>
                <Pressable onPress={onContinue}>
                    <View 
                        style={{
                            marginTop: moderateScale(16),
                            backgroundColor: 'white',
                            paddingHorizontal: moderateScale(16),
                            paddingVertical: moderateScale(12),
                            borderRadius: moderateScale(24),
                            alignSelf: 'flex-start',
                            minWidth: scaleWidth(140),
                            alignItems: 'center',
                        }}
                    >
                        <Text 
                            style={{
                                color: '#2563eb',
                                fontSize: scaleFont(SCREEN.isSmall ? 13 : 15),
                                fontWeight: '600',
                            }}
                            numberOfLines={1}
                            adjustsFontSizeToFit
                        >
                            Continue Learning
                        </Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}