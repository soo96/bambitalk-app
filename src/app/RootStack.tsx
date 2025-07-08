import LoginScreen from '@/screens/Login';
import ChildInfoMainScreen from '@/screens/ChildInfoMain';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from '@/screens/Signup';
import BottomTabNavigator from '@/components/BottomTabNavigator';
import { RootStackParamList } from '@/types/navigation';
import DefaultLayout from '@/layouts/DefaultLayout';

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
      <Stack.Screen name="BottomTabNavigator" options={{ headerShown: false }}>
        {({ navigation, route }) => (
          <DefaultLayout>
            <BottomTabNavigator />
          </DefaultLayout>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default RootStack;
