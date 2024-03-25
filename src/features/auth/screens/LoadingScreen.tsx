import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { APP_NAME } from '@app/lib';
import { AppTheme } from '@app/theme';
import { AuthStackParamList } from '@app/types/type';
import { LoadingLottieView } from '../components/LoadingLottieView';
import { StackScreenProps } from '@react-navigation/stack';
import { Text } from 'react-native-paper';
import { useAppAuth } from '@app/context/auth-context';
import useAppTheme from '@app/hooks/useAppTheme';
import { useGeoLocation } from '@app/context/geo-location';

type Props = StackScreenProps<AuthStackParamList, 'LoadingScreen'>;

const { height, width } = Dimensions.get('window');

enum State {
  Location,
  Profile,
  Final,
}

const DELAY = 2000;

const LoadingScreen = (props: Props) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  // * Params from the router
  const { username, picks } = props.route.params;

  const { loading, error, login } = useAppAuth();

  useEffect(() => {
    if (error) {
      props.navigation.navigate('AuthHome');
    }

    if (login) {
      login(username, picks);
    }
  }, [error, login, picks, props.navigation, username]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <Text style={styles.logo} variant="headlineMedium">
        {APP_NAME}
      </Text>
      <View style={styles.subContainer}>
        <LoadingLottieView style={styles.lottieView} theme={theme} />
        {!error && (
          <Text variant="titleMedium" style={styles.message}>
            {
              // ? 'Getting your location...'
              loading
                ? 'Getting your profile ready...'
                : 'Adding final touch up...'
            }
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
      backgroundColor: theme.colors.background,
    },
    logo: {
      position: 'absolute',
      top: 100,
      right: 0,
      left: 0,
      textAlign: 'center',
      color: theme.colors.onBackground,
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
