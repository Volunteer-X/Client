import { useAppAuth } from '@app/context/auth-context/AuthContext';
import AppSplashScreen from '@app/features/auth/screens/AppSplashScreen';
import { MainNavList } from '@app/types/type';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { AuthNavigation, MainNavigation, RootNavigation } from '../navigation';

export const RootNavController = () => {
  const { isAuthenticated, loading } = useAppAuth();

  // if (loading) {
  //   return <AppSplashScreen />;
  // }

  // return <MainNavigation authStage={authStage} />;

  const Stack = createStackNavigator<MainNavList>();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  console.log(
    '🚀 ~ file: root-nav-controller.tsx:25 ~ RootNavController ~ isAuthenticated',
    isAuthenticated,
  );

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
