import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FAQS = [
  {
    section: "Getting Started",
    icon: "rocket-outline",
    color: "#2563eb",
    bg: "#eff6ff",
    items: [
      { q: "How do I create an account?", a: "Download the app, tap 'Get Started', and follow the on-screen steps to register with your email." },
      { q: "How do I choose my class level?", a: "During onboarding you'll be asked to pick your education level. You can update this later in Settings." },
    ],
  },
  {
    section: "Account & Profile",
    icon: "person-circle-outline",
    color: "#7c3aed",
    bg: "#f5f3ff",
    items: [
      { q: "How do I update my profile picture?", a: "Go to Settings → Manage Account and tap your profile photo to upload a new one." },
      { q: "Can I change my email?", a: "Yes, go to Settings → Login & Security to update your email address." },
    ],
  },
  {
    section: "Learning & Quizzes",
    icon: "book-outline",
    color: "#0891b2",
    bg: "#ecfeff",
    items: [
      { q: "How are quizzes graded?", a: "Quizzes are scored out of 100%. A score of 70% or above is considered a pass." },
      { q: "Can I retake a quiz?", a: "Yes — quizzes with a score below 70% can be retaken from the Quizzes page." },
    ],
  },
  {
    section: "Earning & Redeeming Rewards",
    icon: "gift-outline",
    color: "#db2777",
    bg: "#fdf2f8",
    items: [
      { q: "How do I earn coins?", a: "Complete lessons, pass quizzes, maintain daily streaks, and follow us on social media." },
      { q: "How do I redeem my rewards?", a: "Go to Wallet → Withdraw to cash out your coins to airtime or bank transfer." },
    ],
  },
  {
    section: "Security & Privacy",
    icon: "shield-checkmark-outline",
    color: "#16a34a",
    bg: "#f0fdf4",
    items: [
      { q: "Is my data safe?", a: "Yes. We use industry-standard encryption to protect your personal data at all times." },
      { q: "How do I delete my account?", a: "Contact our support team at support@storra.app and we'll process your request within 48 hours." },
    ],
  },
];

export default function HelpCenterScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const filtered = FAQS.map(s => ({
    ...s,
    items: s.items.filter(
      i => !search || i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(s => s.items.length > 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: '#f3f4f6', padding: 8, borderRadius: 10 }}>
          <Ionicons name="arrow-back" size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>Help Center</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>

        {/* Search */}
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 20, gap: 10 }}>
          <Ionicons name="search-outline" size={18} color="#9ca3af" />
          <TextInput
            placeholder="Search for help..."
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
            style={{ flex: 1, fontSize: 14, color: '#111827' }}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>

        {/* FAQ sections */}
        {filtered.map(section => (
          <View key={section.section} style={{ backgroundColor: '#fff', borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#f1f5f9', overflow: 'hidden' }}>
            {/* Section header */}
            <TouchableOpacity
              onPress={() => setOpenSection(openSection === section.section ? null : section.section)}
              style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}
            >
              <View style={{ backgroundColor: section.bg, padding: 8, borderRadius: 10, marginRight: 12 }}>
                <Ionicons name={section.icon as any} size={18} color={section.color} />
              </View>
              <Text style={{ flex: 1, fontWeight: '600', color: '#111827', fontSize: 15 }}>{section.section}</Text>
              <Ionicons
                name={openSection === section.section ? 'chevron-up' : 'chevron-down'}
                size={18} color="#9ca3af"
              />
            </TouchableOpacity>

            {/* FAQ items */}
            {openSection === section.section && section.items.map((item, i) => (
              <View key={i}>
                <View style={{ height: 1, backgroundColor: '#f9fafb', marginHorizontal: 16 }} />
                <TouchableOpacity
                  onPress={() => setOpenItem(openItem === `${section.section}-${i}` ? null : `${section.section}-${i}`)}
                  style={{ paddingHorizontal: 16, paddingVertical: 14 }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <Text style={{ flex: 1, fontSize: 14, fontWeight: '600', color: '#374151', paddingRight: 8 }}>{item.q}</Text>
                    <Ionicons
                      name={openItem === `${section.section}-${i}` ? 'remove' : 'add'}
                      size={18} color={section.color}
                    />
                  </View>
                  {openItem === `${section.section}-${i}` && (
                    <Text style={{ fontSize: 13, color: '#6b7280', marginTop: 8, lineHeight: 20 }}>{item.a}</Text>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}

        {filtered.length === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Ionicons name="search-outline" size={40} color="#d1d5db" />
            <Text style={{ color: '#9ca3af', marginTop: 10, fontSize: 14 }}>No results found</Text>
          </View>
        )}

        {/* Support */}
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20, marginTop: 8, borderWidth: 1, borderColor: '#f1f5f9', alignItems: 'center' }}>
          <Ionicons name="headset-outline" size={32} color="#2563eb" style={{ marginBottom: 8 }} />
          <Text style={{ fontWeight: '700', color: '#111827', fontSize: 15, marginBottom: 4 }}>Still need help?</Text>
          <Text style={{ color: '#6b7280', fontSize: 13, textAlign: 'center', marginBottom: 16 }}>
            Our support team is ready to assist you.
          </Text>
          <TouchableOpacity style={{ backgroundColor: '#2563eb', width: '100%', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Chat with Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#eff6ff', width: '100%', paddingVertical: 14, borderRadius: 12, alignItems: 'center' }}>
            <Text style={{ color: '#2563eb', fontWeight: '700', fontSize: 15 }}>Email Support</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
