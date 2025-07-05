import LoginScreen from '@/screens/Login';
import ChildInfoMainScreen from '@/screens/ChildInfoMain';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyChildProfileScreen from '@/screens/MyChildProfile';
import SignupScreen from '@/screens/Signup';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ChildInfoMain: undefined;
  MyChildProfile: undefined;
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
        name="MyChildProfile"
        component={MyChildProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
