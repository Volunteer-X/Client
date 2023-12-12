import { User } from 'react-native-auth0';
import { GeoCoordinates } from 'react-native-geolocation-service';

/*
 * AUTHSTAGES
 */
export enum AUTHSTAGE {
  INIT = "User doesn't have auth0 token",
  PENDING = "User has auth0 token but hasn't registered to the database",
  COMPLETED = 'User has completed the registeration and isAuthenticated',
}

export type AuthState = {
  authStage: AUTHSTAGE;
};

export type AuthProps = {
  isAuthenticated: boolean;
  logout?: () => void;
  login?: (
    username: string,
    picks: string[],
    coords: GeoCoordinates,
  ) => Promise<any>;
  auth0?: () => Promise<User | undefined>;
  loading: boolean;
  error?: any;
};
