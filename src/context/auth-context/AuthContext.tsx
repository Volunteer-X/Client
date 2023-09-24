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

  const localUserData = useAppSelector(({ root }) => root.user);

  const getLocalAuthState = useCallback(() => {
    setLoading(true);
    if (localUserData) {
      console.log(
        '🚀 ~ file: AuthContext.tsx:67 ~ getLocalAuthState ~ localUserData:',
        localUserData,
      );
    } else {
      console.log(
        '🚀 ~ file: AuthContext.tsx:64 ~ getLocalAuthState ~ else:',
        'true',
      );
    }
  }, [localUserData]);

  const setLocalAuthState = useCallback(() => {}, []);

  const checkIfPending = useCallback((): boolean => {
    let isPending: boolean = false;

    const existingUser = getUserByEmail({
      variables: { email: user?.email as string },
    });

    existingUser.then(({ data: _user }) => {
      if (_user && _user.getUserByEmail?.isRegistered) {
        isPending = _user.getUserByEmail.isRegistered;
        console.log(
          '🚀 ~ file: AuthContext.tsx:75 ~ existingUser.then ~ isPending:',
          isPending,
        );
      }
    });

    console.log(
      '🚀 ~ file: AuthContext.tsx:83 ~ existingUser.then ~ isPending:',
      isPending,
    );

    return isPending;
  }, [getUserByEmail, user?.email]);

  useEffect(() => {
    if (user !== null) {
      if (authState.authStage === AUTHSTAGE.INIT) {
        console.log(
          '🚀 ~ file: AuthContext.tsx:84 ~ useEffect ~ authState.authStage:',
          authState.authStage,
        );

        if (checkIfPending()) {
          console.log('here');
        }
      }
      setAuthState({ isAuthenticated: true, authStage: AUTHSTAGE.PENDING });
      getLocalAuthState();
    } else {
      setAuthState({ isAuthenticated: false, authStage: AUTHSTAGE.INIT });
      setLoading(false);
      console.log(authState.authStage);
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
