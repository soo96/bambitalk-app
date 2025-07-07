import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import DefaultLayout from '@/layouts/DefaultLayout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList, RootStackParamList } from '@/types/navigation';
import COLORS from '@/constants/colors';
import { CHAT_INPUT_HEIGHT } from '@/constants/styles';
import { useCallback, useState } from 'react';
import { useChatSocket } from '@/hooks/useChatSocket';
import { ReceiveMessageDto } from '@/types/chat';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useAuthStore } from '@/stores/useAuthStore';
import LoadingOverlay from '@/components/LoadingOverlay';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ChatRoomScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'ChatRoom'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const ChatRoom = () => {
  const insets = useSafeAreaInsets();
  const offset = insets.top + CHAT_INPUT_HEIGHT;

  const [messages, setMessages] = useState<any[]>([]);
  const navigation = useNavigation<ChatRoomScreenNavigationProp>();
  const { user, hydrated } = useAuthStore();

  if (!hydrated) {
    return <LoadingOverlay visible={true} />;
  }

  if (!user) {
    navigation.replace('Login');
    return;
  }

  const onMessageReceived = useCallback((msg: ReceiveMessageDto) => {
    const message = {
      ...msg,
      time: format(msg.time, 'a h:mm', { locale: ko }),
      isMe: user.userId === msg.senderId,
    };
    setMessages((prev) => [...prev, message]);
  }, []);

  useChatSocket({ onMessageReceived });

  return (
    <DefaultLayout headerTitle="BambiTalk">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={offset}
      >
        <View style={styles.container}>
          <MessageList messages={messages} />
          <ChatInput />
        </View>
      </KeyboardAvoidingView>
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
