import React from 'react';
import {
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Avatar,
  Button,
  IconButton,
  MD3Colors,
  Text,
} from 'react-native-paper';
import { Pressable, StyleSheet, View } from 'react-native';

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

//Header Left Function
function homeHeaderLeft(props: {
  tintColor?: string | undefined;
  pressColor?: string | undefined;
  pressOpacity?: number | undefined;
  labelVisible?: boolean | undefined;
  navigation: any;
}) {
  return (
    <Pressable
      android_disableSound
      {...props}
      onPress={() => props.navigation.toggleDrawer()}>
      <Avatar.Text label="Vx" size={24} />
    </Pressable>
  );
}

/*
* Ping Header
! Alert on going back, and animation
*/
function PingHeaderLeft(props: {
  tintColor?: string | undefined;
  pressColor?: string | undefined;
  pressOpacity?: number | undefined;
  labelVisible?: boolean | undefined;
  navigation: any;
}) {
  return (
    <IconButton
      icon="close"
      size={25}
      {...props}
      onPress={() => {
        props.navigation.goBack();
      }}
    />
  );
}

/*
 * Ping Header Right
 ! May need to move to another file as a seperate  component to handle ping server actions
 */
function PingHeaderRight(props: {
  tintColor?: string | undefined;
  pressColor?: string | undefined;
  pressOpacity?: number | undefined;
  labelVisible?: boolean | undefined;
  navigation: any;
}) {
  const { theme } = useAppTheme();

  return (
    <Button
      icon="chevron-right"
      {...props}
      mode="contained"
      uppercase
      labelStyle={{
        fontSize: theme.fonts.bodyMedium.fontSize,
        letterSpacing: 1.1,
      }}
      contentStyle={{
        flexDirection: 'row-reverse',
      }}
      style={{ justifyContent: 'center', marginEnd: 10 }}>
      Ping
    </Button>
  );
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
        options={({ route, navigation }) => ({
          headerLeft: props => homeHeaderLeft({ ...props, navigation }),
        })}
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
