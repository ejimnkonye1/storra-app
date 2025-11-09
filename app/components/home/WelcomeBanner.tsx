import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProfileAvatar from './ProfileAvatar';

interface WelcomeBannerProps {
  fullname: string;
  grade: string;
  profileImage?: string | null;
}

export default function WelcomeBanner({ fullname, grade, profileImage }: WelcomeBannerProps) {
  // Extract first name from fullname
  const firstName = fullname.trim().split(' ')[0];

  return (
    <View className="flex-row text-center items-start gap-8 px-6 mt-4 mb-6">
      <ProfileAvatar 
        fullname={fullname}
        profileImage={profileImage}
        size={48}
      />
      <View className='flex-row'>
        <View>
          <Text className="mt-2 text-2xl font-semibold text-gray-800">
            Welcome back, {firstName}!
          </Text>
          <Text className="text-gray-500 text-lg">
            Here&apos;s your learning Journey today
          </Text>
        </View>
        <View className='flex-row pl-8 mt-6'>
          <Text className="text-blue-600 font-semibold mt-2">{grade} </Text>
          <Ionicons 
            name="chevron-down" 
            size={15} 
            color="blue" 
            style={{ marginTop: 6 }}
          />
        </View>
      </View>
    </View>
  );
}