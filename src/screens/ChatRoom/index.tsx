import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList, RootStackParamList } from '@/types/navigation';
import COLORS from '@/constants/colors';
import { CHAT_INPUT_HEIGHT } from '@/constants/styles';
import { useCallback, useState } from 'react';
import { useChatSocket } from '@/hooks/useChatSocket';
import { useAuthStore } from '@/stores/useAuthStore';
import LoadingOverlay from '@/components/LoadingOverlay';
import {
  CompositeNavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMessagesInfiniteQuery } from '@/hooks/useMessagesInfiniteQuery';
import { formatMessage, formatMessageList } from '@/utils/messageUtil';
import { useRealTimeMessage } from '@/hooks/useRealTimeMessage';
import ChatActionBox from './ChatActionBox';
import { ReceiveMessageDto } from '@/types/chat';

type ChatRoomScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'ChatRoom'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const ChatRoom = () => {
  const navigation = useNavigation<ChatRoomScreenNavigationProp>();
  const { user, hydrated } = useAuthStore();
  const {
    realtimeMessages,
    addRealtimeMessage,
    markMessagesAsRead,
    clearRealtimeMessages,
  } = useRealTimeMessage();
  const insets = useSafeAreaInsets();
  const offset = insets.top + CHAT_INPUT_HEIGHT;
  const [showActions, setShowActions] = useState(false);

  if (!hydrated) {
    return <LoadingOverlay visible={true} />;
  }

  if (!user) {
    navigation.replace('Login');
    return;
  }

  const handleMessageReceived = useCallback(
    (msg: ReceiveMessageDto) => {
      const message = formatMessage(msg, user.userId);
      addRealtimeMessage(message);
    },
    [addRealtimeMessage, user.userId],
  );

  const handleUpdateReadStatus = useCallback(() => {
    markMessagesAsRead();
  }, [markMessagesAsRead]);

  const { connect, disconnect, sendMessage } = useChatSocket({
    handleMessageReceived,
    handleUpdateReadStatus,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch: refetchMessages,
  } = useMessagesInfiniteQuery();

  const flatQueryPages = data?.pages.flatMap((page) => page) ?? [];
  const fetchedLastPages = formatMessageList(flatQueryPages, user.userId);
  const allMessages = [...realtimeMessages, ...fetchedLastPages];

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useFocusEffect(
    useCallback(() => {
      clearRealtimeMessages();
      connect();
      refetchMessages();

      return () => {
        disconnect();
      };
    }, []),
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={offset}
    >
      <View style={styles.container}>
        <MessageList messages={allMessages} onEndReached={handleEndReached} />
        <ChatInput
          onPressSend={sendMessage}
          onPressPlus={() => setShowActions(true)}
          onPressClose={() => setShowActions(false)}
          showActions={showActions}
        />
      </View>
      <ChatActionBox
        visible={showActions}
        sendMessage={sendMessage}
        onClose={() => setShowActions(false)}
      />
      <LoadingOverlay visible={isLoading} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});

export default ChatRoom;
