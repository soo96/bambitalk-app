import { NavigationContainer } from '@react-navigation/native';
import RootStack from '@/app/RootStack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { Dimensions, Text, View } from 'react-native';

const { width } = Dimensions.get('window');
const toastConfig: ToastConfig = {
  selectedToast: ({ text1 }) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: width * 0.8,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 18,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontFamily: 'Poppins-Regular',
        }}
      >
        {text1}
      </Text>
    </View>
  ),
};

const queryClient = new QueryClient();

const AppMain = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
};

export default AppMain;
