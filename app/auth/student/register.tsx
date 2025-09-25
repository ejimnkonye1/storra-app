import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const StudentAccountScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    parentContact: '',
    agreeToTerms: false
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const Checkbox = ({ label, value, onValueChange }) => (
    <TouchableOpacity 
      className="flex-row items-center mb-6"
      onPress={() => onValueChange(!value)}
    >
      <View className={`w-5 h-5 border-2 rounded mr-3 items-center justify-center ${
        value ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
      }`}>
        {value && <Text className="text-white text-xs font-bold">✓</Text>}
      </View>
    <Text className="text-gray-700 flex-1">
      I hereby agree to the{" "}
      <Text className="text-blue-500 font-semibold">Terms & Conditions</Text>.
    </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-5 pt-10">
          {/* Title */}
        <View className="relative flex-row items-center justify-center mb-6 mt-3">
      {/* Back button */}
      <TouchableOpacity
      onPress={() => router.push("/auth/choose-account")}
      className="absolute left-0 p-2">
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-2xl font-semibold text-center text-gray-800">
        Student Account
      </Text>
    </View>

          {/* Full Name */}
          <Text className="text-base font-medium text-gray-700 mb-2">Full Name</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 mb-4"
            placeholder="Billie Dom"
            placeholderTextColor="#999"
            value={formData.fullName}
            onChangeText={(value) => updateFormData('fullName', value)}
          />

          {/* Email (Optional) */}
          <Text className="text-base font-medium text-gray-700 mb-2">
            Email <Text className="text-gray-500">(Optional)</Text>
          </Text>
        <View className="relative w-full">
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 mb-4 pr-10"
        placeholder="Nz@gmail.com"
        placeholderTextColor="#999"
        value={formData.email}
        onChangeText={(value) => updateFormData("email", value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Ionicons
        name="mail-outline"
        size={22}
        color="#999"
        style={{ position: "absolute", right: 12, top: 10 }}
      />
    </View>

          {/* Phone Number (Optional) */}
          <Text className="text-base font-medium text-gray-700 mb-2">
            Phone Number <Text className="text-gray-500">(Optional)</Text>
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 mb-4"
            placeholder="+2347062487335"
            placeholderTextColor="#999"
            value={formData.phoneNumber}
            onChangeText={(value) => updateFormData('phoneNumber', value)}
            keyboardType="phone-pad"
          />

          {/* Password */}
          <Text className="text-base font-medium text-gray-700 mb-2">Password</Text>
   <View className="relative w-full">
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 mb-4 pr-10"
        placeholder="******"
        placeholderTextColor="#999"
        value={formData.password}
        onChangeText={(value) => updateFormData("password", value)}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        onPress={() => setShowPassword((prev) => !prev)}
        style={{ position: "absolute", right: 12, top: 10 }}
      >
        <Ionicons
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          size={22}
          color="#666"
        />
      </TouchableOpacity>
    </View>

          {/* Parent Contact */}
          <Text className="text-base font-medium text-gray-700 mb-2">
            Parent Contact (If under 18)
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 mb-6"
            placeholder="parent@email.com"
            placeholderTextColor="#999"
            value={formData.parentContact}
            onChangeText={(value) => updateFormData('parentContact', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Terms & Conditions */}
          <Checkbox
            label="I hereby agree to the Terms & Conditions."
            value={formData.agreeToTerms}
            onValueChange={(value) => updateFormData('agreeToTerms', value)}
          />


          {/* Create Account Button */}
          <TouchableOpacity 
            className={`py-4 rounded-full mb-4 ${
              formData.agreeToTerms ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            disabled={!formData.agreeToTerms}
            onPress={() => router.push('/auth/student/login')}
          >
            <Text className="text-white font-semibold text-center">
              Create My Account
            </Text>
          </TouchableOpacity>
          {/* Divider */}
          <View className="flex-row items-center my-2">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500">Or Sign Up with</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>


          {/* Social Buttons */}

   <View className="flex-col justify-center mb-6 mt-2">
      {/* Google button */}
      <TouchableOpacity className="flex-row items-center justify-center bg-[#ECEDF0] border border-gray-300 rounded-full px-6 py-3">
        <AntDesign name="google" size={20} color="#DB4437" style={{ marginRight: 8 }} />
        <Text className="text-gray-700 font-medium">Google</Text>
      </TouchableOpacity>

      {/* Apple button */}
      <TouchableOpacity className="flex-row items-center justify-center mt-3 bg-[#ECEDF0] border border-gray-300 rounded-full px-6 py-3">
        <FontAwesome name="apple" size={20} color="black" style={{ marginRight: 8 }} />
        <Text className="text-gray-700 font-medium">Apple</Text>
      </TouchableOpacity>
    </View>




          {/* Login Link */}
          <View className="flex-row justify-center items-center mb-8">
            <Text className="text-gray-600">Already have an account? </Text>
<TouchableOpacity onPress={() => router.push("/auth/student/login")}>
              <Text className="text-blue-500 font-semibold">Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StudentAccountScreen;