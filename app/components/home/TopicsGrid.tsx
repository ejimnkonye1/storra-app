import { View } from 'react-native'
import TopicCard from './TopicCard'

interface Topic {
    id: number
    title: string
    paragraph: string
    progress: number
    coverImage: any
}

interface TopicsGridProps {
    topics: Topic[]
    likedTopics: {[key: string]: boolean}
    checkedTopics: {[key: string]: boolean}
    onLike: (topicId: number) => void
    onCheck: (topicId: number) => void
    onLearnMore?: (topicId: number) => void
}

export default function TopicsGrid({
    topics,
    likedTopics,
    checkedTopics,
    onLike,
    onCheck,
    onLearnMore
}: TopicsGridProps) {
    return (
        <View className="px-4">
            <View className="flex-row flex-wrap justify-between">
                {topics.map((topic) => (
                    <TopicCard
                        key={topic.id}
                        title={topic.title}
                        paragraph={topic.paragraph}
                        coverImage={topic.coverImage}
                        isLiked={likedTopics[topic.id] || false}
                        isChecked={checkedTopics[topic.id] || false}
                        onLike={() => onLike(topic.id)}
                        onCheck={() => onCheck(topic.id)}
                        onLearnMore={() => onLearnMore?.(topic.id)}
                    />
                ))}
            </View>
        </View>
    )
}