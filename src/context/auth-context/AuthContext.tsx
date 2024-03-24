import {
  AUTH0_AUDIENCE,
  AUTH0_SCOPE,
  getSecureValue,
  removeSecureValue,
  setSecureValue,
  wrapResultByTypename,
} from '@app/lib';
import {
  CREATE_USER,
  USER,
  login,
  logout,
  setAuthentication,
} from '@features/auth';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { useLazyQuery, useMutation } from '@apollo/client';

import { AuthContextInterface } from './AuthContext.interface';
import { showToast } from '@app/features/toast';
import { useAuth0 } from 'react-native-auth0';
import { useGeoLocation } from '../geo-location';
import messaging from '@react-native-firebase/messaging';

const initialState: AuthContextInterface = {
  isAuthenticated: false,
  loading: true,
  authorize: () => Promise.resolve(undefined),
};

/**
 * Context for managing authentication state.
 */
const AuthContext = createContext<AuthContextInterface>(initialState);

/**
 * Provides authentication functionality to the application.
 * @param {ReactNode} children - The child components to be wrapped by the AuthProvider.
 * @returns {JSX.Element} - The AuthProvider component.
 */
const AuthProvider = ({ children }: any) => {
  // Redux
  const { isAuthenticated } = useAppSelector(state => state.root.auth);
  const { coords, geoloading } = useGeoLocation();

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

  const checkIfAuthenticated = useCallback(async () => {
    hasValidCredentials()
      .then(val => {
        setLoading(true);
        if (val) {
          getCredentials().then(cred => {
            console.log(
              '🚀 ~ file: AuthContext.tsx:81 ~ getCredentials ~ accessToken:',
              cred?.accessToken,
            );
            cred?.accessToken &&
              setSecureValue('accessToken', cred.accessToken);
          });
        }

        dispatch(setAuthentication(val));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, getCredentials, hasValidCredentials]);

  useEffect(() => {
    checkIfAuthenticated();
  }, [checkIfAuthenticated]);

  /**
   * Callback function for authentication using Auth0.
   * @returns {void}
   */
  const handleAuthorize = useCallback(async () => {
    try {
      setLoading(true);
      const cred = await authorize({
        scope: AUTH0_SCOPE,
        audience: AUTH0_AUDIENCE,
      });

      if (!cred) {
        throw new Error('Auth0: Got no authorized credentials from Auth0');
      }

      const accessToken = cred.accessToken;

      if (!accessToken) {
        throw new Error("Auth0: User doesn't have access token");
      }

      setSecureValue('accessToken', accessToken);

      const { data, error: queryError } = await getUser();

      if (queryError || !data?.user) {
        console.error('🚀 ~ file: AuthContext.tsx ~ queryError:', queryError);

        throw new Error('Error getting user by email');
      }

      switch (data.user.__typename) {
        case 'User':
          {
            const user = data.user;
            const { id, username, email, name, picture, picks, activityCount } =
              user;

            dispatch(
              login({
                isAuthenticated: true,
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
          }
          return false;

        case 'NotFoundError':
          if (auth0User === null) {
            throw new Error(
              'Autherization failed, auth0User is undefined or null',
            );
          }
          return auth0User;

        case 'InternalServerError':
        case 'UnauthorizedError':
        case 'UnknownError':
        default:
          wrapResultByTypename(data.user);
      }
    } catch (err) {
      console.log('🚀 ~ AuthProvider ~ error:', err);
      dispatch(
        showToast("Opps!! Couldn't get started, Try again after sometime "),
      );
    } finally {
      setLoading(false);
    }
  }, [authorize, auth0User, dispatch, getUser]);

  // Login
  /**
   * Logs in the user with the provided username, picks, and coordinates.
   * @param {string} username - The username of the user.
   * @param {string[]} picks - The picks of the user.
   * @param {GeoCoordinates} coords - The coordinates of the user.
   */
  const handleLogin = useCallback(
    async (incomingUsername: string, picks: string[]) => {
      try {
        // const accessToken = await getSecureValue('accessToken');

        if (auth0User === null) {
          throw new Error(
            'Autherization failed, auth0User is undefined or null',
          );
        }

        const {
          email,
          givenName: firstName,
          familyName: lastName,
          middleName,
          picture,
        } = auth0User;

        if (!email || !firstName || !lastName) {
          throw new Error('Verified details are required');
        }

        const { latitude, longitude } = coords;

        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }

        const device = await messaging().getToken();

        const { data } = await createUser({
          variables: {
            createUserInput: {
              username: incomingUsername,
              email,
              firstName,
              lastName,
              middleName,
              picture,
              picks,
              latitude,
              longitude,
              device,
            },
          },
        });

        if (!data) {
          throw new Error('Api Grab failed to create user');
        }

        const { id, username, email } = data.createUser;
      } catch (err) {}
    },
    // loginFunction(
    //   setLoading,
    //   auth0User,
    //   hasValidCredentials,
    //   getCredentials,
    //   createUser,
    //   dispatch,
    //   username,
    //   picks,
    //   coords,
    // ),
    [auth0User, coords, createUser],
  );

  /**
   * Logs out the user by clearing the session and dispatching the logout action.
   */
  const handleLogout = useCallback(() => {
    clearSession().then(() => {
      removeSecureValue('accessToken');
      dispatch(logout());
    });
  }, [clearSession, dispatch]);

  const value: AuthContextInterface = {
    isAuthenticated,
    loading: isLoading || loading,
    logout: handleLogout,
    login: handleLogin,
    authorize: handleAuthorize,
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
