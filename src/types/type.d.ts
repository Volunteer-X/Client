import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import type {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { Point } from './utility-types';

/*
 * PingStackParamList
 */
export type PingStackParamList = {
  FinalPage: { point?: Point; picks?: Array<string> };
  SelectPicks: { picks?: Array<string> };
  SearchLocation: { point: Point };
};

export type PingStackScreenProps<T extends keyof PingStackParamList> =
  StackScreenProps<PingStackParamList, T>;

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
  Root: RootStackParamList;
};

// * Root
export type RootStackParamList = {
  Drawer: NavigatorScreenParams<DrawerParamList>;
  ForumNavigation: NavigatorScreenParams<ForumStackParamList>;
};

// Drawer
export type DrawerParamList = {
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
  Profile: undefined;
  AppSettings: undefined;
};

// Bottom tab
export type BottomTabParamList = {
  Home: undefined;
  Activity: NavigatorScreenParams<ActivityStackParamList>;
  Ping: NavigatorScreenParams<PingStackParamList>;
  Nearby: undefined;
  Search: undefined;
};

// * Home Screen
export type BottomTabStackScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    CompositeScreenProps<
      BottomTabScreenProps<BottomTabParamList, T>,
      DrawerScreenProps<DrawerParamList, 'BottomTab'>
    >,
    StackScreenProps<RootStackParamList, 'ForumNavigation'>
  >;

// * Activity
export type ActivityStackParamList = {
  ActivityList: undefined;
  ActivityScreen: undefined;
  ActivityMembers: undefined;
  ActivitySetting: undefined;
  Profile: undefined;
};

export type ActivityStackScreenProps<T extends keyof ActivityStackParamList> =
  StackScreenProps<ActivityStackParamList, T>;

// * Forum
export type ForumStackParamList = {
  ForumList: undefined;
  ForumScreen: undefined;
  ForumMembers: undefined;
  ForumSetting: undefined;
  Profile: undefined;
};
