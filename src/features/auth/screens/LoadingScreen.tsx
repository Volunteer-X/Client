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
import { Role } from '@app/lib/constants/enums';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { setUser } from '../slices/userSlice';

type Props = StackScreenProps<AuthStackParamList, 'LoadingScreen'>;

const { height, width } = Dimensions.get('window');

const LoadingScreen = (props: Props) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  // * Redux Hooks
  const _user = useAppSelector(state => state.user);
  const _picks = useAppSelector(state => state.picks);

  const dispatch = useAppDispatch();

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  // * Auth0 hook
  const auth0 = useAuth0();

  // * Params from the router
  const { username, picks } = props.route.params;

  // * userProfile from auth0
  const user = useMemo(() => {
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
          email: user?.email ? user.email : '',
          firstName: user?.given_name ? user.given_name : '',
          lastName: user?.family_name ? user.family_name : '',
          middleName: user?.middle_name,
          role: Role.USER,
          picture: user?.picture,
          picks: picks ? picks : [],
        },
      },
    });

    // console.log(user);
  }, [createUser, picks, user, username]);

  // ! dev only
  if (error) {
    console.log(error);
  }

  if (!loading && data) {
    dispatch(setUser(data.user));
    console.log(
      '🚀 ~ file: LoadingScreen.tsx:72 ~ LoadingScreen ~ data:',
      data,
    );
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
          <Text variant="titleLarge" style={styles.message}>
            Getting your profile ready...
          </Text>
        ) : (
          <Text variant="titleLarge" style={styles.message}>
            Adding final touch up
          </Text>
        )}
        {error && (
          <Text variant="titleLarge" style={styles.message}>
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
  });
