import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { PageNames } from '../lib';
import { AuthHome } from '../features/auth';
import SetUsername from '../features/auth/screens/SetUsername';

const AuthNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={PageNames.AuthHome} component={AuthHome} />
        <Stack.Screen name={PageNames.SetUsername} component={SetUsername} />
        {/* <Stack.Screen name={PageNames.InitialSelectPicks} component={} />  */}
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigation;
