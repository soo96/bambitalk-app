import COLORS from '@/constants/colors';
import { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { XIcon, PlusIcon, ArrowUpIcon } from 'lucide-react-native';
import { SendMessagePayload } from '@/types/chat';

interface ChatInputProps {
  onPressSend: (payload: SendMessagePayload) => void;
  onPressPlus: () => void;
  onPressClose: () => void;
  showActions: boolean;
}

const ChatInput = ({
  onPressSend,
  onPressPlus,
  onPressClose,
  showActions,
}: ChatInputProps) => {
  const [text, setText] = useState('');
  const hasText = !!text.trim();

  const handlePress = () => {
    if (!hasText) return;

    onPressSend({
      type: 'TEXT',
      content: text,
    });
    setText('');
  };

  const handleActionButton = showActions ? onPressClose : onPressPlus;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.plusButton} onPress={handleActionButton}>
        {showActions ? <XIcon /> : <PlusIcon />}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={text}
        placeholder="내용을 입력해주세요"
        placeholderTextColor={COLORS.GRAY_DARK}
        onChangeText={setText}
      />
      <TouchableOpacity
        style={[styles.sendButton, !hasText && styles.sendButtonDisabled]}
        onPress={handlePress}
        disabled={!hasText}
      >
        <ArrowUpIcon />
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
  sendButtonDisabled: {
    opacity: 0.3,
  },
});

export default ChatInput;
