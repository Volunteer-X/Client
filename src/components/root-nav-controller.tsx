import { useAppAuth } from '@app/context/auth-context/AuthContext';
import AppSplashScreen from '@app/features/auth/screens/AppSplashScreen';
import React from 'react';
import { MainNavigation } from '../navigation';

export const RootNavController = () => {
  const {
    authState: { authStage },
    loading,
  } = useAppAuth();
  console.log(
    '🚀 ~ file: root-nav-controller.tsx:11 ~ RootNavController ~ loading:',
    loading,
  );

  if (loading) {
    return <AppSplashScreen />;
  }

  return <MainNavigation authStage={authStage} />;
};
