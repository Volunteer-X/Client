import React from 'react';
import { View } from 'react-native';
import { ActivityStackParamList } from '@app/types/type';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityListScreen, ActivityScreen } from '@app/features';

export const ActivityNavigation = () => {
  const Stack = createStackNavigator<ActivityStackParamList>();

  return (
    <Stack.Navigator initialRouteName="Activities">
      <Stack.Screen name="Activities" component={ActivityListScreen} />
      <Stack.Screen
        name="ActivityScreen"
        component={ActivityScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
