import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

/*
 * PingStackParamList
 */
export type PingStackParamList = {
  FinalPage: undefined;
  // SelectPicks: undefined;
  // Body: undefined;
  SearchLocation: undefined;
};

export type PingFinalStepNavProp = StackNavigationProp<
  PingStackParamList,
  'FinalPage'
>;

export type PingFinalStepRouteProp = RouteProp<PingStackParamList, 'FinalPage'>;

export type SelectPicksNavigationProp = StackNavigationProp<
  PingStackParamList,
  'SelectPicks'
>;

export type PingBodyNavigationProp = StackNavigationProp<
  PingStackParamList,
  'Body'
>;

export type PingSearchLocationNavigationProp = StackNavigationProp<
  PingStackParamList,
  'SearchLocation'
>;

// export type PingBNavProp = StackNavigationProp<PingStackParamList, 'PingStepB'>;
// export type PingBRouteProp = RouteProp<PingStackParamList, 'PingStepB'>;

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
