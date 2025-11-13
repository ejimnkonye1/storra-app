import { FlatList, View } from 'react-native';
import TopicCard from './TopicCard';

interface Topic {
  id: string; // Changed from number to string
  title: string;
  paragraph: string;
  coverImage: any;
}

interface TopicsGridProps {
  topics: Topic[];
  likedTopics: { [key: string]: boolean }; // Changed key type
  checkedTopics: { [key: string]: boolean }; // Changed key type
  onLike: (topicId: string) => void; // Changed parameter type
  onCheck: (topicId: string) => void; // Changed parameter type
  onLearnMore: (topicId: string) => void; // Changed parameter type
}

export default function TopicsGrid({
  topics,
  likedTopics,
  checkedTopics,
  onLike,
  onCheck,
  onLearnMore,
}: TopicsGridProps) {
    // console.log("✅ TopicsGrid received topics:", topics);
  return (
    <View className="px-6 mb-6">
      <FlatList
        data={topics}
        renderItem={({ item }) => (
          <TopicCard
            title={item.title}
            paragraph={item.paragraph}
            coverImage={item.coverImage}
            isLiked={likedTopics[item.id] || false}
            isChecked={checkedTopics[item.id] || false}
            onLike={() => onLike(item.id)}
            onCheck={() => onCheck(item.id)}
            onLearnMore={() => onLearnMore(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        scrollEnabled={false}
      />
    </View>
  );
}