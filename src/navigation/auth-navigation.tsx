import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'react-native-paper';

import { AppTheme } from '@theme/index';
import { AuthStackParamList } from '@ts-types/type';
import { AuthHome, SetPicks, SetUsername, LoadingScreen } from '@features/auth';

const AuthNavigation = ({ theme }: { theme: AppTheme }) => {
  const Stack = createStackNavigator<AuthStackParamList>();
  const headerHeight = 50;
  const styles = makeStyles(theme);

  return (
    <>
      <Stack.Navigator initialRouteName="AuthHome">
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
