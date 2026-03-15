import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../../store/userStore';

const TABS = ['saved', 'favourite'] as const;
type Tab = typeof TABS[number];

export default function LibraryScreen() {
  const router = useRouter();
  const { tab } = useLocalSearchParams<{ tab: Tab }>();
  const [activeTab, setActiveTab] = useState<Tab>(tab === 'favourite' ? 'favourite' : 'saved');

  const { getLikedTopics, getCheckedTopics, subjects } = useUserStore();

  // Re-sync tab if navigated with a different param
  useEffect(() => {
    if (tab === 'favourite' || tab === 'saved') setActiveTab(tab);
  }, [tab]);

  // heart = liked = "Saved", checkmark = checked = "Favourite"
  const savedTopics = getLikedTopics();
  const favouriteTopics = getCheckedTopics();

  const topics = activeTab === 'saved' ? savedTopics : favouriteTopics;

  // Find which subject/course a topic belongs to
  const getCourseNameForTopic = (topicId: string) => {
    for (const subject of subjects) {
      if (subject.topics.find(t => t.id === topicId)) return subject.name;
    }
    return '';
  };

  const handleLearnMore = (topicId: string) => {
    for (const subject of subjects) {
      const topicIndex = subject.topics.findIndex(t => t.id === topicId);
      if (topicIndex >= 0) {
        router.push({
          pathname: '/screens/learning',
          params: {
            topic: JSON.stringify(subject.topics[topicIndex]),
            topicsList: JSON.stringify(subject.topics),
            currentIndex: topicIndex.toString(),
            courseId: subject.id,
          },
        });
        return;
      }
    }
  };

  const fallbackImage = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 pt-2 pb-4 border-b border-gray-100">
        <Pressable onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </Pressable>
        <Text className="text-xl font-bold text-gray-900">My Library</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row mx-4 mt-4 mb-2 bg-gray-100 rounded-xl p-1">
        {TABS.map(t => (
          <Pressable
            key={t}
            onPress={() => setActiveTab(t)}
            className={`flex-1 py-2 rounded-lg items-center ${activeTab === t ? 'bg-white shadow' : ''}`}
          >
            <Text className={`text-sm font-semibold capitalize ${activeTab === t ? 'text-blue-600' : 'text-gray-500'}`}>
              {t === 'saved' ? 'Saved' : 'Favourite'}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Count */}
      <Text className="text-xs text-gray-400 px-4 mb-3">
        {topics.length} {topics.length === 1 ? 'topic' : 'topics'}
      </Text>

      {/* List */}
      {topics.length === 0 ? (
        <View className="flex-1 items-center justify-center pb-20">
          <Ionicons
            name={activeTab === 'saved' ? 'heart-outline' : 'checkmark-circle-outline'}
            size={56}
            color="#d1d5db"
          />
          <Text className="text-gray-400 text-base mt-3 font-medium">
            No {activeTab === 'saved' ? 'saved' : 'favourite'} topics yet
          </Text>
          <Text className="text-gray-300 text-sm mt-1 text-center px-10">
            {activeTab === 'saved'
              ? 'Tap the heart icon on any topic to save it here'
              : 'Tap the checkmark icon on any topic to mark it as favourite'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={topics}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
          contentContainerStyle={{ paddingBottom: 32, gap: 12 }}
          renderItem={({ item }) => {
            const imageSource =
              item.coverImage && item.coverImage.startsWith('http')
                ? { uri: item.coverImage }
                : { uri: fallbackImage };
            return (
              <View className="flex-1 bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">
                <Image
                  source={imageSource}
                  className="w-full h-24 rounded-lg mb-3"
                  resizeMode="contain"
                />
                <Text className="text-gray-900 font-semibold text-sm mb-0.5" numberOfLines={2}>
                  {item.title}
                </Text>
                <Text className="text-gray-400 text-xs mb-1" numberOfLines={1}>
                  {getCourseNameForTopic(item.id)}
                </Text>
                <Text className="text-gray-500 text-xs mb-3" numberOfLines={2}>
                  {item.paragraph}
                </Text>
                <Pressable
                  className="bg-blue-600 py-1.5 px-3 rounded-full self-start"
                  onPress={() => handleLearnMore(item.id)}
                >
                  <Text className="text-white text-xs font-semibold">Learn More</Text>
                </Pressable>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}
