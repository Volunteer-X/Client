/*
 * AUTHSTAGES
 */
export enum AUTHSTAGE {
  INIT = "User doesn't have auth0 token",
  PENDING = "User has auth0 token but hasn't registered to the database",
  COMPLETED = 'User has completed the registeration and isAuthenticated',
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
