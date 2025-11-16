import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

interface CourseCardProps {
  title: string;
  subtitle: string;
  coverImage: any;
  progress?: number; // Now comes from backend API
  isCompleted: boolean;
  topicData: any;
  onStartQuiz?: () => void;
  // New props from backend
  completedLessons?: number;
  totalLessons?: number;
  status?: 'not_started' | 'in_progress' | 'completed';
}

export default function CourseCard({
  title,
  subtitle,
  coverImage,
  progress = 0, // Default to 0 if not provided
  isCompleted,
  topicData,
  onStartQuiz,
  completedLessons = 0,
  totalLessons = 0,
  status = 'not_started',
}: CourseCardProps) {
  const router = useRouter();

  const handleContinue = () => {
    router.push({
      pathname: '/screens/coursedetails',
      params: { topic: JSON.stringify(topicData) },
    });
  };

  // Calculate completion status
  const isFullyCompleted = status === 'completed' || isCompleted;
  const hasStarted = status !== 'not_started' || progress > 0;

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-200 shadow-sm">
      <View className="flex-row items-center">
        {/* Course Image */}
        <Image
          source={{ uri: coverImage }}
          className="w-24 h-24 rounded-xl mr-4"
          resizeMode="cover"
        />

        {/* Course Info */}
        <View className="flex-1">
          <Text className="text-gray-900 text-lg font-semibold mb-1">
            {title}
          </Text>
          <Text className="text-blue-600 text-sm mb-1">{subtitle}</Text>

          {/* Lesson Count */}
          {totalLessons > 0 && (
            <Text className="text-gray-500 text-xs mb-2">
              {completedLessons}/{totalLessons} lessons completed
            </Text>
          )}

          {/* Action Button */}
          {isFullyCompleted ? (
            <Pressable
              onPress={onStartQuiz}
              className="bg-blue-600 py-2 px-6 rounded-full self-start"
            >
              <Text className="text-white font-semibold text-sm">
                Start Quiz
              </Text>
            </Pressable>
          ) : (
            <>
              {/* Progress Bar */}
              {hasStarted && (
                <View className="mb-2">
                  <View className="w-full h-2 bg-gray-200 rounded-full">
                    <View
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </View>
                  <Text className="text-xs text-gray-500 mt-1">
                    {progress}% complete
                  </Text>
                </View>
              )}
              <Pressable
                onPress={handleContinue}
                className={`py-2 px-6 rounded-full self-start ${
                  hasStarted ? 'bg-gray-100' : 'bg-blue-600'
                }`}
              >
                <Text
                  className={`font-semibold text-sm ${
                    hasStarted ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {hasStarted ? 'Continue' : 'Start Course'}
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </View>
  );
}