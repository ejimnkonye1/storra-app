import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function VideoScreen() {
  const router = useRouter();
  const { videoUrl, title } = useLocalSearchParams();

  if (!videoUrl) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-600 text-lg">Video not available</Text>
      </View>
    );
  }

  // Extract YouTube video ID
  const videoIdMatch = (videoUrl as string).match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[1] : '';

  // Dummy data
  const description =
    'This is a detailed explanation of the topic. Here you can describe the lesson, share key points, and give context to the video. This is dummy text for demonstration purposes.';
  const reviews = [
    { id: 1, user: 'Diana', rating: 5, text: 'Excellent video!' },
    { id: 2, user: 'Edward', rating: 4, text: 'Very helpful, but a bit fast-paced.' },
  ];
  const comments = [
    { id: 1, name: 'Alice', comment: 'Great lesson, really helped me understand the topic!' },
    { id: 2, name: 'Bob', comment: 'Very informative. Thanks for this!' },
    { id: 3, name: 'Charlie', comment: 'Could use more examples, but overall good.' },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 pt-12 pb-4 border-b border-gray-200">
        <Pressable onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text className="text-lg font-semibold flex-1">{title || 'Video Lesson'}</Text>
      </View>

      {/* Video Player */}
      <View className="px-4 py-6">
        {videoId ? (
          <YoutubePlayer
            height={250}
            width="100%"
            videoId={videoId}
            play={false}
            webViewStyle={{ borderRadius: 12, overflow: 'hidden' }}
          />
        ) : (
          <Text className="text-gray-500 mt-4">Invalid YouTube link</Text>
        )}
      </View>

      {/* Description */}
      <View className="px-4 pb-6 border-b border-gray-200">
        <Text className="text-lg font-semibold mb-2">Description</Text>
        <Text className="text-gray-700">{description}</Text>
      </View>

      {/* Reviews */}
      <View className="px-4 pb-6 border-b border-gray-200">
        <Text className="text-lg font-semibold mb-2">Reviews</Text>
        {reviews.map((review) => (
          <View key={review.id} className="mb-3">
            <Text className="font-semibold">
              {review.user} - {review.rating}⭐
            </Text>
            <Text className="text-gray-700">{review.text}</Text>
          </View>
        ))}
      </View>

      {/* Comments */}
      <View className="px-4 pb-6">
        <Text className="text-lg font-semibold mb-2">Comments</Text>
        {comments.map((c) => (
          <View key={c.id} className="mb-3">
            <Text className="font-semibold">{c.name}</Text>
            <Text className="text-gray-700">{c.comment}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}