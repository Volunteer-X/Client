import React from 'react';
import { useAuth0 } from 'react-native-auth0';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import { MainNavList } from '../types/type';

import AuthNavigation from './auth-navigation';
// import { SplashScreen } from '../features/auth';
import HomeDrawer from './drawer/home-drawer';
import { useAppSelector } from '../hooks';
import { DEV_HTTP_URI } from '@env';

const MainNavigation = () => {
  const { user, isLoading } = useAuth0();

  const _user = useAppSelector(state => state.user);

  const Stack = createStackNavigator<MainNavList>();

  console.log(
    '🚀 ~ file: main-navigation.tsx:22 ~ MainNavigation ~ _user.isInitialCompleted:',
    _user.isInitialCompleted,
  );

  if (!isLoading) {
    SplashScreen.hide();
  }

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user === null || _user.isInitialCompleted === false ? (
          <Stack.Screen name="AuthStack" component={AuthNavigation} />
        ) : (
          <Stack.Screen name="Drawer" component={HomeDrawer} />
        )}
      </Stack.Navigator>
    </>
  );
};

export default MainNavigation;
