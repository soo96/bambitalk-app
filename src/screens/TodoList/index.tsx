import { StyleSheet, Text, View } from 'react-native';

const TodoListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>투두 리스트</Text>
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

export default TodoListScreen;
