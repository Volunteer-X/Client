import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

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
import { ActivityNavigation } from './activity-navigation';
import { BottomTabParamList } from '@ts-types/type';
import { RouteProp } from '@react-navigation/native';
import { HomeNavigation } from './home-navigation';
import { NearbyNavigation } from './nearby.navigation';

function tabBarIcon({
  color,
  focused,
  size,
  route,
}: {
  color: string;
  focused: boolean;
  size: number;
  route: RouteProp<BottomTabParamList, keyof BottomTabParamList>;
}) {
  let iconName: string;
  switch (route.name) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Nearby':
      iconName = focused ? 'map' : 'map-outline';
      break;
    case 'Ping':
      iconName = focused ? 'megaphone' : 'megaphone-outline';
      break;
    case 'Search':
      iconName = focused ? 'search' : 'search-outline';
      break;
    case 'Activity':
      iconName = focused ? 'pulse' : 'pulse-outline';
      break;
    default:
      iconName = '';
      break;
  }
  return <Icon name={iconName} size={size} color={color} />;
}

const BottomTabNavigation = () => {
  const { theme } = useAppTheme();

  const Tab = createBottomTabNavigator<BottomTabParamList>();

  return (
    <Tab.Navigator
      backBehavior="history"
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#000',
        },
        tabBarInactiveTintColor: '#c9c9c9',
        tabBarActiveTintColor: '#e8e8e8',
        tabBarIcon: ({ color, focused, size }) =>
          tabBarIcon({ color, focused, size, route }),
      })}>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          header: () => HomeHeader(),
        }}
      />
      <Tab.Screen
        name="Nearby"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Ping"
        component={PingNavigation}
        options={({ route, navigation }) => ({
          headerShown: false,
          tabBarStyle: { display: 'none' },
        })}
      />
      {/* <Tab.Screen name="Search" component={SearchScreen} /> */}
      <Tab.Screen
        name="Activity"
        component={ActivityListScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
