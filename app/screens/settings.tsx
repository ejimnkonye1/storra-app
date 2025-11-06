import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  const Section: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
    <View className="mt-6">
      <Text className="text-xs font-semibold text-gray-500 mb-2 px-1">{title}</Text>
      <View className="bg-white rounded-2xl overflow-hidden border border-gray-100">
        {children}
      </View>
    </View>
  );

  type RowProps = {
    icon: any;
    label: string;
    value?: string;
    onPress?: () => void;
    showSwitch?: boolean;
  };

  const Row: React.FC<RowProps> = ({ icon, label, value, onPress, showSwitch }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
    >
      <View className="flex-row items-center">
        <View className="w-8 h-8 bg-blue-50 rounded-full items-center justify-center mr-3">
          <Ionicons name={icon} size={18} color="#2563eb" />
        </View>
        <Text className="text-gray-800 font-medium">{label}</Text>
      </View>
      {showSwitch ? (
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: "#ccc", true: "#2563eb" }}
        />
      ) : (
        <View className="flex-row items-center">
          {value && <Text className="text-gray-500 text-sm mr-1">{value}</Text>}
          <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 pt-12">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 mb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Settings</Text>
        <View className="w-6" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-5">
        {/* Profile */}
        <View className="bg-white rounded-2xl px-4 py-4 flex-row items-center justify-between shadow-sm">
          <View className="flex-row items-center">
            <Image
              source={require("../../assets/images/pro.jpg")}
              className="w-12 h-12 rounded-full mr-3"
              resizeMode="cover"
            />
            <View>
              <Text className="font-semibold text-gray-800 text-base">Alex Morgan</Text>
              <Text className="text-gray-500 text-sm">alex.morgan@example.com</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text className="text-blue-600 font-semibold text-sm">Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Account */}
        <Section title="ACCOUNT">
          <Row icon="person-outline" label="Manage Account" onPress={() => router.push("/screens/ManageAccountScreen")} />
          <Row icon="card-outline" label="Payment & Rewards" onPress={() => router.push("/screens/WalletPaymentScreen")} />
        </Section>

        {/* Preferences */}
        <Section title="PREFERENCES">
          <Row icon="notifications-outline" label="Notifications" onPress={() => router.push("/screens/NotificationPrefrencesScreen")} />
          <Row icon="moon-outline" label="Dark Mode" showSwitch />
          <Row icon="globe-outline" label="Language" value="English" onPress={() => router.push("/screens/LanguageScreen")} />
        </Section>

        {/* Security */}
        <Section title="SECURITY & PRIVACY">
          <Row icon="lock-closed-outline" label="Login & Security" onPress={() => router.push("/screens/LoginSecurityScreen")} />
          <Row icon="shield-checkmark-outline" label="Privacy Policy" onPress={() => router.push("/screens/PrivacyPolicyScreen")} />
        </Section>

        {/* Support */}
        <Section title="SUPPORT & LEGAL">
          <Row icon="help-circle-outline" label="Help Center" onPress={() => router.push("/screens/HelpCenterScreen")} />
          <Row icon="document-text-outline" label="Terms of Service" onPress={() => router.push("/screens/TermsOfServiceScreen")} />
          <Row icon="information-circle-outline" label="About Storra" value="v1.0.0" onPress={() => router.push("/screens/AboutScreen")} />
        </Section>

        {/* Logout */}
        <TouchableOpacity className="bg-red-50 py-4 rounded-2xl mt-8 mb-8">
          <Text className="text-center text-red-600 font-semibold">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
