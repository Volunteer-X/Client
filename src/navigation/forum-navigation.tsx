import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ForumStackParamList } from '@ts-types/type';
import { ForumListScreen } from '@app/features';

export const ForumNavigation = () => {
  const Stack = createStackNavigator<ForumStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Forums" component={ForumListScreen} />
    </Stack.Navigator>
  );
};
