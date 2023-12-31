import { RootStackParamList } from '@ts-types/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ForumNavigation } from './forum-navigation';
import HomeDrawer from './drawer/home-drawer';
import { NearbyNavigation } from './nearby.navigation';
import { ActivityNavigation } from './activity-navigation';

export const RootNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="Drawer"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={HomeDrawer} />
      <Stack.Screen name="ForumNavigation" component={ForumNavigation} />
      <Stack.Screen name="NearbyNavigation" component={NearbyNavigation} />
      <Stack.Screen name="ActivityNavigation" component={ActivityNavigation} />
    </Stack.Navigator>
  );
};
