import React, { createContext, useContext, useEffect, useState } from 'react';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '@env';

// NOT USEFUL

type AuthState = {
  token: string | null;
  isAuthenticated: boolean | null;
};

interface AuthProps {
  authState?: AuthState;
  onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    isAuthenticated: null,
  });

  const register = async () => {};

  const value = {
    onRegister: register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
