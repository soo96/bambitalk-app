import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from '@/app/RootStack';

const AppMain = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default AppMain;
