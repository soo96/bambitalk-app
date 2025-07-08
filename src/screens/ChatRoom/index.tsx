import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import DefaultLayout from '@/layouts/DefaultLayout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList, RootStackParamList } from '@/types/navigation';
import COLORS from '@/constants/colors';
import { CHAT_INPUT_HEIGHT } from '@/constants/styles';
import { useCallback } from 'react';
import { useChatSocket } from '@/hooks/useChatSocket';
import { ReceiveMessageDto } from '@/types/chat';
import { useAuthStore } from '@/stores/useAuthStore';
import LoadingOverlay from '@/components/LoadingOverlay';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMessagesInfiniteQuery } from '@/hooks/useMessagesInfiniteQuery';
import { useChatStore } from '@/stores/useChatStore';
import {
  formatMessage,
  formatMessageList,
  groupMessagesWithDateSeparators,
} from '@/utils/messageUtil';

type ChatRoomScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'ChatRoom'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const ChatRoom = () => {
  const navigation = useNavigation<ChatRoomScreenNavigationProp>();
  const { user, hydrated } = useAuthStore();
  const { realtimeMessages, addRealtimeMessage } = useChatStore();
  const insets = useSafeAreaInsets();
  const offset = insets.top + CHAT_INPUT_HEIGHT;

  if (!hydrated) {
    return <LoadingOverlay visible={true} />;
  }

  if (!user) {
    navigation.replace('Login');
    return;
  }

  const onMessageReceived = useCallback((msg: ReceiveMessageDto) => {
    const message = formatMessage(msg, user.userId);

    addRealtimeMessage(message);
  }, []);

  useChatSocket({ onMessageReceived });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMessagesInfiniteQuery();

  const flatQueryPages = data?.pages.flatMap((page) => page) ?? [];
  const fetchedLastPages = formatMessageList(flatQueryPages, user.userId);
  const allMessages = [...realtimeMessages, ...fetchedLastPages];

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <DefaultLayout headerTitle="BambiTalk">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={offset}
      >
        <View style={styles.container}>
          <MessageList messages={allMessages} onEndReached={handleEndReached} />
          <ChatInput />
        </View>
      </KeyboardAvoidingView>
      <LoadingOverlay visible={isLoading} />
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});

export default ChatRoom;
