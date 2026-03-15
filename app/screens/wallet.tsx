import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Feather, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserStore } from "../../store/userStore";

const { height: SCREEN_H } = Dimensions.get("window");

function fmt(n: number) {
  return n.toLocaleString("en-NG", { maximumFractionDigits: 0 });
}

function txIcon(type?: string) {
  const map: Record<string, { icon: string; color: string; bg: string }> = {
    credit: { icon: "arrow-down-circle", color: "#10b981", bg: "#ecfdf5" },
    reward: { icon: "gift-outline", color: "#7c3aed", bg: "#f5f3ff" },
    bonus: { icon: "star-outline", color: "#f59e0b", bg: "#fffbeb" },
    debit: { icon: "arrow-up-circle", color: "#ef4444", bg: "#fef2f2" },
    withdraw: { icon: "arrow-up-circle", color: "#ef4444", bg: "#fef2f2" },
    referral: { icon: "people-outline", color: "#3b82f6", bg: "#eff6ff" },
  };
  const t = type ?? "";
  const cfg = map[t] ?? { icon: "swap-horizontal-outline", color: "#6366f1", bg: "#eef2ff" };
  return cfg;
}

function formatDate(d?: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "short" });
}

const DEMO_TX = [
  { title: "Quiz Reward", desc: "Completed a quiz", amount: 500, type: "reward", createdAt: new Date().toISOString() },
  { title: "Lesson Bonus", desc: "Finished a lesson", amount: 200, type: "credit", createdAt: new Date(Date.now() - 86400000).toISOString() },
  { title: "Referral Bonus", desc: "Friend joined", amount: 1000, type: "referral", createdAt: new Date(Date.now() - 172800000).toISOString() },
  { title: "Streak Reward", desc: "7-day streak", amount: 350, type: "bonus", createdAt: new Date(Date.now() - 259200000).toISOString() },
];

const QUICK_ACTIONS = [
  { label: "Withdraw", icon: "arrow-down-circle", lib: "feather", color: "#f97316", bg: "#fff7ed" },
  { label: "Earn More", icon: "gift-outline", lib: "ion", color: "#7c3aed", bg: "#f5f3ff" },
  { label: "Airtime", icon: "mobile-alt", lib: "fa5", color: "#10b981", bg: "#ecfdf5" },
  { label: "Send", icon: "send", lib: "feather", color: "#6366f1", bg: "#eef2ff" },
];

const FEATURES = [
  { label: "Pay Bills", icon: "payment", lib: "mi", color: "#3b82f6", bg: "#eff6ff", desc: "Electricity, Data & more" },
  { label: "Refer & Earn", icon: "people-outline", lib: "ion", color: "#8b5cf6", bg: "#f5f3ff", desc: "Invite friends, earn coins" },
  { label: "Achievements", icon: "trophy-outline", lib: "ion", color: "#f59e0b", bg: "#fffbeb", desc: "View your badges" },
  { label: "Spin Wheel", icon: "refresh-circle-outline", lib: "ion", color: "#ec4899", bg: "#fdf2f8", desc: "Daily spin for rewards" },
  { label: "Leaderboard", icon: "podium-outline", lib: "ion", color: "#14b8a6", bg: "#f0fdfa", desc: "See top earners" },
  { label: "History", icon: "time-outline", lib: "ion", color: "#6b7280", bg: "#f9fafb", desc: "All transactions" },
];

function ActionIcon({ lib, icon, color, size = 22 }: { lib: string; icon: string; color: string; size?: number }) {
  if (lib === "feather") return <Feather name={icon as any} size={size} color={color} />;
  if (lib === "fa5") return <FontAwesome5 name={icon as any} size={size} color={color} />;
  if (lib === "mi") return <MaterialIcons name={icon as any} size={size} color={color} />;
  return <Ionicons name={icon as any} size={size} color={color} />;
}

export default function WalletScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, setNotifVisible } = useUserStore();
  const [balanceHidden, setBalanceHidden] = useState(false);

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["52%", "88%"], []);

  const coins = user?.rewards?.totalCoins ?? 0;
  const diamonds = user?.rewards?.totalDiamonds ?? 0;
  const points = user?.leaderboard?.totalPoints ?? 0;
  const streak = user?.rewards?.currentStreak ?? 0;
  const nairaValue = coins * 10;

  const rawHistory: any[] = user?.rewards?.transactionHistory ?? [];
  const txList = (rawHistory.length > 0 ? rawHistory : DEMO_TX).slice(0, 8);

  const achievementsCount = user?.rewards?.achievements?.length ?? 0;
  const notifCount = achievementsCount + (streak > 0 ? 1 : 0);

  const handleSheetChanges = useCallback(() => {}, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* ── Background gradient top ── */}
      <LinearGradient
        colors={["#1e3a8a", "#312e81"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: SCREEN_H * 0.44 }}
      />

      <View style={{ flex: 1 }}>
        {/* ── Header ── */}
        <View style={{
          flexDirection: "row", justifyContent: "space-between", alignItems: "center",
          paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 12,
        }}>
          <TouchableOpacity onPress={() => router.back()}
            style={{ backgroundColor: "rgba(255,255,255,0.15)", padding: 8, borderRadius: 12 }}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "700" }}>My Wallet</Text>

          <View style={{ flexDirection: "row", gap: 10 }}>
            {/* Profile avatar */}
            {user?.profilePictureUrl ? (
              <Image source={{ uri: user.profilePictureUrl }}
                style={{ width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: "rgba(255,255,255,0.4)" }} />
            ) : (
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="person" size={18} color="#fff" />
              </View>
            )}
            {/* Notification bell */}
            <TouchableOpacity onPress={() => setNotifVisible(true)}
              style={{ backgroundColor: "rgba(255,255,255,0.15)", padding: 8, borderRadius: 12 }}>
              <Ionicons name="notifications-outline" size={20} color="#fff" />
              {notifCount > 0 && (
                <View style={{
                  position: "absolute", top: 4, right: 4,
                  backgroundColor: "#ef4444", borderRadius: 6, width: 12, height: 12,
                  alignItems: "center", justifyContent: "center",
                }}>
                  <Text style={{ color: "#fff", fontSize: 7, fontWeight: "800" }}>{notifCount > 9 ? "9+" : notifCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Balance card ── */}
        <View style={{ paddingHorizontal: 20, marginBottom: 4 }}>
          <View style={{
            backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 20,
            padding: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.2)",
          }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Total Rewards Balance</Text>
              <Pressable onPress={() => setBalanceHidden(p => !p)} hitSlop={10}>
                <Ionicons name={balanceHidden ? "eye-off-outline" : "eye-outline"} size={18} color="rgba(255,255,255,0.7)" />
              </Pressable>
            </View>

            <Text style={{ color: "#fff", fontSize: 34, fontWeight: "800", letterSpacing: -0.5, marginBottom: 2 }}>
              {balanceHidden ? "₦ ••••••" : `₦ ${fmt(nairaValue)}`}
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 20 }}>
              1 coin = ₦10 • {fmt(coins)} coins available
            </Text>

            {/* Stats strip */}
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              {[
                { icon: "logo-bitcoin", color: "#fbbf24", label: "Coins", value: fmt(coins) },
                { icon: "diamond", color: "#a78bfa", label: "Diamonds", value: fmt(diamonds) },
                { icon: "star", color: "#34d399", label: "Points", value: fmt(points) },
                { icon: "flame", color: "#fb923c", label: "Streak", value: `${streak}d` },
              ].map((s, i) => (
                <View key={i} style={{ alignItems: "center" }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 3, marginBottom: 2 }}>
                    <Ionicons name={s.icon as any} size={13} color={s.color} />
                    <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>{s.value}</Text>
                  </View>
                  <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>{s.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── Quick action buttons ── */}
        <View style={{ flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 20, paddingVertical: 18 }}>
          {QUICK_ACTIONS.map((a, i) => (
            <TouchableOpacity key={i} activeOpacity={0.75} style={{ alignItems: "center", gap: 6 }}>
              <View style={{ backgroundColor: "rgba(255,255,255,0.18)", padding: 14, borderRadius: 16 }}>
                <ActionIcon lib={a.lib} icon={a.icon} color="#fff" size={22} />
              </View>
              <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: "600" }}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Draggable Bottom Sheet ── */}
        <BottomSheet
          ref={sheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{ borderTopLeftRadius: 24, borderTopRightRadius: 24, backgroundColor: "#f8fafc" }}
          handleIndicatorStyle={{ backgroundColor: "#cbd5e1", width: 40 }}
        >
          <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

            {/* Features grid */}
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#111827", marginTop: 8, marginBottom: 14 }}>
              Features
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
              {FEATURES.map((f, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.75}
                  style={{
                    width: "47%", backgroundColor: "#fff", borderRadius: 14,
                    padding: 14, borderWidth: 1, borderColor: "#f1f5f9",
                    flexDirection: "row", alignItems: "center", gap: 10,
                  }}
                >
                  <View style={{ backgroundColor: f.bg, padding: 10, borderRadius: 12 }}>
                    <ActionIcon lib={f.lib} icon={f.icon} color={f.color} size={20} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#111827", fontWeight: "600", fontSize: 13 }}>{f.label}</Text>
                    <Text style={{ color: "#9ca3af", fontSize: 11, marginTop: 1 }} numberOfLines={1}>{f.desc}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Recent transactions */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <Text style={{ fontSize: 15, fontWeight: "700", color: "#111827" }}>Recent Transactions</Text>
              <TouchableOpacity>
                <Text style={{ color: "#2563eb", fontSize: 13, fontWeight: "600" }}>See all</Text>
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: "#f1f5f9", overflow: "hidden" }}>
              {txList.length === 0 ? (
                <View style={{ padding: 28, alignItems: "center" }}>
                  <Ionicons name="receipt-outline" size={36} color="#e5e7eb" />
                  <Text style={{ color: "#9ca3af", marginTop: 8, fontSize: 13 }}>No transactions yet</Text>
                </View>
              ) : (
                txList.map((tx: any, i: number) => {
                  const cfg = txIcon(tx.type);
                  const isCredit = (tx.amount ?? 0) >= 0;
                  return (
                    <View key={i}>
                      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 13 }}>
                        <View style={{ backgroundColor: cfg.bg, padding: 10, borderRadius: 12, marginRight: 12 }}>
                          <Ionicons name={cfg.icon as any} size={18} color={cfg.color} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: "#111827", fontWeight: "600", fontSize: 13 }}>
                            {tx.description ?? tx.title ?? tx.type ?? "Transaction"}
                          </Text>
                          {!!tx.desc && (
                            <Text style={{ color: "#9ca3af", fontSize: 11, marginTop: 1 }}>{tx.desc}</Text>
                          )}
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                          <Text style={{ fontWeight: "700", fontSize: 14, color: isCredit ? "#10b981" : "#ef4444" }}>
                            {isCredit ? "+" : ""}₦{fmt(Math.abs(tx.amount ?? 0))}
                          </Text>
                          <Text style={{ color: "#d1d5db", fontSize: 10, marginTop: 2 }}>
                            {formatDate(tx.createdAt)}
                          </Text>
                        </View>
                      </View>
                      {i < txList.length - 1 && (
                        <View style={{ height: 1, backgroundColor: "#f8fafc", marginHorizontal: 14 }} />
                      )}
                    </View>
                  );
                })
              )}
            </View>

          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
