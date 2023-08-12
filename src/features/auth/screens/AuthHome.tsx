import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { Button, Text } from 'react-native-paper';
import { AUTH0_SCOPE } from '@env';

import { AuthStackParamList } from '../../../types/type';
import useAppTheme from '../../../hooks/useAppTheme';
import { AppTheme } from '../../../theme';

type Props = StackScreenProps<AuthStackParamList, 'AuthHome'>;

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

  const { authorize, user, error } = useAuth0();

  // Handles login with auth0
  const onLogin = useCallback(async () => {
    try {
      // Auth0 authorize
      await authorize({ scope: AUTH0_SCOPE });

      // check auth unsuccessful
      if (user === null || user === undefined) {
        throw error;
      } else {
        navigation.navigate('SetUsername', {
          possibleUsername:
            user?.nickname || user?.preferred_username || undefined,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [authorize, error, navigation, user]);

  return (
    <View style={styles.page}>
      <Image
        source={require('../../../assets/logo-v1.png')}
        style={styles.logo}
      />
      <Text variant="titleLarge" style={styles.title}>
        Welcome to VolunteerX
      </Text>
      <Text variant="titleSmall" style={styles.subTitle}>
        Connect
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    title: { fontWeight: '800' },
    subTitle: {},
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
