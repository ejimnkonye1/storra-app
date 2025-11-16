import { Image, Text, View } from 'react-native';
import { scaleFont } from '../../../utils/responsive';
import { getInitials } from '../../../utils/userUtils';

interface ProfileAvatarProps {
  fullname: string;
  profileImage?: string | null;
  size?: number;
  profilePictureUrl?: string | null;
}

export default function ProfileAvatar({ 
  fullname, 
  profileImage, 
  size = 48 
}: ProfileAvatarProps) {
  const initials = getInitials(fullname);

  if (profileImage) {
    return (
      <Image
        source={{ uri: profileImage }}
        style={{ 
          width: size, 
          height: size, 
          borderRadius: size / 2 
        }}
        resizeMode="cover"
      />
    );
  }

  return (
    <View 
      style={{ 
        width: size, 
        height: size, 
        borderRadius: size / 2,
        backgroundColor: '#3b82f6',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text 
        style={{ 
          color: 'white', 
          fontSize: scaleFont(size * 0.4),
          fontWeight: '600'
        }}
      >
        {initials}
      </Text>
    </View>
  );
}