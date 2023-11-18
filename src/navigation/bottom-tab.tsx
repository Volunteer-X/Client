import React from 'react';
import {
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import { PageNames } from '../lib';
import {
  ActivityListScreen,
  HomeScreen,
  MapScreen,
  SearchScreen,
} from '@features/index';
import { PingNavigation } from './ping-navigation';
import useAppTheme from '@hooks/useAppTheme';
import { AppTheme } from '@app/theme';
import { HomeHeader } from '@app/components';

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
    case 'ActivityList':
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
          headerShown: false,
          tabBarStyle: { display: 'none' },
        })}
      />
      <Tab.Screen name={PageNames.Search} component={SearchScreen} />
      <Tab.Screen
        name={PageNames.ActivityList}
        component={ActivityListScreen}
        options={{ headerShown: false, tabBarStyle: { display: 'none' } }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const makeStyles = (theme: AppTheme) => StyleSheet.create({});
