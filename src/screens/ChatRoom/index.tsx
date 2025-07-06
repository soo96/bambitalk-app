import COLORS from '@/constants/colors';
import DefaultLayout from '@/layouts/DefaultLayout';
import { StyleSheet, Text, View } from 'react-native';

const ChatRoomScreen = () => {
  return (
    <DefaultLayout headerTitle="후후">
      <View style={styles.container}>
        <Text style={styles.text}>채팅방</Text>
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  text: {
    fontSize: 20,
  },
});

export default ChatRoomScreen;
