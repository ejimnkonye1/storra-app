import { View, Text, ScrollView, Pressable } from 'react-native'
import { forwardRef } from 'react'

interface SubjectTabsProps {
    subjects: string[]
    selectedSubject: number
    onSelectSubject: (index: number) => void
}

const SubjectTabs = forwardRef<ScrollView, SubjectTabsProps>(
    ({ subjects, selectedSubject, onSelectSubject }, ref) => {
        return (
            <View className="px-6 mb-6">
                <ScrollView 
                    ref={ref}
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}  
                    className="bg-gray-100 p-2 rounded-lg"
                >
                    <View className="flex-row gap-4">
                        {subjects.map((subject, index) => {
                            const isActive = selectedSubject === index;
                            return (
                                <Pressable
                                    key={index}
                                    onPress={() => onSelectSubject(index)}
                                    className={`px-4 py-2 rounded-lg ${
                                        isActive ? 'bg-blue-600' : 'transparent'
                                    }`}
                                >
                                    <Text 
                                        className={`text-lg font-medium ${
                                            isActive ? 'text-white' : 'text-gray-800'
                                        }`}
                                    >
                                        {subject}
                                    </Text>
                                </Pressable>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }
)

SubjectTabs.displayName = 'SubjectTabs'

export default SubjectTabs