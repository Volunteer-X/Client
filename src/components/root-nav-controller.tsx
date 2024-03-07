import { AuthNavigation, RootNavigation } from '../navigation';
import React, { useEffect } from 'react';

import { MainNavList } from '@app/types/type';
import SplashScreen from 'react-native-splash-screen';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppAuth } from '@app/context/auth-context/AuthContext';

export const RootNavController = () => {
  const { isAuthenticated, loading } = useAppAuth();

  const Stack = createStackNavigator<MainNavList>();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hide();
    }
  }, [loading]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {false ? (
        <Stack.Screen name="Root" component={RootNavigation} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthNavigation} />
      )}
    </Stack.Navigator>
  );
};
