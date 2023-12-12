import { useLazyQuery, useMutation } from '@apollo/client';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { Credentials, useAuth0, User } from 'react-native-auth0';
import { AuthProps } from './AuthContext.type';
import { GET_USER_BY_EMAIL } from '@features/auth/graphql/auth.queries';
import { CREATE_USER } from '@features/auth/graphql/auth.mutation';
import { logout } from '@app/features/auth/slices/auth.slice';
import { auth0Function, loginFunction } from './auth-functions';
import { GeoCoordinates } from 'react-native-geolocation-service';

const initialState: AuthProps = {
  isAuthenticated: false,
  loading: true,
  logout: () => {},
  login: function (
    username: string,
    picks: string[],
    coords: GeoCoordinates,
  ): Promise<any> {
    throw new Error('Function not implemented.');
  },
  auth0: function (): Promise<User | undefined> {
    throw new Error('Function not implemented.');
  },
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
    error: auth0Error,
    clearSession,
  } = useAuth0();
  const [loading, setLoading] = useState(false);

  // auth0
  const auth0 = useCallback(
    () => {
      authorize({
        // scope: 'openid profile email',
        // audience: 'https://api.volunteerX.module',
      }).then(
        (credentials: Credentials | undefined) => {
          console.log('credentials', credentials?.accessToken);
        },
        (err: any) => {
          console.log('err', err);
        },
      );
    },
    // auth0Function(authorize, auth0User, setLoading, getUserByEmail, dispatch),
    [authorize],
  );

  // Login
  const _login = useCallback(
    (username: string, picks: string[], coords: GeoCoordinates) =>
      loginFunction(
        setLoading,
        auth0User,
        createUser,
        dispatch,
        username,
        picks,
        coords,
      ),
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
