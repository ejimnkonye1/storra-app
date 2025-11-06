import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";

const rewards = [
  { label: "50 Points", color: "#D6E4FF" },
  { label: "Free Course", color: "#EDF2FF" },
  { label: "Pen", color: "#E0ECFF" },
  { label: "Badge", color: "#D6E4FF" },
  { label: "100 Points", color: "#EDF2FF" },
  { label: "Certificate", color: "#E0ECFF" },
];

export default function SpinWheelScreen({ navigation }: any) {
  const rotation = useRef(new Animated.Value(0)).current;
  const [spinning, setSpinning] = useState(false);
  const [spinsLeft, setSpinsLeft] = useState(3);
  const [result, setResult] = useState<string | null>(null);
  const router = useRouter();
  const spinWheel = () => {
    if (spinning || spinsLeft <= 0) return;
    setSpinning(true);
    setResult(null);

    const randomIndex = Math.floor(Math.random() * rewards.length);
    const fullRotations = 5; // full spins before stop
    const segmentAngle = 360 / rewards.length;
    const targetRotation = 360 * fullRotations + randomIndex * segmentAngle + segmentAngle / 2;

    Animated.timing(rotation, {
      toValue: targetRotation,
      duration: 5000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => {
      setSpinning(false);
      setSpinsLeft((prev) => prev - 1);
      setResult(rewards[randomIndex].label);
    });
  };

  const spinInterpolation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="flex-1 bg-white items-center pt-16">
      {/* Back Arrow */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-6 z-10"
      >
        <Ionicons name="arrow-back" size={24} color="#1E3A8A" />
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-xl font-bold text-blue-900 mb-3">Daily Spin</Text>

      {/* Spins Left */}
      <View className="flex-row items-center bg-blue-50 px-4 py-2 rounded-full mb-6">
        <Ionicons name="ticket-outline" size={16} color="#1E3A8A" />
        <Text className="text-blue-900 font-semibold ml-2">Your Spins: {spinsLeft}</Text>
      </View>

      {/* Indicator */}
      <View
        style={{
          width: 24,
          height: 24,
          backgroundColor: "#2563EB",
          borderRadius: 12,
          marginBottom: -12,
          zIndex: 10,
        }}
      />

      {/* Wheel */}
      <Animated.View
        style={{
          width: 280,
          height: 280,
          borderRadius: 140,
          borderWidth: 10,
          borderColor: "#E0ECFF",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ rotate: spinInterpolation }],
        }}
      >
        {rewards.map((reward, index) => {
          const rotate = `${index * (360 / rewards.length)}deg`;
          return (
            <View
            className=""
              key={index}
              style={{
                position: "absolute",
                width: "30%",
                height: "30%",
                backgroundColor: reward.color,
                justifyContent: "center",
                alignItems: "center",
                transform: [
                  { rotate },
                  { translateY: -70 },
                  { rotate: `${360 / rewards.length / 2}deg` },
                ],
                borderRadius: 140,
              }}
            >
              <Text className="text-xs font-semibold text-blue-800">
                {reward.label}
              </Text>
            </View>
          );
        })}

        <View className="w-20 h-20 bg-white rounded-full border-4 m-10 border-blue-600 justify-center items-center">
          <Ionicons name="gift-outline" size={28} color="#2563EB" />
        </View>
      </Animated.View>

      {/* Spin Button */}
      <TouchableOpacity
        onPress={spinWheel}
        disabled={spinning || spinsLeft <= 0}
        className={`mt-10 rounded-full w-80 py-4 ${
          spinning || spinsLeft <= 0 ? "bg-gray-300" : "bg-blue-600"
        }`}
      >
        <Text className="text-white text-center font-bold text-lg">
          {spinning ? "Spinning..." : "SPIN THE WHEEL"}
        </Text>
      </TouchableOpacity>

      <Text className="text-gray-500 mt-4 text-center w-72">
        Spin to win points & unlock financial literacy rewards!
      </Text>

      {/* Result */}
      {result && (
        <View className="mt-6 bg-blue-50 px-6 py-3 rounded-full">
          <Text className="text-blue-700 font-semibold">
            🎉 You won: {result}!
          </Text>
        </View>
      )}
    </View>
  );
}
