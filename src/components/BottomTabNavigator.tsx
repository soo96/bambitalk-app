import MyChildProfileScreen from '@/screens/MyChildProfile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from './BottomTabBar';
import ScheduleScreen from '@/screens/Schedule';
import ChatRoomScreen from '@/screens/ChatRoom';
import { BottomTabParamList } from '@/types/navigation';

const BottomTabNavigator = (appStateType: any) => {
  const Tab = createBottomTabNavigator<BottomTabParamList>();

  return (
    <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen
        name="MyChildProfile"
        component={MyChildProfileScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="TodoList"
        component={ScheduleScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
