"use client"

import { BASE_URL } from "@/backendconfig"
import { useUserStore } from "@/store/userStore"
import { Ionicons } from "@expo/vector-icons"
import axios from "axios"
import { Audio } from "expo-av"
import { useLocalSearchParams, useRouter } from "expo-router"
import * as Speech from "expo-speech"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native"

const { width: screenWidth } = Dimensions.get('window')

const correctSound = require("../../../../assets/sounds/correct.mp3")
const failSound = require("../../../../assets/sounds/correct.mp3")
const perfectScoreSound = require("../../../../assets/sounds/celebration.mp3") // Add celebration sound

interface Question {
  questionId: string
  questionText: string
  options?: string[]
  correctAnswer: string
  hint?: string
  visual?: string[]
  type: "multiple_choice" | "short_answer"
}

interface QuizResult {
  score: number
  totalQuestions: number
  percentage: number
  pointsEarned?: number
}

const TTS_SETTINGS = { rate: 0.65, pitch: 1.2, language: "en-US" }

export default function QuizScreenImproved() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { token } = useUserStore()

  const courseId = params.courseId as string
  const quizId = params.quizId as string

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string | number }>({})
  const [quizData, setQuizData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const [answeredCount, setAnsweredCount] = useState(0)

  const optionSpeakIndexRef = useRef<number>(0)
  const speakCancelledRef = useRef<boolean>(false)
  const isSpeakingRef = useRef<boolean>(false)
  const scaleAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!courseId || !quizId) {
      setError("Missing quiz information")
      setIsLoading(false)
      return
    }
    fetchQuiz()
    return () => stopSpeaking()
  }, [courseId, quizId])

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }, [currentIndex])

  const fetchQuiz = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${BASE_URL}/quiz/course/${courseId}/quiz/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.data.data.quiz?.questions?.length > 0) {
        setQuizData(response.data.data.quiz)
      } else {
        setError("Quiz has no questions")
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load quiz")
    } finally {
      setIsLoading(false)
    }
  }

  const stopSpeaking = useCallback(() => {
    try {
      speakCancelledRef.current = true
      isSpeakingRef.current = false
      Speech.stop()
    } catch {}
    setIsSpeaking(false)
    optionSpeakIndexRef.current = 0
  }, [])

  const speakSingle = useCallback((text: string, onDone?: () => void, onError?: () => void) => {
    try {
      setIsSpeaking(true)
      isSpeakingRef.current = true
      speakCancelledRef.current = false
      Speech.speak(text, {
        ...TTS_SETTINGS,
        onDone: () => {
          setIsSpeaking(false)
          isSpeakingRef.current = false
          onDone && onDone()
        },
        onError: () => {
          setIsSpeaking(false)
          isSpeakingRef.current = false
          onError && onError()
        },
      } as any)
    } catch {
      setIsSpeaking(false)
      isSpeakingRef.current = false
      onDone && onDone()
    }
  }, [])

  const speakNextOption = useCallback(
    (q: Question) => {
      const idx = optionSpeakIndexRef.current
      if (!q.options || idx >= q.options.length || speakCancelledRef.current) {
        setIsSpeaking(false)
        isSpeakingRef.current = false
        optionSpeakIndexRef.current = 0
        return
      }

      const letter = String.fromCharCode(65 + idx)
      const optText = `Option ${letter}: ${q.options[idx]}.`

      const onDone = () => {
        optionSpeakIndexRef.current++
        if (optionSpeakIndexRef.current >= q.options.length) {
          setTimeout(() => {
            if (!speakCancelledRef.current && isSpeakingRef.current) {
              speakSingle("Please select your answer.", () => {
                setIsSpeaking(false)
                isSpeakingRef.current = false
              })
            }
          }, 500)
        } else {
          setTimeout(() => speakNextOption(q), 500)
        }
      }

      speakSingle(optText, onDone, onDone)
    },
    [speakSingle],
  )

  const speakQuestionAndOptionsSequential = useCallback(() => {
    if (!quizData?.questions?.[currentIndex]) return
    const q = quizData.questions[currentIndex]
    stopSpeaking()
    speakCancelledRef.current = false
    optionSpeakIndexRef.current = 0
    isSpeakingRef.current = true

    const questionText = `Question ${currentIndex + 1}. ${q.questionText}.`

    const onQuestionDone = () => {
      if (speakCancelledRef.current || !isSpeakingRef.current) return
      if (q.type === "multiple_choice" && q.options?.length) {
        speakNextOption(q)
      } else {
        speakSingle("Please select your answer when ready.", () => {
          setIsSpeaking(false)
          isSpeakingRef.current = false
        })
      }
    }

    speakSingle(questionText, onQuestionDone, () => {
      setIsSpeaking(false)
      isSpeakingRef.current = false
    })
  }, [currentIndex, quizData, speakNextOption, speakSingle, stopSpeaking])

  useEffect(() => {
    if (quizData?.questions?.[currentIndex]) {
      const timer = setTimeout(() => speakQuestionAndOptionsSequential(), 500)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, quizData, speakQuestionAndOptionsSequential])

  const playSound = async (soundFile: any) => {
    const sound = new Audio.Sound()
    try {
      await sound.loadAsync(soundFile)
      await sound.playAsync()
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync()
        }
      })
    } catch (error) {
      console.log("Error playing sound:", error)
    }
  }

  const questions: Question[] = (quizData?.questions?.map((q: any) => ({
    ...q,
    type: q.options?.length ? "multiple_choice" : "short_answer",
  })) || []) as Question[]

  const currentQuestion = questions[currentIndex]
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0

  const handleAnswer = (value: string | number) => {
    stopSpeaking()
    const isNewAnswer = !selectedAnswers.hasOwnProperty(currentQuestion.questionId)

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.questionId]: value,
    }))

    if (isNewAnswer) {
      setAnsweredCount((prev) => prev + 1)
    }

    if (currentQuestion.type === "multiple_choice") {
      const correct = currentQuestion.correctAnswer === value
      playSound(correct ? correctSound : failSound)
      speakSingle(correct ? "Correct! Well done." : `Oops! The correct answer is ${currentQuestion.correctAnswer}`)
    }
  }

  const handleNext = async () => {
    stopSpeaking()
    if (currentIndex < questions.length - 1) {
      scaleAnim.setValue(0)
      setCurrentIndex((prev) => prev + 1)
    } else {
      await submitQuiz()
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      stopSpeaking()
      scaleAnim.setValue(0)
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const submitQuiz = async () => {
    try {
      stopSpeaking()
      const answers = Object.keys(selectedAnswers).map((qid) => ({
        questionId: qid,
        selectedAnswer: selectedAnswers[qid],
      }))

      const response = await axios.post(
        `${BASE_URL}/quiz/course/${courseId}/quiz/${quizId}/submit`,
        { answers, timeSpent: 0 },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      const result = response.data.data
      setQuizResult(result)
      setShowResultModal(true)
      
      // Play celebration sound for perfect score
      if (result.percentage === 100) {
        playSound(perfectScoreSound)
      } else if (result.percentage >= 50) {
        playSound(correctSound)
      } else {
        playSound(failSound)
      }
    } catch {
      Alert.alert("Error", "Failed to submit quiz")
    }
  }

  // Get result message based on percentage
  const getResultMessage = (percentage: number) => {
    if (percentage === 100) return '🎉 Perfect score! You earned 5 bonus points!'
    if (percentage >= 70) return '✅ Quiz completed!'
    if (percentage >= 50) return '⚠️ Nice one, but try to improve your score'
    return '❌ You need to retake this quiz'
  }

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-600 mt-4 font-medium">Loading quiz...</Text>
      </View>
    )

  if (error || !quizData || questions.length === 0)
    return (
      <View className="flex-1 items-center justify-center bg-gradient-to-b from-red-50 to-white px-4">
        <View className="bg-red-100 p-3 rounded-full mb-4">
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
        </View>
        <Text className="text-gray-900 text-xl font-bold mt-4 text-center">Quiz Not Available</Text>
        <Text className="text-gray-600 text-center mt-2 mb-6 text-sm">{error || "No questions."}</Text>
        <Pressable onPress={() => router.back()} className="bg-blue-600 px-8 py-3 rounded-full">
          <Text className="text-white font-semibold">Go Back</Text>
        </Pressable>
      </View>
    )

  const renderVisualImage = (question: Question) => {
    if (!question.visual?.length) return null
    const imageUri = question.visual[0] || question.visual[1]
    if (!imageUri) return null
    
    return (
      <View className="mb-6 items-center">
        <View className="bg-gradient-to-b from-gray-100 to-gray-50 rounded-2xl overflow-hidden p-2 w-full">
          <Image 
            source={{ uri: imageUri }} 
            className="w-full h-56 rounded-xl" 
            resizeMode="contain" 
            onError={() => console.log("Image failed to load")}
          />
        </View>
        {question.visual.length > 1 && <Text className="text-xs text-gray-500 text-center mt-2"></Text>}
      </View>
    )
  }

  const renderQuestion = () => (
    <View className="px-4">
      {/* Responsive Header Section */}
      <View className="mb-3">
        {/* Back button row - separate row for small screens */}
        <View className="flex-row items-center justify-between mb-3">
          <Pressable 
            onPress={() => router.back()} 
            className="p-2 rounded-full bg-gray-100"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={22} color="#374151" />
          </Pressable>
          
          {/* Question counter for mobile */}
          <Text className="text-gray-700 font-semibold text-sm">
            {currentIndex + 1}/{questions.length}
          </Text>
        </View>

        {/* Course Title */}
        <Text className="text-gray-800 text-lg font-bold mb-1">
          {quizData?.quizTitle || "Quiz"}
        </Text>
        
        {/* Question text */}
        <View className="mb-4">
          <Text className="text-gray-900 text-xl font-bold leading-tight">
            Question {currentIndex + 1}
          </Text>
          <Text className="text-gray-800 text-lg font-medium mt-2 leading-relaxed">
            {currentQuestion.questionText}
          </Text>
        </View>

        {/* TTS Controls - Responsive row */}
        <View className="flex-row justify-center gap-3 mb-4">
          <Pressable
            onPress={speakQuestionAndOptionsSequential}
            className={`p-3 rounded-full ${isSpeaking ? "bg-blue-600" : "bg-blue-500"}`}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="volume-high" size={22} color="white" />
          </Pressable>
          {currentQuestion.hint && (
            <Pressable 
              onPress={() => speakSingle(currentQuestion.hint)} 
              className="p-3 bg-emerald-500 rounded-full"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="help-circle" size={22} color="white" />
            </Pressable>
          )}
          <Pressable 
            onPress={stopSpeaking} 
            className="p-3 bg-red-500 rounded-full"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="stop-circle" size={22} color="white" />
          </Pressable>
        </View>
      </View>

      {renderVisualImage(currentQuestion)}

      {currentQuestion.type === "short_answer" ? (
        <TextInput
          className="border-2 border-gray-300 p-4 rounded-xl mb-4 text-gray-900 bg-white"
          placeholder="Type your answer here..."
          placeholderTextColor="#9CA3AF"
          value={selectedAnswers[currentQuestion.questionId]?.toString() || ""}
          onChangeText={(text) => handleAnswer(text)}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      ) : (
        <View className="gap-3">
          {currentQuestion.options?.map((opt: string, idx: number) => {
            const selected = selectedAnswers[currentQuestion.questionId] === opt
            const correct = currentQuestion.correctAnswer === opt
            const isAnswered = selectedAnswers[currentQuestion.questionId]

            return (
              <Animated.View key={idx} style={{ transform: [{ scale: scaleAnim }] }}>
                <Pressable
                  onPress={() => handleAnswer(opt)}
                  disabled={!!isAnswered}
                  className={`p-4 rounded-xl border-2 ${
                    selected
                      ? correct
                        ? "bg-emerald-50 border-emerald-500"
                        : "bg-red-50 border-red-500"
                      : isAnswered
                        ? "border-gray-200 bg-gray-50 opacity-60"
                        : "border-gray-200 bg-white"
                  }`}
                >
                  <View className="flex-row items-start">
                    <Text
                      className={`text-lg font-bold mr-3 mt-0.5 ${
                        selected ? (correct ? "text-emerald-600" : "text-red-600") : "text-gray-600"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}.
                    </Text>
                    <Text className={`flex-1 text-base ${selected ? (correct ? "text-emerald-900" : "text-red-900") : "text-gray-800"}`}>
                      {opt}
                    </Text>
                  </View>
                </Pressable>
              </Animated.View>
            )
          })}
        </View>
      )}
    </View>
  )

  return (
    <View className="flex-1 bg-white">
      {/* Progress Bar - Fixed at top */}
      <View className="bg-gradient-to-b from-blue-50 to-white border-b border-gray-200 pt-10">
        <View className="px-4 pb-3">
          <View className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <View
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-700 font-medium text-sm">
              Progress: {Math.round(progress)}%
            </Text>
            <Text className="text-gray-600 text-xs font-medium">
              {answeredCount}/{questions.length} answered
            </Text>
          </View>
        </View>
      </View>

      {/* Quiz Content */}
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {renderQuestion()}
      </ScrollView>

      {/* Bottom Navigation - Fixed */}
      <View className="absolute bottom-0 left-0 right-0 px-4 py-4 border-t border-gray-200 bg-white">
        <View className="flex-row justify-between gap-3">
          <Pressable
            onPress={handlePrevious}
            disabled={currentIndex === 0}
            className={`flex-1 py-3 rounded-full border-2 ${
              currentIndex === 0 ? "bg-gray-100 border-gray-200 opacity-50" : "bg-white border-gray-300"
            }`}
          >
            <Text className={`text-center font-semibold text-base ${currentIndex === 0 ? "text-gray-400" : "text-gray-700"}`}>
              Previous
            </Text>
          </Pressable>

          <Pressable
            onPress={handleNext}
            className="flex-1 py-3 rounded-full bg-emerald-500 active:bg-emerald-600"
          >
            <Text className="text-center text-white font-semibold text-base">
              {currentIndex === questions.length - 1 ? "Submit Quiz" : "Next"}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Result Modal */}
      <Modal visible={showResultModal} transparent={true} animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/40">
          <View className="bg-white rounded-3xl p-6 mx-4 max-w-md w-full">
            {/* Celebration animation for perfect score */}
            {quizResult?.percentage === 100 && (
              <View className="absolute -top-10 -right-10">
                <Ionicons name="trophy" size={80} color="#F59E0B" />
              </View>
            )}
            
            <View
              className={`w-16 h-16 rounded-full mb-4 self-center items-center justify-center ${
                quizResult && quizResult.percentage >= 50 ? "bg-emerald-100" : "bg-red-100"
              }`}
            >
              {quizResult?.percentage === 100 ? (
                <Ionicons name="trophy" size={40} color="#F59E0B" />
              ) : (
                <Ionicons
                  name={quizResult && quizResult.percentage >= 50 ? "checkmark-circle" : "close-circle"}
                  size={40}
                  color={quizResult && quizResult.percentage >= 50 ? "#10B981" : "#EF4444"}
                />
              )}
            </View>

            <Text className="text-2xl font-bold text-gray-900 mb-3 text-center">
              {quizResult?.percentage === 100 ? "Perfect Score! 🎉" : 
               quizResult && quizResult.percentage >= 50 ? "Great Job!" : "Quiz Completed"}
            </Text>

            {/* Result Message */}
            {quizResult && (
              <Text className="text-gray-700 text-lg font-medium mb-6 text-center">
                {getResultMessage(quizResult.percentage)}
              </Text>
            )}

            {quizResult && (
              <View className="w-full bg-gray-50 rounded-2xl p-4 mb-6 gap-3">
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-600 font-medium">Score</Text>
                  <Text className="text-lg font-bold text-gray-900">
                    {quizResult.score}/{quizResult.totalQuestions}
                  </Text>
                </View>
                {quizResult.pointsEarned && (
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gray-600 font-medium">Points Earned</Text>
                    <Text className="text-lg font-bold text-emerald-600">+{quizResult.pointsEarned}</Text>
                  </View>
                )}
                {quizResult.percentage === 100 && (
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gray-600 font-medium">Bonus Points</Text>
                    <Text className="text-lg font-bold text-yellow-600">+5 🎉</Text>
                  </View>
                )}
              </View>
            )}

            <Pressable
              onPress={() => {
                setShowResultModal(false)
                router.back()
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 py-3 rounded-full"
            >
              <Text className="text-white font-semibold text-center text-base">Back to Course</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}