import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { PingStackParamList } from '@ts-types/type';
import { PingBody, PingFinalPage } from '@features/ping/screens';
// import { PingHeaderLeft, PingHeaderRight } from '@app/components';
import { AppTheme } from '@app/theme';
import { MD3Colors } from 'react-native-paper';
import useAppTheme from '@app/hooks/useAppTheme';
import { SearchLocationScreen } from '@features/location/screens';

export const PingNavigation = () => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  const Stack = createStackNavigator<PingStackParamList>();

  return (
    <>
      {/* Ping */}
      {/* ! Change in the design to be single page, rather than multiple page forms */}
      <Stack.Navigator
        initialRouteName="FinalPage"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FinalPage" component={PingFinalPage} options={{}} />
        {/* <Stack.Screen
          name="SelectPicks"
          component={PingSelectPicks}
          options={({ route, navigation }) => ({
            headerShown: false,
            headerStyle: styles.headerStyle,
            headerTitle: 'Create a ping',
            headerLeft: props => PingHeaderLeft({ ...props, navigation }),
            headerRight: props =>
              PingHeaderRight({ ...props, navigation, route }),
          })}
        />
        <Stack.Screen name="Body" component={PingBody} options={{}} />
          // * Search Location Screen
        */}
        <Stack.Screen
          name="SearchLocation"
          component={SearchLocationScreen}
          options={{
            headerShown: false,
            headerTitle: 'Add location',
          }}
        />
      </Stack.Navigator>
    </>
  );
};

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    page: {
      flex: 1,
    },
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      marginHorizontal: 25,
      marginVertical: 50,
      borderRadius: 25,
      elevation: 10,
      // changeable
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
    },
    headerStyle: {
      backgroundColor: theme.dark ? MD3Colors.neutral0 : MD3Colors.neutral100,
      elevation: 0,
    },
  });
