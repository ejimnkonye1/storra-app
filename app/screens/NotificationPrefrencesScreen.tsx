// NotificationPreferencesScreen.tsx
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Switch } from 'react-native';

export default function NotificationPreferencesScreen() {
  const [notifications, setNotifications] = useState({
    newCourseUpdates: true,
    learningStreakReminders: true,
    activityReminders: false,
    rewardAlerts: true,
    financialTip: false,
    promotionalMessages: false,
    appUpdates: true,
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity>
          <Text className="text-2xl text-black">←</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black">Notification Preferences</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1 pb-20">
        {/* Learning Section */}
        <Text className="text-xs font-semibold text-gray-500 px-4 pt-6 pb-3 tracking-wider">
          LEARNING
        </Text>

        <View className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-3">
            <Text className="text-xl">🎓</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-black">New Course Updates</Text>
            <Text className="text-sm text-gray-500 mt-1">
              Announcements about new courses or lessons
            </Text>
          </View>
          <Switch
            value={notifications.newCourseUpdates}
            onValueChange={(val) =>
              setNotifications({ ...notifications, newCourseUpdates: val })
            }
            trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
          />
        </View>

        <View className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-3">
            <Text className="text-xl">🔥</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-black">Learning Streak Reminders</Text>
            <Text className="text-sm text-gray-500 mt-1">
              Notifications to maintain a daily learning streak
            </Text>
          </View>
          <Switch
            value={notifications.learningStreakReminders}
            onValueChange={(val) =>
              setNotifications({ ...notifications, learningStreakReminders: val })
            }
            trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
          />
        </View>

        <View className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-3">
            <Text className="text-xl">⏰</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-black">Activity Reminders</Text>
            <Text className="text-sm text-gray-500 mt-1">
              General reminders to continue learning progress
            </Text>
          </View>
          <Switch
            value={notifications.activityReminders}
            onValueChange={(val) =>
              setNotifications({ ...notifications, activityReminders: val })
            }
            trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
          />
        </View>

        {/* Rewards & Finance Section */}
        <Text className="text-xs font-semibold text-gray-500 px-4 pt-8 pb-3 tracking-wider">
          REWARDS & FINANCE
        </Text>

        <View className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-3">
            <Text className="text-xl">🏆</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-black">Reward Alerts</Text>
            <Text className="text-sm text-gray-500 mt-1">
              When a new reward is earned or available
            </Text>
          </View>
          <Switch
            value={notifications.rewardAlerts}
            onValueChange={(val) =>
              setNotifications({ ...notifications, rewardAlerts: val })
            }
            trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
          />
        </View>

        <View className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-3">
            <Text className="text-xl">💡</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-black">Financial Tip of the Day</Text>
            <Text className="text-sm text-gray-500 mt-1">
              Daily financial literacy tips and insights
            </Text>
          </View>
          <Switch
            value={notifications.financialTip}
            onValueChange={(val) =>
              setNotifications({ ...notifications, financialTip: val })
            }
            trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
          />
        </View>

        {/* General Section */}
        <Text className="text-xs font-semibold text-gray-500 px-4 pt-8 pb-3 tracking-wider">
          GENERAL
        </Text>

        <View className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-3">
            <Text className="text-xl">📢</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-black">Promotional Messages</Text>
            <Text className="text-sm text-gray-500 mt-1">
              Marketing, offers, and app news
            </Text>
          </View>
          <Switch
            value={notifications.promotionalMessages}
            onValueChange={(val) =>
              setNotifications({ ...notifications, promotionalMessages: val })
            }
            trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
          />
        </View>

        <View className="flex-row items-center bg-white px-4 py-4 mb-px">
          <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-3">
            <Text className="text-xl">📥</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-black">App Updates &...</Text>
            <Text className="text-sm text-gray-500 mt-1">
              Important system-level information
            </Text>
          </View>
          <Switch
            value={notifications.appUpdates}
            onValueChange={(val) =>
              setNotifications({ ...notifications, appUpdates: val })
            }
            trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
