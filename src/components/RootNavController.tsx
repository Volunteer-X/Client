import { AUTH0_CLIENT, AUTH0_DOMAIN } from '@env';
import React, { useCallback, useEffect, useState } from 'react';
import Auth0 from 'react-native-auth0';
import { AuthNavigation, MainNavigation } from '../navigation';

const RootNavController = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkIsLoggedIn = useCallback(async () => {
    const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: AUTH0_CLIENT });
    let _isLoggedIn = await auth0.credentialsManager.hasValidCredentials();
    setIsLoggedIn(_isLoggedIn);
  }, []);

  useEffect(() => {
    checkIsLoggedIn().catch(console.error);
  }, [checkIsLoggedIn]);

  return isLoggedIn ? <MainNavigation /> : <AuthNavigation />;
};

export default RootNavController;
