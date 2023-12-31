import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityStackParamList } from '@app/types/type';
import { ActivityScreen } from '@app/features';

export const ActivityNavigation = () => {
  const Stack = createNativeStackNavigator<ActivityStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ActivityScreen"
        component={ActivityScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
