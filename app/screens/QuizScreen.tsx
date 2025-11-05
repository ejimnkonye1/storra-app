// app/screens/quiz-taking.tsx
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { quizzes, QuizQuestion } from '@/data/quizData'

export default function QuizTaking() {
  const router = useRouter()
  const { quizId } = useLocalSearchParams()
  const quiz = quizzes.find(q => q.id === quizId)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: any }>({})
  const [matchingPairs, setMatchingPairs] = useState<{ [key: string]: string }>({})

  if (!quiz) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Quiz not found</Text>
      </View>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Quiz completed
      router.back()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const renderMultipleChoice = (question: QuizQuestion) => {
    const selectedOption = selectedAnswers[question.id]

    return (
      <View className="px-4">
        <Text className="text-gray-900 text-base mb-6 leading-6">
          {question.question}
        </Text>

        <View className="space-y-3">
          {question.options?.map(option => {
            const isSelected = selectedOption === option.id
            return (
              <Pressable
                key={option.id}
                onPress={() =>
                  setSelectedAnswers({ ...selectedAnswers, [question.id]: option.id })
                }
                className={`flex-row items-center p-4 rounded-lg border-2 ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600'
                    : 'bg-white border-gray-200'
                }`}
              >
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                    isSelected ? 'bg-white' : 'bg-gray-100'
                  }`}
                >
                  <Text
                    className={`font-bold ${
                      isSelected ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {option.id}
                  </Text>
                </View>
                <Text
                  className={`flex-1 ${
                    isSelected ? 'text-white font-semibold' : 'text-gray-900'
                  }`}
                >
                  {option.text}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </View>
    )
  }

  const renderTrueFalse = (question: QuizQuestion) => {
    const selectedOption = selectedAnswers[question.id]

    return (
      <View className="px-4">
        <Text className="text-gray-900 text-base mb-6 leading-6">
          {question.question}
        </Text>

        <View className="flex-row justify-between gap-4">
          {question.options?.map(option => {
            const isSelected = selectedOption === option.id
            const isTrue = option.id === 'true'
            return (
              <Pressable
                key={option.id}
                onPress={() =>
                  setSelectedAnswers({ ...selectedAnswers, [question.id]: option.id })
                }
                className={`flex-1 p-6 rounded-lg border-2 items-center ${
                  isSelected
                    ? isTrue
                      ? 'bg-green-50 border-green-600'
                      : 'bg-red-50 border-red-600'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Ionicons
                  name={isTrue ? 'checkmark' : 'close'}
                  size={32}
                  color={isSelected ? (isTrue ? '#16A34A' : '#DC2626') : '#6B7280'}
                />
                <Text
                  className={`mt-2 font-semibold ${
                    isSelected
                      ? isTrue
                        ? 'text-green-600'
                        : 'text-red-600'
                      : 'text-gray-700'
                  }`}
                >
                  {option.text}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </View>
    )
  }

  const renderShortAnswer = (question: QuizQuestion) => {
    const answer = selectedAnswers[question.id] || ''

    return (
      <View className="px-4">
        <Text className="text-gray-900 text-base mb-6 leading-6">
          {question.question}
        </Text>

        <View>
          <Text className="text-gray-700 font-medium mb-2">Your Answer</Text>
          <TextInput
            className="bg-white border-2 border-gray-200 rounded-lg p-4 text-gray-900"
            placeholder="Type your answer..."
            placeholderTextColor="#9CA3AF"
            value={answer}
            onChangeText={text =>
              setSelectedAnswers({ ...selectedAnswers, [question.id]: text })
            }
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Text Formatting Toolbar */}
        <View className="bg-gray-900 rounded-lg p-3 mt-4 flex-row items-center justify-between">
          <View className="flex-row gap-4">
            <Pressable>
              <Text className="text-white font-bold">B</Text>
            </Pressable>
            <Pressable>
              <Text className="text-white italic">I</Text>
            </Pressable>
            <Pressable>
              <Text className="text-white underline">U</Text>
            </Pressable>
            <Pressable>
              <Ionicons name="list" size={18} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    )
  }

  const renderMatchingPair = (question: QuizQuestion) => {
    const getMatchedRight = (leftItem: string) => matchingPairs[leftItem]
    const isRightUsed = (rightItem: string) =>
      Object.values(matchingPairs).includes(rightItem)

    return (
      <View className="px-4">
        <Text className="text-gray-900 text-base mb-6 leading-6">
          {question.question}
        </Text>

        <View className="space-y-4">
          {question.pairs?.map((pair, index) => {
            const selectedRight = getMatchedRight(pair.left)
            const allRightOptions = question.pairs?.map(p => p.right) || []

            return (
              <View key={index} className="bg-gray-50 p-4 rounded-lg">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="bg-blue-100 px-4 py-2 rounded-lg flex-1 mr-3">
                    <Text className="text-gray-900 font-medium">{pair.left}</Text>
                  </View>
                  <Ionicons name="arrow-forward" size={20} color="#6B7280" />
                </View>

                <View className="flex-row flex-wrap gap-2">
                  {allRightOptions.map((rightOption, rightIndex) => {
                    const isSelected = selectedRight === rightOption
                    const isUsed = isRightUsed(rightOption) && !isSelected

                    return (
                      <Pressable
                        key={rightIndex}
                        onPress={() => {
                          if (!isUsed) {
                            setMatchingPairs({
                              ...matchingPairs,
                              [pair.left]: rightOption,
                            })
                          }
                        }}
                        disabled={isUsed}
                        className={`px-4 py-2 rounded-lg border-2 ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600'
                            : isUsed
                            ? 'bg-gray-200 border-gray-300 opacity-50'
                            : 'bg-white border-pink-300'
                        }`}
                      >
                        <Text
                          className={`${
                            isSelected
                              ? 'text-white font-semibold'
                              : isUsed
                              ? 'text-gray-400'
                              : 'text-gray-900'
                          }`}
                        >
                          {rightOption}
                        </Text>
                      </Pressable>
                    )
                  })}
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple_choice':
        return renderMultipleChoice(currentQuestion)
      case 'true_false':
        return renderTrueFalse(currentQuestion)
      case 'short_answer':
        return renderShortAnswer(currentQuestion)
      case 'matching_pair':
        return renderMatchingPair(currentQuestion)
      default:
        return null
    }
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-4 pt-12 pb-4 border-b border-gray-200">
          <Pressable onPress={() => router.back()} className="mb-4">
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text className="text-sm text-gray-600 mb-1">{quiz.subtitle}</Text>
          <Text className="text-xl font-bold text-gray-900 mb-4">{quiz.title}</Text>

          {/* Progress Bar */}
          <View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </Text>
              <Text className="text-sm text-gray-600">
                00 : {quiz.estimatedTime}
              </Text>
            </View>
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <View
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </View>
          </View>
        </View>

        {/* Question Content */}
        <View className="py-6">{renderQuestion()}</View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="px-4 py-4 bg-white border-t border-gray-200 flex-row justify-between items-center">
        <Pressable
          onPress={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`px-6 py-3 rounded-lg ${
            currentQuestionIndex === 0
              ? 'bg-gray-100'
              : 'bg-gray-200'
          }`}
        >
          <Text
            className={`font-semibold ${
              currentQuestionIndex === 0 ? 'text-gray-400' : 'text-gray-700'
            }`}
          >
            Previous
          </Text>
        </Pressable>

        <Pressable
          onPress={handleNext}
          className="px-6 py-3 rounded-lg bg-blue-600 flex-row items-center"
        >
          <Text className="text-white font-semibold mr-2">
            {currentQuestionIndex === quiz.questions.length - 1 ? 'Submit' : 'Next'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  )
}