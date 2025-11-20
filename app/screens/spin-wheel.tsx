import { getCurrentUser } from "@/services/userService";
import { useUserStore } from "@/store/userStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";
import { BASE_URL } from "../../backendconfig";
const rewards = [
  { label: "1 Diamond", color: "#D6E4FF" },
  { label: "5 Diamonds", color: "#EDF2FF" },
  { label: "20 Diamonds", color: "#E0ECFF" },
  { label: "Storra Sticker", color: "#D6E4FF" },
  { label: "Storra Shirt", color: "#EDF2FF" },
  { label: "₦100 Airtime", color: "#E0ECFF" },
  { label: "₦200 Airtime", color: "#CAE2FF" },
  { label: "Free Spin", color: "#D6E4FF" },
];

export default function SpinWheelScreen() {
  const rotation = useRef(new Animated.Value(0)).current;
  const [spinsLeft, setSpinsLeft] = useState<number>(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const router = useRouter();

  const { token } = useUserStore();

  // ✅ 1. Load user spins on screen load
  useEffect(() => {
    loadUserSpins();
  }, []);

  const loadUserSpins = async () => {
    if (!token) return;

    try {
      const userRes = await getCurrentUser(token);
      const user = userRes?.data;
      console.log("use spin", userRes);
      console.log("user spin", user.spinChances);
      setSpinsLeft(user.spinChances || 0);
    } catch (err) {
      console.log("❌ Failed to load spins:", err);
    }
  };

  // ✅ 2. Spin wheel function
const spinWheel = async () => {
  console.log("➡️ Spin button pressed");
  console.log("Current spinning state:", spinning);
  console.log("Current spinsLeft:", spinsLeft);

  if (spinning) {
    console.log("⛔ Already spinning, cannot spin again");
    return;
  }

  if (spinsLeft <= 0) {
    console.log("⛔ No spins left");
    return;
  }

  setSpinning(true);
  setResult(null);

  try {
    if (!token) {
      console.log("⛔ No token, redirecting to login");
      router.replace("/auth/student/login");
      setSpinning(false);
      return;
    }

    console.log("🔹 Token exists, sending POST request");

    const res = await fetch(`${BASE_URL}/spin/spinthewheel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("🔹 Response received, status:", res.status);

    const data = await res.json();
    console.log("🔹 Response JSON:", data);

    if (!res.ok) {
      console.log("⛔ POST request failed:", data.message);
      alert(data.message || "Something went wrong");
      setSpinning(false);
      return;
    }

    const reward = data.data.reward;
    const updatedSpins = data.data.balances.spinChances;
    console.log("🔹 Reward received:", reward);
    console.log("🔹 Updated spinsLeft:", updatedSpins);

    setSpinsLeft(updatedSpins);

    const rewardIndex = rewards.findIndex((r) => r.label === reward.name);
    const randomIndex =
      rewardIndex === -1
        ? Math.floor(Math.random() * rewards.length)
        : rewardIndex;

    const segmentAngle = 360 / rewards.length;
    const fullRotations = 5;
    const targetRotation =
      360 * fullRotations + randomIndex * segmentAngle + segmentAngle / 2;

    console.log("🔹 Animating wheel to rotation:", targetRotation);

    Animated.timing(rotation, {
      toValue: targetRotation,
      duration: 5000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => {
      setSpinning(false);
      setResult(reward.name);
      console.log("🎉 Spin complete, result:", reward.name);
    });
  } catch (err) {
    console.log("❌ Network error:", err);
    alert("Network error. Try again!");
    setSpinning(false);
  }
};


  const spinInterpolation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="flex-1 bg-white items-center pt-16">
      {/* Back */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-6 z-10"
      >
        <Ionicons name="arrow-back" size={24} color="#1E3A8A" />
      </TouchableOpacity>

      <Text className="text-xl font-bold text-blue-900 mb-3">Daily Spin</Text>

      {/* Spins Left */}
      <View className="flex-row items-center bg-blue-50 px-4 py-2 rounded-full mb-6">
        <Ionicons name="ticket-outline" size={16} color="#1E3A8A" />
        <Text className="text-blue-900 font-semibold ml-2">
          Your Spins: {spinsLeft}
        </Text>
      </View>

      {/* Pointer */}
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

        <View className="w-20 h-20 bg-white rounded-full border-4 border-blue-600 justify-center items-center">
          <Ionicons name="gift-outline" size={28} color="#2563EB" />
        </View>
      </Animated.View>

      {/* Spin Button */}
      <TouchableOpacity
        onPress={spinWheel}
        // disabled={spinning || spinsLeft <= 0}
        className={`mt-10 rounded-full w-80 py-4 bg-blue-600
          ${''
          // spinning || spinsLeft <= 0 ? "bg-gray-300" : "bg-blue-600"
        }
        `
      }
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
