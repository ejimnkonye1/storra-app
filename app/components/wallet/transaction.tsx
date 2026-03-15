import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useUserStore } from "../../../store/userStore";

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

function txIcon(type?: string) {
  switch (type) {
    case "credit":
    case "reward":
    case "bonus":
      return <Feather name="arrow-down-circle" size={20} color="#10b981" />;
    case "debit":
    case "withdraw":
    case "cashout":
      return <Feather name="arrow-up-circle" size={20} color="#ef4444" />;
    case "referral":
      return <Ionicons name="people-outline" size={20} color="#8b5cf6" />;
    default:
      return <Ionicons name="swap-horizontal-outline" size={20} color="#6366f1" />;
  }
}

// Fallback demo transactions when the user has no real history yet
const DEMO = [
  { title: "Quiz Reward", desc: "Completed a quiz", amount: "+₦500", type: "reward", date: "Today" },
  { title: "Lesson Bonus", desc: "Finished a lesson", amount: "+₦200", type: "credit", date: "Yesterday" },
  { title: "Referral Bonus", desc: "Friend joined", amount: "+₦1,000", type: "referral", date: "2 days ago" },
];

export default function Transaction() {
  const { user } = useUserStore();
  const history: any[] = user?.rewards?.transactionHistory ?? [];

  const items =
    history.length > 0
      ? history.slice(0, 6).map((tx: any) => ({
          title: tx.description ?? tx.type ?? "Transaction",
          desc: tx.source ?? "",
          amount: `${tx.amount >= 0 ? "+" : ""}₦${Math.abs(tx.amount ?? 0).toLocaleString("en-NG")}`,
          type: tx.type,
          date: formatDate(tx.createdAt),
          isCredit: (tx.amount ?? 0) >= 0,
        }))
      : DEMO.map(d => ({ ...d, isCredit: d.amount.startsWith("+") }));

  return (
    <View style={{ marginTop: 24, marginBottom: 16 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <Text style={{ fontSize: 15, fontWeight: "700", color: "#111827" }}>Recent Transactions</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={{ color: "#2563eb", fontSize: 13, fontWeight: "600" }}>See all</Text>
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <View style={{ backgroundColor: "#fff", borderRadius: 16, padding: 32, alignItems: "center", borderWidth: 1, borderColor: "#f3f4f6" }}>
          <Ionicons name="receipt-outline" size={40} color="#d1d5db" />
          <Text style={{ color: "#9ca3af", marginTop: 10, fontSize: 14, fontWeight: "500" }}>No transactions yet</Text>
          <Text style={{ color: "#d1d5db", fontSize: 12, marginTop: 4, textAlign: "center" }}>
            Complete lessons and quizzes to earn rewards
          </Text>
        </View>
      ) : (
        <View style={{ backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: "#f3f4f6", overflow: "hidden" }}>
          {items.map((item, index) => (
            <View key={index}>
              <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14 }}>
                <View style={{ backgroundColor: "#f9fafb", padding: 10, borderRadius: 12, marginRight: 12 }}>
                  {txIcon(item.type)}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#111827", fontWeight: "600", fontSize: 14 }}>{item.title}</Text>
                  {!!item.desc && (
                    <Text style={{ color: "#9ca3af", fontSize: 12, marginTop: 1 }}>{item.desc}</Text>
                  )}
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ fontWeight: "700", fontSize: 14, color: item.isCredit ? "#10b981" : "#ef4444" }}>
                    {item.amount}
                  </Text>
                  {!!item.date && (
                    <Text style={{ color: "#d1d5db", fontSize: 11, marginTop: 2 }}>{item.date}</Text>
                  )}
                </View>
              </View>
              {index < items.length - 1 && (
                <View style={{ height: 1, backgroundColor: "#f9fafb", marginHorizontal: 16 }} />
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
