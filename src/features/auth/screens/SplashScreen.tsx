import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import useAppTheme from '../../../hooks/useAppTheme';
import { AppTheme } from '../../../theme';

const SplashScreen = () => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);
  return (
    <>
      <View style={styles.container}>
        <Text variant="titleLarge">SplashScreen</Text>
      </View>
    </>
  );
};

export default SplashScreen;

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
