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

  const dispath = useAppDispatch();

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
  const auth0 = useCallback(async () => {
    try {
      await authorize({ scope: AUTH0_SCOPE });

      if ((auth0User || auth0User !== null) && auth0User.email) {
        setLoading(true);
        try {
          // check if user exists in db
          let res = await getUserByEmail({
            variables: {
              email: auth0User.email,
            },
          });

          console.log(
            '🚀 ~ file: AuthContext.tsx:118 ~ auth0 ~ checkQuery',
            res.data?.getUserByEmail,
          );

          // if user exists in db
          if (res.data?.getUserByEmail) {
            let _user = res.data.getUserByEmail;

            console.log(
              '🚀 ~ file: AuthContext.tsx:118 ~ auth0 ~ auth0User',
              _user,
            );

            // setIsAuthenticated(true);

            // set auth state to authenticated
            dispath(
              login({
                isAuthenticated: true,
                user: {
                  id: _user.id,
                  username: _user.username,
                  email: _user.email,
                  firstName: _user.name?.firstName,
                  lastName: _user.name?.lastName,
                  picture: _user.picture,
                  picks: _user?.picks as string[],
                  role: _user.role,
                },
              }),
            );

            return;
          }
          return auth0User;
        } catch (error) {
          console.log('🚀 ~ file: AuthContext.tsx:118 ~ auth0 ~ error', error);
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      console.log('🚀 ~ file: AuthContext.tsx:118 ~ auth0 ~ error', error);
    }
  }, [auth0User, authorize, dispath, getUserByEmail]);

  // Login
  const _login = useCallback(async () => {}, []);

  // Logout
  const _logout = useCallback(() => {
    clearSession().then(() => {
      dispath(logout());
    });
  }, [clearSession, dispath]);

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
