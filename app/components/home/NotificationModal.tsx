import { User } from '@/store/userStore';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { moderateScale, scaleFont } from '../../../utils/responsive';


const { height: SCREEN_H } = Dimensions.get('window');

type TimeGroup = 'Today' | 'This Week' | 'Last Month';

interface NotifItem {
  id: string;
  icon: string;
  color: string;
  title: string;
  body: string;
  time: string;
  group: TimeGroup;
  hasAction?: boolean;
  actionLabel?: string;
}

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
  user: User | null;
}

function buildNotifications(user: User | null): NotifItem[] {
  if (!user) return [];
  const items: NotifItem[] = [];

  const streak = user.rewards?.currentStreak ?? 0;
  const coins = user.rewards?.totalCoins ?? 0;
  const diamonds = user.rewards?.totalDiamonds ?? 0;
  const points = user.leaderboard?.totalPoints ?? 0;
  const rank = user.leaderboard?.rank;
  const completed = user.coursesProgress?.filter(c => c.status === 'completed').length ?? 0;
  const inProgress = user.coursesProgress?.find(c => c.status === 'in_progress');
  const achievements = user.rewards?.achievements ?? [];

  if (streak > 0)
    items.push({ id: 'streak', icon: 'flame', color: '#f97316', title: `${streak}-day streak!`, body: 'Keep it up! Log in every day to maintain your streak.', time: 'Just now', group: 'Today' });

  if (inProgress)
    items.push({ id: 'inprogress', icon: 'book', color: '#6366f1', title: `Continue: ${inProgress.courseName}`, body: `${Math.round(inProgress.overallProgress)}% done — pick up where you left off.`, time: '1h ago', group: 'Today', hasAction: true, actionLabel: 'Continue lesson' });

  if (coins > 0)
    items.push({ id: 'coins', icon: 'logo-bitcoin', color: '#eab308', title: `You have ${coins} coins`, body: 'Earn more by completing lessons and daily check-ins.', time: '2h ago', group: 'Today' });

  if (points > 0)
    items.push({ id: 'points', icon: 'star', color: '#2563eb', title: `${points} total points earned`, body: rank ? `You are ranked #${rank} on the leaderboard!` : 'Keep learning to climb the leaderboard.', time: '1d ago', group: 'This Week' });

  if (diamonds > 0)
    items.push({ id: 'diamonds', icon: 'diamond', color: '#a855f7', title: `You have ${diamonds} diamonds`, body: 'Diamonds are earned by completing special achievements.', time: '2d ago', group: 'This Week' });

  if (completed > 0)
    items.push({ id: 'completed', icon: 'checkmark-circle', color: '#22c55e', title: `${completed} course${completed > 1 ? 's' : ''} completed`, body: 'Great work finishing your lessons!', time: '3d ago', group: 'This Week' });

  achievements.slice(0, 3).forEach((a: any, i: number) => {
    items.push({ id: `ach-${i}`, icon: 'trophy', color: '#f59e0b', title: a.name ?? 'Achievement Unlocked!', body: a.description ?? 'You earned a new achievement.', time: `${i + 2}w ago`, group: 'Last Month' });
  });

  return items;
}

const GROUP_ORDER: TimeGroup[] = ['Today', 'This Week', 'Last Month'];

// ─── Single notification row ────────────────────────────────────────────────
function NotifRow({
  item,
  isRead,
  onRead,
}: {
  item: NotifItem;
  isRead: boolean;
  onRead: (id: string) => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onRead(item.id)}
      style={[s.row, isRead && s.rowRead]}
    >
      {/* icon */}
      <View style={[s.iconCircle, { backgroundColor: item.color + '18' }]}>
        <Ionicons name={item.icon as any} size={20} color={item.color} />
      </View>

      {/* content */}
      <View style={{ flex: 1 }}>
        <View style={s.rowTop}>
          <Text style={[s.rowTitle, isRead && s.rowTitleRead]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={s.rowTime}>{item.time}</Text>
        </View>
        <Text style={s.rowBody}>{item.body}</Text>

        {item.hasAction && (
          <View style={s.actionRow}>
            <TouchableOpacity style={[s.actionBtn, s.actionBtnPrimary, { backgroundColor: item.color }]}>
              <Text style={s.actionBtnPrimaryText}>{item.actionLabel}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* unread dot */}
      {!isRead && <View style={[s.unreadDot, { backgroundColor: item.color }]} />}
    </TouchableOpacity>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
export default function NotificationModal({ visible, onClose, user }: NotificationModalProps) {
  const insets = useSafeAreaInsets();
  const [localVisible, setLocalVisible] = useState(false);
  const [notifications, setNotifications] = useState<NotifItem[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const slideY = useSharedValue(SCREEN_H);
  const bgOpacity = useSharedValue(0);

  useEffect(() => { setNotifications(buildNotifications(user)); }, [user]);

  useEffect(() => {
    if (visible) {
      setLocalVisible(true);
      slideY.value = withSpring(0, { damping: 24, stiffness: 220 });
      bgOpacity.value = withTiming(1, { duration: 260 });
    }
  }, [visible]);

  const handleClose = () => {
    slideY.value = withTiming(SCREEN_H, { duration: 240 });
    bgOpacity.value = withTiming(0, { duration: 240 }, done => {
      if (done) {
        runOnJS(setLocalVisible)(false);
        runOnJS(onClose)();
      }
    });
  };

  const handleRead = (id: string) => setReadIds(prev => new Set([...prev, id]));
  const handleMarkAllRead = () => setReadIds(new Set(notifications.map(n => n.id)));

  const unreadCount = notifications.filter(n => !readIds.has(n.id)).length;

  // group notifications
  const grouped = GROUP_ORDER.map(g => ({
    group: g,
    items: notifications.filter(n => n.group === g),
  })).filter(g => g.items.length > 0);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideY.value }],
  }));
  const backdropStyle = useAnimatedStyle(() => ({ opacity: bgOpacity.value }));

  return (
    <Modal visible={localVisible} animationType="none" transparent statusBarTranslucent onRequestClose={handleClose}>
      {/* backdrop */}
      <Animated.View style={[StyleSheet.absoluteFill, s.backdrop, backdropStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
      </Animated.View>

      {/* full-screen sheet */}
      <Animated.View style={[s.sheet, sheetStyle as any]}>
        <View style={{ flex: 1, paddingTop: insets.top }}>

          {/* ── Header ── */}
          <View style={s.header}>
            <Pressable onPress={handleClose} hitSlop={12} style={s.backBtn}>
              <Ionicons name="arrow-back" size={22} color="#111827" />
            </Pressable>

            <Text style={s.headerTitle}>Notifications</Text>

            <Pressable
              onPress={unreadCount > 0 ? handleMarkAllRead : undefined}
              hitSlop={12}
              style={s.moreBtn}
            >
              {unreadCount > 0
                ? <Ionicons name="checkmark-done-outline" size={22} color="#6366f1" />
                : <View style={{ width: 22 }} />
              }
            </Pressable>
          </View>

          {/* ── Unread badge ── */}
          {unreadCount > 0 && (
            <View style={s.unreadBanner}>
              <View style={s.unreadPill}>
                <Text style={s.unreadPillText}>{unreadCount} unread</Text>
              </View>
            </View>
          )}

          {/* ── List ── */}
          {notifications.length === 0 ? (
            <View style={s.emptyWrap}>
              <View style={s.emptyCircle}>
                <Ionicons name="notifications-off-outline" size={38} color="#a5b4fc" />
              </View>
              <Text style={s.emptyTitle}>No notifications</Text>
              <Text style={s.emptyBody}>Complete lessons and earn rewards{'\n'}to see your activity here.</Text>
            </View>
          ) : (
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={s.listContent}
              showsVerticalScrollIndicator={false}
            >
              {grouped.map(({ group, items }) => (
                <View key={group}>
                  <Text style={s.sectionLabel}>{group}</Text>
                  {items.map((item) => (
                    <NotifRow
                      key={item.id}
                      item={item}
                      isRead={readIds.has(item.id)}
                      onRead={handleRead}
                    />
                  ))}
                </View>
              ))}
            </ScrollView>
          )}

        </View>
      </Animated.View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#fff',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(18),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: scaleFont(17),
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 0.1,
  },
  moreBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Unread banner
  unreadBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(18),
    paddingVertical: 10,
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  unreadPill: {
    backgroundColor: '#eef2ff',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  unreadPillText: {
    fontSize: scaleFont(11),
    color: '#6366f1',
    fontWeight: '700',
  },
  swipeHint: {
    fontSize: scaleFont(11),
    color: '#9ca3af',
  },

  // Section label
  sectionLabel: {
    fontSize: scaleFont(12),
    fontWeight: '700',
    color: '#9ca3af',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    paddingHorizontal: moderateScale(18),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(6),
  },

  // List
  listContent: {
    paddingBottom: 40,
  },

  // Row
  rowOuter: {
    position: 'relative',
    marginHorizontal: moderateScale(12),
    marginBottom: 2,
  },
  deleteBg: {
    position: 'absolute',
    right: 0, top: 0, bottom: 0,
    width: 60,
    backgroundColor: '#ef4444',
    borderRadius: moderateScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: moderateScale(12),
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(9),
    backgroundColor: '#fff',
    borderRadius: moderateScale(14),
  },
  rowRead: {
    opacity: 0.55,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  rowTitle: {
    fontSize: scaleFont(13),
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  rowTitleRead: {
    fontWeight: '500',
    color: '#6b7280',
  },
  rowTime: {
    fontSize: scaleFont(11),
    color: '#9ca3af',
    flexShrink: 0,
  },
  rowBody: {
    fontSize: scaleFont(12),
    color: '#6b7280',
    lineHeight: 18,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    flexShrink: 0,
  },

  // Action buttons (like Allow / Deny)
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  actionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionBtnPrimary: {
    borderWidth: 0,
  },
  actionBtnPrimaryText: {
    fontSize: scaleFont(12),
    fontWeight: '700',
    color: '#fff',
  },
  actionBtnSecText: {
    fontSize: scaleFont(12),
    fontWeight: '600',
    color: '#6b7280',
  },

  // Empty state
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingBottom: 80,
  },
  emptyCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: scaleFont(17),
    fontWeight: '700',
    color: '#374151',
  },
  emptyBody: {
    fontSize: scaleFont(13),
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
  },
});
