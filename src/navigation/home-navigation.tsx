import React from 'react';
import { HomeStackParamList } from '@ts-types/type';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '@app/features';

export const HomeNavigation = () => {
  const Stack = createStackNavigator<HomeStackParamList>();

  return (
    <>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </>
  );
};
