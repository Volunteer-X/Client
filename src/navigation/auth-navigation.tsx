import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AuthHome, SetPicks, SetUsername } from '../features/auth';
import { AuthStackParamList } from './type';

const AuthNavigation = () => {
  const Stack = createStackNavigator<AuthStackParamList>();

  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="SetUsername">
        <Stack.Screen name="AuthHome" component={AuthHome} />
        <Stack.Screen name="SetUsername" component={SetUsername} />
        <Stack.Screen
          name="SetPicks"
          component={SetPicks}
          options={{
            headerShown: true,
            headerTitle: 'Select your Picks',
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigation;
