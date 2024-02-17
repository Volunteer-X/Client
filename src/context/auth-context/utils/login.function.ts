import { login } from '@app/features/auth/slices/auth.slice';
import { Credentials, User } from 'react-native-auth0';
import { GeoCoordinates } from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';

export const loginFunction = async (
  setLoading: (arg0: boolean) => void,
  auth0User: User | null,
  hasValidCredentials: () => Promise<boolean>,
  getCredentials: () => Promise<Credentials | undefined>,
  createUser: any,
  dispatch: any,
  username: string,
  picks: string[],
  coords: GeoCoordinates,
) => {
  // console.log(auth0User);
  setLoading(true);

  if (auth0User === undefined || auth0User === null) {
    throw new Error('Autherization failed, auth0User is undefined or null');
  }

  const loggedIn = await hasValidCredentials();

  let accessToken: string | undefined;

  if (loggedIn) {
    const credentials = await getCredentials();

    if (!credentials) {
      throw new Error('credentials is null');
    }

    accessToken = credentials.accessToken;
  }

  const {
    email,
    givenName: firstName,
    familyName: lastName,
    middleName: middleName,
    picture,
  } = auth0User;

  if (!email || !firstName || !lastName || !picture) {
    throw new Error('email or firstName or lastName or middleName is null');
  }

  const { latitude, longitude } = coords;

  let token: string;

  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages();
  }

  token = await messaging().getToken();

  console.log('Login function: token', token);

  try {
    const result = await createUser({
      variables: {
        createUserInput: {
          username,
          email,
          firstName,
          lastName,
          middleName,
          picture,
          picks,
          latitude: latitude,
          longitude: longitude,
          device: token,
        },
      },
    });

    if (!result.data) {
      throw new Error('result.data is undefined');
    }

    const {
      id,
      username: _username,
      email: _email,
      name,
      picture: _picture,
      picks: _picks,
      devices,
    } = result.data.createUser;

    dispatch(
      login({
        accessToken,
        isAuthenticated: true,
        user: {
          id,
          username: _username,
          email: _email,
          firstName: name?.firstName,
          lastName: name?.lastName,
          middleName: name?.middleName,
          picture: _picture,
          picks: _picks,
          devices,
        },
      }),
    );
  } catch (error) {
    console.log('Graphql Error::', error);
  } finally {
    setLoading(false);
  }
};
