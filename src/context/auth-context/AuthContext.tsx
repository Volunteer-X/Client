import { useLazyQuery } from '@apollo/client';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAppSelector } from '@app/hooks';
import { useAuth0 } from 'react-native-auth0';
import { AuthProps, AUTHSTAGE, AuthState } from './AuthContext.type';
import { GET_USER_BY_EMAIL } from '@features/auth/graphql/auth.queries';

const initialState: AuthProps = {
  authState: {
    isAuthenticated: false,
    authStage: AUTHSTAGE.INIT,
  },
  loading: true,
};

/*
 * Auth Context (React Context)
 */
const AuthContext = createContext<AuthProps>(initialState);

/*
 * useAuth Hook
 */
export const useAppAuth = () => {
  return useContext(AuthContext);
};

/* 
Todo pending
 */
export const AuthProvider = ({ children }: any) => {
  // GraphQL Client
  const [getUserByEmail, query] = useLazyQuery(GET_USER_BY_EMAIL);

  // Auth0
  const { user, isLoading } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    authStage: AUTHSTAGE.INIT,
  });

  useEffect(() => {}, []);

  const value: AuthProps = { authState, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
