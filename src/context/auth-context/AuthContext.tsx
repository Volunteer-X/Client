import { useLazyQuery, useMutation } from '@apollo/client';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { useAuth0 } from 'react-native-auth0';
import { AuthProps } from './AuthContext.type';
import { GET_USER_BY_EMAIL } from '@features/auth/graphql/auth.queries';
import { CREATE_USER } from '@features/auth/graphql/auth.mutation';
import { login, logout } from '@app/features/auth/slices/auth.slice';
import { auth0Function } from './auth-functions';
import { useGeoLocation } from '../geo-location';
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
  const { isAuthenticated, user } = useAppSelector(state => state.root.auth);

  const dispatch = useAppDispatch();

  // GraphQL Client
  const [getUserByEmail, checkQuery] = useLazyQuery(GET_USER_BY_EMAIL);
  const [createUser, createQuery] = useMutation(CREATE_USER);
  // Auth0
  const {
    user: auth0User,
    isLoading,
    authorize,
    error: auth0Error,
    clearSession,
  } = useAuth0();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth0User) {
      dispatch(logout());
    }
  }, [auth0User, dispatch]);

  // auth0
  const auth0 = useCallback(
    () =>
      auth0Function(authorize, auth0User, setLoading, getUserByEmail, dispatch),
    [auth0User, authorize, dispatch, getUserByEmail],
  );
  // Login
  const _login = useCallback(
    async (username: string, picks: string[], coords: GeoCoordinates) => {
      // console.log(auth0User);
      setLoading(true);

      if (auth0User === undefined || auth0User === null) {
        throw new Error('auth0User is undefined');
      }

      const {
        email,
        given_name: firstName,
        family_name: lastName,
        middle_name: middleName,
        picture,
      } = auth0User;

      if (!email || !firstName || !lastName || !picture) {
        throw new Error('email or firstName or lastName or middleName is null');
      }

      const { latitude, longitude } = coords;

      try {
        const result = await createUser({
          variables: {
            createUserInput: {
              username,
              email,
              firstName,
              lastName,
              middleName,
              picture,
              picks,
              latitude: latitude,
              longitude: longitude,
            },
          },
        });

        if (!result.data) {
          throw new Error('result.data is undefined');
        }

        const {
          id,
          username: _username,
          email: _email,
          name,
          picture: _picture,
          picks: _picks,
        } = result.data.createUser;

        dispatch(
          login({
            isAuthenticated: true,
            user: {
              id,
              username: _username,
              email: _email,
              firstName: name?.firstName,
              lastName: name?.lastName,
              middleName: name?.middleName,
              picture: _picture,
              picks: _picks,
            },
          }),
        );
      } catch (error) {
        console.log('Graphql Error::', error);
      }
    },
    [auth0User, createUser, dispatch],
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
    error: auth0Error || checkQuery.error,
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
