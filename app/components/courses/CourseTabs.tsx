import { View, Text, Pressable } from 'react-native'

interface CourseTabsProps {
    activeTab: 'ongoing' | 'completed'
    onTabChange: (tab: 'ongoing' | 'completed') => void
    ongoingCount: number
    completedCount: number
}

export default function CourseTabs({ 
    activeTab, 
    onTabChange, 
    ongoingCount, 
    completedCount 
}: CourseTabsProps) {
    return (
        <View className="flex-row gap-3 mb-6">
            {/* Ongoing Tab */}
            <Pressable
                onPress={() => onTabChange('ongoing')}
                className={`flex-1 py-3 rounded-xl ${
                    activeTab === 'ongoing' ? 'bg-gray-200' : 'bg-white border border-gray-200'
                }`}
            >
                <Text 
                    className={`text-center font-semibold text-base ${
                        activeTab === 'ongoing' ? 'text-gray-800' : 'text-gray-500'
                    }`}
                >
                    Ongoing ({ongoingCount})
                </Text>
            </Pressable>

            {/* Completed Tab */}
            <Pressable
                onPress={() => onTabChange('completed')}
                className={`flex-1 py-3 rounded-xl ${
                    activeTab === 'completed' ? 'bg-blue-100' : 'bg-white border border-gray-200'
                }`}
            >
                <Text 
                    className={`text-center font-semibold text-base ${
                        activeTab === 'completed' ? 'text-blue-600' : 'text-gray-500'
                    }`}
                >
                    Completed ({completedCount})
                </Text>
            </Pressable>
        </View>
    )
}