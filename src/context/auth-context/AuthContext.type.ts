import { GeoCoordinates } from 'react-native-geolocation-service';
import { User } from 'react-native-auth0';

/**
 * Represents the authentication type.
 */
export type AuthType = {
  /**
   * Indicates whether the user is authenticated or not.
   */
  isAuthenticated: boolean;

  /**
   * Function to log out the user.
   */
  logout?: () => void;

  /**
   * Function to log in the user.
   * @param username - The username of the user.
   * @param picks - The picks of the user.
   * @param coords - The geographic coordinates of the user.
   * @returns A promise that resolves when the user is logged in.
   */
  login?: (
    username: string,
    picks: string[],
    coords: GeoCoordinates,
  ) => Promise<any>;

  /**
   * Function to authenticate the user using Auth0.
   * @returns A promise that resolves with the authenticated user or undefined.
   */
  auth0?: () => Promise<User | undefined>;

  /**
   * Indicates whether the authentication is still loading.
   */
  loading: boolean;

  /**
   * Represents any error that occurred during authentication.
   */
  error?: any;
};
