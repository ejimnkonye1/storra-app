import { View, Text } from 'react-native'

interface SectionHeaderProps {
    title: string
    actionText?: string
    onAction?: () => void
}

export default function SectionHeader({ title, actionText, onAction }: SectionHeaderProps) {
    return (
        <View className="flex-row justify-between mx-6 mt-2">
            <Text className="text-gray-800 text-2xl font-semibold mb-4">
                {title}
            </Text>
            {actionText && (
                <Text 
                    className="text-blue-500 text-lg font-bold mb-6"
                    onPress={onAction}
                >
                    {actionText}
                </Text>
            )}
        </View>
    )
}