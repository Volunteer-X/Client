import { AUTH0_SCOPE } from '@env';
import { User } from 'react-native-auth0';
import { login } from '@app/features/auth/slices/auth.slice';
import { waitForNonNullValue } from './waitForNonNullValue';

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
export const authFunction = async (
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

          console.log('user exists in db', true);

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
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  } catch (error) {
    console.log('🚀 ~ file: AuthContext.tsx:118 ~ auth0 ~ error', error);
  }
};
