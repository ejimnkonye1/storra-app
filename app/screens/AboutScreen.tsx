import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HIGHLIGHTS = [
  { icon: "book-outline", color: "#2563eb", bg: "#eff6ff", label: "Guided Lessons", desc: "Structured learning paths for every level" },
  { icon: "game-controller-outline", color: "#7c3aed", bg: "#f5f3ff", label: "Gamified Learning", desc: "Earn rewards as you learn and grow" },
  { icon: "people-outline", color: "#0891b2", bg: "#ecfeff", label: "For All Ages", desc: "Students, teachers, and parents" },
  { icon: "trophy-outline", color: "#d97706", bg: "#fffbeb", label: "Leaderboards", desc: "Compete and climb the rankings" },
];

export default function AboutScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: '#f3f4f6', padding: 8, borderRadius: 10 }}>
          <Ionicons name="arrow-back" size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>About Storra</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>

        {/* Logo + tagline */}
        <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#f1f5f9' }}>
          <Image
            source={require("@/assets/images/storra.png")}
            style={{ width: 100, height: 44, marginBottom: 12 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 13, color: '#6b7280', textAlign: 'center', lineHeight: 20 }}>
            Making quality education accessible, enjoyable,{'\n'}and personalized for every learner.
          </Text>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
            <View style={{ backgroundColor: '#dbeafe', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 }}>
              <Text style={{ color: '#2563eb', fontSize: 12, fontWeight: '600' }}>EdTech</Text>
            </View>
            <View style={{ backgroundColor: '#dcfce7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 }}>
              <Text style={{ color: '#16a34a', fontSize: 12, fontWeight: '600' }}>FinTech</Text>
            </View>
            <View style={{ backgroundColor: '#f5f3ff', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 }}>
              <Text style={{ color: '#7c3aed', fontSize: 12, fontWeight: '600' }}>AI-Powered</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: '#f1f5f9' }}>
          <Text style={{ color: '#374151', fontSize: 14, lineHeight: 22 }}>
            <Text style={{ fontWeight: '700' }}>Storra</Text> is a digital learning platform designed to make education engaging, interactive, and accessible for students of all levels. Our goal is to help learners build strong foundational skills through guided lessons, visual learning materials, and fun quizzes that encourage mastery.
          </Text>
          <Text style={{ color: '#374151', fontSize: 14, lineHeight: 22, marginTop: 10 }}>
            With Storra, students learn at their own pace, track progress, and explore subjects through bite-sized lessons that make complex concepts easy to understand.
          </Text>
        </View>

        {/* Highlights */}
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 12 }}>What We Offer</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
          {HIGHLIGHTS.map((h, i) => (
            <View key={i} style={{ width: '47%', backgroundColor: '#fff', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#f1f5f9' }}>
              <View style={{ backgroundColor: h.bg, padding: 9, borderRadius: 11, alignSelf: 'flex-start', marginBottom: 8 }}>
                <Ionicons name={h.icon as any} size={18} color={h.color} />
              </View>
              <Text style={{ fontWeight: '700', color: '#111827', fontSize: 13, marginBottom: 3 }}>{h.label}</Text>
              <Text style={{ color: '#9ca3af', fontSize: 12 }}>{h.desc}</Text>
            </View>
          ))}
        </View>

        {/* Mission & Vision */}
        {[
          { icon: "flag-outline", color: "#2563eb", bg: "#eff6ff", title: "Our Mission", body: "To make quality education accessible, enjoyable, and personalized for every learner — empowering students to unlock their full potential anytime, anywhere." },
          { icon: "eye-outline", color: "#7c3aed", bg: "#f5f3ff", title: "Our Vision", body: "A world where learning is not limited by place or pace — where every child has the tools to learn, grow, and achieve their dreams." },
        ].map((item, i) => (
          <View key={i} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: '#f1f5f9' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <View style={{ backgroundColor: item.bg, padding: 8, borderRadius: 10 }}>
                <Ionicons name={item.icon as any} size={18} color={item.color} />
              </View>
              <Text style={{ fontWeight: '700', color: '#111827', fontSize: 15 }}>{item.title}</Text>
            </View>
            <Text style={{ color: '#6b7280', fontSize: 14, lineHeight: 22 }}>{item.body}</Text>
          </View>
        ))}

        <Text style={{ textAlign: 'center', color: '#d1d5db', fontSize: 12, marginTop: 8, marginBottom: 4 }}>
          © {new Date().getFullYear()} Storra Learning. All rights reserved.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}
