import COLORS from '@/constants/colors';
import { useSocketStore } from '@/stores/useSocketStore';
import { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

const ChatInput = () => {
  const socket = useSocketStore((state) => state.socket);
  const [text, setText] = useState('');

  const handlePress = () => {
    if (!text.trim() || !socket) return;
    socket.emit('send_message', {
      content: text,
    });

    setText('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.plusButton}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={text}
        placeholder="내용을 입력해주세요"
        placeholderTextColor={COLORS.GRAY_DARK}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handlePress}>
        <Text style={styles.arrow}>↑</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
  },
  plusButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.CHAT_SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  plus: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.CHAT_SECONDARY,
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 36,
  },
  sendButton: {
    marginLeft: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.CHAT_SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 20,
  },
});

export default ChatInput;
