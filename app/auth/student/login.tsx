import { BASE_URL } from "../../../backendconfig";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../../../store/userStore';
import { getCurrentUser } from '../../../services/userService';

export default function StudentLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [isGoogleHovered, setIsGoogleHovered] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    
    // Get Zustand actions
    const { setToken, setUser } = useUserStore();

    const handleShowPassword = () => { 
        setShowPassword(!showPassword);
    }

    const updateFormData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleLogin = async () => {
        if (!formData.email || !formData.password) {
            Alert.alert('Error', 'Email and password are required');
            return;
        }

        setLoading(true);
        try {
            // Step 1: Login and get token
            const response = await axios.post(`${BASE_URL}/student/loginuser`, {
                email: formData.email,
                password: formData.password,
            });

            console.log('Login Success:', response.data);

            // Extract token from response (adjust based on your API response structure)
           const token = response.data.data?.accessToken;

            if (!token) {
                Alert.alert('Error', 'No token received from server');
                return;
            }

            // Step 2: Save token to Zustand and AsyncStorage
            await setToken(token);

            // Step 3: Fetch user profile with the token
            const userResponse = await getCurrentUser(token);
            
            // Extract user data (adjust based on your API response structure)
            const userData = userResponse.data || userResponse;

            // Step 4: Save user data to Zustand
            setUser(userData);

            console.log('User data loaded:', userData);

            // Step 5: Navigate to home
            router.push('/(tabs)/home');
        } catch (error: any) {
            console.error('Login Error:', error.response?.data || error.message);
            Alert.alert(
                'Login Failed', 
                error.response?.data?.message || 'An unexpected error occurred. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView className="flex-1 px-5 pt-10">
                    {/* Title */}
                    <View className="relative flex-row items-center justify-center mb-6 mt-3">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className='absolute left-0 p-2'
                        >
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className='text-2xl text-black font-semibold'>
                            Student Account
                        </Text>  
                    </View>

                    {/* Email Input */}
                    <Text className='text-base font-medium text-gray-800 mb-2'>
                        Email
                    </Text>
                    <TextInput
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 mb-4"
                        value={formData.email}
                        onChangeText={(value) => updateFormData("email", value)}
                    />
                    <Ionicons 
                        name='mail-outline'
                        size={22}
                        color='#999'
                        style={{ position: 'absolute', right: 12, top: 85}}
                    />

                    {/* Password Input */}
                    <Text className='text-base font-medium text-gray-800 mb-2'>
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
                                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                    size={22}
                                    color='#999'
                                    style={{position: 'absolute', right: 2, bottom: -5}}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="absolute right-0 top-12"
                        >
                            <Text className="text-blue-600 mt-2 font-light">
                                Forget Password?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        className="mt-12 bg-blue-600 py-4 rounded-full"
                        disabled={loading}
                    >
                        <Text className="text-center text-white text-lg font-semibold">
                            {loading ? 'Logging in...' : 'Login'}
                        </Text>
                    </TouchableOpacity>

                    <View className="flex-row items-center mt-6 px-4">
                        <View className="flex-1 h-[1px] bg-gray-300" />
                        <Text className="text-gray-600 px-4">
                            Or login with
                        </Text>
                        <View className="flex-1 h-[1px] bg-gray-300" />
                    </View>

                    {/* Social Login Buttons */}
                    <View className="flex-col justify-center mb-6 mt-6 space-y-4">
                        <TouchableOpacity
                            className="flex-row items-center justify-center border border-gray-100 rounded-lg py-3"
                            style={{
                                backgroundColor: isGoogleHovered ? '#4285F4' : 'white'
                            }}
                            onPress={() => { /* Handle Google login */ }}
                            onPressIn={() => setIsGoogleHovered(true)}
                            onPressOut={() => setIsGoogleHovered(false)}
                        >
                            <Ionicons 
                                name="logo-google" 
                                size={24}  
                                color={isGoogleHovered ? "#ffffff" : "#4285F4"}
                            />
                            <Text style={{
                                marginLeft: 12,
                                fontWeight: '500',
                                color: isGoogleHovered ? '#ffffff' : '#374151'
                            }}>
                                Continue with Google
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-center mb-6">
                        <Text className="text-gray-700">
                            Don&apos;t have an account? 
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/auth/student/register')}>
                            <Text className="text-blue-600 font-semibold ml-1">
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}