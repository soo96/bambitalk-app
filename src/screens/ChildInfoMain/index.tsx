import { RootStackParamList } from '@/app/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ChildInfoMainScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ChildInfoMain'
>;

const ChildInfoMainScreen = ({ navigation }: ChildInfoMainScreenProps) => {
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

export default ChildInfoMainScreen;
