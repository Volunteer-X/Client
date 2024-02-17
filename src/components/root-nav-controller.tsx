import { useAppAuth } from '@app/context/auth-context/AuthContext';
import { MainNavList } from '@app/types/type';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { AuthNavigation, RootNavigation } from '../navigation';

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
      {isAuthenticated ? (
        <Stack.Screen name="Root" component={RootNavigation} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthNavigation} />
      )}
    </Stack.Navigator>
  );
};
