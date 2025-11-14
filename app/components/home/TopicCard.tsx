import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

interface TopicCardProps {
  title: string;
  paragraph: string;
  coverImage: string; // Full URL from backend
  isLiked: boolean;
  isChecked: boolean;
  onLike: () => void;
  onCheck: () => void;
  onLearnMore?: () => void;
}

export default function TopicCard({
  title,
  paragraph,
  coverImage,
  isLiked,
  isChecked,
  onLike,
  onCheck,
  onLearnMore,
}: TopicCardProps) {
  // ✅ Default placeholder (for failed or empty images)
  const fallbackImage =
    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';

  // ✅ Use backend image if valid, otherwise fallback
  const imageSource =
    coverImage && coverImage.startsWith('http')
      ? { uri: coverImage }
      : { uri: fallbackImage };
//  console.log("✅ cover:", coverImage);
  return (
    <View
      className="bg-white w-[48%] mb-5 p-3 rounded-2xl shadow-sm border border-gray-100"
      style={{ height: 200 }}
    >
      {/* ✅ Remote backend image only */}
      <Image
        source={imageSource}
        className="w-full h-24 rounded-lg mb-3"
        resizeMode="contain"
      />

      {/* Title */}
      <Text
        className="text-gray-900 font-semibold text-base mb-2"
        numberOfLines={2}
      >
        {title}
      </Text>

      {/* Description */}
      <Text className="text-gray-500 text-sm flex-1" numberOfLines={3}>
        {paragraph}
      </Text>

      {/* Buttons */}
      <View className="flex-row w-full items-center justify-between mt-3">
        <Pressable
          className="bg-blue-600 py-2 rounded-full"
          onPress={onLearnMore}
        >
          <Text className="text-white text-center font-semibold text-sm px-4">
            Learn More
          </Text>
        </Pressable>

        <View className="flex-row gap-3">
          <Pressable onPress={onLike}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={20}
              color={isLiked ? 'red' : 'gray'}
            />
          </Pressable>

          <Pressable onPress={onCheck}>
            <Ionicons
              name={isChecked ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={20}
              color={isChecked ? '#60A5FA' : 'gray'}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
