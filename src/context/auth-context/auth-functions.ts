import { login } from '@app/features/auth/slices/auth.slice';
import { AUTH0_SCOPE } from '@env';
import { Credentials, User } from 'react-native-auth0';
import { GeoCoordinates } from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';

function waitForNonNullValue(value: User | null): Promise<User> {
  return new Promise(resolve => {
    function checkValue() {
      if (value !== null && value !== undefined) {
        console.log('value is not null', value);

        resolve(value);
      } else {
        setTimeout(checkValue, 10); // Adjust the delay as needed
      }
    }

    checkValue();
  });
}

/**
 * Authenticates the user using Auth0.
 *
 * @param authorize - The authorization function.
 * @param auth0User - The Auth0 user object.
 * @param setLoading - The state setter for loading status.
 * @param getUserByEmail - The function to get user by email from the database.
 * @param dispatch - The dispatch function for updating the authentication state.
 * @returns The authenticated user object.
 */
export const auth0Function = async (
  authorize: any,
  auth0User: User | null,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  getUserByEmail: any,
  dispatch: any,
) => {
  try {
    const credentials = await authorize({
      scope: AUTH0_SCOPE,
      audience: 'https://api.volunteerX.module',
    });

    if (!credentials) {
      throw new Error('credentials is null');
    }
    const accessToken = credentials.accessToken;

    console.log(
      '🚀 ~ file: AuthContext.tsx:118 ~ auth0 ~ accessToken',
      accessToken,
    );

    const user = await waitForNonNullValue(auth0User);

    if (!user) {
      throw new Error('Autherization failed, auth0User is null');
    }

    if (user.email) {
      setLoading(true);
      try {
        // check if user exists in db
        let res = await getUserByEmail({
          variables: {
            email: user.email,
          },
        });

        // if user exists in db
        if (res.data?.getUserByEmail) {
          let _user = res.data.getUserByEmail;
          // setIsAuthenticated(true);

          // set auth state to authenticated
          dispatch(
            login({
              isAuthenticated: true,
              accessToken,
              user: {
                id: _user.id,
                username: _user.username,
                email: _user.email,
                firstName: _user.name?.firstName,
                lastName: _user.name?.lastName,
                middleName: _user.name?.middleName,
                picture: _user.picture,
                picks: _user?.picks as string[],
                activityCount: _user.activityCount,
              },
            }),
          );

          return;
        }
        return user;
      } catch (error) {
        console.log('🚀 ~ file: AuthContext.tsx:118 ~ auth0 ~ error', error);
      } finally {
        setLoading(false);
      }
    }
  } catch (error) {
    console.log('🚀 ~ file: AuthContext.tsx:118 ~ auth0 ~ error', error);
  }
};

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

  console.log('token', token);

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
