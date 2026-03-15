import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../../store/userStore';

type Tab = 'saved' | 'favourite';

export default function LibraryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialTab: Tab = params.tab === 'favourite' ? 'favourite' : 'saved';
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  const { getLikedTopics, getCheckedTopics, subjects } = useUserStore();

  // heart icon = liked = "Saved", checkmark icon = checked = "Favourite"
  const topics = activeTab === 'saved' ? getLikedTopics() : getCheckedTopics();

  const getCourseNameForTopic = (topicId: string): string => {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
        <Pressable onPress={() => router.back()} style={{ marginRight: 12 }}>
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </Pressable>
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827' }}>My Library</Text>
      </View>

      {/* Tab switcher */}
      <View style={{ flexDirection: 'row', marginHorizontal: 16, marginTop: 16, marginBottom: 8, backgroundColor: '#f3f4f6', borderRadius: 12, padding: 4 }}>
        {(['saved', 'favourite'] as Tab[]).map(t => (
          <Pressable
            key={t}
            onPress={() => setActiveTab(t)}
            style={{
              flex: 1,
              paddingVertical: 8,
              borderRadius: 10,
              alignItems: 'center',
              backgroundColor: activeTab === t ? '#fff' : 'transparent',
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: activeTab === t ? '#2563eb' : '#6b7280', textTransform: 'capitalize' }}>
              {t === 'saved' ? 'Saved' : 'Favourite'}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Count */}
      <Text style={{ fontSize: 12, color: '#9ca3af', paddingHorizontal: 16, marginBottom: 12 }}>
        {topics.length} {topics.length === 1 ? 'topic' : 'topics'}
      </Text>

      {/* Empty state */}
      {topics.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80 }}>
          <Ionicons
            name={activeTab === 'saved' ? 'heart-outline' : 'checkmark-circle-outline'}
            size={56}
            color="#d1d5db"
          />
          <Text style={{ color: '#9ca3af', fontSize: 16, marginTop: 12, fontWeight: '500' }}>
            No {activeTab === 'saved' ? 'saved' : 'favourite'} topics yet
          </Text>
          <Text style={{ color: '#d1d5db', fontSize: 14, marginTop: 4, textAlign: 'center', paddingHorizontal: 40 }}>
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
              <View style={{ flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#f3f4f6', borderRadius: 16, padding: 12 }}>
                <Image
                  source={imageSource}
                  style={{ width: '100%', height: 96, borderRadius: 8, marginBottom: 12 }}
                  contentFit="contain"
                  cachePolicy="memory-disk"
                />
                <Text style={{ color: '#111827', fontWeight: '600', fontSize: 14, marginBottom: 2 }} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={{ color: '#9ca3af', fontSize: 12, marginBottom: 4 }} numberOfLines={1}>
                  {getCourseNameForTopic(item.id)}
                </Text>
                <Text style={{ color: '#6b7280', fontSize: 12, marginBottom: 12 }} numberOfLines={2}>
                  {item.paragraph}
                </Text>
                <Pressable
                  onPress={() => handleLearnMore(item.id)}
                  style={{ backgroundColor: '#2563eb', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, alignSelf: 'flex-start' }}
                >
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>Learn More</Text>
                </Pressable>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}
