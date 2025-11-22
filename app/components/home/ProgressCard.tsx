import { Image, Pressable, Text, View } from 'react-native'
import { moderateScale, scaleFont, scaleWidth, SCREEN } from '../../../utils/responsive'

interface ProgressCardProps {
    title: string
    subtitle: string
    progress: number
    onResume?: () => void
}

export default function ProgressCard({ title, subtitle, progress,  onResume }: ProgressCardProps) {

    return (
        <View 
            style={{
                marginHorizontal: moderateScale(24),
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: moderateScale(16),
                padding: moderateScale(16),
                marginBottom: moderateScale(1),
            }}
        >
            {/* Icon Container */}
            <View 
                style={{
                    padding: moderateScale(8),
                    backgroundColor: '#dbeafe',
                    borderRadius: moderateScale(24),
                    width: scaleWidth(48),
                    height: scaleWidth(48),
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image 
                    source={require('@/assets/images/uim_analytics.png')}
                    style={{
                        width: scaleWidth(28),
                        height: scaleWidth(28),
                    }}
                    resizeMode="contain"
                />
            </View>

            {/* Title and Button Row */}
            <View 
                style={{
                    flexDirection: SCREEN.isSmall ? 'column' : 'row',
                    marginTop: moderateScale(16),
                    alignItems: SCREEN.isSmall ? 'flex-start' : 'center',
                }}
            >
                <View style={{ flex: 1, marginBottom: SCREEN.isSmall ? moderateScale(12) : 0 }}>
                    <Text 
                        style={{
                            color: '#1f2937',
                            fontSize: scaleFont(SCREEN.isSmall ? 16 : 18),
                            fontWeight: '600',
                            marginBottom: moderateScale(4),
                        }}
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                    <Text 
                        style={{
                            color: '#6b7280',
                            fontSize: scaleFont(SCREEN.isSmall ? 12 : 14),
                        }}
                        numberOfLines={2}
                    >
                        {subtitle}
                    </Text>
                </View>
                
                <Pressable 
                    style={({ pressed }) => ({
                        backgroundColor: pressed ? '#1e40af' : '#dbeafe',
                        paddingHorizontal: moderateScale(SCREEN.isSmall ? 12 : 16),
                        paddingVertical: moderateScale(SCREEN.isSmall ? 8 : 10),
                        borderRadius: moderateScale(24),
                        marginLeft: SCREEN.isSmall ? 0 : moderateScale(12),
                        alignSelf: SCREEN.isSmall ? 'flex-start' : 'center',
                    })}
                    onPress={onResume}
                >
                    <Text 
                        style={{
                            color: '#2563eb',
                            fontSize: scaleFont(SCREEN.isSmall ? 13 : 15),
                            fontWeight: '600',
                        }}
                        numberOfLines={1}
                    >
                        Resume Lesson
                    </Text>
                </Pressable>
            </View>

            {/* Progress Text */}
            <Text 
                style={{
                    color: '#6b7280',
                    fontSize: scaleFont(12),
                    marginTop: moderateScale(16),
                    textAlign: 'right',
                }}
            >
                {progress}% completed
            </Text>

            {/* Progress Bar */}
            <View 
                style={{
                    width: '100%',
                    height: moderateScale(8),
                    backgroundColor: '#e5e7eb',
                    borderRadius: moderateScale(4),
                    marginTop: moderateScale(8),
                    overflow: 'hidden',
                }}
            >
                <View 
                    style={{
                        height: '100%',
                        backgroundColor: '#2563eb',
                        borderRadius: moderateScale(4),
                        width: `${progress}%`,
                    }} 
                />
            </View>
        </View>
    )
}