import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  RouteProp,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Point } from './utility-types';

/*
 * PingStackParamList
 */
export type PingStackParamList = {
  FinalPage: { point?: Point; picks?: Array<string> };
  SelectPicks: { picks?: Array<string> };
  SearchLocation: { point: Point };
};

// * Final step
export type PFinalNavProp = StackNavigationProp<
  PingStackParamList,
  'FinalPage'
>;
export type PFinalRouteProp = RouteProp<PingStackParamList, 'FinalPage'>;

// * Select picks
export type PSelectPicksNavProp = StackNavigationProp<
  PingStackParamList,
  'SelectPicks'
>;
export type PSelectPicksRoute = RouteProp<PingStackParamList, 'SelectPicks'>;

// * Body select
export type PingBodyNavProp = StackNavigationProp<PingStackParamList, 'Body'>;

// * Search location
export type PSearchPlaceNav = StackNavigationProp<
  PingStackParamList,
  'SearchLocation'
>;

export type PSearchPlaceRoute = RouteProp<PingStackParamList, 'SearchLocation'>;

/*
 * AuthStackParamList
 */
export type AuthStackParamList = {
  AuthHome: undefined;
  SetUsername: { possibleUsername?: string };
  SetPicks: { username: string };
  LoadingScreen: { username: string; picks: Array<string> };
};

/*
 * MainNavList
 */
export type MainNavList = {
  AuthStack: AuthStackParamList;
  Drawer: undefined;
};

// Drawer

export type DrawerParamList = {
  Main: undefined;
  Profile: undefined;
  Settings: undefined;
};

// Bottom tab
export type BottomTabParamList = {
  Home: undefined;
  Activity: undefined;
  Ping: undefined;
  Nearby: undefined;
  Search: undefined;
};

// * Home
export type HomeStackParamList = {
  HomeScreen: undefined;
  ForumNav: undefined;
};

// * Home Screen
export type HomeScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Home'>,
  DrawerNavigationProp<DrawerParamList, 'Main'>
>;

export type HomeNavigationProps = {};

// * Activity
export type ActivityStackParamList = {
  ActivityList: undefined;
  ActivityScreen: undefined;
  ActivityMembers: undefined;
  ActivitySetting: undefined;
  Profile: undefined;
};

export type ActivityScreenNavProp = StackNavigationProp<
  ActivityStackParamList,
  'ActivityScreen'
>;

export type ActivityListNavProp = StackNavigationProp<
  ActivityStackParamList,
  'ActivityList'
>;

// * Forum
export type ForumStackParamList = {
  ForumList: undefined;
  ForumScreen: undefined;
  ForumMembers: undefined;
  ForumSetting: undefined;
  Profile: undefined;
};
