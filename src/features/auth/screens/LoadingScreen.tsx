import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import LottieView from 'lottie-react-native';
import { Text } from 'react-native-paper';

import anim from '@assets/anims/anim-get-ready.json';

import useAppTheme from '@app/hooks/useAppTheme';
import { AppTheme } from '@app/theme';

import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@app/types/type';
import { useAuth0 } from 'react-native-auth0';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/auth.mutation';
// import { Role } from '@app/lib/constants/enums';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { setUser, User } from '../slices/userSlice';
import { Role } from '@app/__generated__/gql/graphql';
import { setUserPicks } from '@app/features/picks/slices/picksSlice';
import { setRegistrationState } from '../slices/registrationCheckSlice';

type Props = StackScreenProps<AuthStackParamList, 'LoadingScreen'>;

const { height, width } = Dimensions.get('window');

const LoadingScreen = (props: Props) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  // * Redux Hooks
  const picksState = useAppSelector(state => state.picks);

  const dispatch = useAppDispatch();

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  // * Auth0 hook
  const auth0 = useAuth0();

  // * Params from the router
  const { username, picks } = props.route.params;

  // * userProfile from auth0
  const auth0UserData = useMemo(() => {
    return auth0.user;
  }, [auth0]);

  useEffect(() => {
    console.log(
      '🚀 ~ file: LoadingScreen.tsx:26 ~ LoadingScreen ~ username, picks:',
      username,
      picks,
    );

    // Todo gotta find a better way to handle this bug
    createUser({
      variables: {
        createUserInput: {
          username,
          email: auth0UserData?.email ? auth0UserData.email : '',
          firstName: auth0UserData?.given_name ? auth0UserData.given_name : '',
          lastName: auth0UserData?.family_name ? auth0UserData.family_name : '',
          middleName: auth0UserData?.middle_name,
          role: Role.User,
          picture: auth0UserData?.picture,
          picks: picks,
        },
      },
    });

    // console.log(user);
  }, [createUser, picks, auth0UserData, username]);

  // ! dev only
  if (error) {
    console.log(error);
  }

  if (!loading && data) {
    const user: User = {
      id: data.createUser.id,
      username: data.createUser.username,
      email: data.createUser.email,
      firstName: data.createUser.name?.firstName,
      lastName: data.createUser.name?.lastName,
      role: data.createUser.role,
      picture: data.createUser.picture,
    };

    console.log(
      '🚀 ~ file: LoadingScreen.tsx:89 ~ LoadingScreen ~ isRegistered:',
      data.createUser.isRegistered,
    );

    dispatch(
      setRegistrationState({ isRegistered: data.createUser.isRegistered }),
    );

    dispatch(setUserPicks(picks));

    dispatch(setUser(user));
    //
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo} variant="headlineSmall">
        VolunteerX
      </Text>
      <View style={styles.subContainer}>
        <LottieView
          style={styles.lottieView}
          source={anim}
          resizeMode="cover"
          autoPlay
          loop
          colorFilters={[
            {
              keypath: 'Layer 2',
              color: theme.colors.primaryContainer,
            },
            { keypath: 'Layer 3', color: theme.colors.onTertiaryContainer },
            { keypath: 'Layer 4', color: theme.colors.tertiaryContainer },
            { keypath: 'Layer 5', color: theme.colors.onTertiaryContainer },
            { keypath: 'Layer 6', color: theme.colors.tertiaryContainer },
            { keypath: 'Layer 7', color: theme.colors.tertiaryContainer },
          ]}
        />
        {loading ? (
          <Text variant="titleMedium" style={styles.message}>
            Getting your profile ready...
          </Text>
        ) : (
          <Text variant="titleMedium" style={styles.message}>
            Adding final touch up...
          </Text>
        )}
        {error && (
          <Text variant="titleMedium" style={[styles.error, styles.message]}>
            Oops something wrong happened!!
          </Text>
        )}
      </View>
    </View>
  );
};

export default LoadingScreen;

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.onSecondary,
    },
    logo: {
      position: 'absolute',
      top: 25,
      right: 0,
      left: 0,
      textAlign: 'center',
      color: theme.colors.primaryContainer,
    },
    subContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: width * 0.15,
    },
    lottieView: {
      width: width * 1,
      height: height / 2,
    },
    message: {
      textAlign: 'center',
    },
    error: {
      color: theme.colors.onErrorContainer,
    },
  });
