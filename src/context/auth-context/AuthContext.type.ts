/*
 * AUTHSTAGES
 */
export enum AUTHSTAGE {
  INIT,
  AUTH0,
  PENDING,
  COMPLETED,
}

export type AuthState = {
  isAuthenticated: boolean;
  authStage: AUTHSTAGE;
};

export type AuthProps = {
  authState: AuthState;
  onLogout?: () => Promise<any>;
  onLogin?: () => Promise<any>;
  // setLocalAuthState?: () =>
  loading?: boolean;
};
