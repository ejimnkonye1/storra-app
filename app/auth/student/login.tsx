import ErrorModal from "@/app/components/error";
import Loader from "@/app/components/loader";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "../../../backendconfig";
import { getCurrentUser } from "../../../services/userService";
import { useUserStore } from "../../../store/userStore";

export default function StudentLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState({ visible: false, title: "", message: "" });
  const { setToken, setUser, setRefreshToken } = useUserStore();

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const showError = (title: string, message: string) => {
    setErrorModal({ visible: true, title, message });
  };

  const hideError = () => {
    setErrorModal(prev => ({ ...prev, visible: false }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      showError("Missing Information", "Email and password are required");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/student/loginuser`, {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.data?.accessToken;
      const rToken = response.data.data?.refreshToken;
      if (!token) {
        showError("Login Failed", "No token received from server");
        return;
      }

      await setToken(token);
      if (rToken) setRefreshToken(rToken);
      const userResponse = await getCurrentUser(token);
      setUser(userResponse.data);
      router.push("/(tabs)/home");
    } catch (error: any) {
      showError(
        "Login Failed",
        error.response?.data?.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 24, paddingBottom: 32 }}
        >
          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mb-6"
          >
            <Ionicons name="arrow-back" size={20} color="#111827" />
          </TouchableOpacity>

          {/* Title */}
          <Text className="text-3xl font-bold text-gray-900 mb-1">Welcome Back</Text>
          <Text className="text-gray-500 text-sm mb-8">Sign in to continue your journey</Text>

          {/* Email */}
          <Text className="text-sm font-semibold text-gray-700 mb-1">Email</Text>
          <View className="relative w-full mb-4">
            <TextInput
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 pr-11"
              placeholderTextColor="#9CA3AF"
              value={formData.email}
              onChangeText={(value) => updateFormData("email", value)}
            />
            <Ionicons name="mail-outline" size={18} color="#9CA3AF" style={{ position: "absolute", right: 14, top: 13 }} />
          </View>

          {/* Password */}
          <Text className="text-sm font-semibold text-gray-700 mb-1">Password</Text>
          <View className="relative w-full mb-2">
            <TextInput
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 pr-11"
              placeholderTextColor="#9CA3AF"
              value={formData.password}
              onChangeText={(value) => updateFormData("password", value)}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(prev => !prev)}
              style={{ position: "absolute", right: 14, top: 13 }}
            >
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity activeOpacity={0.7} className="self-end mb-6">
            <Text className="text-blue-600 text-sm font-medium">Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            className={`rounded-xl py-4 items-center mb-5 ${loading ? "bg-blue-400" : "bg-blue-600"}`}
          >
            <Text className="text-white font-bold text-base">
              {loading ? "Signing in..." : "Login"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-4">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-3 text-gray-400 text-xs">or login with</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Google Button */}
          <TouchableOpacity className="flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-3 mb-6">
            <Ionicons name="logo-google" size={18} color="#DB4437" style={{ marginRight: 8 }} />
            <Text className="text-gray-700 font-semibold text-sm">Continue with Google</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-500 text-sm">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/auth/student/register")}>
              <Text className="text-blue-600 font-bold text-sm">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {loading && (
          <View className="absolute inset-0 bg-black/30 items-center justify-center z-50">
            <Loader />
          </View>
        )}

        <ErrorModal
          visible={errorModal.visible}
          title={errorModal.title}
          message={errorModal.message}
          onClose={hideError}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
