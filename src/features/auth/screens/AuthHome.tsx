import React, { useCallback } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useAuth0 } from 'react-native-auth0';
import { Button, Text } from 'react-native-paper';
import { AUTH0_SCOPE } from '@env';

import { AuthStackParamList } from '@ts-types/type';
import useAppTheme from '@hooks/useAppTheme';
import { AppTheme } from '@theme/index';
import { useAppAuth } from '@app/context/auth-context';
import { useGeoLocation } from '@app/context/geo-location';

type Props = StackScreenProps<AuthStackParamList, 'AuthHome'>;

const { height, width, fontScale } = Dimensions.get('window');

const AuthHome = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  route,
  navigation,
}: {
  route: Props['route'];
  navigation: Props['navigation'];
}) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  const { auth0, error } = useAppAuth();
  // Handles login with auth0
  const onLogin = useCallback(async () => {
    try {
      const user = auth0 && (await auth0());

      // check auth unsuccessful
      if (user && user !== null) {
        navigation.navigate('SetUsername', {
          possibleUsername:
            user.nickname || user.preferred_username || undefined,
        });
      }
    } catch (err) {
      console.log('🚀 ~ file: AuthHome.tsx:43 ~ onLogin ~ err:', err);
    }
  }, [auth0, navigation]);

  return (
    <View style={styles.page}>
      <Image
        source={require('@assets/images/logo-v1.png')}
        style={styles.logo}
      />
      <Text variant="titleLarge" style={styles.title}>
        Welcome to VolunteerX
      </Text>
      <Text variant="titleSmall" style={styles.subTitle}>
        Connect to the world
      </Text>
      <Button
        mode="contained"
        style={styles.loginStyle}
        contentStyle={styles.loginContentStyle}
        onPress={onLogin}>
        Get Started
      </Button>
    </View>
  );
};

export default AuthHome;

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    title: { fontWeight: '800' },
    subTitle: {
      color: theme.colors.onSurfaceVariant,
    },
    logo: {
      width: 250,
      height: 250,
      margin: 25,
    },
    loginContentStyle: {
      width: '100%',
    },
    loginStyle: {
      borderRadius: 10,
      marginVertical: 25,
    },
  });
