import { View, Text, StyleSheet, Image } from 'react-native';
import Video from 'react-native-video';
import COLORS from '@/constants/colors';
import { MessageItem } from '@/types/chat';

interface Props {
  message: MessageItem;
}

const ProgressBubble = ({ message }: Props) => {
  const isVideo = message.type === 'VIDEO';

  return (
    <View style={[styles.container, message.isMe ? styles.right : styles.left]}>
      <View style={styles.mediaBox}>
        {isVideo ? (
          <Video
            source={{ uri: message.content }}
            style={styles.media}
            resizeMode="cover"
            paused
          />
        ) : (
          <Image
            source={{ uri: message.content }}
            style={styles.media}
            resizeMode="cover"
          />
        )}

        <View style={styles.overlay}>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${message.uploadProgress || 0}%` },
              ]}
            />
          </View>
          <Text style={styles.percent}>
            {message.uploadProgress?.toFixed(0)}%
          </Text>
          <Text style={styles.uploadingText}>전송 중...</Text>
        </View>
      </View>
      <View style={styles.timeBoxRight}>
        <Text style={styles.time}>{message.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    maxWidth: '70%',
    alignItems: 'flex-end',
  },
  right: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  left: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  mediaBox: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  media: {
    width: 250,
    height: 250,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    height: 6,
    width: '80%',
    backgroundColor: COLORS.GRAY_DARK,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.CHAT_PRIMARY,
  },
  percent: {
    color: COLORS.WHITE,
    fontSize: 12,
    marginBottom: 4,
  },
  uploadingText: {
    color: COLORS.WHITE,
    fontSize: 12,
  },
  timeBoxRight: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 12,
    color: COLORS.BLACK_LIGHT,
    marginHorizontal: 5,
  },
});

export default ProgressBubble;
