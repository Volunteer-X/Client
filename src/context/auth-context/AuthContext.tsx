import { useLazyQuery, useMutation } from '@apollo/client';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { useAuth0 } from 'react-native-auth0';
import { AuthProps } from './AuthContext.type';
import { GET_USER_BY_EMAIL } from '@features/auth/graphql/auth.queries';
import { CREATE_USER } from '@features/auth/graphql/auth.mutation';
import { logout } from '@app/features/auth/slices/auth.slice';
import { auth0Function, loginFunction } from './auth-functions';
import { GeoCoordinates } from 'react-native-geolocation-service';

const initialState: AuthProps = {
  isAuthenticated: false,
  loading: true,
};

/*
 * Auth Context (React Context)
 */
const AuthContext = createContext<AuthProps>(initialState);

/*
 * Auth Provider (React Context Provider)
 */
const AuthProvider = ({ children }: any) => {
  // Redux
  const { isAuthenticated } = useAppSelector(state => state.root.auth);

  const dispatch = useAppDispatch();

  // GraphQL Client
  const [getUserByEmail, checkQuery] = useLazyQuery(GET_USER_BY_EMAIL);
  const [createUser, createQuery] = useMutation(CREATE_USER);
  // Auth0
  const {
    user: auth0User,
    isLoading,
    authorize,
    hasValidCredentials,
    getCredentials,
    error: auth0Error,
    clearSession,
  } = useAuth0();
  const [loading, setLoading] = useState(false);

  // ! Bug fix for auth0
  // Initial login not working
  // auth0
  const auth0 = useCallback(
    // () => {
    //   const cred = await authorize({
    //     scope: 'openid profile email',
    //     audience: 'https://api.volunteerX.module',
    //   });

    //   return undefined;
    // },
    () =>
      auth0Function(authorize, auth0User, setLoading, getUserByEmail, dispatch),
    [auth0User, authorize, dispatch, getUserByEmail],
  );

  // Login
  const _login = useCallback(
    (username: string, picks: string[], coords: GeoCoordinates) =>
      loginFunction(
        setLoading,
        auth0User,
        hasValidCredentials,
        getCredentials,
        createUser,
        dispatch,
        username,
        picks,
        coords,
      ),
    [auth0User, createUser, dispatch, getCredentials, hasValidCredentials],
  );

  // Logout
  const _logout = useCallback(() => {
    clearSession().then(() => {
      dispatch(logout());
    });
  }, [clearSession, dispatch]);

  const value: AuthProps = {
    isAuthenticated,
    loading: isLoading || loading,
    logout: _logout,
    login: _login,
    auth0,
    error: auth0Error || checkQuery.error || createQuery.error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/*
 * useAuth Hook
 */
const useAppAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, useAppAuth };
