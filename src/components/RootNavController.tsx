import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth0 } from 'react-native-auth0';
import { AuthNavigation, MainNavigation } from '../navigation';
import { SplashScreen } from '../features/auth';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList, MainNavList } from '../types/type';
import { TypedNavigator } from '@react-navigation/native';

const RootNavController = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { user, isLoading } = useAuth0();

  const Stack = createStackNavigator<AuthStackParamList | MainNavList>();

  if (isLoading) {
    return <SplashScreen />;
  }

  console.log(
    '🚀 ~ file: RootNavController.tsx:9 ~ RootNavController ~ user:',
    user?.nickname,
  );

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user === null ? <AuthNavigation /> : <MainNavigation />}
      </Stack.Navigator>
    </>
  );
};

export default RootNavController;
