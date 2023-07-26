import React, { useCallback } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { Button, Text, withTheme } from 'react-native-paper';

const AuthHome = ({ theme }: { theme: any }) => {
  const styles = makeStyles(theme);

  const { getCredentials, authorize, user, error } = useAuth0();

  const handleOnClick = useCallback(async () => {
    authorize()
      .then(res => {
        console.log(`res:: ${res}`);

        if (user === null || user === undefined) {
          throw error;
        }
      })
      .catch(err => console.log(err));
  }, [authorize, error, user]);

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
        onPress={handleOnClick}>
        Get Started
      </Button>
    </View>
  );
};

export default withTheme(AuthHome);

const makeStyles = (theme: any) =>
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
