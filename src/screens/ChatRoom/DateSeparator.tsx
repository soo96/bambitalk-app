import { View, Text, StyleSheet } from 'react-native';

const DateSeparator = ({ date }: { date: string }) => {
  return (
    <View style={styles.separator}>
      <View style={styles.line} />
      <Text style={styles.text}>{date}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
  },
  text: {
    marginHorizontal: 8,
    color: '#888',
    fontSize: 12,
  },
});

export default DateSeparator;
