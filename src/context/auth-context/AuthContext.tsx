import { CREATE_USER, GET_USER_BY_EMAIL, logout } from '@features/auth';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { authFunction, loginFunction } from './utils';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { useLazyQuery, useMutation } from '@apollo/client';

import { AuthType } from './AuthContext.type';
import { GeoCoordinates } from 'react-native-geolocation-service';
import { useAuth0 } from 'react-native-auth0';

const initialState: AuthType = {
  isAuthenticated: false,
  loading: true,
};

/**
 * Context for managing authentication state.
 */
const AuthContext = createContext<AuthType>(initialState);

/**
 * Provides authentication functionality to the application.
 * @param {ReactNode} children - The child components to be wrapped by the AuthProvider.
 * @returns {JSX.Element} - The AuthProvider component.
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

  // ! Bug fix for auth0User being null on first render
  /**
   * Callback function for authentication using Auth0.
   * @returns {void}
   */
  const auth0 = useCallback(
    () =>
      authFunction(authorize, auth0User, setLoading, getUserByEmail, dispatch),
    [auth0User, authorize, dispatch, getUserByEmail],
  );

  // Login
  /**
   * Logs in the user with the provided username, picks, and coordinates.
   * @param {string} username - The username of the user.
   * @param {string[]} picks - The picks of the user.
   * @param {GeoCoordinates} coords - The coordinates of the user.
   */
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

  /**
   * Logs out the user by clearing the session and dispatching the logout action.
   */
  const _logout = useCallback(() => {
    clearSession().then(() => {
      dispatch(logout());
    });
  }, [clearSession, dispatch]);

  const value: AuthType = {
    isAuthenticated,
    loading: isLoading || loading,
    logout: _logout,
    login: _login,
    auth0,
    error: auth0Error || checkQuery.error || createQuery.error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook that provides access to the authentication context.
 * Throws an error if used outside of an AuthProvider.
 * @returns The authentication context.
 */
const useAppAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAppAuth };
