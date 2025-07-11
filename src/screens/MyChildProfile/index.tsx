import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '@/constants/colors';
import { Venus } from 'lucide-react-native';

const MyBabyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.nickname}>
        <Venus />
        딱복이
      </Text>
      <Image
        source={require('@/assets/images/baby.jpg')}
        style={styles.babyImage}
      />
      <Text style={styles.countdown}>만나기까지 202일</Text>

      <View style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <Text style={styles.infoTitle}>아이 정보</Text>
          <TouchableOpacity></TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>태명</Text>
          <Text>딱복이</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>성별</Text>
          <Text>여자</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>출산예정일</Text>
          <Text>2026.01.17</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  nickname: { fontSize: 18, marginBottom: 20 },
  babyImage: { width: 100, height: 100, marginBottom: 20 },
  countdown: { fontSize: 16, marginBottom: 20 },
  infoCard: {
    width: '90%',
    backgroundColor: COLORS.CHAT_PRIMARY,
    borderRadius: 8,
    padding: 16,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoTitle: { fontWeight: 'bold', fontSize: 16 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: { fontWeight: '600' },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  tabItem: { alignItems: 'center' },
});

export default MyBabyScreen;
