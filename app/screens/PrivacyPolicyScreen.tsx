import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SECTIONS = [
  {
    icon: "information-circle-outline",
    color: "#2563eb",
    bg: "#eff6ff",
    title: "Introduction",
    body: "Welcome to Storra. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application. We are committed to protecting your privacy and ensuring you have a positive experience on our AI-powered EdTech and FinTech platform.",
  },
  {
    icon: "person-outline",
    color: "#7c3aed",
    bg: "#f5f3ff",
    title: "Information We Collect",
    body: "We may collect information about you in a variety of ways:\n\n• Personal Data: Name, email address, and demographic info.\n• Financial Data: Payment details such as card info.\n• Usage Data: Information automatically collected when using the app.",
  },
  {
    icon: "bar-chart-outline",
    color: "#0891b2",
    bg: "#ecfeff",
    title: "How We Use Your Information",
    body: "We use collected data to:\n\n• Create and manage your account.\n• Process payments and refunds.\n• Monitor and improve the app.\n• Notify you of updates and new features.",
  },
  {
    icon: "shield-checkmark-outline",
    color: "#16a34a",
    bg: "#f0fdf4",
    title: "Data Security",
    body: "We use administrative, technical, and physical security measures to help protect your information. Despite our efforts, no system is completely secure. Please be aware that data transmission over the internet may not be fully protected.",
  },
  {
    icon: "mail-outline",
    color: "#db2777",
    bg: "#fdf2f8",
    title: "Contact Us",
    body: "If you have questions or comments about this Privacy Policy, please contact us at privacy@storra.app. We aim to respond to all queries within 48 hours.",
  },
];

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: '#f3f4f6', padding: 8, borderRadius: 10 }}>
          <Ionicons name="arrow-back" size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>Privacy Policy</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>

        {/* Last updated */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20 }}>
          <Ionicons name="time-outline" size={14} color="#9ca3af" />
          <Text style={{ color: '#9ca3af', fontSize: 13 }}>Last updated: October 26, 2023</Text>
        </View>

        {SECTIONS.map((s, i) => (
          <View key={i} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: '#f1f5f9' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <View style={{ backgroundColor: s.bg, padding: 8, borderRadius: 10 }}>
                <Ionicons name={s.icon as any} size={18} color={s.color} />
              </View>
              <Text style={{ fontWeight: '700', color: '#111827', fontSize: 15 }}>{s.title}</Text>
            </View>
            <Text style={{ color: '#6b7280', fontSize: 14, lineHeight: 22 }}>{s.body}</Text>
          </View>
        ))}

        <Text style={{ textAlign: 'center', color: '#d1d5db', fontSize: 12, marginTop: 8, marginBottom: 4 }}>
          © {new Date().getFullYear()} Storra Learning. All rights reserved.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}
