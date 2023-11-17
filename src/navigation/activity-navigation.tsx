import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { ActivityStackParamList } from '@app/types/type';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityScreen } from '@app/features';

export const ActivityNavigation = () => {
  const Stack = createStackNavigator<ActivityStackParamList>();

  return (
    <View>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Activity" component={ActivityScreen} />
      </Stack.Navigator>
    </View>
  );
};
