import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ParentLogin() {
    const [ showPassword, setShowPassword ] = useState( false );
    const [ isGoogleHovered, setIsGoogleHovered ] = useState( false );
    const router = useRouter();

    const handleShowPassword = () => { 
        setShowPassword( !showPassword );
    }
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
                    {/* Title */}
                    <Text className='text-2xl text-black font-semibold'>
                        Parent Account
                    </Text>  
                </View>
                {/* Login Form */}
                    <Text className='text-base font-medium text-gray-800 mb-2'>
                        {/* Email Input */}
                        Email
                    </Text>
                    <TextInput
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 mb-4"
                        placeholderClassName='#999'
                    />
                    <Ionicons 
                        name='mail-outline'
                        size={22}
                        color= '#999'
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
                            placeholderClassName='#999'
                        />
                        <View className="absolute right-0 top-0 h-full px-3 justify-center">
                            <TouchableOpacity onPress={handleShowPassword}>
                                <Ionicons 
                                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                    size={22}
                                    color='#999'
                                    style={{position: 'absolute', right: 2 , bottom: -5 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text className=" mt-2 absolute right-0 top-12 font-light hover:underline cursor-pointer">
                            Forget Password?
                        </Text>
                    </View>
                    {/* Login Button */}
                    <TouchableOpacity
                        onPress={() => { /* Handle login action */ }}
                        className="mt-12 bg-blue-600 py-4 rounded-full"
                    >
                        <Text className="text-center text-white text-lg font-semibold">
                            Login
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
                                color={isGoogleHovered ? "#ffffff" : ""}
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
                            <Text className="text-blue-600 font-semibold ml-1"
                            >
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}