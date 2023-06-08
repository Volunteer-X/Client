import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import { Pressable } from 'react-native';

import {
  ActivityScreen,
  AddScreen,
  HomeScreen,
  MapScreen,
  SearchScreen,
} from '../screens';
import { PageNames } from '../constants';

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
    case 'Add':
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

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={PageNames.Home}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
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
      <Tab.Screen name={PageNames.Map} component={MapScreen} />
      <Tab.Screen name={PageNames.Add} component={AddScreen} />
      <Tab.Screen name={PageNames.Search} component={SearchScreen} />
      <Tab.Screen name={PageNames.Activity} component={ActivityScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
