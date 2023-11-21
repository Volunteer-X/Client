import { RootStackParamList } from '@ts-types/type';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ForumNavigation } from './forum-navigation';
import HomeDrawer from './drawer/home-drawer';

export const RootNavigation = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="Drawer"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={HomeDrawer} />
      <Stack.Screen name="ForumNavigation" component={ForumNavigation} />
    </Stack.Navigator>
  );
};
