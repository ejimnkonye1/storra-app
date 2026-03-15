import { Feather, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const actions = [
  {
    title: "Withdraw",
    icon: <Feather name="arrow-down-circle" size={22} color="#f97316" />,
    bg: "#fff7ed",
  },
  {
    title: "Earn More",
    icon: <Ionicons name="gift-outline" size={22} color="#7c3aed" />,
    bg: "#f5f3ff",
  },
  {
    title: "Airtime",
    icon: <FontAwesome5 name="mobile-alt" size={20} color="#10b981" />,
    bg: "#ecfdf5",
  },
  {
    title: "Refer & Earn",
    icon: <Ionicons name="people-outline" size={22} color="#2563eb" />,
    bg: "#eff6ff",
  },
  {
    title: "Pay Bills",
    icon: <MaterialIcons name="payment" size={22} color="#3b82f6" />,
    bg: "#eff6ff",
  },
  {
    title: "Send",
    icon: <Feather name="send" size={20} color="#6366f1" />,
    bg: "#eef2ff",
  },
];

export default function Cards() {
  const router = useRouter();

  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ fontSize: 15, fontWeight: "700", color: "#111827", marginBottom: 12 }}>
        Quick Actions
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {actions.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.75}
            style={{
              width: "30%",
              backgroundColor: "#fff",
              borderRadius: 14,
              padding: 14,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#f3f4f6",
            }}
          >
            <View style={{ backgroundColor: item.bg, padding: 10, borderRadius: 12, marginBottom: 8 }}>
              {item.icon}
            </View>
            <Text style={{ color: "#374151", fontWeight: "600", fontSize: 12, textAlign: "center" }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
