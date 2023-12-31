import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForumStackParamList } from '@ts-types/type';
import { ForumListScreen, ForumScreen } from '@app/features';

export const ForumNavigation = () => {
  const Stack = createNativeStackNavigator<ForumStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Forums" component={ForumListScreen} />
      <Stack.Screen name="ForumScreen" component={ForumScreen} />
    </Stack.Navigator>
  );
};
