import { StackNavigationProp } from '@react-navigation/stack';

export type PingStackParamList = {
  PingStepA: undefined;
  PingStepB: undefined;
};
export type PingProps = StackNavigationProp<PingStackParamList>;

export type AuthStackParamList = {
  AuthHome: undefined;
  SetUsername: { possibleUsername?: string };
  SetPicks: { username: string };
};

export type MainNavList = {
  AuthStack: AuthStackParamList;
  Drawer: undefined;
};
