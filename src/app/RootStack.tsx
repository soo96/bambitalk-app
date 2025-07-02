import LoginScreen from '@/screens/LoginScreen';
import ChildInfoMainScreen from '@/screens/ChildInfoMainScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyChildProfileScreen from '@/screens/ChildMainScreen';

export type RootStackParamList = {
  Login: undefined;
  ChildInfoMainScreen: undefined;
  MyChildProfileScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChildInfoMainScreen"
        component={ChildInfoMainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyChildProfileScreen"
        component={MyChildProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
