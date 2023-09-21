import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth0 } from 'react-native-auth0';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import { MainNavList } from '../types/type';

import AuthNavigation from './auth-navigation';
// import { SplashScreen } from '../features/auth';
import HomeDrawer from './drawer/home-drawer';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '@app/features/auth/graphql/auth.queries';
import { setRegistrationState } from '@app/features/auth/slices/registrationCheckSlice';
import { setUser, User } from '@app/features/auth/slices/userSlice';
import { useAppAuth } from '@app/context/AuthContext';
import AppSplashScreen from '@app/features/auth/screens/AppSplashScreen';

const MainNavigation = () => {
  const { authState, loading } = useAppAuth();
  console.log(
    '🚀 ~ file: main-navigation.tsx:20 ~ MainNavigation ~ authState, loading:',
    authState,
    loading,
  );

  const componentSelector = useRef<boolean>(true);

  const { user: auth0User, isLoading } = useAuth0();

  const [getUserByEmail, query] = useLazyQuery(GET_USER_BY_EMAIL);

  const isRegistered = useAppSelector(
    state => state.root.registrationState.isRegistered,
  );

  const dispatch = useAppDispatch();

  const Stack = createStackNavigator<MainNavList>();

  if (!isLoading) {
    // * Check if auth0 authorized
    if (auth0User !== null) {
      // * Check if the user is registered and local state updated
      if (isRegistered) {
        // return HomeDrawer Component
        componentSelector.current = false;
      }
      // * check if email exists in the auth0 user profile
      else if (auth0User.email) {
        // const existingUser = getUserByEmail({
        //   variables: { email: auth0User.email },
        // });
        // existingUser
        //   .then(({ data: _user }) => {
        //     if (_user && _user.getUserByEmail?.isRegistered) {
        //       // * Set isRegistered to truth
        //       dispatch(
        //         setRegistrationState({
        //           isRegistered: _user.getUserByEmail.isRegistered,
        //         }),
        //       );
        //       const user: User = {
        //         id: _user.getUserByEmail.id,
        //         username: _user.getUserByEmail.username,
        //         email: _user.getUserByEmail.email,
        //         firstName: _user.getUserByEmail.name?.firstName,
        //         lastName: _user.getUserByEmail.name?.lastName,
        //         role: _user.getUserByEmail.role,
        //         picture: _user.getUserByEmail.picture,
        //       };
        //       dispatch(setUser(user));
        //     }
        //   })
        //   .catch(e => console.error(e))
        //   .finally(() => {
        //     if (!isRegistered) {
        //       componentSelector.current = true;
        //     }
        //   });
      }
    }

    SplashScreen.hide();
  }

  useEffect(() => {
    if (auth0User && auth0User.email) {
      const existingUser = getUserByEmail({
        variables: { email: auth0User.email },
      });
      existingUser
        .then(({ data: _user }) => {
          if (_user && _user.getUserByEmail?.isRegistered) {
            // * Set isRegistered to truth
            dispatch(
              setRegistrationState({
                isRegistered: _user.getUserByEmail.isRegistered,
              }),
            );
            const user: User = {
              id: _user.getUserByEmail.id,
              username: _user.getUserByEmail.username,
              email: _user.getUserByEmail.email,
              firstName: _user.getUserByEmail.name?.firstName,
              lastName: _user.getUserByEmail.name?.lastName,
              role: _user.getUserByEmail.role,
              picture: _user.getUserByEmail.picture,
            };
            dispatch(setUser(user));
          }
        })
        .catch(e => console.error(e))
        .finally(() => {
          if (!isRegistered) {
            componentSelector.current = true;
          }
        });
    }
  }, [auth0User, dispatch, getUserByEmail, isRegistered]);

  // if (loading) {
  //   return <AppSplashScreen />;
  // }

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {componentSelector.current ? (
          <Stack.Screen name="AuthStack" component={AuthNavigation} />
        ) : (
          <Stack.Screen name="Drawer" component={HomeDrawer} />
        )}
      </Stack.Navigator>
    </>
  );
};

export default MainNavigation;
