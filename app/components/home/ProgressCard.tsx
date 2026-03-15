import { Ionicons } from '@expo/vector-icons'
import { Image, Pressable, Text, View } from 'react-native'
import { moderateScale, scaleFont, scaleWidth } from '../../../utils/responsive'

interface ProgressCardProps {
    title: string
    subtitle: string
    progress: number
    buttonLabel?: string
    isNext?: boolean
    onResume?: () => void
}

export default function ProgressCard({
    title,
    subtitle,
    progress,
    buttonLabel = 'Resume Lesson',
    isNext = false,
    onResume,
}: ProgressCardProps) {
    const accent = isNext ? '#059669' : '#2563eb'
    const accentLight = isNext ? '#d1fae5' : '#dbeafe'
    const accentMid = isNext ? '#6ee7b7' : '#93c5fd'

    return (
        <View
            style={{
                marginHorizontal: moderateScale(24),
                borderRadius: moderateScale(20),
                marginBottom: moderateScale(8),
                overflow: 'hidden',
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.07,
                shadowRadius: 8,
                elevation: 3,
            }}
        >
            {/* Coloured top stripe */}
            <View style={{ height: 4, backgroundColor: accent }} />

            <View style={{ padding: moderateScale(18) }}>

                {/* Top row: icon + progress badge */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: moderateScale(14) }}>
                    <View
                        style={{
                            width: scaleWidth(44),
                            height: scaleWidth(44),
                            borderRadius: scaleWidth(22),
                            backgroundColor: accentLight,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            source={require('@/assets/images/uim_analytics.png')}
                            style={{ width: scaleWidth(26), height: scaleWidth(26) }}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Progress badge */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 4,
                            backgroundColor: accentLight,
                            paddingHorizontal: moderateScale(10),
                            paddingVertical: moderateScale(4),
                            borderRadius: moderateScale(20),
                        }}
                    >
                        <Ionicons
                            name={isNext ? 'rocket-outline' : 'stats-chart'}
                            size={13}
                            color={accent}
                        />
                        <Text style={{ fontSize: scaleFont(12), fontWeight: '700', color: accent }}>
                            {isNext ? 'Up Next' : `${progress}%`}
                        </Text>
                    </View>
                </View>

                {/* Course name */}
                <Text
                    style={{
                        fontSize: scaleFont(17),
                        fontWeight: '700',
                        color: '#111827',
                        marginBottom: moderateScale(4),
                    }}
                    numberOfLines={1}
                >
                    {title}
                </Text>

                {/* Subtitle */}
                <Text
                    style={{
                        fontSize: scaleFont(13),
                        color: '#6b7280',
                        marginBottom: moderateScale(16),
                    }}
                    numberOfLines={2}
                >
                    {subtitle}
                </Text>

                {/* Progress bar (hidden for next course) */}
                {!isNext && (
                    <View style={{ marginBottom: moderateScale(16) }}>
                        <View
                            style={{
                                width: '100%',
                                height: moderateScale(7),
                                backgroundColor: '#f3f4f6',
                                borderRadius: moderateScale(4),
                                overflow: 'hidden',
                            }}
                        >
                            <View
                                style={{
                                    height: '100%',
                                    backgroundColor: accent,
                                    borderRadius: moderateScale(4),
                                    width: `${progress}%`,
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: moderateScale(5) }}>
                            <Text style={{ fontSize: scaleFont(11), color: '#9ca3af' }}>Progress</Text>
                            <Text style={{ fontSize: scaleFont(11), fontWeight: '600', color: accent }}>{progress}% completed</Text>
                        </View>
                    </View>
                )}

                {/* Button — hidden when all courses are done */}
                {buttonLabel && (
                    <Pressable
                        onPress={onResume}
                        style={({ pressed }) => ({
                            backgroundColor: pressed ? (isNext ? '#047857' : '#1d4ed8') : accent,
                            paddingVertical: moderateScale(13),
                            borderRadius: moderateScale(14),
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 6,
                        })}
                    >
                        <Ionicons
                            name={isNext ? 'play-circle' : 'arrow-forward-circle'}
                            size={18}
                            color="#fff"
                        />
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: scaleFont(14),
                                fontWeight: '700',
                            }}
                        >
                            {buttonLabel}
                        </Text>
                    </Pressable>
                )}

            </View>
        </View>
    )
}
