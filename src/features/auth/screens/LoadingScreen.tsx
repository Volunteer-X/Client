import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { Text } from 'react-native-paper';

import anim from '@assets/anims/anim-get-ready.json';

import useAppTheme from '@app/hooks/useAppTheme';
import { AppTheme } from '@app/theme';

import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@app/types/type';
import { useAppAuth } from '@app/context/auth-context';
import { APP_NAME } from '@app/lib';
import { useGeoLocation } from '@app/context/geo-location';

type Props = StackScreenProps<AuthStackParamList, 'LoadingScreen'>;

const { height, width } = Dimensions.get('window');

const LoadingScreen = (props: Props) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  // const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  // * Params from the router
  const { username, picks } = props.route.params;

  console.log('username', username);

  const { coords, geoLoading } = useGeoLocation();

  const { loading, error, login } = useAppAuth();

  useEffect(() => {
    if (!geoLoading && login && coords) {
      login(username, picks, coords);
    }
  }, [coords, geoLoading, login, picks, username]);

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
        {geoLoading && (
          <Text variant="titleMedium" style={styles.message}>
            Getting your location...
          </Text>
        )}
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
