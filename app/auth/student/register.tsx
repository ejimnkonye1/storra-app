import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { BASE_URL } from "../../../backendconfig";

const StudentAccountScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    parentPhoneNumber: '',
    agreeToTerms: false
  });

  const handleRegister = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }
    if (!formData.fullName) {
      Alert.alert('Error', 'Full name is required');
      return;
    }
    if (!formData.phoneNumber) {
      Alert.alert('Error', 'Phone number is required');
      return;
    }
    if (!formData.agreeToTerms) {
      Alert.alert('Error', 'You must agree to the terms and conditions');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/student/registeruser`, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        parentPhoneNumber: formData.parentPhoneNumber,
      });

      const userId = response.data.data.profile._id || response.data.data.supabaseUser.id;

      Alert.alert(
        'Success! 🎉',
        'Account created successfully! Let\'s personalize your experience.',
        [{
          text: 'Continue',
          onPress: () => router.push({ pathname: '/auth/others/personification', params: { userId } })
        }]
      );
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 24, paddingBottom: 32 }}
        >
          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.push("/auth/choose-account")}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mb-6"
          >
            <Ionicons name="arrow-back" size={20} color="#111827" />
          </TouchableOpacity>

          {/* Title */}
          <Text className="text-3xl font-bold text-gray-900 mb-1">Create Account</Text>
          <Text className="text-gray-500 text-sm mb-6">Fill in your details to get started</Text>

          {/* Full Name */}
          <Text className="text-sm font-semibold text-gray-700 mb-1">Full Name</Text>
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 mb-4"
            placeholder="Billie Dom"
            placeholderTextColor="#9CA3AF"
            value={formData.fullName}
            onChangeText={(value) => updateFormData('fullName', value)}
          />

          {/* Email */}
          <Text className="text-sm font-semibold text-gray-700 mb-1">Email</Text>
          <View className="relative w-full mb-4">
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 pr-11"
              placeholder="you@example.com"
              placeholderTextColor="#9CA3AF"
              value={formData.email}
              onChangeText={(value) => updateFormData("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Ionicons name="mail-outline" size={18} color="#9CA3AF" style={{ position: "absolute", right: 14, top: 13 }} />
          </View>

          {/* Phone Number */}
          <Text className="text-sm font-semibold text-gray-700 mb-1">Phone Number</Text>
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 mb-4"
            placeholder="+234 700 000 0000"
            placeholderTextColor="#9CA3AF"
            value={formData.phoneNumber}
            onChangeText={(value) => updateFormData('phoneNumber', value)}
            keyboardType="phone-pad"
          />

          {/* Password */}
          <Text className="text-sm font-semibold text-gray-700 mb-1">Password</Text>
          <View className="relative w-full mb-4">
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 pr-11"
              placeholder="Create a password"
              placeholderTextColor="#9CA3AF"
              value={formData.password}
              onChangeText={(value) => updateFormData("password", value)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(prev => !prev)}
              style={{ position: "absolute", right: 14, top: 13 }}
            >
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Parent Phone Number */}
          <Text className="text-sm font-semibold text-gray-700 mb-1">
            Parent Phone <Text className="text-gray-400 font-normal">(Optional)</Text>
          </Text>
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 mb-4"
            placeholder="+234 700 000 0000"
            placeholderTextColor="#9CA3AF"
            value={formData.parentPhoneNumber}
            onChangeText={(value) => updateFormData('parentPhoneNumber', value)}
            keyboardType="phone-pad"
          />

          {/* Terms & Conditions */}
          <TouchableOpacity
            className="flex-row items-center mb-5"
            onPress={() => updateFormData('agreeToTerms', !formData.agreeToTerms)}
          >
            <View className={`w-5 h-5 rounded-md border-2 mr-3 items-center justify-center ${
              formData.agreeToTerms ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
            }`}>
              {formData.agreeToTerms && <Text className="text-white text-xs font-bold">✓</Text>}
            </View>
            <Text className="text-gray-600 text-sm flex-1">
              I agree to the{" "}
              <Text className="text-blue-600 font-semibold">Terms & Conditions</Text>
            </Text>
          </TouchableOpacity>

          {/* Create Account Button */}
          <TouchableOpacity
            className={`rounded-xl py-4 items-center mb-5 ${
              formData.agreeToTerms && !isLoading ? 'bg-blue-600' : 'bg-gray-200'
            }`}
            disabled={!formData.agreeToTerms || isLoading}
            onPress={handleRegister}
          >
            {isLoading
              ? <ActivityIndicator color="white" />
              : <Text className={`font-bold text-base ${formData.agreeToTerms ? 'text-white' : 'text-gray-400'}`}>Create My Account</Text>
            }
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-4">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-3 text-gray-400 text-xs">or sign up with</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Social Buttons */}
          <View className="flex-row mb-6" style={{ gap: 12 }}>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-3">
              <AntDesign name="google" size={18} color="#DB4437" style={{ marginRight: 8 }} />
              <Text className="text-gray-700 font-semibold text-sm">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-3">
              <FontAwesome name="apple" size={18} color="#111827" style={{ marginRight: 8 }} />
              <Text className="text-gray-700 font-semibold text-sm">Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-500 text-sm">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/auth/student/login")}>
              <Text className="text-blue-600 font-bold text-sm">Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StudentAccountScreen;
