import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import DefaultLayout from '@/layouts/DefaultLayout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '@/types/navigation';
import COLORS from '@/constants/colors';

type ChatRoomScreenNavigationProp = BottomTabNavigationProp<
  BottomTabParamList,
  'ChatRoom'
>;

interface ChatRoomScreenProps {
  navigation: ChatRoomScreenNavigationProp;
}

const ChatRoom = ({ navigation }: ChatRoomScreenProps) => {
  const insets = useSafeAreaInsets();
  const offset = insets.top + 56;

  return (
    <DefaultLayout headerTitle="🩷 여보 🩷">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={offset}
      >
        <View style={styles.container}>
          <MessageList />
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
