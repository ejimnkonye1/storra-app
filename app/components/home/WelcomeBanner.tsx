import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { moderateScale, scaleFont, scaleWidth, SCREEN } from '../../../utils/responsive';
import ProfileAvatar from './ProfileAvatar';

interface WelcomeBannerProps {
  fullname: string;
  grade: string;
  profileImage: string | null;
}

export default function WelcomeBanner({ fullname, grade, profileImage }: WelcomeBannerProps) {
  const firstName = fullname?.trim().split(' ')[0] || 'Student';

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: moderateScale(24),
        marginTop: moderateScale(3),
        marginBottom: moderateScale(10),
        gap: moderateScale(12),
      }}
    >
      {/* Profile Avatar */}
      <ProfileAvatar
        fullname={fullname}
        profileImage={profileImage}
        size={scaleWidth(48)}
      />

      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          {/* Greeting */}
          <Text
            style={{
              marginTop: moderateScale(8),
              fontSize: scaleFont(SCREEN.isSmall ? 18 : 22),
              fontWeight: '600',
              color: '#1f2937',
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            Welcome back, {firstName}!
          </Text>

          {/* Subtitle */}
          <Text
            style={{
              fontSize: scaleFont(SCREEN.isSmall ? 14 : 16),
              color: '#6b7280',
              marginTop: moderateScale(4),
            }}
            numberOfLines={2}
          >
            Here&apos;s your learning journey today
          </Text>
        </View>

        {/* Class Display */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: moderateScale(24),
            marginLeft: moderateScale(8),
          }}
        >
          <Text
            style={{
              color: '#2563eb',
              fontWeight: '600',
              fontSize: scaleFont(14),
            }}
          >
            {grade}
          </Text>
          <Ionicons name="chevron-down" size={scaleWidth(15)} color="#2563eb" />
        </View>
      </View>
    </View>
  );
}
