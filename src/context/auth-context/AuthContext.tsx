import { useLazyQuery } from '@apollo/client';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { useAuth0 } from 'react-native-auth0';
import { AuthProps, AUTHSTAGE, AuthState } from './AuthContext.type';
import { GET_USER_BY_EMAIL } from '@features/auth/graphql/auth.queries';
import { login, logout } from '@app/features/auth/slices/auth.slice';
import { AUTH0_SCOPE } from '@env';
import { auth0Function } from './auth-functions';

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
  const { isAuthenticated: isAuthenticated, user } = useAppSelector(
    state => state.root.auth,
  );

  const dispatch = useAppDispatch();

  // GraphQL Client
  const [getUserByEmail, checkQuery] = useLazyQuery(GET_USER_BY_EMAIL);

  // Auth0
  const {
    user: auth0User,
    isLoading,
    authorize,
    error: auth0Error,
    clearSession,
  } = useAuth0();
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  // auth0
  const auth0 = useCallback(
    () =>
      auth0Function(authorize, auth0User, setLoading, getUserByEmail, dispatch),
    [auth0User, authorize, dispatch, getUserByEmail],
  );

  // Login
  const _login = useCallback(async () => {}, []);

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
