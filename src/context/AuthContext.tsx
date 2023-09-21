import { useLazyQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '@app/features/auth/graphql/auth.queries';
import { useAppSelector } from '@app/hooks';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuth0 } from 'react-native-auth0';

/*
 * AUTHSTAGES
 */
export enum AUTHSTAGE {
  INIT,
  AUTH0,
  PENDING,
  COMPLETED,
}

type AuthState = {
  isAuthenticated: boolean;
  authStage: AUTHSTAGE;
};

interface AuthProps {
  authState?: AuthState;
  onLogout?: () => Promise<any>;
  onLogin?: () => Promise<any>;
  // setLocalAuthState?: () =>
  loading?: boolean;
}

const initialState: AuthProps = {
  authState: {
    isAuthenticated: false,
    authStage: AUTHSTAGE.INIT,
  },
  loading: true,
};

const AuthContext = createContext<AuthProps>(initialState);

export const useAppAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  // GraphQL Client
  const [getUserByEmail, query] = useLazyQuery(GET_USER_BY_EMAIL);

  // Auth0
  const { user, isLoading } = useAuth0();
  const [loading, setLoading] = useState(isLoading);
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    authStage: AUTHSTAGE.INIT,
  });

  const localUserData = useAppSelector(({ root }) => root.user);

  const getLocalAuthState = useCallback(() => {
    setLoading(true);
    if (localUserData) {
      console.log(localUserData);
    } else {
      console.log(
        '🚀 ~ file: AuthContext.tsx:64 ~ getLocalAuthState ~ else:',
        'false',
      );
    }
  }, [localUserData]);

  const setLocalAuthState = useCallback(() => {}, []);

  const checkIfPending = useCallback((): boolean => {
    const existingUser = getUserByEmail({
      variables: { email: user?.email as string },
    });

    existingUser.then(({ data: _user }) => {
      if (_user && _user.getUserByEmail?.isRegistered) {
      }
    });

    return false;
  }, [getUserByEmail, user?.email]);

  useEffect(() => {
    if (user !== null) {
      if (authState.authStage === AUTHSTAGE.INIT) {
        if (checkIfPending()) {
          console.log('here');
        }
      }
      setAuthState({ isAuthenticated: true, authStage: AUTHSTAGE.AUTH0 });
      getLocalAuthState();
    } else {
      setAuthState({ isAuthenticated: false, authStage: AUTHSTAGE.INIT });
    }
  }, [
    authState.authStage,
    checkIfPending,
    getLocalAuthState,
    setLocalAuthState,
    user,
  ]);

  const value: AuthProps = { authState, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
