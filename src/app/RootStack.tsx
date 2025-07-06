import LoginScreen from '@/screens/Login';
import ChildInfoMainScreen from '@/screens/ChildInfoMain';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyChildProfileScreen from '@/screens/MyChildProfile';
import SignupScreen from '@/screens/Signup';
import BottomTabNavigator from '@/components/BottomTabNavigator';

export type RootStackParamList = {
  Login: undefined;
  Signup: { kakaoId: string };
  ChildInfoMain: undefined;
  BottomTabNavigator: undefined;
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
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChildInfoMain"
        component={ChildInfoMainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
