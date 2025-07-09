import { Text, StyleSheet } from 'react-native';

interface MonthTitleProps {
  date: Date;
}

const MonthTitle = ({ date }: MonthTitleProps) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return <Text style={styles.title}>{`${year}년 ${month}월`}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
});

export default MonthTitle;
