import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useUserStore } from "../../../store/userStore";

export default function AccountCard() {
  const { user } = useUserStore();
  const [balanceHidden, setBalanceHidden] = useState(false);

  const coins = user?.rewards?.totalCoins ?? 0;
  const diamonds = user?.rewards?.totalDiamonds ?? 0;
  const points = user?.leaderboard?.totalPoints ?? 0;
  const streak = user?.rewards?.currentStreak ?? 0;

  // Approximate naira value: 1 coin = ₦10
  const nairaValue = coins * 10;

  const fmt = (n: number) =>
    n.toLocaleString("en-NG", { maximumFractionDigits: 0 });

  return (
    <LinearGradient
      colors={["#1d4ed8", "#4f46e5", "#7c3aed"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 20, marginBottom: 24, padding: 22 }}
    >
      {/* Top row */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <Text style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>Rewards Balance</Text>
        <TouchableOpacity onPress={() => setBalanceHidden(p => !p)} hitSlop={10}>
          <Ionicons name={balanceHidden ? "eye-off-outline" : "eye-outline"} size={18} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
      </View>

      {/* Main balance */}
      <Text style={{ color: "#fff", fontSize: 32, fontWeight: "800", marginBottom: 2 }}>
        {balanceHidden ? "₦ ••••••" : `₦ ${fmt(nairaValue)}`}
      </Text>
      <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginBottom: 20 }}>
        ≈ {fmt(coins)} coins • updated just now
      </Text>

      {/* Divider */}
      <View style={{ height: 1, backgroundColor: "rgba(255,255,255,0.15)", marginBottom: 16 }} />

      {/* Stats row */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 2 }}>
            <Ionicons name="logo-bitcoin" size={14} color="#fbbf24" />
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>{fmt(coins)}</Text>
          </View>
          <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Coins</Text>
        </View>

        <View style={{ width: 1, backgroundColor: "rgba(255,255,255,0.15)" }} />

        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 2 }}>
            <Ionicons name="diamond" size={14} color="#a78bfa" />
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>{fmt(diamonds)}</Text>
          </View>
          <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Diamonds</Text>
        </View>

        <View style={{ width: 1, backgroundColor: "rgba(255,255,255,0.15)" }} />

        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 2 }}>
            <Ionicons name="star" size={14} color="#34d399" />
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>{fmt(points)}</Text>
          </View>
          <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Points</Text>
        </View>

        <View style={{ width: 1, backgroundColor: "rgba(255,255,255,0.15)" }} />

        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 2 }}>
            <Ionicons name="flame" size={14} color="#f97316" />
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>{streak}</Text>
          </View>
          <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Streak</Text>
        </View>
      </View>
    </LinearGradient>
  );
}
