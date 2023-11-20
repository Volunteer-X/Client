import { HomeScreen } from '@app/features';
import { HomeStackParamList } from '@app/types/type';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

export const HomeNavigation = () => {
  const Stack = createStackNavigator<HomeStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ForumNav" component={HomeScreen} />
      {/* <Stack.Screen name="" /> */}
    </Stack.Navigator>
  );
};
