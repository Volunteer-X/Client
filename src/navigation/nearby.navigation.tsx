import React from 'react';
import { NearbyStackParamList } from '@ts-types/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapScreen } from '@app/features';

export const NearbyNavigation = () => {
  const Stack = createNativeStackNavigator<NearbyStackParamList>();

  return (
    <>
      <Stack.Navigator
        initialRouteName="MapScreen"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </>
  );
};
