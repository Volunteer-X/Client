import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Point } from './utility-types';

/*
 * PingStackParamList
 */
export type PingStackParamList = {
  FinalPage: { point?: Point };
  SelectPicks: undefined;
  SearchLocation: { point: Point };
};

// * Final step
export type PFinalNavProp = StackNavigationProp<
  PingStackParamList,
  'FinalPage'
>;
export type PFinalRouteProp = RouteProp<PingStackParamList, 'FinalPage'>;

// * Select picks
export type SelectPicksNavProp = StackNavigationProp<
  PingStackParamList,
  'SelectPicks'
>;

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

export type HomeNavigationProps = {};
