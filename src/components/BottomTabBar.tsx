import COLORS from '@/constants/colors';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Settings, Calendar, MessageCircle } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ICONS = [
  { Icon: Calendar, label: '일정' },
  { Icon: MessageCircle, label: '채팅' },
  { Icon: Settings, label: '설정' },
];

const BottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const pressBottomTab = (index: number) => {
    const route = state.routes[index];
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { Icon, label } = ICONS[index];

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={() => pressBottomTab(index)}
            style={styles.tabItem}
          >
            <Icon size={30} color={isFocused ? COLORS.PRIMARY : COLORS.BLACK} />
            <Text style={[styles.label, isFocused && styles.focusedLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY_LIGHT,
    backgroundColor: COLORS.WHITE,
    height: 55,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    color: COLORS.BLACK,
    marginTop: 4,
  },
  focusedLabel: {
    fontWeight: 'semibold',
    color: COLORS.PRIMARY,
  },
});

export default BottomTabBar;
