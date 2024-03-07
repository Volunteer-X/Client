import { CREATE_USER, USER, login, logout } from '@features/auth';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { useLazyQuery, useMutation } from '@apollo/client';

import { AUTH0_SCOPE } from '@env';
import { AuthType } from './AuthContext.type';
import { GeoCoordinates } from 'react-native-geolocation-service';
import { User } from '@app/__generated__/gql/graphql';
import { loginFunction } from './utils';
import { useAuth0 } from 'react-native-auth0';
import { wrapResultByTypename } from '@app/lib';

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
  const [getUser, checkQuery] = useLazyQuery(USER, {
    notifyOnNetworkStatusChange: true,
  });
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
  const auth0 = useCallback(() =>
    // authFunction(authorize, auth0User, setLoading, getUserByEmail, dispatch),

    {
      authorize({
        scope: AUTH0_SCOPE,
        audience: 'https://api.volunteerX.module',
      })
        .then(cred => {
          setLoading(true);
          if (!cred) {
            throw new Error('credentials is null');
          }

          const accessToken = cred.accessToken;
          const refreshToken = cred.refreshToken;

          if (accessToken) {
            return {
              accessToken,
              refreshToken,
            };
          } else {
            throw new Error("User doesn't have access token");
          }
        })
        .then(async val => {
          return {
            result: await getUser(),
            ...val,
          };
        })
        .then(({ result, accessToken, refreshToken }) => {
          if (result.error) {
            throw new Error('Error getting user by email');
          }

          const user = wrapResultByTypename<User>(result.data?.user);

          const { id, username, email, name, picture, picks, activityCount } =
            user;

          dispatch(
            login({
              isAuthenticated: true,
              accessToken,
              user: {
                id,
                username,
                email,
                firstName: name?.firstName,
                lastName: name?.lastName,
                middleName: name?.middleName,
                picture: picture,
                picks: picks,
                activityCount: activityCount ? 0 : activityCount?.valueOf(),
              },
            }),
          );
        })
        .catch(err => {
          console.log('🚀 ~ AuthProvider ~ error:', err);
          return;
        })
        .finally(() => {
          setLoading(false);
          return auth0User;
        });
    }, [auth0User, authorize, dispatch, getUser]);

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
