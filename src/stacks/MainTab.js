import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Tabs/Home';
import Search from '../screens/Tabs/Search';
import Appointments from '../screens/Tabs/Appointments';
import Favorites from '../screens/Tabs/Favorites';
import Profile from '../screens/Tabs/Profile';

import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator  
  tabBar={(props) => <CustomTabBar {...props} />} 
  >
    <Tab.Screen  name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Appointments" component={Appointments} />
    <Tab.Screen name="Favorites" component={Favorites} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);
