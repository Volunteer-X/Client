/* eslint-disable react-native/no-inline-styles */
import useAppTheme from '@app/hooks/useAppTheme';
import { AppTheme } from '@app/theme';
import React from 'react';

import { View, StyleSheet, StatusBar, Text } from 'react-native';
import { Button, MD3Colors } from 'react-native-paper';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { theme } = useAppTheme();
  const inset = useSafeAreaInsets();

  const styles = makeStyles(theme, inset);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />
    </View>
  );
};

export default HomeScreen;

const makeStyles = (theme: AppTheme, inset: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: inset.top,
      paddingBottom: inset.bottom,
      paddingLeft: inset.left,
      paddingRight: inset.right,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.backdrop,
    },
  });
