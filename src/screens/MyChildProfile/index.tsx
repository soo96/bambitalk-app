import { RootStackParamList } from '@/app/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

type MyChildProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MyChildProfile'
>;

const MyChildProfileScreen = ({ navigation }: MyChildProfileScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>아이정보 입력</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default MyChildProfileScreen;
