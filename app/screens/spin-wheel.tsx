import { getCurrentUser } from "@/services/userService";
import { useUserStore } from "@/store/userStore";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import { BASE_URL } from "../../backendconfig";

const { width: SW, height: SH } = Dimensions.get("window");
const WHEEL_SIZE = Math.min(SW - 48, SH * 0.38, 290);
const R = WHEEL_SIZE / 2;
const POINTER_H = 24;

interface Reward {
  name: string;
  type: string;
  amount?: number;
}

interface WheelSegment {
  label: string;
  color: string;
  textColor: string;
}

const SEGMENT_COLORS = [
  { bg: "#3B82F6", text: "#FFFFFF" },
  { bg: "#F59E0B", text: "#1F2937" },
  { bg: "#10B981", text: "#FFFFFF" },
  { bg: "#EF4444", text: "#FFFFFF" },
  { bg: "#8B5CF6", text: "#FFFFFF" },
  { bg: "#F97316", text: "#FFFFFF" },
  { bg: "#06B6D4", text: "#1F2937" },
  { bg: "#EC4899", text: "#FFFFFF" },
];

// Icon per reward type — all Ionicons
const REWARD_ICON: Record<string, { name: string; color: string }> = {
  coins:       { name: "cash",           color: "#F59E0B" },
  diamond:     { name: "diamond",        color: "#06B6D4" },
  points:      { name: "star",           color: "#F59E0B" },
  spin_chance: { name: "refresh-circle", color: "#3B82F6" },
  item:        { name: "gift",           color: "#8B5CF6" },
};

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function segmentPath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, r, end);
  const e = polarToCartesian(cx, cy, r, start);
  const large = end - start > 180 ? 1 : 0;
  return [`M ${cx} ${cy}`, `L ${s.x} ${s.y}`, `A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y}`, "Z"].join(" ");
}

function WheelSvg({ segments }: { segments: WheelSegment[] }) {
  if (!segments.length) return null;
  const cx = R;
  const cy = R;
  const segAngle = 360 / segments.length;
  const labelR = R * 0.60;

  return (
    <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
      <G>
        {segments.map((seg, i) => {
          const start = i * segAngle;
          const end = start + segAngle;
          const mid = start + segAngle / 2;
          const rad = ((mid - 90) * Math.PI) / 180;
          const lx = cx + labelR * Math.cos(rad);
          const ly = cy + labelR * Math.sin(rad);
          return (
            <G key={i}>
              <Path
                d={segmentPath(cx, cy, R - 3, start, end)}
                fill={seg.color}
                stroke="#FFFFFF"
                strokeWidth={2.5}
              />
              <SvgText
                x={lx}
                y={ly}
                fill={seg.textColor}
                fontSize={10}
                fontWeight="700"
                textAnchor="middle"
                alignmentBaseline="middle"
                transform={`rotate(${mid}, ${lx}, ${ly})`}
              >
                {seg.label.length > 9 ? seg.label.slice(0, 8) + "…" : seg.label}
              </SvgText>
            </G>
          );
        })}
      </G>
    </Svg>
  );
}

export default function SpinWheelScreen() {
  const rotation = useRef(new Animated.Value(0)).current;
  const [spinsLeft, setSpinsLeft] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [segments, setSegments] = useState<WheelSegment[]>([]);
  const [resultModal, setResultModal] = useState<{ visible: boolean; reward: Reward | null }>({
    visible: false,
    reward: null,
  });
  const router = useRouter();
  const { token } = useUserStore();

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    if (!token) return;
    try {
      const [userRes, previewRes] = await Promise.all([
        getCurrentUser(token),
        fetch(`${BASE_URL}/spin/wheel-preview`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setSpinsLeft(userRes?.data?.spinChances ?? 0);
      const previewData = await previewRes.json();
      if (previewRes.ok && Array.isArray(previewData?.data)) {
        setSegments(
          previewData.data.map((r: Reward, idx: number) => {
            const c = SEGMENT_COLORS[idx % SEGMENT_COLORS.length];
            const isHidden = r.type === "diamond" || r.type === "item";
            return { label: isHidden ? "Mystery" : r.name, color: c.bg, textColor: c.text };
          })
        );
      }
    } catch {}
  };

  const spinWheel = async () => {
    if (spinning || spinsLeft <= 0 || !segments.length || !token) return;
    setSpinning(true);

    try {
      const res = await fetch(`${BASE_URL}/spin/spinthewheel`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        setSpinning(false);
        return;
      }

      const reward: Reward = data.data.reward;
      setSpinsLeft(data.data.balances.spinChances);

      const segAngle = 360 / segments.length;
      const rewardIdx = segments.findIndex((s) =>
        s.label.toLowerCase().includes(reward.name.toLowerCase().slice(0, 4))
      );
      const targetIdx = rewardIdx !== -1 ? rewardIdx : Math.floor(Math.random() * segments.length);
      const targetAngle = 360 - (targetIdx * segAngle + segAngle / 2);

      rotation.setValue(0);
      Animated.timing(rotation, {
        toValue: 3 * 360 + targetAngle,   // 3 full spins — fast & satisfying
        duration: 2500,
        easing: Easing.bezier(0.23, 1, 0.32, 1),  // ease-out-quint: snappy start, smooth stop
        useNativeDriver: true,
      }).start(() => {
        setSpinning(false);
        setResultModal({ visible: true, reward });
      });
    } catch {
      alert("Network error. Try again!");
      setSpinning(false);
    }
  };

  const spinInterp = rotation.interpolate({ inputRange: [0, 360], outputRange: ["0deg", "360deg"] });
  const ri = resultModal.reward;
  const icon = REWARD_ICON[ri?.type ?? ""] ?? { name: "gift", color: "#8B5CF6" };

  return (
    <LinearGradient colors={["#1E3A8A", "#1D4ED8", "#3B82F6"]} style={styles.root}>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Spin & Win</Text>
          <View style={styles.spinsChip}>
            <Ionicons name="ticket-outline" size={13} color="#FCD34D" />
            <Text style={styles.spinsText}>{spinsLeft} left</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          {spinsLeft > 0
            ? "Spin the wheel to win amazing rewards!"
            : "No spins left today. Come back tomorrow!"}
        </Text>

        {/* Wheel */}
        <View style={styles.wheelArea}>
          <View style={[styles.glowRing, { width: WHEEL_SIZE + 28, height: WHEEL_SIZE + 28, borderRadius: (WHEEL_SIZE + 28) / 2 }]} />

          {/* Fixed pointer at top */}
          <View style={styles.pointerWrap}>
            <View style={styles.pointerTriangle} />
            <View style={styles.pointerHighlight} />
          </View>

          <Animated.View style={[styles.wheelView, { width: WHEEL_SIZE, height: WHEEL_SIZE, borderRadius: R, transform: [{ rotate: spinInterp }] }]}>
            <WheelSvg segments={segments} />
          </Animated.View>

          {/* Center hub */}
          <View style={styles.hub}>
            <View style={styles.hubRing}>
              <Ionicons name="star" size={14} color="#2563EB" />
            </View>
          </View>
        </View>

        {/* Spin button */}
        <TouchableOpacity
          onPress={spinWheel}
          disabled={spinning || spinsLeft <= 0}
          activeOpacity={0.85}
          style={[styles.spinBtn, (spinning || spinsLeft <= 0) && styles.spinBtnOff]}
        >
          <LinearGradient
            colors={spinning || spinsLeft <= 0 ? ["#6B7280", "#9CA3AF"] : ["#F59E0B", "#EF4444"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.spinGrad}
          >
            <Ionicons
              name={spinning ? "sync" : spinsLeft <= 0 ? "ban-outline" : "flash"}
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.spinText}>
              {spinning ? "Spinning…" : spinsLeft <= 0 ? "No Spins Left" : "SPIN NOW"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Info strip */}
        <View style={styles.infoRow}>
          {[
            { icon: "refresh-circle" as const, label: "Daily Spins", value: "3" },
            { icon: "time-outline" as const,   label: "Resets At",  value: "Midnight" },
            { icon: "trophy-outline" as const, label: "Remaining",  value: String(spinsLeft) },
          ].map((item) => (
            <View key={item.label} style={styles.infoCard}>
              <Ionicons name={item.icon} size={20} color="#FCD34D" />
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>

      {/* Win modal */}
      <Modal visible={resultModal.visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.card}>
            {/* Icon badge */}
            <View style={[styles.iconBadge, { backgroundColor: icon.color + "22" }]}>
              <Ionicons name={icon.name as any} size={48} color={icon.color} />
            </View>
            <Text style={styles.wonTitle}>You Won!</Text>
            <Text style={styles.wonName}>{ri?.name}</Text>
            {ri?.amount ? (
              <View style={styles.amountBadge}>
                <Ionicons name="add-circle" size={16} color="#1D4ED8" />
                <Text style={styles.amountText}>{ri.amount}</Text>
              </View>
            ) : null}
            <Text style={styles.wonSub}>Reward added to your wallet</Text>
            <TouchableOpacity
              style={styles.wonBtn}
              onPress={() => setResultModal({ visible: false, reward: null })}
            >
              <Text style={styles.wonBtnText}>Awesome! 🎉</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1, alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 6,
    marginBottom: 6,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center", justifyContent: "center",
  },
  headerTitle: {
    flex: 1, textAlign: "center", fontSize: 19, fontWeight: "800", color: "#fff",
  },
  spinsChip: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, gap: 4,
  },
  spinsText: { color: "#FCD34D", fontWeight: "700", fontSize: 12 },
  subtitle: {
    color: "rgba(255,255,255,0.7)", fontSize: 12,
    textAlign: "center", paddingHorizontal: 32, marginBottom: 14,
  },
  wheelArea: { alignItems: "center", justifyContent: "center", marginBottom: 20 },
  glowRing: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 2, borderColor: "rgba(255,255,255,0.18)",
  },
  pointerWrap: {
    position: "absolute",
    top: -(POINTER_H - 4),
    zIndex: 10, alignItems: "center",
  },
  pointerTriangle: {
    width: 0, height: 0,
    borderLeftWidth: 12, borderRightWidth: 12, borderTopWidth: POINTER_H,
    borderLeftColor: "transparent", borderRightColor: "transparent", borderTopColor: "#F59E0B",
  },
  pointerHighlight: {
    position: "absolute", top: -(POINTER_H - 5), left: -7,
    width: 0, height: 0,
    borderLeftWidth: 7, borderRightWidth: 7, borderTopWidth: POINTER_H - 6,
    borderLeftColor: "transparent", borderRightColor: "transparent", borderTopColor: "#FDE68A",
  },
  wheelView: {
    overflow: "hidden",
    shadowColor: "#000", shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4, shadowRadius: 16, elevation: 14,
  },
  hub: {
    position: "absolute", zIndex: 5,
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: "#1E3A8A", borderWidth: 4, borderColor: "#fff",
    alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3, shadowRadius: 6, elevation: 8,
  },
  hubRing: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: "#fff", alignItems: "center", justifyContent: "center",
  },
  spinBtn: {
    width: SW - 56, borderRadius: 50, overflow: "hidden",
    shadowColor: "#F59E0B", shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5, shadowRadius: 10, elevation: 8, marginBottom: 18,
  },
  spinBtnOff: { shadowOpacity: 0 },
  spinGrad: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 15,
  },
  spinText: { color: "#fff", fontSize: 16, fontWeight: "800", letterSpacing: 0.8 },
  infoRow: { flexDirection: "row", gap: 10, paddingHorizontal: 20, width: "100%" },
  infoCard: {
    flex: 1, backgroundColor: "rgba(255,255,255,0.11)",
    borderRadius: 14, paddingVertical: 10, alignItems: "center",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", gap: 3,
  },
  infoLabel: { color: "rgba(255,255,255,0.6)", fontSize: 9, fontWeight: "600" },
  infoValue: { color: "#fff", fontSize: 13, fontWeight: "800" },
  // Modal
  overlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.72)",
    alignItems: "center", justifyContent: "center",
  },
  card: {
    width: SW - 56, backgroundColor: "#fff", borderRadius: 28,
    paddingVertical: 32, paddingHorizontal: 28, alignItems: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25, shadowRadius: 24, elevation: 18,
  },
  iconBadge: {
    width: 96, height: 96, borderRadius: 48,
    alignItems: "center", justifyContent: "center", marginBottom: 14,
  },
  wonTitle: { fontSize: 26, fontWeight: "800", color: "#1E3A8A", marginBottom: 4 },
  wonName: { fontSize: 18, fontWeight: "700", color: "#2563EB", marginBottom: 10, textAlign: "center" },
  amountBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: "#DBEAFE", borderRadius: 20,
    paddingHorizontal: 18, paddingVertical: 5, marginBottom: 10,
  },
  amountText: { fontSize: 17, fontWeight: "800", color: "#1D4ED8" },
  wonSub: { fontSize: 12, color: "#6B7280", marginBottom: 22 },
  wonBtn: {
    backgroundColor: "#2563EB", borderRadius: 50,
    paddingHorizontal: 40, paddingVertical: 13,
  },
  wonBtnText: { color: "#fff", fontSize: 15, fontWeight: "800" },
});
