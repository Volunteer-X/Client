import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

/*
 * PingStackParamList
 */
export type PingStackParamList = {
  PingStepA: undefined;
  PingStepB: undefined;
};
export type PingANavProp = StackNavigationProp<PingStackParamList, 'PingStepA'>;
export type PingARouteProp = RouteProp<PingStackParamList, 'PingStepA'>;

export type PingBNavProp = StackNavigationProp<PingStackParamList, 'PingStepB'>;
export type PingBRouteProp = RouteProp<PingStackParamList, 'PingStepB'>;

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
