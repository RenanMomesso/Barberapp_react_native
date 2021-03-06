import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MainStack from './src/stacks/MainStack';

import UserContextProvider from './src/contexts/userContext';

export default () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </UserContextProvider>
  );
};
