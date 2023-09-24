import React from 'react';
import {
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, MD3Colors } from 'react-native-paper';
import { Pressable, StyleSheet } from 'react-native';

import { PageNames } from '../lib';
import {
  ActivityScreen,
  HomeScreen,
  MapScreen,
  SearchScreen,
} from '@features/index';
import PingNavigation from './ping-navigation';
import useAppTheme from '@hooks/useAppTheme';
import { AppTheme } from '@app/theme';
import { HomeHeader, PingHeaderLeft, PingHeaderRight } from '@app/components';

function tabBarIcon({
  color,
  focused,
  size,
  route,
}: {
  color: string;
  focused: boolean;
  size: number;
  route: any;
}) {
  let iconName: string;
  switch (route.name) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Map':
      iconName = focused ? 'location' : 'location-outline';
      break;
    case 'Create ping':
      iconName = focused ? 'flame' : 'flame-outline';
      break;
    case 'Search':
      iconName = focused ? 'search' : 'search-outline';
      break;
    case 'Activity':
      iconName = focused ? 'newspaper' : 'newspaper-outline';
      break;
    default:
      iconName = '';
      break;
  }
  return <Icon name={iconName} size={size} color={color} />;
}

const BottomTabNavigation = () => {
  const { theme } = useAppTheme();

  const styles = makeStyles(theme);

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={PageNames.Home}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, focused, size }) =>
          tabBarIcon({ color, focused, size, route }),
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: (props: BottomTabHeaderProps) => HomeHeader(props),
        }}
      />
      <Tab.Screen
        name={PageNames.Map}
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={PageNames.CreatePing}
        component={PingNavigation}
        options={({ route, navigation }) => ({
          headerShown: true,
          tabBarStyle: { display: 'none' },
          headerStyle: styles.headerStyle,
          headerTitle: 'Create a ping',
          headerLeft: props => PingHeaderLeft({ ...props, navigation }),
          headerRight: props => PingHeaderRight({ ...props, navigation }),
        })}
      />
      <Tab.Screen name={PageNames.Search} component={SearchScreen} />
      <Tab.Screen name={PageNames.Activity} component={ActivityScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    headerStyle: {
      backgroundColor: theme.dark ? MD3Colors.neutral0 : MD3Colors.neutral100,
      elevation: 0,
    },
  });
