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
import {
  formatMessage,
  formatMessageList,
  makeFakeMessage,
} from '@/utils/messageUtil';
import { useRealTimeMessage } from '@/hooks/useRealTimeMessage';
import ChatActionBox from './ChatActionBox';
import { MessageItem, MessageType, ReceiveMessageDto } from '@/types/chat';
import MediaPreviewModal from './MediaPreviewModal';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { postFile } from '@/apis/file';

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
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewType, setPreviewType] = useState<MessageType>('IMAGE');
  const [pendingMessages, setPendingMessages] = useState<MessageItem[]>([]);

  if (!hydrated) {
    return <LoadingOverlay visible={true} />;
  }

  if (!user) {
    navigation.replace('Login');
    return;
  }

  const handlePreview = (url: string, type: MessageType) => {
    setPreviewUrl(url);
    setPreviewType(type);
    setPreviewVisible(true);
  };

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
  const allMessages = [
    ...pendingMessages,
    ...realtimeMessages,
    ...fetchedLastPages,
  ];

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleUploadFile = async (response: any) => {
    if (!response.assets || response.assets.length === 0) return;

    let fileAsset = response.assets[0];
    const isVideo = fileAsset.type?.startsWith('video/');
    let type: MessageType = isVideo ? 'VIDEO' : 'IMAGE';
    let uploadUri = fileAsset.uri!;
    let mimeType = fileAsset.type ?? 'image/jpeg';
    let name = fileAsset.fileName ?? 'photo.jpg';

    if (!isVideo) {
      const resized = await ImageResizer.createResizedImage(
        uploadUri,
        1024,
        1024,
        'JPEG',
        70,
      );
      uploadUri = resized.uri;
      mimeType = 'image/jpeg';
      name = resized.name ?? name;
    }

    const fakeMessage: MessageItem = makeFakeMessage(
      user.userId,
      type,
      uploadUri,
    );

    setPendingMessages((prev) => [...prev, fakeMessage]);

    const formData = new FormData();
    formData.append('file', {
      uri:
        Platform.OS === 'ios'
          ? fileAsset.uri?.replace('file://', '')
          : fileAsset.uri,
      name: fileAsset.name ?? 'photo.jpg',
      type: fileAsset.type ?? 'image/jpeg',
    });

    try {
      const data = await postFile(formData, (progress: number) => {
        setPendingMessages((prev) =>
          prev.map((msg) =>
            msg.id === fakeMessage.id
              ? { ...msg, uploadProgress: progress }
              : msg,
          ),
        );
      });

      setPendingMessages((prev) =>
        prev.filter((msg) => msg.id !== fakeMessage.id),
      );
      sendMessage({ type, content: data.fileUrl });
    } catch (error) {
      console.error('파일 업로드 실패:', error);
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
        <MessageList
          messages={allMessages}
          onEndReached={handleEndReached}
          onPreview={handlePreview}
        />
        <ChatInput
          onPressSend={sendMessage}
          onPressPlus={() => setShowActions(true)}
          onPressClose={() => setShowActions(false)}
          showActions={showActions}
        />
      </View>
      <ChatActionBox
        visible={showActions}
        onUploadFile={handleUploadFile}
        onClose={() => setShowActions(false)}
      />
      <LoadingOverlay visible={isLoading} />
      <MediaPreviewModal
        visible={previewVisible}
        url={previewUrl}
        type={previewType}
        onClose={() => setPreviewVisible(false)}
      />
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
