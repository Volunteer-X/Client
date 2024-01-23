import { RootStackParamList } from '@ts-types/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ForumNavigation } from './forum-navigation';
import MainDrawer from './drawer/main.drawer';
import { ActivityNavigation } from './activity-navigation';
import { PingNavigation } from './ping-navigation';

export const RootNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      id="RootNavigation"
      initialRouteName="Drawer"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={MainDrawer} />
      <Stack.Screen name="Ping" component={PingNavigation} />
      <Stack.Screen name="ForumNavigation" component={ForumNavigation} />
      <Stack.Screen
        name="ActivityNavigation"
        component={ActivityNavigation}
        // options={{
        //   headerTitleStyle: {
        //     fontSize: 18,
        //     fontWeight: '600',
        //   },
        //   headerBackVisible: true
        // }}
      />
    </Stack.Navigator>
  );
};
