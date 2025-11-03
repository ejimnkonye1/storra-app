import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

export default function WalletScreen() {
  const transactions = [
    { id: 1, type: 'Earned', amount: '+₦500', date: 'Nov 1, 2025' },
    { id: 2, type: 'Withdrawn', amount: '-₦200', date: 'Oct 28, 2025' },
    { id: 3, type: 'Reward', amount: '+₦300', date: 'Oct 25, 2025' },
  ]

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-6 pt-6">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <Text className="text-2xl font-bold text-gray-900">My Wallet</Text>
          <Ionicons name="wallet-outline" size={26} color="#2563eb" />
        </View>

        {/* Balance Card */}
        <View className="bg-blue-600 rounded-3xl p-6 mb-8 shadow-md">
          <Text className="text-white text-lg mb-2">Current Balance</Text>
          <Text className="text-white text-4xl font-bold mb-4">₦5,200</Text>

          <View className="flex-row justify-between">
            <TouchableOpacity className="bg-white/20 px-5 py-2 rounded-full">
              <Text className="text-white font-medium">Withdraw</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white/20 px-5 py-2 rounded-full">
              <Text className="text-white font-medium">Add Funds</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Recent Transactions
        </Text>

        {transactions.map((item) => (
          <View
            key={item.id}
            className="flex-row justify-between items-center bg-gray-50 p-4 mb-3 rounded-xl"
          >
            <View>
              <Text className="font-semibold text-gray-800">{item.type}</Text>
              <Text className="text-gray-500 text-sm">{item.date}</Text>
            </View>
            <Text
              className={`text-lg font-bold ${
                item.amount.startsWith('+') ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {item.amount}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
