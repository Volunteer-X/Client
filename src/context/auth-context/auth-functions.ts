import { login } from '@app/features/auth/slices/auth.slice';
import { AUTH0_SCOPE } from '@env';
import { User } from 'react-native-auth0';

export const auth0Function = async (
  authorize: any,
  auth0User: User | null,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  getUserByEmail: any,
  dispatch: any,
) => {
  try {
    await authorize({ scope: AUTH0_SCOPE });

    if (!auth0User) {
      throw new Error('auth0User is null');
    }

    if (auth0User.email) {
      setLoading(true);
      try {
        // check if user exists in db
        let res = await getUserByEmail({
          variables: {
            email: auth0User.email,
          },
        });

        console.log(
          '🚀 ~ file: AuthContext.tsx:118 ~ auth0 ~ getUserByEmail',
          res.data?.getUserByEmail,
        );

        // if user exists in db
        if (res.data?.getUserByEmail) {
          let _user = res.data.getUserByEmail;

          console.log(
            '🚀 ~ file: AuthContext.tsx:118 ~ auth0 ~ auth0User',
            _user,
          );

          // setIsAuthenticated(true);

          // set auth state to authenticated
          dispatch(
            login({
              isAuthenticated: true,
              user: {
                id: _user.id,
                username: _user.username,
                email: _user.email,
                firstName: _user.name?.firstName,
                lastName: _user.name?.lastName,
                middleName: _user.name?.middleName,
                picture: _user.picture,
                picks: _user?.picks as string[],
              },
            }),
          );

          return;
        }
        return auth0User;
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
