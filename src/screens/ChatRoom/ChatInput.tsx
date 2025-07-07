import COLORS from '@/constants/colors';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

const ChatInput = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.plusButton}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="내용을 입력해주세요"
        placeholderTextColor={COLORS.GRAY_DARK}
      />
      <TouchableOpacity style={styles.sendButton}>
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
