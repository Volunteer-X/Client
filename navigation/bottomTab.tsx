import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AddScreen, HomeScreen} from '../screens';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="" component={AddScreen} />
      <Tab.Screen name="AddScreen" component={AddScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
