import { AuthHome, LoadingScreen, SetPicks, SetUsername } from '@features/auth';

import { AppTheme } from '@theme/index';
import { AuthStackParamList } from '@ts-types/type';
import { PicksLabel } from '@app/lib';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'react-native-paper';

const AuthNavigation = ({ theme }: { theme: AppTheme }) => {
  const Stack = createStackNavigator<AuthStackParamList>();
  const headerHeight = 50;
  const styles = makeStyles(theme);

  return (
    <>
      <Stack.Navigator initialRouteName="LoadingScreen">
        <Stack.Screen
          name="AuthHome"
          component={AuthHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SetUsername"
          component={SetUsername}
          options={{
            headerTitle: '',
            headerStatusBarHeight: headerHeight,
            headerStyle: styles.headerStyle,
          }}
        />
        <Stack.Screen
          name="SetPicks"
          component={SetPicks}
          options={{
            headerTitle: '',
            headerStatusBarHeight: headerHeight,
            headerStyle: styles.headerStyle,
          }}
        />
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          initialParams={{ picks: [PicksLabel.Art], username: 'amilmohd155' }}
          options={{
            headerShown: false,
            // headerTitle: '',
            // headerStatusBarHeight: headerHeight,
            // headerStyle: styles.headerStyle,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default withTheme(AuthNavigation);

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    headerStyle: {
      backgroundColor: theme.colors.surface,
      elevation: 0,
    },
  });
