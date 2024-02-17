import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { ActivityListScreen, MapScreen, SearchScreen } from '@features/index';
import { PingNavigation } from './ping-navigation';
import useAppTheme from '@hooks/useAppTheme';
// import { MainHeader } from '@app/components';
import { BottomTabParamList } from '@ts-types/type';
import { RouteProp } from '@react-navigation/native';
import { HomeNavigation } from './home-navigation';
import { View } from 'react-native';

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
  let name: string;

  switch (route.name) {
    case 'Home':
      name = focused ? 'home' : 'home-outline';
      break;
    case 'Nearby':
      name = focused ? 'map' : 'map-outline';
      break;
    case 'Ping':
      name = 'add';
      return (
        // <View
        //   style={{
        //     backgroundColor: 'blue',
        //     position: 'absolute',
        //     bottom: 10, // space from bottombar
        //     height: 75,
        //     width: 75,
        //     borderRadius: 100,
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //   }}>
        <Icon
          name={name}
          size={48}
          color={color}
          style={{
            backgroundColor: '#874F9E',
            position: 'absolute',
            bottom: 15, // space from bottombar
            height: 65,
            width: 65,
            textAlign: 'center',
            textAlignVertical: 'center',
            padding: 5,
            margin: 0,
            borderRadius: 100,
            elevation: 5,
          }}
        />
        // </View>
      );
    // break;
    case 'Event':
      name = focused ? 'hourglass' : 'hourglass-outline';
      break;
    case 'Activity':
      name = focused ? 'pulse' : 'pulse-outline';
      break;
    default:
      name = '';
      break;
  }
  return <Icon name={name} size={size} color={color} />;
}

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator<BottomTabParamList>();

  return (
    <Tab.Navigator
      backBehavior="history"
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#1f1f1f',
        },
        tabBarInactiveTintColor: '#c9c9c9',
        tabBarActiveTintColor: '#874F9E',
        tabBarIcon: ({ color, focused, size }) =>
          tabBarIcon({ color, focused, size, route }),
      })}>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={
          {
            // header: () => MainHeader(),
          }
        }
      />
      <Tab.Screen
        name="Nearby"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Ping"
        component={PingNavigation}
        options={() => ({
          headerShown: false,
          tabBarStyle: { display: 'none' },
        })}
      />
      <Tab.Screen name="Event" component={SearchScreen} />
      <Tab.Screen
        name="Activity"
        component={ActivityListScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
