import Loader from "@/app/components/loader";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "../../../backendconfig";
import { getCurrentUser } from "../../../services/userService";
import { useUserStore } from "../../../store/userStore";

export default function StudentLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleHovered, setIsGoogleHovered] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Zustand actions
  const { setToken, setUser } = useUserStore();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert("Error", "Email and password are required");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Login request
      const response = await axios.post(`${BASE_URL}/student/loginuser`, {
        email: formData.email,
        password: formData.password,
      });

      console.log("🔍 Email:", formData.email);
      console.log("Login Success:", response.data);

      // Step 2: Extract token
      const token = response.data.data?.accessToken;
      if (!token) {
        Alert.alert("Error", "No token received from server");
        return;
      }

      // Step 3: Save token in Zustand + AsyncStorage
      await setToken(token);

      // Step 4: Fetch current user
      const userResponse = await getCurrentUser(token);

      // Step 5: Extract profile (handles both structures)
        // 🧩 Step 6: Normalize and map backend fields
        // extract from response
const profile = response.data.data?.profile || userResponse.data;

// show raw
console.log("📦 Raw profile from backend:", profile);

// map properly
const formattedUser = {
  ...profile,
  classId: profile.currentClassId || "none",
  className:
    profile.currentClassId ||
    profile.currentClassLevel ||
    profile.educationLevel ||
    "No class yet",
};

// fix capitalization and hyphen
if (formattedUser.className && formattedUser.className.includes("-")) {
  formattedUser.className = formattedUser.className
    .replace("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

console.log("🎓 Final formatted user:", formattedUser);
setUser(formattedUser);



      // Step 9: Navigate to home
      router.push("/(tabs)/home");
    } catch (error: any) {
      console.error("Login Error:", error.response?.data || error.message);
      Alert.alert(
        "Login Failed",
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader message="Logging you in..." />;
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-5 pt-10">
          {/* Header */}
          <View className="relative flex-row items-center justify-center mb-6 mt-3">
            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute left-0 p-2"
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-2xl text-black font-semibold">
              Student Account
            </Text>
          </View>

          {/* Email Input */}
          <Text className="text-base font-medium text-gray-800 mb-2">Email</Text>
          <TextInput
            placeholder="Enter your email"
            keyboardType="email-address"
            className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 mb-4"
            value={formData.email}
            onChangeText={(value) => updateFormData("email", value)}
          />

          {/* Password Input */}
          <Text className="text-base font-medium text-gray-800 mb-2">
            Password
          </Text>
          <View className="relative">
            <TextInput
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 mb-4 pr-12"
              value={formData.password}
              onChangeText={(value) => updateFormData("password", value)}
            />
            <View className="absolute right-0 top-0 h-full px-3 justify-center">
              <TouchableOpacity onPress={handleShowPassword}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={22}
                  color="#999"
                  style={{ position: "absolute", right: 2, bottom: -5 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity activeOpacity={0.7} className="self-end mb-6">
            <Text className="text-blue-600 font-light">Forget Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            className={`mt-4 py-4 rounded-full ${
              loading ? "bg-blue-400" : "bg-blue-600"
            }`}
            disabled={loading}
          >
            <Text className="text-center text-white text-lg font-semibold">
              {loading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mt-6 px-4">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="text-gray-600 px-4">Or login with</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>

          {/* Google Login */}
          <View className="flex-col justify-center mb-6 mt-6 space-y-4">
            <TouchableOpacity
              className="flex-row items-center justify-center border border-gray-100 rounded-lg py-3"
              style={{
                backgroundColor: isGoogleHovered ? "#4285F4" : "white",
              }}
              onPress={() => {}}
              onPressIn={() => setIsGoogleHovered(true)}
              onPressOut={() => setIsGoogleHovered(false)}
            >
              <Ionicons
                name="logo-google"
                size={24}
                color={isGoogleHovered ? "#ffffff" : "#4285F4"}
              />
              <Text
                style={{
                  marginLeft: 12,
                  fontWeight: "500",
                  color: isGoogleHovered ? "#ffffff" : "#374151",
                }}
              >
                Continue with Google
              </Text>
            </TouchableOpacity>
          </View>

          {/* Signup Redirect */}
          <View className="flex-row justify-center mb-6">
            <Text className="text-gray-700">Don’t have an account?</Text>
            <TouchableOpacity
              onPress={() => router.push("/auth/student/register")}
            >
              <Text className="text-blue-600 font-semibold ml-1">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
