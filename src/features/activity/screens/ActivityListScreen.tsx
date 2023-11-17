import { ActivityStackParamList } from '@app/types/type';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import ActivityScreen from './ActivityScreen';

const ActivityListScreen = () => {
  const Stack = createStackNavigator<ActivityStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Activity" component={ActivityScreen} />
    </Stack.Navigator>
  );
};

export default ActivityListScreen;
