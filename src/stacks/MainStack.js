import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Preload from '../screens/Preload';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import MainTab from './MainTab';
import Barber from '../screens/Barber'

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Preload"
      screenOptions={{
        //to dont show header from page
        headerShown: false,
      }}>
      <Stack.Screen name="Preload" component={Preload} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="MainTab" component={MainTab}/>
      <Stack.Screen name="Barber" component={Barber}/>

    </Stack.Navigator>
  );
};
