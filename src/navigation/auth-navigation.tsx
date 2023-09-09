import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AuthHome, SetPicks, SetUsername } from '../features/auth';
import { AuthStackParamList } from '../types/type';
import { withTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { AppTheme } from '../theme';
import LoadingScreen from '@app/features/auth/screens/LoadingScreen';
import { useAuth0 } from 'react-native-auth0';
import { useAppSelector } from '@app/hooks';

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
