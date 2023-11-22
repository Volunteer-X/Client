import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ForumStackParamList } from '@ts-types/type';
import { ForumListScreen, ForumScreen } from '@app/features';

export const ForumNavigation = () => {
  const Stack = createStackNavigator<ForumStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Forums" component={ForumListScreen} />
      <Stack.Screen name="ForumScreen" component={ForumScreen} />
    </Stack.Navigator>
  );
};
