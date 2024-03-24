import { Button, Text } from 'react-native-paper';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';

import { AppTheme } from '@theme/index';
import { AuthStackParamList } from '@ts-types/type';
import { StackScreenProps } from '@react-navigation/stack';
import { useAppAuth } from '@app/context/auth-context';
import useAppTheme from '@hooks/useAppTheme';

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

  const { authorize, loading } = useAppAuth();

  // Handles login with auth0
  const onLogin = useCallback(async () => {
    try {
      const user = await authorize();

      if (!user) {
        return;
      }

      // if user is new
      const { nickname, preferredUsername } = user;

      navigation.navigate('SetUsername', {
        suggestedUsername: nickname || preferredUsername || undefined,
      });
    } catch (err) {
      console.log('🚀 ~ file: AuthHome.tsx:43 ~ onLogin ~ err:', err);
    }
  }, [authorize, navigation]);

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
        loading={loading}
        disabled={loading}
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
      flexDirection: 'row-reverse',
    },
    loginStyle: {
      borderRadius: 10,
      marginVertical: 25,
    },
  });
