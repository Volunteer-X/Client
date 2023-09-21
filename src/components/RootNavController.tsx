import { useAppAuth } from '@app/context/auth-context/AuthContext';
import React from 'react';
import { MainNavigation } from '../navigation';

const RootNavController = () => {
  const { authState, loading } = useAppAuth();

  return <MainNavigation authStage={authState?.authStage} />;
};

export default RootNavController;
